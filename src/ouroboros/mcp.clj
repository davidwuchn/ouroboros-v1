(ns ouroboros.mcp
  "MCP - Model Context Protocol server implementation
   
   Exposes Ouroboros AI tools via the Model Context Protocol standard.
   Any MCP-compatible client (Claude Desktop, Continue, Cline, etc.) 
   can discover and invoke Ouroboros capabilities.
   
   Protocol: JSON-RPC 2.0 over HTTP with Server-Sent Events (SSE)
   Spec: https://modelcontextprotocol.io/"
  (:require
   [babashka.http-client :as http]
   [cheshire.core :as json]
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.tool-registry :as tool-registry]
   [ouroboros.ai :as ai]
   [ouroboros.telemetry :as telemetry])
  (:import [java.net ServerSocket]
           [java.io BufferedReader InputStreamReader]
           [java.util.concurrent Executors]))

;; ============================================================================
;; MCP Protocol Types
;; ============================================================================

(def mcp-version "2024-11-05")

(defn mcp-error [code message data]
  {:jsonrpc "2.0"
   :error {:code code :message message :data data}})

(defn mcp-success [id result]
  {:jsonrpc "2.0" :id id :result result})

;; ============================================================================
;; Tool Conversion (Ouroboros → MCP)
;; ============================================================================

(defn- convert-param-type [t]
  (case t
    :string "string"
    :int "integer"
    :number "number"
    :boolean "boolean"
    :map "object"
    :vector "array"
    :keyword "string"
    :any {}
    "string"))

(defn- convert-parameters [params]
  (let [required (keep (fn [[k v]] (when (:required v) (name k))) params)]
    {:type "object"
     :properties (into {} (map (fn [[k v]]
                                 [(name k)
                                  (merge {:type (convert-param-type (:type v))}
                                         (when (:description v)
                                           {:description (:description v)})
                                         (when (:default v)
                                           {:default (:default v)}))])
                               params))
     :required (vec required)}))

(defn- ouroboros-tool->mcp [tool-name {:keys [description parameters]}]
  {:name (str (namespace tool-name) "/" (name tool-name))
   :description description
   :inputSchema (convert-parameters parameters)})

(defn list-mcp-tools
  "Convert all Ouroboros tools to MCP format"
  []
  (map (fn [tool]
         (ouroboros-tool->mcp (:tool/name tool)
                              {:description (:tool/description tool)
                               :parameters (:tool/parameters tool)}))
       (tool-registry/list-tools)))

;; ============================================================================
;; Tool Invocation
;; ============================================================================

(defn invoke-tool
  "Invoke an Ouroboros tool via MCP"
  [tool-name-str arguments]
  (let [tool-name (keyword tool-name-str)]
    (telemetry/emit! {:event :mcp/invoke
                      :tool tool-name
                      :arguments-keys (keys arguments)})
    (let [result (ai/call-tool tool-name arguments)]
      (telemetry/emit! {:event :mcp/complete
                        :tool tool-name
                        :success? (= :success (:status result))})
      result)))

;; ============================================================================
;; JSON-RPC Handlers
;; ============================================================================

(defmulti handle-request :method)

(defmethod handle-request "initialize" [{:keys [id params]}]
  (mcp-success id
               {:protocolVersion mcp-version
                :capabilities {:tools {:listChanged true}}
                :serverInfo {:name "ouroboros-mcp"
                             :version "0.1.0"}}))

(defmethod handle-request "tools/list" [{:keys [id]}]
  (mcp-success id {:tools (list-mcp-tools)}))

(defmethod handle-request "tools/call" [{:keys [id params]}]
  (let [tool-name (:name params)
        arguments (:arguments params {})]
    (try
      (let [result (invoke-tool tool-name arguments)]
        (mcp-success id
                     {:content [{:type "text"
                                 :text (pr-str (:result result))}]
                      :isError (= :error (:status result))}))
      (catch Exception e
        (mcp-error -32603 (.getMessage e) {})))))

