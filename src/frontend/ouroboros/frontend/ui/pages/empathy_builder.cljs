(ns ouroboros.frontend.ui.pages.empathy-builder
  "Empathy Map builder page with visual canvas interface

   Features:
   - Visual 2x3 grid layout
   - Drag-and-drop sticky notes
   - Real-time collaboration
   - Rich text editing
   - Guided onboarding and tutorials
   - Example content and prompts"
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

(def empathy-sections
  "Configuration for each empathy map section with guiding prompts and examples"
  {:persona
   {:title "Persona"
    :icon "👤"
    :description "Who is your ideal customer?"
    :prompts ["What is their name and role?"
              "What are their demographics (age, location, job)?"
              "What is their background?"]
    :examples ["Sarah, 32, Product Manager at a tech startup"
               "Works remotely, manages a team of 5"
               "Juggles multiple projects, always busy"]
    :placeholder "Describe your target customer..."}

   :think-feel
   {:title "Think & Feel"
    :icon "🧠"
    :description "What's going on inside their head?"
    :prompts ["What are their biggest worries?"
              "What keeps them up at night?"
              "What are their hopes and dreams?"
              "What makes them feel successful?"]
    :examples ["'I never have enough time'"
               "'What if our product fails?'"
               "Wants to be seen as a strategic leader"
               "Fears being replaced by AI"]
    :placeholder "What thoughts run through their mind?"}

   :hear
   {:title "Hear"
    :icon "👂"
    :description "What do they hear from others?"
    :prompts ["What do their colleagues say?"
              "What do influencers/media tell them?"
              "What does their boss expect?"
              "What do friends and family say?"]
    :examples ["Boss: 'We need to move faster'"
               "Industry: 'AI is the future'"
               "Team: 'We're overwhelmed'"
               "Podcast: 'Prioritize ruthlessly'"]
    :placeholder "What messages do they hear?"}

   :see
   {:title "See"
    :icon "👁️"
    :description "What do they see in their environment?"
    :prompts ["What does their workspace look like?"
              "What do they see competitors doing?"
              "What trends do they observe?"
              "What does their social feed show?"]
    :examples ["Slack notifications piling up"
               "Competitors launching new features"
               "LinkedIn: 'How I 10x'd productivity'"
               "Team looking stressed in meetings"]
    :placeholder "What do they observe around them?"}

   :say-do
   {:title "Say & Do"
    :icon "💬"
    :description "What do they say and how do they behave?"
    :prompts ["How do they describe their challenges?"
              "What do they do in public vs private?"
              "How do they spend their time?"
              "What actions have they already taken?"]
    :examples ["Says: 'We're doing great!' (but stressed)"
               "Works late nights and weekends"
               "Tried 5 different tools this year"
               "Attends every productivity webinar"]
    :placeholder "What do they say? How do they act?"}

   :pains-gains
   {:title "Pains & Gains"
    :icon "⚡"
    :description "What frustrates them? What do they want to achieve?"
    :prompts ["What are their biggest frustrations?"
              "What obstacles do they face?"
              "What would make them successful?"
              "What would make their life easier?"]
    :examples ["PAIN: Too many meetings, no deep work time"
               "PAIN: Tools don't integrate well"
               "GAIN: Ship features faster"
               "GAIN: Team works autonomously"]
    :placeholder "List their pains and desired gains..."}})

;; ============================================================================
;; Tutorial Steps
;; ============================================================================

(def tutorial-steps
  "Step-by-step tutorial for using the Empathy Map"
  [{:step 1
    :title "Welcome to Empathy Mapping!"
    :icon "🎯"
    :content "An Empathy Map helps you deeply understand your customer. By filling in 6 sections, you'll gain insights into what they think, feel, see, hear, say, and do."
    :tip "This takes about 15-20 minutes and is the foundation for your product strategy."}
   {:step 2
    :title "Start with your Persona"
    :icon "👤"
    :content "First, define WHO your ideal customer is. Give them a name, age, job title, and key characteristics. This makes your customer feel real and specific."
    :tip "Be specific! 'Sarah, 32, Product Manager' is better than 'busy professionals'."}
   {:step 3
    :title "Explore Their Inner World"
    :icon "🧠"
    :content "The 'Think & Feel' section captures their internal thoughts - fears, hopes, dreams, and worries. What keeps them up at night?"
    :tip "Use quotes like 'I worry that...' to capture their actual thoughts."}
   {:step 4
    :title "Map External Influences"
    :icon "👂"
    :content "'Hear' and 'See' capture external influences. What messages come from their boss, colleagues, media, and environment?"
    :tip "Think about who influences their decisions."}
   {:step 5
    :title "Observe Their Behavior"
    :icon "💬"
    :content "'Say & Do' captures their public behavior. Notice the gap between what they say vs. what they actually do."
    :tip "Actions speak louder than words - what do they actually do?"}
   {:step 6
    :title "Identify Pains & Gains"
    :icon "⚡"
    :content "Finally, list their frustrations (pains) and what success looks like (gains). This directly informs your value proposition."
    :tip "These insights will guide your next step: the Value Proposition Canvas."}])

(def persona-templates
  "Pre-built persona templates users can start from"
  [{:name "Tech Startup Founder"
    :details "Early-stage founder, 28-40, building their first product. Time-strapped, wears many hats, focused on product-market fit."}
   {:name "Enterprise Product Manager"
    :details "Mid-career PM at a Fortune 500. Manages stakeholders, balances roadmaps, wants to innovate but constrained by process."}
   {:name "Small Business Owner"
    :details "Runs a local business, 35-55. Not tech-savvy but knows they need to modernize. Budget-conscious, values simplicity."}
   {:name "Developer/Technical User"
    :details "Software engineer, 25-35. Values efficiency and automation. Skeptical of 'magical' solutions, wants control and transparency."}
   {:name "Custom Persona"
    :details ""}])

;; ============================================================================
;; Note Mutations (with undo/redo history)
;; ============================================================================

(defn- push-undo!
  "Snapshot current notes onto undo stack before a mutation. Clears redo stack."
  [state]
  (let [current-notes (get-in state [:page/id :empathy-builder :empathy/notes] {})
        undo-stack (get-in state [:page/id :empathy-builder :ui :ui/undo-stack] [])]
    (-> state
        (assoc-in [:page/id :empathy-builder :ui :ui/undo-stack]
                  (conj undo-stack current-notes))
        (assoc-in [:page/id :empathy-builder :ui :ui/redo-stack] []))))

(defonce ^:private empathy-sync-timer (atom nil))

(defn- sync-empathy-notes!
  "Send current empathy notes to backend for persistence (debounced 500ms)"
  [state-atom]
  (when-let [t @empathy-sync-timer]
    (js/clearTimeout t))
  (reset! empathy-sync-timer
    (js/setTimeout
      (fn []
        (let [s @state-atom
              project-id (get-in s [:page/id :empathy-builder :project/id])
              session (get-in s [:page/id :empathy-builder :empathy/session])
              session-id (or (:session/id session) (str "empathy-" project-id))
              notes (get-in s [:page/id :empathy-builder :empathy/notes] {})]
          (when project-id
            (ws/save-builder-data! project-id session-id :empathy-map notes))))
      500)))

(m/defmutation add-empathy-note
  "Add a sticky note to an empathy section"
  [{:keys [session-id section-key content]}]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)
                               new-note (canvas/create-sticky-note section-key content)]
                           (update-in s [:page/id :empathy-builder :empathy/notes]
                                      (fnil assoc {}) (:item/id new-note) new-note))))
          (sync-empathy-notes! state)))

