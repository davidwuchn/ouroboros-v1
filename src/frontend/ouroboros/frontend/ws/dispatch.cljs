(ns ouroboros.frontend.ws.dispatch
  "Multimethod dispatch for WebSocket messages.
   Base handlers: :default, :connected, :pong, :telemetry/event, :builder-session/update.
   Domain handlers are registered by requiring their namespaces.")

;; ============================================================================
;; Multimethod Dispatch
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

(defmethod handle-message :pong
  [{:keys [timestamp]}]
  nil)
