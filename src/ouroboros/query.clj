(ns ouroboros.query
  "Query + Graph - EQL interface over the Engine

   Resolvers expose the statechart state as a queryable graph.
   This is psi's window into the system.
   
   Uses resolver-registry to avoid circular dependencies.
   Resolvers register themselves; this namespace just aggregates them."
  (:require
   [clojure.string :as str]
   [com.wsscode.pathom3.interface.eql :as p.eql]
   [com.wsscode.pathom3.connect.indexes :as pci]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.resolver-registry :as registry]
   [ouroboros.engine :as engine]
   ;; For resolver-based tool registration
   [ouroboros.history]
   [ouroboros.memory] [ouroboros.webux]
   ;; Additional resolvers for page queries
   [ouroboros.telemetry])
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

(defn- get-project-by-id
  "Fetch a project by its ID from memory storage"
  [project-id]
  (when project-id
    ;; Extract user-id from project-id (format: "user-id/project-name-timestamp")
    (let [user-id (when-let [slash-idx (str/index-of project-id "/")]
                    (keyword (subs project-id 0 slash-idx)))
          key (when user-id (keyword (str "projects/" (name user-id))))
          projects (when key 
                     (try
                       (require 'ouroboros.memory)
                       ((resolve 'ouroboros.memory/get-value) key)
                       (catch Exception _ nil)))]
      (get projects project-id))))

(defn- get-project-sessions
  "Fetch sessions for a project"
  [user-id project-id]
  (when (and user-id project-id)
    (let [key (keyword (str "builder-sessions/" (name user-id)))
          sessions (try
                     (require 'ouroboros.memory)
                     ((resolve 'ouroboros.memory/get-value) key)
                     (catch Exception _ nil))]
      (->> (vals sessions)
           (filter #(= (:session/project-id %) project-id))
           (mapv #(select-keys % [:session/id :session/type :session/state :session/updated-at]))))))

(pco/defresolver page-by-id
  "Resolver for Fulcro page idents like [:page/id :dashboard]
    
   Handles Fulcro ident-based queries by using :page/id as input.
   For :project-detail pages, uses the :project-id from env (passed via params)."
  [env {:page/keys [id]}]
   {::pco/input [:page/id]
    ::pco/output [:page/id
                  :system/healthy?
                  :system/current-state
                  :system/meta
                  :telemetry/total-events
                  :telemetry/tool-invocations
                  :telemetry/errors
                  :telemetry/query-executions
                  :telemetry/error-rate
                  :telemetry/events
                  :project/id
                  :project/name
                  :project/description
                  :project/status
                  :project/sessions
                   :empathy/session
                  :empathy/notes
                  :session/ui
                  :session/data
                   :lean-canvas/session
                   :lean-canvas/notes
                   :completed-responses
                   :ui
                   :ui.fulcro.client.data-fetch.load-markers/by-id
                   :page/error]}
  ;; Handle project-detail and builder pages specially
  (cond
    ;; Project detail page
    (= id :project-detail)
    (let [project-id (:project-id env)
          project (get-project-by-id project-id)
          ;; Extract user-id from project-id for sessions
          user-id (when-let [slash-idx (and project-id (str/index-of project-id "/"))]
                    (keyword (subs project-id 0 slash-idx)))
          sessions (when project-id (get-project-sessions user-id project-id))]
      {:page/id id
       :project/id (or (:project/id project) project-id)
       :project/name (or (:project/name project) "Unknown Project")
       :project/description (or (:project/description project) "")
       :project/status (or (:project/status project) :draft)
       :project/sessions (or sessions [])
       :ui.fulcro.client.data-fetch.load-markers/by-id nil
       :page/error (when-not project "Project not found")})
    
    ;; Builder pages (empathy, value-prop, mvp, lean-canvas)
    (#{:empathy-builder :value-prop-builder :mvp-builder :lean-canvas-builder} id)
    (let [project-id (:project-id env)
          project (get-project-by-id project-id)
          ;; Look up persisted builder session data from memory
          user-id (when-let [slash-idx (and project-id (str/index-of project-id "/"))]
                    (keyword (subs project-id 0 slash-idx)))
          builder-type-kw (case id
                            :empathy-builder :empathy-map
                            :value-prop-builder :value-proposition
                            :mvp-builder :mvp-planning
                            :lean-canvas-builder :lean-canvas
                            nil)
          session-prefix (case id
                           :empathy-builder "empathy-"
                           :value-prop-builder "valueprop-"
                           :mvp-builder "mvp-"
                           :lean-canvas-builder "canvas-"
                           "")
          session-id (when project-id (str session-prefix project-id))
          all-sessions (when user-id
                         (let [key (keyword (str "builder-sessions/" (name user-id)))]
                           (try
                             (require 'ouroboros.memory)
                             ((resolve 'ouroboros.memory/get-value) key)
                             (catch Exception _ nil))))
           session (when session-id (get all-sessions session-id))
           session-data (:session/data session)
           ;; Defensive normalization: data stored before the websocket fix
           ;; may have string values for :item/section and :section-key.
           ;; Ensure they are keywords for frontend compatibility.
           normalized-data (cond
                             (#{:empathy-builder :lean-canvas-builder} id)
                             (when session-data
                               (reduce-kv (fn [m k note]
                                            (assoc m k
                                                   (cond-> note
                                                     (string? (:item/section note))
                                                     (update :item/section keyword))))
                                          {} session-data))
                             
                             (#{:value-prop-builder :mvp-builder} id)
                             (when session-data
                               (mapv (fn [resp]
                                       (cond-> resp
                                         (string? (:section-key resp))
                                         (update :section-key keyword)))
                                     session-data))
                             
                             :else session-data)
           ;; Extract data in the right format for each builder type
           empathy-notes (if (= id :empathy-builder)
                           (or normalized-data {})
                           {})
           lean-canvas-notes (if (= id :lean-canvas-builder)
                               (or normalized-data {})
                               {})
           completed-responses (if (#{:value-prop-builder :mvp-builder} id)
                                 (or normalized-data [])
                                 [])]
      {:page/id id
       :project/id (or (:project/id project) project-id)
       :project/name (or (:project/name project) "Unknown Project")
       ;; Empathy builder attributes
       :empathy/session (when (= id :empathy-builder)
                          {:session/id (or session-id "")})
       :empathy/notes empathy-notes
       ;; MVP/Value Prop builder attributes
       :session/ui {:ui/current-section 0
                    :ui/total-sections 6
                    :ui/prompt nil
                    :ui/hint nil
                    :ui/completed-sections []
                    :ui/complete? false}
        :session/data (or normalized-data {})
       ;; Lean Canvas builder attributes
       :lean-canvas/session (when (= id :lean-canvas-builder)
                              {:session/id (or session-id "")})
       :lean-canvas/notes lean-canvas-notes
       ;; UI: return empty map - client pre-merge fills in defaults
        :ui {}
        :completed-responses completed-responses
        :ui.fulcro.client.data-fetch.load-markers/by-id nil
       :page/error (when-not project "Project not found")})
    
    ;; Other pages - use the existing logic
    :else
    (let [ ;; Get telemetry data if needed
          telemetry-data (when (or (= id :telemetry)
                                   (= id :dashboard))
                           (try
                             (require 'ouroboros.telemetry)
                             ((resolve 'ouroboros.telemetry/get-events))
                             (catch Exception e nil)))]
       {:page/id id
        :system/healthy? (try ((resolve 'ouroboros.engine/healthy?))
                             (catch Exception e false))
        :system/current-state (try ((resolve 'ouroboros.engine/current-state))
                                  (catch Exception e nil))
        :system/meta {:version "0.1.0"}
       ;; Telemetry data
       :telemetry/total-events (count telemetry-data)
       :telemetry/tool-invocations (count (filter #(= :tool/invoke (:event %)) telemetry-data))
       :telemetry/query-executions (count (filter #(= :query/execute (:event %)) telemetry-data))
       :telemetry/errors (count (filter #(false? (:success? %)) telemetry-data))
       :telemetry/error-rate (if (seq telemetry-data)
                              (/ (count (filter #(false? (:success? %)) telemetry-data))
                                 (count telemetry-data) 0.01)
                              0)
        :telemetry/events (mapv (fn [evt]
                                 {:event/id (or (:event/id evt) (str (java.util.UUID/randomUUID)))
                                  :event/timestamp (or (:event/timestamp evt) (str (java.time.Instant/now)))
                                  :event (:event evt)
                                  :tool (:tool evt)
                                  :duration-ms (:duration-ms evt)
                                  :success? (:success? evt)})
                               telemetry-data)
       ;; Project fields (empty for non-project pages)
       :project/id nil
       :project/name nil
       :project/description nil
       :project/status nil
       :project/sessions []
       ;; Client-side fields
       :ui.fulcro.client.data-fetch.load-markers/by-id nil
       :page/error nil})))

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
          (q [:system/healthy? :system/meta])
          (q [{[:page/id :project-detail] [...]}] {:project-id \"...\"})"
  ([query] (q query nil))
  ([query params]
   (when-let [env @query-env]
     (let [;; Merge params into environment so resolvers can access them
           env-with-params (if params
                             (merge env params)
                             env)]
       (p.eql/process env-with-params query)))))

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
