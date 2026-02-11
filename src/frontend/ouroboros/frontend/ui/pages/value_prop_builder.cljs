(ns ouroboros.frontend.ui.pages.value-prop-builder
  "Value Proposition builder page with visual canvas interface

   Features:
   - Visual 2-column canvas layout (Customer Profile | Value Map)
   - Sticky notes with click-to-edit
   - Undo/redo history
   - Guided onboarding and tutorials
   - Section prompts and examples
   - Presentation mode"
   (:require
    [clojure.string :as str]
    [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
    [com.fulcrologic.fulcro.dom :as dom]
    [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
    [com.fulcrologic.fulcro.data-fetch :as df]
    [com.fulcrologic.fulcro.mutations :as m]
    [ouroboros.frontend.ui.components :as ui]
    [ouroboros.frontend.ui.canvas-components :as canvas]
    [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Section Configuration with Prompts and Examples
;; ============================================================================

(def value-prop-sections
  "Configuration for each Value Proposition section"
  [{:key :customer-job
    :title "Customer Job"
    :icon "🎯"
    :prompt "What job does your customer need to get done?"
    :hint "Describe the core problem they're trying to solve"
    :description "Identify the main task, problem, or need your customer is trying to address."
    :prompts ["What task are they trying to accomplish?"
              "What problem keeps recurring for them?"
              "What need are they trying to satisfy?"
              "What goal are they working toward?"]
    :examples ["Coordinate team projects across time zones"
               "Track expenses and stay within budget"
               "Find qualified leads for sales pipeline"
               "Ship products to customers quickly"]}

   {:key :pains
    :title "Customer Pains"
    :icon "😫"
    :prompt "What frustrates your customer about current solutions?"
    :hint "Focus on the obstacles, risks, and negative outcomes they face"
    :description "Understand what annoys, frustrates, or creates risk for your customer."
    :prompts ["What do they find too costly (time, money, effort)?"
              "What makes them feel bad or frustrated?"
              "What risks do they fear?"
              "What common mistakes do they make?"]
    :examples ["Current tools are too complex and slow"
               "Manual processes waste 10+ hours per week"
               "Worried about security and data breaches"
               "Hard to get buy-in from stakeholders"]}

   {:key :gains
    :title "Customer Gains"
    :icon "🌟"
    :prompt "What would make your customer's life better?"
    :hint "Focus on the outcomes, benefits, and positive feelings they desire"
    :description "Discover what your customer would love to achieve or have."
    :prompts ["What would make them happy?"
              "What would make their job easier?"
              "What would they brag about to peers?"
              "What would exceed their expectations?"]
    :examples ["Save 5+ hours per week on admin tasks"
               "Get real-time visibility into team progress"
               "Feel confident about data security"
               "Look like a hero to their boss"]}

   {:key :products
    :title "Products & Services"
    :icon "📦"
    :prompt "What products or services will you offer?"
    :hint "List the specific things you'll create or provide"
    :description "Define what you'll actually build or provide."
    :prompts ["What is the core product/service?"
              "What features are essential (MVP)?"
              "What supporting services are needed?"
              "What format will it take (app, service, platform)?"]
    :examples ["Web-based project management dashboard"
               "Mobile app for expense tracking"
               "API for automated data sync"
               "Weekly consulting sessions"]}

   {:key :pain-relievers
    :title "Pain Relievers"
    :icon "💊"
    :prompt "How does your product reduce customer pains?"
    :hint "Connect your solution directly to their frustrations"
    :description "Explain how your product alleviates specific customer pains."
    :prompts ["How do you save them time/money?"
              "How do you reduce their risks?"
              "How do you eliminate frustrations?"
              "How do you prevent common mistakes?"]
    :examples ["One-click automation replaces manual work"
               "Real-time alerts prevent missed deadlines"
               "Bank-level encryption protects data"
               "Guided wizards prevent configuration errors"]}

   {:key :gain-creators
    :title "Gain Creators"
    :icon "🚀"
    :prompt "How does your product create customer gains?"
    :hint "Show how you deliver the outcomes they desire"
    :description "Explain how your product creates specific customer gains."
    :prompts ["How do you deliver desired outcomes?"
              "How do you exceed expectations?"
              "How do you make them look good?"
              "How do you create unexpected delight?"]
    :examples ["Dashboard shows ROI to justify budget"
               "Team productivity increased by 40%"
               "Integration with existing tools - no switching"
               "AI suggestions surface insights automatically"]}])

;; ============================================================================
;; Tutorial Steps
;; ============================================================================

(def tutorial-steps
  "Step-by-step tutorial for the Value Proposition Canvas"
  [{:step 1
    :title "Welcome to Value Proposition Design!"
    :icon "🎯"
    :content "The Value Proposition Canvas helps you design products that customers actually want. It ensures a fit between what you offer and what customers need."
    :tip "This takes about 20-30 minutes and builds on your Empathy Map insights."}
   {:step 2
    :title "Start with Customer Jobs"
    :icon "🧑‍💼"
    :content "First, identify the main job your customer is trying to get done. This could be a task, problem they're solving, or need they're fulfilling."
    :tip "Use your Empathy Map insights - what are they trying to achieve?"}
   {:step 3
    :title "Identify Their Pains"
    :icon "😫"
    :content "List what frustrates your customer about getting their job done. What obstacles, risks, or negative outcomes do they face?"
    :tip "Focus on the most severe and frequent pains first."}
   {:step 4
    :title "Discover Their Gains"
    :icon "🌟"
    :content "Capture what would make your customer happy. What outcomes do they desire? What would exceed their expectations?"
    :tip "Think about both expected and unexpected gains."}
   {:step 5
    :title "Define Your Offering"
    :icon "📦"
    :content "Now describe your products and services. What will you actually build or provide to help customers?"
    :tip "Start with the minimum viable product (MVP)."}
   {:step 6
    :title "Create Value Fit"
    :icon "✨"
    :content "Finally, show how your product relieves pains and creates gains. This is where you prove the fit between customer needs and your solution."
    :tip "The best value propositions directly address the biggest pains and gains."}])

;; ============================================================================
;; Note Mutations (with undo/redo history)
;; ============================================================================

(defn- push-undo!
  "Snapshot current notes onto undo stack before a mutation. Clears redo stack."
  [state]
  (let [current-notes (get-in state [:page/id :value-prop-builder :valueprop/notes] {})
        undo-stack (get-in state [:page/id :value-prop-builder :ui :ui/undo-stack] [])]
    (-> state
        (assoc-in [:page/id :value-prop-builder :ui :ui/undo-stack]
                  (conj undo-stack current-notes))
        (assoc-in [:page/id :value-prop-builder :ui :ui/redo-stack] []))))

(defonce ^:private valueprop-sync-timer (atom nil))

(defn- sync-valueprop-notes!
  "Send current value prop notes to backend for persistence (debounced 500ms)"
  [state-atom]
  (when-let [t @valueprop-sync-timer]
    (js/clearTimeout t))
  (reset! valueprop-sync-timer
    (js/setTimeout
      (fn []
        (let [s @state-atom
              project-id (get-in s [:page/id :value-prop-builder :project/id])
              session-id (str "valueprop-" project-id)
              notes (get-in s [:page/id :value-prop-builder :valueprop/notes] {})]
          (when project-id
            (ws/save-builder-data! project-id session-id :value-proposition notes))))
      500)))

(m/defmutation add-valueprop-note
  "Add a sticky note to a value prop section"
  [{:keys [section-key content]}]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)
                               new-note (canvas/create-sticky-note section-key content)]
                           (update-in s [:page/id :value-prop-builder :valueprop/notes]
                                      (fnil assoc {}) (:item/id new-note) new-note))))
          (sync-valueprop-notes! state)))

