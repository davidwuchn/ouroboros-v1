(ns ouroboros.ws.dispatch
  "Data-driven WebSocket message dispatch.
   Maps message types to handler functions via a registry map."
  (:require
   [cheshire.core :as json]
   [ouroboros.eca-client :as eca]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.handlers.analytics :as analytics]
   [ouroboros.ws.handlers.builder :as builder]
   [ouroboros.ws.handlers.chat :as chat]
   [ouroboros.ws.handlers.content :as content]
   [ouroboros.ws.handlers.flywheel :as flywheel]
   [ouroboros.ws.handlers.kanban :as kanban]
   [ouroboros.ws.handlers.learning :as learning]
   [ouroboros.ws.handlers.wisdom :as wisdom]))

;; ============================================================================
;; Handler Registry
;; ============================================================================

(def ^:private handler-registry
  "Data-driven dispatch map: message type string -> handler config.
   :handler - function (fn [client-id message])
   :async?  - if true, runs in a future"
  {"subscribe"               {:handler (fn [id msg]
                                         (conn/subscribe! id (:topic msg)))
                              :async? false}
   "unsubscribe"             {:handler (fn [id msg]
                                         (conn/unsubscribe! id (:topic msg)))
                              :async? false}
   "ping"                    {:handler (fn [id _msg]
                                         (conn/send-to! id {:type :pong
                                                            :timestamp (System/currentTimeMillis)}))
                              :async? false}
   "eca/chat"                {:handler chat/handle-eca-chat!
                              :async? true}
   "eca/wisdom"              {:handler wisdom/handle-eca-wisdom!
                              :async? true}
   "eca/tip-detail"          {:handler wisdom/handle-eca-tip-detail!
                              :async? true}
   "eca/debug"               {:handler (fn [id msg]
                                         (let [enabled? (boolean (:enabled? msg))]
                                           (telemetry/emit! {:event :eca/debug-toggle
                                                             :enabled? enabled?
                                                             :client-id id})
                                           (try
                                             (eca/stop!)
                                             (eca/start! {:debug? enabled?})
                                             (conn/send-to! id {:type :eca/debug-status
                                                                :enabled? enabled?
                                                                :timestamp (System/currentTimeMillis)})
                                             (catch Exception e
                                               (telemetry/emit! {:event :eca/debug-toggle-error
                                                                  :enabled? enabled?
                                                                  :client-id id
                                                                  :error (.getMessage e)})
                                               (conn/send-to! id {:type :eca/debug-status
                                                                   :enabled? enabled?
                                                                   :error (.getMessage e)
                                                                   :timestamp (System/currentTimeMillis)})))))
                              :async? true}
   "flywheel/progress"       {:handler flywheel/handle-flywheel-progress!
                              :async? false}
   "builder/save-data"       {:handler builder/handle-save-builder-data!
                              :async? false}
   "builder/apply-template"  {:handler builder/handle-apply-template!
                              :async? false}
   "learning/save-examples"  {:handler learning/handle-learning-save-examples!
                              :async? false}
   "learning/categories"     {:handler learning/handle-learning-categories!
                              :async? false}
   "learning/category-insights" {:handler learning/handle-learning-category-insights!
                                 :async? false}
   "wisdom/template"         {:handler learning/handle-wisdom-template!
                              :async? false}
   "learning/flywheel"       {:handler learning/handle-learning-flywheel!
                              :async? false}
   "learning/due-reviews"    {:handler learning/handle-learning-due-reviews!
                              :async? false}
   "learning/complete-review" {:handler learning/handle-learning-complete-review!
                               :async? false}
   "learning/skip-review"    {:handler learning/handle-learning-skip-review!
                              :async? false}
   "learning/search"         {:handler learning/handle-learning-search!
                              :async? false}
   "kanban/board"            {:handler kanban/handle-kanban-board!
                              :async? false}
   "analytics/dashboard"     {:handler analytics/handle-analytics-dashboard!
                              :async? true}
   "content/generate"        {:handler content/handle-content-generate!
                              :async? true}
   "eca/approve-tool"        {:handler chat/approve-tool!
                              :async? false}
   "eca/reject-tool"         {:handler chat/reject-tool!
                              :async? false}
   "eca/load-skills"         {:handler chat/handle-load-skills!
                              :async? false}})

;; ============================================================================
;; Message Dispatch
;; ============================================================================

(defn handle-message
  "Handle incoming WebSocket message via data-driven dispatch."
  [id message-str]
  (try
    (let [message (json/parse-string message-str keyword)
          msg-type (:type message)]
      (if-let [{:keys [handler async?]} (get handler-registry msg-type)]
        (if async?
          (future (handler id message))
          (handler id message))
        (println "Unknown message type from client" id ":" msg-type)))
    (catch Exception e
      (println "WebSocket message error from client" id ":" (.getMessage e)))))
