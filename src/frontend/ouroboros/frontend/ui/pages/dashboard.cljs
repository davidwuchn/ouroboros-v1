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
             (dom/div :.error-state-icon "⚠️")
             (dom/div :.error-state-message message)
             (when retry-fn
               (ui/button
                {:on-click retry-fn
                 :variant :primary}
                "Try Again")))))

;; ============================================================================
;; Loading Skeleton Components
;; ============================================================================

(defn metric-skeleton [{:keys [key]}]
  (dom/div {:key key :className "metric-value"}
            (dom/div {:className "skeleton-text"
                      :style {:width "40px" :height "2.5rem"}})
            (dom/div {:className "skeleton-text"
                      :style {:width "80px" :margin "0 auto"}})))

(defn card-skeleton [{:keys [title metric-count]}]
   (ui/card {:key (str "skeleton-card-" title) :title title}
            (apply dom/div {:key (str "skeleton-grid-" title) :className "metrics-grid"}
                   (for [i (range metric-count)]
                     (metric-skeleton {:key (str "skeleton-" title "-" i)})))))

(defn dashboard-loading []
  (dom/div {:key "dashboard-loading"}
   (dom/h1 {:key "dashboard-title"} "Dashboard")
   (dom/div {:key "dashboard-metrics" :className "metrics-grid mb-3"}
             (card-skeleton {:key "loading-system" :title "System Status" :metric-count 2})
             (card-skeleton {:key "loading-telemetry" :title "Telemetry" :metric-count 3})
             (card-skeleton {:key "loading-users" :title "Users" :metric-count 2})
             (card-skeleton {:key "loading-sessions" :title "Sessions" :metric-count 1}))
   (ui/card {:key "loading-system-info" :title "System Info"}
            (dom/div :.skeleton-text {:key "loading-info" :style {:height "60px"}}))))

;; ============================================================================
;; Sub-components
;; ============================================================================

(defn system-health-card
  "System health status card"
  [{:keys [healthy? current-state]}]
  (ui/card {:key "system-health" :title "System Status"}
           (dom/div :.metrics-grid {:key "system-health-metrics"}
                     (ui/metric-card
                      {:key "healthy"
                       :value (if healthy? "✓" "✗")
                       :label "Healthy"
                       :className (if healthy? "text-success" "text-error")})
                     (when current-state
                       (ui/metric-card
                        {:key "active-states"
                         :value (count (:state current-state))
                         :label "Active States"})))))

(defn telemetry-summary-card
  "Telemetry statistics summary"
  [{:keys [total-events tool-invocations errors]}]
  (ui/card {:key "telemetry" :title "Telemetry"}
           (dom/div :.metrics-grid {:key "telemetry-metrics"}
                     (ui/metric-card
                      {:key "total-events"
                       :value (or total-events 0)
                       :label "Total Events"})
                     (ui/metric-card
                      {:key "tool-invocations"
                       :value (or tool-invocations 0)
                       :label "Tool Invocations"})
                     (ui/metric-card
                      {:key "errors"
                       :value (or errors 0)
                       :label "Errors"
                       :className (when (> errors 0) "text-warning")}))))

(defn users-summary-card
  "User statistics summary"
  [{:keys [user-count admin-count]}]
  (ui/card {:key "users" :title "Users"}
           (dom/div :.metrics-grid {:key "users-metrics"}
                     (ui/metric-card
                      {:key "user-count"
                       :value (or user-count 0)
                       :label "Total Users"})
                     (ui/metric-card
                      {:key "admin-count"
                       :value (or admin-count 0)
                       :label "Admins"}))))

(defn sessions-summary-card
  "Chat sessions summary"
  [{:keys [session-count]}]
  (ui/card {:key "sessions" :title "Chat Sessions"}
           (dom/div :.metrics-grid {:key "sessions-metrics"}
                     (ui/metric-card
                      {:key "session-count"
                       :value (or session-count 0)
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
      (dom/div {:key "dashboard-content"}
       (dom/h1 {:key "dashboard-title"} "Dashboard")

        (dom/div {:key "dashboard-metrics" :className "metrics-grid mb-3"}
                 (system-health-card
                  {:key "system-health"
                   :healthy? healthy?
                   :current-state current-state})

                 (telemetry-summary-card
                  {:key "telemetry"
                   :total-events total-events
                   :tool-invocations tool-invocations
                   :errors errors})

                 (users-summary-card
                  {:key "users"
                   :user-count user-count
                   :admin-count admin-count})

                 (sessions-summary-card
                  {:key "sessions"
                   :session-count session-count}))

        (when meta
          (ui/card {:key "system-info" :title "System Info"}
                   (dom/div :.code-block {:key "system-meta"}
                            (pr-str meta))))))))