(m/defmutation update-valueprop-note
  "Update a sticky note"
  [{:keys [note-id updates]}]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)]
                           (update-in s [:page/id :value-prop-builder :valueprop/notes note-id] merge updates))))
          (sync-valueprop-notes! state)))

(m/defmutation delete-valueprop-note
  "Delete a sticky note"
  [{:keys [note-id]}]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)]
                           (update-in s [:page/id :value-prop-builder :valueprop/notes] dissoc note-id))))
          (sync-valueprop-notes! state)))

(m/defmutation undo-valueprop
  "Undo last notes change"
  [_]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [undo-stack (get-in s [:page/id :value-prop-builder :ui :ui/undo-stack] [])
                               redo-stack (get-in s [:page/id :value-prop-builder :ui :ui/redo-stack] [])
                               current-notes (get-in s [:page/id :value-prop-builder :valueprop/notes] {})]
                           (if (seq undo-stack)
                             (-> s
                                 (assoc-in [:page/id :value-prop-builder :valueprop/notes] (peek undo-stack))
                                 (assoc-in [:page/id :value-prop-builder :ui :ui/undo-stack] (pop undo-stack))
                                 (assoc-in [:page/id :value-prop-builder :ui :ui/redo-stack] (conj redo-stack current-notes)))
                             s))))))

