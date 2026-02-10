(ns ouroboros.frontend.ui.pages.lean-canvas-builder
  "Lean Canvas builder page with visual business model layout

   Features:
   - Visual 9-box business model canvas
   - Drag-and-drop sticky notes
   - Step-by-step tutorial
   - Guided prompts and examples
   - Real-time collaboration
   - Export to PDF/JSON"
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
;; Block Configuration with Prompts and Examples
;; ============================================================================

(def lean-canvas-blocks
  "Configuration for the 9 Lean Canvas blocks with guidance"
  [{:key :problems
    :title "Problems"
    :icon "😫"
    :description "Top 3 problems your customers face"
    :color "red"
    :grid-area "problems"
    :prompts ["What's the #1 problem from your empathy map?"
              "What do customers complain about most?"
              "What existing solutions are they unhappy with?"]
    :examples ["Manual data entry wastes 10+ hours/week"
               "Can't get real-time visibility into projects"
               "Current tools don't integrate well"]}

   {:key :customer-segments
    :title "Customer Segments"
    :icon "👥"
    :description "Target customers and users"
    :color "blue"
    :grid-area "customer-segments"
    :prompts ["Who has these problems most severely?"
              "Who would pay to solve them?"
              "Who can you reach easily?"]
    :examples ["Product managers at Series A startups"
               "Remote team leads (5-15 direct reports)"
               "Freelance consultants managing 5+ clients"]}

   {:key :uvp
    :title "Unique Value Proposition"
    :icon "✨"
    :description "Single, clear, compelling message"
    :color "purple"
    :grid-area "uvp"
    :prompts ["What makes you different from alternatives?"
              "What benefit do you promise?"
              "How would you describe this in one sentence?"]
    :examples ["Save 10 hours/week with AI-powered automation"
               "The only tool built for distributed teams"
               "Get real-time insights without the complexity"]}

   {:key :solution
    :title "Solution"
    :icon "💡"
    :description "Top 3 features that solve the problems"
    :color "green"
    :grid-area "solution"
    :prompts ["What features directly address each problem?"
              "What's your MVP feature set?"
              "How do you deliver the UVP?"]
    :examples ["One-click automation for repetitive tasks"
               "Real-time dashboard with key metrics"
               "Smart notifications that cut through noise"]}

   {:key :channels
    :title "Channels"
    :icon "📢"
    :description "Path to customers"
    :color "orange"
    :grid-area "channels"
    :prompts ["How will customers discover you?"
              "How will they evaluate you?"
              "How will they buy and get onboarded?"]
    :examples ["Content marketing (blog, SEO)"
               "Product-led growth (free tier, referrals)"
               "Community presence (Twitter, Discord)"]}

   {:key :revenue-streams
    :title "Revenue Streams"
    :icon "💵"
    :description "How you make money"
    :color "green"
    :grid-area "revenue-streams"
    :prompts ["What will customers pay for?"
              "What's your pricing model?"
              "What's the revenue potential?"]
    :examples ["SaaS subscription: $29/month per seat"
               "Freemium with Pro tier at $99/month"
               "Usage-based pricing (per transaction)"]}

   {:key :cost-structure
    :title "Cost Structure"
    :icon "💰"
    :description "Fixed and variable costs"
    :color "pink"
    :grid-area "cost-structure"
    :prompts ["What are your fixed costs?"
              "What are your variable costs?"
              "What's your burn rate?"]
    :examples ["Engineering salaries (70% of costs)"
               "Cloud hosting ($500-2k/month)"
               "Marketing budget (20% of revenue)"]}

   {:key :key-metrics
    :title "Key Metrics"
    :icon "📊"
    :description "Key activities you measure"
    :color "teal"
    :grid-area "key-metrics"
    :prompts ["What metric shows product-market fit?"
              "What are your activation metrics?"
              "What are your retention metrics?"]
    :examples ["Weekly active users (WAU)"
               "Activation: Complete first workflow"
               "NPS > 40 from paying customers"]}

   {:key :unfair-advantage
    :title "Unfair Advantage"
    :icon "🛡️"
    :description "Something that can't be easily copied"
    :color "gold"
    :grid-area "unfair-advantage"
    :prompts ["What do you have that competitors can't copy?"
              "What would take years to replicate?"
              "What unique insights or assets do you have?"]
    :examples ["Proprietary data from 10k+ users"
               "Team with unique domain expertise"
               "First-mover network effects"]}])

;; ============================================================================
;; Tutorial Steps
;; ============================================================================

(def tutorial-steps
  "Step-by-step tutorial for Lean Canvas"
  [{:step 1
    :title "Welcome to Lean Canvas!"
    :icon "📊"
    :content "The Lean Canvas is a 1-page business model that helps you document your key assumptions. It's designed for startups and focuses on problems, solutions, and metrics."
    :tip "This takes about 30-45 minutes. You can always come back and refine."}
   {:step 2
    :title "Start with Problems"
    :icon "😫"
    :content "Begin by listing the top 3 problems your customers face. These should come from your Empathy Map research. Problems drive everything else."
    :tip "Rank problems by severity. Focus on problems people already spend money to solve."}
   {:step 3
    :title "Define Customer Segments"
    :icon "👥"
    :content "Who experiences these problems most acutely? Be specific about your target customers. Start narrow, expand later."
    :tip "Your early adopters should have the problem so badly they'll use an imperfect solution."}
   {:step 4
    :title "Craft Your UVP"
    :icon "✨"
    :content "Your Unique Value Proposition is a single, clear sentence that explains why you're different and worth paying attention to."
    :tip "Formula: [End Result] + [Time Period] + [Address Objection]. Example: 'Save 10 hours/week without changing your workflow'"}
   {:step 5
    :title "Outline Your Solution"
    :icon "💡"
    :content "List the top 3 features that solve the problems. Each feature should map directly to a problem. This is your MVP scope."
    :tip "Less is more. Focus on the features that deliver the UVP."}
   {:step 6
    :title "Complete the Canvas"
    :icon "🎯"
    :content "Fill in Channels (how you reach customers), Revenue (how you make money), Costs (what you spend), Metrics (what you measure), and Unfair Advantage (what's hard to copy)."
    :tip "The Unfair Advantage is often the hardest box. It's okay to leave it blank initially."}])

;; ============================================================================
;; Mutations (with undo/redo history)
;; ============================================================================

(defn- push-undo!
  "Snapshot current notes onto undo stack before a mutation. Clears redo stack."
  [state]
  (let [current-notes (get-in state [:page/id :lean-canvas-builder :lean-canvas/notes] {})
        undo-stack (get-in state [:page/id :lean-canvas-builder :ui :ui/undo-stack] [])]
    (-> state
        (assoc-in [:page/id :lean-canvas-builder :ui :ui/undo-stack]
                  (conj undo-stack current-notes))
        (assoc-in [:page/id :lean-canvas-builder :ui :ui/redo-stack] []))))

(defonce ^:private canvas-sync-timer (atom nil))

(defn- sync-canvas-notes!
  "Send current canvas notes to backend for persistence (debounced 500ms)"
  [state-atom]
  (when-let [t @canvas-sync-timer]
    (js/clearTimeout t))
  (reset! canvas-sync-timer
    (js/setTimeout
      (fn []
        (let [s @state-atom
              project-id (get-in s [:page/id :lean-canvas-builder :project/id])
              session (get-in s [:page/id :lean-canvas-builder :lean-canvas/session])
              session-id (or (:session/id session) (str "canvas-" project-id))
              notes (get-in s [:page/id :lean-canvas-builder :lean-canvas/notes] {})]
          (when project-id
            (ws/save-builder-data! project-id session-id :lean-canvas notes))))
      500)))

(m/defmutation add-canvas-note
  "Add a sticky note to a canvas block"
  [{:keys [session-id block-key content color]}]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)
                               new-note (canvas/create-sticky-note block-key content :color (or color "yellow"))]
                           (update-in s [:page/id :lean-canvas-builder :lean-canvas/notes]
                                      (fnil assoc {}) (:item/id new-note) new-note))))
          (sync-canvas-notes! state)))

