(ns ouroboros.frontend.ui.pages.mvp-builder
  "MVP Planning builder page with visual canvas interface

   Features:
   - Visual structured grid canvas layout
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

(def mvp-sections
  "Configuration for each MVP Planning section"
  [{:key :core-problem
    :title "Core Problem"
    :icon "🎯"
    :prompt "What is THE single most important problem to solve?"
    :hint "Focus on one problem, not many. What's the #1 pain point?"
    :description "Define the single most critical problem your MVP must solve."
    :prompts ["What's the most painful problem from your empathy map?"
              "What problem, if unsolved, makes everything else pointless?"
              "What do users complain about most?"
              "What would make users switch from current solutions?"]
    :examples ["Users waste 5+ hours/week on manual data entry"
               "Teams can't see real-time project status"
               "No easy way to collaborate across time zones"
               "Current tools require too much training"]}

   {:key :target-user
    :title "Target User"
    :icon "👤"
    :prompt "Who is your FIRST target user?"
    :hint "Be specific - one persona, not everyone"
    :description "Define the specific user segment your MVP will serve first."
    :prompts ["Who has this problem most severely?"
              "Who would pay immediately to solve it?"
              "Who can you reach easily?"
              "Who would give you feedback quickly?"]
    :examples ["Product managers at Series A startups (20-50 employees)"
               "Freelance designers managing 5+ clients"
               "Remote team leads with 5-10 direct reports"
               "Small business owners with no IT support"]}

   {:key :success-metric
    :title "Success Metric"
    :icon "📊"
    :prompt "How will you measure if the MVP is successful?"
    :hint "Pick ONE primary metric that indicates product-market fit"
    :description "Define the key metric that proves your MVP works."
    :prompts ["What behavior indicates users find value?"
              "What would prove product-market fit?"
              "What metric shows users are 'activated'?"
              "What's the leading indicator of retention?"]
    :examples ["70% of users complete core workflow in week 1"
               "NPS score > 40 from first 100 users"
               "50% weekly active user retention"
               "Users invite 2+ teammates within 30 days"]}

   {:key :must-have-features
    :title "Must-Have Features"
    :icon "✅"
    :prompt "What features are ESSENTIAL for the MVP?"
    :hint "Only include features without which the product doesn't work"
    :description "List the absolute minimum features needed. Be ruthless."
    :prompts ["What's needed to solve the core problem?"
              "What would make the product unusable if missing?"
              "What's the smallest set that delivers value?"
              "What can you build in 2-4 weeks?"]
    :examples ["User authentication & onboarding"
               "Core dashboard with key metrics"
               "Basic project/task creation"
               "Email notifications for updates"]}

   {:key :nice-to-have
    :title "Nice-to-Have (V2)"
    :icon "💭"
    :prompt "What features can wait until after MVP?"
    :hint "These are important but not essential for first launch"
    :description "Park these ideas for later - they're valuable but not MVP."
    :prompts ["What would enhance but isn't critical?"
              "What do competitors have that you can skip?"
              "What would 'power users' want?"
              "What integrations can wait?"]
    :examples ["Advanced reporting & analytics"
               "Third-party integrations (Slack, Jira)"
               "Mobile app (web first)"
               "Custom branding & white-labeling"]}

   {:key :out-of-scope
    :title "Out of Scope"
    :icon "🚫"
    :prompt "What are you explicitly NOT building?"
    :hint "Being clear about what's out helps focus the team"
    :description "Define what's explicitly out of scope for MVP."
    :prompts ["What features are distracting?"
              "What edge cases can you ignore?"
              "What user segments won't you serve?"
              "What would bloat the product?"]
    :examples ["Enterprise SSO & compliance (for now)"
               "Offline mode support"
               "Multi-language support"
               "Custom workflow automation"]}

   {:key :timeline
    :title "Timeline"
    :icon "📅"
    :prompt "What's your timeline to launch?"
    :hint "Shorter is usually better - aim for 2-6 weeks"
    :description "Set a deadline to force prioritization decisions."
    :prompts ["When do you want first users?"
              "What's the shortest realistic timeline?"
              "What milestones mark progress?"
              "When will you know if it's working?"]
    :examples ["Week 1-2: Core feature development"
               "Week 3: Internal testing & fixes"
               "Week 4: Beta launch with 10 users"
               "Week 6: Iterate based on feedback"]}

   {:key :risks
    :title "Risks & Assumptions"
    :icon "⚠️"
    :prompt "What are the biggest risks and assumptions?"
    :hint "Be honest - what could make this fail?"
    :description "Identify what could go wrong and assumptions to validate."
    :prompts ["What must be true for this to work?"
              "What's the biggest unknown?"
              "What technical risks exist?"
              "What market risks exist?"]
    :examples ["ASSUMPTION: Users will pay $X/month"
               "RISK: Competitors may copy quickly"
               "ASSUMPTION: Users will adopt new workflow"
               "RISK: Technical complexity underestimated"]}])

;; ============================================================================
;; Tutorial Steps
;; ============================================================================

(def tutorial-steps
  "Step-by-step tutorial for MVP Planning"
  [{:step 1
    :title "Welcome to MVP Planning!"
    :icon "🚀"
    :content "MVP (Minimum Viable Product) planning helps you build the smallest possible product that validates your idea. Less is more!"
    :tip "The goal is to learn fast, not build big. What's the minimum you need to test your hypothesis?"}
   {:step 2
    :title "Start with ONE Problem"
    :icon "🎯"
    :content "The biggest MVP mistake is trying to solve too many problems. Pick THE one problem that, if solved, makes your product valuable."
    :tip "Reference your Value Proposition - what's the #1 pain you relieve?"}
   {:step 3
    :title "Define Your First User"
    :icon "👤"
    :content "Your MVP isn't for everyone. Define the specific person who will be your first user. Be narrow to start, expand later."
    :tip "Think: Who would pay today if this existed? Start there."}
   {:step 4
    :title "Set a Success Metric"
    :icon "📊"
    :content "How will you know if your MVP works? Define ONE primary metric that indicates users find value."
    :tip "Good metrics: Retention, NPS, completion rate. Bad metrics: Downloads, signups (vanity)."}
   {:step 5
    :title "Ruthlessly Prioritize Features"
    :icon "✅"
    :content "List features in three buckets: Must-Have (MVP), Nice-to-Have (V2), and Out of Scope. Be ruthless about Must-Have."
    :tip "For each 'must-have', ask: Would the product work without this? If yes, move it."}
   {:step 6
    :title "Set a Deadline"
    :icon "📅"
    :content "MVPs should launch in weeks, not months. Set an aggressive but realistic timeline. Deadlines force prioritization."
    :tip "Aim for 2-6 weeks. If it takes longer, your scope is too big."}])

;; ============================================================================
;; Note Mutations (with undo/redo history)
;; ============================================================================

(defn- push-undo!
  "Snapshot current notes onto undo stack before a mutation. Clears redo stack."
  [state]
  (let [current-notes (get-in state [:page/id :mvp-builder :mvp/notes] {})
        undo-stack (get-in state [:page/id :mvp-builder :ui :ui/undo-stack] [])]
    (-> state
        (assoc-in [:page/id :mvp-builder :ui :ui/undo-stack]
                  (conj undo-stack current-notes))
        (assoc-in [:page/id :mvp-builder :ui :ui/redo-stack] []))))

(defonce ^:private mvp-sync-timer (atom nil))

(defn- sync-mvp-notes!
  "Send current MVP notes to backend for persistence (debounced 500ms)"
  [state-atom]
  (when-let [t @mvp-sync-timer]
    (js/clearTimeout t))
  (reset! mvp-sync-timer
    (js/setTimeout
      (fn []
        (let [s @state-atom
              project-id (get-in s [:page/id :mvp-builder :project/id])
              session-id (str "mvp-" project-id)
              notes (get-in s [:page/id :mvp-builder :mvp/notes] {})]
          (when project-id
            (ws/save-builder-data! project-id session-id :mvp-planning notes))))
      500)))

(m/defmutation add-mvp-note
  "Add a sticky note to an MVP section"
  [{:keys [section-key content]}]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)
                               new-note (canvas/create-sticky-note section-key content)]
                           (update-in s [:page/id :mvp-builder :mvp/notes]
                                      (fnil assoc {}) (:item/id new-note) new-note))))
          (sync-mvp-notes! state)))

