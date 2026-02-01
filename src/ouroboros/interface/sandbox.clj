(ns ouroboros.interface.sandbox
  "Sandbox interface — P0 Safety features for tool execution
   
   Provides unified access to:
   - Tool sandboxing (timeouts, memory limits)
   - Tool allowlists (per-session permissions)
   - Sandboxed code execution (Docker containers)"
  (:require
   [ouroboros.tool-sandbox :as sandbox]
   [ouroboros.tool-allowlist :as allowlist]
   [ouroboros.sandbox.executor :as executor]
   [ouroboros.tool-registry :as registry]))

;; ============================================================================
;; Tool Sandbox
;; ============================================================================

(defn sandbox-stats
  "Get tool sandbox execution statistics
   
   Usage: (sandbox-stats)"
  []
  (sandbox/get-stats))

(defn sandbox-health
  "Check sandbox health and error rates
   
   Usage: (sandbox-health)"
  []
  (sandbox/health-check))

(defn sandbox-reset!
  "Reset sandbox statistics
   
   Usage: (sandbox-reset!)"
  []
  (sandbox/reset-stats!))

;; ============================================================================
;; Tool Allowlist
;; ============================================================================

(defn allowlist-create!
  "Create allowlist for subject with permission level
   
   Levels: :none :read-only :chat-safe :standard :admin
   
   Usage:
     (allowlist-create! :session-123 :chat-safe)
     (allowlist-create! :admin-user :admin)"
  [subject level]
  (allowlist/create! subject level))

(defn allowlist-custom!
  "Create custom allowlist with specific tools
   
   Usage:
     (allowlist-custom! :custom-session #{:file/read :git/status})"
  [subject tools]
  (allowlist/create-custom! subject tools))

(defn allowlist-destroy!
  "Remove allowlist for subject
   
   Usage: (allowlist-destroy! :session-123)"
  [subject]
  (allowlist/destroy! subject))

(defn allowlist-permitted?
  "Check if subject can use tool
   
   Usage: (allowlist-permitted? :session-123 :file/read)"
  [subject tool]
  (allowlist/permitted? subject tool))

(defn allowlist-tools
  "Get list of tools permitted for subject
   
   Usage: (allowlist-tools :session-123)"
  [subject]
  (allowlist/permitted-tools subject))

(defn allowlist-stats
  "Get allowlist statistics
   
   Usage: (allowlist-stats)"
  []
  (allowlist/stats))

(defn allowlist-audit
  "Get permission check audit log
   
   Usage:
     (allowlist-audit)
     (allowlist-audit :subject :session-123)"
  [& {:as filters}]
  (apply allowlist/audit-log (mapcat identity filters)))

(defn allowlist-reset-audit!
  "Clear audit log
   
   Usage: (allowlist-reset-audit!)"
  []
  (allowlist/reset-audit-log!))

;; ============================================================================
;; Session Management
;; ============================================================================

(defn session-create!
  "Create safe session for chat platform
   
   Usage:
     (session-create! :telegram \"123456\" \"user-789\")
     (session-create! :telegram \"123456\" \"user-789\" :level :standard)"
  ([platform platform-id user-id]
   (session-create! platform platform-id user-id :chat-safe))
  ([platform platform-id user-id level]
   (registry/setup-safe-session! platform platform-id user-id :level level)))

(defn session-key
  "Generate session key for chat context
   
   Usage: (session-key :telegram \"123456\" \"user-789\")"
  [platform platform-id user-id]
  (allowlist/get-chat-session-key platform platform-id user-id))

;; ============================================================================
;; Safe Tool Execution
;; ============================================================================

(defn tool-safe
  "Execute tool with full safety (allowlist + sandbox)
   
   Usage:
     (tool-safe :file/read {:path \"README.md\"} :session-123)"
  ([tool-name params subject]
   (tool-safe tool-name params subject {}))
  ([tool-name params subject opts]
   (registry/call-tool-safe tool-name params subject opts)))

(defn tool-permitted-list
  "Get tools permitted for subject with full metadata
   
   Usage: (tool-permitted-list :session-123)"
  [subject]
  (let [permitted (allowlist/permitted-tools subject)
        all-tools (registry/list-tools)]
    (filter #(permitted (:tool/name %)) all-tools)))

;; ============================================================================
;; Sandboxed Code Execution
;; ============================================================================

(defn sandbox-exec-shell
  "Execute shell command in sandboxed environment
   
   Profiles: :restricted :standard :unrestricted
   
   Usage:
     (sandbox-exec-shell \"ls -la\" {:profile :restricted :timeout-ms 5000})"
  [command opts]
  (executor/exec-shell command opts))

(defn sandbox-exec-python
  "Execute Python code in sandboxed environment
   
   Usage:
     (sandbox-exec-python \"print('Hello')\" {:profile :restricted})"
  [code opts]
  (executor/exec-python code opts))

(defn sandbox-exec-node
  "Execute Node.js code in sandboxed environment
   
   Usage:
     (sandbox-exec-node \"console.log('Hello')\" {:profile :restricted})"
  [code opts]
  (executor/exec-node code opts))

(defn sandbox-docker?
  "Check if Docker is available for sandboxing
   
   Usage: (sandbox-docker?)"
  []
  (executor/docker-available?))

(defn sandbox-validate-code
  "Check if code contains dangerous patterns
   
   Usage: (sandbox-validate-code \"rm -rf /\")"
  [code]
  (executor/dangerous-code? code))

(defn sandbox-exec-stats
  "Get sandbox executor statistics
   
   Usage: (sandbox-exec-stats)"
  []
  (executor/stats))

;; ============================================================================
;; Combined Safety Stats
;; ============================================================================

(defn safety-report
  "Get comprehensive safety report
   
   Usage: (safety-report)"
  []
  {:sandbox-execution (sandbox/get-stats)
   :sandbox-health (sandbox/health-check)
   :allowlist (allowlist/stats)
   :executor (executor/stats)
   :docker-available? (executor/docker-available?)})

(comment
  ;; Setup safe session
  (session-create! :telegram "123" "user-456")
  
  ;; Check permissions
  (allowlist-permitted? :telegram-123-user-456 :file/read)
  (tool-permitted-list :telegram-123-user-456)
  
  ;; Execute safely
  (tool-safe :file/read {:path "README.md"} :telegram-123-user-456)
  
  ;; Sandboxed code
  (sandbox-exec-shell "echo 'Hello'" {:profile :restricted})
  (sandbox-exec-python "print(sum(range(10)))" {:profile :restricted})
  
  ;; Safety report
  (safety-report))