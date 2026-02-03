(ns ouroboros.interface.confirmation
  "Interface for human-in-the-loop confirmation system

   Provides user-facing functions for managing dangerous operation confirmations."
  (:require
   [ouroboros.confirmation :as confirmation]))

(defn confirm-pending?
  "Check if there's a pending confirmation for a session"
  [session-id]
  (confirmation/pending? session-id))

(defn confirm-get
  "Get pending confirmation details for a session"
  [session-id]
  (confirmation/get-pending session-id))

(defn confirm-approve!
  "Approve a pending confirmation

   Usage: (confirm-approve! :session-123 :approved-by \"admin\")"
  [session-id & {:keys [approved-by]}]
  (confirmation/approve! session-id :approved-by approved-by))

(defn confirm-deny!
  "Deny a pending confirmation

   Usage: (confirm-deny! :session-123 \"Too risky\" :denied-by \"admin\")"
  [session-id reason & {:keys [denied-by]}]
  (confirmation/deny! session-id reason :denied-by denied-by))

(defn confirm-cancel!
  "Cancel a pending confirmation (e.g., timeout)"
  [session-id reason]
  (confirmation/cancel! session-id reason))

(defn confirm-clear!
  "Clear all confirmations for a session"
  [session-id]
  (confirmation/clear-session! session-id))

(defn confirm-history
  "Get confirmation history for a session"
  [session-id & {:keys [limit]
                  :or {limit 50}}]
  (confirmation/get-history session-id :limit limit))

(defn confirm-stats
  "Get confirmation system statistics"
  []
  (confirmation/stats))

(defn confirm-security-report
  "Generate security report for confirmations"
  []
  (confirmation/security-report))

(defn confirm-cleanup!
  "Remove expired confirmations across all sessions"
  []
  (confirmation/cleanup-expired!))