(m/defmutation update-canvas-note
  "Update a canvas sticky note"
  [{:keys [note-id updates]}]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)]
                           (update-in s [:page/id :lean-canvas-builder :lean-canvas/notes note-id] merge updates))))
          (sync-canvas-notes! state)))

(m/defmutation delete-canvas-note
  "Delete a canvas sticky note"
  [{:keys [note-id]}]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)]
                           (update-in s [:page/id :lean-canvas-builder :lean-canvas/notes] dissoc note-id))))
          (sync-canvas-notes! state)))

(m/defmutation undo-canvas
  "Undo last notes change"
  [_]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [undo-stack (get-in s [:page/id :lean-canvas-builder :ui :ui/undo-stack] [])
                               redo-stack (get-in s [:page/id :lean-canvas-builder :ui :ui/redo-stack] [])
                               current-notes (get-in s [:page/id :lean-canvas-builder :lean-canvas/notes] {})]
                           (if (seq undo-stack)
                             (-> s
                                 (assoc-in [:page/id :lean-canvas-builder :lean-canvas/notes] (peek undo-stack))
                                 (assoc-in [:page/id :lean-canvas-builder :ui :ui/undo-stack] (pop undo-stack))
                                 (assoc-in [:page/id :lean-canvas-builder :ui :ui/redo-stack] (conj redo-stack current-notes)))
                             s))))))

