(ns ouroboros.frontend.ui.onboarding
  "Onboarding tours and guided experiences

   Provides:
   - Step-by-step guided tours
   - Contextual tooltips
   - Progress tracking
   - Skip/resume functionality"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
;; Tour Definitions
;; ============================================================================

(def tours
  {:empathy-map
   {:id :empathy-map
    :name "Empathy Map Tour"
    :steps
    [{:id :welcome
      :title "Welcome to Empathy Mapping"
      :content "Let's understand your customer deeply. This tour will guide you through each section."
      :target nil
      :position :center}
     {:id :persona
      :title "Step 1: Define Your Persona"
      :content "Start by creating a specific persona. Give them a name, age, and role."
      :target ".empathy-section-persona"
      :position :bottom}
     {:id :think-feel
      :title "Step 2: Think & Feel"
      :content "What goes on inside their head? Their hopes, fears, dreams?"
      :target ".empathy-section-think-feel"
      :position :right}
     {:id :pains-gains
      :title "Step 3: Pains & Gains"
      :content "Identify their frustrations and what they hope to achieve."
      :target ".empathy-section-pains-gains"
      :position :left}
     {:id :complete
      :title "You're Ready!"
      :content "Complete all sections to build a deep understanding of your customer."
      :target nil
      :position :center}]}

   :lean-canvas
   {:id :lean-canvas
    :name "Lean Canvas Tour"
    :steps
    [{:id :welcome
      :title "Build Your Business Model"
      :content "The Lean Canvas helps you define your business model in one page."
      :target nil
      :position :center}
     {:id :problems
      :title "Start with Problems"
      :content "List the top 3 problems your customers face."
      :target ".canvas-problems"
      :position :right}
     {:id :uvp
      :title "Define Your UVP"
      :content "Your Unique Value Proposition - why you're different and worth buying."
      :target ".canvas-uvp"
      :position :bottom}
     {:id :revenue
      :title "How Will You Make Money?"
      :content "Define your revenue streams and pricing model."
      :target ".canvas-revenue-streams"
      :position :top}
     {:id :complete
      :title "Validate Your Model"
      :content "With a complete canvas, you're ready to validate with real customers."
      :target nil
      :position :center}]}

   :collaboration
   {:id :collaboration
    :name "Collaboration Features"
    :steps
    [{:id :presence
      :title "See Who's Online"
      :content "The sidebar shows all active collaborators."
      :target ".collaboration-sidebar"
      :position :left}
     {:id :cursors
      :title "Real-time Cursors"
      :content "See where others are working in real-time."
      :target ".canvas-container"
      :position :center}
     {:id :comments
      :title "Leave Comments"
      :content "Click any sticky note to add a comment or question."
      :target ".sticky-note"
      :position :bottom}
     {:id :versions
      :title "Save Versions"
      :content "Create snapshots to track progress and rollback if needed."
      :target ".version-history"
      :position :left}]}})

;; ============================================================================
;; Tour State Management
;; ============================================================================

(m/defmutation start-tour
  "Start a tour"
  [{:keys [tour-id]}]
  (action [{:keys [state]}]
          (swap! state assoc-in [:onboarding :active-tour] tour-id)
          (swap! state assoc-in [:onboarding :current-step] 0)
          (swap! state assoc-in [:onboarding :tour-completed?] false)))

(m/defmutation next-step
  "Move to next tour step"
  [_]
  (action [{:keys [state]}]
          (swap! state update-in [:onboarding :current-step] inc)))

(m/defmutation prev-step
  "Move to previous tour step"
  [_]
  (action [{:keys [state]}]
          (swap! state update-in [:onboarding :current-step] dec)))

(m/defmutation skip-tour
  "Skip the current tour"
  [_]
  (action [{:keys [state]}]
          (swap! state assoc-in [:onboarding :active-tour] nil)
          (swap! state assoc-in [:onboarding :current-step] 0)))

(m/defmutation complete-tour
  "Mark tour as completed"
  [{:keys [tour-id]}]
  (action [{:keys [state]}]
          (swap! state assoc-in [:onboarding :completed-tours tour-id] true)
          (swap! state assoc-in [:onboarding :active-tour] nil)
          (swap! state assoc-in [:onboarding :current-step] 0)
          (swap! state assoc-in [:onboarding :tour-completed?] true)))

(m/defmutation mark-tooltip-seen
  "Mark a contextual tooltip as seen"
  [{:keys [tooltip-id]}]
  (action [{:keys [state]}]
          (swap! state assoc-in [:onboarding :seen-tooltips tooltip-id] true)))

;; ============================================================================
;; Tour Components
;; ============================================================================

(defsc TourTooltip
  "Individual tour tooltip/step"
  [this {:keys [step current-step total-steps on-next on-prev on-skip on-complete]}]
  (let [{:keys [title content position target]} step
        is-first? (= current-step 0)
        is-last? (= current-step (dec total-steps))]
    (dom/div
     {:className (str "tour-tooltip tour-position-" (name position))
      :style (when target
                ;; Position calculation would go here based on target element
               {})}
      ;; Arrow
     (dom/div :.tour-arrow
              {:className (str "arrow-" (name position))})

      ;; Content
     (dom/div :.tour-content
              (dom/h3 title)
              (dom/p content))

      ;; Progress dots
     (dom/div :.tour-progress
              (map (fn [idx]
                     (dom/span
                      {:key idx
                       :className (str "tour-dot " (when (= idx current-step) "active"))}))
                   (range total-steps)))

      ;; Actions
     (dom/div :.tour-actions
              (when-not is-first?
                (ui/button
                 {:onClick on-prev
                  :variant :secondary}
                 "← Back"))

              (if is-last?
                (ui/button
                 {:onClick on-complete
                  :variant :primary}
                 "✓ Complete")
                (ui/button
                 {:onClick on-next
                  :variant :primary}
                 "Next →"))

              (ui/button
               {:onClick on-skip
                :variant :ghost}
               "Skip Tour")))))

(defsc TourOverlay
  "Overlay that highlights target elements"
  [this {:keys [target children]}]
  (dom/div :.tour-overlay
    ;; Darken background
           (dom/div :.tour-backdrop)

    ;; Highlight box around target (if any)
           (when target
             (dom/div :.tour-highlight
                      {:className target}))

    ;; Tooltip content
           children))

(defsc ActiveTour
  "Currently active tour"
  [this {:keys [tour-id current-step]}]
  {:query [:onboarding/active-tour :onboarding/current-step]
   :ident (fn [] [:component/id :active-tour])}
  (when-let [tour (get tours tour-id)]
    (let [steps (:steps tour)
          step (nth steps current-step nil)]
      (when step
        (ui/component TourOverlay
                      {:target (:target step)}
                      (ui/component TourTooltip
                                    {:step step
                                     :current-step current-step
                                     :total-steps (count steps)
                                     :on-next #(comp/transact! this [(next-step {})])
                                     :on-prev #(comp/transact! this [(prev-step {})])
                                     :on-skip #(comp/transact! this [(skip-tour {})])
                                     :on-complete #(comp/transact! this [(complete-tour {:tour-id tour-id})])}))))))

;; ============================================================================
;; Tour Launcher
;; ============================================================================

(defsc TourLauncher
  "Component to launch available tours"
  [this {:keys [completed-tours]}]
  (dom/div :.tour-launcher
           (dom/h3 "🎯 Guided Tours")
           (dom/p "New here? Take a tour to learn the features.")

           (dom/div :.tour-list
                    (map (fn [[tour-id tour]]
                           (let [completed? (get completed-tours tour-id)]
                             (dom/div
                              {:key tour-id
                               :className (str "tour-item " (when completed? "completed"))}
                              (dom/div :.tour-info
                                       (dom/h4 (:name tour))
                                       (dom/span :.tour-steps
                                                 (str (count (:steps tour)) " steps")))
                              (if completed?
                                (dom/span :.tour-completed-badge "✓ Completed")
                                (ui/button
                                 {:onClick #(comp/transact! this [(start-tour {:tour-id tour-id})])
                                  :variant :primary}
                                 "Start Tour")))))
                         tours))

    ;; Quick tips section
           (dom/div :.quick-tips
                    (dom/h4 "💡 Quick Tips")
                    (dom/ul
                     (dom/li "Press ? for keyboard shortcuts")
                     (dom/li "Drag sticky notes to organize")
                     (dom/li "Double-click to edit")
                     (dom/li "Invite team members from the sidebar")))))

;; ============================================================================
;; Contextual Tooltips
;; ============================================================================

(def contextual-tooltips
  {:first-note
   {:id :first-note
    :content "💡 Tip: Click the + button to add your first sticky note"
    :target ".btn-add"
    :show-after-ms 2000}

   :collaboration
   {:id :collaboration
    :content "👥 Invite team members to collaborate in real-time"
    :target ".collaboration-sidebar"
    :show-after-ms 5000}

   :ai-help
   {:id :ai-help
    :content "🤖 Ask AI for suggestions on your canvas"
    :target ".wisdom-sidebar"
    :show-after-ms 10000}})

(defsc ContextualTooltip
  "Single contextual tooltip"
  [this {:keys [content target on-dismiss]}]
  (dom/div
   {:className "contextual-tooltip"
    :style {;; Position relative to target
            }}
   (dom/p content)
   (dom/button
    {:onClick on-dismiss
     :className "tooltip-dismiss"}
    "×")))

;; ============================================================================
;; Progress Tracking
;; ============================================================================

(defsc OnboardingProgress
  "Show onboarding completion progress"
  [this {:keys [completed-tours total-tours]}]
  (let [completed-count (count completed-tours)
        percentage (if (> total-tours 0)
                     (int (* 100 (/ completed-count total-tours)))
                     0)]
    (dom/div :.onboarding-progress
             (dom/h4 "Getting Started")
             (dom/div :.progress-ring
                      (dom/svg
                       {:width 80 :height 80 :viewBox "0 0 80 80"}
                       (dom/circle
                        {:cx 40 :cy 40 :r 35
                         :fill "none"
                         :stroke "#e0e0e0"
                         :strokeWidth 8})
                       (dom/circle
                        {:cx 40 :cy 40 :r 35
                         :fill "none"
                         :stroke "#4CAF50"
                         :strokeWidth 8
                         :strokeDasharray (* 2 Math/PI 35)
                         :strokeDashoffset (* 2 Math/PI 35 (- 1 (/ percentage 100)))
                         :style {:transform "rotate(-90deg)"
                                 :transformOrigin "center"
                                 :transition "stroke-dashoffset 0.5s ease"}}))
                      (dom/span :.progress-text (str percentage "%")))
             (dom/p (str completed-count " of " total-tours " tours completed"))
             (ui/button
              {:onClick #(js/alert "Opening tour launcher...")
               :variant :secondary}
              "Continue Learning"))))

;; ============================================================================
;; Keyboard Shortcuts
;; ============================================================================

(def keyboard-shortcuts
  {"?" "Show keyboard shortcuts"
   "n" "Add new sticky note"
   "c" "Add comment"
   "e" "Export canvas"
   "s" "Save version snapshot"
   "h" "Toggle collaboration sidebar"
   "w" "Toggle wisdom sidebar"
   "→" "Next step (during tour)"
   "←" "Previous step (during tour)"
   "Esc" "Close modal or exit tour"})

(defn show-shortcuts-help
  "Show keyboard shortcuts modal"
  []
  (js/alert
   (str "Keyboard Shortcuts:\n\n"
        (str/join "\n"
                  (map (fn [[k v]] (str k " - " v))
                       keyboard-shortcuts)))))

;; ============================================================================
;; Export
;; ============================================================================

(def active-tour ActiveTour)
(def launcher TourLauncher)
(def progress OnboardingProgress)
(def shortcuts show-shortcuts-help)
