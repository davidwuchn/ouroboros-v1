(ns ouroboros.interface.telemetry
  "Telemetry interface - Structured logging and metrics"
  (:require
   [ouroboros.query :as query]
   [ouroboros.telemetry :as telemetry]))

(defn telemetry-events
  "Get all telemetry events
   
   Usage: (telemetry-events)"
  []
  (telemetry/get-events))

(defn telemetry-recent
  "Get n recent telemetry events
   
   Usage: (telemetry-recent 10)"
  [n]
  (telemetry/get-recent-events n))

(defn telemetry-stats
  "Get telemetry statistics
   
   Usage: (telemetry-stats)"
  []
  (query/q [:telemetry/total-events :telemetry/tool-invocations :telemetry/errors]))

(defn telemetry-clear!
  "Clear all telemetry events
   
   Usage: (telemetry-clear!)"
  []
  (query/m 'ouroboros.telemetry/telemetry-clear! {}))
