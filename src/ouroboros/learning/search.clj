(ns ouroboros.learning.search
  "Search and related finding for learning system"
  (:require
   [clojure.string :as str]
   [clojure.set :as set]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.learning.core :as core]
   [ouroboros.learning.index :as idx]))

;; ============================================================================
;; Pattern Matching
;; ============================================================================

(defn recall-by-pattern
  "Find learnings matching a pattern using tag index first"
  [user-id pattern & {:keys [limit] :or {limit 20}}]
  (let [norm-pattern (str/lower-case pattern)
        ;; Check tag index first
        tag-matches (idx/get-tag-learnings norm-pattern)
        ;; Get user's learnings
        user-ids (set (idx/get-user-learning-ids user-id))
        ;; Intersection for tagged matches
        candidate-ids (set/intersection tag-matches user-ids)
        ;; Add recent user learnings as candidates
        all-candidates (set/union candidate-ids
                                  (set (take 100 user-ids)))]
    (->> all-candidates
         (map core/get-learning)
         (remove nil?)
         (filter (fn [learning]
                   (or (str/includes? (str/lower-case (:learning/pattern learning "")) norm-pattern)
                       (some #(str/includes? (str/lower-case %) norm-pattern) (:learning/tags learning))
                       (str/includes? (str/lower-case (:learning/title learning "")) norm-pattern)
                       (some #(str/includes? (str/lower-case %) norm-pattern) (:learning/insights learning)))))
         (take limit))))

;; ============================================================================
;; Related Learning
;; ============================================================================

(defn find-related
  "Find learnings related to current context with scoring
   Uses tag index for O(1) candidate lookup"
  [user-id context & {:keys [limit] :or {limit 5}}]
  (let [norm-context (str/lower-case context)
        context-words (set (str/split norm-context #"\s+"))
        ;; Get candidates from tag index
        tag-candidates (apply set/union
                              (map idx/get-tag-learnings context-words))
        user-ids (set (idx/get-user-learning-ids user-id))
        candidate-ids (set/intersection tag-candidates user-ids)]
    (->> candidate-ids
         (map core/get-learning)
         (remove nil?)
         (map (fn [learning]
                (let [title-words (set (str/split (str/lower-case (:learning/title learning "")) #"\s+"))
                      pattern (:learning/pattern learning "")
                      tags (:learning/tags learning [])
                      transfers (:learning/transfers learning [])

                      score (+ (* (if (str/includes? pattern norm-context) 10 0) 1.0)
                               (* (count (set/intersection (set tags) context-words)) 5.0)
                               (* (count (set/intersection title-words context-words)) 3.0)
                               (* (count (filter #(str/includes? (str/lower-case %) norm-context) transfers)) 2.0))]
                  (assoc learning :match-score score))))
         (filter #(pos? (:match-score %)))
         (sort-by :match-score >)
         (take limit))))

;; ============================================================================
;; Category Search
;; ============================================================================

(defn recall-by-category
  "Find learnings by category"
  [user-id category & {:keys [limit] :or {limit 50}}]
  (->> (core/get-user-history user-id {:limit 1000})
       (filter #(= category (:learning/category %)))
       (take limit)))

;; ============================================================================
;; Full-Text Search (Basic)
;; ============================================================================

(defn full-text-search
  "Search across all learning fields"
  [user-id query & {:keys [limit] :or {limit 20}}]
  (let [terms (set (str/split (str/lower-case query) #"\s+"))
        ;; Get candidates from tag index
        tag-candidates (apply set/union (map idx/get-tag-learnings terms))
        user-ids (set (idx/get-user-learning-ids user-id))
        candidates (set/union tag-candidates user-ids)]
    (->> candidates
         (map core/get-learning)
         (remove nil?)
         (map (fn [learning]
                (let [fields (str/join " " [(:learning/title learning "")
                                            (:learning/pattern learning "")
                                            (str/join " " (:learning/insights learning []))
                                            (str/join " " (:learning/tags learning []))
                                            (str/join " " (:learning/transfers learning []))])
                      norm-fields (str/lower-case fields)
                      match-count (count (filter #(str/includes? norm-fields %) terms))]
                  (assoc learning :search-score match-count))))
         (filter #(pos? (:search-score %)))
         (sort-by :search-score >)
         (take limit))))

;; ============================================================================
;; Export/Import
;; ============================================================================

(defn export-user-learning
  "Export all learning data for a user with streaming support"
  [user-id & {:keys [batch-size] :or {batch-size 1000}}]
  (let [history (core/get-user-history user-id {:limit batch-size})
        review-ids (idx/get-user-review-ids user-id)
        review-keywords (set (map keyword review-ids))
        all-data (memory/get-all)
        reviews (select-keys all-data review-keywords)]
    {:version "2.0"
     :exported-at (str (java.time.Instant/now))
     :user-id (name user-id)
     :learnings history
     :reviews (into {} (map (fn [[k v]] [(name k) v]) reviews))
     :export-stats {:total-learnings (count history)
                    :total-reviews (count reviews)}}))

(defn import-user-learning
  "Import learning data for a user with deduplication
   Options:
   - :skip-existing? (default true) - Skip if learning ID already exists
   - :merge-duplicates? (default true) - Merge if similar learning exists"
  [user-id data & {:keys [skip-existing? merge-duplicates?]
                   :or {skip-existing? true
                        merge-duplicates? true}}]
  (when (= (:version data) "2.0")
    (let [learnings (:learnings data)
          imported (atom 0)
          merged (atom 0)
          skipped (atom 0)
          errors (atom [])]
      (doseq [learning learnings]
        (try
          (cond
            ;; Skip if exists
            (and skip-existing? (core/get-learning (:learning/id learning)))
            (swap! skipped inc)

            ;; Try to save (will auto-merge if similar)
            :else
            (let [result (core/save-insight! user-id
                                             {:title (:learning/title learning)
                                              :insights (:learning/insights learning)
                                              :examples (:learning/examples learning)
                                              :pattern (:learning/pattern learning)
                                              :transfers (:learning/transfers learning)
                                              :tags (:learning/tags learning)
                                              :category (:learning/category learning)})]
              (if (pos? (or (:learning/merged-count result) 0))
                (swap! merged inc)
                (swap! imported inc))))
          (catch Exception e
            (swap! errors conj {:learning (:learning/id learning)
                                :error (.getMessage e)}))))

      ;; Import reviews
      (doseq [[review-id review-data] (:reviews data)]
        (memory/save-value! (keyword review-id) review-data))

      ;; Rebuild indexes
      (idx/rebuild-learning-index!)
      (idx/rebuild-review-index!)

      (telemetry/emit! {:event :learning/imported
                        :user user-id
                        :imported @imported
                        :merged @merged
                        :skipped @skipped
                        :errors (count @errors)})

      {:imported @imported
       :merged @merged
       :skipped @skipped
       :errors @errors
       :total (+ @imported @merged @skipped)})))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(require '[com.wsscode.pathom3.connect.operation :as pco])

(pco/defresolver learning-search
  [{:keys [user/id query]}]
  {::pco/output [{:learning/search-results [:learning/id
                                            :learning/title
                                            :learning/search-score]}]}
  {:learning/search-results (full-text-search id query)})

(pco/defresolver learning-related
  [{:keys [user/id context]}]
  {::pco/output [{:learning/related [:learning/id
                                     :learning/title
                                     :learning/match-score]}]}
  {:learning/related (find-related id context)})

(pco/defmutation learning-export!
  [{:keys [user/id]}]
  {::pco/output [:export/version :export/exported-at :export/total-learnings]}
  (let [result (export-user-learning id)]
    {:export/version (:version result)
     :export/exported-at (:exported-at result)
     :export/total-learnings (count (:learnings result))}))

(def resolvers [learning-search learning-related])
(def mutations [learning-export!])