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
   [ouroboros.telemetry :as telemetry]
   [ouroboros.api :as api]
   [ouroboros.openapi :as openapi]))

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
  "List files in directory via EQL query
   
   Usage: (files \"src\")"
  [dir-path]
  (q [{[:dir-path dir-path]
       [{:knowledge/files [:file/path :file/name]}]}]))

(defn file
  "Get file info via EQL query
   
   Usage: (file \"README.md\")"
  [file-path]
  (q [{[:file-path file-path]
       [:file/path :file/name :file/size :file/content-preview]}]))

(defn search
  "Search files by pattern via EQL query
   
   Usage: (search \"*.clj\")"
  [pattern]
  (q [{[:search-pattern pattern]
       [{:knowledge/search [:file/path :file/name :file/size]}]}]))

(defn project
  "Get project structure via EQL query
   
   Usage: (project)"
  []
  (q [:knowledge/project]))

;; ============================================================================
;; API (Direct)
;; ============================================================================

(defn http-get
  "Make HTTP GET request
   
   Usage: (http-get \"https://api.example.com/data\")"
  [url]
  (api/http-request {:method :get :url url}))

(defn http-request!
  "Make HTTP request with method
   
   Usage: (http-request! :post \"https://api.example.com/data\" {:body {...}})"
  [method url opts]
  (api/http-request (assoc opts :method method :url url)))

;; ============================================================================
;; OpenAPI (Direct)
;; ============================================================================

(defn openapi-bootstrap!
  "Bootstrap OpenAPI client from spec URL
   
   Usage: (openapi-bootstrap! :petstore \"https://petstore.swagger.io/v2/swagger.json\")"
  [name spec-url]
  (openapi/bootstrap! name spec-url))

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
;; Learning System (NEW - Wisdom Flywheel)
;; ============================================================================

(def learning-save-insight!
  "Save a learning insight

   Usage: (learning-save-insight! :user-123 {:title \"...\" :insights [...]})"
  (lazy-fn 'ouroboros.interface.learning 'save-insight!))

(def learning-get-history
  "Get learning history for a user

   Usage: (learning-get-history :user-123)"
  (lazy-fn 'ouroboros.interface.learning 'get-history))

(def learning-recall-pattern
  "Recall learnings by pattern

   Usage: (learning-recall-pattern :user-123 \"sequence-type\")"
  (lazy-fn 'ouroboros.interface.learning 'recall-pattern))

(def learning-find-related
  "Find related learnings for context

   Usage: (learning-find-related :user-123 \"python error\")"
  (lazy-fn 'ouroboros.interface.learning 'find-related-learnings))

(def learning-create-from-error
  "Create learning from error/fix pattern

   Usage: (learning-create-from-error :user-123 \"TypeError\" \"Fix\" \"context\")"
  (lazy-fn 'ouroboros.interface.learning 'create-error-learning))

(def learning-apply!
  "Increment application count for a learning

   Usage: (learning-apply! \"user-123/sequence-types-1234567890\")"
  (lazy-fn 'ouroboros.interface.learning 'apply-learning!))

(def learning-user-stats
  "Get learning statistics for user

   Usage: (learning-user-stats :user-123)"
  (lazy-fn 'ouroboros.interface.learning 'user-stats))

;; ============================================================================
;; Educational Approval (NEW - Teaching Moments)
;; ============================================================================

(def educational-enhance-approval
  "Enhance approval message with educational content

   Usage: (educational-enhance-approval \"file/write\" {:path \"config.json\"})"
  (lazy-fn 'ouroboros.interface.educational-approval 'enhance-approval))

(def educational-calculate-risk
  "Calculate risk level for tool

   Usage: (educational-calculate-risk \"shell/exec\" {:command \"rm -rf /tmp\"})"
  (lazy-fn 'ouroboros.interface.educational-approval 'calculate-risk))

(def educational-get-tool-knowledge
  "Get knowledge about a tool

   Usage: (educational-get-tool-knowledge \"file/write\")"
  (lazy-fn 'ouroboros.interface.educational-approval 'get-tool-knowledge))

(def educational-wrap-forward-approval
  "Wrap forward approval function with educational enhancement

   Usage: (def enhanced (educational-wrap-forward-approval original-forward-fn))"
  (lazy-fn 'ouroboros.interface.educational-approval 'wrap-forward-approval))

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
