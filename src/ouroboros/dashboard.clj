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
   [ouroboros.query :as query]
   [ouroboros.metrics :as metrics]
   [ouroboros.websocket :as ws]
   [ouroboros.dashboard.semantic-api])
  (:import [java.time Instant]
           [java.io File ByteArrayInputStream]))

;; ============================================================================
;; API Handler
;; ============================================================================

(def cors-headers
  {"Access-Control-Allow-Origin" "*"
   "Access-Control-Allow-Methods" "GET, POST, OPTIONS"
   "Access-Control-Allow-Headers" "Content-Type, Authorization"})

(defn- parse-transit
  "Try to parse body as Transit+JSON. Returns nil if parsing fails."
  [body]
  (try
    (let [in (ByteArrayInputStream. (.getBytes body "UTF-8"))
          reader (transit/reader in :json)]
      (transit/read reader))
    (catch Exception _
      nil)))

(defn- keywordize-str
  "Convert a string to keyword if it looks like an EQL identifier.
   - Strings starting with ':' are explicit keywords
   - Strings containing '/' are namespaced identifiers
   - Otherwise, return as-is (it's user data)"
  [s]
  (cond
    ;; Explicit keyword syntax - starts with :
    (str/starts-with? s ":")
    (let [clean-str (subs s 1)]
      (if (re-matches #"[a-zA-Z0-9_\-?.]+(/[a-zA-Z0-9_\-?!]+)?" clean-str)
        (keyword clean-str)
        s))

    ;; Namespaced identifier - contains / - likely EQL keyword or mutation symbol
    (str/includes? s "/")
    (if (re-matches #"[a-zA-Z0-9_\-?.]+/[a-zA-Z0-9_\-?!]+" s)
      (keyword s)
      s)

    ;; Simple string without : or / - keep as string (user data)
    :else s))

(defn- keywordize-map-key
  "Convert a map key to keyword or ident vector. 
   Map keys are always meant to be keywords in EQL.
   Special case: keys like ':page/id :mvp-builder' are converted to idents [:page/id :mvp-builder]"
  [k]
  (if (string? k)
    (cond
      ;; Ident format: two keywords separated by space (e.g., ":page/id :mvp-builder")
      (and (str/starts-with? k ":")
           (str/includes? k " :"))
      (let [parts (str/split k #" ")]
        (mapv keywordize-str parts))

      ;; Regular keyword format
      (or (str/starts-with? k ":") (str/includes? k "/"))
      (keywordize-str k)

      ;; Simple string key - convert to keyword (map keys should be keywords)
      :else
      (keyword k))
    k))

(defn- keywordize-eql
  "Recursively convert EQL-like structures.
   - Map keys are always keywordized (they're identifiers)
   - Map values are only keywordized if they look like EQL identifiers
   - This preserves user data while properly converting EQL syntax"
  [x]
  (cond
    (string? x)
    (keywordize-str x)

    (sequential? x)
    (vec (map keywordize-eql x))

    (map? x)
    (reduce-kv (fn [m k v]
                 (assoc m (keywordize-map-key k) (keywordize-eql v)))
               {} x)

    :else x))

(defn- extract-query-and-params
  "Extract query and params from Fulcro's load format.
   Fulcro sends loads as: [({query} {:params})] or just [{query}]
   The query can be a join like {[:page/id :x] [...subquery...]}
   Returns {:query ... :params ...}"
  [data]
  (cond
    ;; Vector containing a list/seq (Fulcro load with params)
    ;; e.g., [({[:page/id :project-detail] [...]} {:project-id "..."})]
    ;; Note: Transit decodes lists as LazySeq, so use seq? not list?
    (and (vector? data)
         (= 1 (count data))
         (seq? (first data))
         (not (vector? (first data))))
    (let [lst (first data)
          query-part (first lst)
          params-part (second lst)]
      ;; query-part might be a join map like {[:page/id :x] [...]}
      ;; We need to wrap it in a vector to make it a valid EQL query
      {:query (if (map? query-part) [query-part] query-part)
       :params (when (map? params-part) params-part)})

    ;; Vector containing a list where first element is also a vector (nested)
    (and (vector? data)
         (= 1 (count data))
         (vector? (first data)))
    {:query (first data) :params nil}

    ;; Direct vector that might contain a params map at the end
    ;; e.g., [{[:page/id :project-detail] [...]} {:project-id "..."}]
    ;; This can happen if transit parses the list as a vector
    (and (vector? data)
         (>= (count data) 2)
         (map? (last data))
         ;; Check if last element looks like params (has simple keyword keys, not idents)
         (let [last-elem (last data)]
           (and (every? keyword? (keys last-elem))
                (not (some #(vector? %) (keys last-elem))))))
    (let [params-part (last data)
          query-part (vec (butlast data))]
      {:query query-part
       :params params-part})

    ;; Direct vector (simple query)
    (vector? data)
    {:query data :params nil}

    ;; Map with :query key
    (and (map? data) (:query data))
    {:query (:query data) :params nil}

    ;; Join map with ident key (e.g., {[:page/id :telemetry] [:system/healthy? ...]})
    ;; Transit decodes Fulcro load queries as a map when there's a single join.
    ;; Pathom expects this wrapped in a vector: [{[:page/id :telemetry] [...]}]
    (and (map? data)
         (= 1 (count data))
         (vector? (ffirst data)))
    {:query [data] :params nil}

    :else
    {:query data :params nil}))

(defn- convert-joins-to-mutations
  "Convert mutation joins {symbol {:params}} to proper mutation lists (symbol {:params})
   Also handles keyword keys from JSON parsing, converting them to symbols."
  [eql]
  (mapv (fn [expr]
          (cond
            ;; Already a list (proper mutation syntax)
            (list? expr) expr
            ;; A join with a symbol or keyword key - likely a mutation that needs conversion
            (and (map? expr)
                 (= 1 (count expr))
                 (let [[k v] (first expr)]
                   (and (or (symbol? k) (keyword? k)) (map? v))))
            (let [[mutation-key params] (first expr)
                  ;; Convert keyword to symbol if needed
                  mutation-sym (if (keyword? mutation-key)
                                 (symbol (namespace mutation-key) (clojure.core/name mutation-key))
                                 mutation-key)]
              (list mutation-sym params))
            ;; Otherwise keep as-is
            :else expr))
        eql))

(defn- parse-eql
  "Parse EQL from request body (supports JSON and Transit)
   Uses content-type to decide which parser to use."
  [body content-type]
  (try
    (let [is-transit? (and content-type
                           (str/includes? (str/lower-case content-type) "transit"))]
      (if is-transit?
        ;; Transit request - parse as transit
        (if-let [transit-data (parse-transit body)]
          (let [_ (println "Raw Transit data:" (pr-str transit-data) "type:" (type transit-data))
                {:keys [query params]} (extract-query-and-params transit-data)
                _ (when params (println "Extracted params:" params))
                ;; Convert mutation joins to proper mutation lists
                converted (if (sequential? query)
                            (convert-joins-to-mutations query)
                            query)]
            (println "Parsed Transit EQL:" converted)
            ;; Return query with params attached if present
            (if params
              (with-meta converted {:params params})
              converted))
          ;; Transit parsing failed
          nil)
        ;; JSON request - parse as JSON
        (let [parsed (json/parse-string body)
              keywordized (keywordize-eql parsed)
              {:keys [query params]} (extract-query-and-params keywordized)
              ;; Convert mutation joins to proper mutation lists
              converted (if (sequential? query)
                          (convert-joins-to-mutations query)
                          query)]
          (println "Parsed JSON EQL:" converted)
          (if params
            (with-meta converted {:params params})
            converted))))
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
    (let [eql (parse-eql body content-type)
          ;; Extract params from metadata (set by parse-eql)
          params (when eql (meta eql))
          transit-request? (and content-type
                                (str/includes? (str/lower-case content-type) "transit"))]
      (println "Parsed EQL:" eql "| Params:" (:params params) "| Transit request?" transit-request?)
      (if eql
        (let [;; Pass params to query/q for resolver access
              result (query/q eql (:params params))]
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
     ;; Register all tools
     (require '[ouroboros.tool-defs :as tool-defs])
     (when-let [register-tools (resolve 'tool-defs/register-all-tools!)]
       (register-tools))
     ;; Register WebSocket telemetry listener
     (ws/register-telemetry-listener!)
     ;; Start http-kit server (supports WebSocket natively)
     (let [server (httpkit/run-server (make-handler) {:port actual-port})]
       (reset! dashboard-server server)
       (println (str "Dashboard ready at http://localhost:" actual-port))
       (println (str "WebSocket endpoint: ws://localhost:" actual-port "/ws"))
       ;; Auto-start ECA for content generation features (templates, learning-categories)
       (try
         (require 'ouroboros.eca-client)
         (let [alive? (resolve 'ouroboros.eca-client/alive?)
               ensure-alive! (resolve 'ouroboros.eca-client/ensure-alive!)]
           (when-not (alive?)
             (println "  Starting ECA for AI content generation features...")
             (ensure-alive!)))
         (catch Exception e
           (println "  ⚠️  ECA not available:" (.getMessage e))))
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

;; Semantic search resolvers are in ouroboros.dashboard.semantic-api
;; which is required for side effects (auto-registration)

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [dashboard-status])

(def mutations
  [])

(def mutations
  [])

;; ============================================================================
;; Entry Point
;; ============================================================================

(defn -main
  "Entry point for dashboard server"
  [& _args]
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
  ;; (require '[ouroboros.query :as q])
  ;; (q/q [:dashboard/status]))
  )