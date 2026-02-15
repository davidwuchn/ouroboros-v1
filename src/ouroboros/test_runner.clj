(ns ouroboros.test-runner
  "Test runner utilities for bb.edn tasks.
   Supports both Babashka and JVM Clojure test environments."
  (:require
   [clojure.test :as t]
   [clojure.string :as str]))

(defn run-suites
  "Run test suites and exit with appropriate code.
   
   Args:
     label - Header label for output
     namespaces - Vector of test namespace symbols
   
   Exits with code 0 if all pass, 1 otherwise."
  [label namespaces]
  (println (str "\n=== " label " ==="))
  (doseq [ns namespaces] (require ns))
  (let [results (mapv t/run-tests namespaces)
        sum (fn [k] (transduce (map k) + 0 results))]
    (println "\n=== Results ===")
    (println "Tests:" (sum :test) "Pass:" (sum :pass)
             "Fail:" (sum :fail) "Error:" (sum :error))
    (when (and (zero? (sum :fail)) (zero? (sum :error)))
      (println "ALL TESTS PASSED!"))
    (System/exit (if (and (zero? (sum :fail)) (zero? (sum :error))) 0 1))))
