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
   :instinct-thresholds
   {:novice 0      ; just saved
    :learning 3    ; applied 3+ times
    :practicing 10 ; applied 10+ times
    :instinct 25   ; applied 25+ times - automatic behavior
    :master 50}    ; taught others (transfers)
   :review-intervals
   {1 (* 1 24 60 60 1000)    ; 1 day
    2 (* 3 24 60 60 1000)    ; 3 days
    3 (* 7 24 60 60 1000)    ; 1 week
    4 (* 21 24 60 60 1000)}  ; 3 weeks
   :default-pagination 50
   :similarity-threshold 0.8
   :title-similarity-threshold 0.7
   :analytics-cache-ttl 60000   ; 60 seconds
   :capture-prompts
   {:error-pattern? true      ; Prompt after tool errors
    :session-end? true        ; Prompt at session end
    :planning-phase? true}})  ; Prompt after planning phases

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
(s/def ::instinct-level #{:novice :learning :practicing :instinct :master})
(s/def ::status #{:active :deleted})
(s/def ::transfer-count nat-int?)

;; Use explicit keywords to match record keys (:learning/id not ::learning-id)
(s/def ::learning-record
  (s/keys :req [:learning/id :learning/title :learning/user :learning/created]
          :opt [:learning/category :learning/insights :learning/examples :learning/pattern :learning/transfers
                :learning/tags :learning/confidence :learning/applied-count :learning/last-applied :learning/level :learning/status
                :learning/instinct-level :learning/transfer-count]))

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
;; Instinct Level (Behavioral Commitment)
;; ============================================================================

(defn determine-instinct-level
  "Determine instinct level based on application count and transfers.
   
   Progression: novice → learning → practicing → instinct → master
   - :novice (0) - just saved
   - :learning (3+) - applied 3+ times  
   - :practicing (10+) - applied 10+ times
   - :instinct (25+) - automatic behavior
   - :master (50+ transfers) - taught others"
  [{:keys [learning/applied-count learning/transfers]}]
  (let [transfer-count (count (or transfers []))
        applied (or applied-count 0)]
    (cond
      (>= transfer-count 1) :master      ; Taught others takes precedence
      (>= applied 25) :instinct
      (>= applied 10) :practicing
      (>= applied 3) :learning
      :else :novice)))

(defn get-instinct-threshold
  "Get the minimum applications needed for a given instinct level"
  [level]
  (get-in learning-config [:instinct-thresholds level]))

(defn instinct-level-progress
  "Calculate progress toward next instinct level (0.0 - 1.0)"
  [learning]
  (let [current-level (determine-instinct-level learning)
        applied (or (:learning/applied-count learning) 0)
        transfer-count (count (or (:learning/transfers learning) []))
        
        ;; Find current and next level
        levels [:novice :learning :practicing :instinct :master]
        current-idx (.indexOf levels current-level)
        next-level (when (< current-idx (dec (count levels)))
                     (nth levels (inc current-idx)))
        
        ;; Calculate progress
        next-threshold (if next-level
                        (get-in learning-config [:instinct-thresholds next-level])
                        nil)]
    (if (= current-level :master)
      1.0
      (if next-level
        (min 1.0 (/ applied (max 1 next-threshold)))
        0.0))))

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
  (let [merged (-> existing
                   (update :learning/insights
                           #(vec (distinct (concat % (normalize-insights (:insights new-data))))))
                   (update :learning/tags
                           #(set/union % (set (map str/lower-case (:tags new-data)))))
                   (update :learning/examples
                           #(vec (distinct (concat % (:examples new-data)))))
                   (update :learning/transfers
                           #(vec (distinct (concat % (:transfers new-data)))))
                   (assoc :learning/updated-at (str (java.time.Instant/now)))
                   (update :learning/merged-count (fnil inc 0)))]
    ;; Recalculate instinct level after merge
    (assoc merged :learning/instinct-level (determine-instinct-level merged))))

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
                  :learning/merged-count 0
                  :learning/instinct-level :novice}
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
  "Update a learning record. Automatically recalculates instinct-level
   when applied-count or transfers change."
  [learning-id updates]
  (let [existing (get-learning learning-id)
        user-id (:learning/user existing)
        merged (merge existing updates)
        ;; Recalculate instinct level if relevant fields changed
        merged (if (or (:learning/applied-count updates)
                      (:learning/transfers updates))
                 (assoc merged :learning/instinct-level
                        (determine-instinct-level merged))
                 merged)]
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
  "Increment application count and update last-applied timestamp
   Also recalculates instinct level automatically"
  [learning-id]
  (let [learning (get-learning learning-id)
        new-count (inc (or (:learning/applied-count learning) 0))
        updated (update-learning! learning-id
                                  {:learning/applied-count new-count
                                   :learning/last-applied (str (java.time.Instant/now))})]
    ;; Recalculate and update instinct level
    (let [new-level (determine-instinct-level updated)]
      (when (not= new-level (:learning/instinct-level updated))
        (update-learning! learning-id {:learning/instinct-level new-level})
        (telemetry/emit! {:event :learning/instinct-promoted
                          :learning-id learning-id
                          :new-level new-level
                          :applied-count new-count})))
    updated))

(defn record-transfer!
  "Record that a learning was transferred/taught to someone else.
   This is the primary way to achieve :master instinct level."
  [learning-id & {:keys [who context]
                  :or {who "unknown" context ""}}]
  (let [learning (get-learning learning-id)
        new-transfers (conj (vec (or (:learning/transfers learning) []))
                            {:to who
                             :context context
                             :at (str (java.time.Instant/now))})]
    (update-learning! learning-id
                     {:learning/transfers new-transfers})
    ;; Check if this transfer promotes to master
    (let [updated (get-learning learning-id)
          new-level (determine-instinct-level updated)]
      (when (= new-level :master)
        (telemetry/emit! {:event :learning/instinct-master
                          :learning-id learning-id
                          :transfers new-transfers})))
    (get-learning learning-id)))

;; ============================================================================
;; Proactive Capture (Telemetry Hooks)
;; ============================================================================

(defn suggest-capture
  "Generate a learning capture suggestion based on context
   
   Returns nil if capture not enabled, or a map with suggestion details"
  [user-id context-type data]
  (let [prompts (:capture-prompts learning-config)
        ;; Use name to get unqualified keyword name
        key (keyword (str (name context-type) "?"))]
    (when (get prompts key)
      {:user-id user-id
       :context-type context-type
       :suggestion (case context-type
                     :error-pattern (str "Save this error-handling pattern?")
                     :session-end "Save learnings from this session?"
                     :planning-phase "Save insights from this planning phase?"
                     "Save this insight?")
       :data data
       :timestamp (System/currentTimeMillis)})))

(defn create-from-error!
  "Create a learning from an error/fix pattern automatically"
  [user-id error-type fix-explanation context]
  (save-insight! user-id
                 {:title (str "Error: " error-type)
                  :insights [fix-explanation]
                  :category "error-handling"
                  :tags #{"error" error-type "fix"}
                  :examples [{:error error-type
                              :fix fix-explanation
                              :context context}]}))

(defn create-from-explanation
  "Create a learning from an explanation
   depth can be: :shallow, :medium, :deep"
  [user-id topic explanation depth]
  (let [confidence (case depth
                    :shallow 2
                    :medium 3
                    :deep 4
                    3)]
    (save-insight! user-id
                   {:title topic
                    :insights [explanation]
                    :category "knowledge"
                    :tags #{topic}
                    :confidence confidence})))

;; ============================================================================
;; Planning Integration
;; ============================================================================

(defn capture-planning-insight!
  "Capture insights from planning files (task_plan.md, findings.md, progress.md)"
  [user-id phase project-id insights]
  (save-insight! user-id
                 {:title (str "Planning: " phase)
                  :insights insights
                  :category "planning"
                  :tags #{"planning" phase (name project-id)}
                  :examples [{:phase phase
                              :project-id project-id}]}))

(defn capture-phase-completion!
  "Capture phase completion as a learning"
  [user-id phase project-id result]
  (let [learnings (cond
                    (map? result) [(str phase " completed with: " (keys result))]
                    (string? result) [result]
                    :else [(str phase " completed successfully)")])
        title (str "Phase: " phase)]
    (save-insight! user-id
                   {:title title
                    :insights learnings
                    :category "planning"
                    :tags #{"planning" phase (name project-id) "phase-completion"}})))
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