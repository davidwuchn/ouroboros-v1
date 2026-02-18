;; Statechart Registry - Register all system statecharts
;; Based on ASSESSMENT: "5 registered statecharts with coordinator"
(ns ouroboros.statecharts
  "Statechart Registry - Register all system statecharts
   
   Usage:
     (require '[ouroboros.statecharts :as statecharts])
     (statecharts/start-all)
     (statecharts/status)"
  (:require [clojure.tools.logging :as log]
            [ouroboros.statechart :as sm]))

;; ============================================================================
;; Statechart Definitions
;; ============================================================================

(defn register-statecharts!
  "Register all system statecharts"
  []
  ;; ECA OODA Loop
  (sm/create-statechart :eca-ooda
    {:initial :observing
     :states
     {:observing
      {:entry (fn [] (log/info "[ECA] Observing"))
       :on {:orient :orienting}}
      
      :orienting
      {:entry (fn [] (log/info "[ECA] Orienting"))
       :on {:decide :deciding
            :observe :observing}}
      
      :deciding
      {:entry (fn [] (log/info "[ECA] Deciding"))
       :on {:act :acting
            :human-gate :waiting
            :observe :observing}}
      
      :waiting
      {:entry (fn [] (log/info "[ECA] Waiting for human"))
       :on {:approve :acting
            :reject :observing
            :cancel :observing}}
      
      :acting
      {:entry (fn [] (log/info "[ECA] Acting"))
       :on {:learn :observing
            :observe :observing
            :error :observing}}}})
  
  ;; Approval Workflow
  (sm/create-statechart :approval-workflow
    {:initial :pending
     :states
     {:pending
      {:entry (fn [] (log/info "[Approval] Pending"))
       :on {:approve :approved
            :reject :rejected}}
      
      :approved
      {:entry (fn [] (log/info "[Approval] Approved - executing"))
       :on {:execute :executing
            :cancel :cancelled}}
      
      :rejected
      {:entry (fn [] (log/info "[Approval] Rejected"))
       :on {:retry :pending}}
      
      :executing
      {:entry (fn [] (log/info "[Approval] Executing"))
       :on {:complete :complete
            :error :failed}}
      
      :complete
      {:entry (fn [] (log/info "[Approval] Complete"))}
      
      :failed
      {:entry (fn [] (log/info "[Approval] Failed"))
       :on {:retry :pending}}
      
      :cancelled
      {:entry (fn [] (log/info "[Approval] Cancelled"))}}})
  
  ;; Builder Session (Empathy → ValueProp → MVP → Canvas)
  (sm/create-statechart :builder-session
    {:initial :empathy
     :states
     {:empathy
      {:entry (fn [] (log/info "[Builder] Empathy Map"))
       :on {:complete :value-prop
            :save :empathy}}
      
      :value-prop
      {:entry (fn [] (log/info "[Builder] Value Proposition"))
       :on {:complete :mvp
            :back :empathy
            :save :value-prop}}
      
      :mvp
      {:entry (fn [] (log/info "[Builder] MVP Canvas"))
       :on {:complete :canvas
            :back :value-prop
            :save :mvp}}
      
      :canvas
      {:entry (fn [] (log/info "[Builder] Lean Canvas"))
       :on {:complete :complete
            :back :mvp
            :save :canvas}}
      
      :complete
      {:entry (fn [] (log/info "[Builder] Session Complete"))}}})
  
  ;; Chat Flow
  (sm/create-statechart :chat-flow
    {:initial :idle
     :states
     {:idle
      {:entry (fn [] (log/info "[Chat] Idle"))
       :on {:message :processing}}
      
      :processing
      {:entry (fn [] (log/info "[Chat] Processing"))
       :on {:respond :responding
            :eca :eca-prompt
            :error :error}}
      
      :eca-prompt
      {:entry (fn [] (log/info "[Chat] ECA Prompt"))
       :on {:response :responding
            :tool-approve :tool-approve
            :tool-reject :processing
            :error :error}}
      
      :tool-approve
      {:entry (fn [] (log/info "[Chat] Tool Approved"))
       :on {:complete :responding
            :error :error}}
      
      :responding
      {:entry (fn [] (log/info "[Chat] Responding"))
       :on {:done :idle}}
      
      :error
      {:entry (fn [] (log/info "[Chat] Error - recovering"))
       :on {:retry :processing
            :give-up :idle}}}})
  
  ;; Signal Collector (for event processing)
  (sm/create-statechart :signal-collector
    {:initial :collecting
     :states
     {:collecting
      {:entry (fn [] (log/info "[Signal] Collecting"))
       :on {:analyze :analyzing
            :flush :flushing}}
      
      :analyzing
      {:entry (fn [] (log/info "[Signal] Analyzing"))
       :on {:emit :emitting
            :collect :collecting}}
      
      :emitting
      {:entry (fn [] (log/info "[Signal] Emitting"))
       :on {:done :collecting}}
      
      :flushing
      {:entry (fn [] (log/info "[Signal] Flushing"))
       :on {:done :collecting}}}})
  
  (log/info "[Statecharts] Registered 5 system statecharts")
  [:eca-ooda :approval-workflow :builder-session :chat-flow :signal-collector])

;; ============================================================================
;; Bulk Operations
;; ============================================================================

(defn start-all
  "Register and start all statecharts"
  []
  (register-statecharts!)
  (doseq [name [:eca-ooda :approval-workflow :builder-session :chat-flow :signal-collector]]
    (try
      (sm/start! name)
      (catch Throwable t
        (log/error t "Failed to start statechart:" name))))
  (log/info "[Statecharts] All statecharts started")
  (status))

(defn stop-all
  "Stop all statecharts"
  []
  (doseq [name [:eca-ooda :approval-workflow :builder-session :chat-flow :signal-collector]]
    (try
      (sm/stop! name)
      (catch Throwable t
        (log/error t "Failed to stop statechart:" name))))
  (log/info "[Statecharts] All statecharts stopped"))

(defn status
  "Get status of all statecharts"
  []
  (map (fn [name]
         {:name name
          :state (sm/current-state name)
          :valid-events (sm/valid-events name)})
       [:eca-ooda :approval-workflow :builder-session :chat-flow :signal-collector]))

(defn transition!
  "Transition any statechart by name"
  [statechart-name event]
  (sm/transition! statechart-name event))

;; ============================================================================
;; Coordinator - Route events to appropriate statechart
;; ============================================================================

(defn coordinator
  "Route event to appropriate statechart based on context
   
   Usage: (coordinator {:type :tool-approve :source :eca})"
  [event]
  (let [{:keys [type source]} event]
    (cond
      ;; ECA events
      (contains? #{:eca/prompt :eca/response :eca/tool-call} type)
      (sm/transition! :eca-ooda (keyword (name type)))
      
      ;; Approval events
      (contains? #{:approve :reject} type)
      (sm/transition! :approval-workflow type)
      
      ;; Builder events
      (contains? #{:empathy/complete :value-prop/complete :mvp/complete :canvas/complete} type)
      (sm/transition! :builder-session (keyword (name type)))
      
      ;; Chat events
      (contains? #{:chat/message :chat/respond :chat/error} type)
      (sm/transition! :chat-flow type)
      
      :else (log/debug "[Coordinator] No handler for event:" event))))