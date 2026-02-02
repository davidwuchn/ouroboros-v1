(ns ouroboros.frontend.websocket
  "WebSocket client for real-time updates"
  (:require
   [com.fulcrologic.fulcro.application :as app]
   [com.fulcrologic.fulcro.algorithms.merge :as merge]
   [com.fulcrologic.fulcro.components :as comp]))

;; ============================================================================
;; Connection State
;; ============================================================================

(defonce ws-connection (atom nil))
(defonce reconnect-timeout (atom nil))
(defonce reconnect-attempts (atom 0))

(def max-reconnect-attempts 5)
(def reconnect-delay-ms 3000)

;; ============================================================================
;; Message Handlers
;; ============================================================================

(defmulti handle-message :type)

(defmethod handle-message :default
  [message]
  (js/console.log "Unknown WebSocket message:" message))

(defmethod handle-message :connected
  [{:keys [client-id timestamp]}]
  (js/console.log "WebSocket connected, client ID:" client-id))

(defmethod handle-message :telemetry/event
  [{:keys [data]}]
  (js/console.log "Telemetry event received:" data)
  ;; Merge into app state - add to events list
  (when-let [app @app/app]
    (merge/merge! app
                  {:page/id :telemetry
                   :telemetry/events [data]})))

(defmethod handle-message :pong
  [{:keys [timestamp]}]
  ;; Keep connection alive
  nil)

;; ============================================================================
;; Connection Management
;; ============================================================================

(defn- get-ws-url
  "Get WebSocket URL based on current location"
  []
  (let [protocol (if (= js/window.location.protocol "https:") "wss:" "ws:")
        host js/window.location.host]
    (str protocol "//" host "/ws")))

(defn connect!
  "Establish WebSocket connection"
  []
  (when-not @ws-connection
    (try
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
                  (let [data (js->clj (js/JSON.parse (.-data event))
                                      :keywordize-keys true)]
                    (handle-message data))
                  (catch js/Error e
                    (js/console.error "WebSocket message error:" e)))))

        (set! (.-onclose ws)
              (fn [event]
                (js/console.log "WebSocket connection closed")
                (reset! ws-connection nil)
                ;; Attempt reconnection
                (when (< @reconnect-attempts max-reconnect-attempts)
                  (swap! reconnect-attempts inc)
                  (js/console.log "Attempting reconnect..." @reconnect-attempts "/" max-reconnect-attempts)
                  (reset! reconnect-timeout
                          (js/setTimeout connect! reconnect-delay-ms)))))

        (set! (.-onerror ws)
              (fn [error]
                (js/console.error "WebSocket error:" error)))

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
