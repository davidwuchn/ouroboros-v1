(ns ouroboros.frontend.websocket
  "WebSocket client for real-time updates"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.application :as app]))

;; Forward declarations
(declare connected? stop-ping-loop! send!)

;; ============================================================================
;; App State Reference
;; ============================================================================

(defonce app-state-atom (atom nil))
(defonce render-callback (atom nil))
(defonce navigate-callback (atom nil))

;; ============================================================================
;; Wisdom Cache Persistence (localStorage)
;; ============================================================================

(def ^:private wisdom-cache-key "ouroboros.wisdom-cache")

(defn- load-wisdom-cache
  "Load wisdom cache from localStorage. Returns map or nil."
  []
  (try
    (when-let [raw (.getItem js/localStorage wisdom-cache-key)]
      (let [parsed (js/JSON.parse raw)
            m (js->clj parsed :keywordize-keys true)]
        ;; Convert string keys back to [phase request-type] vectors
        ;; Stored as {"empathy:tips" "content"} -> {[:empathy :tips] "content"}
        (into {}
              (keep (fn [[k v]]
                      (let [parts (str/split (name k) #":")]
                        (when (= 2 (count parts))
                          [[(keyword (first parts)) (keyword (second parts))] v]))))
              m)))
    (catch :default _e nil)))

(defn- save-wisdom-cache!
  "Persist wisdom cache to localStorage."
  [cache-map]
  (try
    ;; Convert [phase request-type] keys to strings: "empathy:tips"
    (let [serializable (into {}
                             (map (fn [[[phase req-type] content]]
                                    [(str (name phase) ":" (name req-type)) content]))
                             cache-map)]
      (.setItem js/localStorage wisdom-cache-key
                (js/JSON.stringify (clj->js serializable))))
    (catch :default _e nil)))

;; ============================================================================
;; Content Cache Persistence (localStorage)
;; ============================================================================

(def ^:private content-cache-key "ouroboros.content-cache")

;; Content types worth caching (expensive ECA calls with stable results)
(def ^:private cacheable-content-types
  #{:templates :learning-categories :chat-suggestions :flywheel-guide})

(defn- load-content-cache
  "Load cached content/generated data from localStorage.
   Returns map of {content-type-kw -> data} or nil."
  []
  (try
    (when-let [raw (.getItem js/localStorage content-cache-key)]
      (let [parsed (js/JSON.parse raw)]
        (js->clj parsed :keywordize-keys true)))
    (catch :default _e nil)))

(defn- save-content-cache!
  "Persist content/generated data to localStorage.
   Only caches content types in `cacheable-content-types`."
  [generated-map]
  (try
    (let [to-cache (select-keys generated-map cacheable-content-types)]
      (when (seq to-cache)
        (.setItem js/localStorage content-cache-key
                  (js/JSON.stringify (clj->js to-cache)))))
    (catch :default _e nil)))

(defn set-app-state-atom!
  "Set the app state atom for merging data"
  [state-atom]
  (reset! app-state-atom state-atom)
  ;; Hydrate wisdom cache from localStorage
  (when-let [cached (load-wisdom-cache)]
    (swap! state-atom assoc :wisdom/cache cached))
  ;; Hydrate content cache from localStorage
  (when-let [cached-content (load-content-cache)]
    (swap! state-atom update :content/generated merge cached-content)))

(defn set-render-callback!
  "Set a callback to trigger UI re-render after state mutation"
  [cb]
  (reset! render-callback cb))

(defn set-navigate-callback!
  "Set a callback for programmatic navigation: (fn [route-segments])"
  [cb]
  (reset! navigate-callback cb))

(defn schedule-render!
  "Schedule a UI re-render after direct state mutation.
   Public to allow timeout callbacks in other namespaces."
  []
  (when-let [cb @render-callback]
    (cb)))

;; ============================================================================
;; Connection State
;; ============================================================================

(defonce ws-connection (atom nil))
(defonce reconnect-timeout (atom nil))
(defonce reconnect-attempts (atom 0))
(defonce subscribed-topics (atom #{}))  ;; Track topics we're subscribed to

(def max-reconnect-attempts 5)
(def reconnect-delay-ms 3000)

;; ============================================================================
;; Message Handlers
;; ============================================================================

(defmulti handle-message :type)

(defmethod handle-message :default
  [message]
  (js/console.log "Unknown WebSocket message type:" (:type message))
  (js/console.log "Full message keys:" (keys message))
  (js/console.log "Full message:" (clj->js message)))

(defmethod handle-message :connected
  [{:keys [client-id timestamp]}]
  (js/console.log "WebSocket connected, client ID:" client-id))

(defmethod handle-message :telemetry/event
  [{:keys [data]}]
  (js/console.log "Telemetry event received:" data)
  (when-let [state-atom @app-state-atom]
    ;; Normalize WS event to same shape as page-load events:
    ;; {:event/id ..., :event/timestamp ..., :event/extra <raw-event>}
    (let [normalized {:event/id (or (:event/id data) (str (random-uuid)))
                      :event/timestamp (or (:event/timestamp data) (str (js/Date.)))
                      :event/extra data}]
      ;; Update shared state
      (swap! state-atom update-in [:telemetry/events] (fnil conj []) normalized)
      ;; Also update Fulcro normalized path for TelemetryPage component
      (swap! state-atom (fn [s]
                          (-> s
                              (update-in [:page/id :telemetry :telemetry/events]
                                         (fn [events]
                                           (vec (cons normalized (take 49 events)))))
                              (update-in [:page/id :telemetry :telemetry/total-events] (fnil inc 0))
                              (cond->
                                (= :tool/invoke (:event data))
                                (update-in [:page/id :telemetry :telemetry/tool-invocations] (fnil inc 0))
                                (false? (:success? data))
                                (update-in [:page/id :telemetry :telemetry/errors] (fnil inc 0)))))))
    (schedule-render!)))

(defmethod handle-message :builder-session/update
  [{:keys [session-id data]}]
  (js/console.log "Builder session update received:" session-id data)
  ;; Merge into app state - update session data
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:builder-session/data session-id] data)))

(defmethod handle-message :pong
  [{:keys [timestamp]}]
  ;; Keep connection alive
  nil)

;; ============================================================================
;; ECA Chat Message Handlers
;; ============================================================================

(defmethod handle-message :eca/chat-response
  [{:keys [text]}]
  ;; Complete (non-streaming) response from ECA
  (when-let [state-atom @app-state-atom]
    (let [messages (get-in @state-atom [:chat/id :global :chat/messages] [])
          idx (dec (count messages))]
      (when (and (>= idx 0)
                 (= :assistant (:role (nth messages idx)))
                 (:streaming? (nth messages idx)))
        (swap! state-atom
               (fn [s]
                 (-> s
                     (assoc-in [:chat/id :global :chat/messages idx]
                               {:role :assistant
                                :content text
                                :timestamp (js/Date.now)})
                     (assoc-in [:chat/id :global :chat/loading?] false))))
        (schedule-render!)))))

(defmethod handle-message :eca/chat-token
  [{:keys [token]}]
  ;; Streaming token from ECA
  (when-let [state-atom @app-state-atom]
    (let [messages (get-in @state-atom [:chat/id :global :chat/messages] [])
          idx (dec (count messages))]
      (when (and (>= idx 0)
                 (= :assistant (:role (nth messages idx))))
        (swap! state-atom update-in
               [:chat/id :global :chat/messages idx :content] str token)
        (schedule-render!)))))

(defmethod handle-message :eca/chat-done
  [_]
  ;; Streaming complete
  (when-let [state-atom @app-state-atom]
    (let [messages (get-in @state-atom [:chat/id :global :chat/messages] [])
          idx (dec (count messages))]
      (when (and (>= idx 0)
                 (= :assistant (:role (nth messages idx))))
        (swap! state-atom
               (fn [s]
                 (-> s
                     (update-in [:chat/id :global :chat/messages idx] dissoc :streaming?)
                     (assoc-in [:chat/id :global :chat/loading?] false))))
        (schedule-render!)))))

(defmethod handle-message :eca/chat-error
  [{:keys [error]}]
  ;; Chat error from ECA - mark last assistant message as errored
  (when-let [state-atom @app-state-atom]
    (let [messages (get-in @state-atom [:chat/id :global :chat/messages] [])
          idx (dec (count messages))]
      (when (and (>= idx 0)
                 (= :assistant (:role (nth messages idx))))
        (swap! state-atom
               (fn [s]
                 (-> s
                     (update-in [:chat/id :global :chat/messages idx]
                                assoc
                                :error? true
                                :streaming? false
                                :content (or error "Something went wrong. Click retry to try again."))
                     (assoc-in [:chat/id :global :chat/loading?] false))))
        (schedule-render!)))))

(defmethod handle-message :eca/debug-status
  [{:keys [enabled? error]}]
  (when error
    (js/console.warn "ECA debug toggle failed:" error))
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:page/id :telemetry :debug/enabled?] (boolean enabled?))
    (schedule-render!)))

