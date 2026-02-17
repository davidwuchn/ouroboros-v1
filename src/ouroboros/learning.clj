(ns ouroboros.learning
  "Learning memory system - stores insights, patterns, and wisdom

   Enhanced with:
   - Atomic review operations
   - clojure.spec validation
   - Configurable flywheel thresholds
   - Pagination support
   - Analytics and deduplication
   - Export/import functionality"
  (:require
   [clojure.spec.alpha :as s]
   [clojure.string :as str]
   [clojure.set :as set]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [com.wsscode.pathom3.connect.operation :as pco]))

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
   :similarity-threshold 0.8})

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

(s/def ::learning-record
  (s/keys :req-un [::learning-id ::title ::user ::created]
          :opt-un [::category ::insights ::examples ::pattern ::transfers
                   ::tags ::confidence ::applied-count ::last-applied ::level]))

(defn validate-record
  "Validate learning record using clojure.spec"
  [record]
  (if (s/valid? ::learning-record record)
    record
    (throw (ex-info "Invalid learning record"
                    {:errors (s/explain-data ::learning-record record)
                     :record record}))))

;; ============================================================================
;; Core Operations
;; ============================================================================

(defonce ^:private learning-index (atom {}))

(defn- generate-learning-id
  "Generate a unique learning ID"
  [user title]
  (let [base (str/replace (str/lower-case title) #"[^a-z0-9]+" "-")
        timestamp (System/currentTimeMillis)]
    (str (name user) "/" base "-" timestamp)))

(defn rebuild-index!
  "Rebuild learning index from all learning records in memory"
  []
  (let [all-learnings (->> (memory/get-all)
                           (filter (fn [[k _]]
                                     (and (namespace k)
                                          (str/starts-with? (namespace k) "learning"))))
                           (map val))
        index (->> all-learnings
                   (group-by :learning/user)
                   (map (fn [[user learnings]]
                          [(keyword user) (mapv :learning/id learnings)]))
                   (into {}))]
    (reset! learning-index index)
    (memory/save-value! :learning/index @learning-index)
    index))

(defn init!
  "Initialize learning system"
  []
  (try
    (rebuild-index!)
    (telemetry/emit! {:event :learning/init
                      :indexed-users (count @learning-index)})
    (catch Exception e
      (telemetry/emit! {:event :learning/init-error
                        :error (.getMessage e)})
      (reset! learning-index {}))))

;; ============================================================================
;; Forward Declarations
;; ============================================================================

(declare get-user-history ensure-review-scheduled! parse-timestamp)

;; ============================================================================
;; Deduplication
;; ============================================================================

(defn- jaccard-similarity
  "Calculate Jaccard similarity between two sets"
  [set1 set2]
  (let [intersection (count (set/intersection set1 set2))
        union (count (set/union set1 set2))]
    (if (pos? union)
      (/ intersection union)
      0.0)))

(defn- find-similar-learning
  "Find learning with similar insights"
  [user-id title insights]
  (let [history (get-user-history user-id {:limit 100})
        insight-set (set insights)
        title-similarity (fn [l]
                           (let [existing-title (set (str/split (str/lower-case (:learning/title l)) #"\s+"))
                                 new-title (set (str/split (str/lower-case title) #"\s+"))]
                             (jaccard-similarity existing-title new-title)))
        insight-similarity (fn [l]
                             (jaccard-similarity (set (:learning/insights l)) insight-set))]
    (->> history
         (filter #(or (> (title-similarity %) 0.7)
                      (> (insight-similarity %) (:similarity-threshold learning-config))))
         first)))

(defn- merge-learning-data
  "Merge new data into existing learning record"
  [existing new-data]
  (-> existing
      (update :learning/insights concat (:insights new-data))
      (update :learning/insights vec)
      (update :learning/tags set/union (:tags new-data))
      (update :learning/examples concat (:examples new-data))
      (update :learning/examples vec)
      (update :learning/transfers concat (:transfers new-data))
      (update :learning/transfers vec)
      (assoc :learning/updated-at (str (java.time.Instant/now)))))

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
  (let [learning-ids (get @learning-index (keyword user-id) [])]
    (->> learning-ids
         (map get-learning)
         (remove nil?)
         (sort-by sort-by)
         (drop offset)
         (take limit))))

(defn save-insight!
  "Save a learning insight with deduplication
   
   If similar learning exists, merges new data into existing record.
   Otherwise creates new learning record."
  [user-id {:keys [title insights examples pattern transfers tags category]
            :or {examples [] transfers [] tags #{} category "general"}}]
  (if-let [existing (find-similar-learning user-id title insights)]
    ;; Merge into existing
    (let [merged (merge-learning-data existing {:insights insights
                                                :tags tags
                                                :examples examples
                                                :transfers transfers})]
      (memory/save-value! (keyword (:learning/id existing)) merged)
      (telemetry/emit! {:event :learning/merged
                        :user user-id
                        :learning-id (:learning/id existing)
                        :title title})
      merged)
    ;; Create new
    (let [learning-id (generate-learning-id user-id title)
          record {:learning/id learning-id
                  :learning/title title
                  :learning/user (name user-id)
                  :learning/created (str (java.time.Instant/now))
                  :learning/category category
                  :learning/insights (vec insights)
                  :learning/examples (vec examples)
                  :learning/pattern pattern
                  :learning/transfers (vec transfers)
                  :learning/tags (set tags)
                  :learning/confidence 3
                  :learning/applied-count 0
                  :learning/last-applied nil}
          validated (validate-record record)]
      (memory/save-value! (keyword learning-id) validated)
      (swap! learning-index update (keyword user-id) (fnil conj []) learning-id)
      (memory/save-value! :learning/index @learning-index)
      (ensure-review-scheduled! learning-id)
      (telemetry/emit! {:event :learning/saved
                        :user user-id
                        :learning-id learning-id
                        :title title})
      validated)))

;; Backward compatibility alias
(def save-insight-with-review! save-insight!)

(defn update-learning!
  "Update a learning record"
  [learning-id updates]
  (let [existing (get-learning learning-id)
        merged (merge existing updates)]
    (memory/save-value! (keyword learning-id) merged)
    (telemetry/emit! {:event :learning/updated
                      :learning-id learning-id
                      :updates (keys updates)})
    merged))

(defn delete-learning!
  "Delete a learning record and all associated data"
  [learning-id]
  (let [learning (memory/get-value (keyword learning-id))
        user-id (:learning/user learning)]
    ;; Delete learning
    (memory/delete-value! (keyword learning-id))
    ;; Delete associated review
    (memory/delete-value! (keyword (str "review/" learning-id)))
    ;; Remove from index
    (when user-id
      (swap! learning-index update (keyword user-id)
             (fn [ids] (remove #(= % learning-id) ids)))
      (memory/save-value! :learning/index @learning-index))
    (telemetry/emit! {:event :learning/deleted
                      :learning-id learning-id})))

;; ============================================================================
;; Application Tracking
;; ============================================================================

(defn increment-application!
  "Increment application count for a learning"
  [learning-id]
  (let [current (get-learning learning-id)
        new-count (inc (or (:learning/applied-count current) 0))
        updated (-> current
                    (assoc :learning/applied-count new-count)
                    (assoc :learning/last-applied (str (java.time.Instant/now))))]
    (update-learning! learning-id updated)
    (telemetry/emit! {:event :learning/applied
                      :learning-id learning-id
                      :title (:learning/title current)
                      :pattern (:learning/pattern current)
                      :applied-count new-count
                      :category (:learning/category current)})
    updated))

;; ============================================================================
;; Learning Flywheel
;; ============================================================================

(def learning-levels [:utility :understanding :insight :wisdom])

(defn determine-level
  "Determine learning level based on configuration thresholds"
  [{:keys [learning/applied-count learning/confidence learning/transfers]}]
  (let [thresholds (:flywheel-thresholds learning-config)
        meets? (fn [level]
                 (let [t (get thresholds level)]
                   (and (>= (or applied-count 0) (:min-applications t))
                        (>= (or confidence 0) (:min-confidence t))
                        (>= (count (or transfers [])) (:min-transfers t)))))]
    (cond
      (meets? :wisdom) :wisdom
      (meets? :insight) :insight
      (meets? :understanding) :understanding
      :else :utility)))

(defn flywheel-progress
  "Get user's progress through learning levels with analytics"
  [user-id]
  (let [history (get-user-history user-id {:limit 1000})
        with-levels (map #(assoc % :learning/level
                                   (or (:learning/level %) (determine-level %)))
                         history)
        by-level (group-by :learning/level with-levels)
        counts (into {} (map (fn [level]
                               [level (count (get by-level level))])
                             learning-levels))
        total (count history)
        current-level (or (->> (reverse learning-levels)
                               (filter #(pos? (get counts % 0)))
                               first)
                        :utility)
        current-idx (.indexOf learning-levels current-level)
        next-level (when (< current-idx (dec (count learning-levels)))
                     (nth learning-levels (inc current-idx)))
        thresholds (:flywheel-thresholds learning-config)
        progress-to-next (if next-level
                           (let [current-threshold (get thresholds current-level)
                                 next-count (get counts next-level 0)
                                 needed (:min-applications (get thresholds next-level))]
                             (min 1.0 (/ next-count (max 1 needed))))
                           1.0)
        focus-area (cond
                     (zero? total) :start-learning
                     (< (get counts :understanding 0) (get counts :utility 0)) :deepen-understanding
                     (< (get counts :insight 0) (get counts :understanding 0)) :seek-patterns
                     (< (get counts :wisdom 0) (get counts :insight 0)) :transfer-knowledge
                     :else :maintain-wisdom)]
    {:total total
     :by-level counts
     :current-level current-level
     :progress-to-next progress-to-next
     :recent-insights (->> with-levels
                          (sort-by :learning/created)
                          reverse
                          (take 5)
                          (map #(select-keys % [:learning/id
                                                 :learning/title
                                                 :learning/level
                                                 :learning/category])))
     :suggested-focus focus-area}))

;; ============================================================================
;; Analytics
;; ============================================================================

(defn get-user-stats
  "Get learning statistics for a user (backward compatibility alias)"
  [user-id]
  (let [history (get-user-history user-id {:limit 1000})]
    {:total-learnings (count history)
     :by-category (frequencies (map :learning/category history))
     :total-applications (reduce + (map :learning/applied-count history))
     :average-confidence (if (seq history)
                           (/ (reduce + (map :learning/confidence history))
                              (count history))
                           0)
     :recent-learnings (->> history
                            (sort-by :learning/created)
                            (reverse)
                            (take 5)
                            (map :learning/title))}))

(defn get-learning-analytics
  "Get comprehensive analytics for a user"
  [user-id]
  (let [history (get-user-history user-id {:limit 1000})]
    {:total-insights (count history)
     :by-category (frequencies (map :learning/category history))
     :by-level (frequencies (map #(or (:learning/level %) (determine-level %)) history))
     :most-applied (take 5 (sort-by :learning/applied-count > history))
     :recently-created (take 5 (sort-by :learning/created > history))
     :total-applications (reduce + (map :learning/applied-count history))
     :average-confidence (if (seq history)
                           (/ (reduce + (map :learning/confidence history))
                              (count history))
                           0)
     :learning-velocity (let [recent (filter #(> (:learning/created %)
                                               (- (System/currentTimeMillis)
                                                  (* 30 24 60 60 1000)))
                                            history)]
                         (/ (count recent) 30.0))}))  ; Per day

(defn get-learning-gaps
  "Identify learning gaps and improvement opportunities"
  [user-id]
  (let [history (get-user-history user-id {:limit 1000})
        low-confidence (filter #(< (:learning/confidence %) 3) history)
        rarely-applied (filter #(< (:learning/applied-count %) 2) history)
        old-learnings (filter #(> (- (System/currentTimeMillis)
                                    (or (parse-timestamp (:learning/created %)) 0))
                                 (* 30 24 60 60 1000))
                             history)
        by-category (group-by :learning/category history)
        sparse-categories (->> by-category
                              (filter #(< (count (val %)) 3))
                              (map key))]
    {:low-confidence (map :learning/title low-confidence)
     :rarely-applied (map :learning/title rarely-applied)
     :needs-review (map :learning/title old-learnings)
     :sparse-categories sparse-categories
     :recommendations [(when (seq low-confidence)
                         "Increase confidence ratings for uncertain learnings")
                       (when (seq rarely-applied)
                         "Apply more learnings in practice")
                       (when (seq sparse-categories)
                         (str "Add more learnings to categories: "
                              (str/join ", " sparse-categories)))]}))

;; ============================================================================
;; Export/Import
;; ============================================================================

(defn export-user-learning
  "Export all learning data for a user"
  [user-id]
  (let [history (get-user-history user-id {:limit 10000})  ; Very high limit for export
        all-data (memory/get-all)
        review-keys (filter #(str/starts-with? (name %) (str "review/" user-id))
                           (keys all-data))
        reviews (select-keys all-data review-keys)]
    {:version "2.0"
     :exported-at (str (java.time.Instant/now))
     :user-id (name user-id)
     :learnings history
     :reviews (into {} (map (fn [[k v]] [(name k) v]) reviews))}))

(defn import-user-learning
  "Import learning data for a user
   Options:
   - :skip-existing? (default true) - Skip if learning ID already exists"
  [user-id data & {:keys [skip-existing?]
                   :or {skip-existing? true}}]
  (when (= (:version data) "2.0")
    (let [learnings (:learnings data)
          imported (atom 0)
          skipped (atom 0)]
      (doseq [learning learnings]
        (if (and skip-existing? (get-learning (:learning/id learning)))
          (swap! skipped inc)
          (do
            (memory/save-value! (keyword (:learning/id learning)) learning)
            (swap! learning-index update (keyword user-id)
                   (fnil conj []) (:learning/id learning))
            (swap! imported inc))))
      ;; Rebuild index after import
      (memory/save-value! :learning/index @learning-index)
      (telemetry/emit! {:event :learning/imported
                        :user user-id
                        :imported @imported
                        :skipped @skipped})
      {:imported @imported :skipped @skipped})))

;; ============================================================================
;; Spaced Repetition System
;; ============================================================================

(defn get-due-reviews
  "Get all learning reviews due for a user
   Returns list of {:learning-id :title :scheduled-at :level}"
  [user-id]
  (let [all-data (memory/get-all)
        review-prefix (str "review/" (name user-id))
        review-keys (filter #(and (namespace %)
                                  (str/starts-with? (name %) review-prefix))
                            (keys all-data))
        now (System/currentTimeMillis)
        due-reviews (filter #(> now (get-in (val %) [:scheduled-at] 0))
                           (select-keys all-data review-keys))]
    (->> due-reviews
         (map (fn [[_ review-data]]
                (when-let [learning (get-learning (:learning-id review-data))]
                  {:learning-id (:learning-id review-data)
                   :title (:learning/title learning)
                   :category (:learning/category learning)
                   :level (:level review-data)
                   :scheduled-at (:scheduled-at review-data)})))
         (remove nil?)
         (sort-by :scheduled-at))))

(defn get-review-stats
  "Get spaced repetition statistics for a user"
  [user-id]
  (let [all-data (memory/get-all)
        review-prefix (str "review/" (name user-id))
        review-keys (filter #(and (namespace %)
                                  (str/starts-with? (name %) review-prefix))
                            (keys all-data))
        reviews (vals (select-keys all-data review-keys))
        now (System/currentTimeMillis)
        due-count (count (filter #(> now (:scheduled-at %)) reviews))
        upcoming-count (count (filter #(< now (:scheduled-at %)) reviews))]
    {:total-scheduled (count reviews)
     :due-now due-count
     :upcoming upcoming-count
     :by-level (frequencies (map :level reviews))}))

(defn schedule-review!
  "Schedule a review using atomic memory operation"
  [learning-id confidence]
  (let [level (min 4 (max 1 (or confidence 2)))
        intervals (:review-intervals learning-config)
        interval (get intervals level (get intervals 2))
        next-review (+ (System/currentTimeMillis) interval)]
    (memory/update! (keyword (str "review/" learning-id))
                    (fn [_]
                      {:learning-id learning-id
                       :level level
                       :scheduled-at next-review
                       :created (System/currentTimeMillis)}))
    (telemetry/emit! {:event :learning/review-scheduled
                      :learning-id learning-id
                      :level level
                      :next-review next-review})
    {:learning-id learning-id
     :level level
     :next-review next-review}))

(defn complete-review!
  "Complete review with atomic update and application tracking"
  [learning-id confidence]
  (let [review-key (keyword (str "review/" learning-id))
        result (atom nil)]
    ;; Atomic update of review
    (memory/update! review-key
                    (fn [old-review]
                      (let [current-level (or (:level old-review) 1)
                            new-level (min 4 (inc current-level))
                            intervals (:review-intervals learning-config)
                            interval (get intervals new-level)
                            next-at (+ (System/currentTimeMillis) interval)]
                        (reset! result {:old-level current-level
                                        :new-level new-level
                                        :next-review next-at})
                        {:learning-id learning-id
                         :level new-level
                         :scheduled-at next-at
                         :created (System/currentTimeMillis)})))
    ;; Track application
    (increment-application! learning-id)
    (telemetry/emit! {:event :learning/review-completed
                      :learning-id learning-id
                      :result @result})
    @result))

(defn skip-review!
  "Skip review with reschedule"
  [learning-id]
  (let [review-key (keyword (str "review/" learning-id))
        result (atom nil)]
    (memory/update! review-key
                    (fn [old-review]
                      (let [current-level (or (:level old-review) 2)
                            new-level (max 1 (dec current-level))
                            intervals (:review-intervals learning-config)
                            interval (get intervals new-level)
                            next-at (+ (System/currentTimeMillis) interval)]
                        (reset! result {:old-level current-level
                                        :new-level new-level
                                        :next-review next-at})
                        {:learning-id learning-id
                         :level new-level
                         :scheduled-at next-at})))
    (telemetry/emit! {:event :learning/review-skipped
                      :learning-id learning-id
                      :result @result})
    @result))

;; ============================================================================
;; Helper Functions
;; ============================================================================

(defn- ensure-review-scheduled!
  "Ensure a learning has a review scheduled"
  [learning-id]
  (let [review-key (keyword (str "review/" learning-id))
        existing (memory/get-value review-key)]
    (when-not existing
      (schedule-review! learning-id 1))))

(defn- parse-timestamp
  "Safely parse ISO timestamp to milliseconds"
  [ts-str]
  (try
    (when (string? ts-str)
      (.toEpochMilli (java.time.Instant/parse ts-str)))
    (catch Exception _
      nil)))

(defn recall-by-pattern
  "Find learnings matching a pattern"
  [user-id pattern & {:keys [limit] :or {limit 20}}]
  (let [history (get-user-history user-id {:limit 1000})]
    (->> history
         (filter (fn [learning]
                   (or (str/includes? (:learning/pattern learning) pattern)
                       (some #(str/includes? % pattern) (:learning/tags learning))
                       (str/includes? (:learning/title learning) pattern))))
         (take limit))))

(defn find-related
  "Find related learnings with scoring"
  [user-id context & {:keys [limit] :or {limit 5}}]
  (let [history (get-user-history user-id {:limit 1000})]
    (->> history
         (map (fn [learning]
                (let [score (+ (if (str/includes? (:learning/pattern learning) context) 10 0)
                              (if (some #(str/includes? % context) (:learning/tags learning)) 5 0)
                              (if (str/includes? (:learning/title learning) context) 3 0)
                              (if (some #(str/includes? % context) (:learning/transfers learning)) 2 0))]
                  (assoc learning :match-score score))))
         (filter #(pos? (:match-score %)))
         (sort-by :match-score >)
         (take limit))))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(pco/defresolver learning-user-history
  [{:keys [user/id]}]
  {::pco/output [{:learning/history [:learning/id
                                     :learning/title
                                     :learning/created
                                     :learning/category
                                     :learning/confidence
                                     :learning/applied-count]}]}
  {:learning/history (get-user-history id)})

(pco/defresolver learning-analytics
  [{:keys [user/id]}]
  {::pco/output [:learning/total-insights
                 :learning/by-category
                 :learning/by-level
                 :learning/most-applied
                 :learning/average-confidence
                 :learning/learning-velocity]}
  (let [analytics (get-learning-analytics id)]
    {:learning/total-insights (:total-insights analytics)
     :learning/by-category (:by-category analytics)
     :learning/by-level (:by-level analytics)
     :learning/most-applied (:most-applied analytics)
     :learning/average-confidence (:average-confidence analytics)
     :learning/learning-velocity (:learning-velocity analytics)}))

(pco/defresolver learning-flywheel-progress
  [{:keys [user/id]}]
  {::pco/output [:learning/total
                 :learning/by-level
                 :learning/current-level
                 :learning/progress-to-next
                 :learning/suggested-focus
                 {:learning/recent-insights [:learning/id
                                            :learning/title
                                            :learning/level
                                            :learning/category]}]}
  (let [progress (flywheel-progress id)]
    {:learning/total (:total progress)
     :learning/by-level (:by-level progress)
     :learning/current-level (:current-level progress)
     :learning/progress-to-next (:progress-to-next progress)
     :learning/suggested-focus (:suggested-focus progress)
     :learning/recent-insights (:recent-insights progress)}))

(pco/defmutation learning-save!
  [{:keys [user/id title insights pattern category]}]
  {::pco/output [:learning/id :learning/title :learning/created]}
  (let [record (save-insight! id
                              {:title title
                               :insights insights
                               :pattern pattern
                               :category category})]
    {:learning/id (:learning/id record)
     :learning/title (:learning/title record)
     :learning/created (:learning/created record)}))

(pco/defmutation learning-complete-review!
  [{:keys [learning/id confidence]}]
  {::pco/output [:learning/id :learning/next-review :learning/level]}
  (let [result (complete-review! id confidence)]
    {:learning/id id
     :learning/next-review (:next-review result)
     :learning/level (:new-level result)}))

(def resolvers [learning-user-history learning-analytics learning-flywheel-progress])
(def mutations [learning-save! learning-complete-review!])

;; ============================================================================
;; Initialization
;; ============================================================================

(init!)