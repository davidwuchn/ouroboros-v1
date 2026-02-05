(ns ouroboros.collaboration-test
  "Tests for real-time collaboration features
   
   Note: Some tests mock WebSocket functionality since http-kit
   is not available in Babashka test environment."
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.test-helper :as th]
   [ouroboros.collaboration :as collab]))

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

(deftest join-session-test
  (testing "User joining a collaboration session"
    (let [result (collab/join-session! :session-123 :user-456 "Alice")]
      (is (= :user-456 (:user/id result)))
      (is (= "Alice" (:user/name result)))
      (is (string? (:user/color result)) "Should assign color")
      (is (string? (:user/avatar result)) "Should have avatar")
      (is (number? (:user/joined-at result)) "Should have timestamp"))))

(deftest join-session-deterministic-color-test
  (testing "Same user gets same color (deterministic)"
    (let [user1 (collab/join-session! :session-1 :user-123 "Bob")
          user2 (collab/join-session! :session-2 :user-123 "Bob")]
      (is (= (:user/color user1) (:user/color user2))
          "Same user should get same color across sessions"))))

(deftest leave-session-test
  (testing "User leaving a session"
    (collab/join-session! :session-leave :user-789 "Charlie")
    (let [result (collab/leave-session! :session-leave :user-789)]
      (is (= :user-789 (:user/id result)))
      (is (:left? result))
      ;; Verify user is removed
      (is (empty? (collab/get-session-users :session-leave))))))

(deftest get-session-users-test
  (testing "Getting all users in a session"
    (collab/join-session! :session-multi :user-1 "Alice")
    (collab/join-session! :session-multi :user-2 "Bob")
    (collab/join-session! :session-multi :user-3 "Charlie")
    
    (let [users (collab/get-session-users :session-multi)]
      (is (= 3 (count users)))
      (is (= #{:user-1 :user-2 :user-3}
             (set (map :user/id users)))))))

(deftest update-cursor-test
  (testing "Updating cursor position"
    (collab/join-session! :session-cursor :user-999 "Dave")
    (let [result (collab/update-cursor! :session-cursor :user-999 {:x 100 :y 200})]
      (is (= :user-999 (:user/id result)))
      (is (= {:x 100 :y 200} (:position result)))
      (is (number? (:timestamp result))))))

(deftest get-cursor-positions-test
  (testing "Getting cursor positions excluding specific user"
    (collab/join-session! :session-cursors :user-a "Alice")
    (collab/join-session! :session-cursors :user-b "Bob")
    (collab/update-cursor! :session-cursors :user-a {:x 10 :y 20})
    (collab/update-cursor! :session-cursors :user-b {:x 30 :y 40})
    
    (let [positions (collab/get-cursor-positions :session-cursors :exclude-user :user-a)]
      (is (= 1 (count positions)))
      (is (contains? positions :user-b))
      (is (not (contains? positions :user-a))))))

(deftest add-comment-test
  (testing "Adding a comment to an item"
    (let [result (collab/add-comment! :session-comment :user-100 :item-200 "Great insight!")]
      (is (string? (:comment/id result)))
      (is (= :user-100 (:comment/author result)))
      (is (= :item-200 (:comment/item-id result)))
      (is (= "Great insight!" (:comment/text result)))
      (is (false? (:comment/resolved? result))))))

(deftest resolve-comment-test
  (testing "Resolving a comment"
    (let [comment (collab/add-comment! :session-resolve :user-1 :item-1 "Test")
          result (collab/resolve-comment! :session-resolve (:comment/id comment) :user-2)]
      (is (:comment/resolved? result))
      (is (= (:comment/id comment) (:comment/id result))))))

(deftest get-comments-test
  (testing "Getting comments for a session"
    (collab/add-comment! :session-comments :user-1 :item-1 "Comment 1")
    (collab/add-comment! :session-comments :user-2 :item-1 "Comment 2")
    (collab/add-comment! :session-comments :user-3 :item-2 "Comment 3")
    
    (let [all-comments (collab/get-comments :session-comments)]
      (is (= 3 (count all-comments))))
    
    (let [item-comments (collab/get-comments :session-comments :item-id :item-1)]
      (is (= 2 (count item-comments))))))

(deftest create-snapshot-test
  (testing "Creating a version snapshot"
    (let [canvas-state {:notes {"n1" {:content "Test"}}}
          result (collab/create-snapshot! :session-snap :user-1 canvas-state
                                         :label "Initial"
                                         :description "First draft")]
      (is (string? (:version/id result)))
      (is (= "Initial" (:version/label result)))
      (is (= "First draft" (:version/description result)))
      (is (= canvas-state (:version/state result))))))

(deftest get-versions-test
  (testing "Getting all versions for a session"
    (collab/create-snapshot! :session-versions :user-1 {} :label "V1")
    (Thread/sleep 10) ; Ensure different timestamps
    (collab/create-snapshot! :session-versions :user-1 {} :label "V2")
    
    (let [versions (collab/get-versions :session-versions)]
      (is (= 2 (count versions)))
      (is (= "V2" (:version/label (first versions))) "Should be sorted newest first"))))

(deftest cleanup-stale-sessions-test
  (testing "Cleaning up stale sessions"
    ;; This test verifies the cleanup function exists and runs
    ;; without error. In real scenarios, it would remove old sessions.
    (is (nil? (collab/cleanup-stale-sessions!))
        "Cleanup should run without error")))
