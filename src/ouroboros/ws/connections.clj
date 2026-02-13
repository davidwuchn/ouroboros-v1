(ns ouroboros.ws.connections
  "WebSocket connection management.
   Atom-based registry for connected clients, plus broadcast helpers."
  (:require
   [cheshire.core :as json]
   [org.httpkit.server :as httpkit])
  (:import [java.util.concurrent.atomic AtomicLong]))

(defonce connections (atom {}))
(defonce ^:private connection-counter (AtomicLong. 0))

(defn- next-id []
  (.incrementAndGet connection-counter))

(defn add-connection!
  "Add a new WebSocket connection.
   Returns the connection id."
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

(defn send-to!
  "Send a message to a specific WebSocket client by connection id"
  [id message]
  (when-let [channel (get-in @connections [id :channel])]
    (try
      (httpkit/send! channel (json/generate-string message))
      (catch Exception e
        (println "WebSocket send error for client" id ":" (.getMessage e))))))

(defn broadcast!
  "Broadcast a message to all connected clients"
  [message]
  (doseq [[id {:keys [channel]}] @connections]
    (when channel
      (try
        (httpkit/send! channel (json/generate-string message))
        (catch Exception e
          (println "WebSocket send error for client" id ":" (.getMessage e)))))))

(defn broadcast-to!
  "Broadcast to clients subscribed to a specific topic"
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

(defn subscribe!
  "Add a subscription topic for a client"
  [id topic]
  (swap! connections update-in [id :subscriptions] conj topic)
  (println (str "Client " id " subscribed to: " topic)))

(defn unsubscribe!
  "Remove a subscription topic from a client"
  [id topic]
  (swap! connections update-in [id :subscriptions] disj topic)
  (println (str "Client " id " unsubscribed from: " topic)))

(defn status
  "Get WebSocket connection status"
  []
  {:connected-clients (count @connections)
   :subscriptions (reduce (fn [acc [_ {:keys [subscriptions]}]]
                            (merge-with + acc (zipmap subscriptions (repeat 1))))
                          {}
                          @connections)})
