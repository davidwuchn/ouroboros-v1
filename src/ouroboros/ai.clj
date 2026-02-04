(ns ouroboros.ai
  "AI - Tooling hooks for AI interaction

   DEPRECATED: This namespace will be removed in a future version.
   AI/LLM functionality is now delegated to ECA (Editor Code Assistant).

   See: https://github.com/editor-code-assistant/eca

   This namespace provided:
   - Tool discovery: List all available capabilities
   - Structured execution: Call tools with parameters
   - Context packaging: Export system state for AI context

   These functions are now available via ECA integration."
  (:require
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.tool-registry :as tool-registry]
   [ouroboros.resolver-registry :as registry]))

(defn ^:deprecated list-tools
  "DEPRECATED: Use ECA for AI tool listing.

   List all available AI tools"
  []
  (tool-registry/list-tools))

(defn ^:deprecated get-tool
  "DEPRECATED: Use ECA for AI tool access.

   Get a specific tool"
  [tool-name]
  (tool-registry/get-tool tool-name))

(defn ^:deprecated call-tool
  "DEPRECATED: Use ECA for AI tool execution.

   Execute a tool by name with parameters"
  [tool-name params]
  (tool-registry/call-tool tool-name params))

(defn ^:deprecated system-context
  "DEPRECATED: Use ECA for AI context.

   Package system state for AI context"
  []
  (let [status-result (call-tool :system/status {})
        git-result (call-tool :git/status {})]
    {:context/type :system
     :context/timestamp (str (java.time.Instant/now))
     :system/status (:result status-result)
     :git/status (:result git-result)
     :memory/keys []
     :tools/available (count (tool-registry/list-tools))
     :tools/names (map :tool/name (tool-registry/list-tools))}))

(defn ^:deprecated project-context
  "DEPRECATED: Use ECA for AI context.

   Package project state for AI context"
  []
  (let [commits-result (call-tool :git/commits {:n 3})]
    {:context/type :project
     :context/timestamp (str (java.time.Instant/now))
     :project/root (System/getProperty "user.dir")
     :recent-commits (:result commits-result)}))

(defn ^:deprecated full-context
  "DEPRECATED: Use ECA for AI context.

   Get complete context for AI"
  []
  {:system (system-context)
   :project (project-context)
   :tools (list-tools)})

;; ============================================================================
;; Pathom Resolvers (also deprecated)
;; ============================================================================

(pco/defresolver ^:deprecated ai-tools [_]
  {::pco/output [{:ai/tools [:tool/name :tool/description :tool/parameters]}]}
  {:ai/tools (list-tools)})

(pco/defresolver ^:deprecated ai-context [_]
  {::pco/output [:ai/context]}
  {:ai/context (system-context)})

(pco/defmutation ^:deprecated ai-call! [{:keys [tool params]}]
  {::pco/output [:tool :params :result :status :error]}
  (call-tool tool params))

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [ai-tools ai-context])

(def mutations
  [ai-call!])

;; Register with resolver registry on load
(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

(comment
  ;; DEPRECATED - These will be removed
  (list-tools)
  (system-context)
  (call-tool :system/status {})

  ;; Via Pathom (deprecated)
  (require '[ouroboros.query :as q])
  (q/q [:ai/context])
  (q/q [{:ai/tools [:tool/name :tool/description]}]))
