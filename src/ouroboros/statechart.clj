;; Statechart - Formal state machine for ECA execution
;; Implements OODA loop as a statechart
(ns ouroboros.statechart
  "Statechart execution for OODA loop
   
   Provides formal state transitions, guards, and actions.
   Models the ECA execution as a state machine.
   
   Usage:
     (require '[ouroboros.statechart :as sm])
     
     (defsm eca-ooda
       {:initial :observing
        :states {:observing {:entry (fn [] (println \"Observing...\"))
                            :on {:orient :orienting}}
                 :orienting {:entry (fn [] (println \"Orienting...))
                            :on {:decide :deciding
                                 :observe :observing}}
                 :deciding {:entry (fn [] (println \"Deciding...\"))
                            :on {:act :acting
                                 :human-gate :waiting}}
                 :waiting {:entry (fn [] (println \"Waiting for human\"))
                           :on {:approve :acting
                                :reject :observing}}
                 :acting {:entry (fn [] (println \"Acting...\"))
                          :on {:learn :observing
                               :observe :observing}}}})
     
     (sm/start :eca-ooda)
     (sm/transition! :eca-ooda :orient)
     (sm/state :eca-ooda)  ;; => :orienting"
  (:require [clojure.tools.logging :as log]
            [clojure.core.async :as async]))

;; ============================================================================
;; State Machine Registry
;; ============================================================================

(defonce ^:private statecharts (atom {}))

;; ============================================================================
;; State Machine Definition
;; ============================================================================

(defn create-statechart
  "Create a statechart with states and transitions
   
   Usage:
     (create-statechart :eca-ooda
       {:initial :observing
        :states {:observing {:on {:orient :orienting}}
                 :orienting {:on {:decide :deciding}}}})
   
   State options:
     :initial - Initial state
     :states  - Map of state name to state config
     
   State config:
     :entry   - Function to run on state entry
     :exit    - Function to run on state exit
     :on      - Map of event to next state
     :guard   - Predicate to allow transition"
  [name config]
  (let [{:keys [initial states]} config
        sm {:name name
            :initial initial
            :current (atom initial)
            :states states
            :history (atom [initial])
            :listeners (atom [])}]
    (swap! statecharts assoc name sm)
    sm))

(defn statechart
  "Get a statechart by name"
  [name]
  (get @statecharts name))

(defn all-statecharts
  "Get all registered statecharts"
  []
  (keys @statecharts))

;; ============================================================================
;; State Operations
;; ============================================================================

(defn current-state
  "Get the current state of a statechart"
  [name]
  (let [sm (statechart name)]
    (when sm
      @(:current sm))))

(def state current-state)

(defn initial-state
  "Get the initial state of a statechart"
  [name]
  (let [sm (statechart name)]
    (when sm
      (:initial sm))))

(defn history
  "Get state transition history"
  [name]
  (let [sm (statechart name)]
    (when sm
      @(:history sm))))

;; ============================================================================
;; Transition
;; ============================================================================

(defn- run-entry [sm state-name]
  (when-let [state-config (get-in sm [:states state-name])]
    (when-let [entry (:entry state-config)]
      (try (entry) (catch Throwable t (log/error t "Entry error:" state-name))))))

(defn- run-exit [sm state-name]
  (when-let [state-config (get-in sm [:states state-name])]
    (when-let [exit (:exit state-config)]
      (try (exit) (catch Throwable t (log/error t "Exit error:" state-name))))))

(defn can-transition?
  "Check if a transition is valid (has guard pass)"
  [sm event]
  (let [current @(:current sm)
        state-config (get-in sm [:states current])
        transitions (:on state-config)
        next-state (get transitions event)]
    (if next-state
      (let [guard (:guard state-config)]
        (if guard
          (try (guard event)
               (catch Throwable t
                 (log/error t "Guard error")
                 false))
          true))
      false)))

(defn transition!
  "Transition a statechart to a new state via event
   
   Usage: (transition! :eca-ooda :orient)
   
   Options:
     :force - Skip guards and execute transition"
  ([name event]
   (transition! name event {}))
  ([name event {:keys [force] :or {force false}}]
   (let [sm (statechart name)]
     (when-not sm
       (throw (ex-info "Unknown statechart" {:name name})))
     
     (let [current @(:current sm)
           state-config (get-in sm [:states current])
           transitions (:on state-config)
           next-state (get transitions event)]
       
       (when-not next-state
         (log/debug "No transition for event" event "from state" current)
         {:success false :reason :no-transition :current current})
       
       ;; Check guard
       (when (and (not force) (:guard state-config))
         (let [guard-passed (try ((:guard state-config) event)
                                 (catch Throwable t
                                   (log/error t "Guard error")
                                   false))]
           (when-not guard-passed
             (log/debug "Guard blocked transition" event)
             {:success false :reason :guard-failed :current current})))
       
       ;; Execute transition
       (log/info "Statechart" name ":" current "→" next-state "via" event)
       (run-exit sm current)
       (reset! (:current sm) next-state)
       (swap! (:history sm) conj next-state)
       (run-entry sm next-state)
       
       ;; Notify listeners
       (doseq [listener @(:listeners sm)]
         (try (listener {:from current :to next-state :event event})
              (catch Throwable t (log/error t "Listener error"))))
       
       {:success true :from current :to next-state :event event})))

(defn transition
  "Transition and return new state (clojure-style)"
  [name event]
  (transition! name event)
  (current-state name))

;; ============================================================================
;; Statechart Lifecycle
;; ============================================================================

(defn start!
  "Start a statechart (run entry for initial state)"
  [name]
  (let [sm (statechart name)]
    (when-not sm
      (throw (ex-info "Unknown statechart" {:name name})))
    (let [initial (:initial sm)]
      (log/info "Starting statechart" name "at" initial)
      (run-entry sm initial)
      {:started initial})))

(defn stop!
  "Stop a statechart (run exit for current state)"
  [name]
  (let [sm (statechart name)]
    (when-not sm
      (throw (ex-info "Unknown statechart" {:name name})))
    (let [current @(:current sm)]
      (log/info "Stopping statechart" name "at" current)
      (run-exit sm current)
      (reset! (:current sm) nil)
      {:stopped current})))

(defn restart!
  "Restart a statechart"
  [name]
  (stop! name)
  (start! name))

;; ============================================================================
;; Listeners
;; ============================================================================

(defn add-listener!
  "Add a listener for state transitions
   
   Usage:
     (add-listener! :eca-ooda
       (fn [{:keys [from to event]}]
         (println \"Transitioned\" from \"→\" to)))"
  [name listener]
  (let [sm (statechart name)]
    (when sm
      (swap! (:listeners sm) conj listener)
      listener)))

(defn remove-listener!
  "Remove a state transition listener"
  [name listener]
  (let [sm (statechart name)]
    (when sm
      (swap! (:listeners sm) (fn [ls] (vec (remove #(= % listener) ls)))))))

;; ============================================================================
;; OODA Statechart Factory
;; ============================================================================

(defn create-ooda-statechart
  "Create an OODA loop statechart
   
   Usage:
     (create-ooda-statechart :trading-ooda)
     (create-ooda-statechart :eca-ooda)"
  [name]
  (create-statechart name
    {:initial :observing
     :states
     {:observing
      {:entry (fn [] (log/info "[OODA] Observing"))
       :on {:orient :orienting}}
      
      :orienting
      {:entry (fn [] (log/info "[OODA] Orienting"))
       :on {:decide :deciding
            :observe :observing}}
      
      :deciding
      {:entry (fn [] (log/info "[OODA] Deciding"))
       :on {:act :acting
            :human-gate :waiting
            :observe :observing}}
      
      :waiting
      {:entry (fn [] (log/info "[OODA] Waiting for human"))
       :on {:approve :acting
            :reject :observing
            :cancel :observing}}
      
      :acting
      {:entry (fn [] (log/info "[OODA] Acting"))
       :on {:learn :observing
            :observe :observing
            :error :observing}}}}))

;; ============================================================================
;; Debug
;; ============================================================================

(defn status
  "Get status of all statecharts"
  []
  (map (fn [[name sm]]
         {:name name
          :current @(:current sm)
          :history-size (count @(:history sm))
          :listeners (count @(:listeners sm))})
       @statecharts))

(defn valid-events
  "Get valid events from current state"
  [name]
  (let [sm (statechart name)]
    (when sm
      (let [current @(:current sm)
            state-config (get-in sm [:states current])]
        (keys (:on state-config))))))
)