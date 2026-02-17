(ns ouroboros.learning.core
  "Core learning operations with deduplication and batch support"
  (:require
   [clojure.spec.alpha :as s]
   [clojure.string :as str]
   [clojure.set :as set]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.learning.index :as idx]))

;; ============================================================================
;; Configuration
;; ============================================================================

(def learning-config
  "Configurable thresholds for learning system"
  {:flywheel-thresholds
   {:utility {:min-applications 0 :min-confidence 1 :min-transfers 0}
    :understanding {:min-applications 3 :min-confidence 2 :min-transfers 0}
    :insight {:min-applications 5 :min-confidence 3 :min-transfers 1}
    :wisdom {:min-applications 8 :min-confidence 4 :min-transfers 2}}
   :review-intervals
   {1 (* 1 24 60 60 1000)    ; 1 day
    2 (* 3 24 60 60 1000)    ; 3 days
    3 (* 7 24 60 60 1000)    ; 1 week
    4 (* 21 24 60 60 1000)}  ; 3 weeks
   :default-pagination 50
   :similarity-threshold 0.8
   :title-similarity-threshold 0.7
   :analytics-cache-ttl 60000})  ; 60 seconds

;; ============================================================================
;; Schema (clojure.spec)
;; ============================================================================

(s/def ::learning-id string?)
(s/def ::title string?)
(s/def ::user string?)
(s/def ::created string?)
(s/def ::category string?)
(s/def ::insights (s/coll-of string? :kind vector?))
(s/def ::examples (s/coll-of map? :kind vector?))
(s/def ::pattern string?)
(s/def ::transfers (s/coll-of string? :kind vector?))
(s/def ::tags (s/coll-of string? :kind set?))
(s/def ::confidence (s/int-in 1 6))
(s/def ::applied-count nat-int?)
(s/def ::last-applied (s/nilable string?))
(s/def ::level #{:utility :understanding :insight :wisdom})
(s/def ::status #{:active :deleted})

(s/def ::learning-record
  (s/keys :req-un [::learning-id ::title ::user ::created]
          :opt-un [::category ::insights ::examples ::pattern ::transfers
                   ::tags ::confidence ::applied-count ::last-applied ::level ::status]))

(defn validate-record
  "Validate learning record using clojure.spec"
  [record]
  (if (s/valid? ::learning-record record)
    record
    (throw (ex-info "Invalid learning record"
                    {:errors (s/explain-data ::learning-record record)
                     :record record}))))

;; ============================================================================
;; ID Generation (with collision avoidance)
;; ============================================================================

(defn- generate-learning-id
  "Generate a unique learning ID with entropy to avoid collisions"
  [user title]
  (let [base (str/replace (str/lower-case title) #"[^a-z0-9]+" "-")
        timestamp (System/currentTimeMillis)
        entropy (rand-int 1000)]
    (str (name user) "/" base "-" timestamp "-" entropy)))

;; ============================================================================
;; Normalization
;; ============================================================================

(defn- normalize-insights
  "Normalize insights for comparison (lowercase, trim)"
  [insights]
  (->> insights
       (map str/trim)
       (map str/lower-case)
       (remove str/blank?)
       vec))

(defn- normalize-title
  "Normalize title for comparison"
  [title]
  (-> title str/trim str/lower-case))

;; ============================================================================
;; Forward Declarations
;; ============================================================================

(declare get-learning)

;; ============================================================================
;; Similarity (Jaccard)
;; ============================================================================

(defn- jaccard-similarity
  "Calculate Jaccard similarity between two sets"
  [set1 set2]
  (let [intersection (count (set/intersection set1 set2))
        union (count (set/union set1 set2))]
    (if (pos? union)
      (/ intersection union)
      0.0)))

(defn- tokenize-title
  "Tokenize title into word set"
  [title]
  (->> (str/split title #"\s+")
       (remove str/blank?)
       set))

(defn- find-similar-learning
  "Find learning with similar title or insights using tag-index first"
  [user-id title insights tags]
  (let [norm-title (normalize-title title)
        norm-insights (set (normalize-insights insights))
        title-tokens (tokenize-title norm-title)

        ;; Get candidates from tag index (O(1) per tag)
        tag-candidates (if (seq tags)
                         (apply set/union (map idx/get-tag-learnings (map str/lower-case tags)))
                         #{})

        ;; Get recent candidates from learning index
        recent-candidates (set (idx/get-user-learning-ids user-id))

        ;; Combine candidates
        all-candidates (set/union tag-candidates recent-candidates)

        ;; Score candidates
        score-fn (fn [learning-id]
                   (when-let [learning (get-learning learning-id)]
                     (let [existing-title (normalize-title (:learning/title learning))
                           existing-insights (set (normalize-insights (:learning/insights learning)))
                           title-sim (jaccard-similarity title-tokens (tokenize-title existing-title))
                           insight-sim (jaccard-similarity norm-insights existing-insights)]
                       {:learning learning
                        :score (+ (* title-sim 0.4) (* insight-sim 0.6))
                        :title-sim title-sim
                        :insight-sim insight-sim})))

        scored (->> all-candidates
                    (map score-fn)
                    (remove nil?)
                    (filter #(or (> (:title-sim %) (:title-similarity-threshold learning-config))
                                 (> (:insight-sim %) (:similarity-threshold learning-config))))
                    (sort-by :score >))]
    (:learning (first scored))))

;; ============================================================================
;; CRUD Operations
;; ============================================================================

(defn get-learning
  "Get a specific learning record"
  [learning-id]
  (memory/get-value (keyword learning-id)))

(defn get-user-history
  "Get learning records for a user with pagination
   Options:
   - :limit (default 50)
   - :offset (default 0)
   - :sort-by (default :learning/created)"
  [user-id & {:keys [limit offset sort-by]
              :or {limit (:default-pagination learning-config)
                   offset 0
                   sort-by :learning/created}}]
  (let [learning-ids (idx/get-user-learning-ids user-id)
        id-keywords (set (map keyword learning-ids))
        ;; Batch fetch: single atom deref
        all-data (memory/get-all)
        learnings (vals (select-keys all-data id-keywords))]
    (->> learnings
         (remove nil?)
         (filter #(not= :deleted (:learning/status %)))
         (sort-by sort-by)
         (drop offset)
         (take limit))))

(defn- merge-learning-data
  "Merge new data into existing learning record with deduplication"
  [existing new-data]
  (-> existing
      (update :learning/insights
              #(vec (distinct (concat % (normalize-insights (:insights new-data))))))
      (update :learning/tags
              #(set/union % (set (map str/lower-case (:tags new-data)))))
      (update :learning/examples
              #(vec (distinct (concat % (:examples new-data)))))
      (update :learning/transfers
              #(vec (distinct (concat % (:transfers new-data)))))
      (assoc :learning/updated-at (str (java.time.Instant/now)))
      (update :learning/merged-count (fnil inc 0))))

(defn save-insight!
  "Save a learning insight with deduplication
   
   If similar learning exists, merges new data into existing record.
   Otherwise creates new learning record."
  [user-id {:keys [title insights examples pattern transfers tags category]
            :or {examples [] transfers [] tags #{} category "general"}}]
  ;; Invalidate analytics cache
  (idx/invalidate-cache! user-id)

  (if-let [existing (find-similar-learning user-id title insights tags)]
    ;; Merge into existing
    (let [merged (merge-learning-data existing
                                      {:insights insights
                                       :tags tags
                                       :examples examples
                                       :transfers transfers})]
      (memory/save-value! (keyword (:learning/id existing)) merged)
      (idx/index-learning-tags! (:learning/id existing) (:learning/tags merged))
      (telemetry/emit! {:event :learning/merged
                        :user user-id
                        :learning-id (:learning/id existing)
                        :title title})
      merged)

    ;; Create new
    (let [learning-id (generate-learning-id user-id title)
          record {:learning/id learning-id
                  :learning/title (str/trim title)
                  :learning/user (name user-id)
                  :learning/created (str (java.time.Instant/now))
                  :learning/category category
                  :learning/insights (vec (normalize-insights insights))
                  :learning/examples (vec examples)
                  :learning/pattern pattern
                  :learning/transfers (vec transfers)
                  :learning/tags (set (map str/lower-case tags))
                  :learning/confidence 3
                  :learning/applied-count 0
                  :learning/last-applied nil
                  :learning/status :active
                  :learning/merged-count 0}
          validated (validate-record record)]
      (memory/save-value! (keyword learning-id) validated)
      (idx/add-learning-to-index! user-id learning-id)
      (idx/index-learning-tags! learning-id (:learning/tags validated))
      (telemetry/emit! {:event :learning/saved
                        :user user-id
                        :learning-id learning-id
                        :title title})
      validated)))

(defn save-insights-batch!
  "Save multiple insights in a batch (more efficient)
   Returns {:created [...] :merged [...] :errors [...]}"
  [user-id learnings]
  (let [results (atom {:created [] :merged [] :errors []})]
    (doseq [learning learnings]
      (try
        (let [result (save-insight! user-id learning)]
          (if (pos? (or (:learning/merged-count result) 0))
            (swap! results update :merged conj result)
            (swap! results update :created conj result)))
        (catch Exception e
          (swap! results update :errors conj {:learning learning :error (.getMessage e)}))))
    @results))

(defn update-learning!
  "Update a learning record"
  [learning-id updates]
  (let [existing (get-learning learning-id)
        user-id (:learning/user existing)
        merged (merge existing updates)]
    ;; Invalidate cache
    (idx/invalidate-cache! user-id)

    (memory/save-value! (keyword learning-id) merged)

    ;; Re-index tags if changed
    (when (:learning/tags updates)
      (idx/index-learning-tags! learning-id (:learning/tags merged)))

    (telemetry/emit! {:event :learning/updated
                      :learning-id learning-id
                      :updates (keys updates)})
    merged))

(defn increment-application!
  "Increment application count and update last-applied timestamp"
  [learning-id]
  (let [learning (get-learning learning-id)
        new-count (inc (or (:learning/applied-count learning) 0))]
    (update-learning! learning-id
                      {:learning/applied-count new-count
                       :learning/last-applied (str (java.time.Instant/now))})))

(defn delete-learning!
  "Soft delete a learning record (allows recovery)"
  [learning-id]
  (let [learning (get-learning learning-id)
        user-id (:learning/user learning-id)]

    ;; Invalidate cache
    (idx/invalidate-cache! user-id)

    ;; Soft delete: mark as deleted
    (update-learning! learning-id
                      {:learning/status :deleted
                       :learning/deleted-at (str (java.time.Instant/now))})

    ;; Schedule async cleanup
    (future
      (Thread/sleep 100)
      ;; Hard delete after marking
      (memory/delete-value! (keyword learning-id))
      (memory/delete-value! (keyword (str "review/" learning-id)))
      (idx/remove-learning-from-index! user-id learning-id)
      (idx/remove-learning-from-tags! learning-id)
      (idx/remove-review-from-index! user-id learning-id))

    {:deleted? true :learning-id learning-id}))

(defn restore-learning!
  "Restore a soft-deleted learning"
  [learning-id]
  (let [learning (memory/get-value (keyword (str "deleted/" learning-id)))]
    (when learning
      (memory/save-value! (keyword learning-id)
                          (assoc learning :learning/status :active
                                 :learning/restored-at (str (java.time.Instant/now))))
      (idx/add-learning-to-index! (:learning/user learning) learning-id)
      (idx/index-learning-tags! learning-id (:learning/tags learning))
      {:restored? true :learning-id learning-id})))

;; Backward compatibility
(def save-insight-with-review! save-insight!)

;; Pathom integration (no resolvers defined in core - they are in learning.clj)
(def resolvers [])
(def mutations [])