(ns ouroboros.dashboard
  "Dashboard - Web dashboard for system observability
   
   HTTP server with EQL API and WebSocket support for real-time updates.
   Uses ring/jetty for HTTP and http-kit for WebSockets."
  (:require
   [ring.adapter.jetty :as jetty]
   [ring.middleware.resource :as resource]
   [ring.middleware.content-type :as content-type]
   [ring.middleware.not-modified :as not-modified]
   [ring.util.response :as response]
   [cheshire.core :as json]
   [org.httpkit.server :as httpkit]
   [com.wsscode.pathom3.connect.operation :as pco]
   [com.wsscode.pathom3.interface.eql :as p.eql]
   [ouroboros.query :as query]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.auth :as auth]
   [ouroboros.chat :as chat]
   [ouroboros.metrics :as metrics]
   [ouroboros.websocket :as ws])
  (:import [java.time Instant]))

;; ============================================================================
;; API Handler
;; ============================================================================

(def cors-headers
  {"Access-Control-Allow-Origin" "*"
   "Access-Control-Allow-Methods" "GET, POST, OPTIONS"
   "Access-Control-Allow-Headers" "Content-Type, Authorization"})

(defn parse-eql
  "Parse EQL from request body"
  [body]
  (try
    (let [parsed (json/parse-string body keyword)]
      (or (:query parsed)
          parsed))
    (catch Exception e
      (try
        (read-string body)
        (catch Exception e2
          nil)))))

(defn handle-eql
  "Handle EQL query/mutation request"
  [body]
  (try
    (let [eql (parse-eql body)]
      (if eql
        (let [result (query/q eql)]
          {:status 200
           :headers (merge cors-headers {"Content-Type" "application/json"})
           :body (json/generate-string result)})
        {:status 400
         :headers cors-headers
         :body (json/generate-string {:error "Invalid EQL"})}))
    (catch Exception e
      {:status 500
       :headers cors-headers
       :body (json/generate-string {:error (.getMessage e)})})))

;; ============================================================================
;; Ring Handler
;; ============================================================================

(defn dashboard-handler
  "Main request handler"
  [request]
  (let [method (:request-method request)
        uri (:uri request)
        body (when (:body request)
               (slurp (:body request)))]
    (cond
      ;; CORS preflight
      (= method :options)
      {:status 200
       :headers cors-headers
       :body ""}

      ;; WebSocket upgrade
      (= uri "/ws")
      (ws/websocket-handler request)

      ;; EQL API endpoint
      (and (= uri "/api/eql") (= method :post))
      (handle-eql body)

      ;; Status endpoint
      (and (= uri "/api/status") (= method :get))
      {:status 200
       :headers (merge cors-headers {"Content-Type" "application/json"})
       :body (json/generate-string
              {:healthy (query/q [:system/healthy?])
               :timestamp (str (Instant/now))})}

      ;; WebSocket status endpoint
      (and (= uri "/api/ws-status") (= method :get))
      {:status 200
       :headers (merge cors-headers {"Content-Type" "application/json"})
       :body (json/generate-string (ws/status))}

      ;; Prometheus metrics
      (= uri "/metrics")
      {:status 200
       :headers {"Content-Type" "text/plain; version=0.0.4"}
       :body (metrics/get-prometheus-text)}

      ;; Serve index.html for root
      (= uri "/")
      (response/resource-response "public/index.html")

      ;; Serve static resources
      :else
      (or (response/resource-response (str "public" uri))
          {:status 404
           :headers {"Content-Type" "text/plain"}
           :body "Not found"}))))

;; ============================================================================
;; Server Lifecycle
;; ============================================================================

(defonce dashboard-server (atom nil))

(defn make-handler
  "Create the ring handler stack"
  []
  (-> dashboard-handler
      (resource/wrap-resource "public")
      content-type/wrap-content-type
      not-modified/wrap-not-modified))

(defn start!
  "Start dashboard server
   
   Usage: (start! {:port 8080})"
  ([] (start! {}))
  ([{:keys [port]}]
   (let [actual-port (or port 8080)]
     (println (str "Starting dashboard server on port " actual-port "..."))
     ;; Register WebSocket telemetry listener
     (ws/register-telemetry-listener!)
     ;; Start Jetty server
     (let [server (jetty/run-jetty (make-handler)
                                   {:port actual-port
                                    :join? false})]
       (reset! dashboard-server server)
       (println (str "Dashboard ready at http://localhost:" actual-port))
       (println (str "WebSocket endpoint: ws://localhost:" actual-port "/ws"))
       {:port actual-port
        :url (str "http://localhost:" actual-port)
        :ws-url (str "ws://localhost:" actual-port "/ws")
        :server server}))))

(defn stop!
  "Stop dashboard server"
  []
  (when-let [server @dashboard-server]
    (.stop server)
    (reset! dashboard-server nil)
    (println "Dashboard stopped")))

(defn status
  "Get dashboard status"
  []
  (if @dashboard-server
    {:running true :http (ws/status)}
    {:running false}))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(pco/defresolver dashboard-status [_]
  {::pco/output [:dashboard/status]}
  {:dashboard/status (status)})

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [dashboard-status])

(def mutations
  [])

(comment
  ;; Start dashboard
  (start! {:port 8080})
  (status)
  (stop!)

  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:dashboard/status]))
