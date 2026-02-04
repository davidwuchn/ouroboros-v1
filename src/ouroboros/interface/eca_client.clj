(ns ouroboros.interface.eca-client
  "ECA Client Interface - Lazy loading wrapper

   Provides lazy-loaded access to ECA client functions.

   Usage:
   (require '[ouroboros.interface :as iface])
   (iface/eca-start!)"
  (:require
   [ouroboros.interface :as iface]))

;; Lazy loading - delegate to actual implementation
(def eca-start! (resolve 'ouroboros.eca-client/start!))
(def eca-stop! (resolve 'ouroboros.eca-client/stop!))
(def eca-status (resolve 'ouroboros.eca-client/status))
(def eca-chat-prompt (resolve 'ouroboros.eca-client/chat-prompt))
(def eca-query-context (resolve 'ouroboros.eca-client/query-context))
(def eca-query-files (resolve 'ouroboros.eca-client/query-files))
(def eca-approve-tool! (resolve 'ouroboros.eca-client/approve-tool!))
(def eca-reject-tool! (resolve 'ouroboros.eca-client/reject-tool!))

;; Convenience wrappers
(defn start
  "Start ECA client

   Usage: (eca/start)"
  [& {:keys [eca-path]}]
  (let [f (resolve 'ouroboros.eca-client/start!)]
    (if eca-path
      (f {:eca-path eca-path})
      (f))))

(defn stop
  "Stop ECA client

   Usage: (eca/stop)"
  []
  ((resolve 'ouroboros.eca-client/stop!)))

(defn chat
  "Send chat message to ECA

   Usage: (eca/chat \"Hello!\")"
  [message]
  ((resolve 'ouroboros.eca-client/chat-prompt) message))

(defn approve
  "Approve tool call from ECA

   Usage: (eca/approve {:tool \"file/read\" :params {:path \"README.md\"}})"
  [tool-params]
  ((resolve 'ouroboros.eca-client/approve-tool!) tool-params))

(defn reject
  "Reject tool call from ECA

   Usage: (eca/reject {:tool \"shell/exec\" :reason \"Too dangerous\"})"
  [tool-reason]
  ((resolve 'ouroboros.eca-client/reject-tool!) tool-reason))

(comment
  ;; Lazy loading demo
  (require '[ouroboros.interface :as iface])
  (iface/eca-start!)
  (iface/eca-status)
  (iface/eca-chat-prompt "Hello!")
  (iface/eca-stop!)

  ;; Or use the convenience wrappers
  (require '[ouroboros.interface.eca-client :as eca])
  (eca/start)
  (eca/chat "What's the system status?")
  (eca/stop))
