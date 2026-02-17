(ns ouroboros.frontend.ui.wisdom.bmc
  "Business Model Canvas (BMC) 9-block grid component."
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [ouroboros.frontend.ui.wisdom.data :as data]))

;; ============================================================================
;; BMC Block Component
;; ============================================================================

(defn bmc-block
  "Renders a single BMC block cell."
  [block-key label content]
  (dom/div {:className (str "bmc-block bmc-block--" (name block-key))
            :style {:background (get data/bmc-block-colors block-key "transparent")}}
    (dom/div :.bmc-block-label label)
    (dom/div :.bmc-block-content
      (if (seq content)
        content
        (dom/span :.bmc-block-empty "Select a template below")))))

;; ============================================================================
;; BMC Canvas Grid
;; ============================================================================

(defn bmc-canvas
  "Renders the Business Model Canvas 9-block grid layout.
   
   template-data: map with :lean-canvas, :value-proposition, :mvp-planning keys
   template-name: string for the title"
  [template-data template-name]
  (let [get-val (fn [section key]
                  (when template-data
                    (get-in template-data [section key])))]
    (dom/div {:className "bmc-canvas"}
      (when template-name
        (dom/div :.bmc-canvas-title template-name))
      (dom/div {:className "bmc-grid"}
        ;; Row 1: Key Partners (spans 2) | Key Activities (top) | Value Props (spans 2) | Customer Rel (top) | Customer Segments (spans 2)
        (bmc-block :key-partners "Key Partners" (get-val :lean-canvas :unfair-advantage))
        (bmc-block :key-activities "Key Activities" (get-val :lean-canvas :solution))
        (bmc-block :value-props "Value Propositions" (get-val :lean-canvas :uvp))
        (bmc-block :customer-rel "Customer Relationships" (get-val :value-proposition :gain-creators))
        (bmc-block :customer-segments "Customer Segments" (get-val :lean-canvas :customer-segments))
        ;; Row 2: Key Resources (bottom) | Channels (bottom)
        (bmc-block :key-resources "Key Resources" (get-val :mvp-planning :must-have-features))
        (bmc-block :channels "Channels" (get-val :lean-canvas :channels))
        ;; Row 3: Cost Structure (left) | Revenue Streams (right)
        (bmc-block :cost-structure "Cost Structure" (get-val :lean-canvas :cost-structure))
        (bmc-block :revenue-streams "Revenue Streams" (get-val :lean-canvas :revenue-streams))))))

;; ============================================================================
;; BMC Container Component (Fulcro)
;; ============================================================================

(defsc BMCView
  "Standalone BMC view component for use in other pages."
  [this {:keys [template-data template-name]}]
  {:query [:template-data :template-name]
   :ident (fn [] [:component/id :bmc-view])}
  (bmc-canvas template-data template-name))

(def ui-bmc-view (comp/factory BMCView))