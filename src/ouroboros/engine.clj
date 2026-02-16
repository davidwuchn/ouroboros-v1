(ns ouroboros.engine
  "Engine (∅) - Statechart substrate for the system lifecycle
   
   States: uninitialized → initializing → running → stopped
   Query: Statechart as source of truth for system state"
   (:require
    [com.fulcrologic.statecharts :as sc]
    [com.fulcrologic.statecharts.chart :refer [statechart]]
    [com.fulcrologic.statecharts.elements :refer [state transition]]
    [com.fulcrologic.statecharts.events :refer [new-event]]
    [com.fulcrologic.statecharts.protocols :as sp]
    [com.fulcrologic.statecharts.simple :as simple]
    [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Statechart Definition - The System Itself
;; ============================================================================

(def system-chart
  "The Ouroboros system lifecycle as a statechart"
  (statechart
   {}
   (state {:id ::system
           :initial ::uninitialized}
          (state {:id ::uninitialized}
                 (transition {:event ::initialize
                              :target ::initializing}))

          (state {:id ::initializing
                  :on-entry [(fn [_ _]
                               (println "⚒ System: initializing..."))]}
                 (transition {:event ::initialized
                              :target ::running}))

          (state {:id ::running
                  :on-entry [(fn [_ _] (println "✓ System: running"))]}
                 (transition {:event ::stop
                              :target ::stopped}))

          (state {:id ::stopped
                  :on-entry [(fn [_ _] (println "· System: stopped"))]}
                 (transition {:event ::initialize
                              :target ::initializing})))))

;; ============================================================================
;; Runtime Instance
;; ============================================================================

(defonce system-instance (atom nil))

(defn create-session
  "Create a new statechart session for the system"
  []
  (let [env (simple/simple-env)
        _ (simple/register! env ::system system-chart)
        processor (::sc/processor env)
        session (sp/start! processor env ::system {::sc/session-id ::ouroboros})]
    {:env env
     :session session
     :state (atom session)}))

(defn boot!
  "Boot the Engine - transition from uninitialized → running"
  []
  (when-not @system-instance
    (println "⊢ Creating Engine session...")
    (let [{:keys [env] :as inst} (create-session)
          processor (::sc/processor env)]
      (reset! system-instance inst)
      ;; Trigger initialization - capture returned session with updated state
      (let [session-after-init (sp/process-event! processor env (:session inst) (new-event ::initialize))]
        (telemetry/log-state-transition ::uninitialized ::initializing ::initialize)
        (Thread/sleep 50) ;; Allow transition
        (let [session-running (sp/process-event! processor env session-after-init (new-event ::initialized))]
          (telemetry/log-state-transition ::initializing ::running ::initialized)
          ;; Update the instance with final session
          (swap! system-instance assoc :session session-running)
          (println "✓ Engine: running")
          @system-instance)))))

(defn stop!
  "Stop the Engine"
  []
  (when-let [{:keys [env session]} @system-instance]
    (let [processor (::sc/processor env)]
      (sp/process-event! processor env session (new-event ::stop))
      (telemetry/log-state-transition ::running ::stopped ::stop)
      (reset! system-instance nil))))

;; ============================================================================
;; Query Interface - What Pathom will call
;; ============================================================================

(defn current-state
  "Get the current system state from the statechart"
  []
  (when-let [{:keys [session]} @system-instance]
    (::sc/configuration session)))

(defn system-status
  "Human-readable status"
  []
  (let [state (current-state)]
    {:state state
     :running? (contains? state ::running)
     :ready? (contains? state ::running)}))

(defn healthy?
  "Is the system in a healthy state?"
  []
  (let [state (current-state)]
    (or (contains? state ::running)
        (contains? state ::initializing))))

(comment
  ;; Test the Engine
  (boot!)
  (current-state)
  (system-status)
  (healthy?)
  (stop!))