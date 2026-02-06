(ns ouroboros.query
  "Query + Graph - EQL interface over the Engine

   Resolvers expose the statechart state as a queryable graph.
   This is psi's window into the system.
   
   Uses resolver-registry to avoid circular dependencies.
   Resolvers register themselves; this namespace just aggregates them."
  (:require
   [com.wsscode.pathom3.interface.eql :as p.eql]
   [com.wsscode.pathom3.connect.indexes :as pci]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.resolver-registry :as registry]
   [ouroboros.engine :as engine]
   ;; For resolver-based tool registration
   [ouroboros.history]
   [ouroboros.memory] [ouroboros.webux]
   ;; Additional resolvers for page queries
   [ouroboros.telemetry]
   [ouroboros.auth]
   [ouroboros.chat])
  (:import [java.time Instant]))

;; ============================================================================
;; System Resolvers (defined here - no external deps)
;; ============================================================================

(pco/defresolver system-state [_]
  {::pco/output [:system/current-state]}
  {:system/current-state (engine/current-state)})

(pco/defresolver system-status-resolver [_]
  {::pco/output [:system/status]}
  (let [status (engine/system-status)]
    {:system/status status}))

(pco/defresolver system-healthy [_]
  {::pco/output [:system/healthy?]}
  {:system/healthy? (engine/healthy?)})

(pco/defresolver system-meta [_]
  {::pco/output [:system/meta]}
  {:system/meta {:version "0.1.0"
                 :timestamp (str (Instant/now))
                 :engine "statecharts"}})

;; ============================================================================
;; Page Resolvers - Support for Fulcro page queries
;; ============================================================================

(pco/defresolver page-by-id
  "Resolver for Fulcro page idents like [:page/id :dashboard]
   
   Delegates to other resolvers for actual data."
  [{:keys [page/id] :as env}]
  {::pco/input [:page/id]
   ::pco/output [:system/healthy? :system/current-state :system/meta
                 :telemetry/total-events :telemetry/tool-invocations :telemetry/errors
                 :telemetry/query-executions :telemetry/error-rate
                 :auth/user-count :auth/admin-count
                 :chat/session-count
                 ;; Fulcro client-side fields (return nil, handled on frontend)
                 :ui.fulcro.client.data-fetch.load-markers/by-id
                 :page/error]}
  ;; Return a map with the page id - Pathom will resolve other fields
  ;; using the existing global resolvers
  {:page/id id
   ;; Pre-fetch chat session count using resolve to avoid circular deps
   :chat/session-count (try
                         (when-let [get-count-var (resolve 'ouroboros.chat/get-session-count)]
                           (@get-count-var))
                         (catch Exception e
                           (println "Warning: Could not get chat session count:" (.getMessage e))
                           0))
   ;; Client-side fields return nil
   :ui.fulcro.client.data-fetch.load-markers/by-id nil
   :page/error nil})

;; Register core resolvers
(registry/register-resolvers!
 [system-state system-status-resolver system-healthy system-meta page-by-id])

;; ============================================================================
;; Environment - The queryable interface
;; ============================================================================

(defn create-env
  "Create a Pathom environment with all registered resolvers and mutations
   
   Resolvers register themselves via resolver-registry. This function
   just collects them at init time."
  []
  (-> (pci/register (registry/all-resolvers))
      (pci/register (registry/all-mutations))))

(defonce query-env (atom nil))

(defn init!
  "Initialize the query environment

   Must be called AFTER all namespaces with resolvers have been loaded.
   Each namespace should call (registry/register-resolvers!) on load."
  []
  (reset! query-env (create-env))
  ;; Register tools after query env is ready
  ;; Use resolver-based tool registration (replaces tool_defs.clj)
  (when-let [register-resolver-tools (resolve 'ouroboros.tool-registry/register-all-resolver-tools!)]
    ;; Map resolvers to tools first
    (when-let [register-mapping (resolve 'ouroboros.tool-registry/register-resolver-tool!)]
      ;; Git tools
      (register-mapping #'ouroboros.history/git-commits :git/commits
                        {:description "Get recent git commits from repository history"
                         :unique? true :category :git :safe? true})
      (register-mapping #'ouroboros.history/git-status :git/status
                        {:description "Get git repository status"
                         :unique? true :category :git :safe? true})

      ;; Memory tools
      (register-mapping #'ouroboros.memory/memory-get :memory/get
                        {:description "Get value from persistent memory"
                         :unique? true :category :memory :safe? true})
      (register-mapping #'ouroboros.memory/memory-save! :memory/set
                        {:description "Save value to persistent memory"
                         :unique? true :category :memory :safe? true})

      ;; System tools (defined in this namespace)
      (register-mapping #'system-status-resolver :system/status
                        {:description "Get current system status"
                         :unique? true :category :system :safe? true}))

    ;; Register all mapped tools
    (register-resolver-tools))

  ;; Also register traditional tools from tool_defs for backward compatibility
  (when-let [register-tools (resolve 'ouroboros.tool-defs/register-all-tools!)]
    (register-tools))

  (println "Query environment initialized"))

(defn q
  "Query the system with EQL

   Usage: (q [:system/current-state])
          (q [:system/status])
          (q [:system/healthy? :system/meta])"
  [query]
  (when-let [env @query-env]
    (p.eql/process env query)))

(defn m
  "Execute a mutation on the system

   Usage: (m 'memory/save! {:memory/key :foo :memory/value \"bar\"})"
  [mutation params]
  (when-let [env @query-env]
    (p.eql/process env [(list mutation params)])))

;; ============================================================================
;; Convenience Queries
;; ============================================================================

(defn status
  "Quick status check"
  []
  (q [:system/status :system/healthy?]))

(defn full-report
  "Complete system report"
  []
  (q [:system/current-state
      :system/status
      :system/healthy?
      :system/meta]))

(comment
  ;; Initialize and query
  (init!)

  ;; Simple queries
  (q [:system/current-state])
  (q [:system/healthy?])

  ;; Full report
  (full-report)

  ;; Status
  (status))
