(ns scripts.test-webux-jvm
  "Run WebUX Platform tests with JVM Clojure (not Babashka)"
  (:require
   [clojure.test :as t]
   ;; Load test namespaces (triggers fixture registration)
   [ouroboros.webux-test]
   [ouroboros.wisdom-test]
   [ouroboros.analytics-test]))

(defn -main
  "Run WebUX tests and exit with appropriate code"
  [& args]
  (println "\n========================================")
  (println "  Running WebUX Platform Tests")
  (println "========================================")
  (println "NOTE: Running with JVM Clojure (deps.edn)")
  (println "      Some tests use http-kit WebSocket server\n")
  
  (let [test-results (map t/run-tests
                            ['ouroboros.webux-test
                             'ouroboros.wisdom-test
                             'ouroboros.analytics-test])
        results (reduce (fn [acc r]
                          (merge-with + acc (select-keys r [:test :pass :fail :error])))
                        {:test 0 :pass 0 :fail 0 :error 0}
                        test-results)]
    (println "\n========================================")
    (println "  WebUX Test Results")
    (println "========================================")
    (println (str "  Tests: " (:test results)))
    (println (str "  Assertions: " (:pass results)))
    (println (str "  Failures: " (:fail results)))
    (println (str "  Errors: " (:error results)))
    (when (and (zero? (:fail results))
               (zero? (:error results)))
      (println "\n  ALL WEBUX TESTS PASSED!"))
    (System/exit (if (and (zero? (:fail results))
                          (zero? (:error results)))
                   0 1))))