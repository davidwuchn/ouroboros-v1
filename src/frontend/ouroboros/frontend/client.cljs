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
  (app/mount! app root/Root "app")
  ;; Initialize routing and navigate to dashboard
  (dr/change-route! app ["dashboard"])
  ;; Initialize WebSocket for real-time updates
  (init-websocket!)
  (js/console.log "Ouroboros Dashboard initialized"))

(defn ^:export refresh
  "Hot reload callback"
  []
  (app/mount! app root/Root "app")
  (js/console.log "Hot reload"))

(defn ^:export stop
  "Cleanup on application stop"
  []
  (destroy-websocket!)
  (js/console.log "Ouroboros Dashboard stopped"))
