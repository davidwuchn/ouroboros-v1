(ns ouroboros.frontend.client
  "Client entry point"
  (:require
   [com.fulcrologic.fulcro.application :as app]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [ouroboros.frontend.app :refer [app init-websocket! destroy-websocket!]]
   [ouroboros.frontend.ui.root :as root]))

(defn ^:export init
  "Shadow-cljs entry point"
  []
  ;; Set up initial state before mounting
  (app/set-root! app root/Root {:initialize-state? true})
  ;; Mount the app (Fulcro 3.7+ handles React 18 internally)
  (app/mount! app root/Root "app" {:initialize-state? false})
  ;; Navigate to dashboard after mount
  ;; Use requestAnimationFrame to ensure DOM and state are ready
  (js/requestAnimationFrame
    (fn []
      (dr/change-route! app ["dashboard"])
      (js/console.log "Routing initialized to dashboard")))
  ;; Initialize WebSocket for real-time updates
  (init-websocket!)
  (js/console.log "Ouroboros Dashboard initialized"))

(defn ^:export refresh
  "Hot reload callback"
  []
  (app/mount! app root/Root "app" {:initialize-state? false})
  (js/console.log "Hot reload"))

(defn ^:export stop
  "Cleanup on application stop"
  []
  (destroy-websocket!)
  (js/console.log "Ouroboros Dashboard stopped"))
