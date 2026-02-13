(ns ouroboros.frontend.ws.lifecycle
  "WebSocket lifecycle: init, destroy, ping, subscribe/unsubscribe."
  (:require
   [ouroboros.frontend.ws.connection :as conn]))

;; ============================================================================
;; Topic Subscriptions
;; ============================================================================

(defonce subscribed-topics (atom #{}))

(defn subscribe!
  "Subscribe to a WebSocket topic"
  [topic]
  (when (and (conn/connected?) (not (contains? @subscribed-topics topic)))
    (conn/send! {:type "subscribe" :topic topic})
    (swap! subscribed-topics conj topic)
    (js/console.log "Subscribed to topic:" topic)))

(defn unsubscribe!
  "Unsubscribe from a WebSocket topic"
  [topic]
  (when (and (conn/connected?) (contains? @subscribed-topics topic))
    (conn/send! {:type "unsubscribe" :topic topic})
    (swap! subscribed-topics disj topic)
    (js/console.log "Unsubscribed from topic:" topic)))

(defn subscribe-builder-session!
  "Subscribe to builder session updates"
  [session-id]
  (subscribe! (str "builder-session/" session-id)))

(defn unsubscribe-builder-session!
  "Unsubscribe from builder session updates"
  [session-id]
  (unsubscribe! (str "builder-session/" session-id)))

;; ============================================================================
;; Health Check (Ping Loop)
;; ============================================================================

(defonce ping-interval (atom nil))

(defn- stop-ping-loop!
  "Stop ping loop"
  []
  (when-let [interval @ping-interval]
    (js/clearInterval interval)
    (reset! ping-interval nil)))

(defn- start-ping-loop!
  "Start periodic ping to keep connection alive"
  []
  (stop-ping-loop!)
  (reset! ping-interval
          (js/setInterval #(conn/send! {:type :ping}) 30000)))

;; ============================================================================
;; Lifecycle
;; ============================================================================

(defn init!
  "Initialize WebSocket connection"
  []
  (conn/connect!)
  (start-ping-loop!))

(defn destroy!
  "Clean up WebSocket connection"
  []
  (stop-ping-loop!)
  (conn/disconnect!))
