(ns ouroboros.interface
  "Interface - Unified system surface with lazy loading

   This namespace provides lazy-loaded access to all interface functions.
   Sub-namespaces are loaded on first use, not at require time.
   
   For specific domains, require directly:
   - ouroboros.interface.lifecycle - boot! shutdown!
   - ouroboros.interface.query - q status report
   - ouroboros.interface.memory - remember recall forget
   - etc.
   
   Note: The first call to any function group will trigger namespace loading."
  (:require
   ;; Core - always loaded
   [ouroboros.interface.lifecycle :as lifecycle]
   [ouroboros.interface.query :as query]
   [ouroboros.interface.config :as config]))

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
;; Query (Always Loaded)
;; ============================================================================

(def q query/q)
(def status query/status)
(def report query/report)

;; ============================================================================
;; Config (Always Loaded)
;; ============================================================================

(def load-config! config/load-config!)
(def get-config config/get-config)
(def config-summary config/config-summary)

;; ============================================================================
;; Memory (Lazy)
;; ============================================================================

(def remember (lazy-fn 'ouroboros.interface.memory 'remember))
(def recall (lazy-fn 'ouroboros.interface.memory 'recall))
(def forget (lazy-fn 'ouroboros.interface.memory 'forget))

;; ============================================================================
;; Knowledge (Lazy)
;; ============================================================================

(def files (lazy-fn 'ouroboros.interface.knowledge 'files))
(def file (lazy-fn 'ouroboros.interface.knowledge 'file))
(def search (lazy-fn 'ouroboros.interface.knowledge 'search))
(def project (lazy-fn 'ouroboros.interface.knowledge 'project))

;; ============================================================================
;; API (Lazy)
;; ============================================================================

(def http-get (lazy-fn 'ouroboros.interface.api 'http-get))
(def http-request! (lazy-fn 'ouroboros.interface.api 'http-request!))

;; ============================================================================
;; OpenAPI (Lazy)
;; ============================================================================

(def openapi-bootstrap! (lazy-fn 'ouroboros.interface.openapi 'openapi-bootstrap!))
(def openapi-clients (lazy-fn 'ouroboros.interface.openapi 'openapi-clients))
(def openapi-operations (lazy-fn 'ouroboros.interface.openapi 'openapi-operations))
(def openapi-call! (lazy-fn 'ouroboros.interface.openapi 'openapi-call!))

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
;; Telemetry (Lazy)
;; ============================================================================

(def telemetry-events (lazy-fn 'ouroboros.interface.telemetry 'telemetry-events))
(def telemetry-recent (lazy-fn 'ouroboros.interface.telemetry 'telemetry-recent))
(def telemetry-stats (lazy-fn 'ouroboros.interface.telemetry 'telemetry-stats))
(def telemetry-clear! (lazy-fn 'ouroboros.interface.telemetry 'telemetry-clear!))

;; ============================================================================
;; Metrics (Lazy)
;; ============================================================================

(def metrics-status (lazy-fn 'ouroboros.interface.metrics 'metrics-status))
(def metrics-snapshot (lazy-fn 'ouroboros.interface.metrics 'metrics-snapshot))

;; ============================================================================
;; MCP (Lazy)
;; ============================================================================

(def mcp-tools (lazy-fn 'ouroboros.interface.mcp 'mcp-tools))
(def mcp-start! (lazy-fn 'ouroroboros.interface.mcp 'mcp-start!))
(def mcp-stop! (lazy-fn 'ouroboros.interface.mcp 'mcp-stop!))
(def mcp-status (lazy-fn 'ouroboros.interface.mcp 'mcp-status))
(def mcp-invoke! (lazy-fn 'ouroboros.interface.mcp 'mcp-invoke!))

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
