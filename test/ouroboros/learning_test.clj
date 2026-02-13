(ns ouroboros.learning-test
  "Tests for the learning memory system"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.test-helper :as th]
   [ouroboros.learning :as learning]))

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

(defn unique-user []
  (keyword (str "learn-user-" (java.util.UUID/randomUUID))))

(deftest save-and-get-insight-test
  (testing "Save and retrieve a learning insight"
    (let [user (unique-user)
          result (learning/save-insight! user
                   {:title "Test Insight"
                    :insights ["Pattern discovered"]
                    :pattern "test-pattern"
                    :category "product-development"
                    :tags #{"test"}})]
      (is (map? result) "save-insight! should return a map")
      (is (:learning/id result) "Should have an ID")
      ;; Retrieve it (uses namespaced keys)
      (let [fetched (learning/get-learning (:learning/id result))]
        (is (some? fetched) "Should be retrievable")
        (is (= "Test Insight" (:learning/title fetched)) "Title should match")
        (is (= "test-pattern" (:learning/pattern fetched)) "Pattern should match")))))

(deftest get-user-history-test
  (testing "Getting all learnings for a user"
    (let [user (unique-user)]
      (learning/save-insight! user {:title "First" :insights ["a"] :category "cat1"})
      (learning/save-insight! user {:title "Second" :insights ["b"] :category "cat2"})
      (let [history (learning/get-user-history user)]
        (is (= 2 (count history)) "Should have 2 entries")))))

(deftest recall-by-pattern-test
  (testing "Recalling learnings by pattern"
    (let [user (unique-user)]
      (learning/save-insight! user {:title "Clojure Patterns" :insights ["i"]
                                     :pattern "clojure" :category "tech"})
      (learning/save-insight! user {:title "Other" :insights ["i"]
                                     :pattern "python" :category "tech"})
      (let [results (learning/recall-by-pattern user "clojure")]
        (is (= 1 (count results)) "Should find 1 match")
        (is (= "Clojure Patterns" (:learning/title (first results))))))))

(deftest recall-by-category-test
  (testing "Recalling learnings by category"
    (let [user (unique-user)]
      (learning/save-insight! user {:title "A" :insights ["x"] :category "product-development"})
      (learning/save-insight! user {:title "B" :insights ["y"] :category "product-development"})
      (learning/save-insight! user {:title "C" :insights ["z"] :category "tech"})
      (let [results (learning/recall-by-category user "product-development")]
        (is (= 2 (count results)) "Should find 2 in category")))))

(deftest get-user-stats-test
  (testing "Getting user learning statistics"
    (let [user (unique-user)]
      (learning/save-insight! user {:title "A" :insights ["x"] :category "cat1" :tags #{"a"}})
      (learning/save-insight! user {:title "B" :insights ["y"] :category "cat2" :tags #{"b"}})
      (let [stats (learning/get-user-stats user)]
        (is (map? stats) "Should return a map")
        (is (= 2 (:total-learnings stats)) "Should have 2 total")))))

(deftest delete-learning-test
  (testing "Deleting a learning record"
    (let [user (unique-user)
          saved (learning/save-insight! user {:title "To Delete" :insights ["x"] :category "c"})
          id (:learning/id saved)]
      (is (some? (learning/get-learning id)) "Should exist before delete")
      (learning/delete-learning! id)
      (is (nil? (learning/get-learning id)) "Should be nil after delete"))))

(deftest increment-application-test
  (testing "Incrementing application count"
    (let [user (unique-user)
          saved (learning/save-insight! user {:title "Applicable" :insights ["x"] :category "c"})
          id (:learning/id saved)]
      (learning/increment-application! id)
      (let [updated (learning/get-learning id)]
        (is (= 1 (:learning/applied-count updated)) "Should be 1 after first application")))))

(deftest init-test
  (testing "Init loads and indexes learning data"
    (is (some? (learning/init!)) "init! should return something")))
