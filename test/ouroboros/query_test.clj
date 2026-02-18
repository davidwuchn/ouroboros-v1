(ns ouroboros.query-test
  (:require [clojure.test :refer :all]
            [ouroboros.query :as query]
            [ouroboros.engine :as engine]
            [clojure.java.io :as io]))

;; Test fixtures
(def test-env nil)

(defn setup [f]
  (reset! engine/system-state {:status :running})
  (f))

(use-fixtures :each setup)

;; ============================================================================
;; System Resolver Tests
;; ============================================================================

(deftest test-system-state-resolver
  (testing "system-state resolver returns current state"
    (let [result (query/system-state {})]
      (is (map? result))
      (is (contains? result :system/current-state)))))

(deftest test-system-status-resolver
  (testing "system-status resolver returns status"
    (let [result (query/system-status-resolver {})]
      (is (map? result))
      (is (contains? result :system/status)))))

(deftest test-system-healthy-resolver
  (testing "system-healthy resolver returns boolean"
    (let [result (query/system-healthy {})]
      (is (map? result))
      (is (contains? result :system/healthy?)))))

(deftest test-system-meta-resolver
  (testing "system-meta resolver returns version info"
    (let [result (query/system-meta {})]
      (is (map? result))
      (is (contains? result :system/meta))
      (is (contains? (:system/meta result) :version)))))

;; ============================================================================
;; Health Check Tests
;; ============================================================================

(deftest test-system-healthy-when-running
  (testing "System reports healthy when status is running"
    (reset! engine/system-state {:status :running})
    (let [result (query/system-healthy {})]
      (is (= true (:system/healthy? result))))))

(deftest test-system-not-healthy-when-stopped
  (testing "System reports not healthy when status is stopped"
    (reset! engine/system-state {:status :stopped})
    (let [result (query/system-healthy {})]
      (is (= false (:system/healthy? result))))))

;; ============================================================================
;; Integration Tests
;; ============================================================================

(deftest test-query-interface
  (testing "Query interface works"
    (let [result (query/q [:system/status])]
      (is (map? result)))))

(deftest test-system-resolvers-return-data
  (testing "All system resolvers return expected data"
    (let [status (query/q [:system/status])
          healthy (query/q [:system/healthy?])
          meta (query/q [:system/meta])]
      (is (map? status))
      (is (map? healthy))
      (is (map? meta)))))

;; ============================================================================
;; Run Tests
;; ============================================================================

(comment
  (run-tests))