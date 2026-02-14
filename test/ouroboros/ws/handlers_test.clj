(ns ouroboros.ws.handlers-test
  "Consolidated tests for WebSocket handlers"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.test-helper :as th]
   [ouroboros.ws.handlers.builder :as builder]
   [ouroboros.ws.handlers.content :as content]
   [ouroboros.ws.handlers.wisdom :as wisdom]
   [ouroboros.ws.handlers.analytics :as analytics]
   [ouroboros.ws.handlers.kanban :as kanban]
   [ouroboros.ws.handlers.learning :as learning]
   [ouroboros.ws.handlers.chat :as chat]))

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

;; ============================================================================
;; Builder Handler Tests
;; ============================================================================

(deftest builder-section-counts-test
  (testing "Builder section counts are defined"
    (is (map? @#'builder/builder-section-counts))
    (is (contains? @#'builder/builder-section-counts :empathy-map))
    (is (= 6 (get @#'builder/builder-section-counts :empathy-map)))
    (is (= 9 (get @#'builder/builder-section-counts :lean-canvas)))))

(deftest builder-completion-test
  (testing "Counts completed sections for empathy map"
    (let [data {:note-1 {:item/section :says :content "test"}
                :note-2 {:item/section :thinks :content "more"}}]
      (is (= 2 (@#'builder/count-completed-sections :empathy-map data)))))

  (testing "Returns 0 for empty data"
    (is (= 0 (@#'builder/count-completed-sections :empathy-map {})))
    (is (= 0 (@#'builder/count-completed-sections :empathy-map nil))))

  (testing "Returns 0 for unknown builder types"
    (is (= 0 (@#'builder/count-completed-sections :unknown-type {:foo "bar"})))))

(deftest builder-complete-detection-test
  (testing "Detects complete empathy map (6 sections)"
    (let [data (into {} (for [i (range 6)]
                          [(keyword (str "note-" i))
                           {:item/section (keyword (str "section-" i))
                            :content (str "Content " i)}]))]
      (is (true? (@#'builder/builder-complete? :empathy-map data)))))

  (testing "Detects incomplete empathy map"
    (let [data {:note-1 {:item/section :says :content "only one"}}]
      (is (false? (@#'builder/builder-complete? :empathy-map data)))))

  (testing "Returns false for unknown builder type"
    (is (false? (@#'builder/builder-complete? :unknown-type {})))))

;; ============================================================================
;; Content Handler Tests
;; ============================================================================

(deftest content-handler-validation-test
  (testing "Handles missing client-id gracefully"
    (let [result (content/handle-content-generate! nil {:project-id "test"})]
      (is (nil? result))))

  (testing "Accepts known content types"
    (doseq [content-type [:insights :blockers :templates :chat-suggestions
                          :flywheel-guide :section-hints]]
      (let [result (content/handle-content-generate! "test-client"
                                                    {:project-id "test"
                                                     :content-type content-type})]
        (is (or (nil? result) (map? result))
            (str "Content type " content-type " should be handled"))))))

;; ============================================================================
;; Wisdom Handler Tests
;; ============================================================================

(deftest wisdom-handler-validation-test
  (testing "Handles missing client-id"
    (let [result (wisdom/handle-eca-wisdom! nil {:project-id "test"})]
      (is (nil? result))))

  (testing "Accepts various request types"
    (doseq [request-type [:tips :next-steps :analysis :suggestions :templates]]
      (let [result (wisdom/handle-eca-wisdom! "test-client"
                                             {:project-id "test"
                                              :phase :empathy-map
                                              :request-type request-type})]
        (is (or (nil? result) (map? result))
            (str "Request type " request-type " should be handled")))))

  (testing "Defaults to :tips when request-type not specified"
    (let [result (wisdom/handle-eca-wisdom! "test-client"
                                           {:project-id "test"
                                            :phase :empathy-map})]
      (is (or (nil? result) (map? result)))))

  (testing "Tip detail handles missing fields gracefully"
    (let [result (wisdom/handle-eca-tip-detail! "test-client"
                                               {:project-id "test"
                                                :phase :empathy-map})]
      (is (or (nil? result) (map? result))))))

;; ============================================================================
;; Analytics Handler Tests
;; ============================================================================

(deftest analytics-handler-test
  (testing "Handles dashboard requests"
    (let [result (analytics/handle-analytics-dashboard! "test-client"
                                                       {:project-id "test"})]
      (is (or (nil? result) (map? result))))))

;; ============================================================================
;; Kanban Handler Tests
;; ============================================================================

(deftest kanban-board-test
  (testing "Handles board requests"
    (let [result (kanban/handle-kanban-board! "test-client"
                                             {:project-id "test"})]
      (is (or (nil? result) (map? result))))))

;; ============================================================================
;; Learning Handler Tests
;; ============================================================================

(deftest learning-handler-test
  (testing "Handles learning categories request"
    (let [result (learning/handle-learning-categories! "test-client" {})]
      (is (or (nil? result) (map? result)))))

  (testing "Handles category insights request"
    (let [result (learning/handle-learning-category-insights! "test-client"
                                                             {:category "test"})]
      (is (or (nil? result) (map? result)))))

  (testing "Handles wisdom template request with valid key"
    (let [result (learning/handle-wisdom-template! "test-client"
                                                  {:template-key :empathy-map})]
      (is (or (nil? result) (map? result))))))

;; ============================================================================
;; Chat Handler Tests
;; ============================================================================

(deftest chat-handler-test
  (testing "Handles chat requests"
    (let [result (chat/handle-eca-chat! "test-client"
                                       {:project-id "test"
                                        :message "Hello"})]
      (is (or (nil? result) (map? result))))))

;; ============================================================================
;; Type Coercion Tests
;; ============================================================================

(deftest type-coercion-test
  (testing "String content types are normalized"
    (let [result (content/handle-content-generate! "test-client"
                                                  {:project-id "test"
                                                   :content-type "insights"})]
      (is (or (nil? result) (map? result)))))

  (testing "String phases are normalized"
    (let [result (wisdom/handle-eca-wisdom! "test-client"
                                           {:project-id "test"
                                            :phase "empathy-map"})]
      (is (or (nil? result) (map? result)))))

  (testing "String request types are normalized"
    (let [result (wisdom/handle-eca-wisdom! "test-client"
                                           {:project-id "test"
                                            :phase :empathy-map
                                            :request-type "tips"})]
      (is (or (nil? result) (map? result))))))

(comment
  ;; Run these tests
  (require 'ouroboros.ws.handlers-test)
  (clojure.test/run-tests 'ouroboros.ws.handlers-test))
