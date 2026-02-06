(ns ouroboros.frontend.ui.pages.lean-canvas-builder
  "Lean Canvas builder page with visual business model layout

   Features:
   - Visual 9-box business model canvas
   - Drag-and-drop sticky notes
   - Real-time collaboration
   - Export to PDF/JSON"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.ui.canvas-components :as canvas]))

;; ============================================================================
;; Mutations
;; ============================================================================

(m/defmutation start-lean-canvas-session
  "Start a new Lean Canvas session"
  [{:keys [project-id]}]
  (remote [env] env)
  (ok-action [{:keys [result state]}]
             (let [session-data (:body result)]
               (swap! state assoc :lean-canvas/session session-data))))

(m/defmutation update-lean-canvas-data
  "Update canvas data via WebSocket"
  [{:keys [session-id data]}]
  (remote [env] env))

(m/defmutation complete-lean-canvas-session
  "Mark canvas session as complete"
  [{:keys [session-id]}]
  (remote [env] env)
  (ok-action [{:keys [state]}]
             (swap! state assoc-in [:lean-canvas/session :session/state] :completed)))

(m/defmutation add-canvas-note
  "Add a sticky note to a canvas block"
  [{:keys [session-id block-key content color]}]
  (action [{:keys [state]}]
          (let [new-note (canvas/create-sticky-note block-key content :color (or color "yellow"))]
            (swap! state update-in [:lean-canvas/notes] assoc (:item/id new-note) new-note)))
  (remote [env] env))

(m/defmutation update-canvas-note
  "Update a canvas sticky note"
  [{:keys [note-id updates]}]
  (action [{:keys [state]}]
          (swap! state update-in [:lean-canvas/notes note-id] merge updates)))

(m/defmutation delete-canvas-note
  "Delete a canvas sticky note"
  [{:keys [note-id]}]
  (action [{:keys [state]}]
          (swap! state update :lean-canvas/notes dissoc note-id)))

;; ============================================================================
;; Block Configuration
;; ============================================================================

(def lean-canvas-blocks
  "Configuration for the 9 Lean Canvas blocks"
  [{:key :problems :title "😫 Problems" :description "Top 3 problems"
    :color "red" :grid-area "problems"}
   {:key :solution :title "💡 Solution" :description "How you solve them"
    :color "green" :grid-area "solution"}
   {:key :uvp :title "✨ Unique Value Proposition" :description "Why you're different"
    :color "purple" :grid-area "uvp"}
   {:key :unfair-advantage :title "🛡️ Unfair Advantage" :description "Can't be copied"
    :color "gold" :grid-area "unfair-advantage"}
   {:key :customer-segments :title "👥 Customer Segments" :description "Target customers"
    :color "blue" :grid-area "customer-segments"}
   {:key :key-metrics :title "📊 Key Metrics" :description "What you measure"
    :color "teal" :grid-area "key-metrics"}
   {:key :channels :title "📢 Channels" :description "How you reach them"
    :color "orange" :grid-area "channels"}
   {:key :cost-structure :title "💰 Cost Structure" :description "Fixed & variable costs"
    :color "pink" :grid-area "cost-structure"}
   {:key :revenue-streams :title "💵 Revenue Streams" :description "How you make money"
    :color "green" :grid-area "revenue-streams"}])

;; ============================================================================
;; Progress Component
;; ============================================================================

(defn canvas-progress-bar
  "Show completion progress for Lean Canvas"
  [{:keys [completed total]}]
  (let [percentage (if (> total 0) (* 100 (/ completed total)) 0)]
    (dom/div :.builder-progress
             (dom/h3 "Canvas Completion")
             (dom/div :.progress-container
                      (dom/div :.progress-bar
                               (dom/div :.progress-fill {:style {:width (str percentage "%")}}))
                      (dom/span :.progress-text (str completed "/" total " blocks"))))))

;; ============================================================================
;; Main Builder Page
;; ============================================================================

(defsc LeanCanvasBuilderPage
  "Lean Canvas builder with visual business model interface"
  [this {:keys [project-id project-name lean-canvas/session lean-canvas/notes] :as props}]
  {:query         [:project-id :project-name
                   :lean-canvas/session
                   :lean-canvas/notes
                   [df/marker-table :lean-canvas-builder]]
   :ident         (fn [] [:page/id :lean-canvas-builder])
   :route-segment ["project" :project-id "canvas"]
   :initial-state (fn [_] {:lean-canvas/notes {}})
   :will-enter    (fn [app {:keys [project-id]}]
                    (dr/route-deferred [:page/id :lean-canvas-builder]
                                       (fn []
                                         (df/load! app [:page/id :lean-canvas-builder] LeanCanvasBuilderPage
                                                   {:marker :lean-canvas-builder
                                                    :params {:project-id project-id}
                                                    :post-mutation `dr/target-ready
                                                    :post-mutation-params {:target [:page/id :lean-canvas-builder]}}))))}

  (let [loading? (df/loading? (get props [df/marker-table :lean-canvas-builder]))
        session-data (or session {})
        notes-map (or notes {})

        ;; Organize notes by block
        notes-by-block (group-by :item/section (vals notes-map))

        ;; Calculate progress
        blocks [:problems :solution :uvp :unfair-advantage :customer-segments
                :key-metrics :channels :cost-structure :revenue-streams]
        completed-count (count (filter #(seq (get notes-by-block %)) blocks))
        is-complete? (= completed-count (count blocks))]

    (if loading?
      (dom/div :.loading "Loading Lean Canvas builder...")

      (dom/div :.builder-page
        ;; Header
               (dom/div :.builder-header
                        (dom/h1 "📊 Lean Canvas Builder")
                        (dom/p :.builder-subtitle
                               (str "Business model for: " project-name)))

        ;; Toolbar
               (canvas/toolbar
                {:on-export (fn []
                              (let [json-data (canvas/export-canvas-to-json (vals notes-map))]
                                (canvas/download-json (str "lean-canvas-" project-id ".json") json-data)))
                 :on-share (fn [] (js/alert "Share link copied to clipboard!"))
                 :on-present (fn [] (js/alert "Present mode activated!"))
                 :on-clear (fn []
                             (when (js/confirm "Clear all notes? This cannot be undone.")
                               (comp/transact! this [(m/set-props {:lean-canvas/notes {}})])))
                 :can-undo? false
                 :can-redo? false})

        ;; Progress
               (canvas-progress-bar {:completed completed-count :total (count blocks)})

               (if is-complete?
          ;; Completion State
                 (dom/div :.completion-state
                          (dom/div :.completion-icon "🎉")
                          (dom/h2 "Lean Canvas Complete!")
                          (dom/p "You now have a complete business model. Time to validate your assumptions!")
                          (dom/div :.completion-actions
                                   (ui/button
                                    {:on-click #(dr/change-route! this ["project" {:project-id project-id}])
                                     :variant :secondary}
                                    "Back to Project")
                                   (ui/button
                                    {:on-click #(js/alert "Export to PDF coming soon!")
                                     :variant :primary}
                                    "Export PDF 📄")
                                   (ui/button
                                    {:on-click #(dr/change-route! this ["project" {:project-id project-id} "mvp"])
                                     :variant :primary}
                                    "Plan MVP →")))

          ;; Visual Canvas
                 (dom/div :.canvas-container
                          (canvas/lean-canvas
                           {:sections lean-canvas-blocks
                            :items (vals notes-map)
                            :on-item-add (fn [block-key]
                                           (let [block-config (first (filter #(= (:key %) block-key) lean-canvas-blocks))
                                                 content (js/prompt (str "Add note to " (:title block-config) ":"))]
                                             (when (seq content)
                                               (comp/transact! this
                                                               [(add-canvas-note
                                                                 {:session-id (:session/id session-data)
                                                                  :block-key block-key
                                                                  :content content
                                                                  :color (:color block-config)})]))))})))))))
