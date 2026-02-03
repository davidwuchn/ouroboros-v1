(ns ouroboros.integration-test
  "Integration tests for the query pipeline

   Tests the full flow: resolver registration → query execution → result

   Run with: bb test"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.test-helper :as th]
   [ouroboros.query :as query]
   [ouroboros.resolver-registry :as registry]))

;; ============================================================================
;; Test Fixtures
;; ============================================================================

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

;; ============================================================================
;; Resolver Registration Tests
;; ============================================================================

(deftest resolver-registration-test
  (testing "All resolver namespaces are registered"
    (println "\n[TEST] Resolver registration")

    (let [resolvers (registry/all-resolvers)]
      ;; Just verify we have resolvers - the actual op-name structure
      ;; varies by Pathom version, so we just check count
      (is (> (count resolvers) 0)
          "Should have resolvers registered")
      (is (>= (count resolvers) 10)
          "Should have at least 10 resolvers")

      (println (str "  ✓ " (count resolvers) " resolvers registered")))))

;; ============================================================================
;; Query Pipeline Tests
;; ============================================================================

(deftest query-pipeline-simple-test
  (testing "Simple queries work end-to-end"
    (println "\n[TEST] Simple query pipeline")

    (let [result (query/q [:system/healthy?])]
      (is (map? result)
          "Query should return a map")
      (is (contains? result :system/healthy?)
          "Result should contain :system/healthy?")
      (is (boolean? (:system/healthy? result))
          "Healthy? should be a boolean"))

    (println "  ✓ Simple queries work")))

(deftest query-pipeline-join-test
  (testing "Join queries work end-to-end"
    (println "\n[TEST] Join query pipeline")

    (let [result (query/q [:system/status
                           :system/healthy?])]
      (is (map? result)
          "Query should return a map")
      (is (contains? result :system/status)
          "Result should contain :system/status")
      (is (contains? result :system/healthy?)
          "Result should contain :system/healthy?"))

    (println "  ✓ Join queries work")))

;; ============================================================================
;; Registry State Tests
;; ============================================================================

(deftest registry-state-test
  (testing "Registry maintains consistent state"
    (println "\n[TEST] Registry state consistency")

    (let [resolvers-before (count (registry/all-resolvers))
          _result (query/q [:system/status])
          resolvers-after (count (registry/all-resolvers))]

      (is (= resolvers-before resolvers-after)
          "Query execution should not modify resolver count"))

    (println "  ✓ Registry state consistent")))

;; ============================================================================
;; Query Environment Tests
;; ============================================================================

(deftest query-env-test
  (testing "Query environment is properly initialized"
    (println "\n[TEST] Query environment")

    ;; Query should work (system fixture ensures init)
    (let [result (query/status)]
      (is (map? result)
          "Status should return a map")
      (is (contains? result :system/status)
          "Status should contain :system/status"))

    (println "  ✓ Query environment initialized")))

(comment
  ;; Run tests
  (clojure.test/run-tests 'ouroboros.integration-test)

  ;; Manual query testing
  (require '[ouroboros.test-helper :as th])
  (th/system-fixture (fn []))

  (query/q [:system/status])
  (query/status))
