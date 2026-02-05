(ns ouroboros.websocket
  "WebSocket server for real-time updates
   
   Provides live telemetry streams to connected clients."
  (:require
   [clojure.string :as str]
   [clojure.edn :as edn]
   [org.httpkit.server :as httpkit]
   [cheshire.core :as json]
   [ouroboros.telemetry :as telemetry])
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
    (when (and channel (not (:closed? @channel)))
      (try
        (httpkit/send! channel (json/generate-string message))
        (catch Exception e
          (println "WebSocket send error for client" id ":" (.getMessage e)))))))

(defn broadcast-to!
  "Broadcast to specific subscription"
  [subscription-type message]
  (doseq [[id {:keys [channel subscriptions]}] @connections]
    (when (and channel (not (:closed? @channel)) (contains? subscriptions subscription-type))
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

(defn handle-message
  "Handle incoming WebSocket message"
  [id message-str]
  (try
    (let [message (json/parse-string message-str keyword)]
      (case (:type message)
        :subscribe
        (let [topic (:topic message)]
          (swap! connections update-in [id :subscriptions] conj topic)
          (println (str "Client " id " subscribed to: " topic)))
        
        :unsubscribe
        (let [topic (:topic message)]
          (swap! connections update-in [id :subscriptions] disj topic)
          (println (str "Client " id " unsubscribed from: " topic)))
        
        :ping
        (when-let [channel (get-in @connections [id :channel])]
          (httpkit/send! channel (json/generate-string {:type :pong :timestamp (System/currentTimeMillis)})))
        
        (println "Unknown message type from client" id ":" (:type message))))
    (catch Exception e
      (println "WebSocket message error from client" id ":" (.getMessage e)))))

;; ============================================================================
;; Handler
;; ============================================================================

(defn websocket-handler
  "WebSocket handler factory"
  [request]
  (httpkit/with-channel request channel
    (let [id (add-connection! channel)]
      (httpkit/on-close channel (fn [status]
                                  (remove-connection! id)))
      (httpkit/on-receive channel (fn [message]
                                    (handle-message id message)))
      ;; Send initial connection acknowledgment
      (httpkit/send! channel (json/generate-string
                              {:type :connected
                               :client-id id
                               :timestamp (System/currentTimeMillis)})))))

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
