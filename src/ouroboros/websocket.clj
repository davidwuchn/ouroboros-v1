(ns ouroboros.websocket
  "WebSocket server for real-time updates
   
   Provides live telemetry streams to connected clients."
  (:require
   [clojure.string :as str]
   [clojure.edn :as edn]
   [org.httpkit.server :as httpkit]
   [cheshire.core :as json]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.eca-client :as eca]
   [ouroboros.memory :as memory]
   [ouroboros.wisdom :as wisdom])
  (:import [java.util.concurrent.atomic AtomicLong]))

;; ============================================================================
;; Connection Management
;; ============================================================================

(defonce connections (atom {}))
(defonce connection-counter (AtomicLong. 0))

(defn- next-id []
  (.incrementAndGet connection-counter))

(defn add-connection!
  "Add a new WebSocket connection"
  [channel]
  (let [id (next-id)]
    (swap! connections assoc id {:channel channel
                                 :subscriptions #{:telemetry/events}
                                 :connected-at (System/currentTimeMillis)})
    (println (str "WebSocket client connected: " id))
    id))

(defn remove-connection!
  "Remove a WebSocket connection"
  [id]
  (swap! connections dissoc id)
  (println (str "WebSocket client disconnected: " id)))

(defn broadcast!
  "Broadcast a message to all connected clients"
  [message]
  (doseq [[id {:keys [channel subscriptions]}] @connections]
    (when channel
      (try
        (httpkit/send! channel (json/generate-string message))
        (catch Exception e
          (println "WebSocket send error for client" id ":" (.getMessage e)))))))

(defn broadcast-to!
  "Broadcast to specific subscription"
  [subscription-type message]
  (doseq [[id {:keys [channel subscriptions]}] @connections]
    (when (and channel (contains? subscriptions subscription-type))
      (try
        (httpkit/send! channel (json/generate-string message))
        (catch Exception e
          (println "WebSocket send error for client" id ":" (.getMessage e)))))))

(defn broadcast-builder-session!
  "Broadcast builder session update to subscribed clients"
  [session-id data]
  (broadcast-to! (keyword (str "builder-session/" session-id))
                 {:type :builder-session/update
                  :session-id session-id
                  :data data
                  :timestamp (System/currentTimeMillis)}))

;; ============================================================================
;; Message Handling
;; ============================================================================

(defn- send-to!
  "Send a message to a specific WebSocket client by connection id"
  [id message]
  (when-let [channel (get-in @connections [id :channel])]
    (try
      (httpkit/send! channel (json/generate-string message))
      (catch Exception e
        (println "WebSocket send error for client" id ":" (.getMessage e))))))

