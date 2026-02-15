(ns ouroboros.chat.websocket
  "Shared WebSocket utilities for chat adapters
   
   Provides common WebSocket functionality:
   - Connection management with auto-reconnect
   - Message handling
   - Heartbeat/ping support
   - Error handling
   
   Used by Discord and Slack adapters."
  (:require
   [cheshire.core :as json])
  (:import
   [java.net URI]
   [java.net.http WebSocket HttpClient WebSocket$Listener]
   [java.util.concurrent CompletableFuture]))

;; ============================================================================
;; WebSocket Connection
;; ============================================================================

(defn connect
  "Connect to WebSocket with handler
   
   Args:
   - url: WebSocket URL
   - listener: WebSocket$Listener implementation
   - ws-atom: Atom to store WebSocket reference
   - running-atom: Atom to control connection lifecycle
   
   Returns: Future that completes when connection closes"
  [url listener ws-atom running-atom]
  (future
    (try
      (let [client (HttpClient/newHttpClient)
            ws @(.. client
                    (newWebSocketBuilder)
                    (buildAsync (URI/create url) listener))]
        (reset! ws-atom ws)
        ;; Keep connection alive
        (while @running-atom
          (Thread/sleep 1000)))
      (catch Exception e
        (println "WebSocket error:" (.getMessage e))
        (reset! running-atom false)))))

(defn close
  "Close WebSocket connection gracefully"
  [ws]
  (when ws
    (try
      (.sendClose ws WebSocket/NORMAL_CLOSURE "Shutting down")
      (catch Exception e
        (println "Error closing WebSocket:" (.getMessage e))))))

;; ============================================================================
;; Listener Factory
;; ============================================================================

(defn make-listener
  "Create a WebSocket listener with callbacks
   
   Callbacks:
   - :on-open [ws] - Connection opened
   - :on-text [ws text last] - Text message received
   - :on-error [ws error] - Error occurred
   - :on-close [ws status-code reason] - Connection closed"
  [{:keys [on-open on-text on-error on-close]}]
  (proxy [WebSocket$Listener] []
    (onOpen [ws]
      (when on-open (on-open ws)))

    (onText [ws text last]
      (when on-text (on-text ws text last))
      nil)

    (onError [ws error]
      (when on-error (on-error ws error)))

    (onClose [ws status-code reason]
      (when on-close (on-close ws status-code reason)))))

;; ============================================================================
;; Heartbeat
;; ============================================================================

(defn start-heartbeat
  "Start heartbeat loop
   
   Args:
   - ws-atom: Atom containing WebSocket reference
   - running-atom: Atom controlling lifecycle
   - interval-ms: Heartbeat interval in milliseconds
   - send-fn: Function to call for sending heartbeat (receives ws)"
  [ws-atom running-atom interval-ms send-fn]
  (future
    (loop []
      (when @running-atom
        (Thread/sleep interval-ms)
        (when @running-atom
          (try
            (when-let [ws @ws-atom]
              (send-fn ws))
            (catch Exception e
              (println "Heartbeat error:" (.getMessage e))))
          (recur))))))

;; ============================================================================
;; Reconnection
;; ============================================================================

(defn with-reconnect
  "Wrap connection logic with auto-reconnect
   
   Args:
   - connect-fn: Function that establishes connection, returns when disconnected
   - running-atom: Atom controlling reconnection loop
   - reconnect-delay-ms: Delay between reconnection attempts
   
   Returns: Future that runs reconnection loop"
  [connect-fn running-atom reconnect-delay-ms]
  (future
    (loop []
      (when @running-atom
        (try
          (connect-fn)
          (catch Exception e
            (println "Connection error:" (.getMessage e))))
        ;; Auto-reconnect if still running
        (when @running-atom
          (println (str "◈ Reconnecting in " reconnect-delay-ms "ms..."))
          (Thread/sleep reconnect-delay-ms)
          (recur))))))

;; ============================================================================
;; Message Helpers
;; ============================================================================

(defn send-text
  "Send text message via WebSocket"
  [ws text]
  (when ws
    (.sendText ws text true)))

(defn send-json
  "Send JSON message via WebSocket"
  [ws data]
  (send-text ws (json/generate-string data)))

(defn parse-json
  "Parse JSON text message"
  [text]
  (try
    (json/parse-string text true)
    (catch Exception e
      (println "Error parsing JSON:" (.getMessage e))
      nil)))

;; ============================================================================
;; Exports
;; ============================================================================

(comment
  ;; Create listener
  (def listener (make-listener
                 {:on-open (fn [_ws] (println "Connected"))
                  :on-text (fn [_ws text _last] (println "Received:" text))
                  :on-error (fn [_ws _e] (println "Error:" _e))
                  :on-close (fn [_ws _code reason] (println "Closed:" reason))}))

  ;; Connect
  (def ws-atom (atom nil))
  (def running-atom (atom true))
  (connect "wss://example.com/ws" listener ws-atom running-atom)

  ;; Stop
  (reset! running-atom false)
  (close @ws-atom))