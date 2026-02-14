(ns ouroboros.eca-client
  "ECA Client - JSON-RPC communication with Editor Code Assistant

   Ouroboros acts as an ECA \"editor client\", communicating with ECA binary
   via JSON-RPC 2.0 over stdin/stdout.

   This is the public API facade. Implementation is split across:
   - ouroboros.eca-client.core - State, callbacks, JSON-RPC protocol
   - ouroboros.eca-client.lifecycle - Process management
   - ouroboros.eca-client.chat - Chat operations
   - ouroboros.eca-client.tools - Tool approval

   Architecture:
   ```
   Chat Platform (Telegram/Discord/Slack)
           │
           ▼
   Ouroboros Chat → ECA Client → ECA Binary
           │                       │
           │ JSON-RPC              │ LLM + Tools
           ▼                       ▼
   Tool Approval ←─────────────── Tool Calls
   ```

   ECA Protocol Methods:
   - initialize     → Handshake
   - chat/prompt    → Send message
   - chat/queryContext → Get context
   - chat/queryFiles → Search files
   - chat/queryCommands → Available commands

   ECA → Ouroboros (callbacks):
   - chat/content-received  → Response
   - chat/toolCallApprove   → Approval request
   - chat/toolCallReject    → Rejection

   Usage:
   (require '[ouroboros.eca-client :as eca])
   (eca/start!)
   (eca/chat-prompt \"Hello!\")
   (eca/stop!)"
  (:require
    [com.wsscode.pathom3.connect.operation :as pco]
    [ouroboros.eca-client.core :as core]
    [ouroboros.eca-client.lifecycle :as lifecycle]
    [ouroboros.eca-client.chat :as chat]
    [ouroboros.eca-client.tools :as tools]
    [ouroboros.resolver-registry :as registry]))

;; ============================================================================
;; Re-exports from Core (State & Callbacks)
;; ============================================================================

(def register-callback!
  "Register a callback function for a specific ECA notification method.

   Supports multiple listeners per method. Returns a listener-id."
  core/register-callback!)

(def unregister-callback!
  "Remove a specific callback by method and listener-id, or all callbacks for a method."
  core/unregister-callback!)

(def clear-callbacks!
  "Remove all callbacks."
  core/clear-callbacks!)

(def get-chat-contents
  "Get all received chat contents from ECA notifications."
  core/get-chat-contents)

(def clear-chat-contents!
  "Clear stored chat contents."
  core/clear-chat-contents!)

;; ============================================================================
;; Re-exports from Lifecycle (Process Management)
;; ============================================================================

(def start!
  "Start ECA process and initialize connection.

   Usage: (start!)
          (start! {:eca-path \"/path/to/eca\" :debug? true})"
  lifecycle/start!)

(def stop!
  "Stop ECA process."
  lifecycle/stop!)

(def status
  "Get ECA client status."
  lifecycle/status)

(def alive?
  "Check if ECA process is truly alive (not just :running flag)."
  lifecycle/alive?)

(def restart!
  "Stop and restart ECA process."
  lifecycle/restart!)

(def ensure-alive!
  "Ensure ECA is running. If dead, attempt auto-restart."
  lifecycle/ensure-alive!)

;; ============================================================================
;; Re-exports from Chat (Chat Operations)
;; ============================================================================

(def chat-prompt
  "Send a chat message to ECA and get response.

   Usage: (chat-prompt \"Hello!\")
          (chat-prompt \"Hello!\" {:wait? true :timeout-ms 120000})"
  chat/chat-prompt)

(def query-context
  "Query context from ECA (repoMap, files, etc.)"
  chat/query-context)

(def query-files
  "Search files in ECA workspace"
  chat/query-files)

;; ============================================================================
;; Re-exports from Tools (Tool Approval)
;; ============================================================================

(def approve-tool!
  "Approve a tool call from ECA"
  tools/approve-tool!)

(def reject-tool!
  "Reject a tool call from ECA"
  tools/reject-tool!)

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(pco/defresolver eca-status [_]
  {::pco/output [:eca/running :eca/eca-path :eca/pending-requests :eca/debug?]}
  (let [s (status)]
    {:eca/running (:running s)
     :eca/eca-path (:eca-path s)
     :eca/pending-requests (:pending-requests s)
     :eca/debug? (:debug? s)}))

(pco/defmutation eca-start! [{:keys [eca-path debug?]}]
  {::pco/output [:status :eca-path :debug?]}
  (let [result (start! {:eca-path eca-path :debug? debug?})]
    {:status (:status result)
     :eca-path (:eca-path result)
     :debug? (:debug? result)}))

(pco/defmutation eca-stop! [_]
  {::pco/output [:status]}
  (stop!)
  {:status :stopped})

(pco/defmutation eca-chat! [{:keys [message]}]
  {::pco/output [:status :response :error]}
  (let [result (chat-prompt message)]
    (merge {:status (:status result)}
           (when (:response result) {:response (:response result)})
           (when (:error result) {:error (:error result)}))))

(pco/defmutation eca-approve! [{:keys [tool params]}]
  {::pco/output [:status :tool]}
  (approve-tool! {:tool tool :params params}))

(pco/defmutation eca-reject! [{:keys [tool reason]}]
  {::pco/output [:status :tool :reason]}
  (reject-tool! {:tool tool :reason reason}))

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers [eca-status])
(def mutations [eca-start! eca-stop! eca-chat! eca-approve! eca-reject!])

(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

(comment
  ;; Start ECA
  (start!)

  ;; Check status
  (status)

  ;; Chat
  (chat-prompt "What files are in the project?")

  ;; Query context
  (query-context)

  ;; Query files
  (query-files "*.clj")

  ;; Approve tool
  (approve-tool! {:tool "file/read" :params {:path "README.md"}})

  ;; Stop
  (stop!)

  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:eca/running])
  (q/m 'eca/start! {:eca-path "eca"})
  (q/m 'eca/chat! {:message "Hello!"}))