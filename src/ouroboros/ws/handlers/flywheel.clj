(ns ouroboros.ws.handlers.flywheel
  "Flywheel progress computation and handler."
  (:require
   [ouroboros.memory :as memory]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.context :as ctx]))

(defn compute-flywheel-progress
  "Compute flywheel progress for a project from its builder sessions.
   Returns a map with :phases (status per phase) and :current-step (recommended next phase)."
  [user-id project-id]
  (let [key (keyword (str "builder-sessions/" (name user-id)))
        sessions (vals (or (memory/get-value key) {}))
        project-sessions (filter #(= (:session/project-id %) project-id) sessions)
        by-type (group-by :session/type project-sessions)
        phase-status (mapv (fn [phase]
                             (let [sessions (get by-type phase [])
                                   completed? (some #(= (:session/state %) :completed) sessions)
                                   active? (some #(= (:session/state %) :active) sessions)]
                               {:phase phase
                                :label (get ctx/phase-labels phase (name phase))
                                :status (cond completed? :completed
                                              active? :active
                                              :else :not-started)
                                :session-count (count sessions)}))
                           ctx/phase-order)
        current-step (or (->> phase-status
                              (filter #(not= :completed (:status %)))
                              first
                              :phase)
                         :lean-canvas)]
    {:phases phase-status
     :current-step current-step
     :completed-count (count (filter #(= :completed (:status %)) phase-status))
     :total-phases (count ctx/phase-order)}))

(defn handle-flywheel-progress!
  "Handle a flywheel/progress request from the frontend.
   Returns computed flywheel progress for a project."
  [client-id {:keys [project-id]}]
  (let [user-id (ctx/current-user-id)
        progress (compute-flywheel-progress user-id project-id)]
    (conn/send-to! client-id {:type :flywheel/progress
                              :project-id project-id
                              :progress progress
                              :timestamp (System/currentTimeMillis)})))
