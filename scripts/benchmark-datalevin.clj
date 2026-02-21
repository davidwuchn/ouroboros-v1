#!/usr/bin/env bb
;; Benchmark Datalevin vs EDN Query Performance
;; Usage: bb scripts/benchmark-datalevin.clj [options]
;; Options:
;;   --migrate   Migrate EDN data to Datalevin before benchmarking (default false)
;;   --iterations N  Number of iterations per query (default 10)
;;   --verbose   Print detailed results

(ns benchmark-datalevin
  (:require
   [babashka.cli :as cli]
   [clojure.string :as str]
   [clojure.edn :as edn]
   [clojure.java.io :as io]
   [ouroboros.memory :as mem]
   [ouroboros.persistence.datalevin-memory :as dm]
   [ouroboros.persistence.query :as dq]
   [ouroboros.persistence.edn-query :as eq]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Configuration
;; ============================================================================

(def default-iterations 10)

(defn parse-args [args]
  (cli/parse-opts args
                  {:spec {:migrate {:default false :coerce :boolean}
                          :iterations {:default default-iterations :coerce :int}
                          :verbose {:default false :coerce :boolean}}
                   :alias {:m :migrate
                           :i :iterations
                           :v :verbose}}))

;; ============================================================================
;; Setup & Migration
;; ============================================================================

(def datalevin-available? (atom true))

(defn ensure-datalevin-connected []
  (println "Ensuring Datalevin connection...")
  (try
    (dm/init!)
    (println "Datalevin mode:" (dm/get-mode))
    (println "Datalevin connected?" (:datalevin-connected? (dm/health)))
    (reset! datalevin-available? true)
    (catch Exception e
      (println "⚠ Datalevin connection failed:" (.getMessage e))
      (println "   Continuing with EDN-only benchmarks.")
      (reset! datalevin-available? false))))

(defn migrate-data-if-needed []
  (println "Migrating EDN data to Datalevin...")
  (dm/migrate-edn-to-datalevin)
  (println "Migration complete."))

(defn setup-migration-mode []
  (println "Setting migration mode to :dual-write")
  (dm/set-mode! :dual-write)
  (println "Current mode:" (dm/get-mode)))

(defn load-edn-data []
  (println "Loading EDN memory...")
  (mem/init!)
  (println "EDN entries:" (count @mem/memory-store)))

(defn setup [{:keys [migrate]}]
  (load-edn-data)
  (ensure-datalevin-connected)
  (setup-migration-mode)
  (when migrate
    (migrate-data-if-needed)))

;; ============================================================================
;; Benchmark Utilities
;; ============================================================================

(defn mean [numbers]
  (if (empty? numbers)
    0
    (/ (reduce + numbers) (count numbers))))

(defn median [numbers]
  (let [sorted (sort numbers)
        count (count sorted)
        mid (quot count 2)]
    (if (odd? count)
      (nth sorted mid)
      (/ (+ (nth sorted mid) (nth sorted (dec mid))) 2))))

(defn percentile [numbers p]
  (let [sorted (sort numbers)
        count (count sorted)
        idx (max 0 (min (dec count) (int (* p count))))]
    (nth sorted idx)))

(defn benchmark
  "Run a function N times and collect timing statistics"
  [f iterations & args]
  (let [times (repeatedly iterations
                          (fn []
                            (let [start (System/currentTimeMillis)
                                  result (apply f args)
                                  end (System/currentTimeMillis)]
                              {:time (- end start)
                               :result result})))]
    {:iterations iterations
     :times (mapv :time times)
     :results (mapv :result times)
     :mean-time (mean (map :time times))
     :median-time (median (map :time times))
     :p95-time (percentile (map :time times) 0.95)
     :p99-time (percentile (map :time times) 0.99)
     :total-time (reduce + (map :time times))}))

(defn print-benchmark-result [label result]
  (println (str "=== " label " ==="))
  (println (format "Iterations: %d" (:iterations result)))
  (println (format "Mean: %.2f ms" (:mean-time result)))
  (println (format "Median: %.2f ms" (:median-time result)))
  (println (format "P95: %.2f ms" (:p95-time result)))
  (println (format "P99: %.2f ms" (:p99-time result)))
  (println (format "Total: %.2f ms" (double (:total-time result)))))

(defn compare-benchmarks [edn-label edn-result datalevin-label datalevin-result]
  (if (nil? datalevin-result)
    (println "\n⚠ Datalevin results unavailable - skipping comparison")
    (do
      (println "\n=== COMPARISON ===")
      (println (format "%-20s %-20s %-20s" "Metric" edn-label datalevin-label))
      (println (str/join (repeat 60 "-")))
      (doseq [metric [:mean-time :median-time :p95-time :p99-time :total-time]]
        (let [edn-val (metric edn-result)
              datalevin-val (metric datalevin-result)
              speedup (if (pos? datalevin-val)
                        (/ edn-val datalevin-val)
                        :inf)]
          (println (format "%-20s %-20.2f %-20.2f (%.2fx)"
                           (name metric)
                           edn-val
                           datalevin-val
                           speedup)))))))

;; ============================================================================
;; Query Benchmarks
;; ============================================================================

(defn benchmark-query-sessions [iterations]
  (println "\n--- Benchmark: Query Sessions (type :collaboration) ---")
  (let [edn-result (benchmark eq/query-sessions iterations :type :collaboration)
        datalevin-result (benchmark dq/query-sessions iterations :type :collaboration)]
    (print-benchmark-result "EDN Query" edn-result)
    (print-benchmark-result "Datalevin Query" datalevin-result)
    (compare-benchmarks "EDN" edn-result "Datalevin" datalevin-result)
    {:edn edn-result :datalevin datalevin-result}))

(defn benchmark-query-learning-by-level [iterations]
  (println "\n--- Benchmark: Query Learning by Level (:wisdom) ---")
  (let [edn-result (benchmark eq/query-learning-by-level iterations :wisdom)
        datalevin-result (benchmark dq/query-learning-by-level iterations :wisdom)]
    (print-benchmark-result "EDN Query" edn-result)
    (print-benchmark-result "Datalevin Query" datalevin-result)
    (compare-benchmarks "EDN" edn-result "Datalevin" datalevin-result)
    {:edn edn-result :datalevin datalevin-result}))

(defn benchmark-query-temporal [iterations]
  (println "\n--- Benchmark: Query Temporal (sessions, last 24h) ---")
  (let [end-time (System/currentTimeMillis)
        start-time (- end-time (* 24 60 60 1000))
        opts {:start-time start-time :end-time end-time}
        edn-result (benchmark eq/query-temporal iterations :session opts)
        datalevin-result (benchmark dq/query-temporal iterations :session opts)]
    (print-benchmark-result "EDN Query" edn-result)
    (print-benchmark-result "Datalevin Query" datalevin-result)
    (compare-benchmarks "EDN" edn-result "Datalevin" datalevin-result)
    {:edn edn-result :datalevin datalevin-result}))

(defn benchmark-query-relationships [iterations]
  (println "\n--- Benchmark: Query Relationships (sessions-with-users) ---")
  (let [edn-result (benchmark eq/query-relationships iterations :sessions-with-users)
        datalevin-result (benchmark dq/query-relationships iterations :sessions-with-users)]
    (print-benchmark-result "EDN Query" edn-result)
    (print-benchmark-result "Datalevin Query" datalevin-result)
    (compare-benchmarks "EDN" edn-result "Datalevin" datalevin-result)
    {:edn edn-result :datalevin datalevin-result}))

(defn run-all-benchmarks [iterations]
  (println (format "Running benchmarks with %d iterations..." iterations))
  (let [sessions (benchmark-query-sessions iterations)
        learning (benchmark-query-learning-by-level iterations)
        temporal (benchmark-query-temporal iterations)
        relationships (benchmark-query-relationships iterations)]
    {:sessions sessions
     :learning learning
     :temporal temporal
     :relationships relationships}))

;; ============================================================================
;; Main
;; ============================================================================

(defn -main [& args]
  (let [opts (parse-args args)
        iterations (:iterations opts)]
    (println "========================================")
    (println " Datalevin vs EDN Query Benchmark")
    (println "========================================")
    (println "Options:" opts)
    (println)
    (setup opts)
    (println)
    (let [results (run-all-benchmarks iterations)]
      (println "\n========================================")
      (println " Benchmark Complete")
      (println "========================================")
      ;; Emit telemetry summary
      (telemetry/emit! {:event :benchmark/completed
                        :iterations iterations
                        :results (count results)})
      (System/exit 0))))

;; Entry point
(apply -main *command-line-args*)