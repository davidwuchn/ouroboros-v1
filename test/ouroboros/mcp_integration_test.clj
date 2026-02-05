(ns ouroboros.mcp-integration-test
  "Integration tests for MCP Server
   
   Tests:
   - Tool filtering (unique tools only)
   - MCP protocol compliance
   - Tool invocation flow
   - Error handling
   - ECA → MCP → Ouroboros flow simulation
   
   Run with: bb test"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [clojure.string :as str]
   [ouroboros.test-helper :as th]
   [ouroboros.mcp :as mcp]
   [ouroboros.tool-registry :as registry]
   [ouroboros.tool-defs :as tool-defs]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Test Fixtures
;; ============================================================================

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

;; ============================================================================
;; Tool Filtering Tests
;; ============================================================================

(deftest mcp-tool-filtering-test
  (testing "MCP exposes only unique Ouroboros tools"
    (println "\n[TEST] MCP tool filtering")

    (let [mcp-tools (mcp/list-mcp-tools)
          tool-names (set (map :name mcp-tools))]

      ;; Should include unique tools
      (is (contains? tool-names "git/commits")
          "Should expose git/commits (unique to Ouroboros)")
      (is (contains? tool-names "git/status")
          "Should expose git/status (unique to Ouroboros)")
      (is (contains? tool-names "memory/get")
          "Should expose memory/get (unique to Ouroboros)")
      (is (contains? tool-names "memory/set")
          "Should expose memory/set (unique to Ouroboros)")
      (is (contains? tool-names "system/status")
          "Should expose system/status (unique to Ouroboros)")
      (is (contains? tool-names "openapi/bootstrap")
          "Should expose openapi/bootstrap (unique to Ouroboros)")

      ;; Should NOT include redundant tools (ECA has these)
      (is (not (contains? tool-names "file/read"))
          "Should NOT expose file/read (ECA has built-in)")
      (is (not (contains? tool-names "file/search"))
          "Should NOT expose file/search (ECA has grep/find)")
      (is (not (contains? tool-names "file/list"))
          "Should NOT expose file/list (ECA has built-in)")
      (is (not (contains? tool-names "http/get"))
          "Should NOT expose http/get (ECA has http capabilities)")

      (println (str "  ✓ MCP exposes " (count mcp-tools) " unique tools"))
      (println (str "  ✓ Unique tools: " (str/join ", " (sort tool-names)))))))

(deftest mcp-tool-metadata-test
  (testing "MCP tools have proper metadata"
    (println "\n[TEST] MCP tool metadata")

    (let [mcp-tools (mcp/list-mcp-tools)]
      ;; All tools should have required fields
      (doseq [tool mcp-tools]
        (is (string? (:name tool))
            (str "Tool name should be string: " (:name tool)))
        (is (string? (:description tool))
            (str "Tool should have description: " (:name tool)))
        (is (map? (:inputSchema tool))
            (str "Tool should have inputSchema: " (:name tool)))
        (is (= "object" (get-in tool [:inputSchema :type]))
            (str "inputSchema type should be object: " (:name tool))))

      (println (str "  ✓ All " (count mcp-tools) " tools have proper metadata")))))

;; ============================================================================
;; MCP Protocol Tests
;; ============================================================================

(deftest mcp-initialize-test
  (testing "MCP initialize handshake"
    (println "\n[TEST] MCP initialize")

    (let [response (mcp/handle-request
                     {:jsonrpc "2.0"
                      :id 1
                      :method "initialize"
                      :params {:protocolVersion "2024-11-05"
                               :capabilities {}
                               :clientInfo {:name "test-client" :version "1.0"}}})]

      (is (map? response)
          "Initialize should return a map")
      (is (= "2.0" (:jsonrpc response))
          "Should return JSON-RPC 2.0")
      (is (= 1 (:id response))
          "Should return same ID")
      (is (map? (:result response))
          "Should have result")
      (is (= "2024-11-05" (get-in response [:result :protocolVersion]))
          "Should return protocol version")
      (is (map? (get-in response [:result :capabilities]))
          "Should return capabilities")
      (is (map? (get-in response [:result :serverInfo]))
          "Should return server info"))

    (println "  ✓ MCP initialize works")))

(deftest mcp-tools-list-test
  (testing "MCP tools/list request"
    (println "\n[TEST] MCP tools/list")

    (let [response (mcp/handle-request
                     {:jsonrpc "2.0"
                      :id 2
                      :method "tools/list"
                      :params {}})]

      (is (map? response)
          "tools/list should return a map")
      (is (= "2.0" (:jsonrpc response))
          "Should return JSON-RPC 2.0")
      (is (= 2 (:id response))
          "Should return same ID")
      (is (sequential? (get-in response [:result :tools]))
          "Should return tools array")

      ;; Check tools are unique only
      (let [tools (get-in response [:result :tools])
            tool-names (set (map :name tools))]
        (is (contains? tool-names "git/commits")
            "Should include git/commits")
        (is (not (contains? tool-names "file/read"))
            "Should NOT include file/read")))

    (println "  ✓ MCP tools/list works")))

(deftest mcp-tools-call-test
  (testing "MCP tools/call request"
    (println "\n[TEST] MCP tools/call")

    ;; Test successful call
    (let [response (mcp/handle-request
                     {:jsonrpc "2.0"
                      :id 3
                      :method "tools/call"
                      :params {:name "system/status"
                               :arguments {}}})]

      (is (map? response)
          "tools/call should return a map")
      (is (= "2.0" (:jsonrpc response))
          "Should return JSON-RPC 2.0")
      (is (= 3 (:id response))
          "Should return same ID")
      (is (map? (:result response))
          "Should have result")
      (is (sequential? (get-in response [:result :content]))
          "Should have content array")
      (is (false? (get-in response [:result :isError]))
          "Should not be error for valid call"))

    (println "  ✓ MCP tools/call works")))

(deftest mcp-invalid-method-test
  (testing "MCP invalid method returns error"
    (println "\n[TEST] MCP invalid method")

    (let [response (mcp/handle-request
                     {:jsonrpc "2.0"
                      :id 4
                      :method "invalid/method"
                      :params {}})]

      (is (map? response)
          "Invalid method should return a map")
      (is (= "2.0" (:jsonrpc response))
          "Should return JSON-RPC 2.0")
      (is (map? (:error response))
          "Should have error")
      (is (= -32601 (get-in response [:error :code]))
          "Should return method not found error"))

    (println "  ✓ MCP invalid method handling works")))

;; ============================================================================
;; Tool Invocation Tests
;; ============================================================================

(deftest mcp-invoke-system-status-test
  (testing "MCP invoke system/status"
    (println "\n[TEST] MCP invoke system/status")

    (let [result (mcp/invoke-tool "system/status" {})]
      (is (map? result)
          "Result should be a map")
      (is (= :success (:status result))
          "Status should be success")
      (is (map? (:result result))
          "Result should contain map"))

    (println "  ✓ MCP invoke system/status works")))

(deftest mcp-invoke-git-status-test
  (testing "MCP invoke git/status"
    (println "\n[TEST] MCP invoke git/status")

    (let [result (mcp/invoke-tool "git/status" {})]
      (is (map? result)
          "Result should be a map")
      (is (= :success (:status result))
          "Status should be success")
      (is (map? (:result result))
          "Result should contain status data"))

    (println "  ✓ MCP invoke git/status works")))

(deftest mcp-invoke-memory-test
  (testing "MCP invoke memory operations"
    (println "\n[TEST] MCP invoke memory")

    ;; Save a value
    (let [save-result (mcp/invoke-tool "memory/set"
                                       {:key :mcp-test-key
                                        :value {:data "test" :timestamp 123}})]
      (is (= :success (:status save-result))
          "Memory save should succeed"))

    ;; Retrieve the value
    (let [get-result (mcp/invoke-tool "memory/get"
                                      {:key :mcp-test-key})]
      (is (= :success (:status get-result))
          "Memory get should succeed")
      (is (= {:data "test" :timestamp 123}
             (get-in get-result [:result :value]))
          "Should retrieve saved value"))

    ;; Clean up
    (memory/delete-value! :mcp-test-key)

    (println "  ✓ MCP memory operations work")))

(deftest mcp-invoke-nonexistent-tool-test
  (testing "MCP invoke nonexistent tool returns error"
    (println "\n[TEST] MCP invoke nonexistent tool")

    (let [result (mcp/invoke-tool "nonexistent/tool" {})]
      (is (contains? #{:error :not-found} (:status result))
          "Should return error or not-found status")
      (is (or (string? (:error result)) (string? (:message result)))
          "Should have error message or explanation"))

    (println "  ✓ MCP nonexistent tool handling works")))

;; ============================================================================
;; ECA Integration Simulation Tests
;; ============================================================================

(deftest eca-mcp-flow-simulation-test
  (testing "Simulate ECA → MCP → Ouroboros flow"
    (println "\n[TEST] ECA → MCP → Ouroboros flow")

    ;; 1. ECA connects and initializes
    (let [init-response (mcp/handle-request
                          {:jsonrpc "2.0"
                           :id 1
                           :method "initialize"
                           :params {:protocolVersion "2024-11-05"
                                    :clientInfo {:name "eca" :version "0.97.7"}}})]
      (is (= :success (if (get-in init-response [:result :protocolVersion])
                        :success
                        :error))
          "ECA should successfully initialize"))

    ;; 2. ECA lists available tools
    (let [tools-response (mcp/handle-request
                           {:jsonrpc "2.0"
                            :id 2
                            :method "tools/list"
                            :params {}})]
      (is (seq (get-in tools-response [:result :tools]))
          "ECA should receive tool list"))

    ;; 3. ECA calls git/commits to get repository history
    (let [call-response (mcp/handle-request
                          {:jsonrpc "2.0"
                           :id 3
                           :method "tools/call"
                           :params {:name "git/commits"
                                    :arguments {:n 3}}})]
      (is (false? (get-in call-response [:result :isError]))
          "ECA should successfully call git/commits")
      (is (seq (get-in call-response [:result :content]))
          "Should receive commit data"))

    ;; 4. ECA calls memory/set to store context
    (let [save-response (mcp/handle-request
                          {:jsonrpc "2.0"
                           :id 4
                           :method "tools/call"
                           :params {:name "memory/set"
                                    :arguments {:key :eca-session
                                                :value {:user "test"
                                                        :context "testing"}}}})]
      (is (false? (get-in save-response [:result :isError]))
          "ECA should successfully save to memory"))

    ;; 5. ECA retrieves stored context
    (let [get-response (mcp/handle-request
                         {:jsonrpc "2.0"
                          :id 5
                          :method "tools/call"
                          :params {:name "memory/get"
                                   :arguments {:key :eca-session}}})]
      (is (false? (get-in get-response [:result :isError]))
          "ECA should successfully retrieve from memory"))

    ;; Clean up
    (memory/delete-value! :eca-session)

    (println "  ✓ ECA → MCP → Ouroboros flow works end-to-end")))

;; ============================================================================
;; Telemetry Integration Tests
;; ============================================================================

(deftest mcp-telemetry-integration-test
  (testing "MCP tool invocations emit telemetry events"
    (println "\n[TEST] MCP telemetry integration")

    ;; Clear existing events
    (telemetry/clear-events!)

    ;; Invoke a tool via MCP
    (mcp/invoke-tool "system/status" {})

    ;; Check telemetry events
    (let [events (telemetry/get-events)
          mcp-events (filter #(or (= :mcp/invoke (:event %))
                                  (= :mcp/complete (:event %)))
                             events)]
      (is (>= (count mcp-events) 2)
          "Should have MCP invoke and complete events")

      ;; Check invoke event
      (let [invoke-event (first (filter #(= :mcp/invoke (:event %)) mcp-events))]
        (is (map? invoke-event)
            "Should have MCP invoke event")
        (is (= :system/status (:tool invoke-event))
            "Invoke event should track tool name"))

      ;; Check complete event
      (let [complete-event (first (filter #(= :mcp/complete (:event %)) mcp-events))]
        (is (map? complete-event)
            "Should have MCP complete event")
        (is (true? (:success? complete-event))
            "Complete event should track success")))

    (println "  ✓ MCP telemetry integration works")))

;; ============================================================================
;; Server Lifecycle Tests
;; ============================================================================

(deftest mcp-server-lifecycle-test
  (testing "MCP server start/stop"
    (println "\n[TEST] MCP server lifecycle")

    ;; Start server
    (let [start-result (mcp/start! {:port 3333})]
      (is (= 3333 (:port start-result))
          "Server should start on specified port")
      (is (string? (:url start-result))
          "Should return URL"))

    ;; Check status
    (let [status (mcp/status)]
      (is (true? (:running status))
          "Server should be running")
      (is (= 3333 (:port status))
          "Status should show correct port"))

    ;; Stop server
    (mcp/stop!)

    ;; Check status after stop
    (let [status (mcp/status)]
      (is (false? (:running status))
          "Server should be stopped"))

    (println "  ✓ MCP server lifecycle works")))

;; ============================================================================
;; Performance & Edge Cases
;; ============================================================================

(deftest mcp-concurrent-calls-test
  (testing "MCP handles concurrent tool calls"
    (println "\n[TEST] MCP concurrent calls")

    ;; Make multiple concurrent calls
    (let [futures (doall (map (fn [i]
                                (future
                                  (mcp/invoke-tool "system/status" {})))
                              (range 5)))
          results (map deref futures)]

      ;; All should succeed
      (is (every? #(= :success (:status %)) results)
          "All concurrent calls should succeed")

      (is (= 5 (count results))
          "Should receive all results"))

    (println "  ✓ MCP concurrent calls work")))

(deftest mcp-large-payload-test
  (testing "MCP handles large payloads"
    (println "\n[TEST] MCP large payload")

    ;; Store large value in memory
    (let [large-value (vec (repeat 1000 {:key "value" :data (range 100)}))
          save-result (mcp/invoke-tool "memory/set"
                                       {:key :large-test
                                        :value large-value})]
      (is (= :success (:status save-result))
          "Should handle large payload save"))

    ;; Retrieve large value
    (let [get-result (mcp/invoke-tool "memory/get" {:key :large-test})]
      (is (= :success (:status get-result))
          "Should handle large payload retrieval")
      (is (= 1000 (count (get-in get-result [:result :value])))
          "Should retrieve complete large value"))

    ;; Clean up
    (memory/delete-value! :large-test)

    (println "  ✓ MCP large payload handling works")))

;; ============================================================================
;; Tool Category Tests
;; ============================================================================

(deftest mcp-tool-categories-test
  (testing "MCP tools are properly categorized"
    (println "\n[TEST] MCP tool categories")

    (let [mcp-tools (mcp/list-mcp-tools)
          tool-names (map :name mcp-tools)
          categories (group-by (fn [name]
                                 (first (str/split name #"/")))
                               tool-names)]

      ;; Should have tools from multiple categories
      (is (contains? categories "git")
          "Should have git category tools")
      (is (contains? categories "memory")
          "Should have memory category tools")
      (is (contains? categories "system")
          "Should have system category tools")
      (is (contains? categories "openapi")
          "Should have openapi category tools")

      ;; Should NOT have file or http categories (ECA has these)
      (is (not (contains? categories "file"))
          "Should NOT have file category (ECA built-in)")
      (is (not (contains? categories "http"))
          "Should NOT have http category (ECA built-in)")

      (println (str "  ✓ Tools span " (count categories) " categories: "
                    (str/join ", " (sort (keys categories))))))

    (println "  ✓ MCP tool categorization correct")))

(comment
  ;; Run all tests
  (clojure.test/run-tests 'ouroboros.mcp-integration-test)

  ;; Run specific test
  (clojure.test/test-var #'mcp-tool-filtering-test)
  (clojure.test/test-var #'eca-mcp-flow-simulation-test)

  ;; Manual testing
  (require '[ouroboros.test-helper :as th])
  (th/system-fixture (fn []))

  (mcp/list-mcp-tools)
  (mcp/invoke-tool "system/status" {})
  (mcp/invoke-tool "git/status" {}))
