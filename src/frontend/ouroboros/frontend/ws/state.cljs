(ns ouroboros.frontend.ws.state
  "Shared app state atoms and render scheduling.
   Central state reference used by all WS modules.")

;; ============================================================================
;; App State Reference
;; ============================================================================

(defonce app-state-atom (atom nil))
(defonce render-callback (atom nil))
(defonce force-render-callback (atom nil))
(defonce navigate-callback (atom nil))

;; ============================================================================
;; Render Scheduling
;; ============================================================================

(defn schedule-render!
  "Schedule a UI re-render after direct state mutation."
  []
  (when-let [cb @render-callback]
    (cb)))

(defn force-render!
  "Force a full root re-render. Use when state changes are outside
   Fulcro component queries (e.g. wisdom state read from raw atom)."
  []
  (when-let [cb @force-render-callback]
    (cb)))

;; ============================================================================
;; Setup Functions
;; ============================================================================

(defn set-render-callback!
  "Set a callback to trigger UI re-render after state mutation"
  [cb]
  (reset! render-callback cb))

(defn set-force-render-callback!
  "Set a callback to force full root re-render (bypasses Fulcro optimization)"
  [cb]
  (reset! force-render-callback cb))

(defn set-navigate-callback!
  "Set a callback for programmatic navigation: (fn [route-segments])"
  [cb]
  (reset! navigate-callback cb))
