(ns ouroboros.interface
  "Interface - Engine (∅) + Query + Graph + Memory + Knowledge + API + OpenAPI + AI
   
   The unified system surface. Boot sequence:
   1. Start statechart (Engine)
   2. Initialize Pathom (Query)
   3. Load Memory
   4. Expose via nREPL"
  (:require
   [ouroboros.engine :as engine]
   [ouroboros.query :as query]
   [ouroboros.memory :as memory]
   [ouroboros.openapi]
   [ouroboros.ai :as ai]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.mcp :as mcp]))

;; ============================================================================
;; Lifecycle
;; ============================================================================

(defn boot!
  "Boot the complete system
   
   Sequence:
   - Engine: Create statechart session, transition to :running
   - Query: Initialize Pathom environment with all resolvers
   - Memory: Load persisted memory from disk"
  []
  (println "========================================")
  (println "  Ouroboros System Boot")
  (println "========================================")

  ;; Step 1: Engine
  (println "\n[1/3] Starting Engine (∅)...")
  (engine/boot!)

  ;; Step 2: Query
  (println "\n[2/3] Initializing Query interface...")
  (query/init!)

  ;; Step 3: Memory
  (println "\n[3/3] Loading Memory...")
  (memory/init!)

  ;; Verification
  (println "\n========================================")
  (println "  System Status:")
  (clojure.pprint/pprint (query/status))
  (println "========================================")

  ;; Return the query function for convenience
  query/q)

(defn shutdown!
  "Graceful shutdown"
  []
  (println "\n========================================")
  (println "  System Shutdown")
  (println "========================================")
  (engine/stop!)
  (println "✓ System stopped"))

;; ============================================================================
;; Query Helpers (convenience in REPL)
;; ============================================================================

(defn q
  "Query the system (after boot)"
  [query]
  (query/q query))

(defn remember
  "Save a value to memory
   
   Usage: (remember :my-key \"my value\")"
  [key value]
  (memory/save-value! key value))

(defn recall
  "Get a value from memory
   
   Usage: (recall :my-key)"
  [key]
  (memory/get-value key))

(defn forget
  "Delete a value from memory
   
   Usage: (forget :my-key)"
  [key]
  (memory/delete-value! key))

(defn status
  "Current system status"
  []
  (query/status))

(defn report
  "Full system report"
  []
  (query/full-report))

;; ============================================================================
;; Knowledge Helpers (file system as graph)
;; ============================================================================

(defn files
  "List files in a directory
   
   Usage: (files \"src\")
          (files \".\")"
  [dir-path]
  (query/q [{[:dir-path dir-path]
             [{:knowledge/files [:file/path :file/name :file/extension
                                 :file/size :file/directory?]}]}]))

(defn file
  "Get info about a specific file
   
   Usage: (file \"README.md\")"
  [file-path]
  (query/q [{[:file-path file-path]
             [:file/path :file/name :file/size
              :file/content-preview :file/last-modified]}]))

(defn search
  "Search files by pattern
   
   Usage: (search \"*.clj\")"
  [pattern]
  (query/q [{[:search-pattern pattern]
             [{:knowledge/search [:file/path :file/name :file/size]}]}]))

(defn project
  "Get project structure
   
   Usage: (project)"
  []
  (query/q [:knowledge/project]))

;; ============================================================================
;; API Helpers (HTTP requests)
;; ============================================================================

(defn http-get
  "Make HTTP GET request
   
   Usage: (http-get \"https://api.github.com/users/github\")"
  [url]
  (query/q [{[:url url]
             [:api/status :api/body :api/success?]}]))

(defn http-request!
  "Make HTTP request (mutation)
   
   Usage: (http-request! {:method :post :url \"...\" :body \"...\"})"
  [{:keys [method url headers body]}]
  (query/m 'ouroboros.api/api-request!
           {:method method :url url :headers headers :body body}))

;; ============================================================================
;; OpenAPI Helpers (OpenAPI specs → callable clients)
;; ============================================================================

(defn openapi-bootstrap!
  "Bootstrap an OpenAPI client from spec URL
   
   Usage: (openapi-bootstrap! :petstore \"https://petstore.swagger.io/v2/swagger.json\")"
  ([name spec-url]
   (openapi-bootstrap! name spec-url nil))
  ([name spec-url base-url]
   (query/m 'ouroboros.openapi/openapi-bootstrap!
            {:name name :spec-url spec-url :base-url base-url})))

(defn openapi-clients
  "List registered OpenAPI clients
   
   Usage: (openapi-clients)"
  []
  (query/q [:openapi/clients]))

(defn openapi-operations
  "List operations for a client
   
   Usage: (openapi-operations :petstore)"
  [client-name]
  (ouroboros.openapi/list-operations client-name))

(defn openapi-call!
  "Call an OpenAPI operation
   
   Usage: (openapi-call! :petstore :get-pet-by-id {:petId 1})"
  [client-name operation-id params]
  (ouroboros.openapi/call-operation client-name operation-id params))

;; ============================================================================
;; AI Helpers (AI tooling hooks)
;; ============================================================================

(defn ai-tools
  "List all AI-available tools
   
   Usage: (ai-tools)"
  []
  (ai/list-tools))

(defn ai-call!
  "Call an AI tool with parameters
   
   Usage: (ai-call! :file/read {:path \"README.md\"})"
  [tool-name params]
  (ai/call-tool tool-name params))

(defn ai-context
  "Get system context for AI
   
   Usage: (ai-context)"
  []
  (ai/system-context))

(defn ai-project
  "Get project context for AI
   
   Usage: (ai-project)"
  []
  (ai/project-context))

(defn ai-full
  "Get complete AI context
   
   Usage: (ai-full)"
  []
  (ai/full-context))

;; ============================================================================
;; Telemetry Helpers (Structured logging and metrics)
;; ============================================================================

(defn telemetry-events
  "Get all telemetry events
   
   Usage: (telemetry-events)"
  []
  (telemetry/get-events))

(defn telemetry-recent
  "Get n recent telemetry events
   
   Usage: (telemetry-recent 10)"
  [n]
  (telemetry/get-recent-events n))

(defn telemetry-stats
  "Get telemetry statistics
   
   Usage: (telemetry-stats)"
  []
  (query/q [:telemetry/total-events :telemetry/tool-invocations :telemetry/errors]))

(defn telemetry-clear!
  "Clear all telemetry events
   
   Usage: (telemetry-clear!)"
  []
  (query/m 'ouroboros.telemetry/telemetry-clear! {}))

;; ============================================================================
;; MCP Helpers (Model Context Protocol)
;; ============================================================================

(defn mcp-tools
  "List all MCP-exposed tools
   
   Usage: (mcp-tools)"
  []
  (mcp/list-mcp-tools))

(defn mcp-start!
  "Start MCP server
   
   Usage: (mcp-start! {:port 3000})"
  ([] (mcp/start!))
  ([opts] (mcp/start! opts)))

(defn mcp-stop!
  "Stop MCP server
   
   Usage: (mcp-stop!)"
  []
  (mcp/stop!))

(defn mcp-status
  "Get MCP server status
   
   Usage: (mcp-status)"
  []
  (mcp/status))

(defn mcp-invoke!
  "Invoke a tool via MCP
   
   Usage: (mcp-invoke! \"system/status\" {})"
  [tool-name arguments]
  (mcp/invoke-tool tool-name arguments))

(comment
  ;; Full boot sequence
  (boot!)

  ;; Query examples
  (q [:system/current-state])
  (q [:system/healthy?])
  (status)
  (report)

  ;; Shutdown
  (shutdown!))