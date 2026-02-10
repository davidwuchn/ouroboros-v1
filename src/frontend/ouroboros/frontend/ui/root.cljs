(ns ouroboros.frontend.ui.root
  "Root component - application shell"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [ouroboros.frontend.app :refer [app]]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.ui.chat-panel :as chat]
   [ouroboros.frontend.ui.pages.dashboard :as dashboard]
   [ouroboros.frontend.ui.pages.telemetry :as telemetry]
    [ouroboros.frontend.ui.pages.projects :as projects]
   [ouroboros.frontend.ui.pages.project-detail :as project-detail]
   [ouroboros.frontend.ui.pages.empathy-builder :as empathy-builder]
   [ouroboros.frontend.ui.pages.value-prop-builder :as value-prop-builder]
   [ouroboros.frontend.ui.pages.mvp-builder :as mvp-builder]
    [ouroboros.frontend.ui.pages.lean-canvas-builder :as lean-canvas-builder]
    [ouroboros.frontend.ui.pages.wisdom :as wisdom]
    [goog.events :as gevents]
   [goog.events.EventType :as event-type]))

;; ============================================================================
;; Navigation Handler
;; ============================================================================

(defn navigate-to
  "Navigate to a route using the global app instance.
   Accepts a string (single segment) or vector of segments."
  [route]
  (if (vector? route)
    (dr/change-route! app route)
    (dr/change-route! app [route])))

;; ============================================================================
;; Router
;; ============================================================================

(dr/defrouter MainRouter [this props]
   {:router-targets
    [dashboard/DashboardPage
     telemetry/TelemetryPage
     projects/ProjectsPage
    project-detail/ProjectDetailPage
    empathy-builder/EmpathyBuilderPage
    value-prop-builder/ValuePropBuilderPage
     mvp-builder/MVPBuilderPage
     lean-canvas-builder/LeanCanvasBuilderPage
     wisdom/WisdomPage]
   :ident (fn [] [:router/id :main-router])})

(def ui-main-router (comp/factory MainRouter {:keyfn :router-id}))

;; ============================================================================
;; Root Component
;; ============================================================================

(defsc Root
  [this {:keys [main-router chat-panel]}]
  {:query         [{:main-router (comp/get-query MainRouter)}
                   {:chat-panel (comp/get-query chat/ChatPanel)}]
   :initial-state (fn [_]
                    {:main-router (comp/get-initial-state MainRouter {:router-id :main-router})
                     :chat-panel (comp/get-initial-state chat/ChatPanel {})})

   :componentDidMount
   (fn [this]
     ;; Global keyboard shortcuts
     (let [handler (fn [e]
                     (let [chat-open? (get-in (comp/props this) [:chat-panel :chat/open?])]
                       (cond
                         ;; Ctrl+/ to toggle chat
                         (and (.-ctrlKey e) (= "/" (.-key e)))
                         (do (.preventDefault e)
                             (comp/transact! this [(chat/toggle-chat {})]))

                         ;; Escape to close chat (when open)
                         (and (= "Escape" (.-key e)) chat-open?)
                         (do (.preventDefault e)
                             (comp/transact! this [(chat/close-chat {})]))

                         ;; Ctrl+L to clear chat (when open)
                         (and (.-ctrlKey e) (= "l" (.-key e)) chat-open?)
                         (do (.preventDefault e)
                             (comp/transact! this [(chat/clear-chat {})])))))]
       (let [key (gevents/listen js/document event-type/KEYDOWN handler)]
         (comp/set-state! this {:kbd-listener-key key}))))

   :componentWillUnmount
   (fn [this]
     (when-let [key (:kbd-listener-key (comp/get-state this))]
       (gevents/unlistenByKey key)))}

  (let [current-route (dr/current-route app)
        active-route (first current-route)
        chat-open? (:chat/open? chat-panel)]
    (dom/div :.app-container
             (ui/navbar
              {:active-route (or active-route "dashboard")
               :on-navigate navigate-to
               :on-toggle-chat #(comp/transact! this [(chat/toggle-chat {})])
               :chat-open? chat-open?})
              (dom/main {:className (str "main-content " (when chat-open? "main-content-shifted"))}
                        (ui-main-router main-router))
             ;; Global chat sidebar (pass current route as context)
             (chat/ui-chat-panel (assoc chat-panel :chat/context current-route)))))
