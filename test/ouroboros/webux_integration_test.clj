(ns ouroboros.webux-integration-test
  "Web UX Platform integration tests

   Tests the full flow: project creation → builder sessions → data persistence
   
   Run with: bb test"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.test-helper :as th]
   [ouroboros.query :as query]
   [ouroboros.webux :as webux]))

;; ============================================================================
;; Test Fixtures
;; ============================================================================

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

;; ============================================================================
;; Helper Functions
;; ============================================================================

(def test-user-id :test-user-123)
(def test-project-name "Test AI Project")
(def test-project-description "A test project for Web UX Platform")

;; ============================================================================
;; Project Creation Tests
;; ============================================================================

(deftest project-creation-test
  (testing "Create and retrieve projects"
    (println "\n[TEST] Project creation flow")

    ;; 1. Create a project via mutation
    (let [create-result (query/q
                         `[{(webux/create-project!
                             {:user-id ~test-user-id
                              :name ~test-project-name
                              :description ~test-project-description})
                            [:project/id :project/name :project/description]}])]

      (is (map? create-result)
          "Create mutation should return a map")

      (let [project (get create-result 'ouroboros.webux/create-project!)]
        (is project "Should have created project")
        (is (:project/id project) "Project should have an ID")
        (is (= test-project-name (:project/name project))
            "Project name should match")
        (is (= test-project-description (:project/description project))
            "Project description should match")

        (println (str "  ✓ Created project: " (:project/id project)))

        ;; 2. Query user projects
        (let [projects-result (query/q
                               `[{(:user/projects {:user-id ~test-user-id})
                                  [:project/id :project/name :project/description :project/status]}])]

          (is (map? projects-result)
              "Projects query should return a map")

          (let [projects (get-in projects-result [:user/projects])]
            (is (vector? projects) "Projects should be a vector")
            (is (= 1 (count projects)) "Should have 1 project")
            (is (= test-project-name (:project/name (first projects)))
                "Project name should match in query")

            (println (str "  ✓ Retrieved " (count projects) " project(s)"))

            ;; 3. Query project by ID
            (let [project-id (:project/id project)
                  project-by-id-result (query/q
                                        `[{(:project/id {:user-id ~test-user-id
                                                         :project-id ~project-id})
                                           [:project/id :project/name :project/description]}])]

              (is (map? project-by-id-result)
                  "Project by ID query should return a map")

              (let [fetched-project (get-in project-by-id-result [:project/id])]
                (is fetched-project "Should fetch project by ID")
                (is (= project-id (:project/id fetched-project))
                    "Project IDs should match")

                (println (str "  ✓ Retrieved project by ID: " project-id))))))))))

;; ============================================================================
;; Builder Session Tests
;; ============================================================================

(deftest builder-session-flow-test
  (testing "Create and update builder sessions"
    (println "\n[TEST] Builder session flow")

    ;; First create a project
    (let [create-result (query/q
                         `[{(webux/create-project!
                             {:user-id ~test-user-id
                              :name "Builder Test Project"
                              :description "For testing builder sessions"})
                            [:project/id]}])

          project-id (get-in create-result ['ouroboros.webux/create-project! :project/id])

          ;; Start empathy map session
          session-result (query/q
                          `[{(webux/start-builder-session!
                              {:user-id ~test-user-id
                               :project-id ~project-id
                               :builder-type :empathy-map})
                             [:session/id :session/type :session/state :session/project-id]}])]

      (is (map? session-result)
          "Session creation should return a map")

      (let [session (get session-result 'ouroboros.webux/start-builder-session!)]
        (is session "Should have created session")
        (is (= :empathy-map (:session/type session))
            "Session type should be empathy-map")
        (is (= :active (:session/state session))
            "Session should be active")
        (is (= project-id (:session/project-id session))
            "Session should belong to project")

        (println (str "  ✓ Started builder session: " (:session/id session)))

        ;; Query project sessions
        (let [sessions-result (query/q
                               `[{(:project/sessions {:user-id ~test-user-id
                                                      :project-id ~project-id})
                                  [:session/id :session/type :session/state]}])]

          (is (map? sessions-result)
              "Sessions query should return a map")

          (let [sessions (get-in sessions-result [:project/sessions])]
            (is (vector? sessions) "Sessions should be a vector")
            (is (= 1 (count sessions)) "Should have 1 session")

            (println (str "  ✓ Retrieved " (count sessions) " session(s)"))

            ;; Complete the session
            (let [session-id (:session/id session)
                  complete-result (query/q
                                   `[{(webux/complete-builder-session!
                                       {:user-id ~test-user-id
                                        :session-id ~session-id})
                                      [:session/id :session/state]}])]

              (is (map? complete-result)
                  "Complete mutation should return a map")

              (let [completed-session (get complete-result 'ouroboros.webux/complete-builder-session!)]
                (is completed-session "Should have completed session")
                (is (= :completed (:session/state completed-session))
                    "Session should be completed")

                (println (str "  ✓ Completed session: " session-id))))))))))

;; ============================================================================
;; WebUX Stats Tests
;; ============================================================================

(deftest webux-stats-test
  (testing "Web UX platform statistics"
    (println "\n[TEST] WebUX stats")

    (let [stats-result (query/q
                        `[{(:webux/stats {:user-id ~test-user-id})
                           [:webux/project-count :webux/active-sessions-count
                            :webux/completed-sessions-count :webux/learning-count]}])]

      (is (map? stats-result)
          "Stats query should return a map")

      (let [stats (get-in stats-result [:webux/stats])]
        (is stats "Should have stats")
        (is (contains? stats :webux/project-count)
            "Stats should include project count")
        (is (contains? stats :webux/active-sessions-count)
            "Stats should include active sessions count")

        (println (str "  ✓ Retrieved WebUX stats"))
        (println (str "    Projects: " (:webux/project-count stats)))
        (println (str "    Active sessions: " (:webux/active-sessions-count stats)))))))

;; ============================================================================
;; Mutation Error Handling Tests
;; ============================================================================

(deftest mutation-error-handling-test
  (testing "Mutation error handling"
    (println "\n[TEST] Mutation error handling")

    ;; Try to create session with invalid builder type
    (try
      (let [create-result (query/q
                           `[{(webux/create-project!
                               {:user-id ~test-user-id
                                :name "Error Test"
                                :description "For error testing"})
                              [:project/id]}])

            project-id (get-in create-result ['ouroboros.webux/create-project! :project/id])

            ;; This should throw due to invalid builder type
            _ (query/q
               `[{(webux/start-builder-session!
                   {:user-id ~test-user-id
                    :project-id ~project-id
                    :builder-type :invalid-type})
                  [:session/id]}])]

        (is false "Should have thrown exception for invalid builder type"))

      (catch Exception e
        (is (instance? Exception e)
            "Should catch exception for invalid mutation")
        (println "  ✓ Invalid builder type rejected")))))

;; ============================================================================
;; Main Test Suite
;; ============================================================================

(comment
  ;; Run tests manually
  (require '[clojure.test :as t])
  (t/run-tests 'ouroboros.webux-integration-test)

  ;; Quick test in REPL
  (require '[ouroboros.test-helper :as th])
  (th/system-fixture
   (fn []
     (require '[ouroboros.query :as query])
     (let [result (query/q [:system/healthy?])]
       (println "System healthy?" result)))))