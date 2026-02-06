(ns ouroboros.frontend.ui.pages.empathy-builder
  "Empathy Map builder page with visual canvas interface

   Features:
   - Visual 2x3 grid layout
   - Drag-and-drop sticky notes
   - Real-time collaboration
   - Rich text editing"
  (:require
   [clojure.string :as str]
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

(m/defmutation start-empathy-session
  "Start a new empathy mapping session"
  [{:keys [project-id persona-name]}]
  (remote [env] env)
  (ok-action [{:keys [result state]}]
             (let [session-data (:body result)]
               (swap! state assoc :empathy/session session-data))))

(m/defmutation update-empathy-data
  "Update empathy session data via WebSocket"
  [{:keys [session-id data]}]
  (remote [env] env)
  (ok-action [{:keys [state]}]
             (swap! state assoc-in [:empathy/session :session/data] data)))

(m/defmutation complete-empathy-session
  "Mark empathy session as complete"
  [{:keys [session-id]}]
  (remote [env] env)
  (ok-action [{:keys [state]}]
             (swap! state assoc-in [:empathy/session :session/state] :completed)))

(m/defmutation add-empathy-note
  "Add a sticky note to an empathy section"
  [{:keys [session-id section-key content]}]
  (action [{:keys [state]}]
          (let [new-note (canvas/create-sticky-note section-key content)]
            (swap! state update-in [:empathy/notes] assoc (:item/id new-note) new-note)))
  (remote [env] env))

(m/defmutation update-empathy-note
  "Update a sticky note"
  [{:keys [note-id updates]}]
  (action [{:keys [state]}]
          (swap! state update-in [:empathy/notes note-id] merge updates)))

(m/defmutation delete-empathy-note
  "Delete a sticky note"
  [{:keys [note-id]}]
  (action [{:keys [state]}]
          (swap! state update :empathy/notes dissoc note-id)))

;; ============================================================================
;; Sub-Components
;; ============================================================================

(defn empathy-progress-bar
  "Show completion progress for empathy map"
  [{:keys [completed total]}]
  (let [percentage (if (> total 0) (* 100 (/ completed total)) 0)]
    (dom/div :.builder-progress
             (dom/h3 "Progress")
             (dom/div :.progress-container
                      (dom/div :.progress-bar
                               (dom/div :.progress-fill {:style {:width (str percentage "%")}}))
                      (dom/span :.progress-text (str completed "/" total " sections"))))))

(defsc PersonaCard
  "Display the persona card prominently"
  [this {:keys [persona-name persona-details on-edit]}]
  (dom/div :.persona-card
           (dom/div :.persona-avatar "👤")
           (dom/div :.persona-info
                    (dom/h3 persona-name)
                    (dom/p persona-details))
           (ui/button
            {:on-click on-edit
             :variant :secondary}
            "Edit")))

;; ============================================================================
;; Main Builder Page
;; ============================================================================

(defsc EmpathyBuilderPage
  "Empathy Map builder with visual canvas interface"
  [this {:keys [project-id project-name empathy/session empathy/notes ui] :as props}]
  {:query         [:project-id :project-name
                   :empathy/session
                   :empathy/notes
                   {:ui [:ui/persona-name :ui/persona-details :ui/show-persona-modal]}
                   [df/marker-table :empathy-builder]]
   :ident         (fn [] [:page/id :empathy-builder])
   :route-segment ["project" :project-id "empathy"]
   :initial-state (fn [_] {:empathy/notes {}
                           :ui {:ui/persona-name ""
                                :ui/persona-details ""
                                :ui/show-persona-modal true}})
   :will-enter    (fn [app {:keys [project-id]}]
                    (dr/route-deferred [:page/id :empathy-builder]
                                       (fn []
                                         (df/load! app [:page/id :empathy-builder] EmpathyBuilderPage
                                                   {:marker :empathy-builder
                                                    :params {:project-id project-id}
                                                    :post-mutation `dr/target-ready
                                                    :post-mutation-params {:target [:page/id :empathy-builder]}}))))}

  (let [loading? (df/loading? (get props [df/marker-table :empathy-builder]))
        session-data (or session {})
        notes-map (or notes {})
        {:keys [ui/persona-name ui/persona-details ui/show-persona-modal]} (or ui {})

        ;; Organize notes by section
        notes-by-section (group-by :item/section (vals notes-map))

        ;; Calculate progress
        sections [:persona :think-feel :hear :see :say-do :pains-gains]
        completed-count (count (filter #(seq (get notes-by-section %)) sections))
        is-complete? (= completed-count (count sections))]

    (if loading?
      (dom/div :.loading "Loading empathy builder...")

      (dom/div :.builder-page
        ;; Header
               (dom/div :.builder-header
                        (dom/h1 "🧠 Empathy Map Builder")
                        (dom/p :.builder-subtitle
                               (str "Understanding your customer for: " project-name)))

        ;; Toolbar
               (canvas/toolbar
                {:on-export (fn []
                              (let [json-data (canvas/export-canvas-to-json (vals notes-map))]
                                (canvas/download-json (str "empathy-map-" project-id ".json") json-data)))
                 :on-share (fn [] (js/alert "Share link copied to clipboard!"))
                 :on-present (fn [] (js/alert "Present mode activated!"))
                 :on-clear (fn []
                             (when (js/confirm "Clear all notes? This cannot be undone.")
                               (comp/transact! this [(m/set-props {:empathy/notes {}})])))
                 :can-undo? false
                 :can-redo? false})

        ;; Persona Modal (first step)
               (when (and show-persona-modal (empty? persona-name))
                 (dom/div :.modal-overlay
                          (dom/div :.modal-content
                                   (dom/h2 "👤 Define Your Persona")
                                   (dom/p "Who is the customer you're building for?")
                                   (dom/div :.form-group
                                            (dom/label "Persona Name")
                                            (dom/input
                                             {:type "text"
                                              :value (or persona-name "")
                                              :onChange #(m/set-string! this :ui/persona-name :event %)
                                              :placeholder "e.g., Alex, the Curious Developer"}))
                                   (dom/div :.form-group
                                            (dom/label "Details")
                                            (dom/textarea
                                             {:value (or persona-details "")
                                              :onChange #(m/set-string! this :ui/persona-details :event %)
                                              :placeholder "Age, job, goals, challenges..."
                                              :rows 3}))
                                   (dom/div :.modal-actions
                                            (ui/button
                                             {:onClick #(comp/transact! this
                                                                        [(add-empathy-note
                                                                          {:session-id (:session/id session-data)
                                                                           :section-key :persona
                                                                           :content (str persona-name " - " persona-details)})
                                                                         (m/set-props {:ui {:ui/show-persona-modal false}})])
                                              :variant :primary
                                              :disabled (empty? (str/trim (or persona-name "")))}
                                             "Start Building")))))

        ;; Progress
               (empathy-progress-bar {:completed completed-count :total (count sections)})

               (if is-complete?
          ;; Completion State
                 (dom/div :.completion-state
                          (dom/div :.completion-icon "🎉")
                          (dom/h2 "Empathy Map Complete!")
                          (dom/p "You now deeply understand your customer. The insights you've gathered will inform your Value Proposition.")
                          (dom/div :.completion-actions
                                   (ui/button
                                    {:on-click #(dr/change-route! this ["project" {:project-id project-id}])
                                     :variant :secondary}
                                    "Back to Project")
                                   (ui/button
                                    {:on-click #(dr/change-route! this ["project" {:project-id project-id} "valueprop"])
                                     :variant :primary}
                                    "Continue to Value Proposition →")))

          ;; Visual Canvas
                 (dom/div :.canvas-container
                          (canvas/empathy-map
                           {:sections (canvas/initialize-empathy-map)
                            :items (vals notes-map)
                            :on-item-add (fn [section-key]
                                           (let [content (js/prompt (str "Add note to " (name section-key) ":"))]
                                             (when (seq content)
                                               (comp/transact! this
                                                               [(add-empathy-note
                                                                 {:session-id (:session/id session-data)
                                                                  :section-key section-key
                                                                  :content content})]))))
                            :on-item-move (fn [item-id new-position]
                                            (comp/transact! this
                                                            [(update-empathy-note
                                                              {:note-id item-id
                                                               :updates {:item/position new-position}})]))
                            :on-item-update (fn [item-id updates]
                                              (comp/transact! this
                                                              [(update-empathy-note {:note-id item-id :updates updates})]))})))))))
