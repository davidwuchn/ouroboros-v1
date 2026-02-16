(ns ouroboros.websocket
  "WebSocket server for real-time updates.

   Thin facade that delegates to handler modules:
   - ws.connections  -- Connection atom, broadcast, send
   - ws.dispatch     -- Data-driven message routing
   - ws.stream       -- DRY ECA streaming helper
   - ws.context      -- Project context assembly
   - ws.handlers.*   -- Domain-specific handlers

   Provides: websocket-handler, telemetry integration, status, and
   re-exports of connection management functions for backward compatibility."
  (:require
   [cheshire.core :as json]
   [org.httpkit.server :as httpkit]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.context :as ctx]
   [ouroboros.ws.dispatch :as dispatch]))

;; ============================================================================
;; Re-exports for backward compatibility
;; ============================================================================

(def connections conn/connections)

(defn add-connection!
  "Add a new WebSocket connection"
  [channel]
  (conn/add-connection! channel))

(defn remove-connection!
  "Remove a WebSocket connection"
  [id]
  (conn/remove-connection! id))

(defn broadcast!
  "Broadcast a message to all connected clients"
  [message]
  (conn/broadcast! message))

(defn broadcast-to!
  "Broadcast to specific subscription"
  [subscription-type message]
  (conn/broadcast-to! subscription-type message))

(defn broadcast-builder-session!
  "Broadcast builder session update to subscribed clients"
  [session-id data]
  (conn/broadcast-builder-session! session-id data))

(defn handle-message
  "Handle incoming WebSocket message"
  [id message-str]
  (dispatch/handle-message id message-str))

;; ============================================================================
;; Handler
;; ============================================================================

(defn websocket-handler
  "WebSocket handler factory.
   Uses http-kit's with-channel for WebSocket upgrade."
  [request]
  (httpkit/with-channel request channel
    (if channel
      (let [id (conn/add-connection! channel)]
        (httpkit/on-close channel (fn [_status]
                                    (conn/remove-connection! id)))
        (httpkit/on-receive channel (fn [message]
                                       (dispatch/handle-message id message)))
        ;; Send initial connection acknowledgment
        (httpkit/send! channel (json/generate-string
                                {:type :connected
                                 :client-id id
                                 :timestamp (System/currentTimeMillis)}))
        ;; Auto-detect workspace project and send to client
        (future
          (try
            (let [project (ctx/ensure-workspace-project!)]
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
    (conn/broadcast-to! :telemetry/events
                        {:type :telemetry/event
                         :data normalized
                         :timestamp (System/currentTimeMillis)})))

(defonce telemetry-listener-registered? (atom false))

(defn register-telemetry-listener!
  "Register the WebSocket broadcaster with telemetry"
  []
  (when-not @telemetry-listener-registered?
    (alter-var-root #'telemetry/emit!
                    (fn [original-fn]
                      (fn [event-data]
                        (let [result (original-fn event-data)]
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
  (conn/status))

(comment
  ;; Test broadcasting
  (broadcast! {:type :test :message "Hello from server"})

  ;; Check status
  (status)

  ;; Manual telemetry broadcast
  (telemetry-callback {:event :test :data "manual"}))
