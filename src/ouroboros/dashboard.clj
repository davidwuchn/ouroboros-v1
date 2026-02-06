(ns ouroboros.dashboard
  "Dashboard - Web dashboard for system observability

   HTTP server with EQL API and WebSocket support for real-time updates.
   Uses http-kit (supports HTTP and WebSocket on same port)."
  (:require
   [clojure.string :as str]
   [ring.middleware.resource :as resource]
   [ring.middleware.content-type :as content-type]
   [ring.middleware.not-modified :as not-modified]
   [ring.util.response :as response]
   [cheshire.core :as json]
   [cognitect.transit :as transit]
   [org.httpkit.server :as httpkit]
   [com.wsscode.pathom3.connect.operation :as pco]
   [com.wsscode.pathom3.interface.eql :as p.eql]
   [ouroboros.query :as query]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.auth :as auth]
   [ouroboros.chat :as chat]
   [ouroboros.metrics :as metrics]
   [ouroboros.websocket :as ws])
  (:import [java.time Instant]
           [java.io File ByteArrayInputStream InputStreamReader]))

;; ============================================================================
;; API Handler
;; ============================================================================

(def cors-headers
  {"Access-Control-Allow-Origin" "*"
   "Access-Control-Allow-Methods" "GET, POST, OPTIONS"
   "Access-Control-Allow-Headers" "Content-Type, Authorization"})

