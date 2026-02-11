(ns ouroboros.frontend.app
  "Fulcro application configuration"
  (:require
   [com.fulcrologic.fulcro.application :as app]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.networking.http-remote :as http]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Application Instance
;; ============================================================================

(defonce app
  (app/fulcro-app
   {:remotes
    {:remote (http/fulcro-http-remote {:url "/api/eql"})}

    :global-error-action
    (fn [env error]
      (js/console.error "Global error:" error))}))

;; ============================================================================
;; WebSocket Integration
;; ============================================================================

(defn init-websocket!
  "Initialize WebSocket connection"
  []
  ;; Pass the state atom and render callback for WS-driven updates
  (ws/set-app-state-atom! (::app/state-atom app))
  (ws/set-render-callback! #(app/schedule-render! app))
  (ws/set-force-render-callback! #(app/force-root-render! app))
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
  (swap! (::app/state-atom app) merge data))

(defn load!
  "Load data via EQL query"
  ([component]
   (df/load! app component {}))
  ([component params]
   (df/load! app component params)))
