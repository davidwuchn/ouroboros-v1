(ns ouroboros.frontend.ws.handlers.builder
  "Handlers for :builder/data-saved, :wisdom/template, and merge-builder-data-into-state!."
  (:require
   [ouroboros.frontend.ws.state :as state]
   [ouroboros.frontend.ws.dispatch :as dispatch]))

;; send! will be injected after connection ns loads to avoid circular dep.
;; connection -> dispatch (for handle-message)
;; builder handler -> dispatch (for defmethod) + needs send! from connection
;; Solution: late-bind send! via atom.
(defonce ^:private send-fn (atom nil))

(defn set-send-fn!
  "Inject send! function to break circular dep with connection ns."
  [f]
  (reset! send-fn f))

(defmethod dispatch/handle-message :builder/data-saved
  [{:keys [session-id project-id builder-type]}]
  (js/console.log "Builder data saved:" builder-type session-id)
  (when-let [state-atom @state/app-state-atom]
    (when (get-in @state-atom [:kanban/board project-id])
      (when-let [send! @send-fn]
        (send! {:type "kanban/board" :project-id project-id})))))

(defmethod dispatch/handle-message :wisdom/template
  [{:keys [template-key data]}]
  (when-let [state-atom @state/app-state-atom]
    (when (seq data)
      (swap! state-atom assoc-in [:wisdom/template (keyword template-key)] data))
    (state/schedule-render!)))

;; ============================================================================
;; Builder State Merge (used by template injection)
;; ============================================================================

(defn merge-builder-data-into-state!
  "Write builder data directly into Fulcro state at the correct ident path.
   Called after template injection to make data immediately available to builder
   components without requiring navigation + df/load! round-trip."
  [builder-type data]
  (when-let [state-atom @state/app-state-atom]
    (case builder-type
      :empathy-map
      (swap! state-atom assoc-in [:page/id :empathy-builder :empathy/notes] data)

      :lean-canvas
      (swap! state-atom assoc-in [:page/id :lean-canvas-builder :lean-canvas/notes] data)

      :value-proposition
      (swap! state-atom assoc-in [:page/id :value-prop-builder :valueprop/notes] data)

      :mvp-planning
      (swap! state-atom assoc-in [:page/id :mvp-builder :mvp/notes] data)

      nil)
    (state/schedule-render!)))
