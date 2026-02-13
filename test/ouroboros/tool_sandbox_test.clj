(ns ouroboros.tool-sandbox-test
  "Tests for the tool sandbox - safety constraints"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.tool-sandbox :as sandbox]))

(use-fixtures :each
  (fn [test-fn]
    (sandbox/reset-stats!)
    (test-fn)))

(deftest execute-simple-test
  (testing "Executing a simple function"
    (let [result (sandbox/execute! :test/echo (fn [params] {:echo params}) {:msg "hi"})]
      (is (map? result) "Should return a map")
      (is (= :success (:status result)) "Should succeed")
      (is (= {:msg "hi"} (:echo (:result result))) "Result should contain echoed params"))))

(deftest execute-with-timeout-test
  (testing "Execution times out properly"
    (let [result (sandbox/execute! :test/slow
                   (fn [_] (Thread/sleep 5000) :done)
                   {}
                   {:timeout-ms 100})]
      (is (= :timeout (:status result)) "Should timeout"))))

(deftest execute-safe-test
  (testing "Safe execution catches all throwables"
    (let [result (sandbox/execute-safe! :test/crash
                   (fn [_] (throw (Exception. "boom")))
                   {})]
      (is (map? result) "Should return a map even on error")
      (is (= :error (:status result)) "Should have error status"))))

(deftest get-constraints-test
  (testing "Getting constraints for a tool"
    (let [constraints (sandbox/get-constraints :file/read)]
      (is (map? constraints) "Should return a map")
      (is (number? (:timeout-ms constraints)) "Should have timeout"))))

(deftest default-constraints-test
  (testing "Default constraints are defined"
    (is (map? sandbox/default-constraints))
    (is (pos? (:timeout-ms sandbox/default-constraints)))))

(deftest stats-test
  (testing "Sandbox statistics"
    (sandbox/execute! :test/stat (fn [_] :ok) {})
    (let [stats (sandbox/get-stats)]
      (is (map? stats) "Should return stats map")
      (is (pos? (:executions stats)) "Should have at least 1 execution"))))

(deftest health-check-test
  (testing "Sandbox health check"
    (let [health (sandbox/health-check)]
      (is (map? health) "Should return health map"))))

(deftest execute-batch-test
  (testing "Batch execution"
    (let [results (sandbox/execute-batch!
                    [[:test/a (fn [_] {:a 1}) {}]
                     [:test/b (fn [_] {:b 2}) {}]])]
      (is (map? results) "Should return a map of results")
      (is (contains? results :test/a) "Should have result for :test/a")
      (is (contains? results :test/b) "Should have result for :test/b"))))
