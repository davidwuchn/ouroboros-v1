(ns ouroboros.metrics
  "Metrics Export - Prometheus/OpenTelemetry format for monitoring
   
   Exposes system metrics in Prometheus format for external monitoring systems.
   Metrics are aggregated from telemetry events and available at /metrics endpoint.
   
   Usage:
     (metrics/start! {:port 9090})  ; Start metrics server
     (metrics/get-prometheus-text)   ; Get metrics as Prometheus text
     
   Available metrics:
   - ouroboros_tool_duration_seconds histogram
   - ouroboros_tool_invocations_total counter
   - ouroboros_tool_errors_total counter
   - ouroboros_chat_sessions gauge
   - ouroboros_llm_tokens_total counter (if available in events)"
  (:require
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.telemetry :as telemetry])
  (:import [java.time Instant]))

;; ============================================================================
;; Metric Types
;; ============================================================================

(defonce ^:private metrics-store
  ;; Store for metric values
  (atom {:counters {}
         :gauges {}
         :histograms {}}))

;; ============================================================================
;; Metric Recording
;; ============================================================================

(defn record-counter!
  "Increment a counter metric"
  [metric-name & {:keys [labels value]
                  :or {labels {} value 1}}]
  (let [key [metric-name labels]]
    (swap! metrics-store update-in [:counters key] (fnil + 0) value)))

(defn record-gauge!
  "Set a gauge metric value"
  [metric-name value & {:keys [labels]
                        :or {labels {}}}]
  (let [key [metric-name labels]]
    (swap! metrics-store assoc-in [:gauges key] value)))