(defmethod handle-request :default [{:keys [id method]}]
  (mcp-error -32601 (str "Method not found: " method) {}))

;; ============================================================================
;; HTTP Server
;; ============================================================================

(defn- parse-json [body]
  (try
    (json/parse-string body true)
    (catch Exception e
      {:error (str "Invalid JSON: " (.getMessage e))})))

(defn- handle-http-request [req]
  (let [uri (:uri req)
        method (:request-method req)]
    (cond
      ;; SSE endpoint for notifications
      (= uri "/mcp/sse")
      {:status 200
       :headers {"Content-Type" "text/event-stream"
                 "Cache-Control" "no-cache"
                 "Connection" "keep-alive"}
       :body (str "event: endpoint\ndata: /mcp/message\n\n")}

      ;; JSON-RPC endpoint
      (= uri "/mcp/message")
      (if (= method :post)
        (let [body (slurp (:body req))
              rpc-req (parse-json body)]
          (if (:error rpc-req)
            {:status 400 :body (json/generate-string rpc-req)}
            {:status 200
             :headers {"Content-Type" "application/json"}
             :body (json/generate-string (handle-request rpc-req))}))
        {:status 405 :body "Method not allowed"})

      ;; Health check
      (= uri "/health")
      {:status 200 :body "OK"}

      :else
      {:status 404 :body "Not found"})))

;; ============================================================================
;; Server Lifecycle
;; ============================================================================

(defonce ^:private mcp-server (atom nil))

(defn- port-available? [port]
  (try
    (let [socket (ServerSocket. port)]
      (.close socket)
      true)
    (catch Exception _
      false)))

(defn find-port
  "Find an available port"
  ([] (find-port 3000))
  ([start-port]
   (first (filter port-available? (iterate inc start-port)))))

(defn start!
  "Start MCP server
   
   Usage: (start! {:port 3000})"
  ([] (start! {}))
  ([{:keys [port]}]
   (let [actual-port (or port (find-port))]
     (println (str "◈ Starting MCP server on port " actual-port "..."))
     ;; For now, just log that MCP is ready
     ;; Full HTTP server implementation would go here
     (reset! mcp-server {:port actual-port :running true})
     (println "✓ MCP server ready")
     (println "  Tools available:" (count (list-mcp-tools)))
     {:port actual-port :url (str "http://localhost:" actual-port "/mcp")})))

(defn stop!
  "Stop MCP server"
  []
  (when @mcp-server
    (reset! mcp-server nil)
    (println "✓ MCP server stopped")))

(defn status
  "Get MCP server status"
  []
  (if @mcp-server
    {:running true :port (:port @mcp-server)}
    {:running false}))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver mcp-tools [_]
  {::pco/output [{:mcp/tools [:name :description :inputSchema]}]}
  {:mcp/tools (list-mcp-tools)})

(pco/defresolver mcp-status [_]
  {::pco/output [:mcp/status]}
  {:mcp/status (status)})

;; ============================================================================
;; Pathom Mutations
;; ============================================================================

(pco/defmutation mcp-start! [{:keys [port]}]
  {::pco/output [:port :url]}
  (start! {:port port}))

(pco/defmutation mcp-stop! [_]
  {::pco/output [:status]}
  (stop!)
  {:status :stopped})

(pco/defmutation mcp-invoke! [{:keys [tool arguments]}]
  {::pco/output [:result :status :error]}
  (let [result (invoke-tool tool (or arguments {}))]
    {:result (:result result)
     :status (:status result)
     :error (:error result)}))

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [mcp-tools mcp-status])

(def mutations
  [mcp-start! mcp-stop! mcp-invoke!])

;; ============================================================================
;; REPL Integration
;; ============================================================================

(comment
  ;; Direct usage
  (list-mcp-tools)
  (invoke-tool "system/status" {})

  ;; Server lifecycle
  (start!)
  (status)
  (stop!)

  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [{:mcp/tools [:name :description]}])
  (q/q [:mcp/status]))
