(ns ouroboros.frontend.ui.pages.dashboard
  "Dashboard overview page"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
;; Error Handling Mutation
;; ============================================================================

(m/defmutation handle-load-error [{:keys [page-id error-message]}]
  (action [{:keys [state]}]
    (swap! state assoc-in [:page/error page-id] error-message))
  (remote [env] true))

(m/defmutation clear-page-error [{:keys [page-id]}]
  (action [{:keys [state]}]
    (swap! state update :page/error dissoc page-id)))

;; ============================================================================
;; Error UI Component
;; ============================================================================

(defn error-state [{:keys [message on-retry]}]
  (dom/div :.error-state
    (dom/div :.error-state-icon "⚠️")
    (dom/div :.error-state-message message)
    (when on-retry
      (ui/button
        {:on-click on-retry
         :variant :primary}
        "Try Again"))))

;; ============================================================================
;; Loading Skeleton Components
;; ============================================================================

(defn metric-skeleton []
  (dom/div :.metric-card
    (dom/div :.metric-value
      (dom/div {:className "skeleton-text"
                :style {:width "40px" :height "2.5rem"}}))
    (dom/div {:className "skeleton-text"
              :style {:width "80px" :margin "0 auto"}})))

(defn card-skeleton [{:keys [title metric-count]}]
  (ui/card {:title title}
    (dom/div :.metrics-grid
      (repeat metric-count (metric-skeleton)))))

(defn dashboard-loading []
  (dom/div
    (dom/h1 "Dashboard")
    (dom/div {:className "metrics-grid mb-3"}
      (card-skeleton {:title "System Status" :metric-count 2})
      (card-skeleton {:title "Telemetry" :metric-count 3})
      (card-skeleton {:title "Users" :metric-count 2})
      (card-skeleton {:title "Sessions" :metric-count 1}))
    (ui/card {:title "System Info"}
      (dom/div :.skeleton-text {:style {:height "60px"}}))))

;; ============================================================================
;; Sub-components
;; ============================================================================

(defn system-health-card
  "System health status card"
  [{:keys [healthy? current-state]}]
  (ui/card {:title "System Status"}
    (dom/div :.metrics-grid
      (ui/metric-card
        {:value (if healthy? "✓" "✗")
         :label "Healthy"
         :className (if healthy? "text-success" "text-error")})
      (when current-state
        (ui/metric-card
          {:value (count (:state current-state))
           :label "Active States"})))))

(defn telemetry-summary-card
  "Telemetry statistics summary"
  [{:keys [total-events tool-invocations errors]}]
  (ui/card {:title "Telemetry"}
    (dom/div :.metrics-grid
      (ui/metric-card
        {:value (or total-events 0)
         :label "Total Events"})
      (ui/metric-card
        {:value (or tool-invocations 0)
         :label "Tool Invocations"})
      (ui/metric-card
        {:value (or errors 0)
         :label "Errors"
         :className (when (> errors 0) "text-warning")}))))

(defn users-summary-card
  "User statistics summary"
  [{:keys [user-count admin-count]}]
  (ui/card {:title "Users"}
    (dom/div :.metrics-grid
      (ui/metric-card
        {:value (or user-count 0)
         :label "Total Users"})
      (ui/metric-card
        {:value (or admin-count 0)
         :label "Admins"}))))

(defn sessions-summary-card
  "Chat sessions summary"
  [{:keys [session-count]}]
  (ui/card {:title "Chat Sessions"}
    (dom/div :.metrics-grid
      (ui/metric-card
        {:value (or session-count 0)
         :label "Active Sessions"}))))

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
                auth/user-count
                auth/admin-count
                chat/session-count
                page/error]
         :as props}]
  {:query         [:system/healthy?
                   :system/current-state
                   :system/meta
                   :telemetry/total-events
                   :telemetry/tool-invocations
                   :telemetry/errors
                   :auth/user-count
                   :auth/admin-count
                   :chat/session-count
                   [df/marker-table :dashboard]
                   {:page/error (comp/get-query ui/ErrorDisplay)}]
   :ident         (fn [] [:page/id :dashboard])
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
        error-msg (get-in props [:page/error :dashboard])]
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
      (dom/div
        (dom/h1 "Dashboard")
        
        (dom/div {:className "metrics-grid mb-3"}
          (system-health-card
            {:healthy? healthy?
             :current-state current-state})
          
          (telemetry-summary-card
            {:total-events total-events
             :tool-invocations tool-invocations
             :errors errors})
          
          (users-summary-card
            {:user-count user-count
             :admin-count admin-count})
          
          (sessions-summary-card
            {:session-count session-count}))
        
        (when meta
          (ui/card {:title "System Info"}
            (dom/div :.code-block
              (pr-str meta))))))))
