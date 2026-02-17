(ns ouroboros.frontend.ui.wisdom.templates
  "Template cards, search, filters, and BMC visualization for Wisdom page."
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.ui.wisdom.data :as data]
   [ouroboros.frontend.ui.wisdom.bmc :as bmc]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Skeleton Template Card
;; ============================================================================

(defn skeleton-template-card
  "Renders a skeleton loading card."
  []
  (dom/div {:className "wisdom-template-card skeleton"}
           (dom/div :.wisdom-template-icon.skeleton-icon)
           (dom/div :.wisdom-template-body
                    (dom/h4 :.wisdom-template-name.skeleton-text.skeleton-text-short)
                    (dom/p :.wisdom-template-desc.skeleton-text.skeleton-text-medium)
                    (dom/div :.wisdom-template-tags
                             (dom/span {:className "wisdom-tag skeleton" :style {:width "40px"}})
                             (dom/span {:className "wisdom-tag skeleton" :style {:width "60px"}})))))

;; ============================================================================
;; Template Card Component
;; ============================================================================

(defn template-card
  "Renders a clickable template card with icon, name, description, and tags."
  [{:keys [key icon name description tags on-select selected? skeleton?]}]
  (if skeleton?
    (skeleton-template-card)
    (dom/div {:key (str key)
              :className (str "wisdom-template-card" (when selected? " wisdom-template-card--selected"))
              :role "button"
              :tabIndex 0
              :onClick #(when on-select (on-select key))
              :onKeyDown (fn [e]
                           (when (or (= "Enter" (.-key e)) (= " " (.-key e)))
                             (.preventDefault e)
                             (when on-select (on-select key))))}
             (dom/div :.wisdom-template-icon icon)
             (dom/div :.wisdom-template-body
                      (dom/h4 :.wisdom-template-name name)
                      (dom/p :.wisdom-template-desc
                             (ui/extract-plain-text-from-markdown (or description "") 140))
                      (when (seq tags)
                        (dom/div :.wisdom-template-tags
                                 (for [tag tags]
                                   (dom/span {:key tag :className "wisdom-tag"} tag)))))))

;; ============================================================================
;; Template Search Component
;; ============================================================================

  (defn template-search
    "Search input for templates."
    [{:keys [value on-change]}]
    (dom/div :.wisdom-template-search
             (dom/span :.wisdom-template-search-icon "🔍")
             (dom/input {:className "wisdom-template-search-input"
                         :type "text"
                         :placeholder "Search templates..."
                         :value (or value "")
                         :onChange #(on-change (.. % -target -value))})))

;; ============================================================================
;; Template Filter Chips
;; ============================================================================

  (defn template-filters
    "Filter chips for template filtering."
    [{:keys [active-filter on-filter]}]
    (dom/div :.wisdom-template-filters
             (for [{:keys [key label]} data/template-filters]
               (dom/button {:key (name key)
                            :className (str "wisdom-filter-chip" (when (= active-filter key) " wisdom-filter-chip--active"))
                            :onClick #(on-filter (if (= active-filter key) nil key))}
                           label))))

;; ============================================================================
;; Template Header with Search & Filters
;; ============================================================================

  (defn template-header
    "Header section with search and filters."
    [{:keys [search-query on-search-change active-filter on-filter-change loading?]}]
    (dom/div :.wisdom-template-header
             (template-search {:value search-query :on-change on-search-change})
             (template-filters {:active-filter active-filter :on-filter on-filter-change})
             (when loading?
               (dom/span :.wisdom-loading-badge "Loading from AI..."))))

;; ============================================================================
;; Template Grid Component
;; ============================================================================

  (defn template-grid
    "Renders a grid of template cards."
    [{:keys [templates selected-key on-select loading?]}]
    (cond
    ;; Show skeletons when loading and no data
      (and loading? (not (seq templates)))
      (dom/div {:className "wisdom-template-grid"}
               (for [i (range 6)]
                 (template-card {:key i :skeleton? true})))

    ;; Show templates
      (seq templates)
      (dom/div {:className "wisdom-template-grid"}
               (for [t templates]
                 (template-card (assoc t
                                       :selected? (= (:key t) selected-key)
                                       :on-select on-select))))

    ;; Empty state - no templates match filters
      :else
      (dom/div :.wisdom-empty-state
               (dom/div :.wisdom-empty-icon "🔍")
               (dom/p "No templates match your search.")
               (dom/p :.wisdom-empty-hint "Try adjusting your filters or search query."))))

;; ============================================================================
;; Template Application
;; ============================================================================

  (defn template-apply-bar
    "Renders the Apply button bar below BMC.
   Uses atomic backend operation instead of 4 separate WS calls."
    [{:keys [template-name template-key template-data project-id on-applied]}]
    (when (and project-id template-data)
      (let [encoded-id (str/replace (str project-id) "/" "~")]
        (dom/div {:className "bmc-apply-bar"}
                 (dom/button
                  {:className "btn btn-primary"
                   :onClick (fn [_]
                      ;; Atomic template application - single WS call
                              (ws/apply-template-to-builders! project-id template-key template-data)
                      ;; Show toast notification
                              (data/show-toast! (str "Applied \"" template-name "\" to all builders") :success)
                      ;; Navigate to project after short delay
                              (js/setTimeout
                               (fn []
                                 (when-let [nav @ws/navigate-callback]
                                   (nav ["project" encoded-id])))
                               500)
                              (when on-applied
                                (on-applied 4)))}
                  (str "Apply \"" (or template-name "Template") "\" to All Builders"))))))

;; ============================================================================
;; Templates Section Component
;; ============================================================================

  (defn templates-section
    "Complete templates section with search, filters, BMC, cards, and apply button."
    [{:keys [templates templates-loading? template-store selected-key project-id
             search-query active-filter
             on-select-template on-search-change on-filter-change]}]
    (let [template-data (or (get template-store selected-key) {})
          template-name (or (:name template-data)
                            (some #(when (= (:key %) selected-key) (:name %)) templates))
        ;; Filter templates based on search and active filter
          filtered-templates (data/filter-templates templates search-query active-filter)]
      (dom/section {:className "wisdom-section" :id "wisdom-templates"}
                   (dom/div :.wisdom-section-header
                            (dom/h2 "Templates")
                            (dom/p :.wisdom-section-desc "Start with a proven framework for your product type."))

      ;; Search & Filters
                   (template-header {:search-query search-query
                                     :on-search-change on-search-change
                                     :active-filter active-filter
                                     :on-filter-change on-filter-change
                                     :loading? templates-loading?})

      ;; BMC Canvas (pass project-id for clickable navigation)
                   (bmc/bmc-canvas template-data template-name project-id)

      ;; Template selector
                   (template-grid
                    {:templates filtered-templates
                     :selected-key selected-key
                     :on-select (fn [k]
                                  (let [nk (data/normalize-template-key k)]
                                    (on-select-template nk)
                                    (when-not (get template-store nk)
                                      (ws/request-wisdom-template! nk))))
                     :loading? templates-loading?})

      ;; Apply button
                   (template-apply-bar
                    {:template-name template-name
                     :template-key selected-key
                     :template-data template-data
                     :project-id project-id})))))