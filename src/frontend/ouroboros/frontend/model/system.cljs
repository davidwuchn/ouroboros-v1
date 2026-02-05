(ns ouroboros.frontend.model.system
  "System data model"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]))

;; ============================================================================
;; System Status
;; ============================================================================

(defsc SystemStatus [this {:keys [:system/healthy? :system/current-state :system/meta]}]
  {:query [:system/healthy?
           :system/current-state
           :system/meta]
   :ident (fn [] [:component/id :system-status])}
  {})

(defsc SystemMetrics [this {:keys [:telemetry/total-events
                                   :telemetry/tool-invocations
                                   :telemetry/errors
                                   :telemetry/error-rate
                                   :telemetry/avg-tool-duration]}]
  {:query [:telemetry/total-events
           :telemetry/tool-invocations
           :telemetry/errors
           :telemetry/error-rate
           :telemetry/avg-tool-duration]
   :ident (fn [] [:component/id :system-metrics])}
  {})

;; ============================================================================
;; Queries
;; ============================================================================

(defn system-status-query
  "Query for system status"
  []
  [:system/healthy?
   :system/current-state
   :system/meta])

(defn telemetry-stats-query
  "Query for telemetry statistics"
  []
  [:telemetry/total-events
   :telemetry/tool-invocations
   :telemetry/errors
   :telemetry/error-rate])

(defn auth-stats-query
  "Query for auth statistics"
  []
  [:auth/user-count
   :auth/admin-count])
