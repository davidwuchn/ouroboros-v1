(ns ouroboros.learning
  "Learning memory system - stores insights, patterns, and wisdom

   Stores user learning experiences to create a wisdom flywheel.
   Each learning record captures:
   - What was learned (insights)
   - How it applies (examples)
   - When to recall it (patterns)
   - What it connects to (transfers)

   Usage:
   (require '[ouroboros.learning :as learning])
   (learning/save-insight! :user-123 {:title \"Sequence Types Safety\" ...})
   (learning/recall-by-pattern :user-123 \"sequence-type-mismatch\")
   (learning/get-user-history :user-123)"
  (:require
   [clojure.string :as str]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [clojure.set :as set]))

;; ============================================================================
;; Data Model
;; ============================================================================

(def ^:private learning-schema
  "Schema for learning records"
  {:learning/id :string
   :learning/title :string
   :learning/user :string
   :learning/created :string  ; ISO timestamp
   :learning/category :string
   :learning/insights [:vector :string]  ; Key insights
   :learning/examples [:vector :map]     ; {:file \"path\", :line 42}
   :learning/pattern :string             ; Pattern to match for recall
   :learning/transfers [:vector :string] ; Related topics
   :learning/tags [:set :string]         ; Searchable tags
   :learning/confidence :int             ; 1-5 confidence level
   :learning/applied-count :int          ; Times applied
   :learning/last-applied :string})      ; ISO timestamp

(defn- validate-learning-record
  "Validate a learning record against schema"
  [record]
  (let [required-keys #{:learning/id :learning/title :learning/user :learning/created}
        missing-keys (set/difference required-keys (set (keys record)))]
    (when (seq missing-keys)
      (throw (ex-info "Missing required keys" {:missing missing-keys :record record})))
    record))

(defn- generate-learning-id
  "Generate a unique learning ID"
  [user title]
  (let [base (str/replace (str/lower-case title) #"[^a-z0-9]+" "-")
        timestamp (System/currentTimeMillis)]
    (str (name user) "/" base "-" timestamp)))

;; ============================================================================
;; Core Operations
;; ============================================================================

(defonce ^:private learning-index (atom {}))

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
  "Initialize learning system - rebuilds index from actual memory state"
  []
  (try
    (rebuild-index!)
    (telemetry/emit! {:event :learning/init
                      :indexed-users (count @learning-index)})
    (catch Exception e
      (telemetry/emit! {:event :learning/init-error
                        :error (.getMessage e)})
      (reset! learning-index {}))))

(defn save-insight!
  "Save a learning insight

   Usage: (save-insight! :user-123
            {:title \"Sequence Types Safety\"
             :insights [\"Sequence ops need integers\"]
             :pattern \"sequence-type-mismatch\"})"
  [user-id {:keys [title insights examples pattern transfers tags category]
            :or {examples [] transfers [] tags #{} category "general"}}]
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
                :learning/confidence 3  ; Default medium confidence
                :learning/applied-count 0
                :learning/last-applied nil}
        validated (validate-learning-record record)]

    ;; Store in memory
    (memory/save-value! (keyword learning-id) validated)

    ;; Update index
    (swap! learning-index update (keyword user-id) (fnil conj []) learning-id)

    ;; Persist index
    (memory/save-value! :learning/index @learning-index)

    (telemetry/emit! {:event :learning/saved
                      :user user-id
                      :learning-id learning-id
                      :title title})

    validated))

(defn get-learning
  "Get a specific learning record"
  [learning-id]
  (memory/get-value (keyword learning-id)))

(defn update-learning!
  "Update a learning record

   Usage: (update-learning! \"user-123/sequence-types-1234567890\"
            {:confidence 4 :applied-count 1})"
  [learning-id updates]
  (let [existing (get-learning learning-id)
        merged (merge existing updates)]
    (memory/save-value! (keyword learning-id) merged)
    (telemetry/emit! {:event :learning/updated
                      :learning-id learning-id
                      :updates (keys updates)})
    merged))

(defn delete-learning!
  "Delete a learning record and update index"
  [learning-id]
  ;; Get the learning first to find the user
  (let [learning (memory/get-value (keyword learning-id))
        user-id (:learning/user learning)]
    ;; Delete from memory
    (memory/delete-value! (keyword learning-id))
    ;; Remove from index
    (when user-id
      (swap! learning-index update (keyword user-id)
             (fn [ids] (remove #(= % learning-id) ids)))
      (memory/save-value! :learning/index @learning-index))
    (telemetry/emit! {:event :learning/deleted
                      :learning-id learning-id})))

;; ============================================================================
;; Query Operations
;; ============================================================================

(defn get-user-history
  "Get all learning records for a user"
  [user-id]
  (let [learning-ids (get @learning-index (keyword user-id) [])]
    (->> learning-ids
         (map get-learning)
         (remove nil?))))

(defn get-all-users
  "Get all users with learning records"
  []
  (keys @learning-index))

(defn recall-by-pattern
  "Find learnings matching a pattern

   Usage: (recall-by-pattern :user-123 \"sequence-type\")"
  [user-id pattern]
  (let [history (get-user-history user-id)]
    (filter (fn [learning]
              (or (str/includes? (:learning/pattern learning) pattern)
                  (some #(str/includes? % pattern) (:learning/tags learning))
                  (str/includes? (:learning/title learning) pattern)))
            history)))

(defn recall-by-category
  "Find learnings by category"
  [user-id category]
  (filter #(= category (:learning/category %))
          (get-user-history user-id)))

(defn find-related
  "Find learnings related to current context

   Looks for matches in:
   - Pattern names
   - Tags
   - Titles
   - Transfers"
  [user-id context]
  (let [history (get-user-history user-id)]
    (->> history
         (map (fn [learning]
                (let [score (+ (if (str/includes? (:learning/pattern learning) context) 10 0)
                               (if (some #(str/includes? % context) (:learning/tags learning)) 5 0)
                               (if (str/includes? (:learning/title learning) context) 3 0)
                               (if (some #(str/includes? % context) (:learning/transfers learning)) 2 0))]
                  (assoc learning :match-score score))))
         (filter #(pos? (:match-score %)))
         (sort-by :match-score >)
         (take 5))))

(defn increment-application!
  "Increment application count for a learning
  
   Emits telemetry for λ(system) evolution tracking.
   When applied 3+ times, the bridge will track as proven pattern."
  [learning-id]
  (let [current (get-learning learning-id)
        new-count (inc (or (:learning/applied-count current) 0))
        updated (-> current
                    (update :learning/applied-count (fnil inc 0))
                    (assoc :learning/last-applied (str (java.time.Instant/now))))]
    (update-learning! learning-id updated)
    
    ;; Emit telemetry for λ(system) evolution
    (telemetry/emit! {:event :learning/applied
                      :learning-id learning-id
                      :title (:learning/title current)
                      :pattern (:learning/pattern current)
                      :applied-count new-count
                      :category (:learning/category current)})
    
    updated))

;; ============================================================================
;; Learning Analysis
;; ============================================================================

(defn get-user-stats
  "Get learning statistics for a user"
  [user-id]
  (let [history (get-user-history user-id)]
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

(defn detect-gaps
  "Detect learning gaps based on application patterns"
  [user-id]
  (let [history (get-user-history user-id)
        low-confidence (filter #(< (:learning/confidence %) 3) history)
        rarely-applied (filter #(< (:learning/applied-count %) 2) history)
        ;; Safely handle timestamp parsing
        old-learnings (filter (fn [learning]
                               (try
                                 (let [created-str (:learning/created learning)
                                       created-ms (if (string? created-str)
                                                    (.toEpochMilli (java.time.Instant/parse created-str))
                                                    created-str)]
                                   (> (- (System/currentTimeMillis) created-ms)
                                      (* 30 24 60 60 1000)))  ; Older than 30 days
                                 (catch Exception _
                                   false)))
                             history)]
    {:low-confidence (map :learning/title low-confidence)
     :rarely-applied (map :learning/title rarely-applied)
     :needs-review (map :learning/title old-learnings)}))

;; ============================================================================
;; Learning Flywheel - Progressive Disclosure Levels
;; ============================================================================

(def learning-levels
  "Four levels of the Learning Flywheel"
  [:utility :understanding :insight :wisdom])

(defn determine-level
  "Determine learning level based on record maturity and applications
   
   Logic:
   - Utility: Default level for new learnings (0-1 applications)
   - Understanding: 1+ applications, confidence 2+
   - Insight: 2+ applications, has transfer connections
   - Wisdom: 3+ applications, multiple transfers, high confidence"
  [{:keys [learning/applied-count learning/confidence learning/transfers]}]
  (cond
    (and (>= (or applied-count 0) 3)
         (seq transfers)
         (>= (or confidence 0) 4)) :wisdom
    (and (>= (or applied-count 0) 2)
         (seq transfers)) :insight
    (>= (or applied-count 0) 1) :understanding
    :else :utility))

(defn promote-learning!
  "Promote a learning to the next level based on usage patterns"
  [learning-id]
  (when-let [learning (get-learning learning-id)]
    (let [current-level (or (:learning/level learning) (determine-level learning))
          level-idx (.indexOf learning-levels current-level)
          next-idx (min (dec (count learning-levels)) (inc level-idx))
          new-level (nth learning-levels next-idx)]
      (when (not= current-level new-level)
        (update-learning! learning-id {:learning/level new-level})
        (telemetry/emit! {:event :learning/promoted
                          :learning-id learning-id
                          :from-level current-level
                          :to-level new-level}))
      new-level)))

(defn flywheel-progress
  "Get user's progress through the 4 learning levels
   
   Returns:
   {:total N
    :by-level {:utility N :understanding N :insight N :wisdom N}
    :current-level :utility|:understanding|:insight|:wisdom
    :progress-to-next 0.0-1.0
    :recent-insights [...]
    :suggested-focus :keyword}"
  [user-id]
  (let [history (get-user-history user-id)
        with-levels (map #(assoc % :learning/level 
                                   (or (:learning/level %) (determine-level %))) 
                         history)
        by-level (group-by :learning/level with-levels)
        counts (into {} (map (fn [level] 
                               [level (count (get by-level level))])
                             learning-levels))
        total (count history)
        ;; Determine current level (highest with learnings, or utility if none)
        current-level (or (->> (reverse learning-levels)
                               (filter #(pos? (get counts % 0)))
                               first)
                        :utility)
        ;; Calculate progress to next level
        current-idx (.indexOf learning-levels current-level)
        next-level (when (< current-idx (dec (count learning-levels)))
                     (nth learning-levels (inc current-idx)))
        progress-to-next (if next-level
                           (let [next-count (get counts next-level 0)
                                 threshold (case current-level
                                             :utility 3      ; Need 3 to move to understanding
                                             :understanding 2 ; Need 2 to move to insight
                                             :insight 1       ; Need 1 to move to wisdom
                                             1)]
                             (min 1.0 (/ next-count threshold)))
                           1.0)
        ;; Suggest focus area
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
;; Integration Helpers
;; ============================================================================

(defn create-from-error
  "Create a learning record from an error/fix pattern"
  [user-id error-type fix-explanation context]
  (let [pattern (str/replace (str/lower-case error-type) #"\s+" "-")
        title (str "Fix: " error-type)
        insights [(str "Error: " error-type)
                  (str "Fix: " fix-explanation)]]
    (save-insight! user-id
                   {:title title
                    :insights insights
                    :pattern pattern
                    :category "errors/fixes"
                    :tags #{error-type "fix" "debugging"}
                    :examples [{:context context}]})))

(defn create-from-explanation
  "Create a learning record from an explanation"
  [user-id topic explanation depth]
  (let [title (str "Understanding: " topic)
        pattern (str/replace (str/lower-case topic) #"\s+" "-")
        confidence (case depth
                     :shallow 2
                     :medium 3
                     :deep 4
                     3)]
    (save-insight! user-id
                   {:title title
                    :insights [explanation]
                    :pattern pattern
                    :category "understanding"
                    :tags #{topic "explanation" "learning"}
                    :confidence confidence})))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(require '[com.wsscode.pathom3.connect.operation :as pco])

(pco/defresolver learning-user-history [{:keys [user/id]}]
  {::pco/output [{:learning/history [:learning/id
                                     :learning/title
                                     :learning/created
                                     :learning/category
                                     :learning/confidence
                                     :learning/applied-count]}]}
  (let [history (get-user-history id)]
    {:learning/history history}))

(pco/defresolver learning-user-stats [{:keys [user/id]}]
  {::pco/output [:learning/total-count
                 :learning/by-category
                 :learning/total-applications
                 :learning/average-confidence
                 {:learning/recent-learnings [:learning/title]}]}
  (let [stats (get-user-stats id)]
    {:learning/total-count (:total-learnings stats)
     :learning/by-category (:by-category stats)
     :learning/total-applications (:total-applications stats)
     :learning/average-confidence (:average-confidence stats)
     :learning/recent-learnings (map (fn [title] {:learning/title title})
                                     (:recent-learnings stats))}))

(pco/defresolver learning-flywheel-progress [{:keys [user/id]}]
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

(pco/defmutation learning-save! [{:keys [user/id title insights pattern]}]
  {::pco/output [:learning/id :learning/title :learning/created]}
  (let [record (save-insight! id
                              {:title title
                               :insights insights
                               :pattern pattern})]
    {:learning/id (:learning/id record)
     :learning/title (:learning/title record)
     :learning/created (:learning/created record)}))

(pco/defmutation learning-apply! [{:keys [learning/id]}]
  {::pco/output [:learning/id :learning/applied-count]}
  (let [updated (increment-application! id)]
    {:learning/id id
     :learning/applied-count (:learning/applied-count updated)}))

;; ============================================================================
;; Spaced Repetition System
;; ============================================================================

(def review-intervals
  "Leitner system intervals in milliseconds
   Level 1: 1 day, Level 2: 3 days, Level 3: 1 week, Level 4: 3 weeks"
  {1 (* 1 24 60 60 1000)    ; 1 day
   2 (* 3 24 60 60 1000)    ; 3 days
   3 (* 7 24 60 60 1000)    ; 1 week
   4 (* 21 24 60 60 1000)}) ; 3 weeks

(defn schedule-review!
  "Schedule a review for a learning insight using spaced repetition
   
   Usage: (schedule-review! 'user-123/sequence-types-123456' 3)
   Where confidence is 1-4 (1=hard, 4=easy)"
  [learning-id confidence]
  (let [level (min 4 (max 1 (or confidence 2)))
        interval (get review-intervals level (get review-intervals 2))
        next-review (+ (System/currentTimeMillis) interval)]
    (memory/save-value! (keyword (str "review/" learning-id))
                        {:learning-id learning-id
                         :level level
                         :scheduled-at next-review
                         :created (System/currentTimeMillis)})
    (telemetry/emit! {:event :learning/review-scheduled
                      :learning-id learning-id
                      :level level
                       :next-review next-review})
    {:learning-id learning-id
     :level level
     :next-review next-review}))

(defn get-due-reviews
  "Get all learning reviews due for a user
   Returns list of {:learning-id :title :scheduled-at :level}"
  [user-id]
  (let [all-data (memory/get-all)
        review-keys (filter #(and (namespace %)
                                  (str/starts-with? (name %) "review/"))
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

(defn complete-review!
  "Mark a review as completed and schedule next one
   Returns the next scheduled review"
  [learning-id confidence]
  (let [old-review (memory/get-value (keyword (str "review/" learning-id)))
        new-level (min 4 (inc (or (:level old-review) 1)))
        next-review (schedule-review! learning-id (or confidence new-level))]
    (increment-application! learning-id)
    (telemetry/emit! {:event :learning/review-completed
                      :learning-id learning-id
                      :old-level (:level old-review)
                      :new-level new-level})
    next-review))

(defn skip-review!
  "Skip a review without completing it (reschedule with shorter interval)"
  [learning-id]
  (let [review (memory/get-value (keyword (str "review/" learning-id)))
        current-level (or (:level review) 2)
        ;; If skipped, reduce level but not below 1
        new-level (max 1 (dec current-level))
        rescheduled (schedule-review! learning-id new-level)]
    (telemetry/emit! {:event :learning/review-skipped
                      :learning-id learning-id
                      :old-level current-level
                      :new-level new-level})
    rescheduled))

(defn get-review-stats
  "Get spaced repetition statistics for a user"
  [user-id]
  (let [all-data (memory/get-all)
        review-keys (filter #(and (namespace %)
                                  (str/starts-with? (name %) "review/"))
                            (keys all-data))
        reviews (vals (select-keys all-data review-keys))
        now (System/currentTimeMillis)
        due-count (count (filter #(> now (:scheduled-at %)) reviews))
        upcoming-count (count (filter #(< now (:scheduled-at %)) reviews))]
    {:total-scheduled (count reviews)
     :due-now due-count
     :upcoming upcoming-count
     :by-level (frequencies (map :level reviews))}))

(defn- ensure-review-scheduled!
  "Ensure a learning has a review scheduled (called when insight is saved)"
  [learning-id]
  (let [review-key (keyword (str "review/" learning-id))
        existing (memory/get-value review-key)]
    (when-not existing
      (schedule-review! learning-id 1))))

;; ============================================================================
;; Spaced Repetition Pathom Integration
;; ============================================================================

(pco/defresolver learning-due-reviews [{:keys [user/id]}]
  {::pco/output [{:learning/due-reviews [:learning-id :title :category :level :scheduled-at]}]}
  {:learning/due-reviews (get-due-reviews id)})

(pco/defresolver learning-review-stats [{:keys [user/id]}]
  {::pco/output [:learning/total-scheduled
                 :learning/due-now
                 :learning/upcoming-reviews
                 :learning/reviews-by-level]}
  (let [stats (get-review-stats id)]
    {:learning/total-scheduled (:total-scheduled stats)
     :learning/due-now (:due-now stats)
     :learning/upcoming-reviews (:upcoming stats)
     :learning/reviews-by-level (:by-level stats)}))

(pco/defmutation learning-complete-review! [{:keys [learning/id confidence]}]
  {::pco/output [:learning/id :learning/next-review :learning/level]}
  (let [result (complete-review! id confidence)]
    {:learning/id id
     :learning/next-review (:next-review result)
     :learning/level (:level result)}))

(pco/defmutation learning-skip-review! [{:keys [learning/id]}]
  {::pco/output [:learning/id :learning/next-review :learning/level]}
  (let [result (skip-review! id)]
    {:learning/id id
     :learning/next-review (:next-review result)
     :learning/level (:level result)}))

;; Override save-insight! to auto-schedule review
(defn save-insight-with-review!
  "Save insight and schedule initial review"
  [user-id data]
  (let [record (save-insight! user-id data)]
    (ensure-review-scheduled! (:learning/id record))
    record))

(def resolvers [learning-user-history learning-user-stats learning-flywheel-progress
                learning-due-reviews learning-review-stats])
(def mutations [learning-save! learning-apply! learning-complete-review! learning-skip-review!])

;; ============================================================================
;; Initialization
;; ============================================================================

(init!)

(comment
  ;; Usage examples
  (require '[ouroboros.learning :as learning])

  ;; Save a learning
  (learning/save-insight! :alex
                          {:title "Sequence Types Safety"
                           :insights ["Sequence operations require integer multipliers"
                                      "Type hints prevent runtime errors"]
                           :pattern "sequence-type-mismatch"
                           :category "python/types"
                           :tags #{"python" "types" "sequences"}})

  ;; Recall by pattern
  (learning/recall-by-pattern :alex "sequence")

  ;; Get user stats
  (learning/get-user-stats :alex)

  ;; Create from error
  (learning/create-from-error :alex
                              "TypeError: can't multiply sequence by non-int"
                              "Convert float to integer before multiplication"
                              "utils.py line 42")

  ;; Find related learnings
  (learning/find-related :alex "python"))

