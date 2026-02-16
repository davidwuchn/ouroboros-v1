(ns ouroboros.frontend.model.telemetry
  "Telemetry data model"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]))

;; ============================================================================
;; Event Entity
;; ============================================================================

(defsc TelemetryEvent [_this _props]
  {:query [:event/id
           :event/timestamp
           :event/extra]
   :ident :event/id}
  {})

;; ============================================================================
;; Telemetry List
;; ============================================================================

(defsc RecentEvents [_this _props]
  {:query [{:recent-events/events (comp/get-query TelemetryEvent)}
           :recent-events/count]
   :ident (fn [] [:component/id :recent-events])}
  {})

;; ============================================================================
;; Queries
;; ============================================================================

(defn recent-events-query
  "Query for recent telemetry events"
  ([]
   (recent-events-query 50))
  ([n]
   [{[:telemetry/recent {:n n}] (comp/get-query TelemetryEvent)}]))

(defn telemetry-stats-query
  "Query for telemetry statistics"
  []
  [:telemetry/total-events
   :telemetry/tool-invocations
   :telemetry/eca-tool-invocations
   :telemetry/query-executions
   :telemetry/errors
   :telemetry/error-rate])
