(ns ouroboros.frontend.websocket
  "WebSocket client facade -- thin re-export layer for backward compatibility.
   
   All implementation lives in ouroboros.frontend.ws.* modules:
     ws/state       - App state atoms, render scheduling
     ws/defaults    - Pre-filled wisdom/tip content (pure data)
     ws/cache       - localStorage persistence
     ws/connection  - Connect/disconnect/send
     ws/dispatch    - Multimethod message dispatch
     ws/api         - Public request-* functions
     ws/lifecycle   - Init/destroy, ping, subscriptions
     ws/handlers/*  - Message handlers by domain"
  (:require
   [ouroboros.frontend.ws.state :as state]
   [ouroboros.frontend.ws.defaults :as defaults]
   [ouroboros.frontend.ws.cache :as cache]
   [ouroboros.frontend.ws.connection :as conn]
   [ouroboros.frontend.ws.api :as api]
   [ouroboros.frontend.ws.lifecycle :as lifecycle]
   ;; Handler registrations (side-effecting requires)
   [ouroboros.frontend.ws.handlers.telemetry]
   [ouroboros.frontend.ws.handlers.chat]
   [ouroboros.frontend.ws.handlers.wisdom]
   [ouroboros.frontend.ws.handlers.builder :as builder-handler]
   [ouroboros.frontend.ws.handlers.analytics]
   [ouroboros.frontend.ws.handlers.content]
   [ouroboros.frontend.ws.handlers.learning]))

;; ============================================================================
;; Wire up late-bound send! for builder handler (breaks circular dep)
;; ============================================================================

(builder-handler/set-send-fn! conn/send!)

;; ============================================================================
;; App State (re-exports from ws/state)
;; ============================================================================

(def app-state-atom state/app-state-atom)
(def render-callback state/render-callback)
(def navigate-callback state/navigate-callback)

(defn set-app-state-atom!
  "Set the app state atom for merging data and hydrate all caches."
  [sa]
  (reset! state/app-state-atom sa)
  (cache/hydrate-caches! sa))

(def set-render-callback! state/set-render-callback!)
(def set-force-render-callback! state/set-force-render-callback!)
(def set-navigate-callback! state/set-navigate-callback!)
(def schedule-render! state/schedule-render!)
(def force-render! state/force-render!)

;; ============================================================================
;; Default Caches (re-exports from ws/defaults)
;; ============================================================================

(def default-wisdom-cache defaults/default-wisdom-cache)
(def default-tip-detail-cache defaults/default-tip-detail-cache)

;; ============================================================================
;; Connection (re-exports from ws/connection)
;; ============================================================================

(def connected? conn/connected?)
(def status conn/status)
(def send! conn/send!)

;; ============================================================================
;; API (re-exports from ws/api)
;; ============================================================================

(def request-wisdom! api/request-wisdom!)
(def request-eca-debug! api/request-eca-debug!)
(def request-tip-detail! api/request-tip-detail!)
(def request-flywheel-progress! api/request-flywheel-progress!)
(def request-kanban-board! api/request-kanban-board!)
(def request-analytics! api/request-analytics!)
(def request-content! api/request-content!)
(def request-learning-save-examples! api/request-learning-save-examples!)
(def request-wisdom-template! api/request-wisdom-template!)
(def request-learning-categories! api/request-learning-categories!)
(def request-category-insights! api/request-category-insights!)
(def save-builder-data! api/save-builder-data!)
(def merge-builder-data-into-state! builder-handler/merge-builder-data-into-state!)

;; ============================================================================
;; Lifecycle (re-exports from ws/lifecycle)
;; ============================================================================

(def subscribe! lifecycle/subscribe!)
(def unsubscribe! lifecycle/unsubscribe!)
(def subscribe-builder-session! lifecycle/subscribe-builder-session!)
(def unsubscribe-builder-session! lifecycle/unsubscribe-builder-session!)
(def init! lifecycle/init!)
(def destroy! lifecycle/destroy!)
