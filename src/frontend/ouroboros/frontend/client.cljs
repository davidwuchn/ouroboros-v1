(ns ouroboros.frontend.client
  "Client entry point"
  (:require
   [com.fulcrologic.fulcro.application :as app]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [ouroboros.frontend.app :refer [app init-websocket! destroy-websocket!]]
   [ouroboros.frontend.websocket :as ws]
   [ouroboros.frontend.ui.root :as root]))

(defn ^:export init
  "Shadow-cljs entry point"
  []
  ;; Mount the app with initial state
  (app/mount! app root/Root "app" {:initialize-state? true})
  
  ;; Navigate to project page after mount (auto-detected workspace project)
  ;; Use requestAnimationFrame to ensure DOM and state are ready
  (js/requestAnimationFrame
    (fn []
      (dr/change-route! app ["projects"])
      (js/console.log "Routing initialized to project page")))
  
  ;; Initialize WebSocket for real-time updates
  (init-websocket!)
  (js/console.log "Ouroboros Dashboard initialized"))

(defn ^:export refresh
  "Hot reload callback"
  []
  (app/mount! app root/Root "app" {:initialize-state? false})
  ;; Re-set render callback (defonce preserves atom, but callback may be stale)
  (ws/set-render-callback! #(app/schedule-render! app))
  (js/console.log "Hot reload"))

(defn ^:export stop
  "Cleanup on application stop"
  []
  (destroy-websocket!)
  (js/console.log "Ouroboros Dashboard stopped"))
