(ns ouroboros.interface.security
  "Interface for security and prompt injection protection

   Provides user-facing functions for security monitoring and management."
  (:require
   [ouroboros.security :as security]))

(defn security-sanitize
  "Sanitize input to neutralize prompt injection attempts

   Usage: (security-sanitize \"Ignore previous instructions...\")"
  [input]
  (security/sanitize-input input))

(defn security-check
  "Check if input contains injection patterns

   Returns map with :detected?, :patterns, :risk-score"
  [input]
  (security/injection-detected? input))

(defn security-quarantine!
  "Place a session in quarantine

   Usage: (security-quarantine! :session-123 :external-content)"
  [session-id reason & {:as metadata}]
  (security/quarantine! session-id reason metadata))

(defn security-release!
  "Release a session from quarantine"
  [session-id]
  (security/release-quarantine! session-id))

(defn security-quarantined?
  "Check if session is currently quarantined"
  [session-id]
  (security/quarantined? session-id))

(defn security-quarantine-status
  "Get detailed quarantine status for a session"
  [session-id]
  (security/get-quarantine-status session-id))

(defn security-report
  "Generate security status report"
  []
  (security/security-report))

(defn security-reset-quarantine!
  "Clear all quarantines (use with caution)"
  []
  (security/reset-quarantine!))
