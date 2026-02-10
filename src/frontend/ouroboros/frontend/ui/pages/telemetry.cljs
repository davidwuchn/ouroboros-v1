(ns ouroboros.frontend.ui.pages.telemetry
  "Telemetry & system health page with real-time updates"
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
    (swap! state update-in [:page/id :telemetry :telemetry/events]
           (fn [events]
             (vec (cons event (take 49 events)))))
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
   (dom/div {:className "telem-skeleton-grid"}
    (dom/div :.skeleton-card)
    (dom/div :.skeleton-card)
    (dom/div :.skeleton-card)
    (dom/div :.skeleton-card))
   (dom/div :.skeleton-card {:style {:height "120px" :marginTop "1rem"}})
   (dom/div :.skeleton-card {:style {:height "300px" :marginTop "1rem"}})))

;; ============================================================================
;; System Health Section
;; ============================================================================

(defn system-health-section
  "System health status and metadata"
  [{:keys [healthy? current-state meta]}]
  (dom/div :.telem-system-section
   ;; Health indicator
   (dom/div :.telem-health-row
    (dom/div :.telem-health-indicator
     (dom/span {:className (str "telem-health-dot "
                                (if healthy? "telem-dot-ok" "telem-dot-err"))})
     (dom/span :.telem-health-label "System")
     (dom/span {:className (str "telem-health-badge "
                                (if healthy? "telem-badge-ok" "telem-badge-err"))}
               (if healthy? "Healthy" "Issue")))
    (when current-state
      (dom/span :.telem-health-detail
                (str (count (:state current-state)) " active states"))))
   ;; System meta
   (when meta
     (dom/div :.telem-meta-block
      (dom/div :.telem-meta-header "System Info")
      (dom/pre :.code-block (pr-str meta))))))

;; ============================================================================
;; Event Table
;; ============================================================================

(defn- get-any
  "Get value by keyword or string key variants."
  [m k]
  (or (get m k)
      (get m (name k))
      (when (namespace k)
        (get m (str (namespace k) "/" (name k))))))

(defn- event-type-label
  "Return a safe display label for event type."
  [event]
  (let [evt (or (get-any event :event)
                (get-any event :event/type)
                (get-any event :type))]
    (cond
      (keyword? evt) (name evt)
      (string? evt) evt
      :else "unknown")))

(defn- event-row
  "Format an event for display"
  [idx event]
  {:id (str (or (get-any event :event/id) (hash event)) "-" idx)
   :timestamp (get-any event :event/timestamp)
   :event-type (event-type-label event)
   :tool (get-any event :tool)
   :duration (when-let [ms (get-any event :duration-ms)]
               (str (Math/round ms) "ms"))
   :success? (get-any event :success?)})

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
        rows (map-indexed event-row events)]
    (ui/data-table
     {:columns columns
      :rows rows
      :empty-message "No telemetry events"})))

;; ============================================================================
;; Event Entity
;; ============================================================================

(defsc TelemetryEvent
  [_this {:keys [event/id]}]
  {:query [:event/id :event/timestamp :event :tool :duration-ms :success?]
   :ident :event/id}
  (dom/div (str id)))

;; ============================================================================
;; Main Telemetry Page
;; ============================================================================

(defsc TelemetryPage
  [this {:keys [system/healthy?
                system/current-state
                system/meta
                telemetry/total-events
                telemetry/tool-invocations
                telemetry/query-executions
                telemetry/errors
                telemetry/error-rate
                telemetry/events
                page/error]
         :as props}]
  {:query [:system/healthy?
           :system/current-state
           :system/meta
           :telemetry/total-events
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
   :will-enter (fn [app _route-params]
                 (dr/route-deferred [:page/id :telemetry]
                   (fn []
                     (df/load! app [:page/id :telemetry] TelemetryPage
                       {:marker :telemetry
                        :post-mutation `dr/target-ready
                        :post-mutation-params {:target [:page/id :telemetry]}
                        :fallback `handle-load-error
                        :fallback-params {:page-id :telemetry
                                          :error-message "Failed to load telemetry data"}}))))
   :componentDidMount
   (fn [this]
     ;; Hook into WebSocket to receive real-time events
     (let [original-handler ws/handle-message]
       (set! ws/handle-message
             (fn [message]
               (when (= :telemetry/event (:type message))
                 (comp/transact! this `[(add-telemetry-event {:event ~(:data message)})]))
               (original-handler message)))))
   :componentWillUnmount
   (fn [_this]
     (set! ws/handle-message (get (cljs.core/meta #'ws/handle-message) :original)))}

  (let [loading? (df/loading? (get props [df/marker-table :telemetry]))
        error-msg (get-in props [:page/error :telemetry])
        ws-connected? (ws/connected?)]
    (cond
      error-msg
      (ui/error-state
       {:message error-msg
        :on-retry #(do
                     (comp/transact! this `[(clear-page-error {:page-id :telemetry})])
                     (df/load! this [:page/id :telemetry] TelemetryPage
                       {:marker :telemetry
                        :fallback `handle-load-error
                        :fallback-params {:page-id :telemetry
                                          :error-message "Failed to load telemetry data"}}))})

      loading?
      (telemetry-loading)

      :else
      (dom/div :.telem-page
       ;; Header
       (dom/div :.telem-header
        (dom/h1 :.telem-title "Telemetry")
        (ui/connection-status {:connected? ws-connected?}))

       ;; System Health
       (system-health-section
        {:healthy? healthy?
         :current-state current-state
         :meta meta})

       ;; Stats Grid
       (dom/div :.telem-stats-grid
        (ui/metric-card {:value (or total-events 0) :label "Total Events"})
        (ui/metric-card {:value (or tool-invocations 0) :label "Tool Invocations"})
        (ui/metric-card {:value (or query-executions 0) :label "Query Executions"})
        (ui/metric-card {:value (or errors 0)
                         :label "Errors"
                         :className (when (pos? (or errors 0)) "text-warning")}))

       ;; Error Rate
       (when error-rate
         (dom/div :.telem-error-rate
          (dom/span :.telem-error-rate-label "Error Rate")
          (dom/span :.telem-error-rate-value
                    (str (Math/round (* 100 error-rate)) "%"))))

       ;; Recent Events
       (ui/card {:title "Recent Events"
                 :actions (when ws-connected?
                            (dom/span {:className "live-badge"} "LIVE"))}
        (if (seq events)
          (event-table events)
          (ui/empty-state
           {:icon "Telemetry"
            :message "No telemetry events recorded"})))))))