;; ============================================================================
;; ECA Wisdom Message Handlers
;; ============================================================================

(defmethod handle-message :eca/wisdom-token
  [{:keys [token request-type]}]
  ;; Streaming wisdom token from ECA
  (when-let [state-atom @app-state-atom]
    (swap! state-atom update-in
           [:wisdom/id :global :wisdom/content] str token)
    (schedule-render!)))

(defmethod handle-message :eca/wisdom-done
  [{:keys [request-type]}]
  ;; Wisdom streaming complete - cache the result and persist
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (let [content (get-in s [:wisdom/id :global :wisdom/content])
                   phase (get-in s [:wisdom/id :global :wisdom/phase])
                   req-type (or (when (string? request-type) (keyword request-type))
                                (when (keyword? request-type) request-type)
                                (get-in s [:wisdom/id :global :wisdom/request-type]))]
               (cond-> (-> s
                           (assoc-in [:wisdom/id :global :wisdom/loading?] false)
                           (assoc-in [:wisdom/id :global :wisdom/streaming?] false))
                 ;; Cache the completed content keyed by [phase request-type]
                 (and phase req-type (seq content))
                 (assoc-in [:wisdom/cache [phase req-type]] content)))))
    ;; Persist cache to localStorage
    (save-wisdom-cache! (:wisdom/cache @state-atom))
    (schedule-render!)))