(m/defmutation redo-canvas
  "Redo last undone notes change"
  [_]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [undo-stack (get-in s [:page/id :lean-canvas-builder :ui :ui/undo-stack] [])
                               redo-stack (get-in s [:page/id :lean-canvas-builder :ui :ui/redo-stack] [])
                               current-notes (get-in s [:page/id :lean-canvas-builder :lean-canvas/notes] {})]
                           (if (seq redo-stack)
                             (-> s
                                 (assoc-in [:page/id :lean-canvas-builder :lean-canvas/notes] (peek redo-stack))
                                 (assoc-in [:page/id :lean-canvas-builder :ui :ui/redo-stack] (pop redo-stack))
                                 (assoc-in [:page/id :lean-canvas-builder :ui :ui/undo-stack] (conj undo-stack current-notes)))
                             s))))))

(m/defmutation clear-canvas-notes
  "Clear all notes with undo support"
  [_]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)]
                           (assoc-in s [:page/id :lean-canvas-builder :lean-canvas/notes] {}))))
          (sync-canvas-notes! state)))

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
  [{:keys [block-key on-add on-cancel]}]
  (let [block-config (first (filter #(= (:key %) block-key) lean-canvas-blocks))
        {:keys [title icon prompts examples description]} block-config]
    (dom/div :.modal-overlay
             (dom/div :.modal-content.section-modal
                      (dom/div :.section-modal-header
                               (dom/span :.section-icon icon)
                               (dom/h2 title))

                      (dom/div :.modal-body
                               (dom/p :.section-description-inline description)

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
                                                     :title "Click to add this example"}
                                                    example))))

                               (dom/div :.form-group
                                        (dom/label "Add your note:")
                                        (dom/textarea
                                         {:id "canvas-note-input"
                                          :placeholder (str "Add a note to " title "...")
                                          :rows 3})))

                      (dom/div :.modal-actions
                               (dom/button
                                {:className "btn btn-secondary"
                                 :onClick on-cancel}
                                "Cancel")
                               (dom/button
                                {:className "btn btn-primary"
                                 :onClick #(let [input (js/document.getElementById "canvas-note-input")
                                                 value (.-value input)]
                                             (when (seq (str/trim value))
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
                    (dom/h3 "📚 Lean Canvas Help")
                    (dom/button
                     {:className "btn btn-close"
                      :onClick on-close}
                     "x"))
           (dom/div :.help-content
                    (dom/div :.help-section
                             (dom/h4 "What is Lean Canvas?")
                             (dom/p "Lean Canvas is a 1-page business model adapted for startups. It helps you document and test your key business assumptions quickly."))

                    (dom/div :.help-section
                             (dom/h4 "The 9 Blocks")
                             (dom/ul
                              (dom/li (dom/strong "😫 Problems: ") "Top 3 customer problems")
                              (dom/li (dom/strong "👥 Customers: ") "Target segments")
                              (dom/li (dom/strong "✨ UVP: ") "Unique value proposition")
                              (dom/li (dom/strong "💡 Solution: ") "Top 3 features")
                              (dom/li (dom/strong "📢 Channels: ") "Path to customers")
                              (dom/li (dom/strong "💵 Revenue: ") "How you make money")
                              (dom/li (dom/strong "💰 Costs: ") "Fixed & variable costs")
                              (dom/li (dom/strong "📊 Metrics: ") "Key activities to measure")
                              (dom/li (dom/strong "🛡️ Advantage: ") "What can't be copied")))

                    (dom/div :.help-section
                             (dom/h4 "Tips for Success")
                             (dom/ul
                              (dom/li "Start with Problems and Customers")
                              (dom/li "Your canvas should fit on one page")
                              (dom/li "Update it regularly as you learn")
                              (dom/li "Focus on testing assumptions")))

                    (dom/button
                     {:className "btn btn-primary btn-block"
                      :onClick on-start-tutorial}
                     "🎓 Start Tutorial"))))