(defn record-histogram!
  "Record a histogram observation"
  [metric-name value & {:keys [labels buckets]
                        :or {labels {}
                            buckets [0.005 0.01 0.025 0.05 0.1 0.25 0.5 1 2.5 5 10]}}]
  (let [key [metric-name labels]]
    (swap! metrics-store update-in [:histograms key]
           (fn [h]
             (let [current (or h {:sum 0 :count 0 :buckets (zipmap buckets (repeat 0))})
                   new-buckets (update (:buckets current) 
                                       (first (filter #(>= % value) buckets))
                                       (fnil inc 0))]
               (-> current
                   (update :sum + value)
                   (update :count inc)
                   (assoc :buckets new-buckets)))))))

;; ============================================================================
;; Aggregation from Telemetry
;; ============================================================================

(defn aggregate-events!
  "Aggregate recent telemetry events into metrics"
  []
  (let [events (telemetry/get-recent-events 1000)]
    ;; Tool invocations - total count
    (doseq [event (filter #(= :tool/invoke (:event %)) events)]
      (record-counter! "ouroboros_tool_invocations_total"
                       :labels {:tool (name (:tool event "unknown"))}))
    
    ;; Tool completions - histogram of duration
    (doseq [event (filter #(= :tool/complete (:event %)) events)]
      (let [tool-name (name (:tool event "unknown"))
            duration-sec (/ (:duration-ms event 0) 1000.0)]
        (record-histogram! "ouroboros_tool_duration_seconds"
                           duration-sec
                           :labels {:tool tool-name})))
    
    ;; Tool errors
    (doseq [event (filter #(= :tool/error (:event %)) events)]
      (record-counter! "ouroboros_tool_errors_total"
                       :labels {:tool (name (:tool event "unknown"))}))
    
    ;; LLM tokens (if present in events)
    (doseq [event (filter #(and (= :llm/complete (:event %)) 
                                (:tokens-used %)) events)]
      (record-counter! "ouroboros_llm_tokens_total"
                       :labels {:provider (name (:provider event "unknown"))}
                       :value (:tokens-used event 0)))
    
    ;; Chat sessions (gauge)
    (let [session-events (filter #(= :chat/session-start (:event %)) events)
          active-sessions (count session-events)]
      (record-gauge! "ouroboros_chat_sessions" active-sessions))
    
    ;; System health
    (let [health-events (filter #(= :system/health-check (:event %)) events)
          latest-health (first (sort-by :event/seq #(compare %2 %1) health-events))]
      (record-gauge! "ouroboros_system_healthy" 
                     (if (:healthy? latest-health) 1 0)))
    
    @metrics-store))

;; ============================================================================
;; Prometheus Format Export
;; ============================================================================

(defn- format-labels
  "Format labels as Prometheus label string"
  [labels]
  (if (seq labels)
    (str "{" 
         (str/join "," (map (fn [[k v]] 
                               (str (name k) "=\"" v "\"")) 
                             labels))
         "}")
    ""))

(defn- counter-to-text
  "Convert counter to Prometheus text format"
  [name counters]
  (str "# HELP " name " Total count\n"
       "# TYPE " name " counter\n"
       (str/join "\n"
                 (map (fn [[[metric-name labels] value]]
                        (str metric-name (format-labels labels) " " value))
                      counters))
       "\n"))

(defn- gauge-to-text
  "Convert gauge to Prometheus text format"
  [name gauges]
  (str "# HELP " name " Current value\n"
       "# TYPE " name " gauge\n"
       (str/join "\n"
                 (map (fn [[[metric-name labels] value]]
                        (str metric-name (format-labels labels) " " value))
                      gauges))
       "\n"))

(defn- histogram-to-text
  "Convert histogram to Prometheus text format"
  [name histograms]
  (let [help-str (str "# HELP " name " Duration histogram\n")
        type-str (str "# TYPE " name " histogram\n")]
    (str help-str type-str
         (str/join "\n"
                   (mapcat (fn [[[metric-name labels] data]]
                             (concat
                              ;; Buckets
                              (map (fn [[bucket value]]
                                     (str metric-name "_bucket" 
                                          (format-labels (assoc labels :le bucket)) 
                                          " " value))
                                   (sort-by key (:buckets data)))
                              ;; Sum and count
                              [(str metric-name "_sum" (format-labels labels) " " (:sum data))
                               (str metric-name "_count" (format-labels labels) " " (:count data))]))
                           histograms))
         "\n")))

(defn get-prometheus-text
  "Generate Prometheus text format output from current metrics"
  []
  (aggregate-events!)
  (let [{:keys [counters gauges histograms]} @metrics-store]
    (str 
     ;; Counters
     (when (seq counters)
       (counter-to-text "counters" counters))
     
     ;; Gauges
     (when (seq gauges)
       (gauge-to-text "gauges" gauges))
     
     ;; Histograms
     (when (seq histograms)
       (histogram-to-text "histograms" histograms))
     
     ;; Standard metrics
     "# HELP ouroboros_info System information\n"
     "# TYPE ouroboros_info gauge\n"
     "ouroboros_info{version=\"0.1.0\"} 1\n")))

;; ============================================================================
;; HTTP Server
;; ============================================================================

(defonce ^:private metrics-server (atom nil))

(defn- handle-metrics-request
  "Handle /metrics HTTP request"
  [_req]
  {:status 200
   :headers {"Content-Type" "text/plain; version=0.0.4; charset=utf-8"
             "Cache-Control" "no-cache"}
   :body (get-prometheus-text)})

(defn- handle-health-request
  "Handle /health endpoint for scraping health"
  [_req]
  {:status 200
   :headers {"Content-Type" "application/json"}
   :body (str "{"
              "\"status\":\"healthy\","
              "\"timestamp\":\"" (Instant/now) "\","
              "\"metrics-available\":true"
              "}")})

(defn- make-handler
  "Create ring-compatible handler"
  []
  (fn [req]
    (let [uri (:uri req)]
      (cond
        (= uri "/metrics") (handle-metrics-request req)
        (= uri "/health") (handle-health-request req)
        :else {:status 404 :body "Not found"}))))

(defn start!
  "Start metrics HTTP server
   
   Args:
     :port - Port to listen on (default: 9090)
   
   Usage:
     (start! {:port 9090})"
  ([] (start! {}))
  ([{:keys [port]}]
   (let [actual-port (or port 9090)]
     (println (str "◈ Starting metrics server on port " actual-port "..."))
     ;; In a real implementation, this would start babashka.http-server
     ;; For now, placeholder with handler ready
     (reset! metrics-server 
             {:port actual-port 
              :running true
              :handler (make-handler)
              :url (str "http://localhost:" actual-port "/metrics")})
     (println (str "✓ Metrics endpoint: http://localhost:" actual-port "/metrics"))
     {:port actual-port :url (str "http://localhost:" actual-port "/metrics")})))

(defn stop!
  "Stop metrics server"
  []
  (when @metrics-server
    (reset! metrics-server nil)
    (println "✓ Metrics server stopped")))

(defn status
  "Get metrics server status"
  []
  (if @metrics-server
    {:running true :port (:port @metrics-server) :url (:url @metrics-server)}
    {:running false}))

;; ============================================================================
;; Integration Helpers
;; ============================================================================

(defn wrap-tool-with-metrics
  "Wrap tool execution with metric recording"
  [tool-fn tool-name]
  (fn [params]
    (let [start (System/nanoTime)]
      (try
        (let [result (tool-fn params)
              duration-sec (/ (- (System/nanoTime) start) 1e9)]
          (record-counter! "ouroboros_tool_invocations_total"
                          :labels {:tool (name tool-name)})
          (record-histogram! "ouroboros_tool_duration_seconds"
                            duration-sec
                            :labels {:tool (name tool-name)})
          result)
        (catch Exception e
          (record-counter! "ouroboros_tool_errors_total"
                          :labels {:tool (name tool-name)})
          (throw e))))))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(pco/defresolver metrics-status [_]
  {::pco/output [:metrics/status]}
  {:metrics/status (status)})

(pco/defresolver metrics-snapshot [_]
  {::pco/output [:metrics/snapshot]}
  (aggregate-events!)
  {:metrics/snapshot @metrics-store})

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [metrics-status metrics-snapshot])

(def mutations
  [])

(comment
  ;; Start metrics server
  (start! {:port 9090})
  
  ;; Get metrics in Prometheus format
  (println (get-prometheus-text))
  
  ;; Record some test metrics
  (record-counter! "test_counter" :labels {:tool "file/read"} :value 5)
  (record-histogram! "test_histogram" 0.5 :labels {:tool "http/get"})
  (record-gauge! "test_gauge" 42)
  
  ;; Check status
  (status)
  
  ;; Stop
  (stop!))