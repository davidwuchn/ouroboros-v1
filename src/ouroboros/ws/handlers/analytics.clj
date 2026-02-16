(ns ouroboros.ws.handlers.analytics
  "Analytics dashboard handler - real metrics + ECA prediction streaming.

   Prompts are loaded from resources/prompts/analytics/*.md"
  (:require
   [ouroboros.analytics :as analytics]
   [ouroboros.eca-client :as eca]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.context :as ctx]
   [ouroboros.ws.prompt-loader :as pl]
   [ouroboros.ws.stream :as stream]))

(defn handle-analytics-dashboard!
  "Handle an analytics/dashboard request from the frontend.
   Returns real analytics data computed from actual project/session data."
  [client-id {:keys [project-id]}]
  (let [user-id (ctx/current-user-id)
        progress (analytics/project-progress project-id user-id)
        health (analytics/calculate-health-score project-id user-id)
        prediction (analytics/predict-success project-id user-id)
        funnel (analytics/completion-funnel)
        sessions-key (keyword (str "builder-sessions/" (name user-id)))
        all-sessions (vals (or (memory/get-value sessions-key) {}))
        project-sessions (filter #(= (:session/project-id %) project-id) all-sessions)
        time-data (mapv (fn [session]
                          (let [time-info (analytics/time-in-stage session)]
                            {:stage (:session/type session)
                             :stage/time (:stage/time-total-ms time-info)
                             :completed? (:stage/completed? time-info)}))
                        project-sessions)
        total-time (reduce + 0 (keep :stage/time time-data))]

    (conn/send-to! client-id {:type :analytics/dashboard
                              :project-id project-id
                              :data {:progress (:project/overall-percentage progress)
                                     :stages (:project/stages progress)
                                     :health-score (:health/score health)
                                     :health-factors (:health/factors health)
                                     :prediction {:likelihood (:likelihood prediction)
                                                  :confidence (:confidence prediction)
                                                  :score (:health/score prediction)}
                                     :funnel (:funnel/stages funnel)
                                     :total-users (:funnel/total-users funnel)
                                     :time-tracking {:total-time total-time
                                                     :stages time-data}}
                              :timestamp (System/currentTimeMillis)})

    ;; Also request ECA to generate a contextual prediction message
    (when (eca/alive?)
      (let [chat-id (str "ws-analytics-" client-id "-" (System/currentTimeMillis))
            listener-id (keyword (str "ws-analytics-msg-" client-id))
            context-str (ctx/assemble-project-context user-id project-id nil)
            base-prompt (pl/get-prompt :analytics :prediction)
            prompt (str base-prompt
                        "\n\nHealth score: " (:health/score health) "/100\n"
                        "Likelihood: " (name (:likelihood prediction)) "\n"
                        "Overall progress: " (:project/overall-percentage progress) "%\n\n"
                        "---\n\n" context-str)]

        (stream/stream-eca-to-client! client-id
          {:chat-id chat-id
           :listener-id listener-id
           :prompt prompt
           :token-type :analytics/prediction-token
           :done-type :analytics/prediction-done
           :extra-fields {:project-id project-id}
           :on-error (fn [error-msg]
                       (telemetry/emit! {:event :ws/analytics-prediction-error
                                         :client-id client-id
                                         :error error-msg}))})))))
