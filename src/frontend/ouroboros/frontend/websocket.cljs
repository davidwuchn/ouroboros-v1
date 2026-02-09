(ns ouroboros.frontend.websocket
  "WebSocket client for real-time updates"
  (:require
   [com.fulcrologic.fulcro.application :as app]))

;; Forward declarations
(declare connected? stop-ping-loop!)

;; ============================================================================
;; App State Reference
;; ============================================================================

(defonce app-state-atom (atom nil))
(defonce render-callback (atom nil))

(defn set-app-state-atom!
  "Set the app state atom for merging data"
  [state-atom]
  (reset! app-state-atom state-atom))

(defn set-render-callback!
  "Set a callback to trigger UI re-render after state mutation"
  [cb]
  (reset! render-callback cb))

(defn- schedule-render!
  "Schedule a UI re-render after direct state mutation"
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
  ;; Merge into app state - add to events list
  (when-let [state-atom @app-state-atom]
    (swap! state-atom update-in [:telemetry/events] (fnil conj []) data)))

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
