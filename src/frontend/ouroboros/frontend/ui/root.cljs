(ns ouroboros.frontend.ui.root
  "Root component - application shell"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [ouroboros.frontend.app :refer [app]]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.ui.pages.dashboard :as dashboard]
   [ouroboros.frontend.ui.pages.telemetry :as telemetry]
   [ouroboros.frontend.ui.pages.users :as users]
   [ouroboros.frontend.ui.pages.sessions :as sessions]
   [ouroboros.frontend.ui.pages.projects :as projects]
   [ouroboros.frontend.ui.pages.project-detail :as project-detail]
   [ouroboros.frontend.ui.pages.empathy-builder :as empathy-builder]
   [ouroboros.frontend.ui.pages.value-prop-builder :as value-prop-builder]
   [ouroboros.frontend.ui.pages.mvp-builder :as mvp-builder]
   [ouroboros.frontend.ui.pages.lean-canvas-builder :as lean-canvas-builder]))

;; ============================================================================
;; Navigation Handler
;; ============================================================================

(defn navigate-to
  "Navigate to a route using the global app instance"
  [route]
  (dr/change-route! app [route]))

;; ============================================================================
;; Router
;; ============================================================================

(dr/defrouter MainRouter [this props]
  {:router-targets
   [dashboard/DashboardPage
    telemetry/TelemetryPage
    users/UsersPage
    sessions/SessionsPage
    projects/ProjectsPage
    project-detail/ProjectDetailPage
    empathy-builder/EmpathyBuilderPage
    value-prop-builder/ValuePropBuilderPage
    mvp-builder/MVPBuilderPage
    lean-canvas-builder/LeanCanvasBuilderPage]
   :ident (fn [] [:router/id :main-router])})

(def ui-main-router (comp/factory MainRouter {:keyfn :router-id}))

;; ============================================================================
;; Root Component
;; ============================================================================

(defsc Root
  [this {:keys [main-router]}]
  {:query         [{:main-router (comp/get-query MainRouter)}]
   :initial-state (fn [_]
                    {:main-router (comp/get-initial-state MainRouter {:router-id :main-router})})}

  (dom/div :.app-container
           (ui/navbar
            {:active-route "dashboard"
             :on-navigate navigate-to})
           (dom/main :.main-content
                     (ui-main-router main-router))))
