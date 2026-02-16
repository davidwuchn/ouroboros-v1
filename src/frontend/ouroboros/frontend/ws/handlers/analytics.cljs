(ns ouroboros.frontend.ws.handlers.analytics
  "Handlers for :analytics/*, :flywheel/progress, and :kanban/board messages."
  (:require
   [ouroboros.frontend.ws.state :as state]
   [ouroboros.frontend.ws.dispatch :as dispatch]))

;; ============================================================================
;; Flywheel Progress
;; ============================================================================

(defmethod dispatch/handle-message :flywheel/progress
  [{:keys [project-id progress]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom assoc-in [:flywheel/progress project-id] progress)
    (state/schedule-render!)))

;; ============================================================================
;; Kanban Board
;; ============================================================================

(defmethod dispatch/handle-message :kanban/board
  [{:keys [project-id board]}]
  (when-let [state-atom @state/app-state-atom]
    (when (seq board)
      (swap! state-atom assoc-in [:kanban/board project-id] board))
    (state/force-render!)))

;; ============================================================================
;; Analytics Dashboard
;; ============================================================================

(defmethod dispatch/handle-message :analytics/dashboard
  [{:keys [project-id data]}]
  (when-let [state-atom @state/app-state-atom]
    (when (seq data)
      (swap! state-atom assoc-in [:analytics/dashboard project-id] data))
    (state/schedule-render!)))

(defmethod dispatch/handle-message :analytics/prediction-token
  [{:keys [token project-id]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom update-in
           [:analytics/dashboard project-id :prediction-message] str token)
    (state/schedule-render!)))

(defmethod dispatch/handle-message :analytics/prediction-done
  [{:keys [project-id]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom assoc-in
           [:analytics/dashboard project-id :prediction-streaming?] false)
    (state/schedule-render!)))
