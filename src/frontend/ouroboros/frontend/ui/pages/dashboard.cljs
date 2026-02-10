(ns ouroboros.frontend.ui.pages.dashboard
  "Dashboard overview page - shows project info, flywheel progress, and system health"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.app :refer [app]]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Error Handling Mutation
;; ============================================================================

(m/defmutation handle-load-error [{:keys [page-id error-message]}]
  (action [{:keys [state]}]
          (swap! state assoc-in [:page/error page-id] error-message)))

(m/defmutation clear-page-error [{:keys [page-id]}]
  (action [{:keys [state]}]
          (swap! state update :page/error dissoc page-id)))

;; ============================================================================
;; Error UI Component
;; ============================================================================

(defn error-state [{:keys [message] :as props}]
  (let [retry-fn (:on-retry props)]
    (dom/div :.error-state
             (dom/div :.error-state-icon "!!!")
             (dom/div :.error-state-message message)
             (when retry-fn
               (ui/button
                {:on-click retry-fn
                 :variant :primary}
                "Try Again")))))

;; ============================================================================
;; Loading Skeleton Components
;; ============================================================================

(defn dashboard-loading []
  (dom/div {:key "dashboard-loading"}
   (dom/h1 {:key "dashboard-title"} "Dashboard")
   (dom/div {:key "dashboard-skeleton" :className "dash-loading-grid"}
            (dom/div :.skeleton-card)
            (dom/div :.skeleton-card)
            (dom/div :.skeleton-card))))

;; ============================================================================
;; Project Overview Card (moved from project-detail page)
;; ============================================================================

