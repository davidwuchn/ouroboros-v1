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
   [com.fulcrologic.fulcro.mutations :as m]
   [goog.events :as gevents]
   [goog.events.EventType :as event-type]))

;; ============================================================================
;; Section Matching (defensive against string/keyword mismatch after JSON)
;; ============================================================================

(defn- section-matches?
  "Check if a note's :item/section matches the given section key.
   Tolerates both keyword and string values for :item/section since JSON
   round-trip via WebSocket converts keywords to strings."
  [note section-key]
  (let [note-section (:item/section note)]
    (or (= note-section section-key)
        (= (name note-section) (name section-key)))))

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
  [this {:item/keys [id content color section position] :as _props}]
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
;; Editable Sticky Note (callback-driven, no hardcoded mutations)
;; ============================================================================

(defsc EditableStickyNote
  "Sticky note with click-to-edit inline editing.
   Accepts :on-save (fn [note-id new-content]) and :on-delete (fn [note-id])
   via computed props."
  [this {:item/keys [id content color] :as _props}]
  {:query [:item/id :item/content :item/color :item/section :item/position]
   :ident :item/id
   :initLocalState (fn [_ _] {:editing? false :edit-content ""})}
  (let [editing? (comp/get-state this :editing?)
        edit-content (comp/get-state this :edit-content)
        {:keys [on-save on-delete]} (comp/get-computed this)
        finish-edit (fn []
                      (let [trimmed (when edit-content (.trim edit-content))]
                        (when (and on-save (seq trimmed) (not= trimmed content))
                          (on-save id trimmed))
                        (comp/set-state! this {:editing? false})))]
    (dom/div
     {:className (str "sticky-note sticky-note-" (or color "yellow")
                      (when editing? " sticky-note-editing"))
      :data-item-id (str id)}
     ;; Content area: textarea when editing, div when reading
     (if editing?
       (dom/textarea
        {:className "sticky-note-edit-input"
         :value (or edit-content "")
         :autoFocus true
         :onChange #(comp/set-state! this {:edit-content (.. % -target -value)})
         :onBlur (fn [_] (finish-edit))
         :onKeyDown (fn [e]
                      (cond
                        ;; Shift+Enter: save and close
                        (and (= "Enter" (.-key e)) (.-shiftKey e))
                        (do (.preventDefault e) (finish-edit))
                        ;; Escape: cancel edit
                        (= "Escape" (.-key e))
                        (comp/set-state! this {:editing? false})))})
       (dom/div
        {:className "sticky-note-content sticky-note-clickable"
         :onClick #(comp/set-state! this {:editing? true
                                          :edit-content (or content "")})
         :title "Click to edit"}
        (or content "Click to edit...")))
     ;; Delete button (always visible on hover via CSS)
     (when on-delete
       (dom/button
        {:className "sticky-note-delete-btn"
         :onClick (fn [e]
                    (.stopPropagation e)
                    (on-delete id))
         :title "Delete note"}
        "x")))))

(def ui-editable-sticky-note (comp/factory EditableStickyNote {:keyfn :item/id}))

;; ============================================================================
;; Canvas Section Component
;; ============================================================================

(defsc CanvasSection
  "A section of the canvas with header, hints, and drop zone"
  [this {:section/keys [key title description hint items editable?] :as _props}]
  {:query [:section/key :section/title :section/description :section/hint
           {:section/items (comp/get-query StickyNote)}
           :section/editable?]
   :ident (fn [] [:section/key key])}
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
        (map ui-sticky-note (filter :item/id items))
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
  "Define the 6 empathy map sections. Descriptions are structural labels.
   Hints left empty -- ECA provides contextual guidance via section-hints."
  []
  [{:key :persona :title "👤 Persona"
    :description "Who is your ideal customer?"
    :hint ""
    :grid-area "persona" :color "blue"}
   {:key :think-feel :title "🧠 Think & Feel"
    :description "What's going on in their head?"
    :hint ""
    :grid-area "think-feel" :color "pink"}
   {:key :hear :title "👂 Hear"
    :description "What do others tell them?"
    :hint ""
    :grid-area "hear" :color "green"}
   {:key :see :title "👁️ See"
    :description "What's in their environment?"
    :hint ""
    :grid-area "see" :color "yellow"}
   {:key :say-do :title "💬 Say & Do"
    :description "Their behavior in public."
    :hint ""
    :grid-area "say-do" :color "orange"}
   {:key :pains-gains :title "⚡ Pains & Gains"
    :description "What frustrates them? What does success look like?"
    :hint ""
    :grid-area "pains-gains" :color "purple"}])

