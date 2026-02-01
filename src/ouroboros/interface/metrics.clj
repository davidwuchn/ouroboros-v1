(ns ouroboros.interface.metrics
  "Metrics interface - Prometheus export for monitoring"
  (:require
   [ouroboros.metrics :as metrics]))

(defn start!
  "Start metrics HTTP server
   
   Usage: (start! {:port 9090})"
  ([] (metrics/start!))
  ([opts] (metrics/start! opts)))

(defn stop!
  "Stop metrics server"
  []
  (metrics/stop!))

(defn status
  "Get metrics server status"
  []
  (metrics/status))

(defn get-prometheus-text
  "Get metrics in Prometheus format"
  []
  (metrics/get-prometheus-text))

(defn record-counter!
  "Record a counter increment"
  [metric-name & {:as opts}]
  (apply metrics/record-counter! metric-name (flatten (seq opts))))

(defn record-gauge!
  "Record a gauge value"
  [metric-name value & {:as opts}]
  (apply metrics/record-gauge! metric-name value (flatten (seq opts))))

(defn record-histogram!
  "Record a histogram observation"
  [metric-name value & {:as opts}]
  (apply metrics/record-histogram! metric-name value (flatten (seq opts))))