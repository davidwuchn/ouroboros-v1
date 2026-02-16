(ns ouroboros.dashboard.websocket
  "WebSocket server for real-time telemetry streaming

   Broadcasts telemetry events to connected clients.
   Integrates with telemetry protocol for event capture.
   
   Usage:
     (start! {:port 8081})  ; Start server
     (stop!)                ; Stop server
     (broadcast! {:type :event :data ...})  ; Broadcast to all clients"
  (:require
   [org.httpkit.server :as httpkit]
   [cheshire.core :as json]
   [ouroboros.telemetry.protocol :as tp])
  (:import [java.util.concurrent ConcurrentHashMap]))

;; ============================================================================
;; Connection Management
;; ============================================================================

(defonce ^:private connections (ConcurrentHashMap.))
(defonce ^:private server-instance (atom nil))

(defn- add-connection! [channel]
  (.put connections channel {:connected-at (System/currentTimeMillis)}))

(defn- remove-connection! [channel]
  (.remove connections channel))

(defn- get-connection-count []
  (.size connections))

;; ============================================================================
;; WebSocket Backend
;; ============================================================================

(defrecord WebSocketBackend []
  tp/TelemetryBackend
  (emit-event! [_ event]
    ;; Broadcast to all connected clients
    (let [message (json/generate-string event)]
      (doseq [channel (.keySet connections)]
        (try
          (httpkit/send! channel message)
          (catch Exception _e
            ;; Client disconnected, remove it
            (remove-connection! channel))))))
  (flush-events! [_])
  (close-backend! [_]))

(defn websocket-backend
  "Create a WebSocket backend that broadcasts to all connected clients"
  []
  (->WebSocketBackend))

;; ============================================================================
;; WebSocket Handler
;; ============================================================================

(defn- handle-message
  "Handle incoming WebSocket message"
  [channel message]
  (let [data (try
               (json/parse-string message keyword)
               (catch Exception _
                 {:type :unknown :raw message}))]
    (case (:type data)
      :ping (httpkit/send! channel (json/generate-string {:type :pong :timestamp (System/currentTimeMillis)}))
      :subscribe (httpkit/send! channel (json/generate-string {:type :subscribed :channels (:channels data)}))
      ;; Unknown message type
      (httpkit/send! channel (json/generate-string {:type :error :message "Unknown message type"})))))

(defn- ws-handler
  "WebSocket handler"
  [request]
  (httpkit/with-channel request channel
    (add-connection! channel)
    (println (str "[WebSocket] Client connected. Total: " (get-connection-count)))
    
    ;; Send welcome message
    (httpkit/send! channel (json/generate-string
                            {:type :connected
                             :message "Welcome to Ouroboros Telemetry"
                             :clients (get-connection-count)}))
    
    (httpkit/on-close channel
                     (fn [_status]
                       (remove-connection! channel)
                       (println (str "[WebSocket] Client disconnected. Total: " (get-connection-count)))))
    
    (httpkit/on-receive channel
                       (fn [data]
                         (handle-message channel data)))))

;; ============================================================================
;; Server Management
;; ============================================================================

(declare stop!)

(defn start!
  "Start WebSocket server

   Options:
     :port - Port to listen on (default: 8081)
     :add-telemetry-backend? - Add WebSocket backend to telemetry (default: true)
   
   Usage: (start! {:port 8081})"
  [{:keys [port add-telemetry-backend?] :or {port 8081 add-telemetry-backend? true}}]
  (when @server-instance
    (println "[WebSocket] Server already running, stopping first...")
    (stop!))
  
  (let [server (httpkit/run-server ws-handler {:port port})]
    (reset! server-instance server)
    (println (str "✓ WebSocket server started on ws://localhost:" port))
    
    ;; Add WebSocket backend to telemetry
    (when add-telemetry-backend?
      (tp/add-backend! (websocket-backend))
      (println "✓ WebSocket backend added to telemetry"))
    
    server))

(defn stop!
  "Stop WebSocket server"
  []
  (when @server-instance
    ;; Close all connections
    (doseq [channel (.keySet connections)]
      (try
        (httpkit/close channel)
        (catch Exception _)))
    (.clear connections)
    
    ;; Stop server
    (@server-instance :timeout 100)
    (reset! server-instance nil)
    (println "✓ WebSocket server stopped")))

(defn running?
  "Check if server is running"
  []
  (some? @server-instance))

;; ============================================================================
;; Broadcasting
;; ============================================================================

(defn broadcast!
  "Broadcast message to all connected clients

   Usage: (broadcast! {:type :event :data {:message \"Hello\"}})"
  [message]
  (let [json-msg (json/generate-string message)]
    (doseq [channel (.keySet connections)]
      (try
        (httpkit/send! channel json-msg)
        (catch Exception _e
          (remove-connection! channel))))
    {:sent-to (get-connection-count)}))

(defn broadcast-event!
  "Broadcast a telemetry event to all clients"
  [event]
  (broadcast! {:type :telemetry/event
               :timestamp (System/currentTimeMillis)
               :data event}))

;; ============================================================================
;; Status
;; ============================================================================

(defn status
  "Get WebSocket server status"
  []
  {:websocket/running? (running?)
   :websocket/connected-clients (get-connection-count)
   :websocket/port (when @server-instance 8081)})

(comment
  ;; Start server
  (start! {:port 8081})

  ;; Check status
  (status)

  ;; Broadcast custom message
  (broadcast! {:type :test :message "Hello clients!"})

  ;; Stop server
  (stop!))
