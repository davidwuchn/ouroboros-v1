(ns ouroboros.websocket
  "WebSocket server for real-time updates
   
   Provides live telemetry streams to connected clients."
  (:require
   [clojure.string :as str]
   [clojure.edn :as edn]
   [org.httpkit.server :as httpkit]
   [cheshire.core :as json]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.eca-client :as eca])
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
  ;; Auto-start ECA if not running
  (when-not (:running (eca/status))
    (telemetry/emit! {:event :ws/eca-auto-start :client-id client-id})
    (try
      (eca/start!)
      (catch Exception e
        (send-to! client-id {:type :eca/chat-response
                             :text (str "Failed to start ECA: " (.getMessage e))
                             :timestamp (System/currentTimeMillis)})
        (telemetry/emit! {:event :ws/eca-auto-start-failed
                          :client-id client-id
                          :error (.getMessage e)}))))

  (if-not (:running (eca/status))
    ;; Still not running after start attempt
    (send-to! client-id {:type :eca/chat-response
                         :text "ECA could not be started. Ensure the ECA binary is installed."
                         :timestamp (System/currentTimeMillis)})

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
      (try
        (let [result (eca/chat-prompt text {:chat-id chat-id})]
          (when (= :error (:status result))
            (send-to! client-id {:type :eca/chat-response
                                 :text (str "Error: " (or (:message result) (:error result)))
                                 :timestamp (System/currentTimeMillis)})
            (eca/unregister-callback! "chat/contentReceived" listener-id)))
        (catch Exception e
          (send-to! client-id {:type :eca/chat-response
                               :text (str "ECA error: " (.getMessage e))
                               :timestamp (System/currentTimeMillis)})
          (eca/unregister-callback! "chat/contentReceived" listener-id)
          (telemetry/emit! {:event :ws/eca-chat-error
                            :client-id client-id
                            :error (.getMessage e)}))))))
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
                                 :timestamp (System/currentTimeMillis)})))
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
