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
    [ouroboros.wisdom :as wisdom]
    [ouroboros.learning :as learning]
    [ouroboros.analytics :as analytics])
   (:import [java.util.concurrent.atomic AtomicLong]
            [java.io File]))

;; Forward declarations for functions defined later in the file
(declare assemble-project-context handle-auto-insight! handle-learning-save-examples! handle-wisdom-template!)

;; ============================================================================
;; Current User
;; ============================================================================

(defn- current-user-id
  "Get the current system user as a keyword.
   Uses the OS login username (e.g. :davidwu) instead of a hardcoded demo user."
  []
  (keyword (System/getProperty "user.name")))

;; ============================================================================
;; Workspace Detection
;; ============================================================================

(defn- detect-workspace-info
  "Detect project info from the current working directory.
   Reads directory name and looks for common project files to build a description."
  []
  (let [cwd (System/getProperty "user.dir")
        dir (File. cwd)
        dir-name (.getName dir)
        ;; Try to read first line of README for description
        readme-desc (let [readme (File. dir "README.md")]
                      (when (.exists readme)
                        (try
                          (let [lines (str/split-lines (slurp readme))
                                ;; Skip blank lines and # title, find first content line
                                content (->> lines
                                             (drop-while #(or (str/blank? %) (str/starts-with? % "#")))
                                             first)]
                            (when (and content (not (str/blank? content)))
                              (let [trimmed (str/trim content)]
                                (if (> (count trimmed) 200)
                                  (str (subs trimmed 0 200) "...")
                                  trimmed))))
                          (catch Exception _ nil))))
        ;; Detect project type from files
        project-type (cond
                       (.exists (File. dir "deps.edn")) "Clojure"
                       (.exists (File. dir "project.clj")) "Clojure (Leiningen)"
                       (.exists (File. dir "bb.edn")) "Babashka"
                       (.exists (File. dir "package.json")) "Node.js"
                       (.exists (File. dir "Cargo.toml")) "Rust"
                       (.exists (File. dir "go.mod")) "Go"
                       (.exists (File. dir "pyproject.toml")) "Python"
                       (.exists (File. dir "requirements.txt")) "Python"
                       (.exists (File. dir "pom.xml")) "Java (Maven)"
                       (.exists (File. dir "build.gradle")) "Java (Gradle)"
                       :else nil)
        description (str/join " | "
                      (remove nil?
                        [(when project-type (str project-type " project"))
                         readme-desc]))]
    {:name dir-name
     :description (if (str/blank? description)
                    (str "Project in " cwd)
                    description)
     :path cwd
     :project-type project-type}))

(defn- ensure-workspace-project!
  "Find or create the project for the current workspace directory.
   Returns the project map."
  []
  (let [user-id (current-user-id)
        {:keys [name description path]} (detect-workspace-info)
        projects-key (keyword (str "projects/" (clojure.core/name user-id)))
        existing-projects (or (memory/get-value projects-key) {})
        ;; Find project matching this workspace path
        existing (first (filter (fn [[_ p]]
                                  (= path (:project/path p)))
                                existing-projects))]
    (if existing
      ;; Return existing project
      (val existing)
      ;; Create new project for this workspace
      (let [project-id (str (clojure.core/name user-id) "/project-"
                            (str/replace (str/lower-case name) #"[^a-z0-9]+" "-")
                            "-" (System/currentTimeMillis))
            project {:project/id project-id
                     :project/name name
                     :project/description (or description "")
                     :project/path path
                     :project/owner (clojure.core/name user-id)
                     :project/status :active
                     :project/created-at (str (java.time.Instant/now))
                     :project/updated-at (str (java.time.Instant/now))}]
        (memory/update! projects-key
                        (fn [projects]
                          (assoc (or projects {}) project-id project)))
        (telemetry/emit! {:event :ws/workspace-project-created
                          :project-id project-id
                          :path path})
        project))))

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
  ;; Use ensure-alive! for robust startup with auto-restart
  (when-not (eca/alive?)
    (telemetry/emit! {:event :ws/eca-auto-start :client-id client-id})
    (when-not (eca/ensure-alive!)
      (send-to! client-id {:type :eca/chat-error
                           :error "ECA could not be started. Ensure the ECA binary is installed and try again."
                           :timestamp (System/currentTimeMillis)})
      (telemetry/emit! {:event :ws/eca-auto-start-failed :client-id client-id})))

  (when (eca/alive?)
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
      ;; chat-prompt now auto-retries on timeout with ECA restart
      (try
        (let [result (eca/chat-prompt text {:chat-id chat-id})]
          (when (= :error (:status result))
            (let [error-msg (or (:message result)
                                (when (keyword? (:error result)) (name (:error result)))
                                (str (:error result)))]
              (send-to! client-id {:type :eca/chat-error
                                   :error (str "AI error: " error-msg
                                               ". Click retry to try again.")
                                   :timestamp (System/currentTimeMillis)})
              (eca/unregister-callback! "chat/contentReceived" listener-id))))
        (catch Exception e
          (send-to! client-id {:type :eca/chat-error
                               :error (str "ECA error: " (.getMessage e)
                                           ". Click retry to try again.")
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
;; Builder Data Persistence
;; ============================================================================

(def ^:private builder-section-counts
  "Number of sections required for completion per builder type"
  {:empathy-map 6          ;; persona, think-feel, hear, see, say-do, pains-gains
   :value-proposition 6    ;; customer-job, pains, gains, products, pain-relievers, gain-creators
   :mvp-planning 8         ;; core-problem, target-user, success-metric, must-have-features, nice-to-have, out-of-scope, timeline, risks
   :lean-canvas 9})        ;; problems, customer-segments, uvp, solution, channels, revenue-streams, cost-structure, key-metrics, unfair-advantage

(defn- normalize-builder-data
  "Normalize builder data after JSON round-trip.
   clj->js on the frontend converts keyword values to strings.
   json/parse-string with keyword only keywordizes map keys, not values.
   This function restores keyword values for known fields:
   - :item/section values (e.g. \"persona\" -> :persona)"
  [builder-type data]
  (case builder-type
    ;; Sticky note builders: normalize :item/section values in each note
    (:empathy-map :lean-canvas :value-proposition :mvp-planning)
    (reduce-kv (fn [m k note]
                 (let [str-key (if (keyword? k) (name k) k)]
                   (assoc m str-key
                          (cond-> note
                            (string? (:item/section note))
                            (update :item/section keyword)))))
               {} (or data {}))

    ;; Unknown builder type - pass through
    data))

(defn- count-completed-sections
  "Count how many sections have data in the builder data map.
   All builders use sticky-note format: data is {note-id -> note-map}, grouped by :item/section."
  [builder-type data]
  (case builder-type
    ;; Sticky note builders: data is a flat map of {note-id -> {:item/section :key ...}}
    (:empathy-map :lean-canvas :value-proposition :mvp-planning)
    (let [notes (vals (or data {}))
          sections-with-notes (set (map :item/section notes))]
      (count sections-with-notes))

    ;; Unknown builder type
    0))

(defn- builder-complete?
  "Check if a builder has all its sections filled"
  [builder-type data]
  (let [required (get builder-section-counts builder-type 0)
        completed (count-completed-sections builder-type data)]
    (and (pos? required)
         (>= completed required))))

(defn- handle-save-builder-data!
  "Handle a builder/save-data message from the frontend.
   Persists the current builder data to the backend session store.
   Optionally triggers auto-insight if the builder is newly complete."
  [client-id {:keys [project-id session-id builder-type data]}]
  (let [user-id (current-user-id)
        builder-type-kw (if (string? builder-type) (keyword builder-type) builder-type)
        ;; Normalize keyword values that were stringified during JSON round-trip
        normalized-data (normalize-builder-data builder-type-kw data)]

    (telemetry/emit! {:event :ws/builder-data-save
                      :client-id client-id
                      :project-id project-id
                      :session-id session-id
                      :builder-type builder-type-kw})

    ;; Persist session data to memory via direct memory update
    ;; (same as webux/update-builder-session! but without Pathom)
    (let [key (keyword (str "builder-sessions/" (name user-id)))]
      (memory/update! key
                      (fn [sessions]
                        (if-let [session (get sessions session-id)]
                          (assoc sessions session-id
                                 (assoc session
                                        :session/data normalized-data
                                        :session/updated-at (str (java.time.Instant/now))))
                          ;; Session doesn't exist - create it
                          (assoc sessions session-id
                                 {:session/id session-id
                                  :session/project-id project-id
                                  :session/type builder-type-kw
                                  :session/state :active
                                  :session/data normalized-data
                                  :session/created-at (str (java.time.Instant/now))
                                  :session/updated-at (str (java.time.Instant/now))})))))

    ;; Send confirmation
    (send-to! client-id {:type :builder/data-saved
                         :session-id session-id
                         :project-id project-id
                         :builder-type builder-type-kw
                         :timestamp (System/currentTimeMillis)})

    ;; Check if builder is now complete and trigger auto-insight
    (let [is-complete? (builder-complete? builder-type-kw normalized-data)]
      (when is-complete?
        ;; Check if we already marked this session as completed
        (let [key (keyword (str "builder-sessions/" (name user-id)))
              session (get (memory/get-value key) session-id)
              already-completed? (= :completed (:session/state session))]
          (when-not already-completed?
            ;; Mark session as completed
            (memory/update! key
                            (fn [sessions]
                              (if-let [s (get sessions session-id)]
                                (assoc sessions session-id
                                       (assoc s
                                              :session/state :completed
                                              :session/completed-at (str (java.time.Instant/now))
                                              :session/updated-at (str (java.time.Instant/now))))
                                sessions)))

            (telemetry/emit! {:event :ws/builder-completed
                              :client-id client-id
                              :project-id project-id
                              :session-id session-id
                              :builder-type builder-type-kw})

            ;; Trigger auto-insight via ECA (C-2: non-blocking background task)
            (future
              (try
                (handle-auto-insight! client-id
                                      {:project-id project-id
                                       :builder-type builder-type-kw
                                       :data data})
                (catch Exception e
                  (telemetry/emit! {:event :ws/auto-insight-error
                                    :client-id client-id
                                    :error (.getMessage e)}))))))))))

(defn- handle-auto-insight!
  "Generate an auto-insight when a builder section completes.
   Sends ECA a focused prompt about the completed builder data and streams
   the response back as auto-insight tokens. Saves completed insight to learning memory."
  [client-id {:keys [project-id builder-type data]}]
  (let [user-id (current-user-id)
        builder-type-kw (if (string? builder-type) (keyword builder-type) builder-type)
        builder-label (get phase-labels builder-type-kw (name (or builder-type-kw :unknown)))]

    ;; Only proceed if ECA is truly alive (don't auto-start for background insights)
    (when (eca/alive?)
      (let [chat-id (str "ws-insight-" client-id "-" (System/currentTimeMillis))
            listener-id (keyword (str "ws-insight-" client-id))
            ;; Accumulate streamed text for saving to learning
            insight-text (atom "")
            ;; Build context from the completed data
            context-str (assemble-project-context user-id project-id builder-type-kw)
            ;; Insight-specific prompt
            prompt (str "You are a product development coach. The user just completed their "
                        builder-label " builder. Based on the project context below, provide:\n"
                        "1. A brief congratulatory note (1 sentence)\n"
                        "2. One key insight or pattern you notice from their work (2-3 sentences)\n"
                        "3. How this connects to the next phase in the product development flywheel (1-2 sentences)\n\n"
                        "Keep it concise and specific to their actual data. No generic advice.\n\n"
                        "---\n\n" context-str)]

        ;; Notify client that auto-insight is starting
        (send-to! client-id {:type :eca/auto-insight-start
                             :project-id project-id
                             :builder-type builder-type-kw
                             :timestamp (System/currentTimeMillis)})

        ;; Register streaming callback
        (eca/register-callback! "chat/contentReceived" listener-id
          (fn [notification]
            (let [params (:params notification)
                  notif-chat-id (:chatId params)
                  role (:role params)
                  content (:content params)]
              (when (= notif-chat-id chat-id)
                (cond
                  ;; Done -> send insight-done, unregister, store insight in learning
                  (and (= "progress" (:type content))
                       (#{"done" "finished"} (:state content)))
                  (do
                    (send-to! client-id {:type :eca/auto-insight-done
                                         :project-id project-id
                                         :builder-type builder-type-kw
                                         :timestamp (System/currentTimeMillis)})
                    (eca/unregister-callback! "chat/contentReceived" listener-id)

                    ;; Save completed insight to learning memory (C-5)
                    (let [full-text @insight-text]
                      (when (seq full-text)
                        (try
                          (learning/save-insight! user-id
                            {:title (str builder-label " Completion Insight")
                             :insights [full-text]
                             :pattern (str "builder-completion-" (name builder-type-kw))
                             :category "builder-insight"
                             :tags #{(name builder-type-kw) "auto-insight" (str project-id)}
                             :transfers [(name builder-type-kw)]})
                          (telemetry/emit! {:event :ws/insight-saved-to-learning
                                            :client-id client-id
                                            :project-id project-id
                                            :builder-type builder-type-kw
                                            :insight-length (count full-text)})
                          (catch Exception e
                            (telemetry/emit! {:event :ws/insight-save-error
                                              :error (.getMessage e)})))))

                    (telemetry/emit! {:event :ws/auto-insight-done
                                      :client-id client-id
                                      :project-id project-id
                                      :builder-type builder-type-kw}))

                  ;; Assistant text -> accumulate and stream as auto-insight token
                  (and (= role "assistant") (= "text" (:type content)))
                  (do
                    (swap! insight-text str (:text content))
                    (send-to! client-id {:type :eca/auto-insight-token
                                         :token (:text content)
                                         :project-id project-id
                                         :builder-type builder-type-kw
                                         :timestamp (System/currentTimeMillis)}))

                  :else nil)))))

        ;; Send prompt to ECA
        (try
          (let [result (eca/chat-prompt prompt {:chat-id chat-id})]
            (when (= :error (:status result))
              (eca/unregister-callback! "chat/contentReceived" listener-id)
              (telemetry/emit! {:event :ws/auto-insight-error
                                :client-id client-id
                                :error (or (:message result) (:error result))})))
          (catch Exception e
            (eca/unregister-callback! "chat/contentReceived" listener-id)
            (telemetry/emit! {:event :ws/auto-insight-error
                              :client-id client-id
                              :error (.getMessage e)})))))))

;; ============================================================================
;; Kanban Board
;; ============================================================================

(def ^:private builder-sections
  "All sections across all builders, in flywheel order.
   Each section maps to one Kanban card."
  [{:builder-type :empathy-map
    :builder-label "Empathy Map"
    :builder-color "#8E24AA"
    :sections [{:key :persona     :title "Persona"       :icon "👤" :description "Who is your ideal customer?"}
               {:key :think-feel  :title "Think & Feel"  :icon "🧠" :description "What's going on inside their head?"}
               {:key :hear        :title "Hear"          :icon "👂" :description "What do they hear from others?"}
               {:key :see         :title "See"           :icon "👁️" :description "What do they see in their environment?"}
               {:key :say-do      :title "Say & Do"      :icon "💬" :description "What do they say and how do they behave?"}
               {:key :pains-gains :title "Pains & Gains" :icon "⚡" :description "What frustrates them? What do they want?"}]}
   {:builder-type :value-proposition
    :builder-label "Value Prop"
    :builder-color "#1565C0"
    :sections [{:key :customer-job   :title "Customer Job"    :icon "🎯" :description "What job does your customer need done?"}
               {:key :pains          :title "Customer Pains"  :icon "😫" :description "What frustrates your customer?"}
               {:key :gains          :title "Customer Gains"  :icon "🌟" :description "What would make their life better?"}
               {:key :products       :title "Products & Services" :icon "📦" :description "What will you offer?"}
               {:key :pain-relievers :title "Pain Relievers"  :icon "💊" :description "How do you reduce pains?"}
               {:key :gain-creators  :title "Gain Creators"   :icon "🚀" :description "How do you create gains?"}]}
   {:builder-type :mvp-planning
    :builder-label "MVP"
    :builder-color "#E65100"
    :sections [{:key :core-problem       :title "Core Problem"       :icon "🎯" :description "The single most important problem"}
               {:key :target-user        :title "Target User"        :icon "👤" :description "Your FIRST target user"}
               {:key :success-metric     :title "Success Metric"     :icon "📊" :description "How will you measure success?"}
               {:key :must-have-features :title "Must-Have Features" :icon "✅" :description "Essential MVP features"}
               {:key :nice-to-have       :title "Nice-to-Have (V2)"  :icon "💭" :description "Features for after MVP"}
               {:key :out-of-scope       :title "Out of Scope"       :icon "🚫" :description "Explicitly NOT building"}
               {:key :timeline           :title "Timeline"           :icon "📅" :description "Timeline to launch"}
               {:key :risks              :title "Risks & Assumptions" :icon "⚠️" :description "Biggest risks"}]}
   {:builder-type :lean-canvas
    :builder-label "Lean Canvas"
    :builder-color "#2E7D32"
    :sections [{:key :problems          :title "Problems"           :icon "😫" :description "Top 3 customer problems"}
               {:key :customer-segments :title "Customer Segments"  :icon "👥" :description "Target customers and users"}
               {:key :uvp              :title "Unique Value Prop"   :icon "✨" :description "Single compelling message"}
               {:key :solution         :title "Solution"            :icon "💡" :description "Top 3 features"}
               {:key :channels         :title "Channels"            :icon "📢" :description "Path to customers"}
               {:key :revenue-streams  :title "Revenue Streams"     :icon "💵" :description "How you make money"}
               {:key :cost-structure   :title "Cost Structure"      :icon "💰" :description "Fixed and variable costs"}
               {:key :key-metrics      :title "Key Metrics"         :icon "📊" :description "Key activities you measure"}
               {:key :unfair-advantage :title "Unfair Advantage"    :icon "🛡️" :description "Can't be easily copied"}]}])

(defn- section-completed?
  "Check if a specific section has data in a builder session.
   Canvas builders: notes map grouped by :item/section.
   Form builders: vector of {:section-key ...} responses."
  [builder-type section-key data]
  (case builder-type
    (:empathy-map :lean-canvas)
    (let [notes (vals (or data {}))
          sections-with-notes (set (map :item/section notes))]
      (contains? sections-with-notes section-key))

    (:value-proposition :mvp-planning)
    (let [responses (or data [])
          section-keys (set (map :section-key responses))]
      (contains? section-keys section-key))

    false))

(defn- compute-kanban-board
  "Compute the full Kanban board state for a project.
   Derives card status from actual builder session data.
   Returns {:columns [...] :summary {...}}."
  [user-id project-id]
  (let [sessions-key (keyword (str "builder-sessions/" (name user-id)))
        all-sessions (vals (or (memory/get-value sessions-key) {}))
        project-sessions (filter #(= (:session/project-id %) project-id) all-sessions)
        by-type (group-by :session/type project-sessions)
        ;; Build cards from all sections
        cards (for [{:keys [builder-type builder-label builder-color sections]} builder-sections
                    {:keys [key title icon description]} sections]
                (let [sessions (get by-type builder-type [])
                      latest (last (sort-by :session/updated-at sessions))
                      data (:session/data latest)
                      session-exists? (some? latest)
                      section-done? (and session-exists?
                                         (section-completed? builder-type key data))
                      ;; Count notes/content for this section
                      note-count (case builder-type
                                   (:empathy-map :lean-canvas)
                                   (count (filter #(= key (:item/section %))
                                                  (vals (or data {}))))
                                   (:value-proposition :mvp-planning)
                                   (if section-done? 1 0)
                                   0)
                      status (cond
                               section-done? :done
                               session-exists? :in-progress
                               :else :not-started)]
                  {:id (str (name builder-type) ":" (name key))
                   :title title
                   :icon icon
                   :builder-type builder-type
                   :builder-label builder-label
                   :builder-color builder-color
                   :section-key key
                   :status status
                   :description description
                   :has-data? section-done?
                   :note-count note-count}))
        ;; Group into columns
        by-status (group-by :status cards)
        columns [{:id :not-started
                  :label "Not Started"
                  :cards (vec (get by-status :not-started []))}
                 {:id :in-progress
                  :label "In Progress"
                  :cards (vec (get by-status :in-progress []))}
                 {:id :done
                  :label "Done"
                  :cards (vec (get by-status :done []))}]
        total (count cards)
        done-count (count (get by-status :done []))
        in-progress-count (count (get by-status :in-progress []))]
    {:columns columns
     :summary {:total total
               :done done-count
               :in-progress in-progress-count
               :not-started (- total done-count in-progress-count)}}))

(defn- handle-kanban-board!
  "Handle a kanban/board request from the frontend.
   Returns the computed Kanban board state for a project."
  [client-id {:keys [project-id]}]
  (let [user-id (current-user-id)
        board (compute-kanban-board user-id project-id)]
    (send-to! client-id {:type :kanban/board
                         :project-id project-id
                         :board board
                         :timestamp (System/currentTimeMillis)})))

;; ============================================================================
;; Analytics Dashboard Handler
;; ============================================================================

(defn- handle-analytics-dashboard!
  "Handle an analytics/dashboard request from the frontend.
   Returns real analytics data computed from actual project/session data."
  [client-id {:keys [project-id]}]
  (let [user-id (current-user-id)
        ;; Real progress data
        progress (analytics/project-progress project-id user-id)
        ;; Real health score
        health (analytics/calculate-health-score project-id user-id)
        ;; Real prediction (score + factors, message will come from ECA)
        prediction (analytics/predict-success project-id user-id)
        ;; Real funnel from session data
        funnel (analytics/completion-funnel)
        ;; Real time tracking per session
        sessions-key (keyword (str "builder-sessions/" (name user-id)))
        all-sessions (vals (or (memory/get-value sessions-key) {}))
        project-sessions (filter #(= (:session/project-id %) project-id) all-sessions)
        time-data (mapv (fn [session]
                          (let [time-info (analytics/time-in-stage session)]
                            {:stage (:session/type session)
                             :stage/time (:stage/time-total-ms time-info)
                             :completed? (:stage/completed? time-info)}))
                        project-sessions)
        total-time (reduce + 0 (keep :stage/time time-data))]

    (send-to! client-id {:type :analytics/dashboard
                         :project-id project-id
                         :data {:progress (:project/overall-percentage progress)
                                :stages (:project/stages progress)
                                :health-score (:health/score health)
                                :health-factors (:health/factors health)
                                :prediction {:likelihood (:likelihood prediction)
                                             :confidence (:confidence prediction)
                                             :score (:health/score prediction)}
                                :funnel (:funnel/stages funnel)
                                :total-users (:funnel/total-users funnel)
                                :time-tracking {:total-time total-time
                                                :stages time-data}}
                         :timestamp (System/currentTimeMillis)})

    ;; Also request ECA to generate a contextual prediction message
    (when (eca/alive?)
      (future
        (try
          (let [chat-id (str "ws-analytics-" client-id "-" (System/currentTimeMillis))
                listener-id (keyword (str "ws-analytics-msg-" client-id))
                context-str (assemble-project-context user-id project-id nil)
                prompt (str "You are a product development analyst. Based on the project data below, "
                            "write a brief (2-3 sentences) assessment of the project's current state "
                            "and one specific recommendation. Be concrete and specific to the data.\n\n"
                            "Health score: " (:health/score health) "/100\n"
                            "Likelihood: " (name (:likelihood prediction)) "\n"
                            "Overall progress: " (:project/overall-percentage progress) "%\n\n"
                            "---\n\n" context-str)]
            ;; Register callback
            (eca/register-callback! "chat/contentReceived" listener-id
              (fn [notification]
                (let [params (:params notification)
                      notif-chat-id (:chatId params)
                      role (:role params)
                      content (:content params)]
                  (when (= notif-chat-id chat-id)
                    (cond
                      (and (= "progress" (:type content))
                           (#{"done" "finished"} (:state content)))
                      (do
                        (send-to! client-id {:type :analytics/prediction-done
                                             :project-id project-id
                                             :timestamp (System/currentTimeMillis)})
                        (eca/unregister-callback! "chat/contentReceived" listener-id))

                      (and (= role "assistant") (= "text" (:type content)))
                      (send-to! client-id {:type :analytics/prediction-token
                                           :token (:text content)
                                           :project-id project-id
                                           :timestamp (System/currentTimeMillis)})

                      :else nil)))))
            ;; Send to ECA
            (let [result (eca/chat-prompt prompt {:chat-id chat-id})]
              (when (= :error (:status result))
                (eca/unregister-callback! "chat/contentReceived" listener-id))))
          (catch Exception e
            (telemetry/emit! {:event :ws/analytics-prediction-error
                              :client-id client-id
                              :error (.getMessage e)})))))))

;; ============================================================================
;; Content Generation Handler (Generic ECA content)
;; ============================================================================

(def ^:private content-prompts
  "System prompts for different content generation types"
  {:insights
   "You are a product development coach. Based on the project data below, provide 2-3 specific insights about the user's work. Be concrete and reference their actual data. Format as a JSON array of objects with keys: type, title, description, confidence (0-1). Example: [{\"type\":\"pattern\",\"title\":\"Strong customer focus\",\"description\":\"Your empathy map shows...\",\"confidence\":0.85}]"

   :blockers
   "You are a product development coach. Based on the project data below, identify any potential blockers or gaps. What's missing? What should the user address before moving forward? Be specific. Format as a JSON array of strings."

   :templates
   "You are a product strategy advisor. Based on the project description below, suggest 3-4 product templates/archetypes that could fit this project. For each, give: name, icon (emoji), description (1 sentence), and relevant tags. Format as a JSON array of objects with keys: key, name, icon, description, tags (array of strings)."

   :chat-suggestions
   "You are a product development assistant. Based on the current project context and phase, generate 4 specific questions or prompts the user could ask to deepen their work. Each should be a complete sentence. Format as a JSON array of strings."

   :flywheel-guide
   "You are a product development coach. Based on the project data below, provide guidance for each of the 4 flywheel phases (Empathy Map, Value Proposition, MVP Planning, Lean Canvas). For each phase, give a personalized tagline and 1-2 sentence description based on their actual data. Format as a JSON array of objects with keys: key (empathy/valueprop/mvp/canvas), tagline, description."

   :section-hints
   "You are a product development coach. Based on the project context, generate helpful hints and descriptions for the builder sections the user is working on. Be specific to their project, not generic. Format as a JSON object mapping section keys to objects with keys: description, hint."

   :learning-categories
   "You are a product strategist. Based on the user's project data and learning history, describe what they've learned in each category: customer-understanding, product-development, business-model, competitive-landscape. Give insight counts and brief descriptions. Format as a JSON array of objects with keys: category, label, description, count."})

(defn- handle-content-generate!
  "Handle a content/generate request from the frontend.
   Routes to ECA with content-type-specific prompts.
   Sends streaming tokens back, then a complete message."
  [client-id {:keys [project-id content-type context]}]
  (let [user-id (current-user-id)
        content-type-kw (if (string? content-type) (keyword content-type) content-type)]

    ;; Auto-start ECA if not running (use ensure-alive! for robust startup)
    (when-not (eca/alive?)
      (eca/ensure-alive!))

    (if-not (eca/alive?)
      (send-to! client-id {:type :content/error
                           :content-type content-type-kw
                           :error "ECA not available"
                           :timestamp (System/currentTimeMillis)})

      (let [chat-id (str "ws-content-" (name content-type-kw) "-" client-id "-" (System/currentTimeMillis))
            listener-id (keyword (str "ws-content-" (name content-type-kw) "-" client-id))
            accumulated (atom "")
            context-str (assemble-project-context user-id project-id nil)
            system-prompt (get content-prompts content-type-kw
                               "You are a product development advisor. Provide specific, actionable guidance based on the project data below.")
            prompt (str system-prompt "\n\n---\n\n" context-str
                        (when context (str "\n\nAdditional context: " context)))]

        (telemetry/emit! {:event :ws/content-generate-request
                          :client-id client-id
                          :content-type content-type-kw
                          :project-id project-id})

        ;; Register streaming callback
        (eca/register-callback! "chat/contentReceived" listener-id
          (fn [notification]
            (let [params (:params notification)
                  notif-chat-id (:chatId params)
                  role (:role params)
                  content (:content params)]
              (when (= notif-chat-id chat-id)
                (cond
                  ;; Done
                  (and (= "progress" (:type content))
                       (#{"done" "finished"} (:state content)))
                  (do
                    (send-to! client-id {:type :content/generated
                                         :content-type content-type-kw
                                         :content @accumulated
                                         :project-id project-id
                                         :timestamp (System/currentTimeMillis)})
                    (eca/unregister-callback! "chat/contentReceived" listener-id)
                    (telemetry/emit! {:event :ws/content-generate-done
                                      :client-id client-id
                                      :content-type content-type-kw}))

                  ;; Token
                  (and (= role "assistant") (= "text" (:type content)))
                  (do
                    (swap! accumulated str (:text content))
                    (send-to! client-id {:type :content/token
                                         :content-type content-type-kw
                                         :token (:text content)
                                         :project-id project-id
                                         :timestamp (System/currentTimeMillis)}))

                  :else nil)))))

        ;; Send to ECA
        (try
          (let [result (eca/chat-prompt prompt {:chat-id chat-id})]
            (when (= :error (:status result))
              (send-to! client-id {:type :content/error
                                   :content-type content-type-kw
                                   :error (or (:message result) (:error result))
                                   :timestamp (System/currentTimeMillis)})
              (eca/unregister-callback! "chat/contentReceived" listener-id)))
          (catch Exception e
            (send-to! client-id {:type :content/error
                                 :content-type content-type-kw
                                 :error (.getMessage e)
                                 :timestamp (System/currentTimeMillis)})
            (eca/unregister-callback! "chat/contentReceived" listener-id)))))))

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
        user-id (current-user-id)]

    ;; Use ensure-alive! for robust startup with auto-restart
    (when-not (eca/alive?)
      (telemetry/emit! {:event :ws/eca-wisdom-auto-start :client-id client-id})
      (when-not (eca/ensure-alive!)
        (send-to! client-id {:type :eca/wisdom-response
                             :text "ECA could not be started. Ensure the ECA binary is installed."
                             :request-type request-type-kw
                             :timestamp (System/currentTimeMillis)})
        (telemetry/emit! {:event :ws/eca-wisdom-auto-start-failed :client-id client-id})))

    (if-not (eca/alive?)
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
  (let [user-id (current-user-id)
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

        "eca/debug"
        (let [enabled? (boolean (:enabled? message))]
          (telemetry/emit! {:event :eca/debug-toggle
                            :enabled? enabled?
                            :client-id id})
          (future
            (try
              (eca/stop!)
              (eca/start! {:debug? enabled?})
              (send-to! id {:type :eca/debug-status
                            :enabled? enabled?
                            :timestamp (System/currentTimeMillis)})
              (catch Exception e
                (telemetry/emit! {:event :eca/debug-toggle-error
                                  :enabled? enabled?
                                  :client-id id
                                  :error (.getMessage e)})
                (send-to! id {:type :eca/debug-status
                              :enabled? enabled?
                              :error (.getMessage e)
                              :timestamp (System/currentTimeMillis)})))))

        "flywheel/progress"
        (handle-flywheel-progress! id message)

        "builder/save-data"
        (handle-save-builder-data! id message)

        "learning/save-examples"
        (handle-learning-save-examples! id message)

        "wisdom/template"
        (handle-wisdom-template! id message)

        "kanban/board"
        (handle-kanban-board! id message)

        "analytics/dashboard"
        (future (handle-analytics-dashboard! id message))

        "content/generate"
        (future (handle-content-generate! id message))
        
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
                                 :timestamp (System/currentTimeMillis)}))
        ;; Auto-detect workspace project and send to client
        (future
          (try
            (let [project (ensure-workspace-project!)]
              (httpkit/send! channel (json/generate-string
                                      {:type :project/detected
                                       :project project
                                       :timestamp (System/currentTimeMillis)})))
            (catch Exception e
              (println "Error detecting workspace project:" (.getMessage e))))))
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
  (let [normalized (cond
                     (:event event) event
                     (:event/type event) (assoc event :event (:event/type event))
                     (:type event) (assoc event :event (:type event))
                     :else event)]
    (broadcast-to! :telemetry/events
                   {:type :telemetry/event
                    :data normalized
                    :timestamp (System/currentTimeMillis)})))

(defn- format-example-items
  "Convert builder data into a list of example items"
  [builder-type data]
  (case builder-type
    :empathy-map
    (let [notes (vals (or data {}))]
      (map (fn [note]
             {:section (name (:item/section note))
              :content (:item/content note)
              :kind :sticky-note})
           notes))

    :lean-canvas
    (let [notes (vals (or data {}))]
      (map (fn [note]
             {:section (name (:item/section note))
              :content (:item/content note)
              :kind :sticky-note})
           notes))

    :value-proposition
    (let [responses (or data [])]
      (map (fn [{:keys [section-key response]}]
             {:section (name section-key)
              :content response
              :kind :response})
           responses))

    :mvp-planning
    (let [responses (or data [])]
      (map (fn [{:keys [section-key response]}]
             {:section (name section-key)
              :content response
              :kind :response})
           responses))

    []))

(defn- handle-learning-save-examples!
  "Persist builder contents as learning examples"
  [client-id {:keys [project-id label template-key builder-type session-id data]}]
  (let [user-id (current-user-id)
        builder-type-kw (if (string? builder-type) (keyword builder-type) builder-type)
        title (str "Wisdom Example - " label)
        examples (format-example-items builder-type-kw data)
        tags (cond-> #{"wisdom" "example" (name builder-type-kw)}
               template-key (conj (name template-key))
               project-id (conj (str project-id)))]
    (learning/save-insight! user-id
                            {:title title
                             :insights [(str "Captured builder examples from " label)]
                             :pattern "wisdom-example"
                             :category "product-development"
                             :tags tags
                             :examples (vec examples)})
    (telemetry/emit! {:event :wisdom/examples-saved
                      :client-id client-id
                      :project-id project-id
                      :builder-type builder-type-kw})
    (send-to! client-id {:type :learning/examples-saved
                         :project-id project-id
                         :builder-type builder-type-kw
                         :timestamp (System/currentTimeMillis)})))

(defn- handle-wisdom-template!
  "Return template data by key"
  [client-id {:keys [template-key]}]
  (let [template-kw (keyword template-key)
        template (wisdom/get-template template-kw)]
    (send-to! client-id {:type :wisdom/template
                         :template-key (name template-kw)
                         :data template
                         :timestamp (System/currentTimeMillis)})))

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
