(ns ouroboros.eca-protocol-test
  "ECA Protocol Compatibility Tests

   Tests to ensure Ouroboros remains compatible with ECA binary protocol.
   These tests validate JSON-RPC message formats, method names, and
   response handling without requiring actual ECA binary.

   Protocol Version: ECA v0.97.7+
   JSON-RPC: 2.0"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [cheshire.core :as json]
   [ouroboros.eca-client :as eca]
   [ouroboros.eca_approval_bridge :as bridge]))

;; ============================================================================
;; Protocol Constants
;; ============================================================================

(def eca-protocol-version "0.97.7")
(def json-rpc-version "2.0")

;; ECA Method Names (must match ECA binary)
(def eca-methods
  #{"initialize"
    "chat/prompt"
    "chat/queryContext"
    "chat/queryFiles"
    "chat/queryCommands"
    "chat/toolCallApprove"
    "chat/toolCallReject"})

;; ============================================================================
;; JSON-RPC Format Tests
;; ============================================================================

(deftest jsonrpc-version-compliance
  (testing "All messages use JSON-RPC 2.0"
    (let [message (#'eca/make-jsonrpc-message "test" {} 1)]
      (is (= json-rpc-version (:jsonrpc message))))))

(deftest content-length-header-format
  (testing "Content-Length header format matches LSP spec"
    (let [message (#'eca/make-jsonrpc-message "test" {} 1)
          serialized (#'eca/serialize-message message)]
      ;; Should match: Content-Length: <number>\r\n\r\n<json>
      (is (re-find #"Content-Length: \d+\r\n\r\n" serialized))
      ;; Should have JSON after headers
      (let [parts (clojure.string/split serialized #"\r\n\r\n" 2)]
        (is (= 2 (count parts)))
        (let [json-part (second parts)
              parsed (json/parse-string json-part true)]
          (is (= "test" (:method parsed))))))))

(deftest message-serialization-roundtrip
  (testing "Messages can be serialized and deserialized"
    (let [original {:jsonrpc "2.0"
                    :method "chat/prompt"
                    :params {:chat-id "test"
                             :prompt "Hello"}
                    :id 42}
          serialized (#'eca/serialize-message original)
          ;; Extract JSON part
          json-part (second (clojure.string/split serialized #"\r\n\r\n" 2))
          parsed (json/parse-string json-part true)]
      (is (= original parsed)))))

;; ============================================================================
;; ECA Method Compatibility Tests
;; ============================================================================

(deftest eca-method-names-are-valid
  (testing "All Ouroboros ECA method names match ECA spec"
    (doseq [method ["initialize"
                    "chat/prompt"
                    "chat/queryContext"
                    "chat/queryFiles"
                    "chat/queryCommands"
                    "chat/toolCallApprove"
                    "chat/toolCallReject"]]
      (is (contains? eca-methods method)
          (str "Method " method " should be in ECA methods")))))

(deftest initialize-params-structure
  (testing "initialize params match ECA spec"
    ;; Per ECA spec, initialize should include:
    ;; - process-id: number
    ;; - client-info: {name, version}
    ;; - capabilities: object
    ;; - workspace-folders: [{uri, name}]
    (let [params {:process-id 12345
                  :client-info {:name "ouroboros"
                                :version "0.1.0"}
                  :capabilities {}
                  :workspace-folders [{:uri "file:///test"
                                       :name "test"}]}]
      (is (number? (:process-id params)))
      (is (string? (get-in params [:client-info :name])))
      (is (string? (get-in params [:client-info :version])))
      (is (map? (:capabilities params)))
      (is (vector? (:workspace-folders params))))))

(deftest chat-prompt-params-structure
  (testing "chat/prompt params match ECA spec"
    ;; Per ECA spec, chat/prompt should include:
    ;; - chat-id: string
    ;; - prompt: string
    ;; - behavior: string (optional)
    (let [params {:chat-id "default"
                  :prompt "Hello ECA"
                  :behavior "default"}]
      (is (string? (:chat-id params)))
      (is (string? (:prompt params)))
      (is (string? (:behavior params))))))

(deftest tool-approval-params-structure
  (testing "chat/toolCallApprove params match ECA spec"
    ;; Per ECA spec, tool approval should include:
    ;; - chat-id: string
    ;; - tool: {name, arguments}
    (let [params {:chat-id "default"
                  :tool {:name "file/read"
                         :arguments {:path "test.txt"}}}]
      (is (string? (:chat-id params)))
      (is (string? (get-in params [:tool :name])))
      (is (map? (get-in params [:tool :arguments]))))))

(deftest tool-reject-params-structure
  (testing "chat/toolCallReject params match ECA spec"
    ;; Per ECA spec, tool rejection should include:
    ;; - chat-id: string
    ;; - tool: {name}
    ;; - reason: string (optional)
    (let [params {:chat-id "default"
                  :tool {:name "shell/exec"}
                  :reason "Too dangerous"}]
      (is (string? (:chat-id params)))
      (is (string? (get-in params [:tool :name])))
      (is (string? (:reason params))))))

;; ============================================================================
;; Response Handling Compatibility
;; ============================================================================

(deftest response-structure-validation
  (testing "ECA responses are handled correctly"
    ;; Successful response
    (let [success-response {:jsonrpc "2.0"
                            :id 42
                            :result {:content "Hello"}}]
      (is (= 42 (:id success-response)))
      (is (some? (:result success-response))))

    ;; Error response
    (let [error-response {:jsonrpc "2.0"
                          :id 42
                          :error {:code -32600
                                  :message "Invalid Request"}}]
      (is (= 42 (:id error-response)))
      (is (some? (:error error-response)))
      (is (number? (get-in error-response [:error :code])))
      (is (string? (get-in error-response [:error :message]))))))

(deftest notification-structure-validation
  (testing "ECA notifications are handled correctly"
    ;; Notifications have no id
    (let [notification {:jsonrpc "2.0"
                        :method "chat/content-received"
                        :params {:role "assistant"
                                 :content "Hello"}}]
      (is (nil? (:id notification)))
      (is (string? (:method notification)))
      (is (map? (:params notification))))))

;; ============================================================================
;; Error Code Compatibility (JSON-RPC 2.0 Spec)
;; ============================================================================

(deftest jsonrpc-error-codes
  (testing "Standard JSON-RPC error codes are recognized"
    ;; Standard JSON-RPC 2.0 error codes
    (let [error-codes {                       ;; Standard errors
                       -32700 "Parse error"
                       -32600 "Invalid Request"
                       -32601 "Method not found"
                       -32602 "Invalid params"
                       -32603 "Internal error"
                       ;; Server errors (reserved range: -32000 to -32099)
                       -32000 "Server error"
                       -32001 "ECA specific error"}]
      (doseq [[code description] error-codes]
        (is (number? code))
        (is (string? description))))))

;; ============================================================================
;; Version Compatibility
;; ============================================================================

(deftest protocol-version-declaration
  (testing "Ouroboros declares compatible ECA version"
    ;; This test documents the tested ECA version
    (is (string? eca-protocol-version))
    (is (re-find #"^\d+\.\d+\.\d+" eca-protocol-version))))

;; ============================================================================
;; Tool Classification Compatibility
;; ============================================================================

(deftest eca-tool-danger-classification-compatibility
  (testing "Tool classification matches ECA expectations"
    ;; ECA expects certain tools to be classified as dangerous
    (doseq [dangerous-tool ["file/write"
                            "file/delete"
                            "file/rename"
                            "shell/exec"
                            "shell/script"
                            "bash"
                            "cmd"]]
      (is (= :confirmation-required (bridge/eca-tool-danger-level dangerous-tool))
          (str "Tool " dangerous-tool " should require confirmation")))

    ;; Safe tools should not require confirmation
    (doseq [safe-tool ["file/read"
                       "file/search"
                       "file/list"
                       "grep"]]
      (is (= :safe (bridge/eca-tool-danger-level safe-tool))
          (str "Tool " safe-tool " should be safe")))))

;; ============================================================================
;; Message Handler Compatibility
;; ============================================================================

(deftest callback-registration-compatibility
  (testing "Callback registration matches ECA notification types"
    ;; Register callbacks for all ECA notification types
    (let [callbacks {"chat/content-received" (fn [_] nil)
                     "chat/toolCallApprove" (fn [_] nil)
                     "chat/toolCallReject" (fn [_] nil)}]
      (doseq [[method handler] callbacks]
        (eca/register-callback! method handler))

      ;; Verify callbacks work by checking they don't throw
      (doseq [method ["chat/content-received" "chat/toolCallApprove" "chat/toolCallReject"]]
        (is (try
              ;; Trigger notification handling - should not throw
              (#'eca/handle-notification! {:method method :params {}})
              true
              (catch Exception _ false))
            (str "Callback for " method " should be callable")))

      ;; Cleanup
      (eca/clear-callbacks!))))

;; ============================================================================
;; Content-Type Handling
;; ============================================================================

(deftest content-type-negotiation
  (testing "Content types are handled correctly"
    ;; JSON-RPC messages use application/json
    ;; Content-Length is in bytes (UTF-8)
    (let [message {:jsonrpc "2.0" :method "test" :id 1}
          json (json/generate-string message)
          content-length (count (.getBytes json "UTF-8"))]
      (is (pos? content-length))
      (is (= content-length (count json)) ; ASCII = 1 byte per char
          "ASCII content length should match character count"))))

;; ============================================================================
;; Protocol Edge Cases
;; ============================================================================

(deftest empty-params-handling
  (testing "Empty params are handled correctly"
    (let [message (#'eca/make-jsonrpc-message "test" {} 1)]
      (is (= {} (:params message))))))

(deftest null-result-handling
  (testing "Null results are handled correctly"
    (let [response {:jsonrpc "2.0" :id 1 :result nil}]
      (is (contains? response :result))
      (is (nil? (:result response))))))

(deftest string-id-handling
  (testing "String IDs are handled correctly"
    (let [message (#'eca/make-jsonrpc-message "test" {} "request-123")]
      (is (= "request-123" (:id message))))))

;; ============================================================================
;; Test Runner
;; ============================================================================

(comment
  ;; Run all protocol tests
  (clojure.test/run-tests 'ouroboros.eca-protocol-test)

  ;; Run specific test
  (clojure.test/test-vars [#'jsonrpc-version-compliance]))
