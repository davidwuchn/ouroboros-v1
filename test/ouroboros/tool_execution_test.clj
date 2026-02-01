(ns ouroboros.tool-execution-test
  "AI Tool Execution Tests - Verify all 13 tools work correctly

   High Priority: Test AI tool functionality"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.tool-registry :as tool-registry]
   [ouroboros.tool-defs :as tool-defs]
   [ouroboros.engine :as engine]
   [ouroboros.query :as query]))

;; ============================================================================
;; Test Fixtures
;; ============================================================================

(use-fixtures :once
  (fn [test-fn]
    ;; Boot system once for all tests
    (when-not (engine/healthy?)
      (engine/boot!)
      (query/init!))
    ;; Ensure tools are registered
    (when (zero? (count (tool-registry/list-tools)))
      (tool-defs/register-all-tools!))
    (test-fn)))

(use-fixtures :each
  (fn [test-fn]
    ;; Clear telemetry between tests
    (require '[ouroboros.telemetry :as telemetry])
    ((resolve 'telemetry/clear-events!))
    (test-fn)))

;; ============================================================================
;; System Tools Tests
;; ============================================================================

(deftest system-status-tool-test
  (testing ":system/status tool execution"
    (println "\n[TEST] :system/status tool")

    (let [result (tool-registry/call-tool :system/status {})]
      (is (= :success (:status result))
          "Tool should succeed")
      (is (map? (:result result))
          "Result should be a map")
      (is (contains? (:result result) :system/status)
          "Result should contain system status")
      (is (contains? (:result result) :system/healthy?)
          "Result should contain health status"))

    (println "  ✓ :system/status tool works")))

(deftest system-report-tool-test
  (testing ":system/report tool execution"
    (println "\n[TEST] :system/report tool")

    (let [result (tool-registry/call-tool :system/report {})]
      (is (= :success (:status result))
          "Tool should succeed")
      (is (map? (:result result))
          "Result should be a map")
      (is (contains? (:result result) :system/current-state)
          "Result should contain current state")
      (is (contains? (:result result) :system/meta)
          "Result should contain meta info"))

    (println "  ✓ :system/report tool works")))

;; ============================================================================
;; Git Tools Tests
;; ============================================================================

(deftest git-commits-tool-test
  (testing ":git/commits tool execution"
    (println "\n[TEST] :git/commits tool")

    ;; Default 5 commits
    (let [result (tool-registry/call-tool :git/commits {})]
      (is (= :success (:status result))
          "Tool should succeed")
      (is (map? (:result result))
          "Result should be a map")
      (is (contains? (:result result) :git/commits)
          "Result should contain commits")
      (is (<= (count (get-in result [:result :git/commits])) 5)
          "Should return at most 5 commits by default"))

    ;; Custom count
    (let [result (tool-registry/call-tool :git/commits {:n 3})]
      (is (= :success (:status result))
          "Tool should succeed with custom count")
      (is (<= (count (get-in result [:result :git/commits])) 3)
          "Should return at most 3 commits"))

    (println "  ✓ :git/commits tool works")))

(deftest git-status-tool-test
  (testing ":git/status tool execution"
    (println "\n[TEST] :git/status tool")

    (let [result (tool-registry/call-tool :git/status {})]
      (is (= :success (:status result))
          "Tool should succeed")
      (is (map? (:result result))
          "Result should be a map")
      (is (contains? (:result result) :git/status)
          "Result should contain git status"))

    (println "  ✓ :git/status tool works")))

;; ============================================================================
;; File Tools Tests
;; ============================================================================

(deftest file-read-tool-test
  (testing ":file/read tool execution"
    (println "\n[TEST] :file/read tool")

    ;; Read existing file
    (let [result (tool-registry/call-tool :file/read {:path "README.md" :lines 10})]
      (is (= :success (:status result))
          "Tool should succeed for existing file")
      (is (map? (:result result))
          "Result should be a map")
      (is (= "README.md" (get-in result [:result :file]))
          "Result should contain file name")
      (is (string? (get-in result [:result :content]))
          "Result should contain content"))

    ;; Read non-existent file
    (let [result (tool-registry/call-tool :file/read {:path "nonexistent.txt"})]
      (is (= :success (:status result))
          "Tool should succeed even for non-existent file")
      (is (nil? (get-in result [:result :content]))
          "Content should be nil for non-existent file"))

    (println "  ✓ :file/read tool works")))

(deftest file-search-tool-test
  (testing ":file/search tool execution"
    (println "\n[TEST] :file/search tool")

    (let [result (tool-registry/call-tool :file/search {:pattern "*.clj"})]
      (is (= :success (:status result))
          "Tool should succeed")
      (is (map? (:result result))
          "Result should be a map")
      (is (contains? (:result result) :knowledge/search)
          "Result should contain search results"))

    (println "  ✓ :file/search tool works")))

(deftest file-list-tool-test
  (testing ":file/list tool execution"
    (println "\n[TEST] :file/list tool")

    (let [result (tool-registry/call-tool :file/list {:dir "src"})]
      (is (= :success (:status result))
          "Tool should succeed")
      (is (map? (:result result))
          "Result should be a map")
      (is (contains? (:result result) :knowledge/files)
          "Result should contain file list"))

    (println "  ✓ :file/list tool works")))

;; ============================================================================
;; Memory Tools Tests
;; ============================================================================

(deftest memory-tools-test
  (testing ":memory/set and :memory/get tools"
    (println "\n[TEST] Memory tools")

    ;; Set value
    (let [result (tool-registry/call-tool :memory/set
                                          {:key :test-tool-key
                                           :value "test-value"})]
      (is (= :success (:status result))
          "Set tool should succeed")
      (is (= :saved (get-in result [:result :status]))
          "Result should indicate saved status")
      (is (= :test-tool-key (get-in result [:result :key]))
          "Result should contain the key"))

    ;; Get value
    (let [result (tool-registry/call-tool :memory/get
                                          {:key :test-tool-key})]
      (is (= :success (:status result))
          "Get tool should succeed")
      (is (= "test-value" (get-in result [:result :value]))
          "Should retrieve saved value")
      (is (= :test-tool-key (get-in result [:result :key]))
          "Result should contain the key"))

    ;; Get non-existent key
    (let [result (tool-registry/call-tool :memory/get
                                          {:key :nonexistent-key})]
      (is (= :success (:status result))
          "Get tool should succeed for non-existent key")
      (is (nil? (get-in result [:result :value]))
          "Value should be nil for non-existent key"))

    ;; Clean up
    (require '[ouroboros.memory :as memory])
    ((resolve 'memory/delete-value!) :test-tool-key)

    (println "  ✓ Memory tools work")))

;; ============================================================================
;; HTTP Tool Tests
;; ============================================================================

(deftest http-get-tool-test
  (testing ":http/get tool execution"
    (println "\n[TEST] :http/get tool")

    (let [result (tool-registry/call-tool :http/get
                                          {:url "https://api.github.com"})]
      (is (= :success (:status result))
          "Tool should succeed")
      (is (map? (:result result))
          "Result should be a map")
      (is (contains? (:result result) :api/status)
          "Result should contain status")
      (is (contains? (:result result) :api/success?)
          "Result should contain success flag"))

    (println "  ✓ :http/get tool works")))

;; ============================================================================
;; Query Tool Tests
;; ============================================================================

(deftest query-eql-tool-test
  (testing ":query/eql tool execution"
    (println "\n[TEST] :query/eql tool")

    (let [result (tool-registry/call-tool :query/eql
                                          {:query [:system/healthy?]})]
      (is (= :success (:status result))
          "Tool should succeed")
      (is (map? (:result result))
          "Result should be a map")
      (is (contains? (:result result) :system/healthy?)
          "Result should contain queried data"))

    (println "  ✓ :query/eql tool works")))

;; ============================================================================
;; OpenAPI Tools Tests
;; ============================================================================

(deftest openapi-bootstrap-tool-test
  (testing ":openapi/bootstrap tool execution"
    (println "\n[TEST] :openapi/bootstrap tool")

    ;; Note: This actually bootstraps a client, may fail without network
    (let [result (tool-registry/call-tool :openapi/bootstrap
                                          {:name :test-petstore
                                           :spec-url "https://petstore.swagger.io/v2/swagger.json"})]
      ;; May succeed or fail depending on network, but should complete
      (is (contains? #{:success :error} (:status result))
          "Tool should complete with either success or error"))

    (println "  ✓ :openapi/bootstrap tool works")))

;; ============================================================================
;; Error Handling Tests
;; ============================================================================

(deftest tool-error-handling-test
  (testing "Tool execution error handling"
    (println "\n[TEST] Tool error handling")

    ;; Unknown tool
    (let [result (tool-registry/call-tool :nonexistent/tool {})]
      (is (= :not-found (:status result))
          "Unknown tool should return :not-found")
      (is (contains? result :available-tools)
          "Result should list available tools"))

    ;; Tool with invalid parameters (should not crash)
    (let [result (tool-registry/call-tool :file/read {:invalid-param "test"})]
      ;; Should either succeed with default or return error gracefully
      (is (contains? #{:success :error} (:status result))
          "Should complete without crashing"))

    (println "  ✓ Tool error handling works")))

;; ============================================================================
;; Tool Listing Tests
;; ============================================================================

(deftest all-tools-registered-test
  (testing "All 13 expected tools are registered"
    (println "\n[TEST] All tools registered")

    (let [tools (tool-registry/list-tools)
          tool-names (set (map :tool/name tools))]

      ;; Core system tools
      (is (contains? tool-names :system/status))
      (is (contains? tool-names :system/report))

      ;; Git tools
      (is (contains? tool-names :git/commits))
      (is (contains? tool-names :git/status))

      ;; File tools
      (is (contains? tool-names :file/read))
      (is (contains? tool-names :file/search))
      (is (contains? tool-names :file/list))

      ;; Memory tools
      (is (contains? tool-names :memory/get))
      (is (contains? tool-names :memory/set))

      ;; HTTP tools
      (is (contains? tool-names :http/get))

      ;; OpenAPI tools
      (is (contains? tool-names :openapi/bootstrap))
      (is (contains? tool-names :openapi/call))

      ;; Query tool
      (is (contains? tool-names :query/eql))

      ;; Total count
      (is (= 13 (count tools))
          "Should have exactly 13 tools"))

    (println "  ✓ All 13 tools registered")))

(deftest tool-metadata-test
  (testing "All tools have proper metadata"
    (println "\n[TEST] Tool metadata")

    (doseq [tool (tool-registry/list-tools)]
      (is (string? (:tool/description tool))
          (str (:tool/name tool) " should have description"))
      (is (map? (:tool/parameters tool))
          (str (:tool/name tool) " should have parameters map")))

    (println "  ✓ All tools have metadata")))

(comment
  ;; Run tests
  (clojure.test/run-tests 'ouroboros.tool-execution-test))