(m/defmutation redo-valueprop
  "Redo last undone notes change"
  [_]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [undo-stack (get-in s [:page/id :value-prop-builder :ui :ui/undo-stack] [])
                               redo-stack (get-in s [:page/id :value-prop-builder :ui :ui/redo-stack] [])
                               current-notes (get-in s [:page/id :value-prop-builder :valueprop/notes] {})]
                           (if (seq redo-stack)
                             (-> s
                                 (assoc-in [:page/id :value-prop-builder :valueprop/notes] (peek redo-stack))
                                 (assoc-in [:page/id :value-prop-builder :ui :ui/redo-stack] (pop redo-stack))
                                 (assoc-in [:page/id :value-prop-builder :ui :ui/undo-stack] (conj undo-stack current-notes)))
                             s))))))

(m/defmutation clear-valueprop-notes
  "Clear all notes with undo support"
  [_]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)]
                           (assoc-in s [:page/id :value-prop-builder :valueprop/notes] {}))))
          (sync-valueprop-notes! state)))

;; ============================================================================
;; Tutorial Modal Component
;; ============================================================================

(defn tutorial-modal
  "Step-by-step tutorial overlay"
  [{:keys [current-step on-next on-prev on-skip on-complete]}]
  (let [step-data (nth tutorial-steps (dec current-step))
        total-steps (count tutorial-steps)
        is-last? (= current-step total-steps)]
    (dom/div :.modal-overlay
             (dom/div :.tutorial-modal
                      ;; Progress dots
                      (dom/div :.tutorial-progress
                               (for [i (range 1 (inc total-steps))]
                                 (dom/span {:key i
                                            :className (str "progress-dot "
                                                            (when (= i current-step) "active")
                                                            (when (< i current-step) "completed"))})))
                      ;; Step content
                      (dom/div :.tutorial-content
                               (dom/div :.tutorial-icon (:icon step-data))
                               (dom/h2 (:title step-data))
                               (dom/p :.tutorial-text (:content step-data))
                               (dom/div :.tutorial-tip
                                        (dom/span :.tip-icon "💡")
                                        (dom/span (:tip step-data))))
                      ;; Navigation
                      (dom/div :.tutorial-actions
                               (dom/button
                                {:className "btn btn-link"
                                 :onClick on-skip}
                                "Skip tutorial")
                               (dom/div :.tutorial-nav
                                        (when (> current-step 1)
                                          (dom/button
                                           {:className "btn btn-secondary"
                                            :onClick on-prev}
                                           "< Back"))
                                        (if is-last?
                                          (dom/button
                                           {:className "btn btn-primary"
                                            :onClick on-complete}
                                           "Start Building! >")
                                          (dom/button
                                           {:className "btn btn-primary"
                                            :onClick on-next}
                                           "Next >"))))))))

;; ============================================================================
;; Section Add Modal with Prompts and Examples
;; ============================================================================

