(ns ouroboros.ws.handlers.learning
  "Learning handlers - categories, insights, save-examples, wisdom-template."
  (:require
   [clojure.string :as str]
   [ouroboros.learning :as learning]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.wisdom :as wisdom]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.context :as ctx]))

;; ============================================================================
;; Learning Categories
;; ============================================================================

(defn handle-learning-categories!
  "Return learning categories with real insight counts from memory.
   Fast (no ECA) -- reads directly from learning memory."
  [client-id _message]
  (let [user-id (ctx/current-user-id)
        patterns (wisdom/analyze-learning-patterns user-id)
        all-learnings (learning/recall-by-pattern user-id "")
        by-category (group-by :learning/category all-learnings)
        categories (map (fn [[cat records]]
                          {:category cat
                           :label (str/capitalize (str/replace (or cat "general") #"[-_/]" " "))
                           :count (count records)
                           :recent (take 3 (reverse (sort-by :learning/created records)))})
                        by-category)
        default-cats ["customer-understanding" "product-development"
                      "business-model" "general" "errors/fixes"]
        existing-cats (set (map :category categories))
        with-defaults (concat categories
                              (for [c default-cats
                                    :when (not (existing-cats c))]
                                {:category c
                                 :label (str/capitalize (str/replace c #"[-_/]" " "))
                                 :count 0
                                 :recent []}))]
    (conn/send-to! client-id {:type :learning/categories
                              :categories (vec with-defaults)
                              :total-insights (:total-insights patterns 0)
                              :timestamp (System/currentTimeMillis)})))

;; ============================================================================
;; Category Insights
;; ============================================================================

(defn handle-learning-category-insights!
  "Return actual insight records for a specific category."
  [client-id {:keys [category]}]
  (let [user-id (ctx/current-user-id)
        records (learning/recall-by-category user-id (or category "general"))
        sorted (reverse (sort-by :learning/created records))
        insights (mapv (fn [r]
                         {:id (:learning/id r)
                          :title (:learning/title r)
                          :category (:learning/category r)
                          :pattern (:learning/pattern r)
                          :insights (:learning/insights r)
                          :examples (:learning/examples r)
                          :tags (vec (:learning/tags r))
                          :created (:learning/created r)
                          :confidence (:learning/confidence r)
                          :applied-count (:learning/applied-count r)})
                       sorted)]
    (conn/send-to! client-id {:type :learning/category-insights
                              :category (or category "general")
                              :insights insights
                              :count (count insights)
                              :timestamp (System/currentTimeMillis)})))

;; ============================================================================
;; Save Examples
;; ============================================================================

(defn- format-example-items
  "Convert builder data into a list of example items."
  [_builder-type data]
  (let [notes (vals (or data {}))]
    (map (fn [note]
           {:section (name (:item/section note))
            :content (:item/content note)
            :kind :sticky-note})
         notes)))

(defn handle-learning-save-examples!
  "Persist builder contents as learning examples"
  [client-id {:keys [project-id label template-key builder-type _session-id data]}]
  (let [user-id (ctx/current-user-id)
        builder-type-kw (if (string? builder-type) (keyword builder-type) builder-type)
        title (str "Wisdom Example - " label)
        examples (format-example-items builder-type-kw data)
        tags (cond-> #{"wisdom" "example" (name builder-type-kw)}
               template-key (conj (name template-key))
               project-id (conj (str project-id)))]
    (learning/save-insight! user-id
                            {:title title
                             :insights [(str "Captured builder examples from " label)]
                             :pattern "wisdom-example"
                             :category "product-development"
                             :tags tags
                             :examples (vec examples)})
    (telemetry/emit! {:event :wisdom/examples-saved
                      :client-id client-id
                      :project-id project-id
                      :builder-type builder-type-kw})
    (conn/send-to! client-id {:type :learning/examples-saved
                              :project-id project-id
                              :builder-type builder-type-kw
                              :timestamp (System/currentTimeMillis)})))

;; ============================================================================
;; Wisdom Template
;; ============================================================================

(defn handle-wisdom-template!
  "Return template data by key"
  [client-id {:keys [template-key]}]
  (let [template-kw (keyword template-key)
        template (wisdom/get-template template-kw)]
    (conn/send-to! client-id {:type :wisdom/template
                              :template-key (name template-kw)
                              :data template
                              :timestamp (System/currentTimeMillis)})))

;; ============================================================================
;; Learning Flywheel
;; ============================================================================

(defn handle-learning-flywheel!
  "Return user's learning flywheel progress data."
  [client-id _message]
  (let [user-id (ctx/current-user-id)
        progress (learning/flywheel-progress user-id)]
    (conn/send-to! client-id {:type :learning/flywheel
                              :total (:total progress)
                              :by-level (:by-level progress)
                              :current-level (:current-level progress)
                              :progress-to-next (:progress-to-next progress)
                              :suggested-focus (:suggested-focus progress)
                              :recent-insights (:recent-insights progress)
                              :timestamp (System/currentTimeMillis)})))

;; ============================================================================
;; Spaced Repetition - Review System
;; ============================================================================

(defn handle-learning-due-reviews!
  "Return learning reviews that are due for the user"
  [client-id _message]
  (let [user-id (ctx/current-user-id)
        due (learning/get-due-reviews user-id)
        stats (learning/get-review-stats user-id)]
    (conn/send-to! client-id {:type :learning/due-reviews
                              :reviews due
                              :due-count (count due)
                              :stats stats
                              :timestamp (System/currentTimeMillis)})))

(defn handle-learning-complete-review!
  "Complete a review and schedule next one"
  [client-id {:keys [learning-id confidence]}]
  (let [result (learning/complete-review! learning-id confidence)
        updated-learning (learning/get-learning learning-id)]
    (conn/send-to! client-id {:type :learning/review-completed
                              :learning-id learning-id
                              :next-review (:next-review result)
                              :level (:level result)
                              :title (:learning/title updated-learning)
                              :timestamp (System/currentTimeMillis)})
    ;; Send updated due reviews
    (handle-learning-due-reviews! client-id nil)))

(defn handle-learning-skip-review!
  "Skip a review (reschedule with shorter interval)"
  [client-id {:keys [learning-id]}]
  (let [result (learning/skip-review! learning-id)
        updated-learning (learning/get-learning learning-id)]
    (conn/send-to! client-id {:type :learning/review-skipped
                              :learning-id learning-id
                              :next-review (:next-review result)
                              :level (:level result)
                              :title (:learning/title updated-learning)
                              :timestamp (System/currentTimeMillis)})
    ;; Send updated due reviews
    (handle-learning-due-reviews! client-id nil)))

;; ============================================================================
;; Learning Search
;; ============================================================================

(defn handle-learning-search!
  "Search learning insights by query string"
  [client-id {:keys [query]}]
  (let [user-id (ctx/current-user-id)
        results (learning/find-related user-id (or query ""))]
    (conn/send-to! client-id {:type :learning/search-results
                              :query query
                              :results (mapv #(select-keys % [:learning/id
                                                              :learning/title
                                                              :learning/category
                                                              :learning/insights
                                                              :match-score])
                                            results)
                              :count (count results)
                              :timestamp (System/currentTimeMillis)})))
