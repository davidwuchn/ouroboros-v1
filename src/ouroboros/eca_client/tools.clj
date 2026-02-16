(ns ouroboros.eca-client.tools
  "ECA Client Tool Operations - Tool approval/rejection

   Handles approving and rejecting tool calls from ECA.
   Used by chat platforms to provide user approval for dangerous operations.

   This namespace is an implementation detail - prefer using
   the public API in ouroboros.eca-client"
  (:require
    [ouroboros.telemetry :as telemetry]
    [ouroboros.eca-client.core :as core]))

(defn approve-tool!
  "Approve a tool call from ECA

   Usage: (approve-tool! {:tool \"file/read\" :params {...}})"
  [{:keys [tool params]}]
  (let [params {:chat-id "default"
                :tool {:name tool :arguments params}}]
    (core/send-request! "chat/toolCallApprove" params)
    (telemetry/emit! {:event :eca/tool-approved :tool tool})
    {:status :approved :tool tool}))

(defn reject-tool!
  "Reject a tool call from ECA

   Usage: (reject-tool! {:tool \"shell/exec\" :reason \"Dangerous tool\"})"
  [{:keys [tool reason]}]
  (let [params {:chat-id "default"
                :tool {:name tool}
                :reason reason}]
    (core/send-request! "chat/toolCallReject" params)
    (telemetry/emit! {:event :eca/tool-rejected :tool tool :reason reason})
    {:status :rejected :tool tool :reason reason}))