(ns ouroboros.workflow-test
  "Workflow Tests - Plan/Work/Review cycle"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [clojure.string :as str]
   [ouroboros.workflow :as workflow]))

(use-fixtures :each
  (fn [test-fn]
    ;; Clear any existing workflow state by cancelling for common chat-ids
    (doseq [chat-id ["chat-123" "chat-456" "chat-789" "chat-1" "chat-2" "chat-3"]]
      (workflow/cancel-workflow! chat-id))
    (test-fn)
    ;; Clean up after
    (doseq [chat-id ["chat-123" "chat-456" "chat-789" "chat-1" "chat-2" "chat-3"]]
      (workflow/cancel-workflow! chat-id))))

(deftest test-stack-descriptions
  (testing "All stacks have descriptions"
    (is (contains? workflow/stack-descriptions :clojure))
    (is (contains? workflow/stack-descriptions :rails))
    (is (contains? workflow/stack-descriptions :general)))
  (testing "Descriptions are non-empty strings"
    (is (string? (get workflow/stack-descriptions :clojure)))
    (is (not (str/blank? (get workflow/stack-descriptions :clojure))))))

(deftest test-start-plan
  (testing "Plan session creation"
    (let [result (workflow/start-plan! "chat-123" "Add user authentication")]
      (is (= :started (:status result)))
      (is (map? (:session result)))
      (is (= :plan (get-in result [:session :type])))
      (is (= "Add user authentication" (get-in result [:session :feature])))
      (is (= :refining (get-in result [:session :status])))
      (is (str/includes? (:message result) "Planning session started"))))
  (testing "Session is stored in state"
    (workflow/start-plan! "chat-456" "Feature X")
    (let [session (workflow/get-workflow-session "chat-456")]
      (is (some? session))
      (is (= :plan (:type session))))))

(deftest test-process-plan-response-refining
  (testing "Process response in :refining status"
    (workflow/start-plan! "chat-123" "Feature X")
    (let [result (workflow/process-plan-response! "chat-123" "We need this for security")]
      (is (= :continued (:status result)))
      (is (= :researching (get-in result [:session :status])))
      (is (= "We need this for security" (get-in result [:session :motivation]))))))

(deftest test-process-plan-response-researching
  (testing "Process response in :researching status"
    (workflow/start-plan! "chat-123" "Feature X")
    (workflow/process-plan-response! "chat-123" "Motivation text")
    (let [result (workflow/process-plan-response! "chat-123" "Users can login easily")]
      (is (= :continued (:status result)))
      (is (= :outlining (get-in result [:session :status])))
      (is (= "Users can login easily" (get-in result [:session :outcome]))))))

(deftest test-process-plan-response-outlining
  (testing "Process response in :outlining status completes plan"
    (workflow/start-plan! "chat-123" "Feature X")
    (workflow/process-plan-response! "chat-123" "Motivation")
    (workflow/process-plan-response! "chat-123" "Outcome")
    (let [result (workflow/process-plan-response! "chat-123" "Plan details")]
      (is (= :complete (:status result)))
      (is (= :complete (get-in result [:session :status])))
      (is (some? (get-in result [:session :plan-id]))))))

(deftest test-process-plan-no-session
  (testing "Error when no active plan session"
    (let [result (workflow/process-plan-response! "chat-999" "Some response")]
      (is (= "No active plan session" (:error result))))))

(deftest test-start-work
  (testing "Work session creation"
    (let [result (workflow/start-work! "chat-123" "task-456")]
      (is (= :started (:status result)))
      (is (= :work (get-in result [:session :type])))
      (is (= "task-456" (get-in result [:session :task-id])))
      (is (str/includes? (:message result) "Work session started"))))
  (testing "Session is stored"
    (workflow/start-work! "chat-789" "my-task")
    (let [session (workflow/get-workflow-session "chat-789")]
      (is (= :work (:type session))))))

(deftest test-process-work-response
  (testing "Process work step"
    (workflow/start-work! "chat-123" "task-456")
    (let [result (workflow/process-work-response! "chat-123" "Implemented login form")]
      (is (= :continued (:status result)))
      (is (= 1 (count (get-in result [:session :completed-steps]))))))
  (testing "Multiple steps accumulate"
    (workflow/start-work! "chat-123" "task-789")
    (workflow/process-work-response! "chat-123" "Step 1")
    (workflow/process-work-response! "chat-123" "Step 2")
    (let [session (workflow/get-workflow-session "chat-123")]
      (is (= 2 (count (:completed-steps session)))))))

(deftest test-process-work-no-session
  (testing "Error when no active work session"
    (let [result (workflow/process-work-response! "chat-999" "Some work")]
      (is (= "No active work session" (:error result))))))

(deftest test-start-review
  (testing "Review session creation"
    (let [result (workflow/start-review! "chat-123")]
      (is (= :started (:status result)))
      (is (= :review (get-in result [:session :type])))
      (is (= :collecting (get-in result [:session :status])))
      (is (vector? (get-in result [:session :agents])))
      (is (str/includes? (:message result) "Code Review Session"))))
  (testing "Session is stored"
    (workflow/start-review! "chat-456")
    (let [session (workflow/get-workflow-session "chat-456")]
      (is (= :review (:type session))))))