(m/defmutation update-empathy-note
  "Update a sticky note"
  [{:keys [note-id updates]}]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)]
                           (update-in s [:page/id :empathy-builder :empathy/notes note-id] merge updates))))
          (sync-empathy-notes! state)))

(m/defmutation delete-empathy-note
  "Delete a sticky note"
  [{:keys [note-id]}]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)]
                           (update-in s [:page/id :empathy-builder :empathy/notes] dissoc note-id))))
          (sync-empathy-notes! state)))

(m/defmutation undo-empathy
  "Undo last notes change"
  [_]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [undo-stack (get-in s [:page/id :empathy-builder :ui :ui/undo-stack] [])
                               redo-stack (get-in s [:page/id :empathy-builder :ui :ui/redo-stack] [])
                               current-notes (get-in s [:page/id :empathy-builder :empathy/notes] {})]
                           (if (seq undo-stack)
                             (-> s
                                 (assoc-in [:page/id :empathy-builder :empathy/notes] (peek undo-stack))
                                 (assoc-in [:page/id :empathy-builder :ui :ui/undo-stack] (pop undo-stack))
                                 (assoc-in [:page/id :empathy-builder :ui :ui/redo-stack] (conj redo-stack current-notes)))
                             s))))))

(m/defmutation redo-empathy
  "Redo last undone notes change"
  [_]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [undo-stack (get-in s [:page/id :empathy-builder :ui :ui/undo-stack] [])
                               redo-stack (get-in s [:page/id :empathy-builder :ui :ui/redo-stack] [])
                               current-notes (get-in s [:page/id :empathy-builder :empathy/notes] {})]
                           (if (seq redo-stack)
                             (-> s
                                 (assoc-in [:page/id :empathy-builder :empathy/notes] (peek redo-stack))
                                 (assoc-in [:page/id :empathy-builder :ui :ui/redo-stack] (pop redo-stack))
                                 (assoc-in [:page/id :empathy-builder :ui :ui/undo-stack] (conj undo-stack current-notes)))
                             s))))))

