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
  
  ;; Initialize WebSocket for real-time updates
  ;; Navigate callback auto-routes to project detail once WS detects the workspace project
  (ws/set-navigate-callback! #(dr/change-route! app %))
  (init-websocket!)
  (js/console.log "Ouroboros Dashboard initialized"))

(defn ^:export refresh
  "Hot reload callback"
  []
  (app/mount! app root/Root "app" {:initialize-state? false})
  ;; Re-set render callback (defonce preserves atom, but callback may be stale)
  (ws/set-render-callback! #(app/schedule-render! app))
  (ws/set-force-render-callback! #(app/force-root-render! app))
  (js/console.log "Hot reload"))

(defn ^:export stop
  "Cleanup on application stop"
  []
  (destroy-websocket!)
  (js/console.log "Ouroboros Dashboard stopped"))
