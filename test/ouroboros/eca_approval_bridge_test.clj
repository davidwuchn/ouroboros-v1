(ns ouroboros.eca-approval-bridge-test
  "Tests for ECA Approval Bridge

   Tests the bridge between ECA tool calls and the confirmation system."
  (:require
   [clojure.string :as str]
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.telemetry :as telemetry]))

;; Load the bridge namespace dynamically
(require '[ouroboros.eca-approval-bridge :as bridge])

;; Disable telemetry during tests
(use-fixtures :once
  {:start (fn [] (telemetry/emit! {:event :test/start}))
   :end (fn [] (telemetry/emit! {:event :test/end}))})

(deftest tool-danger-classification
  (testing "Safe tools are auto-approved"
    (is (= :safe (ouroboros.eca-approval-bridge/eca-tool-danger-level "file/read")))
    (is (= :safe (ouroboros.eca-approval-bridge/eca-tool-danger-level "grep")))
    (is (= :safe (ouroboros.eca-approval-bridge/eca-tool-danger-level "status"))))

  (testing "Dangerous tools require confirmation"
    (is (= :confirmation-required (bridge/eca-tool-danger-level "file/write")))
    (is (= :confirmation-required (bridge/eca-tool-danger-level "file/delete")))
    (is (= :confirmation-required (bridge/eca-tool-danger-level "shell/exec")))
    (is (= :confirmation-required (bridge/eca-tool-danger-level "bash")))
    (is (= :confirmation-required (bridge/eca-tool-danger-level "cmd"))))

  (testing "Blocked tools are rejected"
    (is (= :blocked (bridge/eca-tool-danger-level "sudo")))
    (is (= :blocked (bridge/eca-tool-danger-level "rm -rf")))
    (is (= :blocked (bridge/eca-tool-danger-level "format")))))

(deftest tool-description
  (testing "Generates human-readable descriptions"
    (is (str/includes? (bridge/eca-tool-description "file/write" {:path "test.txt"}) "test.txt"))
    (is (str/includes? (bridge/eca-tool-description "file/delete" {:path "test.txt"}) "test.txt"))
    (is (str/includes? (bridge/eca-tool-description "shell/exec" {:command "echo hi"}) "echo hi"))
    (is (str/includes? (bridge/eca-tool-description "bash" {:code "ls"}) "ls"))
    (is (= (bridge/eca-tool-description "memory/clear" {}) "Clear all memory"))))

(deftest handle-tool-call-approve
  (testing "Auto-approves safe tools"
    (let [result (bridge/handle-tool-call-approve
                   {:id "req-1"
                    :tool {:name "file/read" :arguments {:path "README.md"}}})]
      (is (= :auto-approved (:status result)))
      (is (= "req-1" (:eca-id result)))
      (is (= "file/read" (:tool result)))))

  (testing "Requires confirmation for dangerous tools"
    (let [result (bridge/handle-tool-call-approve
                   {:id "req-2"
                    :tool {:name "file/write" :arguments {:path "test.txt" :content "hi"}}})]
      (is (= :pending-confirmation (:status result)))
      (is (= "req-2" (:eca-id result)))
      (is (str/starts-with? (:confirmation-id result) "eca-"))
      (is (:description result))))

  (testing "Blocks dangerous tools"
    (let [result (bridge/handle-tool-call-approve
                   {:id "req-3"
                    :tool {:name "sudo" :arguments {:command "rm -rf /"}}})]
      (is (= :blocked (:status result)))
      (is (= "sudo" (:tool result)))
      (:reason result)))))

(deftest approval-lifecycle
  (testing "Full approval flow"
    ;; Request dangerous tool
    (let [request (bridge/handle-tool-call-approve
                    {:id "req-flow-1"
                     :tool {:name "file/write" :arguments {:path "test.txt"}}})
          confirmation-id (:confirmation-id request)]

      ;; Should be pending
      (is (= :pending-confirmation (:status request)))

      ;; Get pending approvals
      (let [pending (bridge/pending-approvals)]
        (is (some #(= confirmation-id (:confirmation-id %)) pending)))

      ;; Approve
      (let [approve-result (bridge/approve-confirmation! confirmation-id "admin")]
        (is (= :approved (:status approve-result)))
        (is (= "req-flow-1" (:eca-id approve-result))))))

  (testing "Full denial flow"
    ;; Request dangerous tool
    (let [request (bridge/handle-tool-call-approve
                    {:id "req-flow-2"
                     :tool {:name "shell/exec" :arguments {:command "rm -rf /"}}})
          confirmation-id (:confirmation-id request)]

      ;; Deny
      (let [deny-result (bridge/deny-confirmation! confirmation-id "Too dangerous" :denied-by "admin")]
        (is (= :denied (:status deny-result)))
        (is (= "req-flow-2" (:eca-id deny-result)))
        (is (= "Too dangerous" (:reason deny-result))))))

(deftest chat-command-processing
  (testing "/confirm processing"
    (let [request (bridge/handle-tool-call-approve
                    {:id "req-chat-1"
                     :tool {:name "file/write" :arguments {:path "test.txt"}}})
          confirmation-id (:confirmation-id request)]

      ;; Process /confirm command
      (let [result (bridge/process-chat-confirm! "chat-123" confirmation-id "user")]
        (is (= :approved (:status result))))))

  (testing "/deny processing"
    (let [request (bridge/handle-tool-call-approve
                    {:id "req-chat-2"
                     :tool {:name "file/write" :arguments {:path "test.txt"}}})
          confirmation-id (:confirmation-id request)]

      ;; Process /deny command
      (let [result (bridge/process-chat-deny! "chat-123" confirmation-id "Too risky" "user")]
        (is (= :denied (:status result)))
        (is (= "Too risky" (:reason result))))))

(deftest status
  (testing "Bridge status"
    (let [status (bridge/status)]
      (is (contains? status :pending-count))
      (is (contains? status :timeout-ms))
      (is (contains? status :adapter-set?)))))

;; Run tests
(comment
  (clojure.test/run-tests 'ouroboros.eca-approval-bridge-test))