(defmethod handle-message :eca/wisdom-response
  [{:keys [text request-type]}]
  ;; Complete (non-streaming) wisdom response or error - cache and persist
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (let [phase (get-in s [:wisdom/id :global :wisdom/phase])
                   req-type (or (when (string? request-type) (keyword request-type))
                                (when (keyword? request-type) request-type)
                                (get-in s [:wisdom/id :global :wisdom/request-type]))]
               (cond-> (-> s
                           (assoc-in [:wisdom/id :global :wisdom/content] text)
                           (assoc-in [:wisdom/id :global :wisdom/loading?] false)
                           (assoc-in [:wisdom/id :global :wisdom/streaming?] false))
                 ;; Cache the completed content
                 (and phase req-type (seq text))
                 (assoc-in [:wisdom/cache [phase req-type]] text)))))
    ;; Persist cache to localStorage
    (save-wisdom-cache! (:wisdom/cache @state-atom))
    (schedule-render!)))

;; ============================================================================
;; Flywheel Progress Message Handlers
;; ============================================================================

(defmethod handle-message :flywheel/progress
  [{:keys [project-id progress]}]
  ;; Flywheel progress data from backend
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:flywheel/progress project-id] progress)
    (schedule-render!)))

;; ============================================================================
;; Builder Data Persistence Handlers
;; ============================================================================

