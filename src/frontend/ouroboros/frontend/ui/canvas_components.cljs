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
        edit-content (or (comp/get-state this :edit-content) content "")]
    (dom/div
     {:className (str "sticky-note sticky-note-" (or color "yellow"))
      :data-item-id (str id)
      :data-section (if (keyword? section) (name section) (str section))
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
         :value (or edit-content "")
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
  "A section of the canvas with header, hints, and drop zone"
  [this {:section/keys [key title description hint items editable?] :as props}]
  {:query [:section/key :section/title :section/description :section/hint
           {:section/items (comp/get-query StickyNote)}
           :section/editable?]
   :ident (fn [] [:section/key (:section/key props)])}
  (let [on-add-item (comp/computed this :on-add-item)
        key-str (if (keyword? key) (name key) (str key))]
    (dom/div
     {:className (str "canvas-section canvas-section-" key-str)
      :data-section key-str}
     ;; Section Header
     (dom/div :.canvas-section-header
              (dom/h3 :.canvas-section-title title)
              (when description
                (dom/p :.canvas-section-description description))
              (when hint
                (dom/p :.canvas-section-hint
                       (dom/span :.hint-icon "💡")
                       hint)))
     ;; Drop Zone
     (dom/div
      {:className "canvas-section-content"
       :data-drop-zone key-str}
       (if (seq items)
         (map #(when (:item/id %) (ui-sticky-note %)) items)
         (dom/div :.canvas-section-empty
                  (dom/span :.empty-icon "+")
                  (dom/span "Click to add your first insight"))))
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
  "Define the 6 empathy map sections with enhanced guidance"
  []
  [{:key :persona :title "👤 Persona" 
    :description "Who is your ideal customer? Name, role, background."
    :hint "Be specific! 'Sarah, 32, Product Manager' > 'busy professionals'"
    :grid-area "persona" :color "blue"}
   {:key :think-feel :title "🧠 Think & Feel" 
    :description "What's going on in their head? Fears, hopes, dreams."
    :hint "Use quotes: 'I worry that...' 'I wish I could...'"
    :grid-area "think-feel" :color "pink"}
   {:key :hear :title "👂 Hear" 
    :description "What do others tell them? Boss, colleagues, media."
    :hint "Who influences their decisions?"
    :grid-area "hear" :color "green"}
   {:key :see :title "👁️ See" 
    :description "What's in their environment? Workspace, market, trends."
    :hint "What do they observe around them daily?"
    :grid-area "see" :color "yellow"}
   {:key :say-do :title "💬 Say & Do" 
    :description "Their behavior in public. Watch for contradictions!"
    :hint "What they say vs. what they actually do"
    :grid-area "say-do" :color "orange"}
   {:key :pains-gains :title "⚡ Pains & Gains" 
    :description "What frustrates them? What does success look like?"
    :hint "PAIN: obstacles | GAIN: desired outcomes"
    :grid-area "pains-gains" :color "purple"}])

(defn- render-canvas-section
  "Render a single canvas section as plain DOM (no defsc normalization)"
  [{:section/keys [key title description hint items editable?]} on-add-item]
  (let [key-str (if (keyword? key) (name key) (str key))]
    (dom/div
     {:className (str "canvas-section canvas-section-" key-str)
      :data-section key-str}
     ;; Section Header
     (dom/div :.canvas-section-header
              (dom/h3 :.canvas-section-title title)
              (when description
                (dom/p :.canvas-section-description description))
              (when hint
                (dom/p :.canvas-section-hint
                       (dom/span :.hint-icon "💡")
                       hint)))
     ;; Drop Zone
     (dom/div
      {:className "canvas-section-content"
       :data-drop-zone key-str}
      (if (seq items)
        (map (fn [item]
               (when (:item/id item)
                 (dom/div {:key (:item/id item)
                           :className (str "sticky-note sticky-note-" (or (:item/color item) "yellow"))}
                          (dom/div :.sticky-note-content (:item/content item)))))
             items)
        (dom/div :.canvas-section-empty
                 {:onClick #(when on-add-item (on-add-item key))}
                 (dom/span :.empty-icon "+")
                 (dom/span "Click to add your first insight"))))
     ;; Add Button
     (when editable?
       (dom/div :.canvas-section-actions
                (dom/button
                 {:className "btn btn-sm btn-add"
                  :onClick #(when on-add-item (on-add-item key))}
                 "+ Add Note"))))))

(defn render-empathy-map
  "Visual empathy map with 2x3 grid layout (plain function, no defsc)"
  [{:keys [sections items on-item-add]}]
  (let [find-section (fn [k] (first (filter #(= (:section/key %) k) sections)))
        items-for (fn [k] (filter #(= (:item/section %) k) items))
        render-section (fn [section-key]
                         (when-let [section (find-section section-key)]
                           (render-canvas-section
                            (assoc section
                                   :section/items (items-for section-key)
                                   :section/editable? true)
                            on-item-add)))]
    (dom/div :.empathy-map-canvas
             ;; Grid Layout
             (dom/div :.empathy-map-grid
                      ;; Persona (full width top)
                      (when (find-section :persona)
                        (dom/div :.empathy-section-persona
                                 (render-section :persona)))

                      ;; Think & Feel (left, large)
                      (when (find-section :think-feel)
                        (dom/div :.empathy-section-think-feel
                                 (render-section :think-feel)))

                      ;; Center column (Hear, See, Say & Do)
                      (dom/div :.empathy-center-column
                               (when (find-section :hear)
                                 (dom/div :.empathy-section-hear
                                          (render-section :hear)))
                               (when (find-section :see)
                                 (dom/div :.empathy-section-see
                                          (render-section :see)))
                               (when (find-section :say-do)
                                 (dom/div :.empathy-section-say-do
                                          (render-section :say-do))))

                      ;; Pains & Gains (right)
                      (when (find-section :pains-gains)
                        (dom/div :.empathy-section-pains-gains
                                 (render-section :pains-gains)))))))

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

(defn render-lean-canvas
  "Visual Lean Canvas with business model layout (plain function)"
  [{:keys [sections items on-item-add]}]
  (let [find-section (fn [k] (first (filter #(= (:section/key %) k) sections)))
        items-for (fn [k] (filter #(= (:item/section %) k) items))
        render-box (fn [section-key css-class]
                     (when-let [section (find-section section-key)]
                       (dom/div {:className (str "canvas-box " css-class)}
                                (render-canvas-section
                                 (assoc section
                                        :section/items (items-for section-key)
                                        :section/editable? true)
                                 on-item-add))))]
    (dom/div :.lean-canvas-container
             (dom/div :.lean-canvas-grid
                      (render-box :problems "canvas-problems")
                      (render-box :solution "canvas-solution")
                      (render-box :uvp "canvas-uvp")
                      (render-box :unfair-advantage "canvas-unfair-advantage")
                      (render-box :customer-segments "canvas-customer-segments")
                      (render-box :key-metrics "canvas-key-metrics")
                      (render-box :channels "canvas-channels")
                      (render-box :cost-structure "canvas-cost-structure")
                      (render-box :revenue-streams "canvas-revenue-streams")))))

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
  "Initialize empathy map with default sections (convert to :section/ namespace)"
  []
  {:canvas/sections (mapv (fn [{:keys [key title description hint grid-area color]}]
                            {:section/key key
                             :section/title title
                             :section/description description
                             :section/hint hint
                             :section/grid-area grid-area
                             :section/color color})
                          (empathy-map-sections))
   :canvas/items []})

(defn initialize-lean-canvas
  "Initialize lean canvas with default sections"
  []
  {:canvas/sections (lean-canvas-sections)
   :canvas/items []})

;; Export components
(def empathy-map render-empathy-map)
(def lean-canvas render-lean-canvas)
(def sticky-note ui-sticky-note)
(def canvas-section ui-canvas-section)
(def toolbar canvas-toolbar)
