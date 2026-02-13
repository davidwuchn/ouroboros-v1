(ns ouroboros.lane-test
  "Tests for lane-based command queues"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.lane :as lane]))

(use-fixtures :each
  (fn [test-fn]
    (lane/reset-stats!)
    (test-fn)
    ;; Clean up test lanes
    (doseq [id [:test-lane :lane-a :lane-b :sync-lane]]
      (when (lane/lane-exists? id)
        (lane/destroy-lane! id)))
    (lane/reset-stats!)))

(deftest create-lane-test
  (testing "Creating a lane"
    (lane/create-lane! :test-lane)
    (is (lane/lane-exists? :test-lane) "Lane should exist")))

(deftest get-lane-auto-creates-test
  (testing "get-lane auto-creates if missing"
    (let [lane (lane/get-lane :test-lane)]
      (is (some? lane) "Should return a lane")
      (is (lane/lane-exists? :test-lane) "Lane should now exist"))))

(deftest destroy-lane-test
  (testing "Destroying a lane"
    (lane/create-lane! :test-lane)
    (lane/destroy-lane! :test-lane)
    (is (not (lane/lane-exists? :test-lane)) "Lane should not exist")))

(deftest submit-sync-test
  (testing "Synchronous submission and result"
    (let [result (lane/submit!! :sync-lane + [1 2])]
      ;; submit!! returns the callback result (may be wrapped or raw)
      (is (some? result) "Should return a result")
      ;; Extract actual value — may be wrapped in {:status :success :result 3}
      (let [val (if (map? result) (:result result) result)]
        (is (= 3 val) "Should compute 1 + 2 = 3")))))

(deftest session-lane-id-test
  (testing "Session lane ID generation"
    (let [id (lane/session-lane-id :telegram "123")]
      (is (keyword? id) "Should be a keyword")
      (is (re-find #"telegram" (name id)) "Should contain platform"))))

(deftest stats-test
  (testing "Lane statistics"
    (lane/submit!! :sync-lane identity [42])
    (let [stats (lane/stats)]
      (is (map? stats) "Should return a map"))))

(deftest lane-exists-false-test
  (testing "Non-existent lane check"
    (is (not (lane/lane-exists? :definitely-not-a-lane))
        "Non-existent lane should return false")))
