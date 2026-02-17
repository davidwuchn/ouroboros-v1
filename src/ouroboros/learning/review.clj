(ns ouroboros.learning.review
  "Spaced repetition system using indexed lookups"
  (:require
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.learning.index :as idx]
   [ouroboros.learning.core :as core]))

;; ============================================================================
;; Configuration
;; ============================================================================

(def review-intervals
  "Leitner system intervals in milliseconds"
  {1 (* 1 24 60 60 1000)    ; 1 day
   2 (* 3 24 60 60 1000)    ; 3 days
   3 (* 7 24 60 60 1000)    ; 1 week
   4 (* 21 24 60 60 1000)}) ; 3 weeks

;; ============================================================================
;; Core Review Operations
;; ============================================================================

(defn schedule-review!
  "Schedule a review using atomic memory operation"
  [learning-id confidence]
  (let [level (min 4 (max 1 (or confidence 2)))
        interval (get review-intervals level (get review-intervals 2))
        next-review (+ (System/currentTimeMillis) interval)
        user-id (first (clojure.string/split learning-id #"/"))]
    ;; Atomic update
    (memory/update! (keyword (str "review/" learning-id))
                    (fn [_]
                      {:learning-id learning-id
                       :level level
                       :scheduled-at next-review
                       :created (System/currentTimeMillis)}))
    ;; Add to index
    (idx/add-review-to-index! user-id learning-id)

    (telemetry/emit! {:event :learning/review-scheduled
                      :learning-id learning-id
                      :level level
                      :next-review next-review})
    {:learning-id learning-id
     :level level
     :next-review next-review}))

(defn get-due-reviews
  "Get all learning reviews due for a user (O(1) using index)"
  [user-id]
  (let [review-ids (idx/get-user-review-ids user-id)
        review-keywords (set (map keyword review-ids))
        ;; Batch fetch
        all-data (memory/get-all)
        reviews (vals (select-keys all-data review-keywords))
        now (System/currentTimeMillis)
        due-reviews (filter #(> now (get % :scheduled-at 0)) reviews)]
    (->> due-reviews
         (map (fn [review-data]
                (when-let [learning (core/get-learning (:learning-id review-data))]
                  {:learning-id (:learning-id review-data)
                   :title (:learning/title learning)
                   :category (:learning/category learning)
                   :level (:level review-data)
                   :scheduled-at (:scheduled-at review-data)})))
         (remove nil?)
         (sort-by :scheduled-at))))

(defn get-review-stats
  "Get spaced repetition statistics for a user (O(1) using index)"
  [user-id]
  (let [review-ids (idx/get-user-review-ids user-id)
        review-keywords (set (map keyword review-ids))
        ;; Batch fetch
        all-data (memory/get-all)
        reviews (vals (select-keys all-data review-keywords))
        now (System/currentTimeMillis)
        due-count (count (filter #(> now (:scheduled-at %)) reviews))
        upcoming-count (count (filter #(< now (:scheduled-at %)) reviews))]
    {:total-scheduled (count reviews)
     :due-now due-count
     :upcoming upcoming-count
     :by-level (frequencies (map :level reviews))}))

(defn complete-review!
  "Complete review with atomic update and application tracking"
  [learning-id confidence]
  (let [review-key (keyword (str "review/" learning-id))]
    ;; Atomic update of review
    (memory/update! review-key
                    (fn [old-review]
                      (let [current-level (or (:level old-review) 1)
                            new-level (min 4 (inc current-level))
                            interval (get review-intervals new-level)
                            next-at (+ (System/currentTimeMillis) interval)]
                        {:learning-id learning-id
                         :level new-level
                         :scheduled-at next-at
                         :created (System/currentTimeMillis)
                         :previous-level current-level})))
    ;; Track application
    (core/increment-application! learning-id)

    (let [review (memory/get-value review-key)]
      (telemetry/emit! {:event :learning/review-completed
                        :learning-id learning-id
                        :old-level (:previous-level review)
                        :new-level (:level review)})
      {:learning-id learning-id
       :level (:level review)
       :next-review (:scheduled-at review)})))

(defn skip-review!
  "Skip review with reschedule"
  [learning-id]
  (let [review-key (keyword (str "review/" learning-id))
        old-review (memory/get-value review-key)
        current-level (or (:level old-review) 2)
        new-level (max 1 (dec current-level))
        interval (get review-intervals new-level)
        next-at (+ (System/currentTimeMillis) interval)]
    (memory/save-value! review-key
                        {:learning-id learning-id
                         :level new-level
                         :scheduled-at next-at
                         :created (System/currentTimeMillis)})
    (telemetry/emit! {:event :learning/review-skipped
                      :learning-id learning-id
                      :old-level current-level
                      :new-level new-level})
    {:learning-id learning-id
     :level new-level
     :next-review next-at}))

(defn ensure-review-scheduled!
  "Ensure a learning has a review scheduled"
  [learning-id]
  (let [review-key (keyword (str "review/" learning-id))
        existing (memory/get-value review-key)]
    (when-not existing
      (schedule-review! learning-id 1))))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(require '[com.wsscode.pathom3.connect.operation :as pco])

(pco/defresolver learning-due-reviews
  [{:keys [user/id]}]
  {::pco/output [{:learning/due-reviews [:learning-id :title :category :level :scheduled-at]}]}
  {:learning/due-reviews (get-due-reviews id)})

(pco/defresolver learning-review-stats
  [{:keys [user/id]}]
  {::pco/output [:learning/total-scheduled
                 :learning/due-now
                 :learning/upcoming-reviews
                 :learning/reviews-by-level]}
  (let [stats (get-review-stats id)]
    {:learning/total-scheduled (:total-scheduled stats)
     :learning/due-now (:due-now stats)
     :learning/upcoming-reviews (:upcoming stats)
     :learning/reviews-by-level (:by-level stats)}))

(pco/defmutation learning-complete-review!
  [{:keys [learning/id confidence]}]
  {::pco/output [:learning/id :learning/next-review :learning/level]}
  (let [result (complete-review! id confidence)]
    {:learning/id id
     :learning/next-review (:next-review result)
     :learning/level (:level result)}))

(pco/defmutation learning-skip-review!
  [{:keys [learning/id]}]
  {::pco/output [:learning/id :learning/next-review :learning/level]}
  (let [result (skip-review! id)]
    {:learning/id id
     :learning/next-review (:next-review result)
     :learning/level (:level result)}))

(def resolvers [learning-due-reviews learning-review-stats])
(def mutations [learning-complete-review! learning-skip-review!])