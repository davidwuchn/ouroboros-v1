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
    (df/load! app [:component/id :projects-page] ProjectsPage))
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
  [this {:project/keys [id name description status created-at]}]
  {:query [:project/id :project/name :project/description :project/status :project/created-at]
   :ident :project/id}
  (ui/card {:title name
            :className (case status
                         :draft "project-draft"
                         :active "project-active"
                         :completed "project-completed"
                         "")
            :actions (dom/div :.card-actions
                       (ui/button
                         {:on-click #(dr/change-route! this ["project" {:project-id id}])
                          :variant :primary}
                         "Open")
                       (ui/button
                         {:on-click #(comp/transact! this [(delete-project {:project-id id})])
                          :variant :danger}
                         "Delete"))}
    (dom/div :.project-description (or description "No description"))
    (dom/div :.project-meta
      (dom/span :.project-status (str (name status)))
      (dom/span :.project-date created-at))))

(def ui-project-card (comp/factory ProjectCard {:keyfn :project/id}))

(defsc ProjectForm
  "Form for creating new projects"
  [this {:ui/keys [new-project-name new-project-description creating? error]}]
  {:query [:ui/new-project-name :ui/new-project-description :ui/creating? :ui/error]
   :ident (fn [] [:component/id :project-form])
   :initial-state (fn [_] {:ui/new-project-name ""
                           :ui/new-project-description ""
                           :ui/creating? false
                           :ui/error nil})}
  (dom/div :.project-form
    (dom/h3 "Create New Project")
    (when error
      (dom/div :.error-message error))
    (dom/div :.form-group
      (dom/label "Project Name")
      (dom/input {:type "text"
                  :value (or new-project-name "")
                  :onChange #(m/set-string! this :ui/new-project-name :event %)
                  :placeholder "Enter project name"}))
    (dom/div :.form-group
      (dom/label "Description")
      (dom/textarea {:value (or new-project-description "")
                     :onChange #(m/set-string! this :ui/new-project-description :event %)
                     :placeholder "Brief description of your project"
                     :rows 3}))
    (ui/button
      {:on-click #(comp/transact! this [(create-project {:name new-project-name
                                                         :description new-project-description})])
       :disabled (or creating? (empty? (str/trim (or new-project-name ""))))
       :variant :primary}
      (if creating? "Creating..." "Create Project"))))

(def ui-project-form (comp/factory ProjectForm))

;; ============================================================================
;; Stats Component
;; ============================================================================

(defsc WebUXStats
  "Web UX Platform statistics"
  [this {:keys [webux/project-count webux/active-sessions-count 
                webux/completed-sessions-count webux/learning-count]}]
  {:query [:webux/project-count :webux/active-sessions-count
           :webux/completed-sessions-count :webux/learning-count]
   :ident (fn [] [:component/id :webux-stats])}
  (dom/div :.stats-grid
    (ui/metric-card {:value (or project-count 0) :label "Projects"})
    (ui/metric-card {:value (or active-sessions-count 0) :label "Active Sessions"})
    (ui/metric-card {:value (or completed-sessions-count 0) :label "Completed"})
    (ui/metric-card {:value (or learning-count 0) :label "Learnings"})))

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
      
      ;; Stats
      (when webux-stats
        (dom/div :.stats-section
          (ui-webux-stats webux-stats)))
      
      ;; Create Project Form
      (when project-form
        (dom/div :.form-section
          (ui-project-form project-form)))
      
      ;; Projects Grid
      (dom/h2 "Your Projects")
      (if loading?
        (dom/div :.loading "Loading projects...")
        (if (seq projects)
          (dom/div :.projects-grid
            (map ui-project-card projects))
          (ui/empty-state {:icon "📁"
                           :message "No projects yet. Create your first project above!"}))))))
