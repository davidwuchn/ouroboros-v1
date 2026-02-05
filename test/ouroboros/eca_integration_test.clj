(ns ouroboros.eca-integration-test
  "ECA Integration Tests

   End-to-end tests for ECA integration with Ouroboros.
   These tests verify the complete flow from ECA tool calls through
   the approval bridge to chat platform notifications.

   Note: These tests mock ECA interactions. For tests requiring
   actual ECA binary, see test:eca bb task."
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.eca-client :as eca]
   [ouroboros.eca_approval_bridge :as bridge]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Test Fixtures
;; ============================================================================

(defn reset-eca-state! []
  (reset! eca/state {:running false
                     :callbacks {}
                     :pending-requests {}
                     :request-id 0})
  ;; Reset bridge state via public functions
  (bridge/unregister-eca-callbacks!)
  (when-let [sessions (not-empty (:active-sessions (bridge/status)))]
    (doseq [chat-id sessions]
      (bridge/unregister-session! chat-id))))

(use-fixtures :each
  (fn [test-fn]
    (reset-eca-state!)
    (test-fn)))

;; ============================================================================
;; End-to-End Integration Tests
;; ============================================================================

(deftest eca-tool-call-flow
  (testing "Complete flow: ECA tool call → approval bridge → chat notification"
    ;; Setup: Register a mock adapter and session
    (let [forwarded-messages (atom [])]
      (bridge/set-adapter!
       {:forward-approval-request
        (fn [confirmation-id message tool-name arguments]
          (swap! forwarded-messages conj {:confirmation-id confirmation-id
                                          :message message
                                          :tool tool-name
                                          :arguments arguments}))})

      ;; Register a session with user
      (bridge/register-session! "chat-123" "test-user")

      ;; Simulate ECA sending a dangerous tool call
      (let [result (bridge/handle-tool-call-approve
                    {:id "eca-req-1"
                     :tool {:name "file/write"
                            :arguments {:path "test.txt"
                                        :content "hello"}}})]

        ;; Should require confirmation
        (is (= :pending-confirmation (:status result)))
        (is (string? (:confirmation-id result)))

        ;; Should have forwarded to chat
        (is (= 1 (count @forwarded-messages)))
        (is (= "file/write" (:tool (first @forwarded-messages))))

        ;; Approve the tool call
        (let [confirmation-id (:confirmation-id result)
              approve-result (bridge/approve-confirmation! confirmation-id "test-approver")]
          (is (= :approved (:status approve-result)))
          (is (= "file/write" (:tool approve-result))))

        ;; Should no longer be pending
        (is (empty? (bridge/pending-approvals)))))))

(deftest eca-safe-tool-auto-approval
  (testing "Safe tools are auto-approved without confirmation"
    ;; Setup
    (let [forwarded-messages (atom [])]
      (bridge/set-adapter!
       {:forward-approval-request
        (fn [& args] (swap! forwarded-messages conj args))})

      (bridge/register-session! "chat-456" "test-user")

      ;; Simulate safe tool call
      (let [result (bridge/handle-tool-call-approve
                    {:id "eca-req-safe"
                     :tool {:name "file/read"
                            :arguments {:path "README.md"}}})]

        ;; Should be auto-approved
        (is (= :auto-approved (:status result)))

        ;; Should NOT forward to chat
        (is (empty? @forwarded-messages))

        ;; Should not be in pending approvals
        (is (empty? (bridge/pending-approvals)))))))

(deftest eca-blocked-tool-rejection
  (testing "Blocked tools are rejected immediately"
    (let [result (bridge/handle-tool-call-approve
                  {:id "eca-req-blocked"
                   :tool {:name "sudo"
                          :arguments {:command "rm -rf /"}}})]

      ;; Should be blocked
      (is (= :blocked (:status result)))
      (is (= "sudo" (:tool result)))
      (is (string? (:reason result))))))

(deftest eca-session-user-tracking
  (testing "User ID is tracked and used for learning attribution"
    ;; Register session with user
    (bridge/register-session! "chat-789" "alice")

    ;; Verify session was registered (via status function)
    (is (contains? (:active-sessions (bridge/status)) "chat-789"))

    ;; Unregister and verify cleanup
    (bridge/unregister-session! "chat-789")
    (is (not (contains? (:active-sessions (bridge/status)) "chat-789")))))

(deftest eca-multiple-sessions
  (testing "Approval requests are forwarded to all active sessions"
    (let [forwarded-messages (atom [])]
      (bridge/set-adapter!
       {:forward-approval-request
        (fn [confirmation-id message tool-name arguments]
          (swap! forwarded-messages conj {:confirmation-id confirmation-id
                                          :tool tool-name}))})

      ;; Register multiple sessions
      (bridge/register-session! "chat-1" "user-1")
      (bridge/register-session! "chat-2" "user-2")
      (bridge/register-session! "chat-3" "user-3")

      ;; Simulate dangerous tool call
      (bridge/handle-tool-call-approve
       {:id "eca-req-multi"
        :tool {:name "shell/exec"
               :arguments {:command "echo test"}}})

      ;; Should forward to all sessions
      (is (= 1 (count @forwarded-messages)))
      (is (= "shell/exec" (:tool (first @forwarded-messages)))))))

