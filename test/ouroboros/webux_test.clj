(ns ouroboros.webux-test
  "Tests for Web UX Platform core functionality"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [clojure.spec.alpha :as s]
   [clojure.spec.test.alpha :as st]
   [ouroboros.test-helper :as th]
   [ouroboros.webux :as webux]
   [ouroboros.memory :as memory]
   [ouroboros.query :as query]))

(use-fixtures :once
  th/system-fixture)

(use-fixtures :each th/clean-fixture)

(defn generate-test-user []
  (keyword (str "test-user-" (java.util.UUID/randomUUID))))

(defn generate-project-name []
  (str "Project-" (java.util.UUID/randomUUID)))

;; --- Project CRUD Tests ---

(deftest create-project-test
  (testing "Creating a new project"
    (let [user (generate-test-user)
          create-result (query/q
                         `[{(webux/create-project!
                             {:user-id ~user
                              :name "AI Tool"
                              :description "Test project"})
                            [:project/id :project/name :project/status :project/created-at]}])
          result (val (first create-result))]
      (is (string? (:project/id result)) "Should generate project ID")
      (is (= "AI Tool" (:project/name result)) "Should preserve name")
      (is (= :draft (:project/status result)) "Should default to draft status")
      (is (string? (:project/created-at result)) "Should have creation timestamp")

      ;; Verify project is stored
      (let [projects-key (keyword (str "projects/" (name user)))]
        (is (contains? (memory/get-value projects-key) (:project/id result)) "Project should be in memory")))))

(deftest create-project-validation-test
  (testing "Project creation validation"
    (is (thrown? clojure.lang.ExceptionInfo
                 (webux/create-project! {:user-id nil :name "Test"}))
        "Should reject nil user-id")
    (is (thrown? clojure.lang.ExceptionInfo
                 (webux/create-project! {:user-id :user :name ""}))
        "Should reject empty name")
    (is (thrown? clojure.lang.ExceptionInfo
                 (webux/create-project! {:user-id :user :name "   "}))
        "Should reject whitespace-only name")
    (is (thrown? clojure.lang.ExceptionInfo
                 (webux/create-project! {:user-id :user}))
        "Should reject missing name")))

(deftest update-project-test
  (testing "Updating project details"
    (let [user (generate-test-user)
          project (webux/create-project! {:user-id user
                                          :name "Original Name"})
          project-id (:project/id project)]
      (webux/update-project! {:user-id user
                              :project-id project-id
                              :updates {:project/name "Updated Name"
                                        :project/status :active}})
      (let [updated-project (webux/project-by-id {:user-id user
                                                  :project-id project-id})]
        (is (= "Updated Name" (:project/name updated-project)) "Name should be updated")
        (is (= :active (:project/status updated-project)) "Status should be updated")
        (is (= project-id (:project/id updated-project)) "ID should remain same")))))

(deftest delete-project-test
  (testing "Deleting a project"
    (let [user (generate-test-user)
          project (webux/create-project! {:user-id user
                                          :name "To Delete"})
          project-id (:project/id project)]
      (webux/delete-project! {:user-id user :project-id project-id})
      (is (nil? (webux/project-by-id {:user-id user :project-id project-id}))
          "Project should be removed")
      (is (nil? (get (memory/get-value (keyword (str "projects/" (name user)))) project-id))
          "Project should be removed from memory"))))

(deftest user-projects-test
  (testing "Getting all projects for a user"
    (let [user1 (generate-test-user)
          user2 (generate-test-user)]
      (webux/create-project! {:user-id user1 :name "Project 1"})
      (webux/create-project! {:user-id user1 :name "Project 2"})
      (webux/create-project! {:user-id user2 :name "Other Project"})

      (let [result (webux/user-projects {:user-id user1})]
        (is (= 2 (count (:user/projects result))) "Should return only user's projects")
        (is (every? #(= user1 (keyword (:project/owner %)))
                    (:user/projects result))
            "All projects should belong to the user")
        (is (every? #(= :draft (:project/status %))
                    (:user/projects result))
            "All projects should be in draft status")))))

(deftest start-builder-session-test
  (testing "Starting a builder session"
    (let [project (webux/create-project! {:user-id :test-user-1 :name "Test Project"})
          session (webux/start-builder-session! {:user-id :test-user-1
                                                 :project-id (:project/id project)
                                                 :builder-type :empathy-map})]
      (is (string? (:session/id session)) "Should generate session ID")
      (is (= :empathy-map (:session/type session)) "Should have correct type")
      (is (= :active (:session/state session)) "Should be active")
      (is (map? (:session/data session)) "Should have session data"))))

(deftest start-builder-session-validation-test
  (testing "Builder session validation"
    (let [project (webux/create-project! {:user-id :test-user-1 :name "Test"})]
      (is (thrown? clojure.lang.ExceptionInfo
                   (webux/start-builder-session! {:user-id :test-user-1
                                                  :project-id (:project/id project)
                                                  :builder-type :invalid-type}))
          "Should reject invalid builder type"))))

(deftest update-builder-session-test
  (testing "Updating session data"
    (let [project (webux/create-project! {:user-id :test-user-1 :name "Test"})
          session (webux/start-builder-session! {:user-id :test-user-1
                                                 :project-id (:project/id project)
                                                 :builder-type :empathy-map})]
      (webux/update-builder-session! {:user-id :test-user-1
                                      :session-id (:session/id session)
                                      :data {:test "data"}})
      (let [updated (webux/session-by-id {:user-id :test-user-1
                                          :session-id (:session/id session)})]
        (is (= {:test "data"} (:session/data updated)) "Data should be updated")))))

(deftest complete-builder-session-test
  (testing "Completing a session"
    (let [project (webux/create-project! {:user-id :test-user-1 :name "Test"})
          session (webux/start-builder-session! {:user-id :test-user-1
                                                 :project-id (:project/id project)
                                                 :builder-type :empathy-map})]
      (webux/complete-builder-session! {:user-id :test-user-1
                                        :session-id (:session/id session)})
      (let [completed (webux/session-by-id {:user-id :test-user-1
                                            :session-id (:session/id session)})]
        (is (= :completed (:session/state completed)) "Should be completed")
        (is (string? (:session/completed-at completed)) "Should have completion timestamp")))))

(deftest project-sessions-test
  (testing "Getting sessions for a project"
    (let [project (webux/create-project! {:user-id :test-user-1 :name "Test"})]
      (webux/start-builder-session! {:user-id :test-user-1
                                     :project-id (:project/id project)
                                     :builder-type :empathy-map})
      (webux/start-builder-session! {:user-id :test-user-1
                                     :project-id (:project/id project)
                                     :builder-type :lean-canvas})

      (let [result (webux/project-sessions {:user-id :test-user-1
                                            :project-id (:project/id project)})]
        (is (= 2 (count (:project/sessions result))) "Should have 2 sessions")
        (is (= #{:empathy-map :lean-canvas}
               (set (map :session/type (:project/sessions result))))
            "Should have correct session types")))))

(deftest webux-stats-test
  (testing "Getting Web UX statistics"
    (webux/create-project! {:user-id :test-user-2 :name "Project 1"})
    (webux/create-project! {:user-id :test-user-2 :name "Project 2"})
    (let [project (webux/create-project! {:user-id :test-user-2 :name "Project 3"})
          session (webux/start-builder-session! {:user-id :test-user-2
                                                 :project-id (:project/id project)
                                                 :builder-type :empathy-map})]
      (webux/complete-builder-session! {:user-id :test-user-2
                                        :session-id (:session/id session)})

      (let [stats (webux/webux-stats {:user-id :test-user-2})]
        (is (= 3 (:webux/project-count stats)) "Should count projects")
        (is (= 0 (:webux/active-sessions-count stats)) "Should count active sessions")
        (is (= 1 (:webux/completed-sessions-count stats)) "Should count completed sessions")))))
