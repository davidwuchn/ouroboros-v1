(ns ouroboros.lambda-metrics
  "λ(system) Metrics"
  (:require [clojure.string :as str]))

(def ^:private review-metrics
  (atom {:reviews [] :false-positives 0 :missed-critical 0 :total-issues-found 0 :total-suggestions 0 :adopted-suggestions 0}))

(defn record-review! [m]
  (let [fp? (:false-positive m)
        issues (or (:issues m) 0)
        suggestions (or (:suggestions m) 0)
        adopted (or (:adopted m) 0)]
    (swap! review-metrics
           (fn [state]
             (let [state (update state :reviews (fn [rs] (take 500 (conj rs (assoc m :timestamp (System/currentTimeMillis))))))]
               (cond-> state
                 fp? (update :false-positives inc)
                 true (update :total-issues-found + issues)
                 true (update :total-suggestions + suggestions)
                 true (update :adopted-suggestions + adopted)))))))

(defn review-effectiveness []
  (let [m @review-metrics
        total (count (:reviews m))
        fp (:false-positives m)
        missed (:missed-critical m)
        suggestions (:total-suggestions m)
        adopted (:adopted-suggestions m)]
    {:false-positive-rate (if (pos? total) (double (/ fp total)) 0.0)
     :missed-critical-rate (if (pos? total) (double (/ missed total)) 0.0)
     :avg-review-time-ms 0.0
     :adoption-rate (if (pos? suggestions) (double (/ adopted suggestions)) 0.0)
     :total-reviews total}))

(def ^:private retrieval-metrics
  (atom {:retrievals [] :total-time-ms 0 :total-queries 0 :relevant-hits 0}))

(defn record-retrieval! [m]
  (let [elapsed (or (:elapsed-ms m) 0)
        rel? (if (contains? m :relevant) (:relevant m) true)]
    (swap! retrieval-metrics
           (fn [state]
             (let [state (update state :retrievals (fn [rs] (take 500 (conj rs (assoc m :timestamp (System/currentTimeMillis))))))]
               (cond-> state
                 true (update :total-queries inc)
                 true (update :total-time-ms + elapsed)
                 rel? (update :relevant-hits inc)))))))

(defn memory-effectiveness []
  (let [m @retrieval-metrics
        q (:total-queries m)
        t (:total-time-ms m)
        hits (:relevant-hits m)]
    {:avg-retrieval-time-ms (if (pos? q) (double (/ t q)) 0.0)
     :hit-rate (if (pos? q) (double (/ hits q)) 0.0)
     :total-queries q}))

(defn lambda-system-report []
  (let [self (review-effectiveness)
        mem (memory-effectiveness)]
    (println "\n=== λ(system) Metrics ===")
    (println "\n--- λ(self) ---")
    (println "False positive rate:" (format "%.1f" (* 100 (:false-positive-rate self))) "% (target: < 10%)")
    (println "Missed critical rate:" (format "%.1f" (* 100 (:missed-critical-rate self))) "% (target: < 5%)")
    (println "Adoption rate:" (format "%.1f" (* 100 (:adoption-rate self))) "% (target: > 70%)")
    (println "Total reviews:" (:total-reviews self))
    (println "\n--- λ(memory) ---")
    (println "Avg retrieval time:" (format "%.0f" (:avg-retrieval-time-ms mem)) "ms (target: < 1000ms)")
    (println "Hit rate:" (format "%.1f" (* 100 (:hit-rate mem))) "% (target: > 80%)")
    (println "Total queries:" (:total-queries mem))
    (println "")
    {:self self :memory mem}))
