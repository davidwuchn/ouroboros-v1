(ns ouroboros.analytics
  "Analytics and metrics for Web UX Platform

   Provides:
   - Project progress tracking
   - Team productivity metrics
   - Canvas completion analytics
   - Time-to-completion tracking
   - Success prediction scoring

   Usage:
   (require '[ouroboros.analytics :as analytics])
   (analytics/project-progress :project-123)
   (analytics/team-velocity :team-456)
   (analytics/predict-success :project-789)"
  (:require
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.memory :as memory]
   [ouroboros.learning :as learning]
   [ouroboros.resolver-registry :as registry]))

;; ============================================================================
;; Project Progress Tracking
;; ============================================================================

(defn calculate-completion
  "Calculate completion percentage for a canvas"
  [canvas-data canvas-type]
  (case canvas-type
    :empathy-map
    (let [sections [:persona :think-feel :hear :see :say-do :pains-gains]
          completed (count (filter #(get-in canvas-data [:empathy/sections %]) sections))]
      {:completed completed
       :total (count sections)
       :percentage (int (* 100 (/ completed (count sections))))})

    :lean-canvas
    (let [blocks [:problems :solution :uvp :unfair-advantage :customer-segments
                  :key-metrics :channels :cost-structure :revenue-streams]
          completed (count (filter #(get-in canvas-data [:canvas/blocks %]) blocks))]
      {:completed completed
       :total (count blocks)
       :percentage (int (* 100 (/ completed (count blocks))))})

    :value-proposition
    {:completed (if (get canvas-data :value-proposition/completed?) 1 0)
     :total 1
     :percentage (if (get canvas-data :value-proposition/completed?) 100 0)}

    :mvp-planning
    (let [features (get canvas-data :mvp/features [])
          defined (count (filter :feature/defined? features))]
      {:completed defined
       :total (max (count features) 3)
       :percentage (int (* 100 (/ defined (max (count features) 3))))})))

(defn project-progress
  "Get overall progress for a project across all stages"
  [project-id user-id]
  (let [sessions-key (keyword (str "builder-sessions/" (name user-id)))
        sessions (vals (or (memory/get-value sessions-key) {}))
        project-sessions (filter #(= (:session/project-id %) project-id) sessions)]

    {:project/id project-id
     :project/stages
     (mapv (fn [session]
             (let [progress (calculate-completion (:session/data session)
                                                  (:session/type session))]
               {:stage/type (:session/type session)
                :stage/status (:session/state session)
                :stage/completed (:completed progress)
                :stage/total (:total progress)
                :stage/percentage (:percentage progress)
                :stage/updated-at (:session/updated-at session)}))
           project-sessions)

     :project/overall-percentage
     (if (seq project-sessions)
       (let [percentages (map #(-> %
                                   :session/data
                                   (calculate-completion (:session/type %))
                                   :percentage)
                              project-sessions)]
         (int (/ (reduce + percentages) (count project-sessions))))
       0)}))

;; ============================================================================
;; Time Tracking
;; ============================================================================

(defn time-in-stage
  "Calculate time spent in each stage"
  [session-data]
  (let [created (:session/created-at session-data)
        updated (:session/updated-at session-data)
        completed (:session/completed-at session-data)]
    {:stage/time-total-ms (- (or (some-> updated (java.time.Instant/parse) (.toEpochMilli))
                                 (System/currentTimeMillis))
                             (some-> created (java.time.Instant/parse) (.toEpochMilli)))
     :stage/time-to-completion-ms (when completed
                                    (- (some-> completed (java.time.Instant/parse) (.toEpochMilli))
                                       (some-> created (java.time.Instant/parse) (.toEpochMilli))))
     :stage/completed? (some? completed)}))

(defn average-time-per-stage
  "Calculate average time users spend on each stage type"
  [stage-type]
  (let [all-sessions (mapcat vals (vals @memory/memory-store))
        matching (filter #(= (:session/type %) stage-type) all-sessions)
        times (keep #(get-in % [:session/data :session/time-to-completion-ms])
                    matching)]
    (if (seq times)
      {:stage-type stage-type
       :average-time-ms (int (/ (reduce + times) (count times)))
       :sample-size (count times)}
      {:stage-type stage-type
       :average-time-ms nil
       :sample-size 0})))

;; ============================================================================
;; Team Velocity
;; ============================================================================

(defn team-velocity
  "Calculate team velocity (completions per week)"
  [user-ids & {:keys [weeks]
               :or {weeks 4}}]
  (let [now (System/currentTimeMillis)
        week-ms (* 7 24 60 60 1000)
        since (- now (* weeks week-ms))

        completions (for [user-id user-ids
                          :let [sessions-key (keyword (str "builder-sessions/" (name user-id)))
                                sessions (vals (or (memory/get-value sessions-key) {}))]
                          session sessions
                          :when (= (:session/state session) :completed)
                          :let [completed-at (some-> (:session/completed-at session)
                                                     (java.time.Instant/parse)
                                                     (.toEpochMilli))]
                          :when (and completed-at (> completed-at since))]
                      {:user-id user-id
                       :session-type (:session/type session)
                       :completed-at completed-at})]

    {:velocity/total-completions (count completions)
     :velocity/completions-per-week (/ (count completions) weeks)
     :velocity/by-stage (frequencies (map :session-type completions))
     :velocity/period-weeks weeks}))

;; ============================================================================
;; Completion Analytics
;; ============================================================================

(defn completion-funnel
  "Analyze where users drop off in the flywheel"
  []
  (let [stage-order [:empathy-map :value-proposition :mvp-planning :lean-canvas]
        all-users (distinct (map #(second (re-find #"sessions/(.+)" (name %)))
                                 (filter #(str/starts-with? (namespace %) "builder-sessions")
                                         (keys @memory/memory-store))))

        user-progress (for [user-id all-users
                            :let [sessions-key (keyword (str "builder-sessions/" user-id))
                                  sessions (vals (or (memory/get-value sessions-key) {}))]]
                        (set (map :session/type sessions)))

        total-users (count user-progress)]

    {:funnel/total-users total-users
     :funnel/stages
     (mapv (fn [stage]
             (let [reached (count (filter #(contains? % stage) user-progress))
                   completed (count (filter #(some (fn [s]
                                                     (and (= (:session/type s) stage)
                                                          (= (:session/state s) :completed)))
                                                   (vals (or (memory/get-value
                                                              (keyword (str "builder-sessions/"
                                                                            (first user-progress))))
                                                             {})))
                                            user-progress))]
               {:stage stage
                :reached reached
                :reached-percentage (if (> total-users 0)
                                      (int (* 100 (/ reached total-users)))
                                      0)
                :completed completed
                :drop-off (- reached completed)}))
           stage-order)}))

;; ============================================================================
;; Success Prediction
;; ============================================================================

(defn calculate-health-score
  "Calculate project health score (0-100)"
  [project-id user-id]
  (let [progress (project-progress project-id user-id)
        stages (:project/stages progress)

        ;; Factors
        has-empathy? (some #(= (:stage/type %) :empathy-map) stages)
        has-value-prop? (some #(= (:stage/type %) :value-proposition) stages)
        has-canvas? (some #(= (:stage/type %) :lean-canvas) stages)

        empathy-complete? (some #(and (= (:stage/type %) :empathy-map)
                                      (= (:stage/status %) :completed))
                                stages)

        recent-activity? (some #(let [updated (some-> (:stage/updated-at %)
                                                      (java.time.Instant/parse)
                                                      (.toEpochMilli))]
                                  (and updated
                                       (> updated (- (System/currentTimeMillis)
                                                     (* 7 24 60 60 1000)))))
                               stages)]

    {:health/score (cond-> 0
                     has-empathy? (+ 20)
                     has-value-prop? (+ 20)
                     has-canvas? (+ 20)
                     empathy-complete? (+ 20)
                     recent-activity? (+ 20))
     :health/factors {:has-empathy? has-empathy?
                      :has-value-prop? has-value-prop?
                      :has-canvas? has-canvas?
                      :empathy-complete? empathy-complete?
                      :recent-activity? recent-activity?}}))

(defn predict-success
  "Predict likelihood of project success based on patterns"
  [project-id user-id]
  (let [health (calculate-health-score project-id user-id)
        progress (project-progress project-id user-id)

        ;; Simple prediction model
        score (:health/score health)
        prediction (cond
                     (>= score 80) {:likelihood :high
                                    :confidence 0.85
                                    :message "Strong foundation. Good progress across all stages."}
                     (>= score 60) {:likelihood :medium
                                    :confidence 0.70
                                    :message "Making progress. Focus on completing the empathy map."}
                     (>= score 40) {:likelihood :low
                                    :confidence 0.60
                                    :message "Early stages. More customer research needed."}
                     :else {:likelihood :very-low
                            :confidence 0.75
                            :message "Project needs attention. Start with customer understanding."})]

    (assoc prediction
           :health/score score
           :health/factors (:health/factors health))))

;; ============================================================================
;; Dashboard Data
;; ============================================================================

(defn user-dashboard
  "Get comprehensive dashboard data for a user"
  [user-id]
  (let [projects-key (keyword (str "projects/" (name user-id)))
        projects (vals (or (memory/get-value projects-key) {}))

        sessions-key (keyword (str "builder-sessions/" (name user-id)))
        sessions (vals (or (memory/get-value sessions-key) {}))

        learnings (learning/recall-by-pattern user-id "")]

    {:dashboard/user-id user-id
     :dashboard/project-count (count projects)
     :dashboard/active-sessions (count (filter #(= (:session/state %) :active) sessions))
     :dashboard/completed-sessions (count (filter #(= (:session/state %) :completed) sessions))
     :dashboard/total-insights (count learnings)
     :dashboard/recent-activity (take 5 (sort-by :project/updated-at > projects))

     ;; Progress across all projects
     :dashboard/overall-progress
     (if (seq projects)
       (int (/ (reduce + (map #(get-in (project-progress (:project/id %) user-id)
                                       [:project/overall-percentage])
                              projects))
               (count projects)))
       0)}))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver analytics-project-progress
  "Get project progress analytics"
  [{:keys [project/id user/id]}]
  {::pco/input [:project/id :user/id]
   ::pco/output [:project/overall-percentage
                 {:project/stages [:stage/type :stage/status :stage/percentage]}]}
  (let [progress (project-progress id id)]
    {:project/overall-percentage (:project/overall-percentage progress)
     :project/stages (:project/stages progress)}))

(pco/defresolver analytics-completion-funnel
  "Get completion funnel data"
  [_]
  {::pco/output [{:analytics/funnel [:stage :reached :reached-percentage :completed]}]}
  (let [funnel (completion-funnel)]
    {:analytics/funnel (get-in funnel [:funnel/stages])}))

(pco/defresolver analytics-user-dashboard
  "Get user dashboard data"
  [{:keys [user/id]}]
  {::pco/input [:user/id]
   ::pco/output [:dashboard/project-count :dashboard/active-sessions
                 :dashboard/completed-sessions :dashboard/total-insights
                 :dashboard/overall-progress]}
  (user-dashboard id))

(pco/defresolver analytics-health-score
  "Get project health score"
  [{:keys [project/id user/id]}]
  {::pco/input [:project/id :user/id]
   ::pco/output [:health/score :health/factors]}
  (calculate-health-score id id))

(pco/defresolver analytics-success-prediction
  "Get success prediction"
  [{:keys [project/id user/id]}]
  {::pco/input [:project/id :user/id]
   ::pco/output [:likelihood :confidence :message]}
  (predict-success id id))

;; ============================================================================
;; Registration
;; ============================================================================

(def resolvers [analytics-project-progress analytics-completion-funnel
                analytics-user-dashboard analytics-health-score
                analytics-success-prediction])

(registry/register-resolvers! resolvers)

;; ============================================================================
;; Comment / Examples
;; ============================================================================

(comment
  ;; Project progress
  (project-progress :project-123 :user-456)

  ;; Completion funnel
  (completion-funnel)

  ;; Health score
  (calculate-health-score :project-123 :user-456)

  ;; Success prediction
  (predict-success :project-123 :user-456)

  ;; User dashboard
  (user-dashboard :user-456)

  ;; Query via Pathom
  (require '[ouroboros.query :as q])
  (q/q [{[:project/id :my-project]
         [:project/overall-percentage :health/score]}])
  (q/q [:analytics/funnel])
  (q/q [:dashboard/overall-progress :dashboard/project-count]))
