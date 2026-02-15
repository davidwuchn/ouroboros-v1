(ns ouroboros.frontend.ui.pages.projects
  "Projects page - shows the auto-detected workspace project"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.mutations :as m]
   [com.fulcrologic.fulcro.application :as app]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
;; Forward Declarations
;; ============================================================================

(declare ProjectsPage)

;; ============================================================================
;; Mutations (keep delete for cleanup)
;; ============================================================================

(m/defmutation delete-project [{:keys [project-id]}]
  (action [{:keys [state]}]
    (swap! state update-in [:user/projects] 
           (fn [projects] (vec (remove #(= (:project/id %) project-id) projects)))))
  (remote [env] env))

;; ============================================================================
;; Components
;; ============================================================================

(defsc WorkspaceProject
  "Shows the auto-detected workspace project with quick actions"
  [this {:project/keys [id name description status path] :as _props}]
  {:query [:project/id :project/name :project/description :project/status
           :project/path :project/created-at]
   :ident :project/id}
  (let [encoded-id (str/replace (str id) "/" "~")]
    (dom/div :.workspace-project
      (dom/div :.workspace-project-header
        (dom/h2 :.workspace-project-name (or name "Detecting project..."))
        (when status
          (dom/span :.workspace-project-status (clojure.core/name status))))
      (when (and description (not (str/blank? description)))
        (dom/p :.workspace-project-description description))
      (when path
        (dom/div :.workspace-project-path path))
      ;; Quick action buttons - go straight to builders
      (dom/div :.workspace-project-actions
        (ui/button
          {:on-click #(dr/change-route! this ["project" encoded-id])
           :variant :secondary}
          "Overview")
        (ui/button
          {:on-click #(dr/change-route! this ["project" encoded-id "empathy"])
           :variant :primary}
          "Start Building")))))

(def ui-workspace-project (comp/factory WorkspaceProject {:keyfn :project/id}))

;; ============================================================================
;; Stats Component
;; ============================================================================

(defsc WebUXStats
  "Web UX Platform statistics - compact status line"
  [_this {:keys [webux/_project-count webux/active-sessions-count
                 webux/completed-sessions-count webux/learning-count]}]
  {:query [:webux/project-count :webux/active-sessions-count
           :webux/completed-sessions-count :webux/learning-count]
   :ident (fn [] [:component/id :webux-stats])
   :initial-state (fn [_] {})}
  (dom/div :.status-line
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
  "Main page - shows the workspace project (auto-detected from cwd)"
  [this {:keys [user/projects ui/webux-stats] :as _props}]
  {:query         [{:user/projects (comp/get-query WorkspaceProject)}
                   {:ui/webux-stats (comp/get-query WebUXStats)}
                   [df/marker-table :projects]]
   :ident         (fn [] [:page/id :projects])
   :route-segment ["projects"]
   :initial-state (fn [_] {:ui/webux-stats (comp/get-initial-state WebUXStats {})})
   :pre-merge     (fn [{:keys [current-normalized data-tree]}]
                    (merge
                      {:ui/webux-stats (or (:ui/webux-stats current-normalized)
                                           (comp/get-initial-state WebUXStats {}))}
                      data-tree))
   :will-enter    (fn [app _route-params]
                    (dr/route-deferred [:page/id :projects]
                      (fn []
                        (df/load! app [:page/id :projects] ProjectsPage
                          {:marker :projects
                           :post-mutation `dr/target-ready
                           :post-mutation-params {:target [:page/id :projects]}}))))}
  
  (let [loading? (df/loading? (get props [df/marker-table :projects]))
        ;; Also read workspace project from WS-detected state
        ws-project (get-in @(::app/state-atom (comp/any->app this)) [:workspace/project])]
    (dom/div :.projects-page
      (dom/h1 "Your Project")
      
      ;; Stats
      (ui-webux-stats (or webux-stats {}))
      
      ;; Show the workspace project
      (if loading?
        (dom/div :.loading "Detecting project...")
        (cond
          ;; Projects loaded from Pathom
          (seq projects)
          (ui-workspace-project (first projects))
          
          ;; WS-detected project (before Pathom loads)
          ws-project
          (dom/div :.workspace-project
            (dom/div :.workspace-project-header
              (dom/h2 :.workspace-project-name (:project/name ws-project)))
            (when-let [desc (:project/description ws-project)]
              (dom/p :.workspace-project-description desc))
            (dom/div :.workspace-project-path (:project/path ws-project))
            (dom/p "Loading project details..."))

          ;; Nothing detected yet
          :else
          (ui/empty-state {:icon "..."
                           :message "Detecting workspace project..."}))))))
