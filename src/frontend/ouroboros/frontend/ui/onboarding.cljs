(ns ouroboros.frontend.ui.onboarding
  "Interactive onboarding tour for first-time users
   
   Guides users through key features with:
   - Step-by-step tooltips
   - Highlighted elements
   - Progress indicator
   - Skip and restart options"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.mutations :as m]
   [com.fulcrologic.fulcro.algorithms.react-interop :as interop]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
; Tour Configuration
;; ============================================================================

(def tour-steps
  "Define the onboarding tour steps"
  {:start-here
   [{:id :welcome
     :title "Welcome to Ouroboros! 🎉"
     :content "You're about to build something amazing. This tour will show you around."
     :target nil
     :position :center}
    
    {:id :concepts
     :title "Two Ways to Build"
     :content "Product Flywheel helps you think strategically. Dev Workflow helps you implement tactically."
     :target ".concepts-card"
     :position :bottom}
    
    {:id :journey
     :title "Your Product Journey"
     :content "Follow these 4 phases in order. Each unlocks the next. Click any phase to continue."
     :target ".journey-card"
     :position :right}
    
    {:id :recommended
     :title "Next Recommended Step"
     :content "We'll always suggest what to do next based on your progress."
     :target ".recommended-action"
     :position :left}
    
    {:id :paths
     :title "Choose Your Path"
     :content "Start building a product or jump into coding. You can switch anytime."
     :target ".primary-paths"
     :position :top}
    
    {:id :chat
     :title "AI Assistant Always Available"
     :content "Click the 💬 button anytime to chat with ECA for guidance."
     :target ".chat-toggle-btn"
     :position :left}
    
    {:id :complete
     :title "You're Ready! 🚀"
     :content "Start with the Empathy Map to understand your users. Happy building!"
     :target nil
     :position :center}]
   
   :empathy-builder
   [{:id :empathy-welcome
     :title "Empathy Map Builder"
     :content "Understand your users deeply before building anything."
     :target nil
     :position :center}
    
    {:id :sections
     :title "Six Perspectives"
     :content "Each section helps you understand your customer from a different angle."
     :target ".canvas-grid"
     :position :bottom}
    
    {:id :sticky-notes
     :title "Add Insights"
     :content "Click the + button or double-click to add sticky notes with your insights."
     :target ".canvas-section:first-child"
     :position :right}
    
    {:id :wisdom
     :title "AI Guidance"
     :content "Toggle the Wisdom sidebar for AI-powered tips and examples."
     :target ".btn-wisdom"
     :position :bottom}
    
    {:id :progress
     :title "Track Progress"
     :content "Watch your progress bar fill as you complete sections."
     :target ".progress-bar-container"
     :position :top}
    
    {:id :empathy-complete
     :title "Complete All Sections"
     :content "Finish all 6 sections to unlock Value Proposition!"
     :target nil
     :position :center}]})

;; ============================================================================
; Tour State Management
;; ============================================================================

(defsc TourOverlay
  "Main tour overlay component"
  [this {:keys [tour-id current-step total-steps step-data on-next on-prev on-skip on-complete]}]
  {:query [:tour/active?
           :tour/current-step
           :tour/total-steps]
   :ident (fn [] [:component/id :tour-overlay])}
  
  (let [{:keys [title content position]} step-data
        is-first? (= current-step 0)
        is-last? (= current-step (dec total-steps))
        progress-pct (* 100 (/ (inc current-step) total-steps))]
    
    (dom/div {:className "tour-overlay"
             :onClick #(when-not is-last? (on-skip))}
      ;; Backdrop with highlight
      (dom/div {:className "tour-backdrop"})
      
      ;; Tooltip
      (dom/div {:className (str "tour-tooltip tour-" (name position))
               :onClick #(.stopPropagation %)}
        ;; Progress bar
        (dom/div :.tour-progress
          (dom/div {:className "tour-progress-fill"
                   :style {:width (str progress-pct "%")}}))
        
        ;; Step counter
        (dom/div :.tour-step-counter
          (str "Step " (inc current-step) " of " total-steps))
        
        ;; Content
        (dom/h3 :.tour-title title)
        (dom/p :.tour-content content)
        
        ;; Navigation
        (dom/div :.tour-nav
          (when-not is-first?
            (ui/button {:onClick on-prev
                       :variant :secondary
                       :size :small}
              "← Back"))
          
          (dom/div :.tour-nav-spacer)
          
          (when-not is-last?
            (ui/button {:onClick on-skip
                       :variant :ghost
                       :size :small}
              "Skip Tour"))
          
          (if is-last?
            (ui/button {:onClick on-complete
                       :variant :primary
                       :size :small}
              "Get Started! 🚀")
            (ui/button {:onClick on-next
                       :variant :primary
                       :size :small}
              "Next →")))))))

;; ============================================================================
; Tour Controller
;; ============================================================================

(defn start-tour
  "Start a named tour"
  [component tour-name]
  (let [steps (get tour-steps tour-name)]
    (comp/transact! component
      [(m/set-props {:tour/active? true
                    :tour/current-step 0
                    :tour/total-steps (count steps)
                    :tour/name tour-name})])))

(defn next-step
  "Advance to next tour step"
  [component]
  (comp/transact! component
    [(m/update-props {:tour/current-step inc})]))

(defn prev-step
  "Go back to previous tour step"
  [component]
  (comp/transact! component
    [(m/update-props {:tour/current-step dec})]))

(defn skip-tour
  "Skip the current tour"
  [component]
  (comp/transact! component
    [(m/set-props {:tour/active? false})]))

(defn complete-tour
  "Complete the tour and mark as seen"
  [component tour-name]
  (skip-tour component)
  ;; Persist that user has seen this tour
  (try
    (.setItem js/localStorage
              (str "ouroboros.tour.completed/" (name tour-name))
              "true")
    (catch :default _ nil)))

(defn has-seen-tour?
  "Check if user has already seen a tour"
  [tour-name]
  (try
    (= "true" (.getItem js/localStorage
                       (str "ouroboros.tour.completed/" (name tour-name))))
    (catch :default _ false)))

;; ============================================================================
; Tour Launcher Component
;; ============================================================================

(defn tour-launcher
  "Button to launch or restart tours"
  [{:keys [tour-name label on-launch]}]
  (dom/button {:className "tour-launcher"
              :onClick (fn []
                        (when on-launch (on-launch))
                        (start-tour comp/*app* tour-name))}
    (dom/span :.tour-launcher-icon "🎯")
    (dom/span :.tour-launcher-text (or label "Start Tour"))))

;; ============================================================================
; Contextual Hints (Mini Tours)
;; ============================================================================

(defn contextual-hint
  "Small hint that points to a specific feature"
  [{:keys [target text position on-dismiss]}]
  (dom/div {:className (str "contextual-hint hint-" (name position))}
    (dom/div :.hint-arrow)
    (dom/p :.hint-text text)
    (dom/button {:className "hint-dismiss-btn"
                :onClick on-dismiss
                :aria-label "Dismiss hint"}
      "Got it")))

;; ============================================================================
; Feature Discovery Dots
;; ============================================================================

(defn feature-discovery-dot
  "Pulsing dot to draw attention to new features"
  [{:keys [on-click title]}]
  (dom/div {:className "feature-discovery"
           :onClick on-click
           :title title}
    (dom/div :.discovery-pulse)
    (dom/div :.discovery-dot "✨")))

;; ============================================================================
; Welcome Modal
;; ============================================================================

(defn welcome-modal
  "First-time welcome modal"
  [{:keys [on-start-tour on-skip on-close]}]
  (dom/div {:className "welcome-modal-overlay"
           :role "dialog"
           :aria-modal "true"}
    (dom/div :.welcome-modal
      (dom/div :.welcome-illustration "🌟")
      (dom/h2 :.welcome-title "Welcome to Ouroboros!")
      (dom/p :.welcome-subtitle
        "The AI-powered platform for building products with clarity and joy.")
      
      (dom/div :.welcome-features
        (dom/div :.welcome-feature
          (dom/span :.wf-icon "🎯")
          (dom/div :.wf-text
            (dom/h4 "Product Flywheel")
            (dom/p "4-phase methodology from empathy to business model")))
        
        (dom/div :.welcome-feature
          (dom/span :.wf-icon "🤖")
          (dom/div :.wf-text
            (dom/h4 "AI Assistant")
            (dom/p "ECA provides guidance every step of the way")))
        
        (dom/div :.welcome-feature
          (dom/span :.wf-icon "📊")
          (dom/div :.wf-text
            (dom/h4 "Visual Builders")
            (dom/p "Interactive canvases for structured thinking"))))
      
      (dom/div :.welcome-actions
        (ui/button {:onClick on-start-tour
                   :variant :primary
                   :size :large}
          "Take a Quick Tour 🚀")
        
        (dom/button {:className "welcome-skip"
                    :onClick on-skip}
          "Skip for now, I'll explore on my own"))
      
      (when on-close
        (dom/button {:className "welcome-close"
                    :onClick on-close
                    :aria-label "Close welcome modal"}
          "×")))))

;; ============================================================================
; Smart Tour Trigger
;; ============================================================================

(defn maybe-show-welcome
  "Show welcome modal if user hasn't seen it"
  [component]
  (when-not (has-seen-tour? :welcome)
    (comp/transact! component
      [(m/set-props {:ui/show-welcome? true})])))

(defn maybe-show-feature-tour
  "Show feature tour if user hasn't seen it"
  [component tour-name]
  (when-not (has-seen-tour? tour-name)
    (js/setTimeout
      #(start-tour component tour-name)
      1000))) ; Delay slightly for page to load

;; ============================================================================
; Export
;; ============================================================================

(def exports
  {:overlay TourOverlay
   :start start-tour
   :next next-step
   :prev prev-step
   :skip skip-tour
   :complete complete-tour
   :has-seen? has-seen-tour?
   :launcher tour-launcher
   :hint contextual-hint
   :discovery-dot feature-discovery-dot
   :welcome welcome-modal
   :maybe-show-welcome maybe-show-welcome
   :maybe-show-feature-tour maybe-show-feature-tour})
