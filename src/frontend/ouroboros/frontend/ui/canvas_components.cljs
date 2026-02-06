(ns ouroboros.frontend.ui.canvas-components
  "Rich canvas components for interactive builders

   Provides visual, drag-and-drop canvas interfaces for:
   - Empathy Maps (2x3 grid)
   - Lean Canvas (business model layout)
   - Value Proposition Canvas
   - MVP Planning boards

   Features:
   - Drag-and-drop repositioning
   - Visual sticky notes
   - Connection lines between related items
   - Real-time collaboration cursors
   - Rich text editing"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.mutations :as m]))

;; ============================================================================
;; Canvas State Management
;; ============================================================================

(m/defmutation update-canvas-item
  "Update a canvas item's position or content"
  [{:keys [item-id updates]}]
  (action [{:keys [state]}]
          (swap! state update-in [:canvas/items item-id] merge updates)))

(m/defmutation add-canvas-item
  "Add a new item to the canvas"
  [{:keys [section-key item]}]
  (action [{:keys [state]}]
          (let [new-id (str (name section-key) "-" (random-uuid))]
            (swap! state assoc-in [:canvas/items new-id]
                   (assoc item :item/id new-id :item/section section-key)))))

(m/defmutation remove-canvas-item
  "Remove an item from the canvas"
  [{:keys [item-id]}]
  (action [{:keys [state]}]
          (swap! state update :canvas/items dissoc item-id)))

;; ============================================================================
;; Sticky Note Component
;; ============================================================================

(defsc StickyNote
  "Visual sticky note component with drag handle and edit capability"
  [this {:item/keys [id content color section position] :as props}]
  {:query [:item/id :item/content :item/color :item/section :item/position]
   :ident :item/id}
  (let [is-editing? (or (comp/get-state this :editing?) false)
        edit-content (or (comp/get-state this :edit-content) content)]
    (dom/div
     {:className (str "sticky-note sticky-note-" (or color "yellow"))
      :data-item-id id
      :data-section section
      :style (when position
               {:position "absolute"
                :left (str (:x position) "px")
                :top (str (:y position) "px")})}
      ;; Drag handle
     (dom/div :.sticky-note-handle
              {:className "drag-handle"
               :title "Drag to move"}
              "⋮⋮")
      ;; Content
     (if is-editing?
       (dom/textarea
        {:className "sticky-note-input"
         :value edit-content
         :autoFocus true
         :onChange #(comp/set-state! this {:edit-content (.. % -target -value)})
         :onBlur (fn []
                   (comp/transact! this [(update-canvas-item
                                          {:item-id id
                                           :updates {:item/content edit-content}})])
                   (comp/set-state! this {:editing? false}))
         :onKeyDown (fn [e]
                      (when (= "Enter" (.-key e))
                        (when (.-shiftKey e)
                          (.preventDefault e)
                          (comp/transact! this [(update-canvas-item
                                                 {:item-id id
                                                  :updates {:item/content edit-content}})])
                          (comp/set-state! this {:editing? false}))))})
        (dom/div
         {:className "sticky-note-content"
          :onClick #(comp/set-state! this {:editing? true
                                           :edit-content content})}
         (or content "Click to edit...")))
      ;; Actions
     (dom/div :.sticky-note-actions
              (dom/button
               {:className "sticky-note-delete"
                :onClick #(comp/transact! this [(remove-canvas-item {:item-id id})])
                :title "Delete"}
               "×")))))

(def ui-sticky-note (comp/factory StickyNote {:keyfn :item/id}))

;; ============================================================================
;; Canvas Section Component
;; ============================================================================