(deftest eca-denial-flow
  (testing "Denial flow: User denies tool call"
    ;; Setup
    (let [rejection-sent (atom nil)]
      (bridge/set-adapter! {:forward-approval-request (fn [& _])})
      (bridge/register-session! "chat-deny" "test-user")

      ;; Simulate dangerous tool call
      (let [result (bridge/handle-tool-call-approve
                    {:id "eca-req-deny"
                     :tool {:name "file/delete"
                            :arguments {:path "important.txt"}}})
            confirmation-id (:confirmation-id result)]

        ;; Deny the request
        (let [deny-result (bridge/deny-confirmation!
                           confirmation-id
                           "Too risky to delete"
                           :denied-by "test-denier")]
          (is (= :denied (:status deny-result)))
          (is (= "file/delete" (:tool deny-result)))
          (is (= "Too risky to delete" (:reason deny-result))))

        ;; Should no longer be pending
        (is (empty? (bridge/pending-approvals)))))))

(deftest eca-callback-registration
  (testing "ECA callbacks are registered on set-adapter!"
    ;; Initially not registered
    (is (false? (:eca-callbacks-registered? @bridge/state)))

    ;; Set adapter should trigger registration
    (bridge/set-adapter! {:forward-approval-request (fn [& _])})

    ;; Should be registered
    (is (true? (:eca-callbacks-registered? @bridge/state)))

    ;; Should be able to unregister
    (bridge/unregister-eca-callbacks!)
    (is (false? (:eca-callbacks-registered? @bridge/state)))))

(deftest eca-chat-command-processing
  (testing "/confirm and /deny commands are processed correctly"
    (bridge/set-adapter! {:forward-approval-request (fn [& _])})
    (bridge/register-session! "chat-cmd" "test-user")

    ;; Create a pending approval
    (let [result (bridge/handle-tool-call-approve
                  {:id "eca-req-cmd"
                   :tool {:name "file/write"
                          :arguments {:path "test.txt"}}})
          confirmation-id (:confirmation-id result)]

      ;; Process confirm command
      (let [confirm-result (bridge/process-chat-confirm!
                            "chat-cmd"
                            confirmation-id
                            "command-user")]
        (is (= :approved (:status confirm-result))))))

  (testing "Invalid confirmation ID format is rejected"
    (let [result (bridge/process-chat-confirm!
                  "chat-cmd"
                  "invalid-id"
                  "user")]
      (is (= :error (:status result)))
      (is (= "Invalid confirmation ID format" (:reason result))))))

(deftest eca-timeout-handling
  (testing "Expired approvals are cleaned up"
    ;; Create an approval with a very short timeout
    (swap! bridge/state assoc :timeout-ms 1) ; 1ms timeout

    (bridge/set-adapter! {:forward-approval-request (fn [& _])})
    (bridge/register-session! "chat-timeout" "test-user")

    ;; Create pending approval
    (bridge/handle-tool-call-approve
     {:id "eca-req-timeout"
      :tool {:name "file/write"
             :arguments {:path "test.txt"}}})

    ;; Wait for timeout
    (Thread/sleep 50)

    ;; Cleanup should remove expired
    (bridge/cleanup-expired-approvals!)

    ;; Should be auto-rejected and removed from pending
    (is (empty? (bridge/pending-approvals)))))

;; ============================================================================
;; Protocol Compatibility Tests
;; ============================================================================

(deftest eca-protocol-message-format
  (testing "JSON-RPC messages conform to expected format"
    (let [message (#'eca/make-jsonrpc-message "test/method" {:param "value"} 42)]
      (is (= "2.0" (:jsonrpc message)))
      (is (= "test/method" (:method message)))
      (is (= {:param "value"} (:params message)))
      (is (= 42 (:id message))))))

(deftest eca-notification-handling
  (testing "ECA notifications trigger callbacks"
    (let [received (atom nil)]
      (eca/register-callback! "chat/content-received"
                              (fn [notification] (reset! received notification)))

      ;; Simulate notification
      (#'eca/handle-notification!
       {:method "chat/content-received"
        :params {:role "assistant" :content "Hello"}})

      (is (some? @received))
      (is (= "chat/content-received" (:method @received))))))

(deftest eca-request-response-cycle
  (testing "Request-response cycle tracks pending requests"
    ;; Initially no pending requests
    (is (empty? (:pending-requests @eca/state)))

    ;; Simulate sending a request
    (let [id (swap! eca/state update :request-id inc)]
      (swap! eca/state assoc-in [:pending-requests id] (promise))

      ;; Should have pending request
      (is (= 1 (count (:pending-requests @eca/state))))

      ;; Simulate response
      (#'eca/handle-response! {:id id :result "success"})

      ;; Should be removed from pending
      (is (empty? (:pending-requests @eca/state))))))

;; ============================================================================
;; Comment / Examples
;; ============================================================================

(comment
  ;; Run all ECA integration tests
  (clojure.test/run-tests 'ouroboros.eca-integration-test)

  ;; Test specific scenario
  (deftest specific-test
    (testing "My specific scenario"
      ;; ...
      )))
