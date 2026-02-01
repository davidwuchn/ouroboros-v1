(ns ouroboros.error-handling-test
  "Error Handling Tests - Verify boundary conditions and error cases

   High Priority: Test system resilience to invalid inputs"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.engine :as engine]
   [ouroboros.query :as query]
   [ouroboros.memory :as memory]
   [ouroboros.tool-registry :as tool-registry]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Test Fixtures
;; ============================================================================

(use-fixtures :once
  (fn [test-fn]
    (when-not (engine/healthy?)
      (engine/boot!)
      (query/init!)
      (memory/init!))
    (test-fn)))

(use-fixtures :each
  (fn [test-fn]
    (telemetry/clear-events!)
    (test-fn)))

;; ============================================================================
;; Query Error Handling
;; ============================================================================

(deftest query-invalid-input-test
  (testing "Query handles invalid inputs gracefully"
    (println "\n[TEST] Query error handling")

    ;; Empty query
    (let [result (query/q [])]
      (is (map? result)
          "Empty query should return map"))

    ;; Invalid attribute
    (let [result (query/q [:nonexistent/attribute])]
      (is (map? result)
          "Invalid attribute should return map, not crash")
      (is (nil? (get result :nonexistent/attribute))
          "Invalid attribute should return nil"))

    ;; Malformed query
    (let [result (query/q "not a valid query")]
      ;; Should handle gracefully
      (is (or (nil? result) (map? result) (string? result))
          "Malformed query should not crash"))

    (println "  ✓ Query error handling works")))

(deftest query-nil-input-test
  (testing "Query handles nil inputs"
    (println "\n[TEST] Query nil handling")

    ;; Nil query
    (let [result (query/q nil)]
      (is (or (nil? result) (map? result))
          "Nil query should be handled"))

    (println "  ✓ Query nil handling works")))

;; ============================================================================
;; Memory Error Handling
;; ============================================================================

(deftest memory-invalid-keys-test
  (testing "Memory handles invalid keys"
    (println "\n[TEST] Memory error handling")

    ;; Nil key
    (is (nil? (memory/get-value nil))
        "Nil key should return nil, not crash")

    ;; Empty key
    (is (nil? (memory/get-value ""))
        "Empty string key should return nil")

    ;; Non-keyword key
    (is (nil? (memory/get-value "string-key"))
        "String key should return nil")))

(deftest memory-invalid-values-test
  (testing "Memory handles invalid values"
    (println "\n[TEST] Memory value handling")

    ;; Nil value (should be allowed)
    (memory/save-value! :test-nil nil)
    (is (nil? (memory/get-value :test-nil))
        "Nil value should be stored and retrieved")

    ;; Complex value
    (memory/save-value! :test-complex {:nested [1 2 3] :data "test"})
    (is (= {:nested [1 2 3] :data "test"}
           (memory/get-value :test-complex))
        "Complex value should be stored correctly")

    ;; Clean up
    (memory/delete-value! :test-nil)
    (memory/delete-value! :test-complex)

    (println "  ✓ Memory value handling works")))

;; ============================================================================
;; Tool Registry Error Handling
;; ============================================================================

(deftest tool-registry-invalid-inputs-test
  (testing "Tool registry handles invalid inputs"
    (println "\n[TEST] Tool registry error handling")

    ;; Unknown tool
    (let [result (tool-registry/call-tool :definitely-not-real {})]
      (is (= :not-found (:status result))
          "Unknown tool should return :not-found")
      (is (string? (:error result))
          "Error message should be present"))

    ;; Nil tool name
    (let [result (tool-registry/call-tool nil {})]
      (is (= :not-found (:status result))
          "Nil tool name should return :not-found"))

    ;; Invalid parameters (should not crash tool)
    (let [result (tool-registry/call-tool :system/status "invalid-params")]
      ;; Should handle gracefully - either succeed or error, not crash
      (is (contains? #{:success :error} (:status result))
          "Invalid params should not crash"))

    (println "  ✓ Tool registry error handling works")))

(deftest tool-registry-concurrent-access-test
  (testing "Tool registry handles concurrent registration"
    (println "\n[TEST] Tool registry concurrency")

    ;; Register multiple tools quickly
    (dotimes [n 10]
      (tool-registry/register-tool!
       (keyword (str "test/concurrent-" n))
       {:description "Test tool"
        :parameters {}
        :fn (fn [_] {:result n})}))

    ;; Verify all registered
    (let [tools (tool-registry/list-tools)]
      (is (>= (count tools) 10)
          "All concurrent tools should be registered"))

    ;; Clean up
    (dotimes [n 10]
      (tool-registry/unregister-tool! (keyword (str "test/concurrent-" n))))

    (println "  ✓ Tool registry concurrency works")))

;; ============================================================================
;; Engine Error Handling
;; ============================================================================

(deftest engine-state-transitions-test
  (testing "Engine handles invalid state transitions"
    (println "\n[TEST] Engine state transitions")

    ;; Check state is valid
    (let [state (engine/current-state)]
      (is (set? state)
          "State should be a set")
      (is (seq state)
          "State should not be empty"))

    ;; Multiple health checks
    (dotimes [_ 5]
      (is (boolean? (engine/healthy?))
          "Health check should return boolean"))

    ;; System status should always work
    (let [status (engine/system-status)]
      (is (map? status))
      (is (contains? status :state))
      (is (contains? status :running?))
      (is (contains? status :ready?)))

    (println "  ✓ Engine state transitions work")))

;; ============================================================================
;; Telemetry Error Handling
;; ============================================================================

(deftest telemetry-invalid-events-test
  (testing "Telemetry handles invalid events"
    (println "\n[TEST] Telemetry error handling")

    ;; Nil event
    (is (nil? (telemetry/emit! nil))
        "Nil event should be handled")

    ;; Empty event
    (is (nil? (telemetry/emit! {}))
        "Empty event should be handled")

    ;; Large event data
    (let [large-data (apply str (repeat 10000 "x"))]
      (telemetry/emit! {:event :test/large :data large-data})
      (is (seq (telemetry/get-events))
          "Large event should be handled"))

    ;; Clear and verify
    (telemetry/clear-events!)
    (is (empty? (telemetry/get-events))
        "Clear should work"))

  (println "  ✓ Telemetry error handling works"))

;; ============================================================================
;; Config Error Handling
;; ============================================================================

(deftest config-invalid-keys-test
  (testing "Config handles invalid keys"
    (println "\n[TEST] Config error handling")

    (require '[ouroboros.config :as config])

    ;; Load config first
    (config/load-config!)

    ;; Invalid key types
    (is (nil? (config/get-config nil))
        "Nil key should return nil")
    (is (nil? (config/get-config "string-key"))
        "String key should return nil")
    (is (nil? (config/get-config 123))
        "Number key should return nil")

    ;; Non-existent nested path
    (is (nil? (config/get-config [:very :deeply :nested :nonexistent :key]))
        "Deep non-existent key should return nil")))

(deftest config-default-values-test
  (testing "Config returns defaults for missing values"
    (println "\n[TEST] Config defaults")

    (require '[ouroboros.config :as config])
    (config/load-config!)

    ;; Default value
    (is (= "default-value"
           (config/get-config :nonexistent/key "default-value"))
        "Should return default for missing key")

    ;; Default for nil key
    (is (= "default"
           (config/get-config nil "default"))
        "Should return default for nil key"))

  (println "  ✓ Config defaults work"))

;; ============================================================================
;; Boundary Condition Tests
;; ============================================================================

(deftest boundary-empty-inputs-test
  (testing "System handles empty inputs at boundaries"
    (println "\n[TEST] Boundary conditions")

    ;; Empty strings
    (let [result (tool-registry/call-tool :file/read {:path ""})]
      (is (contains? #{:success :error} (:status result))
          "Empty path should not crash"))

    ;; Empty collections
    (let [result (tool-registry/call-tool :git/commits {:n 0})]
      (is (= :success (:status result))
          "Zero commits should work"))

    ;; Very large number
    (let [result (tool-registry/call-tool :git/commits {:n 1000000})]
      (is (= :success (:status result))
          "Large n should work"))

    (println "  ✓ Boundary conditions handled")))

(deftest boundary-special-characters-test
  (testing "System handles special characters"
    (println "\n[TEST] Special characters")

    ;; Special characters in strings
    (memory/save-value! :test-special "Hello\nWorld\t!\"#$%&'()*+")
    (is (= "Hello\nWorld\t!\"#$%&'()*+"
           (memory/get-value :test-special))
        "Special characters should be preserved")

    ;; Unicode
    (memory/save-value! :test-unicode "Hello 世界 🌍 مرحبا")
    (is (= "Hello 世界 🌍 مرحبا"
           (memory/get-value :test-unicode))
        "Unicode should be preserved")

    ;; Clean up
    (memory/delete-value! :test-special)
    (memory/delete-value! :test-unicode)

    (println "  ✓ Special characters handled")))

;; ============================================================================
;; Resource Exhaustion Tests
;; ============================================================================

(deftest resource-telemetry-buffer-test
  (testing "Telemetry handles many events"
    (println "\n[TEST] Resource limits")

    ;; Generate many events
    (dotimes [n 100]
      (telemetry/emit! {:event :test/bulk :n n}))

    ;; Should still work
    (let [events (telemetry/get-events)]
      (is (>= (count events) 100)
          "All events should be captured"))

    ;; Recent should work
    (let [recent (telemetry/get-recent 10)]
      (is (= 10 (count recent))
          "Recent 10 should work"))

    ;; Clear
    (telemetry/clear-events!)
    (is (empty? (telemetry/get-events))
        "Clear should work after bulk insert"))

  (println "  ✓ Resource limits handled"))

(comment
  ;; Run tests
  (clojure.test/run-tests 'ouroboros.error-handling-test))