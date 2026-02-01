(ns ouroboros.core-test
  "Core system tests - verify Engine, Query, and Interface functionality
   
   Run with: bb test"
  (:require
   [clojure.test :refer [deftest is testing run-tests]]
   [ouroboros.engine :as engine]
   [ouroboros.query :as query]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.config :as config]))

;; ============================================================================
;; Engine Tests
;; ============================================================================

(deftest engine-lifecycle-test
  (testing "Engine statechart lifecycle"
    (println "\n[TEST] Engine lifecycle")
    
    ;; Get current state (returns a set of states)
    (let [state (engine/current-state)]
      (is (set? state)
          "Engine state should be a set")
      (is (some #(contains? #{:ouroboros.engine/uninitialized
                              :ouroboros.engine/stopped
                              :ouroboros.engine/running} %)
                state)
          "Engine should be in a valid state"))
    
    ;; Boot if not running
    (when-not (engine/healthy?)
      (engine/boot!))
    
    ;; Verify running
    (is (engine/healthy?)
        "Engine should report healthy")
    
    (let [state (engine/current-state)]
      (is (contains? state :ouroboros.engine/running)
          "Engine should contain :running state"))
    
    (println "  ✓ Engine lifecycle verified")))

(deftest engine-system-status-test
  (testing "Engine system status query"
    (println "\n[TEST] Engine system status")
    
    (let [status (engine/system-status)]
      (is (map? status)
          "System status should be a map")
      (is (contains? status :state)
          "Status should contain :state")
      (is (contains? status :running?)
          "Status should contain :running?"))
    
    (println "  ✓ System status verified")))

;; ============================================================================
;; Query Tests
;; ============================================================================

(deftest query-initialization-test
  (testing "Query environment initialization"
    (println "\n[TEST] Query initialization")
    
    ;; Ensure query is initialized
    (query/init!)
    
    ;; Test that queries work (indicates env is initialized)
    (let [result (query/status)]
      (is (map? result)
          "Query status should return a map"))
    
    (println "  ✓ Query environment verified")))

(deftest query-basic-test
  (testing "Basic EQL queries"
    (println "\n[TEST] Basic EQL queries")
    
    ;; System status query
    (let [result (query/q [:system/status])]
      (is (map? result)
          "System status query should return a map")
      (is (contains? result :system/status)
          "Result should contain :system/status"))
    
    ;; Health check
    (let [result (query/q [:system/healthy?])]
      (is (map? result)
          "Health query should return a map")
      (is (contains? result :system/healthy?)
          "Result should contain :system/healthy?"))
    
    (println "  ✓ Basic queries verified")))

(deftest query-git-test
  (testing "Git resolvers"
    (println "\n[TEST] Git resolvers")
    
    (let [result (query/q [:git/status])]
      (is (map? result)
          "Git status should return a map")
      (is (contains? result :git/status)
          "Result should contain :git/status"))
    
    (let [result (query/q [{:git/commits [:git/hash :git/subject]}])]
      (is (map? result)
          "Git commits query should return a map")
      (is (contains? result :git/commits)
          "Result should contain :git/commits"))
    
    (println "  ✓ Git resolvers verified")))

;; ============================================================================
;; Memory Tests
;; ============================================================================

(deftest memory-operations-test
  (testing "Memory save and retrieve"
    (println "\n[TEST] Memory operations")
    
    ;; Initialize memory
    (memory/init!)
    
    ;; Save a value
    (memory/save-value! :test-key "test-value")
    
    ;; Retrieve it
    (let [value (memory/get-value :test-key)]
      (is (= "test-value" value)
          "Should retrieve saved value"))
    
    ;; Clean up
    (memory/delete-value! :test-key)
    
    (is (nil? (memory/get-value :test-key))
        "Value should be deleted")
    
    (println "  ✓ Memory operations verified")))

(deftest memory-keys-test
  (testing "Memory keys listing"
    (println "\n[TEST] Memory keys")
    
    (memory/save-value! :key1 "value1")
    (memory/save-value! :key2 "value2")
    
    (let [all-data (memory/get-all)
          keys (keys all-data)]
      (is (seq keys)
          "Should have memory keys")
      (is (every? keyword? keys)
          "Keys should be keywords"))
    
    ;; Clean up
    (memory/delete-value! :key1)
    (memory/delete-value! :key2)
    
    (println "  ✓ Memory keys verified")))

;; ============================================================================
;; Telemetry Tests
;; ============================================================================

(deftest telemetry-event-test
  (testing "Telemetry event emission"
    (println "\n[TEST] Telemetry events")
    
    ;; Clear existing events
    (telemetry/clear-events!)
    
    ;; Emit an event
    (telemetry/emit! {:event :test/event :data "test"})
    
    ;; Verify event was captured
    (let [events (telemetry/get-events)]
      (is (seq events)
          "Should have telemetry events")
      (is (= :test/event (:event (first events)))
          "Event should have correct type"))
    
    (println "  ✓ Telemetry events verified")))

(deftest telemetry-stats-test
  (testing "Telemetry statistics"
    (println "\n[TEST] Telemetry stats")
    
    ;; Clear and add events
    (telemetry/clear-events!)
    (telemetry/emit! {:event :test/event1})
    (telemetry/emit! {:event :test/event2})
    
    ;; Verify events count via get-events
    (let [events (telemetry/get-events)]
      (is (= 2 (count events))
          "Should have 2 events"))
    
    (println "  ✓ Telemetry stats verified")))

;; ============================================================================
;; Configuration Tests
;; ============================================================================

(deftest config-loading-test
  (testing "Configuration loading"
    (println "\n[TEST] Configuration")
    
    ;; Load config
    (config/load-config!)
    
    ;; Verify config is cached
    (is (some? @config/config-cache)
        "Config should be cached")
    
    ;; Verify default values exist
    (let [model (config/get-config [:ai :openai :model])]
      (is (string? model)
          "Should have default model"))
    
    (println "  ✓ Configuration verified")))

;; ============================================================================
;; Test Runner
;; ============================================================================

(defn run-all-tests
  "Run all tests and report results"
  []
  (println "\n========================================")
  (println "  Ouroboros System Tests")
  (println "========================================")
  
  ;; Boot system if needed
  (when-not (= :running (engine/current-state))
    (println "\n◈ Booting system for tests...")
    (engine/boot!)
    (query/init!)
    (memory/init!))
  
  (let [results (run-tests 'ouroboros.core-test)]
    (println "\n========================================")
    (println "  Test Summary")
    (println "========================================")
    (println (str "  Tests: " (:test results)))
    (println (str "  Passed: " (:pass results)))
    (println (str "  Failed: " (:fail results)))
    (println (str "  Errors: " (:error results)))
    
    (when (and (zero? (:fail results))
               (zero? (:error results)))
      (println "\n  ✓ All tests passed!"))
    
    results))

;; Run tests when namespace is loaded (for bb task)
(when (= *file* (System/getProperty "babashka.file"))
  (run-all-tests))