(defmethod handle-message :builder/data-saved
  [{:keys [session-id project-id builder-type]}]
  ;; Confirmation that builder data was persisted
  ;; Also refresh Kanban board if it's loaded
  (js/console.log "Builder data saved:" builder-type session-id)
  (when-let [state-atom @app-state-atom]
    (when (get-in @state-atom [:kanban/board project-id])
      ;; Re-request Kanban board to reflect updated builder data
      (send! {:type "kanban/board" :project-id project-id}))))

(defmethod handle-message :wisdom/template
  [{:keys [template-key data]}]
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:wisdom/template (keyword template-key)] data)
    (schedule-render!)))

;; ============================================================================
;; Kanban Board Message Handlers
;; ============================================================================

(defmethod handle-message :kanban/board
  [{:keys [project-id board]}]
  ;; Kanban board data from backend
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:kanban/board project-id] board)
    (schedule-render!)))

;; ============================================================================
;; Analytics Dashboard Message Handlers
;; ============================================================================

(defmethod handle-message :analytics/dashboard
  [{:keys [project-id data]}]
  ;; Real analytics data from backend (progress, health, funnel, prediction, time)
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:analytics/dashboard project-id] data)
    (schedule-render!)))

(defmethod handle-message :analytics/prediction-token
  [{:keys [token project-id]}]
  ;; Streaming prediction message token from ECA
  (when-let [state-atom @app-state-atom]
    (swap! state-atom update-in
           [:analytics/dashboard project-id :prediction-message] str token)
    (schedule-render!)))

(defmethod handle-message :analytics/prediction-done
  [{:keys [project-id]}]
  ;; Prediction streaming complete
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in
           [:analytics/dashboard project-id :prediction-streaming?] false)
    (schedule-render!)))

;; ============================================================================
;; Content Generation Message Handlers
;; ============================================================================

(defmethod handle-message :content/token
  [{:keys [token content-type]}]
  ;; Streaming content token from ECA
  (when-let [state-atom @app-state-atom]
    (swap! state-atom update-in
           [:content/streaming content-type] str token)
    (schedule-render!)))

(defmethod handle-message :content/generated
  [{:keys [content-type content]}]
  ;; Content generation complete
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:content/generated content-type] content)
                 (update :content/streaming dissoc content-type)
                 (assoc-in [:content/loading? content-type] false))))
    ;; Persist to localStorage for instant load on next visit
    (save-content-cache! (:content/generated @state-atom))
    (schedule-render!)))

(defmethod handle-message :content/error
  [{:keys [content-type error]}]
  ;; Content generation error
  (js/console.error "Content generation error:" content-type error)
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:content/loading? content-type] false)
    (schedule-render!)))

;; ============================================================================
;; Auto-Insight Message Handlers
;; ============================================================================

(defmethod handle-message :project/detected
  [{:keys [project]}]
  ;; Workspace project auto-detected by backend on WS connect
  (js/console.log "Workspace project detected:" (clj->js project))
  (when-let [state-atom @app-state-atom]
    (let [project-id (:project/id project)
          encoded-id (str/replace (str project-id) "/" "~")]
      (swap! state-atom
             (fn [s]
               (-> s
                   ;; Store the active workspace project
                   (assoc-in [:workspace/project] project)
                   ;; Also normalize it into the project table for Fulcro
                   (assoc-in [:project/id project-id] project))))
      (schedule-render!)
      ;; Auto-navigate to the project detail page (kanban view)
      (when-let [nav @navigate-callback]
        (nav ["project" encoded-id])))))