(defn- handle-eca-chat!
  "Handle an eca/chat message from the frontend.
   Registers a per-request ECA callback that streams tokens back to the
   specific WebSocket client, then cleans up when done."
  [client-id {:keys [text context]}]
  ;; Auto-start ECA if not running
  (when-not (:running (eca/status))
    (telemetry/emit! {:event :ws/eca-auto-start :client-id client-id})
    (try
      (eca/start!)
      (catch Exception e
        (send-to! client-id {:type :eca/chat-response
                             :text (str "Failed to start ECA: " (.getMessage e))
                             :timestamp (System/currentTimeMillis)})
        (telemetry/emit! {:event :ws/eca-auto-start-failed
                          :client-id client-id
                          :error (.getMessage e)}))))

  (if-not (:running (eca/status))
    ;; Still not running after start attempt
    (send-to! client-id {:type :eca/chat-response
                         :text "ECA could not be started. Ensure the ECA binary is installed."
                         :timestamp (System/currentTimeMillis)})

    ;; ECA is running - proceed with chat
    (let [chat-id (str "ws-" client-id "-" (System/currentTimeMillis))
          listener-id (keyword (str "ws-chat-" client-id))]

      (telemetry/emit! {:event :ws/eca-chat-request
                        :client-id client-id
                        :chat-id chat-id
                        :context context
                        :text-length (count (str text))})

      ;; Register callback to relay ECA content to this specific WS client
      (eca/register-callback! "chat/contentReceived" listener-id
        (fn [notification]
          (let [params (:params notification)
                notif-chat-id (:chatId params)
                role (:role params)
                content (:content params)]
            ;; Only handle notifications for our chat-id
            (when (= notif-chat-id chat-id)
              (cond
                ;; Progress: done -> send eca/chat-done and unregister
                (and (= "progress" (:type content))
                     (#{"done" "finished"} (:state content)))
                (do
                  (send-to! client-id {:type :eca/chat-done
                                       :timestamp (System/currentTimeMillis)})
                  (eca/unregister-callback! "chat/contentReceived" listener-id)
                  (telemetry/emit! {:event :ws/eca-chat-done
                                    :client-id client-id
                                    :chat-id chat-id}))

                ;; Assistant text content -> stream as token
                (and (= role "assistant") (= "text" (:type content)))
                (send-to! client-id {:type :eca/chat-token
                                     :token (:text content)
                                     :timestamp (System/currentTimeMillis)})

                ;; Reasoning content -> skip for now
                :else nil)))))

      ;; Send prompt to ECA (fast mode - returns immediately after ack)
      (try
        (let [result (eca/chat-prompt text {:chat-id chat-id})]
          (when (= :error (:status result))
            (send-to! client-id {:type :eca/chat-response
                                 :text (str "Error: " (or (:message result) (:error result)))
                                 :timestamp (System/currentTimeMillis)})
            (eca/unregister-callback! "chat/contentReceived" listener-id)))
        (catch Exception e
          (send-to! client-id {:type :eca/chat-response
                               :text (str "ECA error: " (.getMessage e))
                               :timestamp (System/currentTimeMillis)})
          (eca/unregister-callback! "chat/contentReceived" listener-id)
          (telemetry/emit! {:event :ws/eca-chat-error
                            :client-id client-id
                            :error (.getMessage e)}))))))

;; ============================================================================
;; Flywheel Progress
;; ============================================================================

(def ^:private phase-order
  "The 4 flywheel phases in order"
  [:empathy-map :value-proposition :mvp-planning :lean-canvas])

(def ^:private phase-labels
  {:empathy-map "Empathy Map"
   :value-proposition "Value Proposition"
   :mvp-planning "MVP Planning"
   :lean-canvas "Lean Canvas"})

(defn- compute-flywheel-progress
  "Compute flywheel progress for a project from its builder sessions.
   Returns a map with :phases (status per phase) and :current-step (recommended next phase)."
  [user-id project-id]
  (let [key (keyword (str "builder-sessions/" (name user-id)))
        sessions (vals (or (memory/get-value key) {}))
        project-sessions (filter #(= (:session/project-id %) project-id) sessions)
        ;; Group sessions by builder type
        by-type (group-by :session/type project-sessions)
        ;; Determine status per phase
        phase-status (mapv (fn [phase]
                             (let [sessions (get by-type phase [])
                                   completed? (some #(= (:session/state %) :completed) sessions)
                                   active? (some #(= (:session/state %) :active) sessions)]
                               {:phase phase
                                :label (get phase-labels phase (name phase))
                                :status (cond completed? :completed
                                              active? :active
                                              :else :not-started)
                                :session-count (count sessions)}))
                           phase-order)
        ;; Find first incomplete phase as recommended next step
        current-step (or (->> phase-status
                              (filter #(not= :completed (:status %)))
                              first
                              :phase)
                         :lean-canvas)]
    {:phases phase-status
     :current-step current-step
     :completed-count (count (filter #(= :completed (:status %)) phase-status))
     :total-phases (count phase-order)}))

;; ============================================================================
;; ECA Wisdom Handler
;; ============================================================================

(def ^:private wisdom-prompts
  "System prompts per request type for ECA wisdom queries"
  {:tips
   "You are a product development coach. Based on the project context below, provide 3-5 specific, actionable tips for the current phase. Each tip should be concise (1-2 sentences) and directly relevant to the user's project data. Format as a numbered list."

   :next-steps
   "You are a product development coach. Based on the project context below, suggest the 2-3 most impactful next actions the user should take. Be specific to their project, not generic. Format as a numbered list with brief explanations."

   :analysis
   "You are a product strategy analyst. Based on the project context below, provide a brief analysis of the current state of the project. Identify strengths, gaps, and areas that need more work. Be specific and constructive. Keep it to 3-4 paragraphs."

   :suggestions
   "You are a product development assistant. Based on the project context and current phase, generate 4 specific questions or prompts the user could ask to deepen their understanding. Each should be a complete sentence that the user can click to ask. Format as a numbered list."

   :templates
   "You are a product strategy advisor. Based on the project description, suggest which product development template/archetype best fits this project (SaaS B2B, Marketplace, Consumer App, API Platform, Creator/Content, Hardware/IoT) and explain why in 2-3 sentences. Then provide 2-3 specific tips for that archetype."})

(defn- assemble-project-context
  "Build a rich context string from project data for ECA.
   Loads project info, all builder sessions, and learning patterns."
  [user-id project-id phase]
  (let [;; Load project
        projects-key (keyword (str "projects/" (name user-id)))
        project (get (or (memory/get-value projects-key) {}) project-id)
        ;; Load sessions
        sessions-key (keyword (str "builder-sessions/" (name user-id)))
        all-sessions (vals (or (memory/get-value sessions-key) {}))
        project-sessions (filter #(= (:session/project-id %) project-id) all-sessions)
        ;; Group by type
        by-type (group-by :session/type project-sessions)
        ;; Get learning patterns
        patterns (wisdom/analyze-learning-patterns user-id)
        ;; Build context string
        context-parts
        [(str "# Project: " (or (:project/name project) "Unknown"))
         (when-let [desc (:project/description project)]
           (when-not (str/blank? desc)
             (str "Description: " desc)))
         (str "\nCurrent Phase: " (or (get phase-labels phase) (name (or phase :unknown))))
         ;; Include session data for each phase
         (when (seq project-sessions)
           (str "\n## Builder Session Data\n"
                (str/join "\n\n"
                  (for [[builder-type sessions] by-type
                        :let [latest (last (sort-by :session/updated-at sessions))
                              data (:session/data latest)]]
                    (str "### " (get phase-labels builder-type (name builder-type))
                         " (" (name (or (:session/state latest) :unknown)) ")\n"
                         (cond
                           ;; Empathy map data
                           (= builder-type :empathy-map)
                           (let [sections (or (:empathy/sections data) (:sections data) {})]
                             (str/join "\n" (for [[k v] sections
                                                  :when (and v (not (str/blank? (str v))))]
                                              (str "- " (name k) ": " v))))

                           ;; Value proposition data
                           (= builder-type :value-proposition)
                           (let [fields (or (:vp/fields data) data {})]
                             (str/join "\n" (for [[k v] fields
                                                  :when (and v (not (str/blank? (str v))))]
                                              (str "- " (name k) ": " v))))

                           ;; MVP planning data
                           (= builder-type :mvp-planning)
                           (let [features (or (:mvp/features data) (:features data) [])]
                             (if (seq features)
                               (str "Features: " (str/join ", " (map :name features)))
                               "No features defined yet"))

                           ;; Lean canvas data
                           (= builder-type :lean-canvas)
                           (let [blocks (or (:canvas/blocks data) data {})]
                             (str/join "\n" (for [[k v] blocks
                                                  :when (and v (not (str/blank? (str v))))]
                                              (str "- " (name k) ": " v))))

                           :else "No data yet"))))))
         ;; Learning history summary
         (when (pos? (:total-insights patterns 0))
           (str "\n## User History\n"
                "Total insights: " (:total-insights patterns) "\n"
                "Categories: " (str/join ", " (map (fn [[k v]] (str (name k) " (" v ")"))
                                                   (:categories patterns)))))]]
    (str/join "\n" (remove nil? context-parts))))

(defn- handle-eca-wisdom!
  "Handle an eca/wisdom message from the frontend.
   Assembles project context, sends to ECA with a phase-specific prompt,
   and streams the response back to the requesting WebSocket client."
  [client-id {:keys [project-id phase request-type]}]
  (let [phase-kw (if (string? phase) (keyword phase) phase)
        request-type-kw (if (string? request-type) (keyword request-type) (or request-type :tips))
        user-id :demo-user]

    ;; Auto-start ECA if not running
    (when-not (:running (eca/status))
      (telemetry/emit! {:event :ws/eca-wisdom-auto-start :client-id client-id})
      (try
        (eca/start!)
        (catch Exception e
          (send-to! client-id {:type :eca/wisdom-response
                               :text (str "Failed to start ECA: " (.getMessage e))
                               :request-type request-type-kw
                               :timestamp (System/currentTimeMillis)})
          (telemetry/emit! {:event :ws/eca-wisdom-auto-start-failed
                            :client-id client-id
                            :error (.getMessage e)}))))

    (if-not (:running (eca/status))
      ;; ECA not available
      (send-to! client-id {:type :eca/wisdom-response
                           :text "ECA could not be started. Ensure the ECA binary is installed."
                           :request-type request-type-kw
                           :timestamp (System/currentTimeMillis)})

      ;; ECA running - assemble context and query
      (let [chat-id (str "ws-wisdom-" client-id "-" (System/currentTimeMillis))
            listener-id (keyword (str "ws-wisdom-" client-id))
            ;; Build project context
            context-str (assemble-project-context user-id project-id phase-kw)
            ;; Get system prompt for request type
            system-prompt (get wisdom-prompts request-type-kw (:tips wisdom-prompts))
            ;; Compose full prompt
            prompt (str system-prompt "\n\n---\n\n" context-str)]

        (telemetry/emit! {:event :ws/eca-wisdom-request
                          :client-id client-id
                          :chat-id chat-id
                          :project-id project-id
                          :phase phase-kw
                          :request-type request-type-kw
                          :context-length (count context-str)})

        ;; Register callback to relay ECA content to this specific WS client
        (eca/register-callback! "chat/contentReceived" listener-id
          (fn [notification]
            (let [params (:params notification)
                  notif-chat-id (:chatId params)
                  role (:role params)
                  content (:content params)]
              ;; Only handle notifications for our chat-id
              (when (= notif-chat-id chat-id)
                (cond
                  ;; Progress: done/finished -> send wisdom-done and unregister
                  (and (= "progress" (:type content))
                       (#{"done" "finished"} (:state content)))
                  (do
                    (send-to! client-id {:type :eca/wisdom-done
                                         :request-type request-type-kw
                                         :timestamp (System/currentTimeMillis)})
                    (eca/unregister-callback! "chat/contentReceived" listener-id)
                    (telemetry/emit! {:event :ws/eca-wisdom-done
                                      :client-id client-id
                                      :chat-id chat-id
                                      :request-type request-type-kw}))

                  ;; Assistant text content -> stream as token
                  (and (= role "assistant") (= "text" (:type content)))
                  (send-to! client-id {:type :eca/wisdom-token
                                       :token (:text content)
                                       :request-type request-type-kw
                                       :timestamp (System/currentTimeMillis)})

                  ;; Reasoning/other -> skip
                  :else nil)))))

        ;; Send prompt to ECA (fast mode)
        (try
          (let [result (eca/chat-prompt prompt {:chat-id chat-id})]
            (when (= :error (:status result))
              (send-to! client-id {:type :eca/wisdom-response
                                   :text (str "Error: " (or (:message result) (:error result)))
                                   :request-type request-type-kw
                                   :timestamp (System/currentTimeMillis)})
              (eca/unregister-callback! "chat/contentReceived" listener-id)))
          (catch Exception e
            (send-to! client-id {:type :eca/wisdom-response
                                 :text (str "ECA error: " (.getMessage e))
                                 :request-type request-type-kw
                                 :timestamp (System/currentTimeMillis)})
            (eca/unregister-callback! "chat/contentReceived" listener-id)
            (telemetry/emit! {:event :ws/eca-wisdom-error
                              :client-id client-id
                              :error (.getMessage e)})))))))

(defn- handle-flywheel-progress!
  "Handle a flywheel/progress request from the frontend.
   Returns computed flywheel progress for a project."
  [client-id {:keys [project-id]}]
  (let [user-id :demo-user
        progress (compute-flywheel-progress user-id project-id)]
    (send-to! client-id {:type :flywheel/progress
                         :project-id project-id
                         :progress progress
                          :timestamp (System/currentTimeMillis)})))

(defn handle-message
  "Handle incoming WebSocket message"
  [id message-str]
  (try
    (let [message (json/parse-string message-str keyword)]
      (case (:type message)
        "subscribe"
        (let [topic (:topic message)]
          (swap! connections update-in [id :subscriptions] conj topic)
          (println (str "Client " id " subscribed to: " topic)))
        
        "unsubscribe"
        (let [topic (:topic message)]
          (swap! connections update-in [id :subscriptions] disj topic)
          (println (str "Client " id " unsubscribed from: " topic)))
        
        "ping"
        (send-to! id {:type :pong :timestamp (System/currentTimeMillis)})

        "eca/chat"
        (future (handle-eca-chat! id message))

        "eca/wisdom"
        (future (handle-eca-wisdom! id message))

        "flywheel/progress"
        (handle-flywheel-progress! id message)
        
        (println "Unknown message type from client" id ":" (:type message))))
    (catch Exception e
      (println "WebSocket message error from client" id ":" (.getMessage e)))))

;; ============================================================================
;; Handler
;; ============================================================================

(defn websocket-handler
  "WebSocket handler factory

   Uses http-kit's with-channel. If the request is a WebSocket upgrade,
   http-kit handles it. Otherwise, returns an error."
  [request]
  (httpkit/with-channel request channel
    ;; channel is only non-nil for WebSocket requests
    (if channel
      (let [id (add-connection! channel)]
        (httpkit/on-close channel (fn [status]
                                    (remove-connection! id)))
        (httpkit/on-receive channel (fn [message]
                                      (handle-message id message)))
        ;; Send initial connection acknowledgment
        (httpkit/send! channel (json/generate-string
                                {:type :connected
                                 :client-id id
                                 :timestamp (System/currentTimeMillis)})))
      ;; Not a WebSocket request
      {:status 400
       :headers {"Content-Type" "text/plain"}
       :body "Not a WebSocket request"})))

;; ============================================================================
;; Telemetry Integration
;; ============================================================================

(defn telemetry-callback
  "Callback for telemetry events - broadcasts to WebSocket clients"
  [event]
  (broadcast-to! :telemetry/events
                 {:type :telemetry/event
                  :data event
                  :timestamp (System/currentTimeMillis)}))

(defonce telemetry-listener-registered? (atom false))

(defn register-telemetry-listener!
  "Register the WebSocket broadcaster with telemetry"
  []
  (when-not @telemetry-listener-registered?
    ;; Hook into telemetry emission
    (alter-var-root #'telemetry/emit!
                    (fn [original-fn]
                      (fn [event-data]
                        (let [result (original-fn event-data)]
                          ;; Broadcast to WebSocket clients
                          (telemetry-callback result)
                          result))))
    (reset! telemetry-listener-registered? true)
    (println "WebSocket telemetry listener registered")))

;; ============================================================================
;; Status
;; ============================================================================

(defn status
  "Get WebSocket server status"
  []
  {:connected-clients (count @connections)
   :subscriptions (reduce (fn [acc [_ {:keys [subscriptions]}]]
                            (merge-with + acc (zipmap subscriptions (repeat 1))))
                          {}
                          @connections)})

(comment
  ;; Test broadcasting
  (broadcast! {:type :test :message "Hello from server"})
  
  ;; Check status
  (status)
  
  ;; Manual telemetry broadcast
  (telemetry-callback {:event :test :data "manual"}))
