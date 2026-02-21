(ns ouroboros.frontend.ui.wisdom.review
  "Spaced repetition review queue and interactions.
   
   Provides:
   - Review queue component (list of due reviews)
   - Review cards with Remember/Forgot actions
   - Confidence selector (1-4 scale)
   - Review reminder badge
   - Review modal for focused review session"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Confidence Selector Component
;; ============================================================================

(defn confidence-selector
  "Render confidence buttons (1-4 scale)."
  [{:keys [on-select learning-id selected-confidence]}]
  (let [confidence-labels {1 "Again" 2 "Hard" 3 "Good" 4 "Easy"}
        confidence-icons {1 "❌" 2 "😓" 3 "😊" 4 "🎯"}]
    (dom/div {:className "review-confidence-selector"}
             (dom/p "How well did you remember this?")
             (dom/div {:className "confidence-buttons"}
                      (for [conf [1 2 3 4]]
                        (dom/button {:key conf
                                   :className (str "confidence-btn "
                                                (when (= conf selected-confidence)
                                                  "confidence-btn--selected"))
                                   :onClick #(on-select learning-id conf)}
                                   (dom/span :.confidence-icon (get confidence-icons conf))
                                   (dom/span :.confidence-label (get confidence-labels conf))))))))

;; ============================================================================
;; Review Card Component
;; ============================================================================

(defn- relative-time
  "Convert timestamp to relative time string."
  [timestamp]
  (if (seq timestamp)
    (let [now (js/Date.)
          then (js/Date. timestamp)
          diff-ms (- (.getTime now) (.getTime then))
          diff-hours (/ diff-ms (* 60 60 1000))]
      (cond
        (< diff-hours 24) "Today"
        (< diff-hours 48) "Yesterday"
        (< diff-hours 168) (str (Math/floor (/ diff-hours 24)) " days ago")
        :else (str (Math/floor (/ diff-hours 168)) " weeks ago")))
    "Recently"))

(defn review-card
  "Render a single review card with learning details and actions."
  [{:keys [learning-id title category insights level scheduled-at on-complete on-skip]}]
  (let [expanded? (atom false)
        selected-confidence (atom nil)]
    (fn []
      (dom/div {:key learning-id
               :className (str "review-card"
                              (when @expanded? " review-card--expanded"))}
               (dom/div {:className "review-card-header"
                        :onClick #(swap! expanded? not)}
                        (dom/div {:className "review-card-icon"}
                                 (case level
                                   :utility "⚡"
                                   :understanding "🧠"
                                   :insight "💡"
                                   :wisdom "🎓"
                                   "📝"))
                        (dom/div {:className "review-card-body"}
                                 (dom/h4 (or title "Untitled Learning"))
                                 (dom/div {:className "review-card-meta"}
                                          (dom/span {:className "review-badge"}
                                                    (str/capitalize (name level)))
                                          (when category
                                            (dom/span {:className "review-category"}
                                                      (str/capitalize (str/replace category #"[-_]" " "))))
                                          (dom/span {:className "review-due"}
                                                    (relative-time scheduled-at))))
                        (dom/div {:className "review-card-toggle"}
                                 (dom/span {:className "toggle-icon"
                                           :style {:transform (if @expanded? "rotate(180deg)" "rotate(0deg)")
                                                   :transition "transform 0.2s"}}
                                           "▼")))
               (dom/div {:className "review-card-content"}
                        ;; Insights preview
                        (when (seq insights)
                          (dom/ul {:className "review-insights-preview"}
                                  (for [[idx point] (map-indexed vector (take 3 insights))]
                                    (dom/li {:key idx} point)))
                          (when (> (count insights) 3)
                            (dom/span {:className "review-more-hints"}
                                      (str "and " (- (count insights) 3) " more..."))))
                        ;; Actions
                        (dom/div {:className "review-card-actions"}
                                 ;; Complete review with confidence
                                 (when @expanded?
                                   (confidence-selector
                                    {:on-select on-complete
                                     :learning-id learning-id
                                     :selected-confidence @selected-confidence}))
                                 ;; Skip review
                                 (dom/button {:className "btn btn-secondary btn-sm"
                                              :onClick on-skip}
                                            "Skip")))))))

(defn review-card-simple
  "Simplified review card for queue view (no expand)."
  [{:keys [learning-id title category level scheduled-at on-review on-skip]}]
  (dom/div {:key learning-id
            :className "review-card-simple"}
           (dom/div {:className "review-simple-header"}
                    (dom/div {:className "review-simple-icon"}
                             (case level
                               :utility "⚡"
                               :understanding "🧠"
                               :insight "💡"
                               :wisdom "🎓"
                               "📝"))
                    (dom/div {:className "review-simple-body"}
                             (dom/h5 (or title "Untitled Learning"))
                             (dom/div {:className "review-simple-meta"}
                                      (dom/span {:className "review-badge review-badge-small"}
                                                (str/capitalize (name level)))
                                      (dom/span {:className "review-due-small"}
                                                (relative-time scheduled-at))))
                    (dom/div {:className "review-simple-actions"}
                             (dom/button {:className "btn btn-primary btn-xs"
                                          :onClick on-review}
                                        "Review")
                             (dom/button {:className "btn btn-secondary btn-xs"
                                          :onClick on-skip}
                                        "Skip")))))

;; ============================================================================
;; Review Queue Component
;; ============================================================================

(defn review-queue
  "Render the review queue with all due reviews."
  [{:keys [reviews due-count loading? on-complete on-skip on-refresh]}]
  (let [has-reviews? (seq reviews)
        empty-state? (and (not loading?)
                          (not has-reviews?))]
    (dom/div {:className "review-queue"}
             (dom/div {:className "review-queue-header"}
                      (dom/div
                       (dom/h3 "Review Queue")
                       (dom/p :.review-queue-subtitle
                              (if has-reviews?
                                (str due-count " items due for review")
                                "All caught up! No reviews due.")))
                      (when (not loading?)
                        (dom/button {:className "btn btn-secondary btn-sm"
                                     :onClick on-refresh}
                                   "🔄 Refresh")))
             (cond
               ;; Loading
               loading?
               (dom/div {:className "review-loading"}
                        (dom/span "Loading reviews...")
                        (ui/loading-spinner))

               ;; Has reviews
               has-reviews?
               (dom/div {:className "review-list"}
                        (for [review reviews]
                          (review-card-simple
                           (merge review
                                  {:on-review #(js/console.log "Review:" (:learning-id review))
                                   :on-complete on-complete
                                   :on-skip on-skip}))))

               ;; Empty state
               empty-state?
               (dom/div {:className "review-empty-state"}
                        (dom/div {:className "review-empty-icon"} "✨")
                        (dom/h4 "All Caught Up!")
                        (dom/p "You've reviewed all your learnings.")
                        (dom/p {:className "review-empty-hint"}
                               "New reviews will appear based on your spaced repetition schedule.")
                        (dom/button {:className "btn btn-primary"
                                     :onClick on-refresh}
                                    "Check Later"))))))

;; ============================================================================
;; Review Reminder Badge
;; ============================================================================


(defn review-reminder-badge
  "Render a small badge showing due review count for navbar."
  [{:keys [due-count loading?]}]
  (when (and (or (pos? due-count) loading?)
             (not (and (zero? due-count) (not loading?))))
    (dom/span {:className "review-badge-navbar"
              :title (if (pos? due-count)
                       (str due-count " reviews due")
                       "Checking reviews...")}
             (if loading?
               "⋯"
               (str due-count)))))
;; ============================================================================
;; Review Modal
;; ============================================================================

(defn review-modal
  "Render a modal for focused review session."
  [{:keys [open? reviews current-index due-count loading? on-complete on-skip onClose]}]
  (when open?
    (let [current-review (get reviews current-index)
          progress (if (seq reviews)
                    (inc current-index)
                    0)
          total (count reviews)]
      (dom/div {:className "review-modal-backdrop"
               :onClick onClose}
               (dom/div {:className "review-modal"
                        :onClick #(.stopPropagation %)}
                        ;; Modal header
                        (dom/div {:className "review-modal-header"}
                                 (dom/div
                                  (dom/h3 "Review Session")
                                  (dom/p :.review-modal-progress
                                         (str progress " of " total)))
                                 (dom/button {:className "btn-icon btn-secondary"
                                              :onClick onClose
                                              :aria-label "Close review"}
                                            "✕"))

                        ;; Modal body
                        (dom/div {:className "review-modal-body"}
                                 (cond
                                   ;; Loading
                                   loading?
                                   (dom/div {:className "review-modal-loading"}
                                            (ui/loading-spinner)
                                            (dom/p "Loading review..."))

                                   ;; Has current review
                                   current-review
                                   (review-card
                                    (merge current-review
                                           {:on-complete on-complete
                                            :on-skip on-skip}))

                                   ;; No reviews
                                   :else
                                   (dom/div {:className "review-modal-complete"}
                                            (dom/div {:className "review-complete-icon"} "🎉")
                                            (dom/h4 "Session Complete!")
                                            (dom/p "You've reviewed all due learnings.")
                                            (dom/button {:className "btn btn-primary"
                                                         :onClick onClose}
                                                       "Close"))))

                        ;; Modal footer
                        (when (and (seq reviews)
                                   (< (inc current-index) total))
                          (dom/div {:className "review-modal-footer"}
                                   (dom/button {:className "btn btn-secondary"
                                                :onClick on-skip}
                                              "Skip This One"))))))))

;; ============================================================================
;; Helper: Start Review Session
;; ============================================================================

(defn start-review-session!
  "Start a review session by fetching due reviews and opening modal."
  []
  (when-let [state-atom @ws/app-state-atom]
    (swap! state-atom assoc-in [:review-modal/open?] true)
    (swap! state-atom assoc-in [:review-modal/current-index] 0)
    ;; Request due reviews
    (ws/request-due-reviews!)))

(defn close-review-session!
  "Close the review modal."
  []
  (when-let [state-atom @ws/app-state-atom]
    (swap! state-atom assoc-in [:review-modal/open?] false)))

(defn complete-review-action!
  "Complete a review with confidence level."
  [learning-id confidence]
  (when-let [state-atom @ws/app-state-atom]
    (ws/complete-review! learning-id confidence)
    ;; Move to next review
    (let [current (get-in @state-atom [:review-modal/current-index] 0)]
      (swap! state-atom update-in [:review-modal/current-index] inc))))

(defn skip-review-action!
  "Skip the current review."
  [learning-id]
  (when-let [state-atom @ws/app-state-atom]
    (ws/skip-review! learning-id)
    ;; Move to next review
    (let [current (get-in @state-atom [:review-modal/current-index] 0)]
      (swap! state-atom update-in [:review-modal/current-index] inc))))

(comment
  ;; Test review badge
  (review-reminder-badge {:due-count 3 :loading? false})
  
  ;; Test review queue
  (review-queue {:reviews [{:learning-id "test-1"
                            :title "Test Learning"
                            :category "mvp-strategy"
                            :level :understanding
                            :scheduled-at "2026-02-19T10:00:00"
                            :insights ["Insight 1" "Insight 2"]}]
                 :due-count 1
                 :loading? false
                 :on-complete #(js/console.log "Complete")
                 :on-skip #(js/console.log "Skip")
                 :on-refresh #(ws/request-due-reviews!)}))