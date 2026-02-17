(ns ouroboros.frontend.ui.wisdom.resize
  "Resizable drawer logic with localStorage persistence.
   
   Usage:
   (let [[width active? start-resize!] (use-resizable-drawer :category 720)]
     ...)
   "
  (:require
   [com.fulcrologic.fulcro.components :as comp]))

;; ============================================================================
;; Constants
;; ============================================================================

(def ^:private default-drawer-width 720)
(def ^:private min-drawer-width 400)
(def ^:private max-drawer-width-vw 95)

;; ============================================================================
;; localStorage Persistence
;; ============================================================================

(defn- pref-get
  "Read a JSON-serialized value from localStorage."
  [k default-val]
  (try
    (when-let [raw (.getItem js/localStorage k)]
      (js->clj (js/JSON.parse raw) :keywordize-keys true))
    (catch :default _ default-val)))

(defn- pref-set
  "Write a value to localStorage as JSON."
  [k v]
  (try
    (.setItem js/localStorage k (js/JSON.stringify (clj->js v)))
    (catch :default _ nil)))

(defn- drawer-width-key
  "Generate localStorage key for drawer type."
  [drawer-type]
  (str "ouroboros.drawer-width." (name drawer-type)))

(defn get-drawer-width
  "Get persisted drawer width or default."
  [drawer-type]
  (let [w (pref-get (drawer-width-key drawer-type) default-drawer-width)]
    (if (number? w) w default-drawer-width)))

(defn save-drawer-width!
  "Persist drawer width to localStorage."
  [drawer-type width]
  (pref-set (drawer-width-key drawer-type) width))

(defn clamp-drawer-width
  "Clamp width between min and max viewport percentage."
  [w]
  (let [max-px (* (.-innerWidth js/window) (/ max-drawer-width-vw 100))]
    (max min-drawer-width (min w max-px))))

;; ============================================================================
;; Resize Logic
;; ============================================================================

(defn start-resize!
  "Begin resizing a drawer. Sets up mousemove/mouseup listeners.
   Returns the new width on each mousemove (side-effect: updates component state)."
  [this drawer-type start-x start-width on-width-change]
  (let [on-move (fn [e]
                  (.preventDefault e)
                  (let [dx (- (.-clientX e) start-x)
                        ;; Dragging left edge: moving left = wider
                        new-w (clamp-drawer-width (- start-width dx))]
                    (comp/set-state! this {:resize/width new-w
                                           :resize/active? true})
                    (when on-width-change
                      (on-width-change new-w))))
        on-up (fn on-up-fn [_e]
                (let [final-w (comp/get-state this :resize/width)]
                  (when (number? final-w)
                    (save-drawer-width! drawer-type final-w))
                  (comp/set-state! this {:resize/active? false})
                  (.removeEventListener js/window "mousemove"
                                        (comp/get-state this :resize/move-fn))
                  (.removeEventListener js/window "mouseup" on-up-fn)))]
    (comp/set-state! this {:resize/move-fn on-move})
    (.addEventListener js/window "mousemove" on-move)
    (.addEventListener js/window "mouseup" on-up)))

(defn use-resizable-drawer
  "Hook-like function for resizable drawer state.
   Returns map with :width, :active?, :start-fn.
   
   Usage in component:
   (let [{:keys [width active? start-fn]} (use-resizable-drawer this :category)]
     ...)"
  [this drawer-type]
  (let [width (or (comp/get-state this :resize/width)
                  (get-drawer-width drawer-type))
        active? (boolean (comp/get-state this :resize/active?))]
    {:width width
     :active? active?
     :start-fn (fn [e start-width]
                 (.preventDefault e)
                 (.stopPropagation e)
                 (start-resize! this drawer-type (.-clientX e) start-width nil))}))

;; ============================================================================
;; Resize Handle Component
;; ============================================================================

(defn drawer-resize-handle
  "Renders the left-edge drag handle for a drawer."
  [this drawer-type current-width]
  (let [start-fn (fn [e]
                   (.preventDefault e)
                   (.stopPropagation e)
                   (start-resize! this drawer-type (.-clientX e) current-width nil))]
    (com.fulcrologic.fulcro.dom/div
      {:className "wisdom-drawer-resize-handle"
       :onMouseDown start-fn})))