(defn- render-canvas-section
  "Render a single canvas section as plain DOM.
   When opts contains :on-item-edit and/or :on-item-delete, notes become
   click-to-edit inline with a delete button. Otherwise notes are read-only."
  ([section on-add-item] (render-canvas-section section on-add-item nil))
  ([{:section/keys [key title description hint items editable?]} on-add-item opts]
   (let [key-str (if (keyword? key) (name key) (str key))
         {:keys [on-item-edit on-item-delete]} opts
         editable-notes? (or on-item-edit on-item-delete)]
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
         (if editable-notes?
            ;; Editable: use EditableStickyNote with callbacks
           (map (fn [item]
                  (ui-editable-sticky-note
                   (comp/computed item {:on-save on-item-edit
                                        :on-delete on-item-delete})))
                (filter :item/id items))
            ;; Read-only: simple divs
           (map (fn [item]
                  (dom/div {:key (:item/id item)
                            :className (str "sticky-note sticky-note-" (or (:item/color item) "yellow"))}
                           (dom/div :.sticky-note-content (:item/content item))))
                (filter :item/id items)))
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
                  "+ Add Note")))))))

(defn render-empathy-map
  "Visual empathy map with 2x3 grid layout (plain function, no defsc).
   Accepts optional :on-item-edit (fn [note-id new-content]) and
   :on-item-delete (fn [note-id]) to make notes editable."
  [{:keys [sections items on-item-add on-item-edit on-item-delete]}]
  (let [find-section (fn [k] (first (filter #(= (:section/key %) k) sections)))
        items-for (fn [k] (filter #(section-matches? % k) items))
        edit-opts (when (or on-item-edit on-item-delete)
                    {:on-item-edit on-item-edit
                     :on-item-delete on-item-delete})
        render-section (fn [section-key]
                         (when-let [section (find-section section-key)]
                           (render-canvas-section
                            (assoc section
                                   :section/items (items-for section-key)
                                   :section/editable? true)
                            on-item-add
                            edit-opts)))]
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
  "Define the 9 Lean Canvas sections. Descriptions are structural labels.
   ECA provides richer guidance via section-hints content type."
  []
  [{:key :problems :title "😫 Problems" :description "Top 3 customer problems"
    :grid-area "problems" :color "red"}
   {:key :solution :title "💡 Solution" :description "How you solve them"
    :grid-area "solution" :color "green"}
   {:key :uvp :title "✨ UVP" :description "Unique Value Proposition"
    :grid-area "uvp" :color "purple"}
   {:key :unfair-advantage :title "🛡️ Unfair Advantage" :description "What cannot be copied"
    :grid-area "unfair-advantage" :color "gold"}
   {:key :customer-segments :title "👥 Customer Segments" :description "Target customers"
    :grid-area "customer-segments" :color "blue"}
   {:key :key-metrics :title "📊 Key Metrics" :description "What you measure"
    :grid-area "key-metrics" :color "teal"}
   {:key :channels :title "📢 Channels" :description "How you reach customers"
    :grid-area "channels" :color "orange"}
   {:key :cost-structure :title "💰 Cost Structure" :description "Fixed and variable costs"
    :grid-area "cost-structure" :color "pink"}
   {:key :revenue-streams :title "💵 Revenue Streams" :description "How you make money"
    :grid-area "revenue-streams" :color "green"}])

(defn render-lean-canvas
  "Visual Lean Canvas with business model layout (plain function)"
  [{:keys [sections items on-item-add on-item-edit on-item-delete]}]
  (let [find-section (fn [k] (first (filter #(= (:section/key %) k) sections)))
        items-for (fn [k] (filter #(section-matches? % k) items))
        edit-opts (when (or on-item-edit on-item-delete)
                    (cond-> {}
                      on-item-edit   (assoc :on-item-edit on-item-edit)
                      on-item-delete (assoc :on-item-delete on-item-delete)))
        render-box (fn [section-key css-class]
                     (when-let [section (find-section section-key)]
                       (dom/div {:className (str "canvas-box " css-class)}
                                (render-canvas-section
                                 (assoc section
                                        :section/items (items-for section-key)
                                        :section/editable? true)
                                 on-item-add
                                 edit-opts))))]
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
;; Value Proposition Canvas (2-column: Customer Profile | Value Map)
;; ============================================================================

(defn value-prop-sections
  "Define the 6 Value Proposition Canvas sections.
   Left side: Customer Profile (Jobs, Pains, Gains)
   Right side: Value Map (Products, Pain Relievers, Gain Creators)"
  []
  [{:key :customer-job :title "🎯 Customer Job"
    :description "What job is the customer trying to get done?"
    :grid-area "customer-job" :color "blue"}
   {:key :pains :title "😫 Customer Pains"
    :description "What frustrates them about current solutions?"
    :grid-area "pains" :color "red"}
   {:key :gains :title "🌟 Customer Gains"
    :description "What outcomes do they desire?"
    :grid-area "gains" :color "green"}
   {:key :products :title "📦 Products & Services"
    :description "What will you offer?"
    :grid-area "products" :color "purple"}
   {:key :pain-relievers :title "💊 Pain Relievers"
    :description "How does your product reduce pains?"
    :grid-area "pain-relievers" :color "orange"}
   {:key :gain-creators :title "🚀 Gain Creators"
    :description "How does your product create gains?"
    :grid-area "gain-creators" :color "teal"}])

(defn render-value-prop-canvas
  "Visual Value Proposition Canvas with 2-column layout.
   Left: Customer Profile (circle). Right: Value Map (square).
   Accepts :on-item-edit and :on-item-delete for editable notes."
  [{:keys [sections items on-item-add on-item-edit on-item-delete]}]
  (let [find-section (fn [k] (first (filter #(= (:section/key %) k) sections)))
        items-for (fn [k] (filter #(section-matches? % k) items))
        edit-opts (when (or on-item-edit on-item-delete)
                    {:on-item-edit on-item-edit
                     :on-item-delete on-item-delete})
        render-box (fn [section-key css-class]
                     (when-let [section (find-section section-key)]
                       (dom/div {:className (str "vp-canvas-box " css-class)}
                                (render-canvas-section
                                 (assoc section
                                        :section/items (items-for section-key)
                                        :section/editable? true)
                                 on-item-add
                                 edit-opts))))]
    (dom/div :.value-prop-canvas-container
             ;; Column labels
             (dom/div :.vp-canvas-labels
                      (dom/div :.vp-label-customer "Customer Profile")
                      (dom/div :.vp-label-value "Value Map"))
             (dom/div :.value-prop-canvas-grid
                      ;; Left side: Customer Profile
                      (dom/div :.vp-customer-profile
                               (render-box :customer-job "vp-customer-job")
                               (render-box :pains "vp-pains")
                               (render-box :gains "vp-gains"))
                      ;; Right side: Value Map
                      (dom/div :.vp-value-map
                               (render-box :products "vp-products")
                               (render-box :pain-relievers "vp-pain-relievers")
                               (render-box :gain-creators "vp-gain-creators"))))))

;; ============================================================================
;; MVP Planning Canvas (structured grid)
;; ============================================================================

(defn mvp-sections
  "Define the 8 MVP Planning sections in a structured grid."
  []
  [{:key :core-problem :title "🎯 Core Problem"
    :description "The ONE problem to solve"
    :grid-area "core-problem" :color "red"}
   {:key :target-user :title "👤 Target User"
    :description "Your first specific customer"
    :grid-area "target-user" :color "blue"}
   {:key :success-metric :title "📊 Success Metric"
    :description "How you measure success"
    :grid-area "success-metric" :color "teal"}
   {:key :must-have-features :title "✅ Must-Have Features"
    :description "Essential features only"
    :grid-area "must-have" :color "green"}
   {:key :nice-to-have :title "💭 Nice-to-Have (V2)"
    :description "Features for later"
    :grid-area "nice-to-have" :color "yellow"}
   {:key :out-of-scope :title "🚫 Out of Scope"
    :description "What you won't build"
    :grid-area "out-of-scope" :color "pink"}
   {:key :timeline :title "📅 Timeline"
    :description "Your launch deadline"
    :grid-area "timeline" :color "purple"}
   {:key :risks :title "⚠️ Risks & Assumptions"
    :description "What could go wrong"
    :grid-area "risks" :color "orange"}])

(defn render-mvp-canvas
  "Visual MVP Planning Canvas with structured grid.
   Top row: Core Problem (wide), Target User, Success Metric
   Middle row: Must-Have (wide), Nice-to-Have, Out of Scope
   Bottom row: Timeline, Risks
   Accepts :on-item-edit and :on-item-delete for editable notes."
  [{:keys [sections items on-item-add on-item-edit on-item-delete]}]
  (let [find-section (fn [k] (first (filter #(= (:section/key %) k) sections)))
        items-for (fn [k] (filter #(section-matches? % k) items))
        edit-opts (when (or on-item-edit on-item-delete)
                    {:on-item-edit on-item-edit
                     :on-item-delete on-item-delete})
        render-box (fn [section-key css-class]
                     (when-let [section (find-section section-key)]
                       (dom/div {:className (str "mvp-canvas-box " css-class)}
                                (render-canvas-section
                                 (assoc section
                                        :section/items (items-for section-key)
                                        :section/editable? true)
                                 on-item-add
                                 edit-opts))))]
    (dom/div :.mvp-canvas-container
             (dom/div :.mvp-canvas-grid
                      ;; Row 1: Problem definition
                      (render-box :core-problem "mvp-core-problem")
                      (render-box :target-user "mvp-target-user")
                      (render-box :success-metric "mvp-success-metric")
                      ;; Row 2: Feature scoping
                      (render-box :must-have-features "mvp-must-have")
                      (render-box :nice-to-have "mvp-nice-to-have")
                      (render-box :out-of-scope "mvp-out-of-scope")
                      ;; Row 3: Execution
                      (render-box :timeline "mvp-timeline")
                      (render-box :risks "mvp-risks")))))

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
  [_this {:keys [_user-id user-name color position]}]
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
  [{:keys [on-export on-share on-present on-clear on-undo on-redo can-undo? can-redo?]}]
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
                      :onClick on-undo
                      :disabled (not can-undo?)
                      :title "Undo"}
                     "↩ Undo")
                    (dom/button
                     {:className "btn btn-sm"
                      :onClick on-redo
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
;; Present Mode (Fullscreen Read-Only View)
;; ============================================================================

(defn- present-note-card
  "Render a single note as a clean presentation card"
  [{:item/keys [content color]}]
  (dom/div {:className (str "present-note present-note-" (or color "yellow"))}
           (dom/p :.present-note-content content)))

(defn- present-section-panel
  "Render a section with its notes for presentation"
  [{:keys [title icon notes]}]
  (dom/div :.present-section
           (dom/div :.present-section-header
                    (dom/span :.present-section-icon icon)
                    (dom/h3 :.present-section-title title))
           (dom/div :.present-section-notes
                    (if (seq notes)
                      (map-indexed
                       (fn [idx note]
                         (dom/div {:key (or (:item/id note) (str "present-note-" idx))}
                                  (present-note-card note)))
                       notes)
                      (dom/div :.present-section-empty
                               (dom/span "No notes yet"))))))

(defsc PresentMode
  "Fullscreen presentation overlay for canvas content.
   Uses lifecycle methods for ESC key listener."
  [this {:keys [title sections notes-by-section on-exit]}]
  {:componentDidMount
   (fn [this]
     (let [handler (fn [e]
                     (when (= "Escape" (.-key e))
                       (let [{:keys [on-exit]} (comp/props this)]
                         (when on-exit (on-exit)))))
           key (gevents/listen js/document event-type/KEYDOWN handler)]
       (comp/set-state! this {:listener-key key})))

   :componentWillUnmount
   (fn [this]
     (when-let [key (:listener-key (comp/get-state this))]
       (gevents/unlistenByKey key)))}

  (dom/div :.present-overlay
           {:onClick (fn [e]
                       ;; Close when clicking the backdrop (not the content)
                       (when (= (.-target e) (.-currentTarget e))
                         (when on-exit (on-exit))))}
           (dom/div :.present-container
                    ;; Header bar
                    (dom/div :.present-header
                             (dom/h1 :.present-title title)
                             (dom/div :.present-header-actions
                                      (dom/span :.present-hint "Press ESC to exit")
                                      (dom/button
                                       {:className "btn present-exit-btn"
                                        :onClick on-exit}
                                       "x Exit")))
                    ;; Content grid
                    (dom/div :.present-grid
                             (for [{:keys [key title icon]} sections]
                               (let [section-notes (get notes-by-section key [])]
                                 (dom/div {:key (if (keyword? key) (name key) (str key))}
                                          (present-section-panel
                                           {:title title
                                            :icon icon
                                            :notes section-notes}))))))))

(def ui-present-mode (comp/factory PresentMode))

(defn present-mode
  "Convenience wrapper for PresentMode.
   Takes a map with :title, :sections [{:key :title :icon}...],
   :notes-by-section {section-key [notes...]}, and :on-exit callback."
  [props]
  (ui-present-mode props))

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

(defn initialize-value-prop
  "Initialize value proposition canvas with default sections (convert to :section/ namespace)"
  []
  {:canvas/sections (mapv (fn [{:keys [key title description grid-area color]}]
                            {:section/key key
                             :section/title title
                             :section/description description
                             :section/hint ""
                             :section/grid-area grid-area
                             :section/color color})
                          (value-prop-sections))
   :canvas/items []})

(defn initialize-mvp
  "Initialize MVP planning canvas with default sections (convert to :section/ namespace)"
  []
  {:canvas/sections (mapv (fn [{:keys [key title description grid-area color]}]
                            {:section/key key
                             :section/title title
                             :section/description description
                             :section/hint ""
                             :section/grid-area grid-area
                             :section/color color})
                          (mvp-sections))
   :canvas/items []})

;; Export components
(def empathy-map render-empathy-map)
(def lean-canvas render-lean-canvas)
(def value-prop-canvas render-value-prop-canvas)
(def mvp-canvas render-mvp-canvas)
(def sticky-note ui-sticky-note)
(def canvas-section ui-canvas-section)
(def toolbar canvas-toolbar)
(def presentation present-mode)
