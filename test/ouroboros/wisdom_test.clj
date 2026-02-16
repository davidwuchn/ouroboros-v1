(ns ouroboros.wisdom-test
  "Tests for Wisdom engine and AI insights"
  (:require
   [clojure.set :as set]
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.test-helper :as th]
   [ouroboros.wisdom :as wisdom]
   [ouroboros.learning :as learning]))

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

(deftest list-templates-test
  (testing "Listing available templates"
    (let [templates (wisdom/list-templates)]
      (is (<= 9 (count templates)) "Should have at least 9 templates")
      (is (every? :template/key templates) "Each should have a key")
      (is (every? :template/name templates) "Each should have a name")
      (is (every? :template/description templates) "Each should have a description")
      (is (set/subset?
           #{:saas :marketplace :mobile-app :developer-tool}
           (set (map :template/key templates)))
          "Should include original 4 template keys"))))

(deftest get-template-test
  (testing "Getting a specific template"
    (let [saas (wisdom/get-template :saas)]
      (is (= "SaaS Product" (:name saas)) "Should have correct name")
      (is (map? (:empathy-map saas)) "Should have empathy map data")
      (is (map? (:lean-canvas saas)) "Should have lean canvas data")
      (is (string? (:uvp (:lean-canvas saas))) "Should have UVP")))

  (testing "Getting non-existent template"
    (is (nil? (wisdom/get-template :nonexistent)))))

(deftest apply-template-test
  (testing "Applying a template to a session"
    (let [result (wisdom/apply-template :session-123 :saas :test-user)]
      (is (:template/applied? result) "Should indicate success")
      (is (= "SaaS Product" (:template/name result)) "Should return template name")
      (is (map? (:template/data result)) "Should return template data")))

  (testing "Applying non-existent template"
    (let [result (wisdom/apply-template :session-123 :nonexistent :test-user)]
      (is (= :template-not-found (:error result)) "Should return error"))))

(deftest analyze-learning-patterns-test
  (testing "Analyzing user learning patterns"
    ;; Create some learning data
    (learning/save-insight! :pattern-user
                            {:title "Test 1"
                             :insights ["Insight 1"]
                             :pattern "test-pattern"
                             :category "product-development"
                             :tags #{"test"}})
    (learning/save-insight! :pattern-user
                            {:title "Test 2"
                             :insights ["Insight 2"]
                             :pattern "test-pattern"
                             :category "customer-understanding"
                             :tags #{"test"}})

    (let [analysis (wisdom/analyze-learning-patterns :pattern-user)]
      (is (= 2 (:total-insights analysis)) "Should count total insights")
      (is (= {"product-development" 1 "customer-understanding" 1}
             (:categories analysis)) "Should group by category")
      (is (= {"test-pattern" 2}
             (:patterns analysis)) "Should group by pattern"))))

(deftest generate-insights-empathy-test
  (testing "Generating insights from empathy map"
    (let [canvas-data {:empathy/sections {:pains "Slow workflows"
                                          :gains "More time"}}
          insights (wisdom/generate-insights canvas-data :empathy-map)]
      (is (seq insights) "Should generate insights")
      (is (every? :insight/type insights) "Each should have a type")
      (is (every? :insight/confidence insights) "Each should have confidence"))))

(deftest generate-insights-canvas-test
  (testing "Generating insights from lean canvas"
    (let [canvas-data {:canvas/blocks {:problems "Slow workflows"
                                       :solution "Automation"}}
          insights (wisdom/generate-insights canvas-data :lean-canvas)]
      (is (seq insights) "Should generate insights")
      (is (some #(= :problem-solution-fit (:insight/type %)) insights)
          "Should detect problem-solution fit"))))

(deftest suggest-next-step-test
  (testing "Suggesting next steps for empathy map"
    (let [incomplete {:empathy/sections {:persona "Dev"}}
          suggestion (wisdom/suggest-next-step :empathy-map incomplete)]
      (is (= :empathy-map (:suggestion/next-stage suggestion)) "Should stay on empathy")
      (is (string? (:suggestion/action suggestion)) "Should have action")))

  (testing "Suggesting next steps for completed empathy"
    (let [complete {:empathy/sections {:pains-gains "Done"}}
          suggestion (wisdom/suggest-next-step :empathy-map complete)]
      (is (= :value-proposition (:suggestion/next-stage suggestion))
          "Should suggest value proposition"))))

(deftest assemble-context-test
  (testing "Assembling context for ECA"
    (learning/save-insight! :context-user
                            {:title "Learning"
                             :insights ["Test"]
                             :pattern "test"
                             :category "test"})

    (let [canvas-data {:canvas/blocks {:problems "Test"}}
          context (wisdom/assemble-context :canvas-123 canvas-data :lean-canvas :context-user)]
      (is (= :canvas-123 (:context/canvas-id context)))
      (is (= :lean-canvas (:context/canvas-type context)))
      (is (map? (:context/data context)))
      (is (map? (:context/user-patterns context)))
      (is (number? (:context/timestamp context))))))

(deftest suggest-templates-test
  (testing "Suggesting templates based on description"
    (let [suggestions (wisdom/suggest-templates "SaaS platform for developers")]
      (is (seq suggestions) "Should return suggestions")
      (is (some #{:saas :developer-tool} [(first suggestions)])
          "Should suggest SaaS or developer-tool for developer SaaS platform")
      (is (every? keyword? suggestions) "All suggestions should be keywords"))))
