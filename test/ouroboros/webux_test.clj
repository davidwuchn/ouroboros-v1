(ns ouroboros.webux-test
  "Tests for Web UX Platform core functionality"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.test-helper :as th]
   [ouroboros.webux :as webux]
   [ouroboros.memory :as memory]))

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

(deftest create-project-test
  (testing "Creating a new project"
    (let [result (webux/create-project! {:user-id :test-user
                                          :name "AI Tool"
                                          :description "Test project"})]
      (is (string? (:project/id result)) "Should generate project ID")
      (is (= "AI Tool" (:project/name result)) "Should preserve name")
      (is (= :draft (:project/status result)) "Should default to draft status")
      (is (string? (:project/created-at result)) "Should have creation timestamp"))))

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
        "Should reject whitespace-only name")))

(deftest update-project-test
  (testing "Updating project details"
    (let [project (webux/create-project! {:user-id :test-user
                                          :name "Original Name"})
          project-id (:project/id project)]
      (webux/update-project! {:user-id :test-user
                              :project-id project-id
                              :updates {:project/name "Updated Name"
                                        :project/status :active}})
      (let [updated (get-in @memory/memory-store [(keyword (str "projects/test-user")) project-id])]
        (is (= "Updated Name" (:project/name updated)) "Name should be updated")
        (is (= :active (:project/status updated)) "Status should be updated")))))

(deftest delete-project-test
  (testing "Deleting a project"
    (let [project (webux/create-project! {:user-id :test-user
                                          :name "To Delete"})
          project-id (:project/id project)]
      (webux/delete-project! {:user-id :test-user :project-id project-id})
      (let [projects (memory/get-value :projects/test-user)]
        (is (nil? (get projects project-id)) "Project should be removed")))))

(deftest user-projects-test
  (testing "Getting all projects for a user"
    (webux/create-project! {:user-id :multi-user :name "Project 1"})
    (webux/create-project! {:user-id :multi-user :name "Project 2"})
    (webux/create-project! {:user-id :other-user :name "Other Project"})
    
    (let [result (webux/user-projects {:user-id :multi-user})]
      (is (= 2 (count (:user/projects result))) "Should return only user's projects")
      (is (every? #(= :multi-user (keyword (:project/owner %)))
                  (:user/projects result))
          "All projects should belong to the user"))))

(deftest start-builder-session-test
  (testing "Starting a builder session"
    (let [project (webux/create-project! {:user-id :test-user :name "Test Project"})
          session (webux/start-builder-session! {:user-id :test-user
                                                  :project-id (:project/id project)
                                                  :builder-type :empathy-map})]
      (is (string? (:session/id session)) "Should generate session ID")
      (is (= :empathy-map (:session/type session)) "Should have correct type")
      (is (= :active (:session/state session)) "Should be active")
      (is (map? (:session/data session)) "Should have session data"))))

(deftest start-builder-session-validation-test
  (testing "Builder session validation"
    (let [project (webux/create-project! {:user-id :test-user :name "Test"})]
      (is (thrown? clojure.lang.ExceptionInfo
                   (webux/start-builder-session! {:user-id :test-user
                                                  :project-id (:project/id project)
                                                  :builder-type :invalid-type}))
          "Should reject invalid builder type"))))

(deftest update-builder-session-test
  (testing "Updating session data"
    (let [project (webux/create-project! {:user-id :test-user :name "Test"})
          session (webux/start-builder-session! {:user-id :test-user
                                                  :project-id (:project/id project)
                                                  :builder-type :empathy-map})]
      (webux/update-builder-session! {:user-id :test-user
                                      :session-id (:session/id session)
                                      :data {:test "data"}})
      (let [updated (webux/session-by-id {:user-id :test-user
                                          :session-id (:session/id session)})]
        (is (= {:test "data"} (:session/data updated)) "Data should be updated")))))

(deftest complete-builder-session-test
  (testing "Completing a session"
    (let [project (webux/create-project! {:user-id :test-user :name "Test"})
          session (webux/start-builder-session! {:user-id :test-user
                                                  :project-id (:project/id project)
                                                  :builder-type :empathy-map})]
      (webux/complete-builder-session! {:user-id :test-user
                                        :session-id (:session/id session)})
      (let [completed (webux/session-by-id {:user-id :test-user
                                            :session-id (:session/id session)})]
        (is (= :completed (:session/state completed)) "Should be completed")
        (is (string? (:session/completed-at completed)) "Should have completion timestamp")))))

(deftest project-sessions-test
  (testing "Getting sessions for a project"
    (let [project (webux/create-project! {:user-id :test-user :name "Test"})]
      (webux/start-builder-session! {:user-id :test-user
                                      :project-id (:project/id project)
                                      :builder-type :empathy-map})
      (webux/start-builder-session! {:user-id :test-user
                                      :project-id (:project/id project)
                                      :builder-type :lean-canvas})
      
      (let [result (webux/project-sessions {:user-id :test-user
                                            :project-id (:project/id project)})]
        (is (= 2 (count (:project/sessions result))) "Should have 2 sessions")
        (is (= #{:empathy-map :lean-canvas}
               (set (map :session/type (:project/sessions result))))
            "Should have correct session types")))))

(deftest webux-stats-test
  (testing "Getting Web UX statistics"
    (webux/create-project! {:user-id :stats-user :name "Project 1"})
    (webux/create-project! {:user-id :stats-user :name "Project 2"})
    (let [project (webux/create-project! {:user-id :stats-user :name "Project 3"})
          session (webux/start-builder-session! {:user-id :stats-user
                                                  :project-id (:project/id project)
                                                  :builder-type :empathy-map})]
      (webux/complete-builder-session! {:user-id :stats-user
                                        :session-id (:session/id session)})
      
      (let [stats (webux/webux-stats {:user-id :stats-user})]
        (is (= 3 (:webux/project-count stats)) "Should count projects")
        (is (= 0 (:webux/active-sessions-count stats)) "Should count active sessions")
        (is (= 1 (:webux/completed-sessions-count stats)) "Should count completed sessions")))))
