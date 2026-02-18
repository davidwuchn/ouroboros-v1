(ns ouroboros.learning.analytics
  "Analytics and flywheel progression for learning system"
  (:require
   [clojure.string :as str]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.learning.core :as core]
   [ouroboros.learning.index :as idx]
   [ouroboros.learning.review :as review]))

;; ============================================================================
;; Configuration
;; ============================================================================

(def learning-levels [:utility :understanding :insight :wisdom])

;; ============================================================================
;; Level Determination
;; ============================================================================

(defn determine-level
  "Determine learning level based on configuration thresholds"
  [{:keys [learning/applied-count learning/confidence learning/transfers]}]
  (let [thresholds (get-in core/learning-config [:flywheel-thresholds])
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

;; ============================================================================
;; Flywheel Progress
;; ============================================================================

(defn flywheel-progress
  "Get user's progress through learning levels with caching"
  [user-id]
  ;; Check cache first
  (if-let [cached (idx/get-cached-analytics user-id)]
    cached
    ;; Compute fresh
    (let [history (core/get-user-history user-id {:limit 1000})
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
          thresholds (get-in core/learning-config [:flywheel-thresholds])
          progress-to-next (if next-level
                             (let [next-count (get counts next-level 0)
                                   needed (:min-applications (get thresholds next-level))]
                               (min 1.0 (/ next-count (max 1 needed))))
                             1.0)
          focus-area (cond
                       (zero? total) :start-learning
                       (< (get counts :understanding 0) (get counts :utility 0)) :deepen-understanding
                       (< (get counts :insight 0) (get counts :understanding 0)) :seek-patterns
                       (< (get counts :wisdom 0) (get counts :insight 0)) :transfer-knowledge
                       :else :maintain-wisdom)
          result {:total total
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
                                                              :learning/instinct-level
                                                              :learning/category])))
                  :suggested-focus focus-area
                  ;; Instinct level stats
                  :by-instinct (frequencies (map :learning/instinct-level with-levels))
                  :instinct-learner-count (count (filter #(= :instinct (:learning/instinct-level %)) with-levels))
                  :master-count (count (filter #(= :master (:learning/instinct-level %)) with-levels))}]
      ;; Cache result
      (idx/cache-analytics! user-id result)
      result)))

;; ============================================================================
;; Analytics
;; ============================================================================

(defn- safe-parse-timestamp
  "Safely parse ISO timestamp to milliseconds"
  [ts-str]
  (try
    (when (string? ts-str)
      (.toEpochMilli (java.time.Instant/parse ts-str)))
    (catch Exception _
      nil)))

(defn get-learning-analytics
  "Get comprehensive analytics for a user"
  [user-id]
  (if-let [cached (idx/get-cached-analytics user-id)]
    cached
    (let [history (core/get-user-history user-id {:limit 1000})
          now (System/currentTimeMillis)
          thirty-days-ago (- now (* 30 24 60 60 1000))
          result {:total-insights (count history)
                  :by-category (frequencies (map :learning/category history))
                  :by-level (frequencies (map #(or (:learning/level %) (determine-level %)) history))
                  :by-instinct (frequencies (map :learning/instinct-level history))
                  :most-applied (take 5 (sort-by :learning/applied-count > history))
                  :recently-created (take 5 (sort-by :learning/created > history))
                  :total-applications (reduce + (map :learning/applied-count history))
                  :average-confidence (if (seq history)
                                        (/ (reduce + (map :learning/confidence history))
                                           (count history))
                                        0)
                  :learning-velocity (let [recent (filter #(> (or (safe-parse-timestamp (:learning/created %)) 0)
                                                              thirty-days-ago)
                                                          history)]
                                       (/ (count recent) 30.0))
                  :top-tags (->> history
                                 (mapcat :learning/tags)
                                 frequencies
                                 (sort-by val >)
                                 (take 10)
                                 (into {}))
                  :total-transfers (reduce + (map #(count (or (:learning/transfers %) [])) history))
                  :instinct-learners (count (filter #(= :instinct (:learning/instinct-level %)) history))
                  :masters (count (filter #(= :master (:learning/instinct-level %)) history))}]
      (idx/cache-analytics! user-id result)
      result)))

(defn get-user-stats
  "Get learning statistics for a user (backward compatibility)"
  [user-id]
  (let [analytics (get-learning-analytics user-id)]
    {:total-learnings (:total-insights analytics)
     :by-category (:by-category analytics)
     :total-applications (:total-applications analytics)
     :average-confidence (:average-confidence analytics)
     :recent-learnings (map :learning/title (:recently-created analytics))}))

(defn get-learning-gaps
  "Identify learning gaps and improvement opportunities"
  [user-id]
  (let [history (core/get-user-history user-id {:limit 1000})
        now (System/currentTimeMillis)
        thirty-days-ago (- now (* 30 24 60 60 1000))
        low-confidence (filter #(< (:learning/confidence %) 3) history)
        rarely-applied (filter #(< (:learning/applied-count %) 2) history)
        old-learnings (filter #(> (- now (or (safe-parse-timestamp (:learning/created %)) 0))
                                  (* 30 24 60 60 1000))
                              history)
        by-category (group-by :learning/category history)
        sparse-categories (->> by-category
                               (filter #(< (count (val %)) 3))
                               (map key))
        recommendations (remove nil?
                                [(when (seq low-confidence)
                                   "Increase confidence ratings for uncertain learnings")
                                 (when (seq rarely-applied)
                                   "Apply more learnings in practice")
                                 (when (seq sparse-categories)
                                   (str "Add more learnings to categories: "
                                        (str/join ", " sparse-categories)))])]
    {:low-confidence (map :learning/title low-confidence)
     :rarely-applied (map :learning/title rarely-applied)
     :needs-review (map :learning/title old-learnings)
     :sparse-categories sparse-categories
     :recommendations recommendations
     :total-gaps (+ (count low-confidence) (count rarely-applied) (count old-learnings))}))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(require '[com.wsscode.pathom3.connect.operation :as pco])

(pco/defresolver learning-user-stats
  [{:keys [user/id]}]
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

(pco/defresolver learning-analytics-resolver
  [{:keys [user/id]}]
  {::pco/output [:learning/total-insights
                 :learning/by-level
                 :learning/learning-velocity
                 :learning/top-tags]}
  (let [analytics (get-learning-analytics id)]
    {:learning/total-insights (:total-insights analytics)
     :learning/by-level (:by-level analytics)
     :learning/learning-velocity (:learning-velocity analytics)
     :learning/top-tags (:top-tags analytics)}))

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

(pco/defresolver learning-gaps
  [{:keys [user/id]}]
  {::pco/output [:learning/low-confidence
                 :learning/rarely-applied
                 :learning/needs-review
                 :learning/sparse-categories
                 :learning/recommendations
                 :learning/total-gaps]}
  (let [gaps (get-learning-gaps id)]
    {:learning/low-confidence (:low-confidence gaps)
     :learning/rarely-applied (:rarely-applied gaps)
     :learning/needs-review (:needs-review gaps)
     :learning/sparse-categories (:sparse-categories gaps)
     :learning/recommendations (:recommendations gaps)
     :learning/total-gaps (:total-gaps gaps)}))

;; ============================================================================
;; Instinct Level Resolvers (NEW)
;; ============================================================================

(pco/defresolver learning-instinct-stats
  [{:keys [user/id]}]
  {::pco/output [:learning/by-instinct
                 :learning/instinct-learner-count
                 :learning/master-count
                 :learning/total-transfers]}
  (let [analytics (get-learning-analytics id)]
    {:learning/by-instinct (:by-instinct analytics)
     :learning/instinct-learner-count (:instinct-learners analytics 0)
     :learning/master-count (:masters analytics 0)
     :learning/total-transfers (:total-transfers analytics 0)}))

;; ============================================================================
;; Active Gap Notifications (NEW)
;; ============================================================================

(pco/defresolver learning-active-gaps
  [{:keys [user/id]}]
  {::pco/output [{:learning/gap-notifications
                 [:learning/gap-type :learning/gap-message :learning/gap-priority]}]}
  (let [gaps (get-learning-gaps id)
        analytics (get-learning-analytics id)
        notifications (atom [])]
    
    ;; Add gap notifications
    (when-let [due (review/get-review-stats id)]
      (when (pos? (:due-now due))
        (swap! notifications conj
                {:gap-type :reviews-due
                 :gap-message (str (:due-now due) " reviews due")
                 :gap-priority :high})))
    
    (when (pos? (:total-gaps gaps))
      (swap! notifications conj
              {:gap-type :learning-gaps
               :gap-message (str (:total-gaps gaps) " learning gaps identified")
               :gap-priority :medium}))
    
    (when (and (:instinct-learners analytics) (zero? (:instinct-learners analytics)))
      (swap! notifications conj
              {:gap-type :no-instinct
               :gap-message "No learnings have reached instinct level yet"
               :gap-priority :low}))
    
    (when (zero? (:total-transfers analytics))
      (swap! notifications conj
              {:gap-type :no-transfers
               :gap-message "No knowledge transfers recorded - teach others to reach wisdom"
               :gap-priority :low}))
    
    {:learning/gap-notifications @notifications}))

(def resolvers [learning-user-stats
                learning-analytics-resolver
                learning-flywheel-progress
                learning-gaps
                learning-instinct-stats
                learning-active-gaps])