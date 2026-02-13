(ns ouroboros.frontend.ws.handlers.content
  "Handlers for :content/* messages (ECA-generated content streaming)."
  (:require
   [ouroboros.frontend.ws.state :as state]
   [ouroboros.frontend.ws.cache :as cache]
   [ouroboros.frontend.ws.dispatch :as dispatch]))

(defmethod dispatch/handle-message :content/token
  [{:keys [token content-type]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom update-in
           [:content/streaming content-type] str token)
    (state/schedule-render!)))

(defmethod dispatch/handle-message :content/generated
  [{:keys [content-type content]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:content/generated content-type] content)
                 (update :content/streaming dissoc content-type)
                 (assoc-in [:content/loading? content-type] false))))
    (cache/save-content-cache! (:content/generated @state-atom))
    (state/schedule-render!)))

(defmethod dispatch/handle-message :content/error
  [{:keys [content-type error]}]
  (js/console.error "Content generation error:" content-type error)
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom assoc-in [:content/loading? content-type] false)
    (state/schedule-render!)))
