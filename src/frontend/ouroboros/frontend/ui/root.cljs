(ns ouroboros.frontend.ui.root
  "Root component - application shell"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.ui.pages.dashboard :as dashboard]
   [ouroboros.frontend.ui.pages.telemetry :as telemetry]
   [ouroboros.frontend.ui.pages.users :as users]
   [ouroboros.frontend.ui.pages.sessions :as sessions]))

;; ============================================================================
;; Navigation Handler
;; ============================================================================

(defn navigate-to
  "Navigate to a route"
  [route]
  (dr/change-route! comp/*app* [route]))

;; ============================================================================
;; Router
;; ============================================================================

(dr/defrouter MainRouter [this props]
  {:router-targets
   [dashboard/DashboardPage
    telemetry/TelemetryPage
    users/UsersPage
    sessions/SessionsPage]})

(def ui-main-router (comp/factory MainRouter))

;; ============================================================================
;; Root Component
;; ============================================================================

(defsc Root
  [this {:keys [main-router]}]
  {:query         [{:main-router (comp/get-query MainRouter)}]
   :ident         (fn [] [:component/id :root])
   :initial-state (fn [_] {:main-router (comp/get-initial-state MainRouter {})})}
  
  (let [active-route (some-> (dr/current-route this)
                             first
                             name)]
    (dom/div :.app-container
      (ui/navbar
        {:active-route active-route
         :on-navigate navigate-to})
      (dom/main :.main-content
        (ui-main-router main-router)))))
