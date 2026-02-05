(ns ouroboros.analytics-test
  "Tests for Analytics and metrics"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.test-helper :as th]
   [ouroboros.analytics :as analytics]
   [ouroboros.webux :as webux]))

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

(deftest calculate-completion-empathy-test
  (testing "Calculating empathy map completion"
    (let [empty-data {:empathy/sections {}}
          result (analytics/calculate-completion empty-data :empathy-map)]
      (is (= 0 (:completed result)))
      (is (= 6 (:total result)))
      (is (= 0 (:percentage result))))
    
    (let [partial-data {:empathy/sections {:persona "Dev"
                                           :pains "Slow"}}
          result (analytics/calculate-completion partial-data :empathy-map)]
      (is (= 2 (:completed result)))
      (is (= 33 (:percentage result))))
    
    (let [complete-data {:empathy/sections {:persona "X" :think-feel "X"
                                            :hear "X" :see "X"
                                            :say-do "X" :pains-gains "X"}}
          result (analytics/calculate-completion complete-data :empathy-map)]
      (is (= 6 (:completed result)))
      (is (= 100 (:percentage result))))))

(deftest calculate-completion-canvas-test
  (testing "Calculating lean canvas completion"
    (let [empty-data {:canvas/blocks {}}
          result (analytics/calculate-completion empty-data :lean-canvas)]
      (is (= 0 (:completed result)))
      (is (= 9 (:total result))))
    
    (let [partial-data {:canvas/blocks {:problems "X" :solution "X"}}
          result (analytics/calculate-completion partial-data :lean-canvas)]
      (is (= 2 (:completed result)))
      (is (= 22 (:percentage result))))))

(deftest project-progress-test
  (testing "Getting project progress"
    (let [project (webux/create-project! {:user-id :analytics-user
                                          :name "Test Project"})
          session (webux/start-builder-session! {:user-id :analytics-user
                                                  :project-id (:project/id project)
                                                  :builder-type :empathy-map})]
      ;; Update session with some data
      (webux/update-builder-session! {:user-id :analytics-user
                                      :session-id (:session/id session)
                                      :data {:empathy/sections {:persona "Dev"}}})
      
      (let [progress (analytics/project-progress (:project/id project) :analytics-user)]
        (is (= (:project/id project) (:project/id progress)))
        (is (seq (:project/stages progress)) "Should have stages")
        (is (number? (:project/overall-percentage progress)) "Should have overall percentage")))))

(deftest time-in-stage-test
  (testing "Calculating time spent in stage"
    (let [created (str (java.time.Instant/now))
          _ (Thread/sleep 10)
          updated (str (java.time.Instant/now))
          session-data {:session/created-at created
                        :session/updated-at updated}]
      (let [result (analytics/time-in-stage session-data)]
        (is (pos? (:stage/time-total-ms result)) "Should have positive time")
        (is (nil? (:stage/time-to-completion-ms result)) "Not completed yet"))
      
      ;; Test completed session
      (let [completed-data (assoc session-data :session/completed-at updated)
            result (analytics/time-in-stage completed-data)]
        (is (pos? (:stage/time-to-completion-ms result)) "Should have completion time")))))

(deftest calculate-health-score-test
  (testing "Calculating project health score"
    ;; Empty project
    (let [empty-project (webux/create-project! {:user-id :health-user
                                                :name "Empty"})
          health (analytics/calculate-health-score (:project/id empty-project) :health-user)]
      (is (number? (:health/score health)))
      (is (map? (:health/factors health))))
    
    ;; Project with empathy map
    (let [project (webux/create-project! {:user-id :health-user
                                          :name "With Empathy"})
          session (webux/start-builder-session! {:user-id :health-user
                                                  :project-id (:project/id project)
                                                  :builder-type :empathy-map})]
      (webux/complete-builder-session! {:user-id :health-user
                                        :session-id (:session/id session)})
      (let [health (analytics/calculate-health-score (:project/id project) :health-user)]
        (is (pos? (:health/score health)) "Should have positive score")
        (is (get-in health [:health/factors :empathy-complete?])
            "Should detect completed empathy")))))

(deftest predict-success-test
  (testing "Predicting project success"
    ;; Empty project should predict low likelihood
    (let [project (webux/create-project! {:user-id :predict-user
                                          :name "New"})
          prediction (analytics/predict-success (:project/id project) :predict-user)]
      (is (contains? #{:low :very-low} (:likelihood prediction))
          "Empty project should have low success prediction")
      (is (number? (:confidence prediction)))
      (is (string? (:message prediction))))
    
    ;; Project with multiple completed stages
    (let [project (webux/create-project! {:user-id :predict-user
                                          :name "Advanced"})]
      ;; Add empathy
      (let [empathy (webux/start-builder-session! {:user-id :predict-user
                                                    :project-id (:project/id project)
                                                    :builder-type :empathy-map})]
        (webux/complete-builder-session! {:user-id :predict-user
                                          :session-id (:session/id empathy)}))
      ;; Add value prop
      (let [vp (webux/start-builder-session! {:user-id :predict-user
                                               :project-id (:project/id project)
                                               :builder-type :value-proposition})]
        (webux/complete-builder-session! {:user-id :predict-user
                                          :session-id (:session/id vp)}))
      
      (let [prediction (analytics/predict-success (:project/id project) :predict-user)]
        (is (contains? #{:medium :high} (:likelihood prediction))
            "Advanced project should have better prediction")))))

(deftest user-dashboard-test
  (testing "Getting user dashboard data"
    ;; Create some projects and sessions
    (webux/create-project! {:user-id :dashboard-user :name "P1"})
    (webux/create-project! {:user-id :dashboard-user :name "P2"})
    
    (let [dashboard (analytics/user-dashboard :dashboard-user)]
      (is (= 2 (:dashboard/project-count dashboard)))
      (is (number? (:dashboard/overall-progress dashboard)))
      (is (seq (:dashboard/recent-activity dashboard)) "Should have recent activity"))))
