(ns ouroboros.frontend.ui.wisdom.bmc
  "Business Model Canvas (BMC) 9-block grid component with interactive navigation."
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [ouroboros.frontend.ui.wisdom.data :as data]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; BMC Block Component
;; ============================================================================

(defn bmc-block
  "Renders a single BMC block cell.
   
   Options:
   - block-key: keyword identifying the block
   - label: display label
   - content: content to display
   - clickable?: if true, block is clickable and navigates to builder
   - project-id: required if clickable, used for navigation"
  [{:keys [block-key label content clickable? project-id]}]
  (let [nav-info (get data/bmc-block-nav block-key)
        stage (:stage nav-info)
        block-label (:label nav-info label)]
    (dom/div {:className (str "bmc-block bmc-block--" (name block-key)
                              (when clickable? " bmc-block--clickable"))
              :style {:background (get data/bmc-block-colors block-key "transparent")}
              :role (when clickable? "button")
              :tabIndex (when clickable? 0)
              :onClick (when (and clickable? project-id stage)
                         (fn [_]
                           (let [encoded-id (str/replace (str project-id) "/" "~")]
                             (when-let [nav @ws/navigate-callback]
                               (nav ["project" encoded-id stage])))))
              :onKeyDown (when (and clickable? project-id stage)
                           (fn [e]
                             (when (or (= "Enter" (.-key e)) (= " " (.-key e)))
                               (.preventDefault e)
                               (let [encoded-id (str/replace (str project-id) "/" "~")]
                                 (when-let [nav @ws/navigate-callback]
                                   (nav ["project" encoded-id stage]))))))}
             (dom/div :.bmc-block-label block-label)
             (dom/div :.bmc-block-content
                      (if (seq content)
                        content
                        (dom/span :.bmc-block-empty (if clickable?
                                                      "Click to edit in builder"
                                                      "Select a template below")))))))

;; ============================================================================
;; BMC Canvas Grid
;; ============================================================================

(defn bmc-canvas
  "Renders the Business Model Canvas 9-block grid layout.
   
   template-data: map with :lean-canvas, :value-proposition, :mvp-planning keys
   template-name: string for the title
   project-id: optional, enables clickable navigation to builders"
  ([template-data template-name]
   (bmc-canvas template-data template-name nil))
  ([template-data template-name project-id]
   (let [get-val (fn [section key]
                   (when template-data
                     (get-in template-data [section key])))]
     (dom/div {:className "bmc-canvas"}
              (when template-name
                (dom/div :.bmc-canvas-title template-name))
              (dom/div {:className "bmc-grid"}
         ;; Row 1: Key Partners (spans 2) | Key Activities (top) | Value Props (spans 2) | Customer Rel (top) | Customer Segments (spans 2)
                       (bmc-block {:block-key :key-partners
                                   :label "Key Partners"
                                   :content (get-val :lean-canvas :unfair-advantage)
                                   :clickable? (some? project-id)
                                   :project-id project-id})
                       (bmc-block {:block-key :key-activities
                                   :label "Key Activities"
                                   :content (get-val :lean-canvas :solution)
                                   :clickable? (some? project-id)
                                   :project-id project-id})
                       (bmc-block {:block-key :value-props
                                   :label "Value Propositions"
                                   :content (get-val :lean-canvas :uvp)
                                   :clickable? (some? project-id)
                                   :project-id project-id})
                       (bmc-block {:block-key :customer-rel
                                   :label "Customer Relationships"
                                   :content (get-val :value-proposition :gain-creators)
                                   :clickable? (some? project-id)
                                   :project-id project-id})
                       (bmc-block {:block-key :customer-segments
                                   :label "Customer Segments"
                                   :content (get-val :lean-canvas :customer-segments)
                                   :clickable? (some? project-id)
                                   :project-id project-id})
         ;; Row 2: Key Resources (bottom) | Channels (bottom)
                       (bmc-block {:block-key :key-resources
                                   :label "Key Resources"
                                   :content (get-val :mvp-planning :must-have-features)
                                   :clickable? (some? project-id)
                                   :project-id project-id})
                       (bmc-block {:block-key :channels
                                   :label "Channels"
                                   :content (get-val :lean-canvas :channels)
                                   :clickable? (some? project-id)
                                   :project-id project-id})
         ;; Row 3: Cost Structure (left) | Revenue Streams (right)
                       (bmc-block {:block-key :cost-structure
                                   :label "Cost Structure"
                                   :content (get-val :lean-canvas :cost-structure)
                                   :clickable? (some? project-id)
                                   :project-id project-id})
                       (bmc-block {:block-key :revenue-streams
                                   :label "Revenue Streams"
                                   :content (get-val :lean-canvas :revenue-streams)
                                   :clickable? (some? project-id)
                                   :project-id project-id}))))))

;; ============================================================================
;; BMC Container Component (Fulcro)
;; ============================================================================

(defsc BMCView
  "Standalone BMC view component for use in other pages."
  [this {:keys [template-data template-name project-id]}]
  {:query [:template-data :template-name :project-id]
   :ident (fn [] [:component/id :bmc-view])}
  (bmc-canvas template-data template-name project-id))

(def ui-bmc-view (comp/factory BMCView))
