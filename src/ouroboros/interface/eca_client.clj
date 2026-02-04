(ns ouroboros.interface.eca-client
  "ECA Client Interface - Lazy loading wrapper

   Provides lazy-loaded access to ECA client functions.

   Usage:
   (require '[ouroboros.interface :as iface])
   (iface/eca-start!)"
  (:require
   [ouroboros.interface :as iface]))

;; Lazy loading - resolve at call time, not load time
(defn- resolve-eca [sym]
  (let [ns-sym (ns-resolve *ns* 'ouroboros.eca-client)]
    (when ns-sym
      (ns-resolve ns-sym sym))))

(defmacro deflazy [name]
  `(def ~name (delay (resolve-eca '~name))))

(deflazy eca-start!)
(deflazy eca-stop!)
(deflazy eca-status)
(deflazy eca-chat-prompt)
(deflazy eca-query-context)
(deflazy eca-query-files)
(deflazy eca-approve-tool!)
(deflazy eca-reject-tool!)

;; Convenience wrappers that handle the delay
(defn start
  "Start ECA client

   Usage: (eca/start)"
  [& {:keys [eca-path]}]
  (let [f (resolve-eca 'start)]
    (if eca-path
      (f {:eca-path eca-path})
      (f))))

(defn stop
  "Stop ECA client

   Usage: (eca/stop)"
  []
  (let [f (resolve-eca 'stop)]
    (f)))

(defn chat
  "Send chat message to ECA

   Usage: (eca/chat \"Hello!\")"
  [message]
  (let [f (resolve-eca 'chat-prompt)]
    (f message)))

(defn approve
  "Approve tool call from ECA

   Usage: (eca/approve {:tool \"file/read\" :params {:path \"README.md\"}})"
  [tool-params]
  (let [f (resolve-eca 'approve-tool!)]
    (f tool-params)))

(defn reject
  "Reject tool call from ECA

   Usage: (eca/reject {:tool \"shell/exec\" :reason \"Too dangerous\"})"
  [tool-reason]
  (let [f (resolve-eca 'reject-tool!)]
    (f tool-reason)))

(comment
  ;; Usage
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