(defmethod handle-message :eca/auto-insight-start
  [{:keys [project-id builder-type]}]
  ;; Auto-insight generation started after builder completion
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:auto-insight/id project-id :auto-insight/content] "")
                 (assoc-in [:auto-insight/id project-id :auto-insight/loading?] true)
                 (assoc-in [:auto-insight/id project-id :auto-insight/streaming?] true)
                 (assoc-in [:auto-insight/id project-id :auto-insight/builder-type] builder-type))))
    (schedule-render!)))

(defmethod handle-message :eca/auto-insight-token
  [{:keys [token project-id builder-type]}]
  ;; Streaming auto-insight token
  (when-let [state-atom @app-state-atom]
    (swap! state-atom update-in
           [:auto-insight/id project-id :auto-insight/content] str token)
    (schedule-render!)))

(defmethod handle-message :eca/auto-insight-done
  [{:keys [project-id builder-type]}]
  ;; Auto-insight streaming complete
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:auto-insight/id project-id :auto-insight/loading?] false)
                 (assoc-in [:auto-insight/id project-id :auto-insight/streaming?] false))))
    (schedule-render!)))

;; ============================================================================
;; Connection Management
;; ============================================================================

(defn- get-ws-url
  "Get WebSocket URL based on current location
   
   In development, Shadow-CLJS serves on port 8081 but WebSocket server is on 8080.
   We detect this and use the correct port."
  []
  (let [protocol (if (= js/window.location.protocol "https:") "wss:" "ws:")
        host js/window.location.host
        port js/window.location.port]
    (str protocol "//"
         js/window.location.hostname
         (if (= port "8081")
           ":8080"  ; Development: Shadow-CLJS on 8081, API on 8080
           (if (seq port) (str ":" port) ""))
         "/ws")))

(defn connect!
  "Establish WebSocket connection"
  []
  (when-not @ws-connection
    (try
      ;; Mark that we're attempting a connection
      (swap! reconnect-attempts inc)
      (let [ws (js/WebSocket. (get-ws-url))]
        (set! (.-onopen ws)
              (fn []
                (js/console.log "WebSocket connection opened")
                (reset! reconnect-attempts 0)
                ;; Subscribe to telemetry events
                (.send ws (js/JSON.stringify
                           #js {:type "subscribe"
                                :topic "telemetry/events"}))))

        (set! (.-onmessage ws)
              (fn [event]
                (try
                  (let [json-data (.-data event)]
                    (js/console.log "WebSocket raw JSON:" json-data)
                    (let [parsed (js/JSON.parse json-data)]
                      (js/console.log "WebSocket parsed JS object:" parsed)
                      ;; Check if parsed is a JS object (not array)
                      (if (and (object? parsed) (not (array? parsed)))
                        (let [data (js->clj parsed :keywordize-keys true)
                              ;; Ensure :type is a keyword for multimethod dispatch
                              data (if (:type data)
                                     (update data :type keyword)
                                     data)]
                          (js/console.log "WebSocket CLJS data:" data)
                          (if (:type data)
                            (handle-message data)
                            (js/console.warn "WebSocket message missing :type:" data)))
                        (js/console.warn "WebSocket received non-object message:" parsed))))
                  (catch js/Error e
                    (js/console.error "WebSocket message error:" e)))))

        (set! (.-onclose ws)
              (fn [event]
                (js/console.log "WebSocket connection closed")
                (reset! ws-connection nil)
                ;; Attempt reconnection if we were previously connected
                (when (and (> @reconnect-attempts 0)
                           (< @reconnect-attempts max-reconnect-attempts))
                  (swap! reconnect-attempts inc)
                  (js/console.log "WebSocket reconnect attempt" @reconnect-attempts "/" max-reconnect-attempts)
                  (reset! reconnect-timeout
                          (js/setTimeout connect! reconnect-delay-ms)))))

        (set! (.-onerror ws)
              (fn [error]
                ;; Only log as warning - backend may not be running
                (js/console.warn "WebSocket connection failed (backend may not be running)")))

        (reset! ws-connection ws))
      (catch js/Error e
        (js/console.error "WebSocket connection error:" e)))))

