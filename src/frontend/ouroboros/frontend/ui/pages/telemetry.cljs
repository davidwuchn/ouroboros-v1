(ns ouroboros.frontend.ui.pages.telemetry
  "Telemetry & system health page with real-time updates"
   (:require
    [clojure.pprint :as pprint]
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

(m/defmutation set-debug-enabled [{:keys [enabled?]}]
  (action [{:keys [state]}]
    (swap! state assoc-in [:page/id :telemetry :debug/enabled?] (boolean enabled?))))

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
;; Event Details Drawer
;; ============================================================================

(defn- drawer-value
  [v]
  (cond
    (keyword? v) (name v)
    (symbol? v) (str v)
    (map? v) (ui/code-block {:content (with-out-str (pprint/pprint v))})
    (vector? v) (ui/code-block {:content (with-out-str (pprint/pprint v))})
    (seq? v) (ui/code-block {:content (with-out-str (pprint/pprint v))})
    (nil? v) "-"
    :else (str v)))

(defn- event-detail-row
  [label value]
  (dom/div :.telem-detail-row
    (dom/div :.telem-detail-label label)
    (dom/div :.telem-detail-value (drawer-value value))))

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
    :success? (get-any event :success?)
    :raw event})

(defn event-table
  "Table of telemetry events"
  [events on-row-click]
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
        rows (map-indexed event-row events)
        handle-click (when on-row-click
                       (fn [row]
                         (when-let [event (:raw row)]
                           (on-row-click event))))]
    (ui/data-table
     {:columns columns
      :rows rows
       :on-row-click handle-click
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
                debug/enabled?
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
            :debug/enabled?
            [df/marker-table :telemetry]
            :page/error]
   :ident (fn [] [:page/id :telemetry])
    :initial-state (fn [_] {:debug/enabled? false})
    :route-segment ["telemetry"]
    :initLocalState (fn [_]
                      {:drawer/open? false
                       :drawer/event nil})
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
   }

  (let [loading? (df/loading? (get props [df/marker-table :telemetry]))
        error-msg (get-in props [:page/error :telemetry])
        ws-connected? (ws/connected?)
        drawer-open? (boolean (comp/get-state this :drawer/open?))
        drawer-event (comp/get-state this :drawer/event)]
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

        (dom/div :.telem-debug-row
          (dom/div :.telem-debug-label "Debug Mode")
          (dom/button {:className (str "btn btn-sm " (if enabled? "btn-secondary" "btn-outline"))
                       :onClick (fn [_]
                                  (let [next? (not enabled?)]
                                    (comp/transact! this `[(set-debug-enabled {:enabled? ~next?})])
                                    (ws/request-eca-debug! next?)))}
                      (if enabled? "Debug On" "Debug Off")))

       ;; Error Rate
       (when error-rate
         (dom/div :.telem-error-rate
          (dom/span :.telem-error-rate-label "Error Rate")
          (dom/span :.telem-error-rate-value
                    (str (Math/round (* 100 error-rate)) "%"))))

       ;; Recent Events
        (ui/card {:title "Recent Events"}
         (if (seq events)
           (event-table events (fn [event]
                                 (comp/set-state! this {:drawer/open? true
                                                        :drawer/event event})))
           (ui/empty-state
            {:icon "Telemetry"
             :message "No telemetry events recorded"})))

        (when drawer-open?
          (let [{:event/keys [id timestamp seq]
                 :keys [event tool duration-ms success? error-message params]
                 :as evt} drawer-event
                title (or (some-> event name) "Telemetry Event")]
            (dom/div :.telem-drawer-backdrop
              {:onClick #(comp/set-state! this {:drawer/open? false :drawer/event nil})}
              (dom/div :.telem-drawer
                {:onClick #(.stopPropagation %)}
                (dom/div :.telem-drawer-header
                  (dom/div
                    (dom/h3 title)
                    (when timestamp
                      (dom/p :.telem-drawer-subtitle (str timestamp))))
                  (dom/button {:className "btn btn-secondary"
                               :onClick #(comp/set-state! this {:drawer/open? false :drawer/event nil})}
                              "Close"))

                (dom/div :.telem-drawer-body
                  (event-detail-row "ID" id)
                  (event-detail-row "Type" event)
                  (event-detail-row "Tool" tool)
                  (event-detail-row "Duration" (when duration-ms (str (Math/round duration-ms) "ms")))
                  (event-detail-row "Success" success?)
                  (event-detail-row "Sequence" seq)
                  (event-detail-row "Error" error-message)
                  (event-detail-row "Params" params)
                  (when (:payload evt)
                    (event-detail-row "Payload" (:payload evt)))
                  (event-detail-row "Raw Event" evt))))))))))
