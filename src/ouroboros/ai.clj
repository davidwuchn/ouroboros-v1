(ns ouroboros.ai
  "AI - Tooling hooks for AI interaction

   Makes the system discoverable and usable by AI through:
   - Tool discovery: List all available capabilities
   - Structured execution: Call tools with parameters
   - Context packaging: Export system state for AI context
   - Self-description: System explains itself to AI

   Note: This namespace no longer depends on query directly.
   Tools are registered via ouroboros.tool-defs after query is loaded."
  (:require
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.tool-registry :as registry]))

;; ============================================================================
;; Tool Discovery (delegates to registry)
;; ============================================================================

(defn list-tools
  "List all available AI tools"
  []
  (registry/list-tools))

(defn get-tool
  "Get a specific tool"
  [tool-name]
  (registry/get-tool tool-name))

;; ============================================================================
;; Tool Execution (delegates to registry)
;; ============================================================================

(defn call-tool
  "Execute a tool by name with parameters

   Delegates to tool-registry/call-tool for actual execution."
  [tool-name params]
  (registry/call-tool tool-name params))

;; ============================================================================
;; Context Packaging
;; ============================================================================

(defn system-context
  "Package system state for AI context

   Uses tools to gather context information without direct query dependency."
  []
  (let [status-result (call-tool :system/status {})
        git-result (call-tool :git/status {})
        _memory-result (call-tool :memory/get {:key :__context_test__})]  ; TODO: Use when memory/keys tool available
    {:context/type :system
     :context/timestamp (str (java.time.Instant/now))
     :system/status (:result status-result)
     :git/status (:result git-result)
     :memory/keys []  ; Would need memory/keys tool
     :tools/available (count (registry/list-tools))
     :tools/names (map :tool/name (registry/list-tools))}))

(defn project-context
  "Package project state for AI context"
  []
  (let [_project-result (call-tool :file/list {:dir "."})  ; TODO: Use for file listing
        commits-result (call-tool :git/commits {:n 3})]
    {:context/type :project
     :context/timestamp (str (java.time.Instant/now))
     :project/root (System/getProperty "user.dir")
     :recent-commits (:result commits-result)}))

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
  ;; List all tools (requires tools to be registered via tool-defs)
  (list-tools)

  ;; Get system context
  (system-context)

  ;; Call a tool
  (call-tool :system/status {})
  (call-tool :git/commits {:n 3})
  (call-tool :file/read {:path "README.md" :lines 20})

  ;; Full context
  (full-context)

  ;; Via Pathom (requires query to be initialized)
  (require '[ouroboros.query :as q])
  (q/q [:ai/context])
  (q/q [{:ai/tools [:tool/name :tool/description]}]))
