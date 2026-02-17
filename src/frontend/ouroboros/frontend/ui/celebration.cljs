(ns ouroboros.frontend.ui.celebration
  "Celebration effects for joyful UX - confetti, badges, animations"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.mutations :as m]))

;; ============================================================================
; Confetti Effect
;; ============================================================================

(def ^:private confetti-colors
  ["#6366f1" "#a855f7" "#22c55e" "#eab308" "#ef4444" "#3b82f6" "#ec4899"])

(defn create-confetti-piece
  "Generate a single confetti piece with random properties"
  []
  {:id (str "confetti-" (random-uuid))
   :color (rand-nth confetti-colors)
   :x (+ 10 (rand 80)) ; 10-90% from left
   :delay (rand 2)     ; 0-2s delay
   :duration (+ 2 (rand 2)) ; 2-4s duration
   :rotation (rand 360)
   :size (+ 8 (rand 8))}) ; 8-16px

(defn confetti-explosion
  "Create confetti explosion effect"
  [{:keys [piece-count on-complete]}]
  (let [pieces (repeatedly (or piece-count 50) create-confetti-piece)]
    (dom/div {:className "confetti-container"
              :aria-hidden "true"}
      (map (fn [{:keys [id color x delay duration rotation size]}]
             (dom/div {:key id
                      :className "confetti-piece"
                      :style {:background-color color
                             :left (str x "%")
                             :width (str size "px")
                             :height (str size "px")
                             :animation-delay (str delay "s")
                             :animation-duration (str duration "s")
                             :transform (str "rotate(" rotation "deg)")}
                      :onAnimationEnd (when on-complete
                                       (fn [_] (on-complete id)))})
             pieces)))))

;; ============================================================================
; Achievement Badges
;; ============================================================================

(def achievement-definitions
  {:first-note {:icon "📝" :title "First Note" :desc "Added your first insight"}
   :section-complete {:icon "✨" :title "Section Complete" :desc "Finished one section"}
   :halfway {:icon "🚀" :title "Halfway There" :desc "50% complete"}
   :all-sections {:icon "🏆" :title "All Sections" :desc "Completed the empathy map"}
   :streak-3 {:icon "🔥" :title "On Fire" :desc "3 sections in one session"}
   :early-bird {:icon "🐦" :title "Early Bird" :desc "Started before 9am"}
   :night-owl {:icon "🦉" :title "Night Owl" :desc "Working late"}})

(defn achievement-badge
  "Display an achievement badge with animation"
  [{:keys [achievement-id on-dismiss]}]
  (let [achievement (get achievement-definitions achievement-id)]
    (dom/div {:className "achievement-badge"
             :role "alert"
             :aria-live "polite"}
      (dom/div :.achievement-icon (:icon achievement))
      (dom/div :.achievement-content
        (dom/h4 :.achievement-title (:title achievement))
        (dom/p :.achievement-desc (:desc achievement)))
      (when on-dismiss
        (dom/button {:className "achievement-dismiss"
                    :onClick on-dismiss
                    :aria-label "Dismiss achievement"}
          "×")))))

;; ============================================================================
; Progress Celebrations
;; ============================================================================

(defn milestone-celebration
  "Celebrate reaching a milestone"
  [{:keys [milestone value max-value on-continue]}]
  (let [messages {:25 "Great start! Keep going! 🎉"
                 :50 "Halfway there! You're building momentum! 🚀"
                 :75 "Almost done! Finish strong! 💪"
                 :100 "Amazing! You've completed it all! 🏆"}
        percentage (int (* 100 (/ value max-value)))
        message (or (get messages (keyword (str percentage)))
                   (when (= value max-value) "Complete! 🎉"))]
    (when message
      (dom/div {:className "milestone-overlay"
               :role "dialog"
               :aria-modal "true"}
        (dom/div :.milestone-content
          (confetti-explosion {:piece-count 30})
          (dom/h3 :.milestone-title message)
          (dom/p :.milestone-stats (str value "/" max-value " complete"))
          (when on-continue
            (ui/button {:onClick on-continue
                       :variant :primary}
              "Continue →")))))))

;; ============================================================================
; Encouragement Messages
;; ============================================================================