(deftest test-process-review-response
  (testing "Process code for review"
    (workflow/start-review! "chat-123")
    (let [result (workflow/process-review-response! "chat-123" "(defn foo [] 1)")]
      (is (= :continued (:status result)))
      (is (= :reviewing (get-in result [:session :status])))
      (is (= "(defn foo [] 1)" (get-in result [:session :code]))))))

(deftest test-process-review-no-session
  (testing "Error when no active review session"
    (let [result (workflow/process-review-response! "chat-999" "some code")]
      (is (= "No active review session" (:error result))))))

(deftest test-review-agents-exist
  (testing "Review agents defined for common stacks"
    (is (contains? workflow/review-agents :general))
    (is (contains? workflow/review-agents :clojure))
    (is (vector? (get workflow/review-agents :general)))))

  (testing "Get existing session"
    (workflow/start-plan! "chat-123" "Feature")
    (let [session (workflow/get-workflow-session "chat-123")]
      (is (some? session))
      (is (= :plan (:type session)))))
  (testing "Get non-existent session returns nil"
    (is (nil? (workflow/get-workflow-session "chat-nonexistent"))))

(deftest test-cancel-workflow
  (testing "Cancel active workflow"
    (workflow/start-plan! "chat-123" "Feature")
    (let [result (workflow/cancel-workflow! "chat-123")]
      (is (= :cancelled (:status result)))
      (is (= :plan (:session-type result)))
      (is (nil? (workflow/get-workflow-session "chat-123")))))
  (testing "Cancel returns nil session-type when none existed"
    (let [result (workflow/cancel-workflow! "chat-never-had-workflow")]
      (is (= :cancelled (:status result)))
      (is (nil? (:session-type result))))))

(deftest test-workflow-status
  (testing "Status with active workflow"
    (workflow/start-plan! "chat-123" "Feature")
    (let [status (workflow/workflow-status "chat-123")]
      (is (= :plan (:type status)))
      (is (= :refining (:status status)))))
  (testing "Status with no workflow"
    (let [status (workflow/workflow-status "chat-no-workflow")]
      (is (= :no-active-workflow (:status status))))))

(deftest test-handle-plan-command
  (testing "Valid plan command"
    (let [result (workflow/handle-plan-command nil "chat-123" "Add feature")]
      (is (contains? result :message))
      (is (str/includes? (:message result) "Planning session"))))
  (testing "Empty args shows usage"
    (let [result (workflow/handle-plan-command nil "chat-123" "")]
      (is (str/includes? (:message result) "Usage:")))))

(deftest test-handle-work-command
  (testing "Valid work command"
    (let [result (workflow/handle-work-command nil "chat-123" "task-456")]
      (is (contains? result :message))
      (is (str/includes? (:message result) "Work session"))))
  (testing "Empty args shows usage"
    (let [result (workflow/handle-work-command nil "chat-123" "")]
      (is (str/includes? (:message result) "Usage:")))))

(deftest test-handle-review-command
  (testing "Review command starts session"
    (let [result (workflow/handle-review-command nil "chat-123" "")]
      (is (contains? result :message))
      (is (str/includes? (:message result) "Code Review")))))


(deftest test-workflow-help-constant
  (testing "Help text exists and contains commands"
    (is (string? workflow/workflow-help))
    (is (str/includes? workflow/workflow-help "/plan"))
    (is (str/includes? workflow/workflow-help "/work"))
    (is (str/includes? workflow/workflow-help "/review"))

(deftest test-multiple-sessions-isolated
  (testing "Different chats have isolated sessions"
    (workflow/start-plan! "chat-1" "Feature A")
    (workflow/start-work! "chat-2" "Task B")
    (workflow/start-review! "chat-3")
    (let [session-1 (workflow/get-workflow-session "chat-1")
          session-2 (workflow/get-workflow-session "chat-2")
          session-3 (workflow/get-workflow-session "chat-3")]
      (is (= :plan (:type session-1)))
      (is (= :work (:type session-2)))
      (is (= :review (:type session-3)))
      (workflow/cancel-workflow! "chat-2")
      (is (some? (workflow/get-workflow-session "chat-1")))
      (is (nil? (workflow/get-workflow-session "chat-2")))
      (is (some? (workflow/get-workflow-session "chat-3"))))))

(deftest test-plan-state-transitions
  (testing "Plan workflow follows correct state machine"
    (workflow/start-plan! "chat-123" "Feature")
    (is (= :refining (:status (workflow/get-workflow-session "chat-123"))))
    (workflow/process-plan-response! "chat-123" "Motivation")
    (is (= :researching (:status (workflow/get-workflow-session "chat-123"))))
    (workflow/process-plan-response! "chat-123" "Outcome")
    (is (= :outlining (:status (workflow/get-workflow-session "chat-123"))))
    (workflow/process-plan-response! "chat-123" "Details")
    (is (= :complete (:status (workflow/get-workflow-session "chat-123"))))))))