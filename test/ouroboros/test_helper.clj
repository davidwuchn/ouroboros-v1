(ns ouroboros.test-helper
  "Test utilities and fixtures for Ouroboros tests

   Provides:
   - Automatic resolver registration
   - System boot fixture
   - Test data helpers

   Usage:
     (ns my-test
       (:require [ouroboros.test-helper :as th]))

     (use-fixtures :once th/system-fixture)
     (use-fixtures :each th/clean-fixture)"
  (:require
   [clojure.test :refer [use-fixtures]]
   ;; Load all resolver namespaces to trigger registration
   [ouroboros.history]
   [ouroboros.knowledge]
   [ouroboros.api]
   [ouroboros.auth]
   [ouroboros.openapi]

   [ouroboros.chat]
   [ouroboros.metrics]
   [ouroboros.introspection]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.memory :as memory]
   [ouroboros.engine :as engine]
   [ouroboros.query :as query]
   [ouroboros.tool-defs :as tool-defs]
   [ouroboros.tool-registry :as tool-registry]
   [ouroboros.learning]
   [ouroboros.educational-approval]))

;; ============================================================================
;; System Fixtures
;; ============================================================================

(defn system-fixture
  "Boots the full system once for all tests in a namespace

   Usage: (use-fixtures :once system-fixture)"
  [test-fn]
  (when-not (engine/healthy?)
    (println "◈ Booting system for tests...")
    (engine/boot!)
    (query/init!)
    (memory/init!)
    ;; Ensure tools are registered
    (when (zero? (count (tool-registry/list-tools)))
      (tool-defs/register-all-tools!))
    (println "✓ System ready"))
  (test-fn))

(defn clean-fixture
  "Cleans up test state between tests

   Usage: (use-fixtures :each clean-fixture)"
  [test-fn]
  ;; Clear telemetry
  (telemetry/clear-events!)
  ;; Clear test memory keys
  (memory/delete-value! :test-key)
  (memory/delete-value! :key1)
  (memory/delete-value! :key2)
  ;; Run test
  (test-fn))

;; ============================================================================
;; Test Data Helpers
;; ============================================================================

(defn with-test-memory
  "Execute body with test memory values, clean up after"
  [values & body]
  `(try
     (doseq [[k# v#] ~values]
       (memory/save-value! k# v#))
     ~@body
     (finally
       (doseq [[k# _#] ~values]
         (memory/delete-value! k#)))))

(defn wait-for
  "Wait for condition with timeout

   Usage: (wait-for #(= :ready (system-status)) 5000)"
  ([pred] (wait-for pred 5000))
  ([pred timeout-ms]
   (let [start (System/currentTimeMillis)]
     (loop []
       (if (pred)
         true
         (if (> (- (System/currentTimeMillis) start) timeout-ms)
           false
           (do (Thread/sleep 100)
               (recur))))))))

;; ============================================================================
;; Query Helpers
;; ============================================================================

(defn q
  "Query helper that ensures system is booted"
  [query]
  (when-not (engine/healthy?)
    (system-fixture (fn [])))
  (query/q query))

(defn status
  "Get system status"
  []
  (q [:system/status :system/healthy?]))

;; ============================================================================
;; Mock Helpers
;; ============================================================================

(defn mock-tool
  "Create a mock tool for testing

   Usage:
     (mock-tool :test/tool
       {:handler (fn [params] {:result :ok})
        :schema {:type :object}})"
  [tool-name {:keys [handler schema]}]
  (tool-registry/register-tool!
   tool-name
   {:handler handler
    :schema (or schema {:type :object})
    :description (str "Mock tool: " tool-name)}))

(defn unmock-tool
  "Remove a mock tool"
  [tool-name]
  (tool-registry/unregister-tool! tool-name))

(defmacro with-mock-tool
  "Execute body with mock tool, clean up after"
  [tool-name config & body]
  `(try
     (mock-tool ~tool-name ~config)
     ~@body
     (finally
       (unmock-tool ~tool-name))))

;; ============================================================================
;; Assertion Helpers
;; ============================================================================

(defn success?
  "Check if query/tool result was successful"
  [result]
  (= :success (:status result)))

(defn error?
  "Check if query/tool result was an error"
  [result]
  (= :error (:status result)))

(defn has-keys?
  "Check if map has all keys"
  [m keys]
  (every? #(contains? m %) keys))

(comment
  ;; Example usage
  (use-fixtures :once system-fixture)
  (use-fixtures :each clean-fixture)

  ;; Query with auto-boot
  (q [:system/status])

  ;; Mock a tool
  (with-mock-tool :test/echo
    {:handler (fn [params] params)}
    (tool-registry/call-tool :test/echo {:message "hello"})))