(m/defmutation update-mvp-note
  "Update a sticky note"
  [{:keys [note-id updates]}]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)]
                           (update-in s [:page/id :mvp-builder :mvp/notes note-id] merge updates))))
          (sync-mvp-notes! state)))

(m/defmutation delete-mvp-note
  "Delete a sticky note"
  [{:keys [note-id]}]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)]
                           (update-in s [:page/id :mvp-builder :mvp/notes] dissoc note-id))))
          (sync-mvp-notes! state)))

(m/defmutation undo-mvp
  "Undo last notes change"
  [_]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [undo-stack (get-in s [:page/id :mvp-builder :ui :ui/undo-stack] [])
                               redo-stack (get-in s [:page/id :mvp-builder :ui :ui/redo-stack] [])
                               current-notes (get-in s [:page/id :mvp-builder :mvp/notes] {})]
                           (if (seq undo-stack)
                             (-> s
                                 (assoc-in [:page/id :mvp-builder :mvp/notes] (peek undo-stack))
                                 (assoc-in [:page/id :mvp-builder :ui :ui/undo-stack] (pop undo-stack))
                                 (assoc-in [:page/id :mvp-builder :ui :ui/redo-stack] (conj redo-stack current-notes)))
                             s))))))

(m/defmutation redo-mvp
  "Redo last undone notes change"
  [_]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [undo-stack (get-in s [:page/id :mvp-builder :ui :ui/undo-stack] [])
                               redo-stack (get-in s [:page/id :mvp-builder :ui :ui/redo-stack] [])
                               current-notes (get-in s [:page/id :mvp-builder :mvp/notes] {})]
                           (if (seq redo-stack)
                             (-> s
                                 (assoc-in [:page/id :mvp-builder :mvp/notes] (peek redo-stack))
                                 (assoc-in [:page/id :mvp-builder :ui :ui/redo-stack] (pop redo-stack))
                                 (assoc-in [:page/id :mvp-builder :ui :ui/undo-stack] (conj undo-stack current-notes)))
                             s))))))

