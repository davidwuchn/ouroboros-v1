;; λ(system) Prometheus Export
;; Unifies internal evolution metrics with external observability
(ns ouroboros.telemetry.prometheus
  "Prometheus/OpenTelemetry metrics export for λ(system)

   Bridges internal evolution metrics with external monitoring:
   - λ(self) metrics: false-positive-rate, adoption-rate, missed-critical-rate
   - λ(memory) metrics: retrieval-time, hit-rate, query-count
   - System health: event rates, error rates, tool usage

   Usage:
     (require '[ouroboros.telemetry.prometheus :as prom])
     (prom/start-server! 9090)  ; Start metrics endpoint
     (prom/metrics-text)        ; Get Prometheus format text
   
   Prometheus config:
     scrape_configs:
       - job_name: 'ouroboros'
         static_configs:
           - targets: ['localhost:9090']"
  (:require [ouroboros.lambda-metrics :as lambda]
            [ouroboros.telemetry :as telemetry]
            [clojure.string :as str])
  (:import [java.io ByteArrayOutputStream PrintWriter]
           [java.time Instant]))

;; ============================================================================
;; Metric Registry
;; ============================================================================

(defonce ^:private metric-registry
  (atom {:gauges {}
         :counters {}
         :histograms {}}))

(defn- sanitize-metric-name
  "Convert to Prometheus metric naming convention"
  [name]
  (-> (str name)
      (str/replace #"[^a-zA-Z0-9_]" "_")
      (str/replace #"_+" "_")
      (str/lower-case)))

(defn- format-labels
  "Format labels as Prometheus label string"
  [labels]
  (if (seq labels)
    (str "{"
         (str/join ","
                   (map (fn [[k v]]
                          (str (sanitize-metric-name k) "=\"" v "\""))
                        labels))
         "}")
    ""))

;; ============================================================================
;; Metric Types
;; ============================================================================

(defn gauge
  "Define or update a gauge metric
   
   Usage: (gauge :ouroboros_lambda_false_positive_rate 0.05)"
  [name value & {:keys [labels help]}]
  (swap! metric-registry assoc-in [:gauges name]
         {:value value
          :labels (or labels {})
          :help help
          :timestamp (System/currentTimeMillis)}))

(defn counter
  "Increment a counter metric
   
   Usage: (counter :ouroboros_reviews_total 1)"
  [name delta & {:keys [labels]}]
  (swap! metric-registry update-in [:counters name]
         (fn [existing]
           {:value (+ (get existing :value 0) delta)
            :labels (or labels (get existing :labels {}))
            :timestamp (System/currentTimeMillis)})))

(defn histogram
  "Observe a value in a histogram
   
   Usage: (histogram :ouroboros_retrieval_duration_ms 150)"
  [name value & {:keys [labels buckets]}]
  (let [bs (or buckets [10 50 100 250 500 1000 2500 5000 10000])]
    (swap! metric-registry update-in [:histograms name]
           (fn [existing]
             (let [current (or existing {:sum 0 :count 0 :buckets {}})
                   new-count (inc (:count current))
                   new-sum (+ (:sum current) value)
                   ;; Count values <= each bucket bound
                   new-buckets (reduce (fn [acc b]
                                         (if (<= value b)
                                           (update acc b (fnil inc 0))
                                           acc))
                                       (:buckets current)
                                       bs)]
               {:sum new-sum
                :count new-count
                :buckets new-buckets
                :bucket-defs bs
                :labels (or labels (get existing :labels {}))
                :timestamp (System/currentTimeMillis)})))))

;; ============================================================================
;; λ(system) Metric Sync
;; ============================================================================

(defn sync-lambda-metrics!
  "Sync internal λ(system) metrics to Prometheus registry
   
   Call this periodically (e.g., every 30s) or before serving metrics"
  []
  (let [self-metrics (lambda/review-effectiveness)
        mem-metrics (lambda/memory-effectiveness)]

    ;; λ(self) - Code/Skill Evolution metrics
    (gauge :ouroboros_lambda_false_positive_rate
           (:false-positive-rate self-metrics 0.0)
           :help "Rate of review false positives")

    (gauge :ouroboros_lambda_missed_critical_rate
           (:missed-critical-rate self-metrics 0.0)
           :help "Rate of missed critical issues")

    (gauge :ouroboros_lambda_adoption_rate
           (:adoption-rate self-metrics 0.0)
           :help "Rate of adopted suggestions")

    (gauge :ouroboros_lambda_total_reviews
           (:total-reviews self-metrics 0)
           :help "Total number of reviews processed")

    ;; λ(memory) - Context/Knowledge Evolution metrics
    (gauge :ouroboros_lambda_avg_retrieval_time_ms
           (:avg-retrieval-time-ms mem-metrics 0.0)
           :help "Average memory retrieval time in milliseconds")

    (gauge :ouroboros_lambda_hit_rate
           (:hit-rate mem-metrics 0.0)
           :help "Rate of successful memory searches")

    (gauge :ouroboros_lambda_total_queries
           (:total-queries mem-metrics 0)
           :help "Total number of memory queries")

    ;; Threshold indicators (1 = healthy, 0 = needs attention)
    (gauge :ouroboros_lambda_health
           (if (and (< (:false-positive-rate self-metrics 1.0) 0.10)
                    (< (:missed-critical-rate self-metrics 1.0) 0.05)
                    (> (:adoption-rate self-metrics 0.0) 0.70)
                    (< (:avg-retrieval-time-ms mem-metrics 9999) 1000)
                    (> (:hit-rate mem-metrics 0.0) 0.80))
             1.0
             0.0)
           :help "λ(system) health indicator (1=healthy, 0=needs attention)")

    {:synced-at (Instant/now)}))

;; ============================================================================
;; Telemetry Integration
;; ============================================================================

(defn record-tool-telemetry!
  "Record tool usage from telemetry events"
  [events]
  (let [tool-events (filter #(= :tool/invoke (:event %)) events)
        tool-counts (frequencies (map :tool tool-events))
        error-events (filter #(false? (:success? %)) events)
        error-count (count error-events)]

    ;; Tool invocation counter
    (doseq [[tool count] tool-counts]
      (counter :ouroboros_tool_invocations_total count
               :labels {:tool (name tool)}))

    ;; Error counter
    (counter :ouroboros_errors_total error-count)

    ;; Event rate gauge
    (gauge :ouroboros_events_per_minute
           (count (filter #(> (:duration-ms % 0) 0) tool-events)))))

;; ============================================================================
;; Prometheus Text Format
;; ============================================================================

(defn- format-help
  "Format HELP line"
  [name help]
  (when help
    (str "# HELP " (sanitize-metric-name name) " " help "\n")))

(defn- format-type
  "Format TYPE line"
  [name metric-type]
  (str "# TYPE " (sanitize-metric-name name) " " (name metric-type) "\n"))

(defn- format-gauge
  "Format gauge metric"
  [name data]
  (let [metric-name (sanitize-metric-name name)
        labels (format-labels (:labels data))
        value (:value data 0)
        ts (:timestamp data)]
    (str metric-name labels " " value
         (when ts (str " " ts))
         "\n")))

(defn- format-counter
  "Format counter metric"
  [name data]
  (let [metric-name (sanitize-metric-name name)
        labels (format-labels (:labels data))
        value (:value data 0)
        ts (:timestamp data)]
    (str metric-name labels " " value
         (when ts (str " " ts))
         "\n")))

(defn- format-histogram
  "Format histogram metric"
  [name data]
  (let [metric-name (sanitize-metric-name name)
        labels (format-labels (:labels data))
        sum (:sum data 0)
        count (:count data 0)
        buckets (:buckets data)]
    (str/join
     ""
     (concat
      ;; Bucket counts
      (map (fn [[bucket count]]
             (str metric-name "_bucket{le=\"" bucket "\"}" count "\n"))
           (sort-by first buckets))
      ;; Sum
      [(str metric-name "_sum" labels " " sum "\n")]
      ;; Count
      [(str metric-name "_count" labels " " count "\n")]))))

(defn metrics-text
  "Generate Prometheus text format metrics
   
   Usage: (metrics-text) => String in Prometheus exposition format"
  []
  ;; Sync latest λ(system) metrics
  (sync-lambda-metrics!)

  ;; Get telemetry data
  (record-tool-telemetry! (telemetry/get-events))

  ;; Generate output
  (let [sb (StringBuilder.)
        registry @metric-registry]

    ;; Header
    (.append sb "# Ouroboros λ(system) Metrics\n")
    (.append sb "# Generated: ")
    (.append sb (str (Instant/now)))
    (.append sb "\n\n")

    ;; Gauges
    (doseq [[name data] (:gauges registry)]
      (.append sb (format-help name (:help data)))
      (.append sb (format-type name :gauge))
      (.append sb (format-gauge name data)))

    ;; Counters
    (doseq [[name data] (:counters registry)]
      (.append sb (format-type name :counter))
      (.append sb (format-counter name data)))

    ;; Histograms
    (doseq [[name data] (:histograms registry)]
      (.append sb (format-type name :histogram))
      (.append sb (format-histogram name data)))

    (.toString sb)))

;; ============================================================================
;; HTTP Server
;; ============================================================================

(defonce ^:private server-instance (atom nil))

(defn- handle-metrics-request
  "Handle HTTP request for metrics"
  [_req]
  {:status 200
   :headers {"Content-Type" "text/plain; version=0.0.4; charset=utf-8"}
   :body (metrics-text)})

(defn start-server!
  "Start Prometheus metrics HTTP server
   
   Usage: (start-server! 9090)  ; Listen on port 9090
   
   Prometheus scrape config:
     scrape_configs:
       - job_name: 'ouroboros'
         scrape_interval: 30s
         static_configs:
           - targets: ['localhost:9090']"
  ([port]
   (start-server! port {}))
  ([port opts]
   (require '[org.httpkit.server :as http])
   (let [stop-fn (http/run-server
                  (fn [req]
                    (case (:uri req)
                      "/metrics" (handle-metrics-request req)
                      "/health" {:status 200 :body "OK"}
                      {:status 404 :body "Not found"}))
                  (merge {:port port} opts))]
     (reset! server-instance {:stop stop-fn :port port})
     (println (str "✓ Prometheus metrics server on http://localhost:" port "/metrics"))
     stop-fn)))

(defn stop-server!
  "Stop the metrics server"
  []
  (when-let [{:keys [stop]} @server-instance]
    (stop)
    (reset! server-instance nil)
    (println "⊘ Prometheus metrics server stopped")))

(defn server-status
  "Get server status"
  []
  (if @server-instance
    {:running? true :port (:port @server-instance)}
    {:running? false}))

;; ============================================================================
;; Auto-start Integration
;; ============================================================================

(defn auto-start!
  "Auto-start metrics server from config
   
   Usage: (auto-start! {:prometheus/port 9090})"
  [config]
  (when-let [port (get config :prometheus/port
                       (System/getenv "PROMETHEUS_PORT"))]
    (when port
      (try
        (start-server! (Integer/parseInt (str port)))
        (catch Exception e
          (println "⚠ Failed to start Prometheus server:" (.getMessage e)))))))

;; ============================================================================
;; Convenience
;; ============================================================================

(defn lambda-health-check
  "Quick health check for λ(system)
   
   Returns map with :healthy? boolean and :issues list"
  []
  (sync-lambda-metrics!)
  (let [self (lambda/review-effectiveness)
        mem (lambda/memory-effectiveness)
        issues []]
    (cond-> {:healthy? true :timestamp (Instant/now)}

      (>= (:false-positive-rate self 0) 0.10)
      (-> (assoc :healthy? false)
          (update :issues conj "False positive rate >= 10%"))

      (>= (:missed-critical-rate self 0) 0.05)
      (-> (assoc :healthy? false)
          (update :issues conj "Missed critical rate >= 5%"))

      (<= (:adoption-rate self 0) 0.70)
      (-> (assoc :healthy? false)
          (update :issues conj "Adoption rate <= 70%"))

      (>= (:avg-retrieval-time-ms mem 9999) 1000)
      (-> (assoc :healthy? false)
          (update :issues conj "Retrieval time >= 1s"))

      (<= (:hit-rate mem 0) 0.80)
      (-> (assoc :healthy? false)
          (update :issues conj "Hit rate <= 80%")))))

(comment
  ;; Start metrics server
  (start-server! 9090)

  ;; Get metrics text
  (println (metrics-text))

  ;; Health check
  (lambda-health-check)

  ;; Stop server
  (stop-server!))