(defn- keywordize-eql
  "Recursively convert EQL-like strings to keywords
   Converts 'system/healthy?' or ':system/healthy?' to :system/healthy?"
  [x]
  (cond
    (string? x)
    (let [;; Handle strings that start with : (from Transit/JSON encoding)
          clean-str (if (str/starts-with? x ":")
                      (subs x 1)
                      x)]
      (if (re-matches #"[a-zA-Z0-9_\-?]+(/[a-zA-Z0-9_\-?]+)*" clean-str)
        (keyword clean-str)
        x))

    (sequential? x)
    (vec (map keywordize-eql x))

    (map? x)
    (reduce-kv (fn [m k v]
                 (assoc m (keywordize-eql k) (keywordize-eql v)))
               {} x)

    :else x))

(defn keywordize-eql
  "Recursively convert EQL-like strings to keywords
   Converts 'system/healthy?' or ':system/healthy?' to :system/healthy?"
  [x]
  (cond
    (string? x)
    (let [clean-str (if (str/starts-with? x ":")
                      (subs x 1)
                      x)]
      (if (re-matches #"[a-zA-Z0-9_\-?]+(/[a-zA-Z0-9_\-?]+)*" clean-str)
        (keyword clean-str)
        x))

    (sequential? x)
    (vec (map keywordize-eql x))

    (map? x)
    (reduce-kv (fn [m k v]
                 (assoc m (keywordize-eql k) (keywordize-eql v)))
               {} x)

    :else x))

(defn parse-eql
  "Parse EQL from request body (supports JSON and Transit)"
  [body]
  (try
    (if-let [transit-data (parse-transit body)]
      (let [query (keywordize-eql transit-data)]
        (println "Parsed Transit EQL:" query)
        query)
      ;; Fall back to JSON - use raw parsing to avoid Cheshire keyword auto-parsing
      (let [parsed (cheshire.core/parse-string body true)]
        (println "Raw JSON parsed:" parsed)
        (keywordize-eql parsed)))
    (catch Exception e
      (println "Failed to parse EQL body:" (.getMessage e))
      nil)))

(defn parse-eql
  "Parse EQL from request body (supports JSON and Transit)"
  [body]
  (try
    (if-let [transit-data (parse-transit body)]
      (let [query (or (:query transit-data)
                      (:com.wsscode.pathom3.interface.eql/query transit-data)
                      (first (filter sequential? transit-data))
                      transit-data)]
        (println "Parsed Transit EQL:" query)
        query)
      ;; Fall back to JSON
      (let [parsed (json/parse-string body)
            keywordized (keywordize-eql parsed)]
        (println "Parsed JSON EQL:" keywordized)
        (or (:query keywordized)
            (first (filter sequential? keywordized))
            keywordized)))
    (catch Exception e
      (println "Failed to parse EQL body:" (.getMessage e))
      nil)))

(defn keywordize-eql
  "Recursively convert EQL-like strings to keywords
   Converts 'system/healthy?' or ':system/healthy?' to :system/healthy?"
  [x]
  (cond
    (string? x)
    (let [;; Handle strings that start with : (from Transit/JSON encoding)
          clean-str (if (str/starts-with? x ":")
                      (subs x 1)
                      x)]
      (if (re-matches #"[a-zA-Z0-9_\-?]+(/[a-zA-Z0-9_\-?]+)*" clean-str)
        (keyword clean-str)
        x))

    (sequential? x)
    (vec (map keywordize-eql x))

    (map? x)
    (reduce-kv (fn [m k v]
                 (assoc m (keywordize-eql k) (keywordize-eql v)))
               {} x)

    :else x))

(defn parse-eql
  "Parse EQL from request body (supports JSON and Transit)"
  [body]
  (try
    (if-let [transit-data (parse-transit body)]
      (let [query (or (:query transit-data)
                      (:com.wsscode.pathom3.interface.eql/query transit-data)
                      (first (filter sequential? transit-data))
                      transit-data)]
        (println "Parsed Transit EQL:" query)
        query)
      ;; Fall back to JSON
      (let [parsed (json/parse-string body)
            keywordized (keywordize-eql parsed)]
        (println "Parsed JSON EQL:" keywordized)
        (or (:query keywordized)
            (first (filter sequential? keywordized))
            keywordized)))
    (catch Exception e
      (println "Failed to parse EQL body:" (.getMessage e))
      nil)))

(defn write-transit
  "Encode data as Transit"
  [data]
  (let [out (java.io.ByteArrayOutputStream.)
        writer (transit/writer out :json)]
    (transit/write writer data)
    (.toString out "UTF-8")))

(defn handle-eql
  "Handle EQL query/mutation request (supports JSON and Transit)"
  [body content-type]
  (try
    (let [eql (parse-eql body)
          transit-request? (and content-type
                                (str/includes? (str/lower-case content-type) "transit"))]
      (println "Parsed EQL:" eql "| Transit request?" transit-request?)
      (if eql
        (let [result (query/q eql)]
          (println "Query result:" result)
          (if transit-request?
            ;; Return Transit for Transit requests
            {:status 200
             :headers (merge cors-headers {"Content-Type" "application/transit+json"})
             :body (write-transit result)}
            ;; Return JSON for JSON requests
            {:status 200
             :headers (merge cors-headers {"Content-Type" "application/json"})
             :body (json/generate-string result)}))
        {:status 400
         :headers cors-headers
         :body (if transit-request?
                 (write-transit {:error "Invalid EQL"})
                 (json/generate-string {:error "Invalid EQL"}))}))
    (catch Exception e
      (println "Error processing EQL:" (.getMessage e))
      (.printStackTrace e)
      {:status 500
       :headers cors-headers
       :body (json/generate-string {:error (.getMessage e)})})))

;; ============================================================================
;; Ring Handler
;; ============================================================================

(defn- content-type-for [path]
  "Determine content-type based on file extension"
  (cond
    (str/ends-with? path ".html") "text/html"
    (str/ends-with? path ".css") "text/css"
    (str/ends-with? path ".js") "application/javascript"
    (str/ends-with? path ".json") "application/json"
    (str/ends-with? path ".png") "image/png"
    (str/ends-with? path ".jpg") "image/jpeg"
    (str/ends-with? path ".svg") "image/svg+xml"
    :else "application/octet-stream"))

(defn- serve-file
  "Serve a file from resources/public directory"
  [path]
  (let [project-root (System/getProperty "user.dir")
        file (File. project-root (str "resources/public" path))]
    (when (.exists file)
      (-> (response/file-response (.getPath file))
          (response/content-type (content-type-for path))))))

(defn dashboard-handler
  "Main request handler"
  [request]
  (let [method (:request-method request)
        uri (:uri request)
        body (when (:body request)
               (slurp (:body request)))]
    (or
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
        (handle-eql body (get-in request [:headers "content-type"]))

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
        (or (serve-file "/index.html")
            {:status 200
             :headers {"Content-Type" "text/html"}
             :body "<!DOCTYPE html><html><head><title>Ouroboros</title></head><body><div id='app'></div><script src='/js/main.js'></script></body></html>"})

        ;; Serve static resources
        :else
        (or (serve-file uri)
            {:status 404
             :headers {"Content-Type" "text/plain"}
             :body "Not found"}))
      ;; Safety catch-all - should never reach here
      {:status 500
       :headers {"Content-Type" "text/plain"}
       :body "Internal error: handler returned nil"})))

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
     ;; Initialize query environment
     (require 'ouroboros.engine)
     (ouroboros.engine/boot!)
     (require '[ouroboros.query :as q])
     ((resolve 'ouroboros.query/init!))
     ;; Register WebSocket telemetry listener
     (ws/register-telemetry-listener!)
     ;; Start http-kit server (supports WebSocket natively)
     (let [server (httpkit/run-server (make-handler) {:port actual-port})]
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
    (server :timeout 5000)  ;; http-kit stop function
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

;; ============================================================================
;; Entry Point
;; ============================================================================

(defn -main
  "Entry point for dashboard server"
  [& args]
  (let [port (or (some-> (System/getenv "PORT") Integer/parseInt) 8080)]
    (println "Starting Ouroboros Dashboard...")
    (println "  Port:" port)
    (start! {:port port})
    (println "  URL: http://localhost:" port)
    (println "  Press Ctrl+C to stop")
    ;; Keep running
    @(promise)))

(comment
  ;; Start dashboard
  (start! {:port 8080})
  (status)
  (stop!)

  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:dashboard/status]))
