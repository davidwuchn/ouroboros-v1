(ns ouroboros.frontend.app
  "Fulcro application configuration"
  (:require
   [com.fulcrologic.fulcro.application :as app]
   [com.fulcrologic.fulcro.networking.http-remote :as http]
   [com.fulcrologic.fulcro.algorithms.merge :as merge]
   [com.fulcrologic.fulcro.components :as comp]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Application Instance
;; ============================================================================

(defonce app
  "The Fulcro application instance"
  (app/fulcro-app
   {:remotes
    {:remote (http/fulcro-http-remote {:url "/api/eql"})}

    :optimized-render! app/optimized-render!

    :global-error-action
    (fn [env error]
      (js/console.error "Global error:" error))}))

;; ============================================================================
;; WebSocket Integration
;; ============================================================================

(defn init-websocket!
  "Initialize WebSocket connection"
  []
  (ws/init!))

(defn destroy-websocket!
  "Clean up WebSocket connection"
  []
  (ws/destroy!))

;; ============================================================================
;; Convenience Functions
;; ============================================================================

(defn merge!
  "Merge data into the app state"
  [data]
  (merge/merge! app data))

(defn load!
  "Load data via EQL query"
  ([component]
   (app/load! app component {}))
  ([component params]
   (app/load! app component params)))
