(ns ouroboros.interface.eca_approval_bridge
  "ECA Approval Bridge Interface - Lazy loading wrapper

   Provides lazy-loaded access to ECA approval bridge functions.

   Usage:
   (require '[ouroboros.interface :as iface])
   (iface/eca-approval-status)")

;; Lazy loading - resolve at call time, not load time
(defn- resolve-approval-bridge [sym]
  (let [ns-sym (ns-resolve *ns* 'ouroboros.eca_approval_bridge)]
    (when ns-sym
      (ns-resolve ns-sym sym))))

(defmacro deflazy [name]
  `(def ~name (delay (resolve-approval-bridge '~name))))

(deflazy eca-approval-status)
(deflazy eca-pending-approvals)
(deflazy eca-cleanup-expired!)

;; Convenience wrappers that handle the delay
(defn status
  "Get ECA approval bridge status

   Usage: (eca/status)"
  []
  (let [f (resolve-approval-bridge 'status)]
    (f)))

(defn pending
  "Get all pending approval requests

   Usage: (eca/pending)"
  []
  (let [f (resolve-approval-bridge 'pending-approvals)]
    (f)))

(defn cleanup!
  "Clean up expired approvals

   Usage: (eca/cleanup!)"
  []
  (let [f (resolve-approval-bridge 'cleanup-expired-approvals!)]
    (f)))

(defn approve!
  "Approve a pending confirmation

   Usage: (eca/approve! \"eca-123\" \"admin\")"
  [confirmation-id approved-by]
  (let [f (resolve-approval-bridge 'approve-confirmation!)]
    (f confirmation-id approved-by)))

(defn deny!
  "Deny a pending confirmation

   Usage: (eca/deny! \"eca-123\" \"Too risky\" :denied-by \"admin\")"
  [confirmation-id reason & {:keys [denied-by]}]
  (let [f (resolve-approval-bridge 'deny-confirmation!)]
    (f confirmation-id reason :denied-by denied-by)))

(defn process-confirm!
  "Process /confirm command from chat

   Usage: (eca/process-confirm! chat-id \"eca-123\" \"admin\")"
  [chat-id confirmation-id user-name]
  (let [f (resolve-approval-bridge 'process-chat-confirm!)]
    (f chat-id confirmation-id user-name)))

(defn process-deny!
  "Process /deny command from chat

   Usage: (eca/process-deny! chat-id \"eca-123\" \"Too risky\" \"admin\")"
  [chat-id confirmation-id reason user-name]
  (let [f (resolve-approval-bridge 'process-chat-deny!)]
    (f chat-id confirmation-id reason user-name)))

(comment
  ;; Usage
  (require '[ouroboros.interface :as iface])
  (require '[ouroboros.interface.eca-approval-bridge :as eca])

  ;; Status
  (eca/status)
  (eca/pending)

  ;; Process chat commands
  (eca/process-confirm! "tg-123" "eca-req-123" "admin")
  (eca/process-deny! "tg-123" "eca-req-123" "Too risky" "admin")

  ;; Direct approval/denial
  (eca/approve! "eca-req-123" "admin")
  (eca/deny! "eca-req-123" "Too risky" :denied-by "admin")

  ;; Cleanup
  (eca/cleanup!))
