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
