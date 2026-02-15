(ns ouroboros.frontend.ws.handlers.chat
  "Handlers for :eca/chat-* and :eca/debug-status messages."
  (:require
   [ouroboros.frontend.ws.state :as state]
   [ouroboros.frontend.ws.dispatch :as dispatch]))

(defn- cancel-chat-timeout!
  "Cancel pending chat timeout if one exists"
  [state-atom]
  (when-let [timeout-id (get-in @state-atom [:chat/id :global :chat/timeout-id])]
    (js/clearTimeout timeout-id)
    (swap! state-atom assoc-in [:chat/id :global :chat/timeout-id] nil)))

(defmethod dispatch/handle-message :eca/chat-response
  [{:keys [text]}]
  (when-let [state-atom @state/app-state-atom]
    ;; Cancel timeout since response arrived
    (cancel-chat-timeout! state-atom)
    (let [messages (get-in @state-atom [:chat/id :global :chat/messages] [])
          idx (dec (count messages))]
      (when (and (>= idx 0)
                 (= :assistant (:role (nth messages idx)))
                 (:streaming? (nth messages idx)))
        (swap! state-atom
               (fn [s]
                 (-> s
                     (assoc-in [:chat/id :global :chat/messages idx]
                               {:role :assistant
                                :content text
                                :timestamp (js/Date.now)})
                     (assoc-in [:chat/id :global :chat/loading?] false))))
        (state/schedule-render!)))))

(defmethod dispatch/handle-message :eca/chat-token
  [{:keys [token]}]
  (when-let [state-atom @state/app-state-atom]
    ;; Cancel timeout since content is arriving
    (cancel-chat-timeout! state-atom)
    (let [messages (get-in @state-atom [:chat/id :global :chat/messages] [])
          idx (dec (count messages))]
      (when (and (>= idx 0)
                 (= :assistant (:role (nth messages idx))))
        (swap! state-atom update-in
               [:chat/id :global :chat/messages idx :content] str token)
        (state/schedule-render!)))))

(defmethod dispatch/handle-message :eca/chat-done
  [_]
  (when-let [state-atom @state/app-state-atom]
    ;; Cancel timeout since response is complete
    (cancel-chat-timeout! state-atom)
    (let [messages (get-in @state-atom [:chat/id :global :chat/messages] [])
          idx (dec (count messages))]
      (when (and (>= idx 0)
                 (= :assistant (:role (nth messages idx))))
        (swap! state-atom
               (fn [s]
                 (-> s
                     (update-in [:chat/id :global :chat/messages idx] dissoc :streaming?)
                     (assoc-in [:chat/id :global :chat/loading?] false))))
        (state/schedule-render!)))))

(defmethod dispatch/handle-message :eca/chat-error
  [{:keys [error]}]
  (when-let [state-atom @state/app-state-atom]
    ;; Cancel timeout since we have an error from backend
    (cancel-chat-timeout! state-atom)
    (let [messages (get-in @state-atom [:chat/id :global :chat/messages] [])
          idx (dec (count messages))]
      (when (and (>= idx 0)
                 (= :assistant (:role (nth messages idx))))
        (swap! state-atom
               (fn [s]
                 (-> s
                     (update-in [:chat/id :global :chat/messages idx]
                                assoc
                                :error? true
                                :streaming? false
                                :content (or error "Something went wrong. Click retry to try again."))
                     (assoc-in [:chat/id :global :chat/loading?] false))))
        (state/schedule-render!)))))

(defmethod dispatch/handle-message :eca/debug-status
  [{:keys [enabled? error]}]
  (when error
    (js/console.warn "ECA debug toggle failed:" error))
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom assoc-in [:page/id :telemetry :debug/enabled?] (boolean enabled?))
    (state/schedule-render!)))
