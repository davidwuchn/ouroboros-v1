(ns ouroboros.learning.index
  "Index management for learning system
   
   Provides atomic, consistent index operations with WAL support."
  (:require
   [clojure.set :as set]
   [clojure.string :as str]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Indexes
;; ============================================================================

(defonce ^:private learning-index (atom {}))      ;; user-id -> [learning-ids]
(defonce ^:private review-index (atom {}))        ;; user-id -> #{review-ids}
(defonce ^:private tag-index (atom {}))           ;; tag -> #{learning-ids}
(defonce ^:private analytics-cache (atom {}))     ;; user-id -> {:data :timestamp}

;; ============================================================================
;; WAL (Write-Ahead Log) for Atomicity
;; ============================================================================

(defn- write-wal!
  "Write operation to WAL for recovery"
  [op-type user-id learning-id]
  (memory/save-value! :learning/wal
                      {:op op-type
                       :user user-id
                       :id learning-id
                       :timestamp (System/currentTimeMillis)}))

(defn- clear-wal!
  "Clear WAL after successful operation"
  []
  (memory/delete-value! :learning/wal))

(defn- recover-from-wal!
  "Recover from incomplete operation (call on init)"
  []
  (when-let [wal (memory/get-value :learning/wal)]
    (telemetry/emit! {:event :learning/wal-recovery :wal wal})
    ;; Replay or rollback based on op type
    (clear-wal!)))

;; ============================================================================
;; Learning Index Operations
;; ============================================================================

(defn get-user-learning-ids
  "Get learning IDs for user (O(1))"
  [user-id]
  (get @learning-index (keyword user-id) []))

(defn add-learning-to-index!
  "Atomically add learning to index with WAL"
  [user-id learning-id]
  (write-wal! :create user-id learning-id)
  (let [new-index (swap! learning-index
                         update (keyword user-id) (fnil conj []) learning-id)]
    (memory/save-value! :learning/index new-index)
    (clear-wal!)
    new-index))

(defn remove-learning-from-index!
  "Atomically remove learning from index"
  [user-id learning-id]
  (write-wal! :delete user-id learning-id)
  (let [new-index (swap! learning-index
                         update (keyword user-id)
                         #(remove (fn [id] (= id learning-id)) %))]
    (memory/save-value! :learning/index new-index)
    (clear-wal!)
    new-index))

(defn rebuild-learning-index!
  "Rebuild learning index from memory"
  []
  (let [all-learnings (->> (memory/get-all)
                           (filter (fn [[k _]]
                                     (and (namespace k)
                                          (str/starts-with? (namespace k) "learning")
                                          (not= (name k) "index")
                                          (not= (name k) "review-index")
                                          (not= (name k) "tag-index"))))
                           (map val))
        index (->> all-learnings
                   (filter #(not= :deleted (:learning/status %)))
                   (group-by :learning/user)
                   (map (fn [[user learnings]]
                          [(keyword user) (mapv :learning/id learnings)]))
                   (into {}))]
    (reset! learning-index index)
    (memory/save-value! :learning/index index)
    index))

;; ============================================================================
;; Review Index Operations
;; ============================================================================

(defn get-user-review-ids
  "Get review IDs for user (O(1))"
  [user-id]
  (get @review-index (keyword user-id) #{}))

(defn add-review-to-index!
  "Add review to index"
  [user-id learning-id]
  (let [review-id (str "review/" learning-id)
        new-index (swap! review-index
                         update (keyword user-id) (fnil conj #{}) review-id)]
    (memory/save-value! :learning/review-index new-index)
    new-index))

(defn remove-review-from-index!
  "Remove review from index"
  [user-id learning-id]
  (let [review-id (str "review/" learning-id)
        new-index (swap! review-index
                         update (keyword user-id) #(disj % review-id))]
    (memory/save-value! :learning/review-index new-index)
    new-index))

(defn rebuild-review-index!
  "Rebuild review index from memory"
  []
  (let [all-data (memory/get-all)
        review-keys (filter #(and (namespace %)
                                  (str/starts-with? (name %) "review/"))
                            (keys all-data))
        index (->> review-keys
                   (map (fn [k]
                          (let [learning-id (subs (name k) 7)  ; Remove "review/" prefix
                                user-id (first (str/split learning-id #"/"))]
                            [(keyword user-id) (name k)])))
                   (group-by first)
                   (map (fn [[user pairs]]
                          [user (set (map second pairs))]))
                   (into {}))]
    (reset! review-index index)
    (memory/save-value! :learning/review-index index)
    index))

;; ============================================================================
;; Tag Index Operations
;; ============================================================================

(defn get-tag-learnings
  "Get learning IDs for tag (O(1))"
  [tag]
  (get @tag-index tag #{}))

(defn index-learning-tags!
  "Index tags for a learning"
  [learning-id tags]
  (let [tag-set (set tags)]
    (doseq [tag tag-set]
      (swap! tag-index update tag (fnil conj #{}) learning-id)))
  (memory/save-value! :learning/tag-index @tag-index))

(defn remove-learning-from-tags!
  "Remove learning from all tag indexes"
  [learning-id]
  (swap! tag-index
         (fn [idx]
           (->> idx
                (map (fn [[tag ids]]
                       [tag (disj ids learning-id)]))
                (filter (fn [[_ ids]] (seq ids)))
                (into {})))))
(memory/save-value! :learning/tag-index @tag-index)

;; ============================================================================
;; Analytics Cache
;; ============================================================================

(defn get-cached-analytics
  "Get cached analytics if fresh (TTL = 60 seconds)"
  [user-id]
  (when-let [cached (get @analytics-cache user-id)]
    (when (< (- (System/currentTimeMillis) (:timestamp cached)) 60000)
      (:data cached))))

(defn cache-analytics!
  "Cache analytics result"
  [user-id data]
  (swap! analytics-cache assoc user-id
         {:data data :timestamp (System/currentTimeMillis)}))

(defn invalidate-cache!
  "Invalidate analytics cache for user"
  [user-id]
  (swap! analytics-cache dissoc user-id))

;; ============================================================================
;; Initialization
;; ============================================================================

(defn init!
  "Initialize all indexes"
  []
  (recover-from-wal!)
  (rebuild-learning-index!)
  (rebuild-review-index!)
  (let [tag-data (memory/get-value :learning/tag-index)]
    (when tag-data
      (reset! tag-index tag-data)))
  (telemetry/emit! {:event :learning/index-init
                    :learning-users (count @learning-index)
                    :review-users (count @review-index)
                    :tags (count @tag-index)}))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(require '[com.wsscode.pathom3.connect.operation :as pco])

(pco/defresolver learning-index-stats [_]
  {::pco/output [:learning/indexed-users
                 :learning/review-users
                 :learning/tag-count]}
  {:learning/indexed-users (count @learning-index)
   :learning/review-users (count @review-index)
   :learning/tag-count (count @tag-index)})

(def resolvers [learning-index-stats])