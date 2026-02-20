;; System Components - Mount-style lifecycle for Ouroboros
;; Based on ASSESSMENT: "9 Mount states"
(ns ouroboros.components
  "System Components - Define all system components with lifecycle
   
   Usage:
     (require '[ouroboros.components :as components])
     (components/start-all)
     (components/status)"
  (:require [clojure.tools.logging :as log]
            [clojure.java.io :as io]
            [mount.core :as mount]
            [ouroboros.component :as comp]))

;; ============================================================================
;; Config Component
;; ============================================================================

(comp/defcomponent config
  :start (do
           (log/info "[Component] Loading config")
           {:env (or (System/getenv "OUROBOROS_ENV") "dev")
            :port (Integer. (or (System/getenv "PORT") "3000"))
            :eca-enabled true})
  :stop (fn [state]
          (log/info "[Component] Saving config")))

;; ============================================================================
;; Database Component (Datalevin operational store)
;; ============================================================================

(comp/defcomponent database
  :start (do
           (log/info "[Component] Starting Datalevin database")
           (require '[ouroboros.persistence.datalevin-memory :as dm])
           (dm/init!)
           {:type :datalevin
            :path "data/operational"
            :mode (dm/get-mode)
            :connected? true})
  :stop (fn [state]
          (log/info "[Component] Stopping Datalevin database")
          (try
            (require '[ouroboros.persistence.datalevin-memory :as dm])
            (dm/disconnect-datalevin!)
            (catch Throwable t
              (log/error t "Error stopping Datalevin")))))

;; ============================================================================
;; Memory Component
;; ============================================================================

(comp/defcomponent memory
  :dependencies [database]
  :start (do
           (log/info "[Component] Starting memory system")
           {:session-store {}
            :long-term-store {}})
  :stop (fn [state]
          (log/info "[Component] Stopping memory system")))

;; ============================================================================
;; Telemetry Component
;; ============================================================================

(comp/defcomponent telemetry
  :start (do
           (log/info "[Component] Starting telemetry")
           {:events []
            :metrics {}})
  :stop (fn [state]
          (log/info "[Component] Stopping telemetry")))

;; ============================================================================
;; WebSocket Component
;; ============================================================================

(comp/defcomponent websocket
  :dependencies [config]
  :start (let [{:keys [port]} (comp/state :config)]
           (log/info "[Component] Starting WebSocket on port" port)
           {:port port
            :connections #{}})
  :stop (fn [state]
          (log/info "[Component] Stopping WebSocket")))

;; ============================================================================
;; ECA Client Component
;; ============================================================================

(comp/defcomponent eca-client
  :dependencies [config]
  :start (let [{:keys [eca-enabled]} (comp/state :config)]
           (if eca-enabled
             (do
               (log/info "[Component] Starting ECA client")
               {:pid nil
                :status :running})
             (do
               (log/info "[Component] ECA disabled")
               {:status :disabled})))
  :stop (fn [state]
          (log/info "[Component] Stopping ECA client")))

;; ============================================================================
;; Chat Adapters Component
;; ============================================================================

(comp/defcomponent chat-adapters
  :dependencies [config]
  :start (do
           (log/info "[Component] Starting chat adapters")
           {:telegram nil
            :discord nil
            :slack nil})
  :stop (fn [state]
          (log/info "[Component] Stopping chat adapters")))

;; ============================================================================
;; Learning Component
;; ============================================================================

(comp/defcomponent learning
  :dependencies [memory]
  :start (do
           (log/info "[Component] Starting learning system")
           {:insights []
            :patterns {}})
  :stop (fn [state]
          (log/info "[Component] Stopping learning system")))

;; ============================================================================
;; Wisdom Component
;; ============================================================================

(comp/defcomponent wisdom
  :dependencies [learning]
  :start (do
           (log/info "[Component] Starting wisdom system")
           {:templates {}
            :insights []})
  :stop (fn [state]
          (log/info "[Component] Stopping wisdom system")))

;; ============================================================================
;; Statecharts Component
;; ============================================================================

(comp/defcomponent statecharts
  :start (do
           (log/info "[Component] Starting statecharts")
           (require '[ouroboros.statecharts :as statecharts])
           (statecharts/start-all)
           {:registered [:eca-ooda :approval-workflow :builder-session :chat-flow :signal-collector]})
  :stop (fn [state]
          (log/info "[Component] Stopping statecharts")
          (try
            (require '[ouroboros.statecharts :as statecharts])
            (statecharts/stop-all)
            (catch Throwable t
              (log/error t "Error stopping statecharts")))))

;; ============================================================================
;; Bulk Operations
;; ============================================================================

(defn start-all
  "Start all components in dependency order"
  []
  (log/info "=" (apply str (repeat 50 "=")))
  (log/info "Starting Ouroboros System")
  (log/info "=" (apply str (repeat 50 "=")))
  
  ;; Start components in order
  (comp/start :config)
  (comp/start :database)
  (comp/start :memory)
  (comp/start :telemetry)
  (comp/start :websocket)
  (comp/start :eca-client)
  (comp/start :chat-adapters)
  (comp/start :learning)
  (comp/start :wisdom)
  (comp/start :statecharts)
  
  (log/info "=" (apply str (repeat 50 "=")))
  (log/info "Ouroboros System Started")
  (log/info "=" (apply str (repeat 50 "=")))
  
  (status))

(defn stop-all
  "Stop all components in reverse order"
  []
  (log/info "=" (apply str (repeat 50 "=")))
  (log/info "Stopping Ouroboros System")
  (log/info "=" (apply str (repeat 50 "=")))
  
  (comp/stop :statecharts)
  (comp/stop :wisdom)
  (comp/stop :learning)
  (comp/stop :chat-adapters)
  (comp/stop :eca-client)
  (comp/stop :websocket)
  (comp/stop :telemetry)
  (comp/stop :memory)
  (comp/stop :database)
  (comp/stop :config)
  
  (log/info "=" (apply str (repeat 50 "=")))
  (log/info "Ouroboros System Stopped")
  (log/info "=" (apply str (repeat 50 "="))))

(defn status
  "Get status of all components"
  []
  (comp/status))

(defn healthy?
  "Check if all components are healthy"
  []
  (comp/healthy?))

(defn state
  "Get state of a specific component"
  [component-name]
  (comp/state component-name))