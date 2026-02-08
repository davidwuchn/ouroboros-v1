(ns ouroboros.frontend.ui.pages.telemetry
  "Telemetry events page with real-time updates"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Mutations
;; ============================================================================

(m/defmutation handle-load-error [{:keys [page-id error-message]}]
  (action [{:keys [state]}]
          (swap! state assoc-in [:page/error page-id] error-message)))

(m/defmutation clear-page-error [{:keys [page-id]}]
  (action [{:keys [state]}]
          (swap! state update :page/error dissoc page-id)))

(m/defmutation add-telemetry-event [{:keys [event]}]
  (action [{:keys [state]}]
    ;; Add new event to the beginning of the list
          (swap! state update-in [:page/id :telemetry :telemetry/events]
                 (fn [events]
                   (let [new-events (vec (cons event (take 49 events)))]
                     new-events)))
    ;; Update stats
          (swap! state update-in [:page/id :telemetry :telemetry/total-events] (fnil inc 0))
          (when (= :tool/invoke (:event event))
            (swap! state update-in [:page/id :telemetry :telemetry/tool-invocations] (fnil inc 0)))
          (when (false? (:success? event))
            (swap! state update-in [:page/id :telemetry :telemetry/errors] (fnil inc 0)))))

;; ============================================================================
;; Loading Skeleton
;; ============================================================================

(defn telemetry-loading []
  (dom/div
    (dom/h1 "Telemetry")
    (apply dom/div {:className "metrics-grid mb-3"}
             (for [i (range 4)]
               (dom/div {:key (str "skeleton-metric-" i) :className "metric-card"}
                        (dom/div {:className "skeleton-text"
                                  :style {:width "60px" :height "2.5rem" :margin "0 auto"}})
                        (dom/div {:className "skeleton-text"
                                  :style {:width "100px" :margin "0.5rem auto 0"}}))))
    (ui/card {:title "Error Rate"}
             (dom/div {:className "skeleton-text" :style {:width "80px"}}))
    (ui/card {:title "Recent Events"}
             (apply dom/div {:className "skeleton-table"}
                      (for [i (range 5)]
                        (dom/div {:key (str "skeleton-row-" i)
                                  :className "skeleton-row"
                                  :style {:display "flex"
                                          :gap "1rem"
                                          :padding "0.75rem 0"
                                          :borderBottom "1px solid var(--color-border)"}}
                                 (dom/div {:className "skeleton-text" :style {:width "120px"}})
                                 (dom/div {:className "skeleton-text" :style {:width "100px"}})
                                 (dom/div {:className "skeleton-text" :style {:width "80px"}})
                                 (dom/div {:className "skeleton-text" :style {:width "60px"}})))))))

;; ============================================================================
;; Event Table
;; ============================================================================

(defn event-row
  "Format an event for display"
  [event]
  {:id (or (:event/id event) (str (hash event)))
   :timestamp (:event/timestamp event)
   :event-type (name (or (:event event) :unknown))
   :tool (:tool event)
   :duration (when-let [ms (:duration-ms event)]
               (str (Math/round ms) "ms"))
   :success? (:success? event)})

(defn event-table
  "Table of telemetry events"
  [events]
  (let [columns [{:key :timestamp :label "Time"}
                 {:key :event-type :label "Event"}
                 {:key :tool :label "Tool"}
                 {:key :duration :label "Duration"}
                 {:key :success?
                  :label "Status"
                  :format (fn [v _]
                            (if (nil? v)
                              "-"
                              (ui/status-badge
                               {:ok? v
                                :text (if v "Success" "Failed")})))}]
        rows (map event-row events)]
    (ui/data-table
     {:columns columns
      :rows rows
      :empty-message "No telemetry events"})))

;; ============================================================================
;; Event Entity
;; ============================================================================

(defsc TelemetryEvent
  [this {:keys [event/id event/timestamp event tool duration-ms success?]}]
  {:query [:event/id :event/timestamp :event :tool :duration-ms :success?]
   :ident :event/id}
  (dom/div))

;; ============================================================================
;; Connection Status Component
;; ============================================================================

(defsc ConnectionIndicator [this {:keys [connected?]}]
   {:query [:connected?]
    :ident (fn [] [:component/id :connection-indicator])
    :initial-state (fn [_] {:connected? false})}
  (dom/div {:className (str "connection-indicator-inline " (if connected? "connected" "disconnected"))}
           (dom/span :.connection-dot)
           (dom/span :.connection-label
                     (if connected? "Live" "Offline"))))

;; ============================================================================
;; Main Telemetry Page
;; ============================================================================

(defsc TelemetryPage
  [this {:keys [telemetry/total-events
                telemetry/tool-invocations
                telemetry/query-executions
                telemetry/errors
                telemetry/error-rate
                telemetry/events
                page/error]
         :as props}]
  {:query [:telemetry/total-events
           :telemetry/tool-invocations
           :telemetry/query-executions
           :telemetry/errors
           :telemetry/error-rate
           {:telemetry/events (comp/get-query TelemetryEvent)}
           [df/marker-table :telemetry]
           :page/error]
    :ident (fn [] [:page/id :telemetry])
    :initial-state (fn [_] {})
    :route-segment ["telemetry"]
   :will-enter (fn [app route-params]
                 (dr/route-deferred [:page/id :telemetry]
                                    (fn []
                                      (df/load! app [:page/id :telemetry] TelemetryPage
                                                {:marker :telemetry
                                                 :post-mutation `dr/target-ready
                                                 :post-mutation-params {:target [:page/id :telemetry]}
                                                 :fallback `handle-load-error
                                                 :fallback-params {:page-id :telemetry
                                                                   :error-message "Failed to load telemetry data"}}))))
   :component-did-mount
   (fn [this]
     ;; Hook into WebSocket to receive real-time events
     (let [original-handler ws/handle-message]
       (set! ws/handle-message
             (fn [message]
               (when (= :telemetry/event (:type message))
                 (comp/transact! this `[(add-telemetry-event {:event ~(:data message)})]))
               (original-handler message)))))

   :component-will-unmount
   (fn [this]
     ;; Clean up WebSocket handler
     (set! ws/handle-message (get (meta #'ws/handle-message) :original)))}

  (let [loading? (df/loading? (get props [df/marker-table :telemetry]))
        error-msg (get-in props [:page/error :telemetry])
        ws-connected? (ws/connected?)]
    (cond
      error-msg
      (let [retry-handler #(do
                             (comp/transact! this `[(clear-page-error {:page-id :telemetry})])
                             (df/load! this [:page/id :telemetry] TelemetryPage
                                       {:marker :telemetry
                                        :fallback `handle-load-error
                                        :fallback-params {:page-id :telemetry
                                                          :error-message "Failed to load telemetry data"}}))]
        (ui/error-state
         {:message error-msg
          :on-retry retry-handler}))

      loading?
      (telemetry-loading)

      :else
      (dom/div
       (dom/div {:key "header" :className "flex items-center justify-between"}
                (dom/h1 "Telemetry")
                (ui/connection-status {:connected? ws-connected?}))

        ;; Stats Overview
       (dom/div {:key "stats-grid" :className "metrics-grid mb-3"}
                (dom/div {:key "total-events"}
                  (ui/metric-card
                   {:value (or total-events 0)
                    :label "Total Events"}))
                (dom/div {:key "tool-invocations"}
                  (ui/metric-card
                   {:value (or tool-invocations 0)
                    :label "Tool Invocations"}))
                (dom/div {:key "query-executions"}
                  (ui/metric-card
                   {:value (or query-executions 0)
                    :label "Query Executions"}))
                (dom/div {:key "errors"}
                  (ui/metric-card
                   {:value (or errors 0)
                    :label "Errors"
                    :className (when (> (or errors 0) 0) "text-warning")})))

        ;; Error Rate
       (dom/div {:key "error-rate-section"}
         (when error-rate
           (ui/card {:title "Error Rate"}
                    (dom/div
                     (str (Math/round (* 100 error-rate)) "%")))))

        ;; Recent Events
       (dom/div {:key "recent-events-section"}
         (ui/card {:title "Recent Events"
                   :actions (when ws-connected?
                              (dom/span {:className "live-badge"} "● LIVE"))}
                  (if (seq events)
                    (event-table events)
                    (ui/empty-state
                     {:icon "Telemetry"
                      :message "No telemetry events recorded"}))))))))