(defn disconnect!
  "Close WebSocket connection"
  []
  (when-let [timeout @reconnect-timeout]
    (js/clearTimeout timeout)
    (reset! reconnect-timeout nil))
  (when-let [ws @ws-connection]
    (.close ws)
    (reset! ws-connection nil)
    (js/console.log "WebSocket disconnected")))

(defn send!
  "Send message via WebSocket"
  [message]
  (when-let [ws @ws-connection]
    (when (= (.-readyState ws) js/WebSocket.OPEN)
      (.send ws (js/JSON.stringify (clj->js message))))))

(defn request-wisdom!
  "Request ECA wisdom for a project phase.
   request-type: :tips, :next-steps, :analysis, :suggestions, :templates
   Includes a 25s safety timeout to clear loading state if no response."
  [project-id phase request-type]
  ;; Reset live wisdom state before sending (cache is preserved)
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:wisdom/id :global :wisdom/content] "")
                 (assoc-in [:wisdom/id :global :wisdom/loading?] true)
                 (assoc-in [:wisdom/id :global :wisdom/streaming?] true)
                 (assoc-in [:wisdom/id :global :wisdom/request-type] request-type)
                 (assoc-in [:wisdom/id :global :wisdom/phase] phase))))
    (schedule-render!))
  (send! (cond-> {:type "eca/wisdom"
                  :project-id project-id
                  :request-type (name request-type)}
           phase (assoc :phase (name phase))))
  ;; Safety timeout: clear loading/streaming state if no response in 25s
  (js/setTimeout
   (fn []
     (when-let [state-atom @app-state-atom]
       (when (get-in @state-atom [:wisdom/id :global :wisdom/loading?])
         (swap! state-atom
                (fn [s]
                  (-> s
                      (assoc-in [:wisdom/id :global :wisdom/loading?] false)
                      (assoc-in [:wisdom/id :global :wisdom/streaming?] false))))
         (schedule-render!))))
   25000))

(defn request-eca-debug!
  "Toggle ECA debug mode. Triggers ECA restart on backend."
  [enabled?]
  (send! {:type "eca/debug"
          :enabled? (boolean enabled?)}))

(defn request-flywheel-progress!
  "Request flywheel progress for a project"
  [project-id]
  (send! {:type "flywheel/progress"
          :project-id project-id}))

(defn request-kanban-board!
  "Request Kanban board state for a project"
  [project-id]
  (send! {:type "kanban/board"
          :project-id project-id}))

(defn request-analytics!
  "Request real analytics dashboard data for a project"
  [project-id]
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in
           [:analytics/dashboard project-id :prediction-streaming?] true))
  (send! {:type "analytics/dashboard"
          :project-id project-id}))

(defn request-content!
  "Request ECA-generated content by type.
   content-type: :insights, :blockers, :templates, :chat-suggestions,
                  :flywheel-guide, :section-hints, :learning-categories
   Includes a 25s safety timeout to clear loading state if no response."
  [content-type & {:keys [project-id context]}]
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:content/loading? content-type] true)
                 (assoc-in [:content/streaming content-type] "")))))
    (send! (cond-> {:type "content/generate"
                    :content-type (name content-type)}
             project-id (assoc :project-id project-id)
             context (assoc :context context)))
    ;; Safety timeout: clear loading state if no response in 25s
    (js/setTimeout
     (fn []
       (when-let [state-atom @app-state-atom]
         (when (get-in @state-atom [:content/loading? content-type])
           (swap! state-atom assoc-in [:content/loading? content-type] false)
           (schedule-render!))))
     25000))

(defn request-learning-save-examples!
  "Save builder contents as learning examples"
  [{:keys [project-id label template-key builder-type session-id data]}]
  (send! {:type "learning/save-examples"
          :project-id project-id
          :label label
          :template-key (when template-key (name template-key))
          :builder-type (name builder-type)
          :session-id session-id
          :data data}))

