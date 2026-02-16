(ns ouroboros.webux-integration-test
  "Web UX Platform integration tests

   Tests the full flow: project creation -> builder sessions -> data persistence
   Uses direct function calls (not EQL) for reliable cross-subsystem testing."
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.test-helper :as th]
   [ouroboros.webux :as webux]))

;; ============================================================================
;; Test Fixtures
;; ============================================================================

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

;; ============================================================================
;; Helper Functions
;; ============================================================================

(defn unique-user []
  (keyword (str "integ-user-" (java.util.UUID/randomUUID))))

;; ============================================================================
;; Project Creation Integration Tests
;; ============================================================================

(deftest project-creation-test
  (testing "Full project creation and retrieval flow"
    (println "\n[TEST] Project creation flow")

    (let [user (unique-user)
          ;; 1. Create a project
          project (webux/create-project! {:user-id user
                                          :name "Test AI Project"
                                          :description "Integration test project"})]

      (is (:project/id project) "Project should have an ID")
      (is (= "Test AI Project" (:project/name project)) "Name should match")
      (is (= "Integration test project" (:project/description project)) "Description should match")
      (println (str "  ✓ Created project: " (:project/id project)))

      ;; 2. Query user projects
      (let [{:keys [user/projects]} (webux/user-projects {:user-id user})]
        (is (= 1 (count projects)) "Should have 1 project")
        (is (= "Test AI Project" (:project/name (first projects)))
            "Project name should match in query")
        (println (str "  ✓ Retrieved " (count projects) " project(s)")))

      ;; 3. Query project by ID
      (let [fetched (webux/project-by-id {:user-id user
                                           :project-id (:project/id project)})]
        (is fetched "Should fetch project by ID")
        (is (= (:project/id project) (:project/id fetched)) "IDs should match")
        (println (str "  ✓ Retrieved project by ID: " (:project/id project)))))))

;; ============================================================================
;; Builder Session Integration Tests
;; ============================================================================

(deftest builder-session-flow-test
  (testing "Full builder session lifecycle"
    (println "\n[TEST] Builder session flow")

    (let [user (unique-user)
          ;; Create project
          project (webux/create-project! {:user-id user
                                          :name "Builder Test Project"
                                          :description "For testing builder sessions"})
          project-id (:project/id project)

          ;; Start empathy map session
          session (webux/start-builder-session! {:user-id user
                                                  :project-id project-id
                                                  :builder-type :empathy-map})]

      (is (:session/id session) "Session should have an ID")
      (is (= :empathy-map (:session/type session)) "Session type should be empathy-map")
      (is (= :active (:session/state session)) "Session should be active")
      (println (str "  ✓ Started builder session: " (:session/id session)))

      ;; Query project sessions
      (let [{:keys [project/sessions]} (webux/project-sessions {:user-id user
                                                                  :project-id project-id})]
        (is (= 1 (count sessions)) "Should have 1 session")
        (println (str "  ✓ Retrieved " (count sessions) " session(s)")))

      ;; Update session data
      (webux/update-builder-session! {:user-id user
                                       :session-id (:session/id session)
                                       :data {:persona "Developer"
                                              :pains "Too many tools"}})

      (let [updated (webux/session-by-id {:user-id user
                                           :session-id (:session/id session)})]
        (is (= "Developer" (:persona (:session/data updated)))
            "Session data should be updated")
        (println "  ✓ Updated session data"))

      ;; Complete the session
      (webux/complete-builder-session! {:user-id user
                                         :session-id (:session/id session)})

      (let [completed (webux/session-by-id {:user-id user
                                             :session-id (:session/id session)})]
        (is (= :completed (:session/state completed)) "Session should be completed")
        (println (str "  ✓ Completed session: " (:session/id session)))))))

;; ============================================================================
;; WebUX Stats Integration Tests
;; ============================================================================

(deftest webux-stats-test
  (testing "Platform statistics reflect actual data"
    (println "\n[TEST] WebUX stats")

    (let [user (unique-user)]
      ;; Create some projects and sessions
      (webux/create-project! {:user-id user :name "Project 1"})
      (let [p2 (webux/create-project! {:user-id user :name "Project 2"})
            session (webux/start-builder-session! {:user-id user
                                                    :project-id (:project/id p2)
                                                    :builder-type :empathy-map})]
        (webux/complete-builder-session! {:user-id user
                                           :session-id (:session/id session)}))

      ;; Check stats
      (let [stats (webux/webux-stats {:user-id user})]
        (is (= 2 (:webux/project-count stats)) "Should count 2 projects")
        (is (= 0 (:webux/active-sessions-count stats)) "Should have 0 active sessions")
        (is (= 1 (:webux/completed-sessions-count stats)) "Should have 1 completed session")
        (println (str "  ✓ Stats: " (:webux/project-count stats) " projects, "
                      (:webux/completed-sessions-count stats) " completed"))))))

;; ============================================================================
;; Mutation Error Handling Tests
;; ============================================================================

(deftest mutation-error-handling-test
  (testing "Invalid builder type is rejected"
    (println "\n[TEST] Mutation error handling")

    (let [user (unique-user)
          project (webux/create-project! {:user-id user
                                          :name "Error Test"
                                          :description "For error testing"})]
      (is (thrown? clojure.lang.ExceptionInfo
                   (webux/start-builder-session! {:user-id user
                                                   :project-id (:project/id project)
                                                   :builder-type :invalid-type}))
          "Should throw for invalid builder type")
      (println "  ✓ Invalid builder type rejected"))))
