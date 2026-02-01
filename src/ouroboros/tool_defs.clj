(ns ouroboros.tool-defs
  "Tool Definitions - Defines tools that require Query capabilities
   
   This namespace is loaded AFTER both tool-registry and query are loaded,
   allowing tools to use the query interface without circular dependencies.
   
   Usage:
   (require '[ouroboros.tool-defs :as tool-defs])
   (tool-defs/register-all-tools!)  ; Register all built-in tools"
  (:require
   [ouroboros.tool-registry :as registry]
   [ouroboros.openapi :as openapi]))

;; ============================================================================
;; Tool Implementations
;; ============================================================================

(defn- q
  "Resolve query function at runtime to avoid circular dependency"
  [query]
  ((resolve 'ouroboros.query/q) query))

(defn- m
  "Resolve mutation function at runtime to avoid circular dependency"
  [mutation params]
  ((resolve 'ouroboros.query/m) mutation params))

(defn- system-status-tool
  [_]
  (q [:system/status :system/healthy?]))

(defn- system-report-tool
  [_]
  (q [:system/current-state :system/status :system/healthy? :system/meta]))

(defn- git-commits-tool
  [{:keys [n] :or {n 5}}]
  (q [{:git/commits (vec (take n [:git/hash :git/subject :git/author]))}]))

(defn- git-status-tool
  [_]
  (q [:git/status]))

(defn- file-read-tool
  [{:keys [path lines] :or {lines 100}}]
  (let [result (q [{[:file-path path]
                    [:file/content-preview :file/size]}])]
    {:file path
     :content (get-in result [[:file-path path] :file/content-preview])
     :size (get-in result [[:file-path path] :file/size])}))

(defn- file-search-tool
  [{:keys [pattern]}]
  (q [{[:search-pattern pattern]
       [{:knowledge/search [:file/path :file/name :file/size]}]}]))

(defn- file-list-tool
  [{:keys [dir] :or {dir "."}}]
  (q [{[:dir-path dir]
       [{:knowledge/files [:file/path :file/name]}]}]))

(defn- memory-get-tool
  [{:keys [key]}]
  (let [result (q [{[:memory/key key] [:memory/value :memory/exists?]}])]
    {:key key 
     :value (get-in result [[:memory/key key] :memory/value])
     :exists? (get-in result [[:memory/key key] :memory/exists?])}))

(defn- memory-set-tool
  [{:keys [key value]}]
  (m 'ouroboros.memory/memory-save! {:memory/key key :memory/value value})
  {:key key :status :saved})

(defn- http-get-tool
  [{:keys [url]}]
  (q [{[:url url] [:api/status :api/body :api/success?]}]))

(defn- openapi-bootstrap-tool
  [{:keys [name spec-url]}]
  (m 'ouroboros.openapi/openapi-bootstrap! {:name name :spec-url spec-url}))

(defn- openapi-call-tool
  [{:keys [client operation params] :or {params {}}}]
  (openapi/call-operation client operation params))

(defn- query-eql-tool
  [{:keys [query]}]
  (q query))

;; ============================================================================
;; Tool Registration
;; ============================================================================

(def tool-definitions
  "All built-in tool definitions"
  {:system/status
   {:description "Get current system status"
    :parameters {}
    :fn system-status-tool}

   :system/report
   {:description "Get full system report"
    :parameters {}
    :fn system-report-tool}

   :git/commits
   {:description "Get recent git commits"
    :parameters {:n {:type :int :description "Number of commits" :default 5}}
    :fn git-commits-tool}

   :git/status
   {:description "Get git repository status"
    :parameters {}
    :fn git-status-tool}

   :file/read
   {:description "Read file contents"
    :parameters {:path {:type :string :description "File path" :required true}
                 :lines {:type :int :description "Max lines to read" :default 100}}
    :fn file-read-tool}

   :file/search
   {:description "Search files by pattern"
    :parameters {:pattern {:type :string :description "Glob pattern" :required true}}
    :fn file-search-tool}

   :file/list
   {:description "List files in directory"
    :parameters {:dir {:type :string :description "Directory path" :default "."}}
    :fn file-list-tool}

   :memory/get
   {:description "Get value from memory"
    :parameters {:key {:type :keyword :description "Memory key" :required true}}
    :fn memory-get-tool}

   :memory/set
   {:description "Set value in memory"
    :parameters {:key {:type :keyword :description "Memory key" :required true}
                 :value {:type :any :description "Value to store" :required true}}
    :fn memory-set-tool}

   :http/get
   {:description "Make HTTP GET request"
    :parameters {:url {:type :string :description "URL to fetch" :required true}}
    :fn http-get-tool}

   :openapi/bootstrap
   {:description "Bootstrap OpenAPI client from spec"
    :parameters {:name {:type :keyword :description "Client name" :required true}
                 :spec-url {:type :string :description "OpenAPI spec URL" :required true}}
    :fn openapi-bootstrap-tool}

   :openapi/call
   {:description "Call OpenAPI operation"
    :parameters {:client {:type :keyword :description "Client name" :required true}
                 :operation {:type :keyword :description "Operation ID" :required true}
                 :params {:type :map :description "Operation parameters" :default {}}}
    :fn openapi-call-tool}

   :query/eql
   {:description "Execute arbitrary EQL query"
    :parameters {:query {:type :vector :description "EQL query" :required true}}
    :fn query-eql-tool}})

(defn register-all-tools!
  "Register all built-in tools with the registry
   
   Call this after query and tool-registry are loaded."
  []
  (doseq [[name spec] tool-definitions]
    (registry/register-tool! name spec))
  (println (str "✓ Registered " (count tool-definitions) " tools")))

(defn reregister-tool!
  "Re-register a tool (useful for testing or hot-reloading)"
  [tool-name]
  (when-let [spec (get tool-definitions tool-name)]
    (registry/register-tool! tool-name spec)))

;; ============================================================================
;; Exports
;; ============================================================================

(comment
  ;; Register all tools
  (register-all-tools!)

  ;; Check registered
  (registry/list-tools)

  ;; Test a tool
  (registry/call-tool :system/status {}))