(defn section-add-modal
  "Modal for adding notes with guided prompts"
  [{:keys [section-key on-add on-cancel]}]
  (let [section-config (first (filter #(= (:key %) section-key) value-prop-sections))
        {:keys [title icon prompts examples hint]} section-config]
    (dom/div :.modal-overlay
             (dom/div :.modal-content.section-modal
                      (dom/div :.section-modal-header
                               (dom/span :.section-icon icon)
                               (dom/h2 title))

                      (dom/div :.modal-body
                               (dom/div :.prompts-section
                                        (dom/h4 "Think about:")
                                        (dom/ul :.prompt-list
                                                (for [prompt prompts]
                                                  (dom/li {:key prompt} prompt))))

                               (dom/div :.examples-section
                                        (dom/h4 "Examples (click to add):")
                                        (dom/div :.example-chips
                                                 (for [example examples]
                                                   (dom/span
                                                    {:key example
                                                     :className "example-chip"
                                                     :onClick #(on-add example)
                                                     :title "Click to add this as a note"}
                                                    example))))

                               (dom/div :.form-group
                                        (dom/label "Add your insight:")
                                        (when hint
                                          (dom/p :.input-hint (str "💡 " hint)))
                                        (dom/textarea
                                         {:id "section-note-input"
                                          :placeholder "Type your insight here..."
                                          :rows 3})))

                      (dom/div :.modal-actions
                               (dom/button
                                {:className "btn btn-secondary"
                                 :onClick on-cancel}
                                "Cancel")
                               (dom/button
                                {:className "btn btn-primary"
                                  :onClick #(let [input (js/document.getElementById "section-note-input")
                                                  value (.-value input)]
                                              (when (seq (str/trim (or value "")))
                                                (on-add value)))}
                                "Add Note"))))))

;; ============================================================================
;; Help Panel Component
;; ============================================================================

(defn help-panel
  "Slide-out help panel with tips and guidance"
  [{:keys [on-close on-start-tutorial]}]
  (dom/div :.help-panel
           (dom/div :.help-header
                    (dom/h3 "📚 Value Proposition Help")
                    (dom/button
                     {:className "btn btn-close"
                      :onClick on-close}
                     "x"))
           (dom/div :.help-content
                    (dom/div :.help-section
                             (dom/h4 "What is a Value Proposition?")
                             (dom/p "A Value Proposition describes the benefits customers can expect from your product. It shows the fit between what you offer and what customers need."))

                    (dom/div :.help-section
                             (dom/h4 "The 6 Sections")
                             (dom/ul
                              (dom/li (dom/strong "🎯 Customer Job: ") "What they're trying to accomplish")
                              (dom/li (dom/strong "😫 Pains: ") "What frustrates them")
                              (dom/li (dom/strong "🌟 Gains: ") "What they want to achieve")
                              (dom/li (dom/strong "📦 Products: ") "What you offer")
                              (dom/li (dom/strong "💊 Pain Relievers: ") "How you reduce pains")
                              (dom/li (dom/strong "🚀 Gain Creators: ") "How you create gains")))

                    (dom/div :.help-section
                             (dom/h4 "Tips for Success")
                             (dom/ul
                              (dom/li "Start with customer jobs, not your product")
                              (dom/li "Rank pains and gains by importance")
                              (dom/li "Focus on the most important items first")
                              (dom/li "Validate assumptions with real customers")))

                    (dom/button
                     {:className "btn btn-primary btn-block"
                      :onClick on-start-tutorial}
                     "🎓 Start Tutorial"))))

;; ============================================================================
;; Progress Component
;; ============================================================================

(defn value-prop-progress [{:keys [completed total sections notes-by-section]}]
  (let [percentage (if (> total 0) (* 100 (/ completed total)) 0)]
    (dom/div :.builder-progress
             (dom/div :.progress-header
                      (dom/h3 "Your Progress")
                      (dom/span :.progress-percentage (str (Math/round percentage) "%")))
             (dom/div :.progress-container
                      (dom/div :.progress-bar
                               (dom/div :.progress-fill {:style {:width (str percentage "%")}})))
             ;; Section breakdown
             (dom/div :.section-status
                      (for [{:keys [key icon title]} sections]
                        (let [has-notes? (seq (get notes-by-section key))]
                          (dom/span
                           {:key (name key)
                            :className (str "status-item " (when has-notes? "completed"))
                            :title (str title ": " (if has-notes? "Done" "Not started"))}
                           icon)))))))

;; ============================================================================
;; Main Builder Page
;; ============================================================================

