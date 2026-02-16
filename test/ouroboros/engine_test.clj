(ns ouroboros.engine-test
  "Tests for the engine - system lifecycle management"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.engine :as engine]))

(deftest system-status-test
  (testing "System status returns structured data"
    (let [status (engine/system-status)]
      (is (map? status) "Should return a map")
      (is (contains? status :state) "Should have :state")
      (is (contains? status :running?) "Should have :running?")
      (is (contains? status :ready?) "Should have :ready?"))))

(deftest healthy-test
  (testing "Healthy check returns boolean"
    (is (boolean? (engine/healthy?)) "Should return boolean")))

(deftest boot-idempotent-test
  (testing "Booting an already-booted system is safe"
    ;; Boot if not already booted
    (when-not (engine/healthy?)
      (engine/boot!))
    (is (engine/healthy?) "Should be healthy after boot")
    ;; Boot again — should not crash
    (let [result (engine/boot!)]
      (is (engine/healthy?) "Should still be healthy after re-boot"))))

(deftest current-state-test
  (testing "Current state reflects running system"
    (when-not (engine/healthy?)
      (engine/boot!))
    (let [state (engine/current-state)]
      (is (set? state) "Should return a set")
      (is (seq state) "Should have at least one state"))))

(deftest system-chart-exists-test
  (testing "System chart is defined"
    (is (some? engine/system-chart) "System chart should exist")
    (is (map? engine/system-chart) "System chart should be a map")))

(deftest create-session-test
  (testing "Creating a fresh session"
    (let [session (engine/create-session)]
      (is (map? session) "Should return a map")
      (is (contains? session :state) "Should have :state key"))))