(defn- flywheel-step-indicator
  "Compact flywheel step for the dashboard progress bar"
  [{:keys [step idx current-idx on-navigate encoded-id]}]
  (let [{:keys [key icon label route]} step
        is-current? (= idx current-idx)
        is-past? (< idx current-idx)
        cls (str "dash-fw-step"
                 (when is-current? " dash-fw-current")
                 (when is-past? " dash-fw-done"))]
    (dom/div {:key (name key)}
             (when (> idx 0)
               (dom/div {:className (str "dash-fw-connector"
                                         (when (or is-past? is-current?) " dash-fw-connector-done"))}))
             (dom/button {:className cls
                          :onClick #(dr/change-route! app ["project" encoded-id route])}
                         (dom/span :.dash-fw-icon icon)
                         (dom/span :.dash-fw-label label)))))

(defn project-overview-card
  "Project info card for the dashboard - shows name, status, description, flywheel progress"
  [{:keys [project-name project-status project-description project-id]}]
  (let [ws-state (when-let [sa @ws/app-state-atom] @sa)
        progress (when project-id (get-in ws-state [:flywheel/progress project-id]))
        encoded-id (when project-id (str/replace (str project-id) "/" "~"))
        current-step (or (when progress
                           (let [step (:current-step progress)]
                             (case step
                               :empathy-map :empathy
                               :value-proposition :valueprop
                               :mvp-planning :mvp
                               :lean-canvas :canvas
                               :empathy)))
                         :empathy)
        step-order {:empathy 0 :valueprop 1 :mvp 2 :canvas 3}
        current-idx (get step-order current-step 0)
        ;; Kanban summary
        board (when project-id (get-in ws-state [:kanban/board project-id]))
        summary (:summary board)]
    ;; Request data if not loaded
    (when (and project-id (not progress))
      (ws/request-flywheel-progress! project-id))
    (when (and project-id (not board))
      (ws/request-kanban-board! project-id))
    (dom/div :.dash-project-card
             ;; Project header
             (dom/div :.dash-project-header
                      (dom/div :.dash-project-info
                               (dom/h2 :.dash-project-name (or project-name "Project"))
                               (dom/span {:className (str "dash-project-status dash-status-"
                                                          (name (or project-status :draft)))}
                                         (name (or project-status :draft))))
                      (when encoded-id
                        (dom/button {:className "dash-project-open-btn"
                                     :onClick #(dr/change-route! app ["project" encoded-id])}
                                    "Open Builders")))
             ;; Description
             (when (seq project-description)
               (dom/p :.dash-project-desc project-description))
             ;; Kanban summary stats
             (when summary
               (let [total (:total summary 0)
                     done (:done summary 0)
                     in-prog (:in-progress summary 0)
                     pct (if (pos? total) (int (* 100 (/ done total))) 0)]
                 (dom/div :.dash-progress-section
                          (dom/div :.dash-progress-stats
                                   (dom/span :.dash-progress-pct (str pct "% complete"))
                                   (dom/span :.dash-progress-detail
                                             (str done " done, " in-prog " active, "
                                                  (- total done in-prog) " remaining")))
                          (dom/div :.dash-progress-bar
                                   (dom/div {:className "dash-progress-bar-fill"
                                             :style {:width (str pct "%")}})))))
             ;; Flywheel nav
             (dom/div :.dash-flywheel-nav
                      (for [[idx step] (map-indexed vector ui/flywheel-steps)]
                        (flywheel-step-indicator
                         {:step step :idx idx :current-idx current-idx
                          :on-navigate #() :encoded-id encoded-id}))))))

;; ============================================================================
;; System Cards
;; ============================================================================

(defn system-health-card
  "System health status card"
  [{:keys [healthy? current-state]}]
  (dom/div :.dash-system-card
           (dom/div :.dash-system-header
                    (dom/span :.dash-system-icon (if healthy? "OK" "ERR"))
                    (dom/span :.dash-system-title "System")
                    (dom/span {:className (str "dash-system-badge "
                                               (if healthy? "dash-badge-ok" "dash-badge-err"))}
                              (if healthy? "Healthy" "Issue")))
           (when current-state
             (dom/div :.dash-system-detail
                      (str (count (:state current-state)) " active states")))))

(defn telemetry-summary-card
  "Telemetry statistics summary"
  [{:keys [total-events tool-invocations errors]}]
  (dom/div :.dash-telemetry-card
           (dom/div :.dash-telemetry-header
                    (dom/span :.dash-telemetry-title "Telemetry"))
           (dom/div :.dash-telemetry-stats
                    (dom/div :.dash-tstat
                             (dom/span :.dash-tstat-value (str (or total-events 0)))
                             (dom/span :.dash-tstat-label "Events"))
                    (dom/div :.dash-tstat
                             (dom/span :.dash-tstat-value (str (or tool-invocations 0)))
                             (dom/span :.dash-tstat-label "Tools"))
                    (dom/div {:className (str "dash-tstat" (when (and errors (> errors 0)) " dash-tstat-warn"))}
                             (dom/span :.dash-tstat-value (str (or errors 0)))
                             (dom/span :.dash-tstat-label "Errors")))))

;; ============================================================================
;; Main Dashboard Page
;; ============================================================================

(defsc DashboardPage
  [this {:keys [system/healthy?
                system/current-state
                system/meta
                telemetry/total-events
                telemetry/tool-invocations
                telemetry/errors
                page/error]
         :as props}]
  {:query         [:system/healthy?
                   :system/current-state
                   :system/meta
                   :telemetry/total-events
                   :telemetry/tool-invocations
                   :telemetry/errors
                   [df/marker-table :dashboard]
                   :page/error]
    :ident         (fn [] [:page/id :dashboard])
    :initial-state (fn [_] {})
    :route-segment ["dashboard"]
   :will-enter    (fn [app route-params]
                    (dr/route-deferred [:page/id :dashboard]
                                       (fn []
                                         (df/load! app [:page/id :dashboard] DashboardPage
                                                   {:marker :dashboard
                                                    :post-mutation `dr/target-ready
                                                    :post-mutation-params {:target [:page/id :dashboard]}
                                                    :fallback `handle-load-error
                                                    :fallback-params {:page-id :dashboard
                                                                      :error-message "Failed to load dashboard data"}}))))}

  (let [loading? (df/loading? (get props [df/marker-table :dashboard]))
        error-msg (get-in props [:page/error :dashboard])
        ;; Read workspace project from WS state
        ws-state (when-let [sa @ws/app-state-atom] @sa)
        ws-project (get ws-state :workspace/project)
        project-id (:project/id ws-project)
        project-name (:project/name ws-project)
        project-status (:project/status ws-project)
        project-desc (:project/description ws-project)]
    (cond
      error-msg
      (error-state
       {:message error-msg
        :on-retry #(do
                     (comp/transact! this `[(clear-page-error {:page-id :dashboard})])
                     (df/load! this [:page/id :dashboard] DashboardPage
                               {:marker :dashboard
                                :fallback `handle-load-error
                                :fallback-params {:page-id :dashboard
                                                  :error-message "Failed to load dashboard data"}}))})

      loading?
      (dashboard-loading)

      :else
      (dom/div :.dash-page
               (dom/h1 :.dash-title "Dashboard")

               ;; Project overview (moved from project page)
               (when ws-project
                 (project-overview-card
                  {:project-name project-name
                   :project-status project-status
                   :project-description project-desc
                   :project-id project-id}))

               ;; System info row
               (dom/div :.dash-info-row
                        (system-health-card
                         {:healthy? healthy?
                          :current-state current-state})
                        (telemetry-summary-card
                         {:total-events total-events
                          :tool-invocations tool-invocations
                          :errors errors}))

               ;; System meta
               (when meta
                 (dom/div :.dash-meta-card
                          (dom/div :.dash-meta-header "System Info")
                          (dom/div :.code-block (pr-str meta))))))))