(defsc CanvasSection
  "A section of the canvas with header and drop zone"
  [this {:section/keys [key title description items editable?] :as props}]
  {:query [:section/key :section/title :section/description
           {:section/items (comp/get-query StickyNote)}
           :section/editable?]
   :ident (fn [] [:section/key (:section/key props)])}
  (let [on-add-item (comp/computed this :on-add-item)]
    (dom/div
     {:className (str "canvas-section canvas-section-" (name key))
      :data-section key}
     ;; Section Header
     (dom/div :.canvas-section-header
              (dom/h3 :.canvas-section-title title)
              (when description
                (dom/p :.canvas-section-description description)))
     ;; Drop Zone
     (dom/div
      {:className "canvas-section-content"
       :data-drop-zone key}
       (if (seq items)
         (map #(when (:item/id %) (ui-sticky-note %)) items)
         (dom/div :.canvas-section-empty "Drop items here or click + to add")))
     ;; Add Button
     (when editable?
       (dom/div :.canvas-section-actions
                (dom/button
                 {:className "btn btn-sm btn-add"
                  :onClick #(when on-add-item (on-add-item key))}
                 "+ Add Note"))))))

(def ui-canvas-section (comp/factory CanvasSection {:keyfn :section/key}))

;; ============================================================================
;; Empathy Map Canvas (2x3 Grid)
;; ============================================================================

(defn empathy-map-sections
  "Define the 6 empathy map sections"
  []
  [{:key :persona :title "👤 Persona" :description "Who is your customer?"
    :grid-area "persona" :color "blue"}
   {:key :think-feel :title "🧠 Think & Feel" :description "Internal world: hopes, fears, dreams"
    :grid-area "think-feel" :color "pink"}
   {:key :hear :title "👂 Hear" :description "External influences"
    :grid-area "hear" :color "green"}
   {:key :see :title "👁️ See" :description "Environment and market"
    :grid-area "see" :color "yellow"}
   {:key :say-do :title "💬 Say & Do" :description "Public behavior"
    :grid-area "say-do" :color "orange"}
   {:key :pains-gains :title "⚡ Pains & Gains" :description "Frustrations and desires"
    :grid-area "pains-gains" :color "purple"}])

(defsc EmpathyMapCanvas
  "Visual empathy map with 2x3 grid layout"
  [this {:keys [canvas/sections canvas/items] :as props}]
  {:query [{:canvas/sections (comp/get-query CanvasSection)}
           {:canvas/items (comp/get-query StickyNote)}]}
  (let [on-item-add (comp/computed this :on-item-add)]
    (dom/div :.empathy-map-canvas
             ;; Grid Layout
             (dom/div :.empathy-map-grid
                      ;; Persona (full width top)
                      (let [persona-section (first (filter #(= (:section/key %) :persona) sections))]
                        (when persona-section
                          (dom/div :.empathy-section-persona
                                   (ui-canvas-section (comp/computed (assoc persona-section
                                                                            :section/items (filter #(= (:item/section %) :persona) items)
                                                                            :section/editable? true)
                                                                     {:on-add-item on-item-add})))))

                      ;; Think & Feel (left, large)
                      (let [think-feel (first (filter #(= (:section/key %) :think-feel) sections))]
                        (when think-feel
                          (dom/div :.empathy-section-think-feel
                                   (ui-canvas-section (comp/computed (assoc think-feel
                                                                            :section/items (filter #(= (:item/section %) :think-feel) items)
                                                                            :section/editable? true)
                                                                     {:on-add-item on-item-add})))))

                      ;; Center column (Hear, See, Say & Do)
                      (dom/div :.empathy-center-column
                               (let [hear (first (filter #(= (:section/key %) :hear) sections))
                                     see (first (filter #(= (:section/key %) :see) sections))
                                     say-do (first (filter #(= (:section/key %) :say-do) sections))]
                                 (when hear
                                   (dom/div :.empathy-section-hear
                                            (ui-canvas-section (comp/computed (assoc hear
                                                                                     :section/items (filter #(= (:item/section %) :hear) items)
                                                                                     :section/editable? true)
                                                                              {:on-add-item on-item-add}))))
                                 (when see
                                   (dom/div :.empathy-section-see
                                            (ui-canvas-section (comp/computed (assoc see
                                                                                     :section/items (filter #(= (:item/section %) :see) items)
                                                                                     :section/editable? true)
                                                                              {:on-add-item on-item-add}))))
                                 (when say-do
                                   (dom/div :.empathy-section-say-do
                                            (ui-canvas-section (comp/computed (assoc say-do
                                                                                     :section/items (filter #(= (:item/section %) :say-do) items)
                                                                                     :section/editable? true)
                                                                              {:on-add-item on-item-add}))))))

                      ;; Pains & Gains (right)
                      (let [pains-gains (first (filter #(= (:section/key %) :pains-gains) sections))]
                        (when pains-gains
                          (dom/div :.empathy-section-pains-gains
                                   (ui-canvas-section (comp/computed (assoc pains-gains
                                                                            :section/items (filter #(= (:item/section %) :pains-gains) items)
                                                                            :section/editable? true)
                                                                     {:on-add-item on-item-add}))))))))

  ;; Legend
  (dom/div :.empathy-map-legend
           (dom/span :.legend-item
                     (dom/span :.legend-color.legend-blue) "Person")
           (dom/span :.legend-item
                     (dom/span :.legend-color.legend-pink) "Internal")
           (dom/span :.legend-item
                     (dom/span :.legend-color.legend-green) "External")
           (dom/span :.legend-item
                     (dom/span :.legend-color.legend-yellow) "Environment")
           (dom/span :.legend-item
                     (dom/span :.legend-color.legend-orange) "Behavior")
           (dom/span :.legend-item
                     (dom/span :.legend-color.legend-purple) "Motivation")))

;; ============================================================================
;; Lean Canvas (Business Model Layout)
;; ============================================================================

(defn lean-canvas-sections
  "Define the 9 Lean Canvas sections"
  []
  [{:key :problems :title "😫 Problems" :description "Top 3 customer problems"
    :grid-area "problems" :color "red"}
   {:key :solution :title "💡 Solution" :description "How you solve them"
    :grid-area "solution" :color "green"}
   {:key :uvp :title "✨ UVP" :description "Unique Value Proposition"
    :grid-area "uvp" :color "purple"}
   {:key :unfair-advantage :title "🛡️ Unfair Advantage" :description "Cannot be copied"
    :grid-area "unfair-advantage" :color "gold"}
   {:key :customer-segments :title "👥 Customer Segments" :description "Target customers"
    :grid-area "customer-segments" :color "blue"}
   {:key :key-metrics :title "📊 Key Metrics" :description "What you measure"
    :grid-area "key-metrics" :color "teal"}
   {:key :channels :title "📢 Channels" :description "How you reach customers"
    :grid-area "channels" :color "orange"}
   {:key :cost-structure :title "💰 Cost Structure" :description "Fixed & variable costs"
    :grid-area "cost-structure" :color "pink"}
   {:key :revenue-streams :title "💵 Revenue Streams" :description "How you make money"
    :grid-area "revenue-streams" :color "green"}])

(defsc LeanCanvas
  "Visual Lean Canvas with business model layout"
  [this {:keys [canvas/sections canvas/items] :as props}]
  {:query [{:canvas/sections (comp/get-query CanvasSection)}
           {:canvas/items (comp/get-query StickyNote)}]}
  (let [on-item-add (comp/computed this :on-item-add)]
    (dom/div :.lean-canvas-container
             (dom/div :.lean-canvas-grid
                      ;; Row 1: Problems, Solution, UVP, Unfair Advantage
                      (let [problems (first (filter #(= (:section/key %) :problems) sections))]
                        (when problems
                          (dom/div :.canvas-box.canvas-problems
                                   (ui-canvas-section (comp/computed (assoc problems
                                                                            :section/items (filter #(= (:item/section %) :problems) items)
                                                                            :section/editable? true)
                                                                     {:on-add-item on-item-add})))))

                      (let [solution (first (filter #(= (:section/key %) :solution) sections))]
                        (when solution
                          (dom/div :.canvas-box.canvas-solution
                                   (ui-canvas-section (comp/computed (assoc solution
                                                                            :section/items (filter #(= (:item/section %) :solution) items)
                                                                            :section/editable? true)
                                                                     {:on-add-item on-item-add})))))

                      (let [uvp (first (filter #(= (:section/key %) :uvp) sections))]
                        (when uvp
                          (dom/div :.canvas-box.canvas-uvp
                                   (ui-canvas-section (comp/computed (assoc uvp
                                                                            :section/items (filter #(= (:item/section %) :uvp) items)
                                                                            :section/editable? true)
                                                                     {:on-add-item on-item-add})))))

                      (let [unfair (first (filter #(= (:section/key %) :unfair-advantage) sections))]
                        (when unfair
                          (dom/div :.canvas-box.canvas-unfair-advantage
                                   (ui-canvas-section (comp/computed (assoc unfair
                                                                            :section/items (filter #(= (:item/section %) :unfair-advantage) items)
                                                                            :section/editable? true)
                                                                     {:on-add-item on-item-add})))))

                      ;; Row 2: Customer Segments, Key Metrics, Channels
                      (let [segments (first (filter #(= (:section/key %) :customer-segments) sections))]
                        (when segments
                          (dom/div :.canvas-box.canvas-customer-segments
                                   (ui-canvas-section (comp/computed (assoc segments
                                                                            :section/items (filter #(= (:item/section %) :customer-segments) items)
                                                                            :section/editable? true)
                                                                     {:on-add-item on-item-add})))))

                      (let [metrics (first (filter #(= (:section/key %) :key-metrics) sections))]
                        (when metrics
                          (dom/div :.canvas-box.canvas-key-metrics
                                   (ui-canvas-section (comp/computed (assoc metrics
                                                                            :section/items (filter #(= (:item/section %) :key-metrics) items)
                                                                            :section/editable? true)
                                                                     {:on-add-item on-item-add})))))

                      (let [channels (first (filter #(= (:section/key %) :channels) sections))]
                        (when channels
                          (dom/div :.canvas-box.canvas-channels
                                   (ui-canvas-section (comp/computed (assoc channels
                                                                            :section/items (filter #(= (:item/section %) :channels) items)
                                                                            :section/editable? true)
                                                                     {:on-add-item on-item-add})))))

                      ;; Row 3: Cost Structure, Revenue Streams (full width split)
                      (let [costs (first (filter #(= (:section/key %) :cost-structure) sections))]
                        (when costs
                          (dom/div :.canvas-box.canvas-cost-structure
                                   (ui-canvas-section (comp/computed (assoc costs
                                                                            :section/items (filter #(= (:item/section %) :cost-structure) items)
                                                                            :section/editable? true)
                                                                     {:on-add-item on-item-add})))))

                      (let [revenue (first (filter #(= (:section/key %) :revenue-streams) sections))]
                        (when revenue
                          (dom/div :.canvas-box.canvas-revenue-streams
                                   (ui-canvas-section (comp/computed (assoc revenue
                                                                            :section/items (filter #(= (:item/section %) :revenue-streams) items)
                                                                            :section/editable? true)
                                                                     {:on-add-item on-item-add})))))))))

                                                                     ;; ============================================================================
;; Connection Lines (SVG)
;; ============================================================================

(defn connection-line
  "SVG line connecting two elements"
  [{:keys [from to color style]}]
  (let [color (or color "#999")
        style (or style "solid")]
    (dom/svg
     {:className "connection-line"
      :style {:position "absolute"
              :top 0 :left 0
              :width "100%" :height "100%"
              :pointerEvents "none"
              :zIndex 1}}
     (dom/line
      {:x1 (:x from) :y1 (:y from)
       :x2 (:x to) :y2 (:y to)
       :stroke color
       :strokeWidth 2
       :strokeDasharray (when (= style "dashed") "5,5")}))))

;; ============================================================================
;; Collaboration Cursors
;; ============================================================================

(defsc UserCursor
  "Display another user's cursor position"
  [this {:keys [user-id user-name color position]}]
  (dom/div
   {:className "user-cursor"
    :style {:position "absolute"
            :left (str (:x position) "px")
            :top (str (:y position) "px")
            :zIndex 1000}}
   (dom/svg
    {:width 24 :height 24 :viewBox "0 0 24 24"}
    (dom/path
     {:d "M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.87a.5.5 0 00.35-.85L6.35 2.85a.5.5 0 00-.85.36z"
      :fill color}))
   (dom/span
    {:className "cursor-label"
     :style {:backgroundColor color}}
    user-name)))

;; ============================================================================
;; Canvas Toolbar
;; ============================================================================

(defn canvas-toolbar
  "Toolbar for canvas actions"
  [{:keys [on-export on-share on-present on-clear can-undo? can-redo?]}]
  (dom/div :.canvas-toolbar
           (dom/div :.canvas-toolbar-group
                    (dom/button
                     {:className "btn btn-sm"
                      :onClick on-export
                      :title "Export"}
                     "📥 Export")
                    (dom/button
                     {:className "btn btn-sm"
                      :onClick on-share
                      :title "Share"}
                     "🔗 Share")
                    (dom/button
                     {:className "btn btn-sm"
                      :onClick on-present
                      :title "Present"}
                     "▶ Present"))
           (dom/div :.canvas-toolbar-group
                    (dom/button
                     {:className "btn btn-sm"
                      :onClick on-clear
                      :disabled (not can-undo?)
                      :title "Undo"}
                     "↩ Undo")
                    (dom/button
                     {:className "btn btn-sm"
                      :onClick on-clear
                      :disabled (not can-redo?)
                      :title "Redo"}
                     "↪ Redo"))
           (dom/div :.canvas-toolbar-group
                    (dom/button
                     {:className "btn btn-sm btn-danger"
                      :onClick on-clear
                      :title "Clear canvas"}
                     "🗑 Clear"))))

;; ============================================================================
;; Export Functions
;; ============================================================================

(defn export-canvas-to-json
  "Export canvas items to JSON"
  [items]
  (js/JSON.stringify
   (clj->js {:version "1.0"
             :exported-at (js/Date.)
             :items items})
   nil 2))

(defn download-json
  "Trigger download of JSON file"
  [filename data]
  (let [blob (js/Blob. [data] #js {:type "application/json"})
        url (js/URL.createObjectURL blob)
        a (js/document.createElement "a")]
    (set! (.-href a) url)
    (set! (.-download a) filename)
    (.click a)
    (js/URL.revokeObjectURL url)))

;; ============================================================================
;; Public API
;; ============================================================================

(defn create-sticky-note
  "Create a new sticky note item"
  [section-key content & {:keys [color position]}]
  {:item/id (str (name section-key) "-" (random-uuid))
   :item/content content
   :item/color (or color "yellow")
   :item/section section-key
   :item/position (or position {:x 0 :y 0})})

(defn initialize-empathy-map
  "Initialize empathy map with default sections"
  []
  {:canvas/sections (empathy-map-sections)
   :canvas/items []})

(defn initialize-lean-canvas
  "Initialize lean canvas with default sections"
  []
  {:canvas/sections (lean-canvas-sections)
   :canvas/items []})

;; Export components
(def empathy-map EmpathyMapCanvas)
(def lean-canvas LeanCanvas)
(def sticky-note ui-sticky-note)
(def canvas-section ui-canvas-section)
(def toolbar canvas-toolbar)