(def encouragement-messages
  {0 ["Let's get started! Every great product begins with understanding. 💡"
      "You're about to build something amazing. Start by understanding your users. 🌟"]
   1 ["Great first step! Keep adding insights. 🎉"
      "You've started! Momentum is building. 🚀"]
   2 ["Making progress! Two sections down. 💪"
      "You're on a roll! Keep going! 🔥"]
   3 ["Almost there! Just one more section. 🎯"
      "So close! Finish strong! 🚀"]
   4 ["Incredible work! You've understood your customer deeply. 🏆"
      "Product vision complete! Ready to define your value proposition. ✨"]})

(defn encouragement-toast
  "Show encouraging message based on progress"
  [{:keys [completed-count]}]
  (let [messages (get encouragement-messages completed-count ["Keep going!"])
        message (rand-nth messages)]
    (dom/div {:className "encouragement-toast"
             :role "status"
             :aria-live "polite"}
      (dom/span :.toast-icon (case completed-count
                              0 "💡" 1 "🎉" 2 "💪" 3 "🎯" 4 "🏆" "✨"))
      (dom/span :.toast-message message))))

;; ============================================================================
; Section Completion Animation
;; ============================================================================

(defn section-complete-animation
  "Animation when completing a section"
  [{:keys [section-name on-finish]}]
  (dom/div {:className "section-complete-overlay"}
    (dom/div :.section-complete-content
      (dom/div :.section-complete-icon "✨")
      (dom/h3 :.section-complete-title (str section-name " Complete!"))
      (dom/p :.section-complete-subtitle "Great insights. Keep building!"))))

;; ============================================================================
; Streak Counter
;; ============================================================================

(defn streak-counter
  "Show consecutive work streak"
  [{:keys [streak-days]}]
  (when (pos? streak-days)
    (dom/div {:className "streak-counter"
             :title (str streak-days " day streak!")}
      (dom/span :.streak-icon "🔥")
      (dom/span :.streak-count streak-days))))

;; ============================================================================
; Level Up Animation
;; ============================================================================

(defn level-up-animation
  "Celebrate leveling up"
  [{:keys [new-level level-name]}]
  (dom/div {:className "level-up-overlay"
           :role "dialog"}
    (dom/div :.level-up-content
      (confetti-explosion {:piece-count 50})
      (dom/div :.level-up-badge
        (dom/span :.level-up-icon "⭐")
        (dom/span :.level-up-text (str "Level " new-level)))
      (dom/h3 :.level-up-title "Level Up!")
      (dom/p :.level-up-name level-name)
      (dom/p :.level-up-subtitle "Your product thinking is evolving!"))))

;; ============================================================================
; Joyful Empty State
;; ============================================================================

(defn joyful-empty-state
  "Empty state with personality and guidance"
  [{:keys [section-name icon prompts on-start-example]}]
  (dom/div :.joyful-empty-state
    (dom/div :.empty-illustration (or icon "✨"))
    (dom/h4 :.empty-title (str section-name " is empty"))
    (dom/p :.empty-hint "Tap the + button or click here to add your first note")
    
    (when (seq prompts)
      (dom/div :.empty-prompts
        (dom/h5 :.empty-prompts-title "Need inspiration?")
        (dom/ul :.empty-prompts-list
          (map (fn [prompt idx]
                 (dom/li {:key idx} prompt))
               prompts))))
    
    (when on-start-example
      (ui/button {:onClick on-start-example
                 :variant :secondary
                 :size :small}
        "Start with an example"))))

;; ============================================================================
; Component Registration
;; ============================================================================

(defsc CelebrationOverlay
  "Main celebration component that can display various celebration types"
  [this {:keys [type data]}]
  {:query [:celebration/type :celebration/data]
   :ident (fn [] [:component/id :celebration-overlay])}
  
  (case type
    :confetti (confetti-explosion data)
    :achievement (achievement-badge data)
    :milestone (milestone-celebration data)
    :level-up (level-up-animation data)
    :section-complete (section-complete-animation data)
    nil))

;; Export functions for use in other components
(def exports
  {:confetti confetti-explosion
   :achievement achievement-badge
   :milestone milestone-celebration
   :encouragement encouragement-toast
   :section-complete section-complete-animation
   :streak streak-counter
   :level-up level-up-animation
   :empty-state joyful-empty-state})
