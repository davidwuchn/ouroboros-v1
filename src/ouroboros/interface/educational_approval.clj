(ns ouroboros.interface.educational-approval
  "Educational Approval Interface - Lazy loading wrapper

   Provides lazy-loaded access to educational approval functions.

   Usage:
   (require '[ouroboros.interface :as iface])
   (iface/educational-enhance-approval \"file/write\" {:path \"config.json\"})")

;; Lazy loading - resolve at call time, not load time
(defn- resolve-educational [sym]
  (let [ns-sym (ns-resolve *ns* 'ouroboros.educational-approval)]
    (when ns-sym
      (ns-resolve ns-sym sym))))

(defmacro deflazy [name]
  `(def ~name (delay (resolve-educational '~name))))

(deflazy educational-enhance-approval)
(deflazy educational-calculate-risk)
(deflazy educational-get-tool-knowledge)
(deflazy educational-create-learning-from-approval)
(deflazy educational-wrap-forward-approval)

;; Convenience wrappers that handle the delay
(defn enhance-approval
  "Enhance approval message with educational content

   Usage: (enhance-approval \"file/write\" {:path \"config.json\"})"
  [tool-name arguments]
  (let [f (resolve-educational 'enhance-approval-message)]
    (f tool-name arguments)))

(defn calculate-risk
  "Calculate risk level for tool

   Usage: (calculate-risk \"shell/exec\" {:command \"rm -rf /tmp\"})"
  [tool-name arguments]
  (let [f (resolve-educational 'calculate-risk)]
    (f tool-name arguments)))

(defn get-tool-knowledge
  "Get knowledge about a tool

   Usage: (get-tool-knowledge \"file/write\")"
  [tool-name]
  (let [f (resolve-educational 'get-tool-knowledge)]
    (f tool-name)))

(defn wrap-forward-approval
  "Wrap forward approval function with educational enhancement

   Usage: (def enhanced (wrap-forward-approval original-forward-fn))"
  [forward-fn]
  (let [f (resolve-educational 'wrap-forward-approval)]
    (f forward-fn)))

(comment
  ;; Usage
  (require '[ouroboros.interface :as iface])
  (require '[ouroboros.interface.educational-approval :as edu])

  ;; Enhance approval message
  (edu/enhance-approval
    "file/write"
    {:path "config.json" :content "{\"key\": \"value\"}"})

  ;; Calculate risk
  (edu/calculate-risk "shell/exec" {:command "ls -la"})

  ;; Get tool knowledge
  (edu/get-tool-knowledge "file/write"))
