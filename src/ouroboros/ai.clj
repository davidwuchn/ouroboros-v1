(ns ouroboros.ai
  "AI - Tooling hooks for AI interaction
   
   Makes the system discoverable and usable by AI through:
   - Tool discovery: List all available capabilities
   - Structured execution: Call tools with parameters
   - Context packaging: Export system state for AI context
   - Self-description: System explains itself to AI"
  (:require
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [com.wsscode.pathom3.connect.indexes :as pci]
   [ouroboros.query :as query]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.openapi :as openapi]))

;; ============================================================================
;; Tool Registry
;; ============================================================================

(def ^:private tool-registry
  "Built-in tools available to AI"
  (atom
   {:system/status
    {:description "Get current system status"
     :parameters {}
     :fn (fn [_] ((resolve 'ouroboros.query/q) [:system/status :system/healthy?]))}

    :system/report
    {:description "Get full system report"
     :parameters {}
     :fn (fn [_] ((resolve 'ouroboros.query/q) [:system/current-state :system/status :system/healthy? :system/meta]))}

    :git/commits
    {:description "Get recent git commits"
     :parameters {:n {:type :int :description "Number of commits" :default 5}}
     :fn (fn [{:keys [n] :or {n 5}}]
           ((resolve 'ouroboros.query/q) [{:git/commits (vec (take n [:git/hash :git/subject :git/author]))}]))}

    :git/status
    {:description "Get git repository status"
     :parameters {}
     :fn (fn [_] ((resolve 'ouroboros.query/q) [:git/status]))}

    :file/read
    {:description "Read file contents"
     :parameters {:path {:type :string :description "File path" :required true}
                  :lines {:type :int :description "Max lines to read" :default 100}}
     :fn (fn [{:keys [path] :or {lines 100}}]
           (let [result ((resolve 'ouroboros.query/q) [{[:file-path path]
                                  [:file/content-preview :file/size]}])]
             {:file path
              :content (get-in result [[:file-path path] :file/content-preview])
              :size (get-in result [[:file-path path] :file/size])}))}

    :file/search
    {:description "Search files by pattern"
     :parameters {:pattern {:type :string :description "Glob pattern" :required true}}
     :fn (fn [{:keys [pattern]}]
           ((resolve 'ouroboros.query/q) [{[:search-pattern pattern]
                      [{:knowledge/search [:file/path :file/name :file/size]}]}]))}

    :file/list
    {:description "List files in directory"
     :parameters {:dir {:type :string :description "Directory path" :default "."}}
     :fn (fn [{:keys [dir] :or {dir "."}}]
           ((resolve 'ouroboros.query/q) [{[:dir-path dir]
                      [{:knowledge/files [:file/path :file/name]}]}]))}

    :memory/get
    {:description "Get value from memory"
     :parameters {:key {:type :keyword :description "Memory key" :required true}}
     :fn (fn [{:keys [key]}]
           (let [result ((resolve 'ouroboros.query/q) [{[:memory-key key] [:memory/value]}])]
             {:key key :value (get-in result [[:memory-key key] :memory/value])}))}

    :memory/set
    {:description "Set value in memory"
     :parameters {:key {:type :keyword :description "Memory key" :required true}
                  :value {:type :any :description "Value to store" :required true}}
     :fn (fn [{:keys [key value]}]
           ((resolve 'ouroboros.query/m) 'memory/save! {:memory/key key :memory/value value})
           {:key key :status :saved})}

    :http/get
    {:description "Make HTTP GET request"
     :parameters {:url {:type :string :description "URL to fetch" :required true}}
     :fn (fn [{:keys [url]}]
           ((resolve 'ouroboros.query/q) [{[:url url] [:api/status :api/body :api/success?]}]))}

    :openapi/bootstrap
    {:description "Bootstrap OpenAPI client from spec"
     :parameters {:name {:type :keyword :description "Client name" :required true}
                  :spec-url {:type :string :description "OpenAPI spec URL" :required true}}
     :fn (fn [{:keys [name spec-url]}]
           ((resolve 'ouroboros.query/m) 'ouroboros.openapi/openapi-bootstrap! {:name name :spec-url spec-url}))}

    :openapi/call
    {:description "Call OpenAPI operation"
     :parameters {:client {:type :keyword :description "Client name" :required true}
                  :operation {:type :keyword :description "Operation ID" :required true}
                  :params {:type :map :description "Operation parameters" :default {}}}
     :fn (fn [{:keys [client operation params] :or {params {}}}]
           ((resolve 'ouroboros.openapi/call-operation) client operation params))}

    :query/eql
    {:description "Execute arbitrary EQL query"
     :parameters {:query {:type :vector :description "EQL query" :required true}}
     :fn (fn [{:keys [query]}]
           ((resolve 'ouroboros.query/q) query))}}))

(defn register-tool!
  "Register a new tool for AI use"
  [tool-name {:keys [description parameters fn]}]
  (swap! tool-registry assoc tool-name
         {:description description
          :parameters parameters
          :fn fn})
  (println (str "✓ AI tool registered: " tool-name)))

(defn list-tools
  "List all available AI tools"
  []
  (map (fn [[name {:keys [description parameters]}]]
         {:tool/name name
          :tool/description description
          :tool/parameters parameters})
       @tool-registry))

(defn get-tool
  "Get a specific tool"
  [tool-name]
  (get @tool-registry (keyword tool-name)))

;; ============================================================================
;; Tool Execution
;; ============================================================================

(defn call-tool
  "Execute a tool by name with parameters"
  [tool-name params]
  (telemetry/log-tool-invoke tool-name params)
  (let [start (System/nanoTime)]
    (if-let [tool (get-tool tool-name)]
      (try
        (let [result ((:fn tool) params)
              duration (/ (- (System/nanoTime) start) 1e6)]
          (telemetry/log-tool-complete tool-name result duration)
          {:tool tool-name
           :params params
           :result result
           :status :success})
        (catch Exception e
          (let [duration (/ (- (System/nanoTime) start) 1e6)]
            (telemetry/log-tool-error tool-name e)
            {:tool tool-name
             :params params
             :error (.getMessage e)
             :status :error})))
      (do
        (telemetry/emit! {:event :tool/not-found :tool tool-name})
        {:tool tool-name
         :error "Tool not found"
         :available-tools (keys @tool-registry)
         :status :not-found}))))

;; ============================================================================
;; Context Packaging
;; ============================================================================

(defn system-context
  "Package system state for AI context"
  []
  (let [q (resolve 'ouroboros.query/q)
        status (q [:system/status :system/healthy?])
        git (q [:git/status])
        memory-keys (q [:memory/keys])]
    {:context/type :system
     :context/timestamp (str (java.time.Instant/now))
     :system/status status
     :git/status git
     :memory/keys memory-keys
     :tools/available (count @tool-registry)
     :tools/names (keys @tool-registry)}))

(defn project-context
  "Package project state for AI context"
  []
  (let [q (resolve 'ouroboros.query/q)
        project (q [:knowledge/project])
        recent-commits (q [{:git/commits [:git/hash :git/subject]}])]
    {:context/type :project
     :context/timestamp (str (java.time.Instant/now))
     :project/name (get-in project [:knowledge/project :project/name])
     :project/root (get-in project [:knowledge/project :project/root])
     :recent-commits (take 3 (:git/commits recent-commits))}))

(defn full-context
  "Get complete context for AI"
  []
  {:system (system-context)
   :project (project-context)
   :tools (list-tools)})

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver ai-tools [_]
  {::pco/output [{:ai/tools [:tool/name :tool/description :tool/parameters]}]}
  {:ai/tools (list-tools)})

(pco/defresolver ai-context [_]
  {::pco/output [:ai/context]}
  {:ai/context (system-context)})

(pco/defmutation ai-call! [{:keys [tool params]}]
  {::pco/output [:tool :params :result :status :error]}
  (call-tool tool params))

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [ai-tools ai-context])

(def mutations
  [ai-call!])

(comment
  ;; List all tools
  (list-tools)

  ;; Get system context
  (system-context)

  ;; Call a tool
  (call-tool :system/status {})
  (call-tool :git/commits {:n 3})
  (call-tool :file/read {:path "README.md" :lines 20})

  ;; Full context
  (full-context)

  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:ai/context])
  (q/q [{:ai/tools [:tool/name :tool/description]}]))
