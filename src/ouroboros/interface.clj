(ns ouroboros.interface
  "Interface - Unified system surface

   This namespace provides direct access to all system capabilities.
   Core namespaces are always loaded. Extension namespaces are lazy-loaded.
   
   Usage:
     (require '[ouroboros.interface :as iface])
     (iface/boot!)
     (iface/q [:system/status])
     (iface/remember :key \"value\")"
  (:require
   ;; Core - always loaded
   [ouroboros.interface.lifecycle :as lifecycle]
   [ouroboros.interface.config :as config]
   ;; Direct core access (no interface wrapper)
   [ouroboros.query :as query]
   [ouroboros.memory :as memory]
   [ouroboros.knowledge :as knowledge]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.api :as api]
   [ouroboros.openapi :as openapi]
   [ouroboros.mcp :as mcp]))

;; ============================================================================
;; Lazy Loading Helper
;; ============================================================================

(defonce ^:private loaded-namespaces (atom #{}))

(defn- lazy-load
  "Load a namespace on first use

   Usage: (lazy-load 'ouroboros.interface.memory 'memory)"
  [ns-sym alias-sym]
  (when-not (contains? @loaded-namespaces ns-sym)
    (require ns-sym)
    (swap! loaded-namespaces conj ns-sym))
  (ns-resolve ns-sym alias-sym))

(defn- lazy-fn
  "Create a lazy wrapper for a function

   Usage: (def memory-get (lazy-fn 'ouroboros.interface.memory 'get))"
  [ns-sym fn-sym]
  (fn [& args]
    (let [f (lazy-load ns-sym fn-sym)]
      (apply f args))))

;; ============================================================================
;; Lifecycle (Always Loaded)
;; ============================================================================

(def boot! lifecycle/boot!)
(def shutdown! lifecycle/shutdown!)

;; ============================================================================
;; Query (Direct)
;; ============================================================================

(defn q
  "Execute EQL query
   
   Usage: (q [:system/status])
          (q [{:git/commits [:git/hash]}])"
  [query-expr]
  (query/q query-expr))

(defn status
  "Current system status"
  []
  (query/status))

(defn report
  "Full system report"
  []
  (query/full-report))

;; ============================================================================
;; Config (Always Loaded)
;; ============================================================================

(def load-config! config/load-config!)
(def get-config config/get-config)
(def config-summary config/config-summary)

;; ============================================================================
;; Memory (Direct)
;; ============================================================================

(defn remember
  "Save value to persistent memory
   
   Usage: (remember :key \"value\")"
  [key value]
  (memory/save-value! key value))

(defn recall
  "Get value from memory
   
   Usage: (recall :key)"
  [key]
  (memory/get-value key))

(defn forget
  "Delete value from memory
   
   Usage: (forget :key)"
  [key]
  (memory/delete-value! key))

;; ============================================================================
;; Knowledge (Direct)
;; ============================================================================

(defn files
  "List files in directory
   
   Usage: (files \"src\")"
  [dir-path]
  (knowledge/list-files dir-path))

(defn file
  "Get file info
   
   Usage: (file \"README.md\")"
  [file-path]
  (knowledge/get-file file-path))

(defn search
  "Search files by pattern
   
   Usage: (search \"*.clj\")"
  [pattern]
  (knowledge/search-files pattern))

(defn project
  "Get project structure
   
   Usage: (project)"
  []
  (knowledge/get-project))

;; ============================================================================
;; API (Direct)
;; ============================================================================

(defn http-get
  "Make HTTP GET request
   
   Usage: (http-get \"https://api.example.com/data\")"
  [url]
  (api/http-get url))

(defn http-request!
  "Make HTTP request with method
   
   Usage: (http-request! :post \"https://api.example.com/data\" {:body {...}})"
  [method url opts]
  (api/http-request! method url opts))

;; ============================================================================
;; OpenAPI (Direct)
;; ============================================================================

(defn openapi-bootstrap!
  "Bootstrap OpenAPI client from spec URL
   
   Usage: (openapi-bootstrap! :petstore \"https://petstore.swagger.io/v2/swagger.json\")"
  [name spec-url]
  (openapi/bootstrap-client! name spec-url))

(defn openapi-clients
  "List registered OpenAPI clients"
  []
  (openapi/list-clients))

(defn openapi-operations
  "List operations for client
   
   Usage: (openapi-operations :petstore)"
  [client-name]
  (openapi/list-operations client-name))

(defn openapi-call!
  "Call OpenAPI operation
   
   Usage: (openapi-call! :petstore :get-pet-by-id {:petId 123})"
  [client-name operation params]
  (openapi/call-operation client-name operation params))

;; ============================================================================
;; AI (Lazy) - DEPRECATED
;; ============================================================================

(def ai-tools
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.ai 'ai-tools))
(def ai-call!
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.ai 'ai-call!))
(def ai-context
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.ai 'ai-context))
(def ai-project
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.ai 'ai-project))
(def ai-full
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.ai 'ai-full))

;; ============================================================================
;; Telemetry (Direct)
;; ============================================================================

(defn telemetry-events
  "Get all telemetry events"
  []
  (telemetry/get-events))

(defn telemetry-recent
  "Get n recent telemetry events"
  [n]
  (telemetry/get-recent-events n))

(defn telemetry-stats
  "Get telemetry statistics"
  []
  (query/q [:telemetry/total-events :telemetry/tool-invocations]))

(defn telemetry-clear!
  "Clear all telemetry events"
  []
  (query/m 'ouroboros.telemetry/telemetry-clear! {}))

;; ============================================================================
;; Metrics (Lazy)
;; ============================================================================

(def metrics-status (lazy-fn 'ouroboros.interface.metrics 'metrics-status))
(def metrics-snapshot (lazy-fn 'ouroboros.interface.metrics 'metrics-snapshot))

;; ============================================================================
;; MCP (Direct)
;; ============================================================================

(defn mcp-tools
  "List MCP-exposed tools"
  []
  (mcp/list-mcp-tools))

(defn mcp-start!
  "Start MCP server
   
   Usage: (mcp-start! {:port 3000})"
  ([] (mcp/start!))
  ([opts] (mcp/start! opts)))

(defn mcp-stop!
  "Stop MCP server"
  []
  (mcp/stop!))

(defn mcp-status
  "Get MCP server status"
  []
  (mcp/status))

(defn mcp-invoke!
  "Invoke tool via MCP
   
   Usage: (mcp-invoke! \"system/status\" {})"
  [tool-name arguments]
  (mcp/invoke-tool tool-name arguments))

;; ============================================================================
;; Chat (Lazy)
;; ============================================================================

(def chat-adapters (lazy-fn 'ouroboros.interface.chat 'chat-adapters))
(def chat-start! (lazy-fn 'ouroboros.interface.chat 'chat-start!))
(def chat-stop! (lazy-fn 'ouroboros.interface.chat 'chat-stop!))
(def chat-register-telegram! (lazy-fn 'ouroboros.interface.chat 'chat-register-telegram!))
(def chat-register-slack! (lazy-fn 'ouroboros.interface.chat 'chat-register-slack!))
(def chat-register-discord! (lazy-fn 'ouroboros.interface.chat 'chat-register-discord!))
(def chat-sessions (lazy-fn 'ouroboros.interface.chat 'chat-sessions))
(def chat-clear-session! (lazy-fn 'ouroboros.interface.chat 'chat-clear-session!))

;; ============================================================================
;; Agent (Lazy) - DEPRECATED
;; ============================================================================

(def agent-configure!
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.agent 'agent-configure!))
(def agent-config
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.agent 'agent-config))
(def agent-generate
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.agent 'agent-generate))

;; ============================================================================
;; Auth (Lazy)
;; ============================================================================

(def auth-get-user (lazy-fn 'ouroboros.interface.auth 'auth-get-user))
(def auth-users (lazy-fn 'ouroboros.interface.auth 'auth-users))
(def auth-check-permission (lazy-fn 'ouroboros.interface.auth 'auth-check-permission))
(def auth-rate-limit (lazy-fn 'ouroboros.interface.auth 'auth-rate-limit))

;; ============================================================================
;; Dashboard (Lazy)
;; ============================================================================

(def dashboard-start! (lazy-fn 'ouroboros.interface.dashboard 'dashboard-start!))
(def dashboard-stop! (lazy-fn 'ouroboros.interface.dashboard 'dashboard-stop!))
(def dashboard-status (lazy-fn 'ouroboros.interface.dashboard 'dashboard-status))

;; ============================================================================
;; Lane (Lazy)
;; ============================================================================

(def lane-create! (lazy-fn 'ouroboros.interface.lane 'lane-create!))
(def lane-submit! (lazy-fn 'ouroboros.interface.lane 'lane-submit!))
(def lane-submit!! (lazy-fn 'ouroboros.interface.lane 'lane-submit!!))
(def lane-destroy! (lazy-fn 'ouroboros.interface.lane 'lane-destroy!))
(def lane-status (lazy-fn 'ouroboros.interface.lane 'lane-status))
(def lane-stats (lazy-fn 'ouroboros.interface.lane 'lane-stats))
(def with-session-lane (lazy-fn 'ouroboros.interface.lane 'with-session-lane))

;; ============================================================================
;; Context Guard (Lazy)
;; ============================================================================

(def context-check! (lazy-fn 'ouroboros.interface.context-guard 'context-check!))
(def context-force-compact! (lazy-fn 'ouroboros.interface.context-guard 'context-force-compact!))
(def context-count-tokens (lazy-fn 'ouroboros.interface.context-guard 'context-count-tokens))
(def context-register! (lazy-fn 'ouroboros.interface.context-guard 'context-register!))
(def context-update! (lazy-fn 'ouroboros.interface.context-guard 'context-update!))
(def context-stats (lazy-fn 'ouroboros.interface.context-guard 'context-stats))

;; ============================================================================
;; Memory JSONL (Lazy)
;; ============================================================================

(def transcript-append! (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-append!))
(def transcript-read (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-read))
(def transcript-last-n (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-last-n))
(def transcript-since (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-since))
(def transcript-list (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-list))
(def transcript-delete! (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-delete!))
(def transcript-info (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-info))
(def summary-write! (lazy-fn 'ouroboros.interface.memory-jsonl 'summary-write!))
(def summary-read (lazy-fn 'ouroboros.interface.memory-jsonl 'summary-read))

;; ============================================================================
;; Memory Search (Lazy)
;; ============================================================================

(def memory-init! (lazy-fn 'ouroboros.interface.memory-search 'memory-init!))
(def memory-add! (lazy-fn 'ouroboros.interface.memory-search 'memory-add!))
(def memory-get (lazy-fn 'ouroboros.interface.memory-search 'memory-get))
(def memory-delete! (lazy-fn 'ouroboros.interface.memory-search 'memory-delete!))
(def memory-search-keyword (lazy-fn 'ouroboros.interface.memory-search 'memory-search-keyword))
(def memory-search-vector (lazy-fn 'ouroboros.interface.memory-search 'memory-search-vector))
(def memory-search (lazy-fn 'ouroboros.interface.memory-search 'memory-search))
(def memory-list (lazy-fn 'ouroboros.interface.memory-search 'memory-list))
(def memory-search-stats (lazy-fn 'ouroboros.interface.memory-search 'memory-search-stats))
(def memory-clear! (lazy-fn 'ouroboros.interface.memory-search 'memory-clear!))

;; ============================================================================
;; Sandbox (Lazy)
;; ============================================================================

(def allowlist-create! (lazy-fn 'ouroboros.interface.sandbox 'allowlist-create!))
(def allowlist-custom! (lazy-fn 'ouroboros.interface.sandbox 'allowlist-custom!))
(def allowlist-destroy! (lazy-fn 'ouroboros.interface.sandbox 'allowlist-destroy!))
(def allowlist-permitted? (lazy-fn 'ouroboros.interface.sandbox 'allowlist-permitted?))
(def allowlist-tools (lazy-fn 'ouroboros.interface.sandbox 'allowlist-tools))
(def allowlist-stats (lazy-fn 'ouroboros.interface.sandbox 'allowlist-stats))
(def sandbox-stats (lazy-fn 'ouroboros.interface.sandbox 'sandbox-stats))
(def sandbox-health (lazy-fn 'ouroboros.interface.sandbox 'sandbox-health))
(def tool-safe (lazy-fn 'ouroboros.interface.sandbox 'tool-safe))
(def session-create! (lazy-fn 'ouroboros.interface.sandbox 'session-create!))
(def sandbox-exec-shell (lazy-fn 'ouroboros.interface.sandbox 'sandbox-exec-shell))
(def sandbox-exec-python (lazy-fn 'ouroboros.interface.sandbox 'sandbox-exec-python))
(def sandbox-exec-node (lazy-fn 'ouroboros.interface.sandbox 'sandbox-exec-node))
(def sandbox-docker? (lazy-fn 'ouroboros.interface.sandbox 'sandbox-docker?))
(def safety-report (lazy-fn 'ouroboros.interface.sandbox 'safety-report))

;; ============================================================================
;; Security (Lazy)
;; ============================================================================

(def security-sanitize (lazy-fn 'ouroboros.interface.security 'security-sanitize))
(def security-check (lazy-fn 'ouroboros.interface.security 'security-check))
(def security-quarantine! (lazy-fn 'ouroboros.interface.security 'security-quarantine!))
(def security-release! (lazy-fn 'ouroboros.interface.security 'security-release!))
(def security-quarantined? (lazy-fn 'ouroboros.interface.security 'security-quarantined?))
(def security-quarantine-status (lazy-fn 'ouroboros.interface.security 'security-quarantine-status))
(def security-report (lazy-fn 'ouroboros.interface.security 'security-report))

;; ============================================================================
;; Confirmation (Lazy)
;; ============================================================================

(def confirm-pending? (lazy-fn 'ouroboros.interface.confirmation 'confirm-pending?))
(def confirm-get (lazy-fn 'ouroboros.interface.confirmation 'confirm-get))
(def confirm-approve! (lazy-fn 'ouroboros.interface.confirmation 'confirm-approve!))
(def confirm-deny! (lazy-fn 'ouroboros.interface.confirmation 'confirm-deny!))
(def confirm-cancel! (lazy-fn 'ouroboros.interface.confirmation 'confirm-cancel!))
(def confirm-clear! (lazy-fn 'ouroboros.interface.confirmation 'confirm-clear!))
(def confirm-history (lazy-fn 'ouroboros.interface.confirmation 'confirm-history))
(def confirm-stats (lazy-fn 'ouroboros.interface.confirmation 'confirm-stats))
(def confirm-security-report (lazy-fn 'ouroboros.interface.confirmation 'confirm-security-report))

;; ============================================================================
;; Schema Validation (Lazy) - DEPRECATED
;; ============================================================================

(def schema-validate
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.schema 'schema-validate))
(def schema-validate-tool
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.schema 'schema-validate-tool))
(def schema-strict
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.schema 'schema-strict))
(def schema-required
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.schema 'schema-required))
(def schema-optional
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.schema 'schema-optional))
(def schema->json
  "DEPRECATED: Use ECA instead. https://github.com/editor-code-assistant/eca"
  (lazy-fn 'ouroboros.interface.schema 'schema->json))

;; ============================================================================
;; Skill (Lazy)
;; ============================================================================

(def skill-register! (lazy-fn 'ouroboros.interface.skill 'skill-register!))
(def skill-load! (lazy-fn 'ouroboros.interface.skill 'skill-load!))
(def skill-unload! (lazy-fn 'ouroboros.interface.skill 'skill-unload!))
(def skill-reload! (lazy-fn 'ouroboros.interface.skill 'skill-reload!))
(def skill-list (lazy-fn 'ouroboros.interface.skill 'skill-list))
(def skill-loaded (lazy-fn 'ouroboros.interface.skill 'skill-loaded))
(def skill-tools (lazy-fn 'ouroboros.interface.skill 'skill-tools))
(def skill-tool->skill (lazy-fn 'ouroboros.interface.skill 'skill-tool->skill))
(def skill-search (lazy-fn 'ouroboros.interface.skill 'skill-search))
(def skill-stats (lazy-fn 'ouroboros.interface.skill 'skill-stats))
(def skill-register-built-ins! (lazy-fn 'ouroboros.interface.skill 'skill-register-built-ins!))

;; ============================================================================
;; ECA Client (NEW - Phase 1)
;; ============================================================================

(def eca-start!
  "Start ECA client (JSON-RPC connection to ECA binary)

   Usage: (eca-start!)
          (eca-start! {:eca-path \"/path/to/eca\"})"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-start!))

(def eca-stop!
  "Stop ECA client

   Usage: (eca-stop!)"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-stop!))

(def eca-status
  "Get ECA client status

   Usage: (eca-status)"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-status))

(def eca-chat-prompt
  "Send chat message to ECA

   Usage: (eca-chat-prompt \"Hello, help me write a function!\")"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-chat-prompt))

(def eca-query-context
  "Query context from ECA (repoMap, files, etc.)

   Usage: (eca-query-context)"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-query-context))

(def eca-query-files
  "Search files in ECA workspace

   Usage: (eca-query-files \"*.clj\")"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-query-files))

(def eca-approve-tool!
  "Approve tool call from ECA

   Usage: (eca-approve-tool! {:tool \"file/read\" :params {:path \"README.md\"}})"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-approve-tool!))

(def eca-reject-tool!
  "Reject tool call from ECA

   Usage: (eca-reject-tool! {:tool \"shell/exec\" :reason \"Too dangerous\"})"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-reject-tool!))

;; ============================================================================
;; REPL
;; ============================================================================

(comment
  ;; Full boot sequence
  (boot!)

  ;; Query examples
  (q [:system/current-state])
  (q [:system/healthy?])
  (status)
  (report)

  ;; Lazy loading demo
  ;; First call loads the namespace
  (remember :test-key "test-value")

  ;; Check what's loaded
  @loaded-namespaces

  ;; Shutdown
  (shutdown!))
