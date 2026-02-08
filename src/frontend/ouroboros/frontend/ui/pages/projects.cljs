(ns ouroboros.frontend.ui.pages.projects
  "Projects management page - Web UX Platform"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
;; Forward Declarations
;; ============================================================================

(declare ProjectCard ProjectsPage)

;; ============================================================================
;; Mutations
;; ============================================================================

(m/defmutation create-project [{:keys [name description]}]
  (action [{:keys [state]}]
    (swap! state assoc-in [:component/id :project-form :ui/creating?] true))
  (remote [env]
    (-> env
        (m/returning ProjectCard)
        (m/with-target [:user/projects])))
  (ok-action [{:keys [state app]}]
    (swap! state assoc-in [:component/id :project-form :ui/creating?] false)
    (swap! state assoc-in [:component/id :project-form :ui/new-project-name] "")
    (swap! state assoc-in [:component/id :project-form :ui/new-project-description] "")
    (swap! state assoc-in [:component/id :project-form :ui/error] nil)
    (df/load! app [:page/id :projects] ProjectsPage))
  (error-action [{:keys [state]}]
    (swap! state assoc-in [:component/id :project-form :ui/creating?] false)
    (swap! state assoc-in [:component/id :project-form :ui/error] "Failed to create project")))

(m/defmutation delete-project [{:keys [project-id]}]
  (action [{:keys [state]}]
    (swap! state update-in [:user/projects] 
           (fn [projects] (vec (remove #(= (:project/id %) project-id) projects)))))
  (remote [env] env))

;; ============================================================================
;; Components
;; ============================================================================

(defsc ProjectCard
  "Individual project card"
  [this {:project/keys [id description status created-at] :as props}]
  {:query [:project/id :project/name :project/description :project/status :project/created-at]
   :ident :project/id}
  (let [project-name (:project/name props)]
    (ui/card {:title project-name
              :className (case status
                           :draft "project-draft"
                           :active "project-active"
                           :completed "project-completed"
                           "")
              :actions (dom/div :.card-actions
                         (ui/button
                           {:on-click #(dr/change-route! this ["project" (clojure.string/replace (str id) "/" "~")])
                            :variant :primary}
                           "Open")
                         (ui/button
                           {:on-click #(comp/transact! this [(delete-project {:project-id id})])
                            :variant :danger}
                           "Delete"))}
      (dom/div :.project-description (or description "No description"))
      (dom/div :.project-meta
        (dom/span :.project-status (clojure.core/name (or status :draft)))
        (dom/span :.project-date created-at)))))

(def ui-project-card (comp/factory ProjectCard {:keyfn :project/id}))

(defsc ProjectForm
  "Form for creating new projects"
  [this {:ui/keys [new-project-name new-project-description creating? error initialized?]}]
  {:query [:ui/new-project-name :ui/new-project-description :ui/creating? :ui/error :ui/initialized?]
   :ident (fn [] [:component/id :project-form])
   :initial-state (fn [_] {:ui/new-project-name ""
                           :ui/new-project-description ""
                           :ui/creating? false
                           :ui/error nil
                           :ui/initialized? true})
   :componentDidMount (fn [this] 
                        (when-not (comp/get-state this :mounted?)
                          (comp/set-state! this {:mounted? true})))}
  ;; Only render form when initial state is confirmed
  (if-not initialized?
    (dom/div :.project-form-loading "Loading form...")
    (let [name-value (if (string? new-project-name) new-project-name "")
          desc-value (if (string? new-project-description) new-project-description "")]
      (dom/div :.project-form
        (dom/h3 "Create New Project")
        (when error
          (dom/div :.error-message error))
        (dom/div :.form-group
          (dom/label "Project Name")
          (dom/input {:type "text"
                      :value name-value
                      :onChange #(m/set-string! this :ui/new-project-name :event %)
                      :placeholder "Enter project name"}))
        (dom/div :.form-group
          (dom/label "Description")
          (dom/textarea {:value desc-value
                         :onChange #(m/set-string! this :ui/new-project-description :event %)
                         :placeholder "Brief description of your project"
                         :rows 3}))
        (ui/button
          {:on-click #(comp/transact! this [(create-project {:name name-value
                                                             :description desc-value})])
           :disabled (or creating? (empty? (str/trim name-value)))
           :variant :primary}
          (if creating? "Creating..." "Create Project"))))))

(def ui-project-form (comp/factory ProjectForm))

;; ============================================================================
;; Stats Component
;; ============================================================================

(defsc WebUXStats
  "Web UX Platform statistics - compact status line"
  [this {:keys [webux/project-count webux/active-sessions-count
                webux/completed-sessions-count webux/learning-count]}]
  {:query [:webux/project-count :webux/active-sessions-count
           :webux/completed-sessions-count :webux/learning-count]
   :ident (fn [] [:component/id :webux-stats])
   :initial-state (fn [_] {})}
  (dom/div :.status-line
    (dom/span :.status-item
      (dom/span :.status-value (str (or project-count 0)))
      (dom/span :.status-label " projects"))
    (dom/span :.status-sep "|")
    (dom/span :.status-item
      (dom/span :.status-value (str (or active-sessions-count 0)))
      (dom/span :.status-label " active"))
    (dom/span :.status-sep "|")
    (dom/span :.status-item
      (dom/span :.status-value (str (or completed-sessions-count 0)))
      (dom/span :.status-label " completed"))
    (dom/span :.status-sep "|")
    (dom/span :.status-item
      (dom/span :.status-value (str (or learning-count 0)))
      (dom/span :.status-label " learnings"))))

(def ui-webux-stats (comp/factory WebUXStats))

;; ============================================================================
;; Main Page
;; ============================================================================

(defsc ProjectsPage
  "Main projects listing page"
  [this {:keys [user/projects ui/project-form ui/webux-stats] :as props}]
  {:query         [{:user/projects (comp/get-query ProjectCard)}
                   {:ui/project-form (comp/get-query ProjectForm)}
                   {:ui/webux-stats (comp/get-query WebUXStats)}
                   [df/marker-table :projects]]
   :ident         (fn [] [:page/id :projects])
   :route-segment ["projects"]
   :initial-state (fn [_] {:ui/project-form (comp/get-initial-state ProjectForm {})
                           :ui/webux-stats (comp/get-initial-state WebUXStats {})})
   :pre-merge     (fn [{:keys [current-normalized data-tree]}]
                    ;; Preserve form state during loads
                    (merge
                      {:ui/project-form (or (:ui/project-form current-normalized)
                                           (comp/get-initial-state ProjectForm {}))
                       :ui/webux-stats (or (:ui/webux-stats current-normalized)
                                          (comp/get-initial-state WebUXStats {}))}
                      data-tree))
   :will-enter    (fn [app route-params]
                    (dr/route-deferred [:page/id :projects]
                      (fn []
                        (df/load! app [:page/id :projects] ProjectsPage
                          {:marker :projects
                           :post-mutation `dr/target-ready
                           :post-mutation-params {:target [:page/id :projects]}}))))}
  
  (let [loading? (df/loading? (get props [df/marker-table :projects]))]
    (dom/div :.projects-page
      (dom/h1 "Projects")
      
      ;; Stats (always show, use defaults if no data)
      (ui-webux-stats (or webux-stats {}))
      
      ;; Create Project Form - only render when form state is initialized
      (when (and project-form (contains? project-form :ui/new-project-name))
        (dom/div :.form-section
          (ui-project-form project-form)))
      
      ;; Projects Grid
      (dom/h2 "Your Projects")
      (if loading?
        (dom/div :.loading "Loading projects...")
        (if (seq projects)
          (apply dom/div {:className "projects-grid"}
            (for [p projects :when (:project/id p)]
              (ui-project-card p)))
          (ui/empty-state {:icon "📁"
                           :message "No projects yet. Create your first project above!"}))))))
