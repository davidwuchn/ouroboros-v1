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

;; ============================================================================
;; Normalization
;; ============================================================================

(defn- normalize-notes
  "Normalize notes after JSON round-trip via WebSocket.
   JSON serialization converts keyword values to strings, so :item/section
   becomes \"persona\" instead of :persona. The canvas renderer filters by
   (= (:item/section note) :section-key) which fails on strings.
   This ensures all :item/section values are keywords."
  [notes-map]
  (when (map? notes-map)
    (reduce-kv
     (fn [m k note]
       (assoc m k
              (cond-> note
                (string? (:item/section note))
                (update :item/section keyword))))
     {} notes-map)))

;; ============================================================================
;; Handlers
;; ============================================================================

(defmethod dispatch/handle-message :builder/data-saved
  [{:keys [session-id project-id builder-type]}]
  (js/console.log "Builder data saved:" builder-type session-id)
  (when-let [state-atom @state/app-state-atom]
    (when (get-in @state-atom [:kanban/board project-id])
      (when-let [send! @send-fn]
        (send! {:type "kanban/board" :project-id project-id})))))

(defmethod dispatch/handle-message :builder/template-applied
  [{:keys [project-id template-key results builder-data]}]
  (js/console.log "Template applied to all builders:" template-key results)
  (when-let [state-atom @state/app-state-atom]
    ;; Clear applying state and merge normalized note data into builder state
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:builder/template-applying? project-id] false)
                 (cond->
                   (seq (:empathy-map builder-data))
                   (assoc-in [:page/id :empathy-builder :empathy/notes]
                             (normalize-notes (:empathy-map builder-data)))
                   (seq (:lean-canvas builder-data))
                   (assoc-in [:page/id :lean-canvas-builder :lean-canvas/notes]
                             (normalize-notes (:lean-canvas builder-data)))
                   (seq (:value-proposition builder-data))
                   (assoc-in [:page/id :value-prop-builder :valueprop/notes]
                             (normalize-notes (:value-proposition builder-data)))
                   (seq (:mvp-planning builder-data))
                   (assoc-in [:page/id :mvp-builder :mvp/notes]
                             (normalize-notes (:mvp-planning builder-data)))))))
    ;; Refresh kanban board
    (when (and (get-in @state-atom [:kanban/board project-id]) @send-fn)
      (@send-fn {:type "kanban/board" :project-id project-id}))
    (state/schedule-render!)))

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
   components without requiring navigation + df/load! round-trip.
   Normalizes :item/section values from strings to keywords."
  [builder-type data]
  (when-let [state-atom @state/app-state-atom]
    (let [normalized (normalize-notes data)]
      (case builder-type
        :empathy-map
        (swap! state-atom assoc-in [:page/id :empathy-builder :empathy/notes] normalized)

        :lean-canvas
        (swap! state-atom assoc-in [:page/id :lean-canvas-builder :lean-canvas/notes] normalized)

        :value-proposition
        (swap! state-atom assoc-in [:page/id :value-prop-builder :valueprop/notes] normalized)

        :mvp-planning
        (swap! state-atom assoc-in [:page/id :mvp-builder :mvp/notes] normalized)

        nil))
    (state/schedule-render!)))