(m/defmutation clear-empathy-notes
  "Clear all notes with undo support"
  [_]
  (action [{:keys [state]}]
          (swap! state (fn [s]
                         (let [s (push-undo! s)]
                           (assoc-in s [:page/id :empathy-builder :empathy/notes] {}))))
          (sync-empathy-notes! state)))


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
                                           "← Back"))
                                        (if is-last?
                                          (dom/button
                                           {:className "btn btn-primary"
                                            :onClick on-complete}
                                           "Start Building! →")
                                          (dom/button
                                           {:className "btn btn-primary"
                                            :onClick on-next}
                                           "Next →"))))))))

;; ============================================================================
;; Enhanced Persona Modal with Templates
;; ============================================================================

(defn persona-modal
  "Persona modal with managed state, template selection, validation, and skip"
  [{:keys [on-submit on-skip on-attempt-submit persona-name persona-details selected-template
           attempted-submit? on-change-name on-change-details on-select-template]}]
  (let [name-empty? (str/blank? persona-name)
        show-error? (and attempted-submit? name-empty?)]
    (dom/div :.modal-overlay
             (dom/div :.modal-content.persona-modal

                      ;; Header with close button
                      (dom/div :.persona-modal-header
                               (dom/h2 "Who are you building for?")
                               (when on-skip
                                 (dom/button
                                  {:className "btn-modal-close"
                                   :onClick on-skip
                                   :title "Skip for now"}
                                  "\u00D7")))

                      (dom/p :.modal-subtitle "Define your target customer persona. Be specific -- it's the foundation of everything you'll build.")

                      ;; Scrollable body
                      (dom/div :.modal-body

                        ;; Template selector
                        (dom/div :.persona-templates
                                 (dom/h4 "Quick start from a template")
                                 (dom/div :.template-grid
                                          (for [{tname :name tdetails :details} persona-templates]
                                            (let [is-selected? (= selected-template tname)
                                                  is-custom? (= tname "Custom Persona")]
                                              (dom/div
                                               {:key tname
                                                :className (str "template-card"
                                                                (when is-selected? " selected")
                                                                (when is-custom? " custom"))
                                                :onClick #(on-select-template tname tdetails)}
                                               (dom/div :.template-card-icon
                                                        (if is-custom? "+" (subs tname 0 1)))
                                               (dom/span :.template-name tname)
                                               (when (and (not is-custom?) (seq tdetails))
                                                 (dom/span :.template-details tdetails)))))))

                        ;; Form fields
                        (dom/div {:className (str "form-group" (when show-error? " has-error"))}
                                 (dom/label "Persona Name "
                                            (dom/span :.required "*"))
                                 (dom/input
                                  {:type "text"
                                   :value (or persona-name "")
                                   :autoFocus true
                                   :className (when show-error? "input-error")
                                   :placeholder "e.g., Sarah, the Busy Product Manager"
                                   :onChange #(on-change-name (.. % -target -value))})
                                 (when show-error?
                                   (dom/span :.field-error "Give your persona a name to get started")))

                        (dom/div :.form-group
                                 (dom/label "Key Details")
                                 (dom/textarea
                                  {:value (or persona-details "")
                                   :placeholder "Age, role, key characteristics, goals, challenges..."
                                   :rows 4
                                   :onChange #(on-change-details (.. % -target -value))}))

                        ;; Tips
                        (dom/div :.persona-tips
                                 (dom/h4 "Tips for a great persona:")
                                 (dom/ul
                                  (dom/li (dom/strong "Name them") " -- \"Sarah, 32\" beats \"busy professionals\"")
                                  (dom/li (dom/strong "Be specific") " -- one role, one context, one story")
                                  (dom/li (dom/strong "Make it real") " -- base on interviews, not assumptions"))))

                      ;; Actions (pinned at bottom)
                      (dom/div :.modal-actions
                               (when on-skip
                                 (dom/button
                                  {:className "btn btn-link persona-skip-link"
                                   :onClick on-skip}
                                  "Skip for now"))
                               (ui/button
                                {:on-click (fn []
                                             (if name-empty?
                                               (on-attempt-submit)
                                               (on-submit {:persona-name persona-name
                                                           :persona-details persona-details})))
                                 :variant :primary}
                                "Create Persona & Start Mapping"))))))

;; ============================================================================
;; Section Add Modal with Prompts
;; ============================================================================

(defn section-add-modal
  "Modal for adding notes with guided prompts"
  [{:keys [section-key on-add on-cancel]}]
  (let [section-config (get empathy-sections section-key)
        {:keys [title icon prompts examples placeholder]} section-config]
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
                                        (dom/h4 "Examples:")
                                        (dom/div :.example-chips
                                                 (for [example examples]
                                                   (dom/span
                                                    {:key example
                                                     :className "example-chip"
                                                     :onClick #(on-add example)
                                                     :title "Click to add this example"}
                                                    example))))

                               (dom/div :.form-group
                                        (dom/label "Add your insight:")
                                        (dom/textarea
                                         {:id "section-note-input"
                                          :placeholder placeholder
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
                    (dom/h3 "📚 How to use the Empathy Map")
                    (dom/button
                     {:className "btn btn-close"
                      :onClick on-close}
                     "×"))
           (dom/div :.help-content
                    (dom/div :.help-section
                             (dom/h4 "What is an Empathy Map?")
                             (dom/p "An Empathy Map is a collaborative tool used to gain a deeper understanding of your customers. It helps you step into their shoes and see the world from their perspective."))

                    (dom/div :.help-section
                             (dom/h4 "The 6 Sections")
                             (dom/ul
                              (dom/li (dom/strong "👤 Persona: ") "Define who your customer is")
                              (dom/li (dom/strong "🧠 Think & Feel: ") "Their internal thoughts and emotions")
                              (dom/li (dom/strong "👂 Hear: ") "What influences them externally")
                              (dom/li (dom/strong "👁️ See: ") "Their environment and observations")
                              (dom/li (dom/strong "💬 Say & Do: ") "Their public behavior")
                              (dom/li (dom/strong "⚡ Pains & Gains: ") "Frustrations and goals")))

                    (dom/div :.help-section
                             (dom/h4 "Tips for Success")
                             (dom/ul
                              (dom/li "Add at least 3-5 sticky notes per section")
                              (dom/li "Use direct quotes when possible")
                              (dom/li "Base insights on real user research")
                              (dom/li "Look for contradictions (say vs. do)")))

                    (dom/button
                     {:className "btn btn-primary btn-block"
                      :onClick on-start-tutorial}
                     "🎓 Start Tutorial"))))

;; ============================================================================
;; Sub-Components
;; ============================================================================

(defn empathy-progress-bar
  "Show completion progress for empathy map with section breakdown"
  [{:keys [completed total notes-by-section]}]
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
                      (for [[section-key {:keys [icon title]}] empathy-sections]
                        (let [has-notes? (seq (get notes-by-section section-key))]
                          (dom/span
                           {:key (name section-key)
                            :className (str "status-item " (when has-notes? "completed"))
                            :title (str title ": " (if has-notes? "Done" "Not started"))}
                           icon)))))))

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
  "Empathy Map builder with visual canvas interface and guided UX"
  [this {:keys [project/id empathy/session empathy/notes ui] :as props}]
   {:query         [:project/id :project/name
                    :empathy/session
                    :empathy/notes
                    {:ui [:ui/persona-name :ui/persona-details :ui/selected-template
                          :ui/attempted-submit
                          :ui/show-persona-modal :ui/show-tutorial :ui/tutorial-step
                          :ui/show-help :ui/show-section-modal :ui/active-section
                          :ui/undo-stack :ui/redo-stack :ui/presenting?
                          :ui/show-wisdom]}
                    [df/marker-table :empathy-builder]]
    :ident         (fn [] [:page/id :empathy-builder])
    :route-segment ["project" :project-id "empathy"]
    :initial-state (fn [_] {:empathy/notes {}
                             :ui {:ui/persona-name ""
                                  :ui/persona-details ""
                                  :ui/selected-template nil
                                  :ui/attempted-submit false
                                  :ui/show-persona-modal false
                                   :ui/show-tutorial false
                                   :ui/tutorial-step 1
                                   :ui/show-help false
                                   :ui/show-section-modal false
                                   :ui/active-section nil
                                   :ui/undo-stack []
                                   :ui/redo-stack []
                                   :ui/presenting? false
                                   :ui/show-wisdom false}})
   :pre-merge     (fn [{:keys [current-normalized data-tree]}]
                     ;; Preserve client-only UI state during server loads
                     ;; Remove empty/nil :ui from server data so it doesn't overwrite client state
                      (let [default-ui {:ui/persona-name ""
                                        :ui/persona-details ""
                                        :ui/selected-template nil
                                        :ui/attempted-submit false
                                        :ui/show-persona-modal false
                                        :ui/show-tutorial false
                                        :ui/tutorial-step 1
                                        :ui/show-help false
                                        :ui/show-section-modal false
                                        :ui/active-section nil
                                        :ui/undo-stack []
                                        :ui/redo-stack []
                                        :ui/presenting? false
                                        :ui/show-wisdom false}
                          ;; Use existing client UI if it has real keys, otherwise use defaults
                          existing-ui (:ui current-normalized)
                          ui-val (if (and existing-ui (seq existing-ui))
                                   existing-ui
                                   default-ui)
                          ;; Strip server-side keys that would overwrite client state
                          clean-data (dissoc data-tree :ui :empathy/notes :completed-responses)
                          ;; Prefer client notes if non-empty, otherwise use server notes
                          client-notes (:empathy/notes current-normalized)
                          server-notes (:empathy/notes data-tree)]
                      (merge
                       {:ui ui-val
                        :empathy/notes (or (not-empty client-notes) (not-empty server-notes) {})}
                       clean-data)))
   :will-enter    (fn [app {:keys [project-id]}]
                    (let [decoded-id (str/replace (or project-id "") "~" "/")]
                      (dr/route-deferred [:page/id :empathy-builder]
                                         (fn []
                                           (df/load! app [:page/id :empathy-builder] EmpathyBuilderPage
                                                     {:marker :empathy-builder
                                                      :params {:project-id decoded-id}
                                                      :post-mutation `dr/target-ready
                                                      :post-mutation-params {:target [:page/id :empathy-builder]}})))))}

  (let [loading? (df/loading? (get props [df/marker-table :empathy-builder]))
        session-data (or session {})
        project-id id
        project-name (or (:project/name props) "")
        notes-map (or notes {})
        {:keys [ui/persona-name ui/persona-details ui/selected-template
                ui/attempted-submit
                ui/show-persona-modal ui/show-tutorial ui/tutorial-step
                ui/show-help ui/show-section-modal ui/active-section
                ui/undo-stack ui/redo-stack ui/presenting? ui/show-wisdom]} (or ui {})
        ;; Ensure form values are never nil
        persona-name (or persona-name "")
        persona-details (or persona-details "")
        tutorial-step (or tutorial-step 1)

        ;; Organize notes by section
        notes-by-section (group-by :item/section (vals notes-map))

        ;; Calculate progress
        sections [:persona :think-feel :hear :see :say-do :pains-gains]
        completed-count (count (filter #(seq (get notes-by-section %)) sections))
        is-complete? (= completed-count (count sections))
        
        ;; Check if persona is defined (has notes in persona section)
        has-persona? (seq (get notes-by-section :persona))]

    (if loading?
      (dom/div :.loading
               (dom/div :.loading-spinner)
               (dom/p "Loading empathy builder..."))

      (dom/div :.builder-page.empathy-builder

        ;; Present Mode (fullscreen overlay)
        (when presenting?
          (canvas/presentation
           {:title "Empathy Map"
            :sections (mapv (fn [[k v]] {:key k :title (:title v) :icon (:icon v)})
                            empathy-sections)
            :notes-by-section notes-by-section
            :on-exit #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/presenting? false)})])}))

        ;; Tutorial Modal (shown on first visit)
        (when show-tutorial
          (tutorial-modal
           {:current-step tutorial-step
            :on-next #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/tutorial-step (inc tutorial-step))})])
            :on-prev #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/tutorial-step (dec tutorial-step))})])
            :on-skip #(comp/transact! this [(m/set-props {:ui (-> ui
                                                                  (assoc :ui/show-tutorial false)
                                                                  (assoc :ui/show-persona-modal true))})])
            :on-complete #(comp/transact! this [(m/set-props {:ui (-> ui
                                                                      (assoc :ui/show-tutorial false)
                                                                      (assoc :ui/show-persona-modal true))})])}))

        ;; Persona Modal (after tutorial or if no persona defined)
        (when (and show-persona-modal (not has-persona?))
          (persona-modal
           {:persona-name persona-name
            :persona-details persona-details
            :selected-template selected-template
            :attempted-submit? attempted-submit
            :on-change-name (fn [v]
                              (comp/transact! this
                                [(m/set-props {:ui (assoc ui
                                                          :ui/persona-name v
                                                          :ui/attempted-submit false)})]))
            :on-change-details (fn [v]
                                 (comp/transact! this
                                   [(m/set-props {:ui (assoc ui :ui/persona-details v)})]))
            :on-select-template (fn [tname tdetails]
                                  (if (= tname "Custom Persona")
                                    (comp/transact! this
                                      [(m/set-props {:ui (assoc ui
                                                                :ui/selected-template tname
                                                                :ui/persona-name ""
                                                                :ui/persona-details "")})])
                                    (comp/transact! this
                                      [(m/set-props {:ui (assoc ui
                                                                :ui/selected-template tname
                                                                :ui/persona-name tname
                                                                :ui/persona-details tdetails)})])))
            :on-attempt-submit (fn []
                                 (comp/transact! this
                                   [(m/set-props {:ui (assoc ui :ui/attempted-submit true)})]))
            :on-submit (fn [{:keys [persona-name persona-details]}]
                         (let [content (str persona-name 
                                            (when (seq persona-details)
                                              (str " - " persona-details)))]
                           (comp/transact! this
                                           [(add-empathy-note
                                             {:session-id (:session/id session-data)
                                              :section-key :persona
                                              :content content})
                                            (m/set-props {:ui (assoc ui
                                                                     :ui/show-persona-modal false
                                                                     :ui/persona-name ""
                                                                     :ui/persona-details ""
                                                                     :ui/selected-template nil
                                                                     :ui/attempted-submit false)})])))
            :on-skip (fn []
                       (comp/transact! this
                                       [(m/set-props {:ui (assoc ui
                                                                  :ui/show-persona-modal false
                                                                  :ui/persona-name ""
                                                                  :ui/persona-details ""
                                                                  :ui/selected-template nil
                                                                  :ui/attempted-submit false)})]))}))

        ;; Section Add Modal (when adding notes with guidance)
        (when (and show-section-modal active-section)
          (section-add-modal
           {:section-key active-section
            :on-add (fn [content]
                      (comp/transact! this
                                      [(add-empathy-note
                                        {:session-id (:session/id session-data)
                                         :section-key active-section
                                         :content content})
                                       (m/set-props {:ui (-> ui
                                                             (assoc :ui/show-section-modal false)
                                                             (assoc :ui/active-section nil))})]))
            :on-cancel #(comp/transact! this [(m/set-props {:ui (-> ui
                                                                    (assoc :ui/show-section-modal false)
                                                                    (assoc :ui/active-section nil))})])}))

        ;; Help Panel (slide-out)
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
                          (dom/h1 "🧠 Empathy Map Builder")
                          (dom/p :.builder-subtitle
                                 (str "Understanding your customer for: " project-name)))
                 (dom/div :.header-actions
                   ;; Wisdom toggle
                   (dom/button
                    {:className (str "btn-wisdom " (when show-wisdom "active"))
                     :onClick #(comp/transact! this [(m/set-props {:ui (update ui :ui/show-wisdom not)})])}
                    "💡 Wisdom")
                   ;; Help button
                   (dom/button
                    {:className "btn btn-help"
                     :onClick #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-help true)})])
                     :title "How to use this tool"}
                    "❓ Help")))

        ;; Flywheel progress indicator
        (ui/flywheel-indicator
          {:current-step :empathy
           :project-id project-id
           :on-navigate (fn [route]
                          (let [encoded-id (str/replace (str project-id) "/" "~")]
                            (dr/change-route! this ["project" encoded-id route])))})

        ;; Wisdom sidebar (contextual tips)
        (ui/wisdom-sidebar
          {:phase :empathy
           :show? show-wisdom
           :project-id project-id
           :on-close #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-wisdom false)})])})

        ;; Toolbar
        (canvas/toolbar
         {:on-export (fn []
                       (let [json-data (canvas/export-canvas-to-json (vals notes-map))]
                         (canvas/download-json (str "empathy-map-" project-id ".json") json-data)))
          :on-share (fn [] (js/alert "Share link copied to clipboard!"))
           :on-present (fn [] (comp/transact! this [(m/set-props {:ui (assoc ui :ui/presenting? true)})]))
          :on-clear (fn []
                      (when (js/confirm "Clear all notes? This cannot be undone.")
                        (comp/transact! this [(clear-empathy-notes {})])))
          :on-undo (fn [] (comp/transact! this [(undo-empathy {})]))
          :on-redo (fn [] (comp/transact! this [(redo-empathy {})]))
          :can-undo? (seq undo-stack)
          :can-redo? (seq redo-stack)})

        ;; Progress
        (empathy-progress-bar {:completed completed-count
                               :total (count sections)
                               :notes-by-section notes-by-section})

        (if is-complete?
          ;; Completion State
          (dom/div :.completion-state
                   (dom/div :.completion-icon "🎉")
                   (dom/h2 "Empathy Map Complete!")
                   (dom/p "You now deeply understand your customer. The insights you've gathered will inform your Value Proposition.")
                   (dom/div :.insights-summary
                            (dom/h4 "Key Insights:")
                            (dom/ul
                             (for [[section-key notes] notes-by-section]
                               (when (seq notes)
                                 (dom/li {:key (name section-key)}
                                         (dom/strong (str (:icon (get empathy-sections section-key)) " "))
                                         (:item/content (first notes)))))))
                   (dom/div :.completion-actions
                            (ui/button
                             {:on-click #(dr/change-route! this ["project" (str/replace (str project-id) "/" "~")])
                              :variant :secondary}
                             "Back to Project")
                            (ui/button
                             {:on-click #(dr/change-route! this ["project" (str/replace (str project-id) "/" "~") "valueprop"])
                              :variant :primary}
                             "Continue to Value Proposition →")))

          ;; Visual Canvas
          (let [init-data (canvas/initialize-empathy-map)]
            (dom/div :.canvas-container
              (canvas/empathy-map
                {:sections (:canvas/sections init-data)
                 :items (vals notes-map)
                 :on-item-add (fn [section-key]
                                 (comp/transact! this
                                   [(m/set-props {:ui (-> ui
                                                          (assoc :ui/show-section-modal true)
                                                          (assoc :ui/active-section section-key))})]))
                 :on-item-edit (fn [note-id new-content]
                                 (comp/transact! this
                                   [(update-empathy-note
                                     {:note-id note-id
                                      :updates {:item/content new-content}})]))
                 :on-item-delete (fn [note-id]
                                   (comp/transact! this
                                     [(delete-empathy-note
                                       {:note-id note-id})]))}))))))))



