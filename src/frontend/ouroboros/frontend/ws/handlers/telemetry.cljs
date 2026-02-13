(ns ouroboros.frontend.ws.handlers.telemetry
  "Handler for :telemetry/event and :builder-session/update messages."
  (:require
   [ouroboros.frontend.ws.state :as state]
   [ouroboros.frontend.ws.dispatch :as dispatch]))

(defmethod dispatch/handle-message :telemetry/event
  [{:keys [data]}]
  (js/console.log "Telemetry event received:" data)
  (when-let [state-atom @state/app-state-atom]
    (let [normalized {:event/id (or (:event/id data) (str (random-uuid)))
                      :event/timestamp (or (:event/timestamp data) (str (js/Date.)))
                      :event/extra data}]
      (swap! state-atom update-in [:telemetry/events] (fnil conj []) normalized)
      (swap! state-atom (fn [s]
                          (-> s
                              (update-in [:page/id :telemetry :telemetry/events]
                                         (fn [events]
                                           (vec (cons normalized (take 49 events)))))
                              (update-in [:page/id :telemetry :telemetry/total-events] (fnil inc 0))
                              (cond->
                                (= :tool/invoke (:event data))
                                (update-in [:page/id :telemetry :telemetry/tool-invocations] (fnil inc 0))
                                (false? (:success? data))
                                (update-in [:page/id :telemetry :telemetry/errors] (fnil inc 0)))))))
    (state/schedule-render!)))

(defmethod dispatch/handle-message :builder-session/update
  [{:keys [session-id data]}]
  (js/console.log "Builder session update received:" session-id data)
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom assoc-in [:builder-session/data session-id] data)))