(defn request-wisdom-template!
  "Request template data from backend"
  [template-key]
  (send! {:type "wisdom/template"
          :template-key (name template-key)}))

(defn save-builder-data!
  "Send builder section data to backend for persistence.
   builder-type: :empathy-map, :value-proposition, :mvp-planning, :lean-canvas
   data: the full builder data (notes map or responses vector)"
  [project-id session-id builder-type data]
  (send! {:type "builder/save-data"
          :project-id project-id
          :session-id session-id
          :builder-type (name builder-type)
          :data data}))

(defn merge-builder-data-into-state!
  "Write builder data directly into Fulcro state at the correct ident path.
   Called after template injection to make data immediately available to builder
   components without requiring navigation + df/load! round-trip.
   builder-type: :empathy-map, :value-proposition, :mvp-planning, :lean-canvas
   data: the builder data (notes map or responses vector)"
  [builder-type data]
  (when-let [state-atom @app-state-atom]
    (case builder-type
      :empathy-map
      (swap! state-atom assoc-in [:page/id :empathy-builder :empathy/notes] data)

      :lean-canvas
      (swap! state-atom assoc-in [:page/id :lean-canvas-builder :lean-canvas/notes] data)

      :value-proposition
      (swap! state-atom assoc-in [:page/id :value-prop-builder :completed-responses] data)

      :mvp-planning
      (swap! state-atom assoc-in [:page/id :mvp-builder :completed-responses] data)

      nil)
    (schedule-render!)))

(defn- send-subscription!
  "Send subscription/unsubscription message"
  [type topic]
  (send! {:type type :topic topic}))

(defn subscribe!
  "Subscribe to a WebSocket topic"
  [topic]
  (when (and (connected?) (not (contains? @subscribed-topics topic)))
    (send-subscription! "subscribe" topic)
    (swap! subscribed-topics conj topic)
    (js/console.log "Subscribed to topic:" topic)))

(defn unsubscribe!
  "Unsubscribe from a WebSocket topic"
  [topic]
  (when (and (connected?) (contains? @subscribed-topics topic))
    (send-subscription! "unsubscribe" topic)
    (swap! subscribed-topics disj topic)
    (js/console.log "Unsubscribed from topic:" topic)))

(defn subscribe-builder-session!
  "Subscribe to builder session updates"
  [session-id]
  (let [topic (str "builder-session/" session-id)]
    (subscribe! topic)))

(defn unsubscribe-builder-session!
  "Unsubscribe from builder session updates"
  [session-id]
  (let [topic (str "builder-session/" session-id)]
    (unsubscribe! topic)))

(defn ping!
  "Send ping to keep connection alive"
  []
  (send! {:type :ping}))

;; ============================================================================
;; Health Check
;; ============================================================================

(defonce ping-interval (atom nil))

(defn start-ping-loop!
  "Start periodic ping to keep connection alive"
  []
  (stop-ping-loop!)
  (reset! ping-interval
          (js/setInterval ping! 30000))) ;; Ping every 30 seconds

(defn stop-ping-loop!
  "Stop ping loop"
  []
  (when-let [interval @ping-interval]
    (js/clearInterval interval)
    (reset! ping-interval nil)))

;; ============================================================================
;; Lifecycle
;; ============================================================================

(defn init!
  "Initialize WebSocket connection"
  []
  (connect!)
  (start-ping-loop!))

(defn destroy!
  "Clean up WebSocket connection"
  []
  (stop-ping-loop!)
  (disconnect!))

;; ============================================================================
;; Status
;; ============================================================================

(defn connected?
  "Check if WebSocket is connected"
  []
  (and @ws-connection
       (= (.-readyState @ws-connection) js/WebSocket.OPEN)))

(defn status
  "Get WebSocket status"
  []
  {:connected (connected?)
   :reconnect-attempts @reconnect-attempts})
