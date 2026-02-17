(ns ouroboros.frontend.ui.wisdom.learning
  "Learning patterns section and category drawer for Wisdom page."
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.ui.wisdom.data :as data]
   [ouroboros.frontend.ui.wisdom.resize :as resize]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Category Card Component
;; ============================================================================

(defn category-card
  "Renders a learning category card with icon, label, description, and count."
  [{:keys [icon label description count category on-select] :as props}]
  ;; Ensure count is a number, not a function or other type
  (let [safe-count (cond
                     (number? count) count
                     (string? count) (js/parseInt count 10)
                     :else 0)
        key-id (or label
                   (when category (str category))
                   (str "category-" (hash (or description ""))))]
    (dom/div {:key key-id
              :className "wisdom-category-card"
              :role "button"
              :tabIndex 0
              :onClick #(when on-select (on-select label category))
              :onKeyDown (fn [e]
                           (when (or (= "Enter" (.-key e)) (= " " (.-key e)))
                             (.preventDefault e)
                             (when on-select (on-select label category))))}
      (dom/div :.wisdom-category-icon icon)
      (dom/div :.wisdom-category-body
        (dom/h4 label)
        (dom/p (ui/extract-plain-text-from-markdown (or description "") 120)))
      (dom/div :.wisdom-category-count
        (dom/span :.wisdom-count-value (str safe-count))
        (dom/span :.wisdom-count-label "insights")))))

;; ============================================================================
;; Category Grid
;; ============================================================================

(defn category-grid
  "Renders a grid of category cards."
  [{:keys [categories on-select]}]
  (if (seq categories)
    (dom/div {:className "wisdom-category-grid"}
      (for [c categories]
        (category-card (assoc c :on-select on-select))))
    (dom/div :.wisdom-empty-state
      (dom/div :.wisdom-empty-icon "📚")
      (dom/p "Complete more projects to see patterns emerge."))))

;; ============================================================================
;; Category Drawer
;; ============================================================================

(defn- insight-card
  "Renders a single insight card."
  [insight]
  (let [insight-id (or (:id insight) (str (hash insight)))]
    (dom/div {:key insight-id
              :className "category-insight-card"}
      (dom/div {:className "category-insight-header"}
        (dom/h4 (or (:title insight) "Untitled Insight"))
        (when (:created insight)
          (dom/span {:className "category-insight-date"}
            (let [created (:created insight)]
              (if (> (count created) 10)
                (subs created 0 10)
                created)))))
      (when (seq (:insights insight))
        (dom/ul {:className "category-insight-points"}
          (for [[idx point] (map-indexed vector (:insights insight))]
            (dom/li {:key idx} point))))
      (when (seq (:tags insight))
        (dom/div {:className "category-insight-tags"}
          (for [tag (:tags insight)]
            (dom/span {:key tag :className "category-insight-tag"} tag))))
      (when (:confidence insight)
        (dom/div {:className "category-insight-meta"}
          (dom/span (str "Confidence: " (:confidence insight) "/5"))
          (when (pos? (or (:applied-count insight) 0))
            (dom/span (str "Applied " (:applied-count insight) " times"))))))))

(defn category-drawer
  "Renders the category insights drawer."
  [this {:keys [open? state insights insights-loading? on-close]}]
  (when open?
    (let [{:keys [label description category card-count]} state
          {:keys [width active?]} (resize/use-resizable-drawer this :category)
          dw (resize/clamp-drawer-width width)
          ;; Ensure insights is a vector/seq before counting
          safe-insights (cond
                          (vector? insights) insights
                          (seq? insights) insights
                          (nil? insights) nil
                          :else nil)
          display-count (if (seq safe-insights) (cljs.core/count safe-insights) (or card-count 0))]
      (dom/div :.wisdom-drawer-backdrop
        {:onClick on-close}
        (dom/div {:className (str "wisdom-drawer" (when active? " wisdom-drawer-resizing"))
                  :style {:width (str dw "px")}
                  :onClick #(.stopPropagation %)}
          (resize/drawer-resize-handle this :category dw)
          (dom/div :.wisdom-drawer-header
            (dom/div
              (dom/h3 (or label "Learning Pattern"))
              (dom/p (str display-count " insights in " (or category "this category"))))
            (dom/button {:className "btn btn-secondary"
                         :onClick on-close}
                        "Close"))

          (dom/div :.wisdom-drawer-body
            ;; Category description
            (when (seq description)
              (dom/div {:className "category-drawer-description"}
                (dom/p description)))

            ;; Insights list
            (cond
              ;; Loading state
              (and insights-loading? (not (seq safe-insights)))
              (dom/div {:className "category-drawer-loading"}
                (dom/span "Loading insights..."))

              ;; Has insights
              (seq safe-insights)
              (dom/div {:className "category-drawer-insights"}
                (for [insight safe-insights]
                  (insight-card insight)))

              ;; No insights
              :else
              (dom/div {:className "wisdom-drawer-feedback wisdom-drawer-info"}
                (dom/span "No insights recorded yet. Insights are captured as you work through builders."))))

          (dom/div :.wisdom-drawer-footer
            (dom/button {:className "btn btn-primary btn-sm"
                         :onClick on-close}
                        "Got it")))))))

;; ============================================================================
;; Learning Section Component
;; ============================================================================

(defn learning-section
  "Complete learning patterns section with grid and drawer."
  [{:keys [this categories categories-loading? category-insights category-insights-loading?
           drawer-open? drawer-state on-category-select on-close-drawer]}]
  (let [show-loading? (and categories-loading?
                           (not (seq categories))
                           (not (seq data/fallback-learning-categories-base)))
        current-category (:category drawer-state)]
    (dom/section {:className "wisdom-section" :id "wisdom-learning"}
      (dom/div :.wisdom-section-header
        (dom/h2 "Learning Patterns")
        (dom/p :.wisdom-section-desc "Insights discovered across your projects.")
        (when show-loading?
          (dom/span :.wisdom-loading-badge "Loading...")))

      (category-grid
        {:categories categories
         :on-select (fn [label category]
                      ;; Ensure defaults are in state
                      (when-let [sa @ws/app-state-atom]
                        (when (not (seq (get-in @sa [:learning/category-insights category])))
                          (when-let [fallback (get data/default-category-insights category)]
                            (swap! sa assoc-in [:learning/category-insights category] fallback))))
                      ;; Request fresh data
                      (ws/request-category-insights! category)
                      ;; Open drawer
                      (on-category-select label category))})

      (category-drawer
        this
        {:open? drawer-open?
         :state drawer-state
         :insights (get category-insights current-category)
         :insights-loading? (get category-insights-loading? current-category)
         :on-close on-close-drawer}))))