(ns ouroboros.frontend.ui.wisdom.templates
  "Template cards and BMC visualization for Wisdom page."
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.ui.wisdom.data :as data]
   [ouroboros.frontend.ui.wisdom.bmc :as bmc]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Template Card Component
;; ============================================================================

(defn template-card
  "Renders a clickable template card with icon, name, description, and tags."
  [{:keys [key icon name description tags on-select selected?]}]
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
;; Template Grid Component
;; ============================================================================

(defn template-grid
  "Renders a grid of template cards."
  [{:keys [templates selected-key on-select]}]
  (if (seq templates)
    (dom/div {:className "wisdom-template-grid"}
      (for [t templates]
        (template-card (assoc t
                         :selected? (= (:key t) selected-key)
                         :on-select on-select))))
    (dom/div :.wisdom-empty-state
      (dom/div :.wisdom-empty-icon "📭")
      (dom/p "No templates available yet. Connect ECA for AI-generated templates."))))

;; ============================================================================
;; Template Loading State
;; ============================================================================

(defn template-loading-badge
  "Shows loading indicator when templates are being fetched."
  [loading? has-content?]
  (when (and loading? (not has-content?))
    (dom/span :.wisdom-loading-badge "Loading from AI...")))

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
  "Complete templates section with BMC, cards, and apply button."
  [{:keys [templates templates-loading? template-store selected-key
           project-id on-select-template]}]
  (let [template-data (or (get template-store selected-key)
                          {})
        template-name (or (:name template-data)
                          (some #(when (= (:key %) selected-key) (:name %)) templates))
        show-loading? (and templates-loading? (not (seq templates)))]
    (dom/section {:className "wisdom-section" :id "wisdom-templates"}
      (dom/div :.wisdom-section-header
        (dom/h2 "Templates")
        (dom/p :.wisdom-section-desc "Start with a proven framework for your product type.")
        (template-loading-badge show-loading? (seq templates)))

      ;; BMC Canvas
      (bmc/bmc-canvas template-data template-name)

      ;; Template selector
      (template-grid
        {:templates templates
         :selected-key selected-key
         :on-select (fn [k]
                      (let [nk (data/normalize-template-key k)]
                        (on-select-template nk)
                        (when-not (get template-store nk)
                          (ws/request-wisdom-template! nk))))})

      ;; Apply button
      (template-apply-bar
        {:template-name template-name
         :template-key selected-key
         :template-data template-data
         :project-id project-id}))))