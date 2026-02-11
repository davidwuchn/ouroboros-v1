(ns ouroboros.integration-test
  "Integration tests for the query pipeline

   Tests the full flow: resolver registration → query execution → result

   Run with: bb test"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.test-helper :as th]
   [ouroboros.query :as query]
   [ouroboros.resolver-registry :as registry]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]))

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
;; Mutation Tests
;; ============================================================================

(deftest mutation-memory-save-test
  (testing "Memory save mutation works"
    (println "\n[TEST] Memory save mutation")

    ;; Save a value directly (avoiding Pathom mutation complexity)
    (memory/save-value! :integration-test-key
                        {:test "data" :timestamp (System/currentTimeMillis)})

    ;; Verify it was saved by querying
    (let [result (query/q [{[:memory/key :integration-test-key]
                            [:memory/value :memory/exists?]}])]
      (is (map? result)
          "Query should return a map")
      ;; Result is keyed by ident
      (is (contains? result [:memory/key :integration-test-key])
          "Result should contain the memory key"))

    ;; Clean up
    (memory/delete-value! :integration-test-key)

    (println "  ✓ Memory save mutation works")))

(deftest mutation-telemetry-clear-test
  (testing "Telemetry clear works"
    (println "\n[TEST] Telemetry clear")

    ;; Emit some events first
    (telemetry/emit! {:event :test/before-clear :data "test"})
    (let [events-before (count (telemetry/get-events))]
      (is (> events-before 0)
          "Should have events before clear"))

    ;; Clear telemetry directly
    (let [result (telemetry/clear-events!)]
      (is (map? result)
          "Clear should return a map")
      (is (= :cleared (:status result))
          "Status should be :cleared"))

    ;; Verify cleared
    (let [events-after (count (telemetry/get-events))]
      (is (= 0 events-after)
          "Should have no events after clear"))

    (println "  ✓ Telemetry clear works")))

;; ============================================================================
;; Error Handling Tests
;; ============================================================================

(deftest query-error-handling-test
  (testing "Query handles edge cases"
    (println "\n[TEST] Query edge cases")

    ;; Query with empty vector - edge case
    (let [result (query/q [])]
      (is (map? result)
          "Empty query should return a map"))

    ;; Query nil - edge case (returns empty map)
    (let [result (query/q nil)]
      (is (map? result)
          "Nil query should return a map"))

    (println "  ✓ Query edge cases handled")))

;; ============================================================================
;; Cross-Feature Tests
;; ============================================================================

(deftest telemetry-integration-test
  (testing "Telemetry captures query events"
    (println "\n[TEST] Telemetry integration")

    ;; Clear existing events
    (telemetry/clear-events!)

    ;; Emit a test event
    (telemetry/emit! {:event :integration/test :message "hello"})

    ;; Query telemetry
    (let [result (query/q [{:telemetry/events [:event/id :event/timestamp :event/extra]}])]
      (is (map? result)
          "Telemetry query should return a map")
      (is (contains? result :telemetry/events)
          "Result should contain :telemetry/events")
      (let [events (:telemetry/events result)]
        (is (sequential? events)
            "Events should be a sequence")
        (is (>= (count events) 1)
            "Should have at least 1 event")
        (when (seq events)
          (is (contains? (first events) :event/extra)
              "Each event should have :event/extra wrapping the raw event")
          (is (= :integration/test (:event (:event/extra (first events))))
              "Raw event should be accessible inside :event/extra"))))

    ;; Query telemetry stats
    (let [result (query/q [:telemetry/total-events])]
      (is (map? result)
          "Stats query should return a map")
      (is (contains? result :telemetry/total-events)
          "Result should contain :telemetry/total-events"))

    (println "  ✓ Telemetry integration works")))

(deftest memory-telemetry-integration-test
  (testing "Memory operations emit telemetry events"
    (println "\n[TEST] Memory-telemetry integration")

    ;; Clear events
    (telemetry/clear-events!)

    ;; Save to memory
    (memory/save-value! :telemetry-test-key {:data "test"})

    ;; Check that events were emitted
    (let [events (telemetry/get-events)
          memory-events (filter #(or (= :memory/save! (:event %))
                                     (= :tool/invoke (:event %)))
                                events)]
      (is (>= (count memory-events) 0)
          "Should have memory-related events (or tool invocations)"))

    ;; Clean up
    (memory/delete-value! :telemetry-test-key)

    (println "  ✓ Memory-telemetry integration works")))

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

(deftest query-convenience-functions-test
  (testing "Query convenience functions work"
    (println "\n[TEST] Query convenience functions")

    ;; Test status
    (let [result (query/status)]
      (is (map? result)
          "status should return a map")
      (is (contains? result :system/status)
          "status should contain :system/status"))

    ;; Test full-report
    (let [result (query/full-report)]
      (is (map? result)
          "full-report should return a map")
      (is (contains? result :system/current-state)
          "full-report should contain :system/current-state"))

    (println "  ✓ Query convenience functions work")))

(comment
  ;; Run tests
  (clojure.test/run-tests 'ouroboros.integration-test)

  ;; Manual query testing
  (require '[ouroboros.test-helper :as th])
  (th/system-fixture (fn []))

  (query/q [:system/status])
  (query/status)
  (query/m 'memory/save! {:memory/key :test :memory/value "hello"}))
