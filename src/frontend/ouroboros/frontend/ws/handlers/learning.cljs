(ns ouroboros.frontend.ws.handlers.learning
  "Handlers for :learning/*, :project/detected, and :eca/auto-insight-* messages."
  (:require
   [ouroboros.frontend.ws.state :as state]
   [ouroboros.frontend.ws.cache :as cache]
   [ouroboros.frontend.ws.dispatch :as dispatch]))

;; ============================================================================
;; Learning Categories
;; ============================================================================

(defmethod dispatch/handle-message :learning/categories
  [{:keys [categories total-insights]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc :learning/categories categories)
                 (assoc :learning/total-insights total-insights)
                 (assoc :learning/categories-loading? false))))
    (cache/save-learning-categories! categories total-insights)
    (state/schedule-render!)))

(defmethod dispatch/handle-message :learning/category-insights
  [{:keys [category insights _count]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (let [has-real-data? (seq insights)]
               (-> s
                   (cond-> has-real-data?
                     (assoc-in [:learning/category-insights category] insights))
                   (assoc-in [:learning/category-insights-loading? category] false)
                   (cond-> has-real-data?
                     (assoc-in [:learning/category-insights-cache category] insights))))))
    (when (seq insights)
      (cache/save-category-insights-cache!
       (:learning/category-insights-cache @state-atom)))
    (state/schedule-render!)))

;; ============================================================================
;; Project Detection
;; ============================================================================

(defmethod dispatch/handle-message :project/detected
  [{:keys [project]}]
  (js/console.log "Workspace project detected:" (clj->js project))
  (when-let [state-atom @state/app-state-atom]
    (let [project-id (:project/id project)]
      (swap! state-atom
             (fn [s]
               (-> s
                   (assoc-in [:workspace/project] project)
                   (assoc-in [:project/id project-id] project))))
      (state/schedule-render!))))

;; ============================================================================
;; Auto-Insight (ECA post-builder-completion)
;; ============================================================================

(defmethod dispatch/handle-message :eca/auto-insight-start
  [{:keys [project-id builder-type]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:auto-insight/id project-id :auto-insight/content] "")
                 (assoc-in [:auto-insight/id project-id :auto-insight/loading?] true)
                 (assoc-in [:auto-insight/id project-id :auto-insight/streaming?] true)
                 (assoc-in [:auto-insight/id project-id :auto-insight/builder-type] builder-type))))
    (state/schedule-render!)))

(defmethod dispatch/handle-message :eca/auto-insight-token
  [{:keys [token project-id _builder-type]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom update-in
           [:auto-insight/id project-id :auto-insight/content] str token)
    (state/schedule-render!)))

(defmethod dispatch/handle-message :eca/auto-insight-done
  [{:keys [project-id _builder-type]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:auto-insight/id project-id :auto-insight/loading?] false)
                 (assoc-in [:auto-insight/id project-id :auto-insight/streaming?] false))))
    (state/schedule-render!)))

;; ============================================================================
;; Learning Flywheel
;; ============================================================================

(defmethod dispatch/handle-message :learning/flywheel
  [{:keys [total by-level current-level progress-to-next suggested-focus recent-insights]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc :learning/total total)
                 (assoc :learning/by-level by-level)
                 (assoc :learning/current-level current-level)
                 (assoc :learning/progress-to-next progress-to-next)
                 (assoc :learning/suggested-focus suggested-focus)
                 (assoc :learning/recent-insights recent-insights)
                 (assoc :learning/flywheel-loading? false))))
    (state/schedule-render!)))

;; ============================================================================
;; Spaced Repetition - Reviews
;; ============================================================================

(defmethod dispatch/handle-message :learning/due-reviews
  [{:keys [reviews due-count stats]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc :learning/due-reviews reviews)
                 (assoc :learning/due-count due-count)
                 (assoc :learning/review-stats stats)
                 (assoc :learning/due-reviews-loading? false))))
    (state/schedule-render!)))

(defmethod dispatch/handle-message :learning/review-completed
  [{:keys [learning-id title level]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (update :learning/due-reviews
                         (fn [reviews]
                           (remove #(= (:learning-id %) learning-id) reviews)))
                 (update :learning/due-count dec))))
    (state/schedule-render!)))

(defmethod dispatch/handle-message :learning/review-skipped
  [{:keys [learning-id]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (update :learning/due-reviews
                         (fn [reviews]
                           (remove #(= (:learning-id %) learning-id) reviews)))
                 (update :learning/due-count dec))))
    (state/schedule-render!)))

;; ============================================================================
;; Learning Search
;; ============================================================================

(defmethod dispatch/handle-message :learning/search-results
  [{:keys [query results count]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc :learning/search-query query)
                 (assoc :learning/search-results results)
                 (assoc :learning/search-count count)
                 (assoc :learning/search-loading? false))))
    (state/schedule-render!)))
