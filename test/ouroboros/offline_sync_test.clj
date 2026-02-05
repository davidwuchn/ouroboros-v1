(ns ouroboros.offline-sync-test
  "Tests for offline synchronization and conflict resolution"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.test-helper :as th]
   [ouroboros.offline-sync :as sync]))

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

(deftest queue-operation-test
  (testing "Queueing an operation for offline sync"
    (let [result (sync/queue-operation! :session-offline :add-note
                                        {:content "Test note"}
                                        :user-id :test-user)]
      (is (string? (:op/id result)))
      (is (= :add-note (:op/type result)))
      (is (= :pending (:op/status result)))
      (is (number? (:op/queued-at result))))))

(deftest queue-operation-validation-test
  (testing "Operation queueing validation"
    (is (thrown? clojure.lang.ExceptionInfo
                 (sync/queue-operation! nil :add-note {}))
        "Should reject nil session-id")
    (is (thrown? clojure.lang.ExceptionInfo
                 (sync/queue-operation! :session nil {}))
        "Should reject nil operation-type")))

(deftest get-pending-operations-test
  (testing "Getting pending operations"
    (sync/queue-operation! :session-pending :op1 {})
    (sync/queue-operation! :session-pending :op2 {})
    
    (let [pending (sync/get-pending-operations :session-pending)]
      (is (= 2 (count pending)))
      (is (every? #(= :pending (:op/status %)) pending)))))

(deftest mark-operation-complete-test
  (testing "Marking operation as complete"
    (let [op (sync/queue-operation! :session-complete :test {})
          op-id (:op/id op)]
      (sync/mark-operation-complete! :session-complete op-id)
      (let [pending (sync/get-pending-operations :session-complete)]
        (is (empty? pending) "Should have no pending operations")))))

(deftest mark-operation-failed-test
  (testing "Marking operation as failed"
    (let [op (sync/queue-operation! :session-fail :test {})
          op-id (:op/id op)]
      (sync/mark-operation-failed! :session-fail op-id "Connection timeout")
      (let [pending (sync/get-pending-operations :session-fail)]
        (is (empty? pending))))))

(deftest detect-conflicts-test
  (testing "Detecting conflicts between server and local state"
    (let [server-state {:canvas/items {"item-1" {:item/content "Server version"
                                                  :item/updated-at 1000}}}
          local-state {:canvas/items {"item-1" {:item/content "Local version"
                                                :item/updated-at 2000}}}]
      (let [conflicts (sync/detect-conflicts server-state local-state)]
        (is (seq conflicts) "Should detect conflict")
        (is (= :concurrent-edit (:conflict/type (first conflicts))))))
    
    ;; No conflict when same
    (let [same-state {:canvas/items {"item-1" {:item/content "Same"
                                               :item/updated-at 1000}}}]
      (let [conflicts (sync/detect-conflicts same-state same-state)]
        (is (empty? conflicts) "Should not detect conflict when identical")))))

(deftest resolve-conflict-test
  (testing "Resolving conflicts with different strategies"
    ;; Last-write-wins strategy
    (let [conflict {:conflict/server {:item/content "Server" :item/updated-at 1000}
                    :conflict/local {:item/content "Local" :item/updated-at 2000}}
          result (sync/resolve-conflict conflict :strategy :last-write-wins)]
      (is (= :use-local (:resolution result))
          "Local wins when newer"))
    
    ;; Merge strategy
    (let [result (sync/resolve-conflict conflict :strategy :merge)]
      (is (= :merged (:resolution result)))
      (is (get-in result [:item :item/conflict-resolved?])))))

(deftest save-and-load-session-state-test
  (testing "Saving and loading session state"
    (let [state {:canvas/items {"n1" {:content "Test"}}}
          _ (sync/save-session-state! :session-save :user-1 state)
          loaded (sync/load-session-state :session-save)]
      (is (= state (:snapshot/state loaded)))
      (is (= :user-1 (:snapshot/user-id loaded)))
      (is (string? (:snapshot/saved-at loaded))))))

(deftest has-saved-session-test
  (testing "Checking for saved session"
    (is (false? (sync/has-saved-session? :nonexistent)))
    (sync/save-session-state! :session-exists :user-1 {})
    (is (true? (sync/has-saved-session? :session-exists)))))

(deftest optimistic-update-test
  (testing "Applying optimistic updates"
    (let [state (atom {:count 0})]
      (sync/apply-optimistic! :session-opt "op-1" #(swap! state update :count inc))
      (is (= 1 (:count @state)) "Update should be applied")
      
      (sync/confirm-operation! :session-opt "op-1")
      ;; State should remain
      (is (= 1 (:count @state))))))

(deftest rollback-operation-test
  (testing "Rolling back optimistic update"
    (let [state (atom {:count 1})]
      (sync/apply-optimistic! :session-roll "op-2" #(swap! state update :count inc))
      (is (= 2 (:count @state)))
      
      (sync/rollback-operation! :session-roll "op-2" #(swap! state update :count dec))
      (is (= 1 (:count @state)) "Should be rolled back"))))

(deftest compact-queue-test
  (testing "Queue compaction removes old completed operations"
    ;; This test verifies compaction runs without error
    ;; In real scenarios, it removes operations older than 7 days
    (sync/queue-operation! :session-compact :test {})
    (is (nil? (sync/compact-queue! :session-compact))
        "Compaction should run without error")))
