#!/usr/bin/env bb

(ns test-webux
  (:require
   [clojure.test :as t]
   [ouroboros.test-helper :as th]
   [ouroboros.webux-integration-test]))

;; Run system fixture once
(th/system-fixture
  (fn []
    (println "=== Running WebUX Integration Tests ===")
    (let [results (t/run-tests 'ouroboros.webux-integration-test)]
      (println "\n=== Test Results ===")
      (println "Tests:" (:test results))
      (println "Assertions:" (:pass results))
      (println "Failures:" (:fail results))
      (println "Errors:" (:error results))
      
      (System/exit (if (and (zero? (:fail results))
                            (zero? (:error results)))
                     0 1)))))