(m/defmutation clear-mvp-notes
  "Clear all notes with undo support"
  [_]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)]
                           (assoc-in s [:page/id :mvp-builder :mvp/notes] {}))))
          (sync-mvp-notes! state)))

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
                                           "Start Planning! >")
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
  (let [section-config (first (filter #(= (:key %) section-key) mvp-sections))
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
                    (dom/h3 "📚 MVP Planning Help")
                    (dom/button
                     {:className "btn btn-close"
                      :onClick on-close}
                     "x"))
           (dom/div :.help-content
                    (dom/div :.help-section
                             (dom/h4 "What is an MVP?")
                             (dom/p "A Minimum Viable Product is the smallest version of your product that delivers value and lets you learn from real users. It's not a crappy product - it's a focused product."))

                    (dom/div :.help-section
                             (dom/h4 "The 8 Sections")
                             (dom/ul
                              (dom/li (dom/strong "🎯 Core Problem: ") "The ONE problem to solve")
                              (dom/li (dom/strong "👤 Target User: ") "Your first specific customer")
                              (dom/li (dom/strong "📊 Success Metric: ") "How you'll measure success")
                              (dom/li (dom/strong "✅ Must-Have: ") "Essential features only")
                              (dom/li (dom/strong "💭 Nice-to-Have: ") "Features for V2")
                              (dom/li (dom/strong "🚫 Out of Scope: ") "What you won't build")
                              (dom/li (dom/strong "📅 Timeline: ") "Your launch deadline")
                              (dom/li (dom/strong "⚠️ Risks: ") "Assumptions to validate")))

                    (dom/div :.help-section
                             (dom/h4 "MVP Principles")
                             (dom/ul
                              (dom/li "Build the smallest thing that tests your hypothesis")
                              (dom/li "Focus on learning, not features")
                              (dom/li "Launch in weeks, not months")
                              (dom/li "Perfect is the enemy of done")))

                    (dom/button
                     {:className "btn btn-primary btn-block"
                      :onClick on-start-tutorial}
                     "🎓 Start Tutorial"))))

;; ============================================================================
;; Progress Component
;; ============================================================================

(defn mvp-progress [{:keys [completed total sections notes-by-section]}]
  (let [percentage (if (> total 0) (* 100 (/ completed total)) 0)]
    (dom/div :.builder-progress
             (dom/div :.progress-header
                      (dom/h3 "Planning Progress")
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

(defsc MVPBuilderPage
  "MVP Planning builder page with visual canvas interface"
  [this {:keys [project/id mvp/notes ui] :as props}]
  {:query         [:project/id :project/name
                   :mvp/notes
                   {:ui [:ui/show-tutorial :ui/tutorial-step
                         :ui/show-help :ui/show-section-modal
                         :ui/active-section
                         :ui/undo-stack :ui/redo-stack :ui/presenting?
                         :ui/show-wisdom]}
                   [df/marker-table :mvp-builder]]
   :ident         (fn [] [:page/id :mvp-builder])
   :route-segment ["project" :project-id "mvp"]
   :initial-state (fn [_] {:mvp/notes {}
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
                          clean-data (dissoc data-tree :ui :mvp/notes :completed-responses)
                          ;; Prefer client notes if non-empty, otherwise use server notes
                          client-notes (:mvp/notes current-normalized)
                          server-notes (:mvp/notes data-tree)]
                      (merge
                       {:ui ui-val
                        :mvp/notes (or (not-empty client-notes) (not-empty server-notes) {})}
                       clean-data)))
   :will-enter    (fn [app {:keys [project-id]}]
                    (let [decoded-id (str/replace (or project-id "") "~" "/")]
                      (dr/route-deferred [:page/id :mvp-builder]
                        (fn []
                          (df/load! app [:page/id :mvp-builder] MVPBuilderPage
                            {:marker :mvp-builder
                             :params {:project-id decoded-id}
                             :post-mutation `dr/target-ready
                             :post-mutation-params {:target [:page/id :mvp-builder]}})))))}

  (let [loading? (df/loading? (get props [df/marker-table :mvp-builder]))
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
        section-keys [:core-problem :target-user :success-metric :must-have-features
                      :nice-to-have :out-of-scope :timeline :risks]
        completed-count (count (filter #(seq (get notes-by-section %)) section-keys))
        total-sections (count section-keys)
        is-complete? (= completed-count total-sections)]

    (if loading?
      (dom/div :.loading
               (dom/div :.loading-spinner)
               (dom/p "Loading MVP planner..."))

      (dom/div :.builder-page.mvp-builder

        ;; Present Mode (fullscreen overlay)
        (when presenting?
          (canvas/presentation
           {:title "MVP Planning Canvas"
            :sections (mapv (fn [{:keys [key title icon]}]
                              {:key key :title title :icon icon})
                            mvp-sections)
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
                                      [(add-mvp-note
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
                          (dom/h1 "🚀 MVP Planning Builder")
                          (dom/p :.builder-subtitle (str "Planning MVP for: " project-name)))
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
          {:current-step :mvp
           :project-id project-id
           :on-navigate (fn [route]
                          (let [encoded-id (str/replace (str project-id) "/" "~")]
                            (dr/change-route! this ["project" encoded-id route])))})

        ;; Wisdom sidebar (contextual tips)
        (ui/wisdom-sidebar
          {:phase :mvp
           :show? show-wisdom
           :project-id project-id
           :on-close #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-wisdom false)})])})

        ;; Toolbar
        (canvas/toolbar
         {:on-export (fn []
                       (let [json-data (canvas/export-canvas-to-json (vals notes-map))]
                         (canvas/download-json (str "mvp-plan-" project-id ".json") json-data)))
          :on-share (fn [] (js/alert "Share link copied to clipboard!"))
          :on-present (fn [] (comp/transact! this [(m/set-props {:ui (assoc ui :ui/presenting? true)})]))
          :on-clear (fn []
                      (when (js/confirm "Clear all notes? This cannot be undone.")
                        (comp/transact! this [(clear-mvp-notes {})])))
          :on-undo (fn [] (comp/transact! this [(undo-mvp {})]))
          :on-redo (fn [] (comp/transact! this [(redo-mvp {})]))
          :can-undo? (seq undo-stack)
          :can-redo? (seq redo-stack)})

        ;; Progress
        (mvp-progress {:completed completed-count
                       :total total-sections
                       :sections mvp-sections
                       :notes-by-section notes-by-section})

        ;; Completion banner (inline, above canvas)
        (when is-complete?
          (dom/div :.completion-banner
                   (dom/div :.completion-banner-content
                            (dom/span :.completion-banner-icon "🎉")
                            (dom/span :.completion-banner-text "MVP Plan Complete! Ready for the next step.")
                            (ui/button
                             {:on-click #(dr/change-route! this ["project" (str/replace (str project-id) "/" "~") "canvas"])
                              :variant :primary
                              :className "completion-banner-btn"}
                             "Continue to Lean Canvas →"))))

        ;; Visual Canvas (always shown)
        (let [init-data (canvas/initialize-mvp)]
          (dom/div :.canvas-container
            (canvas/mvp-canvas
              {:sections (:canvas/sections init-data)
               :items (vals notes-map)
               :on-item-add (fn [section-key]
                               (comp/transact! this
                                 [(m/set-props {:ui (-> ui
                                                        (assoc :ui/show-section-modal true)
                                                        (assoc :ui/active-section section-key))})]))
               :on-item-edit (fn [note-id new-content]
                                (comp/transact! this
                                  [(update-mvp-note
                                    {:note-id note-id
                                     :updates {:item/content new-content}})]))
               :on-item-delete (fn [note-id]
                                  (comp/transact! this
                                    [(delete-mvp-note
                                      {:note-id note-id})]))})))))))