;; ============================================================================
;; Progress Component
;; ============================================================================

(defn canvas-progress-bar
  "Show completion progress for Lean Canvas with block breakdown"
  [{:keys [completed total notes-by-block]}]
  (let [percentage (if (> total 0) (* 100 (/ completed total)) 0)]
    (dom/div :.builder-progress
             (dom/div :.progress-header
                      (dom/h3 "Canvas Completion")
                      (dom/span :.progress-percentage (str (Math/round percentage) "%")))
             (dom/div :.progress-container
                      (dom/div :.progress-bar
                               (dom/div :.progress-fill {:style {:width (str percentage "%")}})))
             ;; Block breakdown
             (dom/div :.section-status
                      (for [{:keys [key icon title]} lean-canvas-blocks]
                        (let [has-notes? (seq (get notes-by-block key))]
                          (dom/span
                           {:key (name key)
                            :className (str "status-item " (when has-notes? "completed"))
                            :title (str title ": " (if has-notes? "Done" "Not started"))}
                           icon)))))))

;; ============================================================================
;; Main Builder Page
;; ============================================================================

(defsc LeanCanvasBuilderPage
  "Lean Canvas builder with visual business model interface and guided UX"
  [this {:keys [project/id lean-canvas/session lean-canvas/notes ui] :as props}]
  {:query         [:project/id :project/name
                   :lean-canvas/session
                   :lean-canvas/notes
                   {:ui [:ui/show-tutorial :ui/tutorial-step
                          :ui/show-help :ui/show-add-modal :ui/active-block
                          :ui/undo-stack :ui/redo-stack :ui/presenting?
                          :ui/show-wisdom]}
                   [df/marker-table :lean-canvas-builder]]
   :ident         (fn [] [:page/id :lean-canvas-builder])
   :route-segment ["project" :project-id "canvas"]
   :initial-state (fn [_] {:lean-canvas/notes {}
                            :ui {:ui/show-tutorial true
                                 :ui/tutorial-step 1
                                 :ui/show-help false
                                 :ui/show-add-modal false
                                 :ui/active-block nil
                                 :ui/undo-stack []
                                 :ui/redo-stack []
                                 :ui/presenting? false
                                 :ui/show-wisdom false}})
   :pre-merge     (fn [{:keys [current-normalized data-tree]}]
                      (let [default-ui {:ui/show-tutorial true
                                        :ui/tutorial-step 1
                                        :ui/show-help false
                                        :ui/show-add-modal false
                                        :ui/active-block nil
                                        :ui/undo-stack []
                                        :ui/redo-stack []
                                        :ui/presenting? false
                                        :ui/show-wisdom false}
                          existing-ui (:ui current-normalized)
                          ui-val (if (and existing-ui (seq existing-ui))
                                   existing-ui
                                   default-ui)
                          clean-data (dissoc data-tree :ui :lean-canvas/notes)
                          ;; Prefer client notes if non-empty, otherwise use server notes
                          client-notes (:lean-canvas/notes current-normalized)
                          server-notes (:lean-canvas/notes data-tree)]
                      (merge
                       {:ui ui-val
                        :lean-canvas/notes (or (not-empty client-notes) (not-empty server-notes) {})}
                       clean-data)))
   :will-enter    (fn [app {:keys [project-id]}]
                    (let [decoded-id (str/replace (or project-id "") "~" "/")]
                      (dr/route-deferred [:page/id :lean-canvas-builder]
                                         (fn []
                                           (df/load! app [:page/id :lean-canvas-builder] LeanCanvasBuilderPage
                                                     {:marker :lean-canvas-builder
                                                      :params {:project-id decoded-id}
                                                      :post-mutation `dr/target-ready
                                                      :post-mutation-params {:target [:page/id :lean-canvas-builder]}})))))}

  (let [loading? (df/loading? (get props [df/marker-table :lean-canvas-builder]))
        project-id id
        project-name (or (:project/name props) "")
        session-data (or session {})
        notes-map (or notes {})
        {:keys [ui/show-tutorial ui/tutorial-step ui/show-help
                 ui/show-add-modal ui/active-block
                 ui/undo-stack ui/redo-stack ui/presenting?
                 ui/show-wisdom]} (or ui {})
        tutorial-step (or tutorial-step 1)

        ;; Organize notes by block
        notes-by-block (group-by :item/section (vals notes-map))

        ;; Calculate progress
        blocks (map :key lean-canvas-blocks)
        completed-count (count (filter #(seq (get notes-by-block %)) blocks))
        is-complete? (= completed-count (count blocks))]

    (if loading?
      (dom/div :.loading
               (dom/div :.loading-spinner)
               (dom/p "Loading Lean Canvas builder..."))

      (dom/div :.builder-page.lean-canvas-builder

        ;; Present Mode (fullscreen overlay)
        (when presenting?
          (canvas/presentation
           {:title "Lean Canvas"
            :sections (mapv (fn [{:keys [key title icon]}]
                              {:key key :title title :icon icon})
                            lean-canvas-blocks)
            :notes-by-section notes-by-block
            :on-exit #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/presenting? false)})])}))

        ;; Tutorial Modal
        (when show-tutorial
          (tutorial-modal
           {:current-step tutorial-step
            :on-next #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/tutorial-step (inc tutorial-step))})])
            :on-prev #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/tutorial-step (dec tutorial-step))})])
            :on-skip #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-tutorial false)})])
            :on-complete #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-tutorial false)})])}))

        ;; Section Add Modal
        (when (and show-add-modal active-block)
          (section-add-modal
           {:block-key active-block
            :on-add (fn [content]
                      (let [block-config (first (filter #(= (:key %) active-block) lean-canvas-blocks))]
                        (comp/transact! this
                                        [(add-canvas-note
                                          {:session-id (:session/id session-data)
                                           :block-key active-block
                                           :content content
                                           :color (:color block-config)})
                                         (m/set-props {:ui (-> ui
                                                               (assoc :ui/show-add-modal false)
                                                               (assoc :ui/active-block nil))})])))
            :on-cancel #(comp/transact! this [(m/set-props {:ui (-> ui
                                                                    (assoc :ui/show-add-modal false)
                                                                    (assoc :ui/active-block nil))})])}))

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
                          (dom/h1 "📊 Lean Canvas Builder")
                          (dom/p :.builder-subtitle
                                 (str "Business model for: " project-name)))
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
          {:current-step :canvas
           :project-id project-id
           :on-navigate (fn [route]
                          (let [encoded-id (str/replace (str project-id) "/" "~")]
                            (dr/change-route! this ["project" encoded-id route])))})

        ;; Wisdom sidebar (contextual tips)
        (ui/wisdom-sidebar
          {:phase :canvas
           :show? show-wisdom
           :project-id project-id
           :on-close #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-wisdom false)})])})

        ;; Toolbar
        (canvas/toolbar
         {:on-export (fn []
                       (let [json-data (canvas/export-canvas-to-json (vals notes-map))]
                         (canvas/download-json (str "lean-canvas-" project-id ".json") json-data)))
          :on-share (fn [] (js/alert "Share link copied to clipboard!"))
           :on-present (fn [] (comp/transact! this [(m/set-props {:ui (assoc ui :ui/presenting? true)})]))
          :on-clear (fn []
                      (when (js/confirm "Clear all notes? This cannot be undone.")
                        (comp/transact! this [(clear-canvas-notes {})])))
          :on-undo (fn [] (comp/transact! this [(undo-canvas {})]))
          :on-redo (fn [] (comp/transact! this [(redo-canvas {})]))
          :can-undo? (seq undo-stack)
          :can-redo? (seq redo-stack)})

        ;; Progress
        (canvas-progress-bar {:completed completed-count
                              :total (count blocks)
                              :notes-by-block notes-by-block})

        (if is-complete?
          ;; Completion State
          (dom/div :.completion-state
                   (dom/div :.completion-icon "🎉")
                   (dom/h2 "Lean Canvas Complete!")
                   (dom/p "You now have a complete business model. Time to validate your assumptions!")
                   (dom/div :.insights-summary
                            (dom/h4 "Your Business Model:")
                            (dom/div :.canvas-summary
                                     (for [{:keys [key icon title]} lean-canvas-blocks]
                                       (let [block-notes (get notes-by-block key)]
                                         (when (seq block-notes)
                                           (dom/div {:key (name key) :className "summary-item"}
                                                    (dom/strong (str icon " " title ": "))
                                                    (dom/ul
                                                     (for [note block-notes]
                                                       (dom/li {:key (:item/id note)}
                                                               (:item/content note))))))))))
                   (dom/div :.completion-actions
                            (ui/button
                             {:on-click #(dr/change-route! this ["project" (str/replace (str project-id) "/" "~")])
                              :variant :secondary}
                             "Back to Project")
                            (ui/button
                             {:on-click #(let [json-data (canvas/export-canvas-to-json (vals notes-map))]
                                           (canvas/download-json (str "lean-canvas-" project-id ".json") json-data))
                              :variant :primary}
                             "Export Canvas")
                            (ui/button
                             {:on-click #(dr/change-route! this ["project" (str/replace (str project-id) "/" "~") "mvp"])
                              :variant :primary}
                             "Plan MVP >")))

          ;; Visual Canvas
          (let [canvas-sections (mapv (fn [{:keys [key title description]}]
                                        {:section/key key
                                         :section/title title
                                         :section/description description})
                                      lean-canvas-blocks)]
            (dom/div :.canvas-container
                     (canvas/lean-canvas
                      {:sections canvas-sections
                       :items (vals notes-map)
                       :on-item-add (fn [block-key]
                                      (comp/transact! this
                                                      [(m/set-props {:ui (-> ui
                                                                             (assoc :ui/show-add-modal true)
                                                                              (assoc :ui/active-block block-key))})]))
                       :on-item-edit (fn [note-id new-content]
                                       (comp/transact! this
                                         [(update-canvas-note
                                           {:note-id note-id
                                            :updates {:item/content new-content}})]))
                       :on-item-delete (fn [note-id]
                                         (comp/transact! this
                                           [(delete-canvas-note
                                             {:note-id note-id})]))}))))))))

