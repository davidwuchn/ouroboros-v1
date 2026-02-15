(ns ouroboros.chat.router
  "Chat Router - Message routing and lifecycle management

   Routes incoming messages to appropriate handlers based on session state.
   Manages adapter registration and lifecycle.

   This namespace is an implementation detail - prefer using
   the public API in ouroboros.chat"
  (:require
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.chat.session :as session]
   [ouroboros.chat.streaming :as streaming]
   [ouroboros.chat.commands :as commands]
   [ouroboros.chat.builders :as builders]
   [ouroboros.eca-client :as eca]
   [ouroboros.eca_approval_bridge :as eca-approval]
   [ouroboros.resolver-registry :as registry]
   [ouroboros.telemetry :as telemetry]))

;; Re-export protocol functions
(def start! chatp/start!)
(def stop! chatp/stop!)

;; ============================================================================
;; Adapter Registry
;; ============================================================================

(defonce active-adapters (atom {}))

(defn register-adapter!
  "Register a chat adapter for a platform.

   Usage: (register-adapter! :telegram my-telegram-adapter)"
  [platform adapter]
  (swap! active-adapters assoc platform adapter)
  (println (str "✓ Chat adapter registered: " platform)))

(defn get-adapters
  "Get registered adapters snapshot (for internal use)"
  []
  @active-adapters)

(defn get-adapters-atom
  "Get the raw adapters atom (for testing)"
  []
  active-adapters)

;; ============================================================================
;; ECA Approval Bridge
;; ============================================================================

(defn- setup-eca-approval-bridge!
  "Wire ECA approval bridge to chat adapter

   Allows tool approval requests to be forwarded to chat platforms.
   Silently skips if ECA approval bridge is not available."
  [adapter]
  (try
    (eca-approval/set-adapter!
     {:forward-approval-request
      (fn [confirmation-id message _tool-name _arguments]
        ;; Forward to all active sessions on this platform
        (doseq [[chat-id _session] (session/get-sessions-snapshot)]
          (try
            (chatp/send-markdown! adapter chat-id message)
            (telemetry/emit! {:event :chat/approval-forwarded
                              :chat-id chat-id
                              :confirmation-id confirmation-id})
            (catch Exception _e
              (telemetry/emit! {:event :chat/approval-forward-error
                                :chat-id chat-id})))))})
    (telemetry/emit! {:event :chat/eca-approval-wired})
    (catch IllegalStateException _e
      ;; ECA approval bridge function not bound - skip silently
      (telemetry/emit! {:event :chat/eca-approval-skipped
                        :reason "ECA approval bridge not available"}))
    (catch Exception e
      (telemetry/emit! {:event :chat/eca-approval-error
                        :error (.getMessage e)}))))

;; ============================================================================
;; Message Handler Factory
;; ============================================================================

(defn make-message-handler
  "Create a message handler function for an adapter.

   Routes messages based on session state:
   - Builder modes (canvas, empathy, vp, mvp) → builder handlers
   - Workflow mode → workflow handler
   - Commands (/start, /help) → command handlers
   - Natural language → ECA chat"
  [adapter]
  (fn [{:keys [chat-id _user-id user-name text] :as message}]
    (telemetry/emit! {:event :chat/receive :platform (:message/platform message)})

    ;; Register this session for ECA approval forwarding
    ;; This ensures approval requests can be sent to active chat sessions
    (try
      (eca-approval/register-session! chat-id user-name)
      (catch Exception _
        ;; Silently ignore if approval bridge not available
        nil))

    ;; Check if session is in any builder mode
    (let [canvas-mode? (session/in-mode? chat-id :canvas/mode)
          empathy-mode? (session/in-mode? chat-id :empathy/mode)
          vp-mode? (session/in-mode? chat-id :vp/mode)
          mvp-mode? (session/in-mode? chat-id :mvp/mode)
          workflow-mode? (session/in-mode? chat-id :workflow/mode)]
      (cond
        canvas-mode? (builders/handle-canvas-message adapter chat-id user-name text)
        empathy-mode? (builders/handle-empathy-message adapter chat-id user-name text)
        vp-mode? (builders/handle-vp-message adapter chat-id user-name text)
        mvp-mode? (builders/handle-mvp-message adapter chat-id user-name text)
        workflow-mode? (builders/handle-workflow-message adapter chat-id user-name text)
        :else (if-let [[cmd args] (commands/extract-command text)]
                (commands/handle-command adapter chat-id user-name cmd args)
                (builders/handle-natural-message adapter chat-id user-name text))))))

;; ============================================================================
;; Lifecycle
;; ============================================================================

(defn start-all!
  "Start all registered chat adapters.

   Also ensures ECA client is running and sets up streaming."
  []
  ;; Ensure ECA client is running
  (let [eca-status (eca/status)]
    (when-not (:running eca-status)
      (println "Starting ECA client...")
      (try
        (eca/start!)
        (println "ECA client started")
        (catch Exception e
          (println "Failed to start ECA client:" (.getMessage e))))))

  ;; Register global streaming callback
  (streaming/setup-streaming-callback!)

  (doseq [[platform adapter] @active-adapters]
    (let [handler (make-message-handler adapter)]
      ;; Wire ECA approval bridge to this adapter
      (setup-eca-approval-bridge! adapter)

      (start! adapter handler)
      (println (str "Chat adapter started: " platform)))))

(defn stop-all!
  "Stop all registered chat adapters."
  []
  (doseq [[platform adapter] @active-adapters]
    (stop! adapter)
    (println (str "✓ Chat adapter stopped: " platform)))
  (reset! active-adapters {}))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(pco/defresolver chat-adapters [_]
  {::pco/output [{:chat/adapters [:adapter/platform :adapter/running?]}]}
  {:chat/adapters (map (fn [[k v]]
                         {:adapter/platform k
                          :adapter/running? (some? v)})
                       @active-adapters)})

(pco/defresolver chat-sessions-resolver [_]
  {::pco/output [{:chat/sessions [:chat/id :chat/message-count :chat/created-at :chat/platform :chat/running?]}]}
  {:chat/sessions (map (fn [[k v]]
                         {:chat/id k
                          :chat/message-count (count (:history v))
                          :chat/created-at (:created-at v)
                          :chat/platform (:platform v)
                          :chat/running? (:running? v)})
                       (session/get-sessions-snapshot))})

(pco/defresolver page-sessions [_]
  {::pco/output [:page/id :sessions
                 {:chat/sessions [:chat/id :chat/message-count :chat/created-at :chat/platform :chat/running?]}
                 {:chat/adapters [:adapter/platform :adapter/running?]}]}
  {:page/id :sessions
   :chat/sessions (map (fn [[k v]]
                         {:chat/id k
                          :chat/message-count (count (:history v))
                          :chat/created-at (:created-at v)
                          :chat/platform (:platform v)
                          :chat/running? (:running? v)})
                       (session/get-sessions-snapshot))
   :chat/adapters (map (fn [[k v]]
                         {:adapter/platform k
                          :adapter/running? (some? v)})
                       @active-adapters)})

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [chat-adapters chat-sessions-resolver page-sessions])

(def mutations [])

(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)