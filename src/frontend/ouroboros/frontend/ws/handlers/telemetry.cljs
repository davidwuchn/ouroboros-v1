(ns ouroboros.frontend.ws.handlers.telemetry
  "Handler for :telemetry/event and :builder-session/update messages."
  (:require
   [ouroboros.frontend.ws.state :as state]
   [ouroboros.frontend.ws.dispatch :as dispatch]))

(defn- event-type?
  "Check if event type matches, handling both keywords and strings."
  [event-data expected-kw]
  (let [evt (:event event-data)]
    (or (= evt expected-kw)
        (= evt (name expected-kw)))))

(defmethod dispatch/handle-message :telemetry/event
  [{:keys [data]}]
  (js/console.log "Telemetry event received:" data)
  (when-let [state-atom @state/app-state-atom]
    (let [normalized {:event/id (or (:event/id data) (str (random-uuid)))
                      :event/timestamp (or (:event/timestamp data) (str (js/Date.)))
                      :event/extra data}
          event-kw (or (:event data) (:event/type data))]
      (swap! state-atom update-in [:telemetry/events] (fnil conj []) normalized)
      (swap! state-atom (fn [s]
                          (-> s
                              (update-in [:page/id :telemetry :telemetry/events]
                                         (fn [events]
                                           (vec (cons normalized (take 49 events)))))
                              (update-in [:page/id :telemetry :telemetry/total-events] (fnil inc 0))
                              (cond->
                                (or (= event-kw :tool/invoke) (= event-kw "tool/invoke"))
                                (update-in [:page/id :telemetry :telemetry/tool-invocations] (fnil inc 0))
                                ;; Count ECA activity events (includes assistant responses when tools were likely used)
                                (contains? #{:eca/assistant-response
                                             :eca/chat-complete
                                             :ws/eca-tool-call
                                             :ws/eca-tool-auto-approved
                                             :ws/eca-tool-confirmation-required
                                             :eca/tool-approved
                                             :eca/tool-rejected}
                                           event-kw)
                                (update-in [:page/id :telemetry :telemetry/eca-tool-invocations] (fnil inc 0))
                                (false? (:success? data))
                                (update-in [:page/id :telemetry :telemetry/errors] (fnil inc 0)))))))
    (state/schedule-render!)))

(defmethod dispatch/handle-message :builder-session/update
  [{:keys [session-id data]}]
  (js/console.log "Builder session update received:" session-id data)
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom assoc-in [:builder-session/data session-id] data)))