(defsc ValuePropBuilderPage
  "Value Proposition builder page with visual canvas interface"
  [this {:keys [project/id valueprop/notes ui] :as props}]
  {:query         [:project/id :project/name
                   :valueprop/notes
                   {:ui [:ui/show-tutorial :ui/tutorial-step
                         :ui/show-help :ui/show-section-modal
                         :ui/active-section
                         :ui/undo-stack :ui/redo-stack :ui/presenting?
                         :ui/show-wisdom]}
                   [df/marker-table :value-prop-builder]]
   :ident         (fn [] [:page/id :value-prop-builder])
   :route-segment ["project" :project-id "valueprop"]
   :initial-state (fn [_] {:valueprop/notes {}
                             :ui {:ui/show-tutorial false
                                  :ui/tutorial-step 1
                                  :ui/show-help false
                                  :ui/show-section-modal false
                                 :ui/active-section nil
                                 :ui/undo-stack []
                                 :ui/redo-stack []
                                 :ui/presenting? false
                                 :ui/show-wisdom false}})
   :pre-merge     (fn [{:keys [current-normalized data-tree]}]
                      (let [default-ui {:ui/show-tutorial false
                                       :ui/tutorial-step 1
                                       :ui/show-help false
                                       :ui/show-section-modal false
                                       :ui/active-section nil
                                       :ui/undo-stack []
                                       :ui/redo-stack []
                                       :ui/presenting? false
                                       :ui/show-wisdom false}
                          existing-ui (:ui current-normalized)
                          ui-val (if (and existing-ui (seq existing-ui))
                                   existing-ui
                                   default-ui)
                          clean-data (dissoc data-tree :ui :valueprop/notes :completed-responses)
                          ;; Prefer client notes if non-empty, otherwise use server notes
                          client-notes (:valueprop/notes current-normalized)
                          server-notes (:valueprop/notes data-tree)]
                      (merge
                       {:ui ui-val
                        :valueprop/notes (or (not-empty client-notes) (not-empty server-notes) {})}
                       clean-data)))
   :will-enter    (fn [app {:keys [project-id]}]
                    (let [decoded-id (str/replace (or project-id "") "~" "/")]
                      (dr/route-deferred [:page/id :value-prop-builder]
                        (fn []
                          (df/load! app [:page/id :value-prop-builder] ValuePropBuilderPage
                            {:marker :value-prop-builder
                             :params {:project-id decoded-id}
                             :post-mutation `dr/target-ready
                             :post-mutation-params {:target [:page/id :value-prop-builder]}})))))}

  (let [loading? (df/loading? (get props [df/marker-table :value-prop-builder]))
        project-id id
        project-name (or (:project/name props) "")
        notes-map (or notes {})
        {:keys [ui/show-tutorial ui/tutorial-step ui/show-help
                ui/show-section-modal ui/active-section
                ui/undo-stack ui/redo-stack ui/presenting? ui/show-wisdom]} (or ui {})
        tutorial-step (or tutorial-step 1)

        ;; Organize notes by section
        notes-by-section (group-by :item/section (vals notes-map))

        ;; Calculate progress
        section-keys [:customer-job :pains :gains :products :pain-relievers :gain-creators]
        completed-count (count (filter #(seq (get notes-by-section %)) section-keys))
        total-sections (count section-keys)
        is-complete? (= completed-count total-sections)]

    (if loading?
      (dom/div :.loading
               (dom/div :.loading-spinner)
               (dom/p "Loading Value Proposition builder..."))

      (dom/div :.builder-page.value-prop-builder

        ;; Present Mode (fullscreen overlay)
        (when presenting?
          (canvas/presentation
           {:title "Value Proposition Canvas"
            :sections (mapv (fn [{:keys [key title icon]}]
                              {:key key :title title :icon icon})
                            value-prop-sections)
            :notes-by-section notes-by-section
            :on-exit #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/presenting? false)})])}))

        ;; Tutorial Modal
        (when show-tutorial
          (tutorial-modal
           {:current-step tutorial-step
            :on-next #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/tutorial-step (inc tutorial-step))})])
            :on-prev #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/tutorial-step (dec tutorial-step))})])
            :on-skip #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-tutorial false)})])
            :on-complete #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-tutorial false)})])}))

        ;; Section Add Modal (when adding notes with guidance)
        (when (and show-section-modal active-section)
          (section-add-modal
           {:section-key active-section
            :on-add (fn [content]
                      (comp/transact! this
                                      [(add-valueprop-note
                                        {:section-key active-section
                                         :content content})
                                       (m/set-props {:ui (-> ui
                                                             (assoc :ui/show-section-modal false)
                                                             (assoc :ui/active-section nil))})]))
            :on-cancel #(comp/transact! this [(m/set-props {:ui (-> ui
                                                                    (assoc :ui/show-section-modal false)
                                                                    (assoc :ui/active-section nil))})])}))

        ;; Help Panel
        (when show-help
          (help-panel
           {:on-close #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-help false)})])
            :on-start-tutorial #(comp/transact! this [(m/set-props {:ui (-> ui
                                                                            (assoc :ui/show-help false)
                                                                            (assoc :ui/show-tutorial true)
                                                                            (assoc :ui/tutorial-step 1))})])}))

        ;; Header
        (dom/div :.builder-header
                 (dom/div :.header-content
                          (dom/h1 "🎯 Value Proposition Builder")
                          (dom/p :.builder-subtitle (str "Defining value for: " project-name)))
                 (dom/div :.header-actions
                   (dom/button
                    {:className (str "btn-wisdom " (when show-wisdom "active"))
                     :onClick #(comp/transact! this [(m/set-props {:ui (update ui :ui/show-wisdom not)})])}
                    "💡 Wisdom")
                   (dom/button
                    {:className "btn btn-help"
                     :onClick #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-help true)})])
                     :title "How to use this tool"}
                    "❓ Help")))

        ;; Flywheel progress indicator
        (ui/flywheel-indicator
          {:current-step :valueprop
           :project-id project-id
           :on-navigate (fn [route]
                          (let [encoded-id (str/replace (str project-id) "/" "~")]
                            (dr/change-route! this ["project" encoded-id route])))})

        ;; Wisdom sidebar (contextual tips)
        (ui/wisdom-sidebar
          {:phase :valueprop
           :show? show-wisdom
           :project-id project-id
           :on-close #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-wisdom false)})])})

        ;; Toolbar
        (canvas/toolbar
         {:on-export (fn []
                       (let [json-data (canvas/export-canvas-to-json (vals notes-map))]
                         (canvas/download-json (str "value-prop-" project-id ".json") json-data)))
          :on-share (fn [] (js/alert "Share link copied to clipboard!"))
          :on-present (fn [] (comp/transact! this [(m/set-props {:ui (assoc ui :ui/presenting? true)})]))
          :on-clear (fn []
                      (when (js/confirm "Clear all notes? This cannot be undone.")
                        (comp/transact! this [(clear-valueprop-notes {})])))
          :on-undo (fn [] (comp/transact! this [(undo-valueprop {})]))
          :on-redo (fn [] (comp/transact! this [(redo-valueprop {})]))
          :can-undo? (seq undo-stack)
          :can-redo? (seq redo-stack)})

        ;; Progress
        (value-prop-progress {:completed completed-count
                              :total total-sections
                              :sections value-prop-sections
                              :notes-by-section notes-by-section})

        ;; Completion banner (inline, above canvas)
        (when is-complete?
          (dom/div :.completion-banner
                   (dom/div :.completion-banner-content
                            (dom/span :.completion-banner-icon "🎉")
                            (dom/span :.completion-banner-text "Value Proposition Complete! Ready for the next step.")
                            (ui/button
                             {:on-click #(dr/change-route! this ["project" (str/replace (str project-id) "/" "~") "mvp"])
                              :variant :primary
                              :className "completion-banner-btn"}
                             "Continue to MVP Planning →"))))

        ;; Visual Canvas (always shown)
        (let [init-data (canvas/initialize-value-prop)]
          (dom/div :.canvas-container
            (canvas/value-prop-canvas
              {:sections (:canvas/sections init-data)
               :items (vals notes-map)
               :on-item-add (fn [section-key]
                               (comp/transact! this
                                 [(m/set-props {:ui (-> ui
                                                        (assoc :ui/show-section-modal true)
                                                        (assoc :ui/active-section section-key))})]))
               :on-item-edit (fn [note-id new-content]
                                (comp/transact! this
                                  [(update-valueprop-note
                                    {:note-id note-id
                                     :updates {:item/content new-content}})]))
               :on-item-delete (fn [note-id]
                                  (comp/transact! this
                                    [(delete-valueprop-note
                                      {:note-id note-id})]))})))))))
