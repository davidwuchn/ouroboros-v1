(ns ouroboros.webux
  "Web UX Platform - Project management and builder sessions

   Provides backend support for the Web UX Platform:
   - Project CRUD operations
   - Builder session management (Empathy Map, Value Prop, MVP, Canvas)
   - Real-time collaboration state
   - Integration with Learning Memory

   Usage:
   (require '[ouroboros.webux :as webux])
   (webux/create-project! :user-123 {:name \"AI Tool\" :description \"...\"})"
  (:require
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.memory :as memory]
   [ouroboros.learning :as learning]
   [ouroboros.learning.empathy-map :as empathy]
   [ouroboros.learning.value-proposition :as vp]
   [ouroboros.learning.mvp-planning :as mvp]
   [ouroboros.learning.lean-canvas :as canvas]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.resolver-registry :as registry]))

;; ============================================================================
;; Data Model
;; ============================================================================

;; Project: {:project/id :project/name :project/description :project/owner
;;           :project/created-at :project/updated-at :project/status}
;; Builder Session: {:session/id :session/project-id :session/type :session/state
;;                   :session/data :session/created-at :session/updated-at}

(def ^:private project-statuses
  #{:draft :active :completed :archived})

(def ^:private builder-types
  #{:empathy-map :value-proposition :mvp-planning :lean-canvas})

;; ============================================================================
;; Key Helpers
;; ============================================================================

(defn- user-key [prefix user-id]
  (keyword (str prefix "/" (name user-id))))

;; ============================================================================
;; Project Operations
;; ============================================================================

(defn- generate-project-id
  [user-id project-name]
  (str (name user-id) "/project-"
       (str/replace (str/lower-case project-name) #"[^a-z0-9]+" "-")
       "-" (System/currentTimeMillis)))

(defn- projects-key
  [user-id]
  (user-key "projects" user-id))

(pco/defmutation create-project!
  "Create a new project

   Parameters:
   - :user-id - Project owner (required)
   - :name - Project name (required, non-empty)
   - :description - Optional project description"
  [{:keys [user-id description] project-name :name}]
  {::pco/output [:project/id :project/name :project/description :project/owner :project/status :project/created-at :project/updated-at]}
  ;; Validation
  (when (nil? user-id)
    (throw (ex-info "user-id is required" {:param :user-id})))
  (when (str/blank? project-name)
    (throw (ex-info "name is required and cannot be blank" {:param :name})))

  (let [project-id (generate-project-id user-id project-name)
        project {:project/id project-id
                 :project/name project-name
                 :project/description (or description "")
                 :project/owner (clojure.core/name user-id)
                 :project/status :draft
                 :project/created-at (str (java.time.Instant/now))
                 :project/updated-at (str (java.time.Instant/now))}
        key (projects-key user-id)]

    ;; Store in memory
    (memory/update! key
                    (fn [projects]
                      (let [projects (or projects {})]
                        (assoc projects project-id project))))

    ;; Save as learning insight
    (learning/save-insight! user-id
                            {:title (str "Started project: " project-name)
                             :insights [(str "Created new project: " project-name)]
                             :pattern "project-creation"
                             :category "product-development"
                             :tags #{"project" "creation"}
                             :examples [{:project-id project-id
                                         :name project-name}]})

    (telemetry/emit! {:event :webux/project-created
                      :user-id user-id
                      :project-id project-id})

    project))

(pco/defmutation update-project!
  "Update project details"
  [{:keys [user-id project-id updates]}]
  {::pco/output [:project/id :project/updated-at]}
  (let [key (projects-key user-id)]
    (memory/update! key
                    (fn [projects]
                      (if-let [project (get projects project-id)]
                        (assoc projects project-id
                               (assoc (merge project updates)
                                      :project/updated-at
                                      (str (java.time.Instant/now))))
                        projects)))

    (telemetry/emit! {:event :webux/project-updated
                      :user-id user-id
                      :project-id project-id})

    {:project/id project-id
     :project/updated-at (str (java.time.Instant/now))}))

(pco/defmutation delete-project!
  "Delete a project"
  [{:keys [user-id project-id]}]
  {::pco/output [:project/id :project/deleted?]}
  (let [key (projects-key user-id)]
    (memory/update! key
                    (fn [projects]
                      (dissoc projects project-id)))

    (telemetry/emit! {:event :webux/project-deleted
                      :user-id user-id
                      :project-id project-id})

    {:project/id project-id
     :project/deleted? true}))

(pco/defresolver page-user
  "Get current user-id from page context (for demo purposes)
    Maps page IDs to user IDs. In production, use auth/user-id from session."
  [{:keys [page/id]}]
  {::pco/input [:page/id]
   ::pco/output [:user/id]}
   ;; Default to :demo-user for all pages in this demo
   ;; In production, this would derive from authentication session
  {:user/id :demo-user})

(pco/defresolver user-projects
  "Get all projects for a user"
  [input]
  {::pco/input [:user/id]
   ::pco/output [{:user/projects [:project/id :project/name :project/description
                                  :project/status :project/created-at]}]}
  (let [user-id (or (:user/id input) (:user-id input))
        key (when user-id (projects-key user-id))
        projects (if key (vals (or (memory/get-value key) {})) [])]
    {:user/projects (vec projects)}))

(pco/defresolver project-by-id
  "Get a specific project by ID"
  [input]
  {::pco/input [:user/id :project/id]
   ::pco/output [:project/id :project/name :project/description
                 :project/status :project/owner :project/created-at]}
  (let [user-id (or (:user/id input) (:user-id input))
        project-id (or (:project/id input) (:project-id input))
        key (when user-id (projects-key user-id))
        projects (if key (or (memory/get-value key) {}) {})]
    (get projects project-id)))

;; ============================================================================
;; Builder Session Operations
;; ============================================================================

(defn- sessions-key
  [user-id]
  (user-key "builder-sessions" user-id))

(pco/defmutation start-builder-session!
  "Start a new builder session

   Parameters:
   - :user-id - Session owner
   - :project-id - Associated project
   - :builder-type - One of :empathy-map :value-proposition :mvp-planning :lean-canvas"
  [{:keys [user-id project-id builder-type]}]
  {::pco/output [:session/id :session/type :session/state :session/data]}
  (when-not (contains? builder-types builder-type)
    (throw (ex-info "Invalid builder type" {:type builder-type :valid builder-types})))

  (let [session-id (str project-id "/" (name builder-type) "-" (System/currentTimeMillis))
        session-data (case builder-type
                       :empathy-map (empathy/start-empathy-session! user-id "Persona")
                       :value-proposition (vp/start-vp-session! user-id "Value Prop")
                       :mvp-planning (mvp/start-mvp-session! user-id "MVP")
                       :lean-canvas (canvas/start-canvas-session! user-id "Project")
                       {})
        session {:session/id session-id
                 :session/project-id project-id
                 :session/type builder-type
                 :session/state :active
                 :session/data session-data
                 :session/created-at (str (java.time.Instant/now))
                 :session/updated-at (str (java.time.Instant/now))}
        key (sessions-key user-id)]

    (memory/update! key
                    (fn [sessions]
                      (let [sessions (or sessions {})]
                        (assoc sessions session-id session))))

    ;; Broadcast via WebSocket if available
    (when-let [broadcast-fn (resolve 'ouroboros.websocket/broadcast-builder-session!)]
      (broadcast-fn session-id session-data))

    (telemetry/emit! {:event :webux/session-started
                      :user-id user-id
                      :session-id session-id
                      :builder-type builder-type})

    session))

(pco/defmutation update-builder-session!
  "Update builder session data"
  [{:keys [user-id session-id data]}]
  {::pco/output [:session/id :session/updated-at]}
  (let [key (sessions-key user-id)]
    (memory/update! key
                    (fn [sessions]
                      (if-let [session (get sessions session-id)]
                        (assoc sessions session-id
                               (assoc session
                                      :session/data data
                                      :session/updated-at (str (java.time.Instant/now))))
                        sessions)))

    ;; Broadcast via WebSocket if available
    (when-let [broadcast-fn (resolve 'ouroboros.websocket/broadcast-builder-session!)]
      (broadcast-fn session-id data))

    (telemetry/emit! {:event :webux/session-updated
                      :user-id user-id
                      :session-id session-id})

    {:session/id session-id
     :session/updated-at (str (java.time.Instant/now))}))

(pco/defmutation complete-builder-session!
  "Mark builder session as complete"
  [{:keys [user-id session-id]}]
  {::pco/output [:session/id :session/state :session/completed-at]}
  (let [key (sessions-key user-id)
        completed-at (str (java.time.Instant/now))]
    (memory/update! key
                    (fn [sessions]
                      (if-let [session (get sessions session-id)]
                        (assoc sessions session-id
                               (assoc session
                                      :session/state :completed
                                      :session/completed-at completed-at
                                      :session/updated-at completed-at))
                        sessions)))

    ;; Broadcast updated session data
    (when-let [session (get (memory/get-value key) session-id)]
      (when-let [broadcast-fn (resolve 'ouroboros.websocket/broadcast-builder-session!)]
        (broadcast-fn session-id (:session/data session))))

    (telemetry/emit! {:event :webux/session-completed
                      :user-id user-id
                      :session-id session-id})

    {:session/id session-id
     :session/state :completed
     :session/completed-at completed-at}))

(pco/defresolver project-sessions
  "Get all builder sessions for a project"
  [input]
  {::pco/input [:user/id :project/id]
   ::pco/output [{:project/sessions [:session/id :session/type :session/state
                                     :session/created-at :session/updated-at]}]}
  (let [user-id (or (:user/id input) (:user-id input))
        project-id (or (:project/id input) (:project-id input))
        key (when user-id (sessions-key user-id))
        sessions (if key (vals (or (memory/get-value key) {})) [])
        project-sessions (filter #(= (:session/project-id %) project-id) sessions)]
    {:project/sessions (vec project-sessions)}))

(pco/defresolver session-by-id
  "Get a specific session by ID"
  [input]
  {::pco/input [:user/id :session/id]
   ::pco/output [:session/id :session/type :session/state :session/data
                 :session/project-id :session/created-at :session/updated-at]}
  (let [user-id (or (:user/id input) (:user-id input))
        session-id (or (:session/id input) (:session-id input))
        key (when user-id (sessions-key user-id))
        sessions (if key (or (memory/get-value key) {}) {})]
    (get sessions session-id)))

;; ============================================================================
;; Dashboard Stats
;; ============================================================================

(pco/defresolver webux-stats
  "Get Web UX platform statistics for a user"
  [input]
  {::pco/input [:user/id]
   ::pco/output [:webux/project-count :webux/active-sessions-count
                 :webux/completed-sessions-count :webux/learning-count]}
  (let [user-id (or (:user/id input) (:user-id input))
        projects-key (when user-id (projects-key user-id))
        sessions-key (when user-id (sessions-key user-id))
        projects (if projects-key (or (memory/get-value projects-key) {}) {})
        sessions (if sessions-key (or (memory/get-value sessions-key) {}) {})
        learnings (if user-id (learning/recall-by-pattern user-id "") [])]

    {:webux/project-count (count projects)
     :webux/active-sessions-count (count (filter #(= (:session/state %) :active) (vals sessions)))
     :webux/completed-sessions-count (count (filter #(= (:session/state %) :completed) (vals sessions)))
     :webux/learning-count (count learnings)}))

;; ============================================================================
;; Registration
;; ============================================================================

(def resolvers [page-user user-projects project-by-id project-sessions session-by-id webux-stats])
(def mutations [create-project! update-project! delete-project!
                start-builder-session! update-builder-session! complete-builder-session!])

(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

;; ============================================================================
;; Comment / Examples
;; ============================================================================

(comment
  ;; Create a project
  (create-project! {:user-id :test-user :name "AI Memory Tool" :description "Better context for AI"})

  ;; List projects
  (user-projects {:user-id :test-user})

  ;; Start builder session
  (start-builder-session! {:user-id :test-user :project-id "test-user/project-ai-memory-tool-123"
                           :builder-type :empathy-map})

  ;; Query via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:webux/project-count :webux/active-sessions-count])
  (q/q [{:user/projects [:project/id :project/name]}]))
