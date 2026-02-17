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
    (str user "/" base "-" timestamp)))

;; ============================================================================
;; Core Operations
;; ============================================================================

(defonce ^:private learning-index (atom {}))

(defn- rebuild-index!
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
    (reset! learning-index index)))

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
  "Delete a learning record"
  [learning-id]
  (memory/delete-value! (keyword learning-id))
  ;; Remove from index (would need to scan all users)
  (telemetry/emit! {:event :learning/deleted
                    :learning-id learning-id}))

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
        old-learnings (filter #(> (- (System/currentTimeMillis)
                                     (.getTime (java.time.Instant/parse (:learning/created %))))
                                  (* 30 24 60 60 1000))  ; Older than 30 days
                              history)]
    {:low-confidence (map :learning/title low-confidence)
     :rarely-applied (map :learning/title rarely-applied)
     :needs-review (map :learning/title old-learnings)}))

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

(def resolvers [learning-user-history learning-user-stats])
(def mutations [learning-save! learning-apply!])

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

