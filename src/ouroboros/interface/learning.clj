(ns ouroboros.interface.learning
  "Learning interface - Lazy loading wrapper

   Provides lazy-loaded access to learning system functions.

   Usage:
   (require '[ouroboros.interface :as iface])
   (iface/learning-save-insight! :user-123 {...})
   (iface/learning-get-user-history :user-123)")

;; Lazy loading - resolve at call time, not load time
(defn- resolve-learning [sym]
  (let [ns-sym (ns-resolve *ns* 'ouroboros.learning)]
    (when ns-sym
      (ns-resolve ns-sym sym))))

(defmacro deflazy [name]
  `(def ~name (delay (resolve-learning '~name))))

(deflazy learning-save-insight!)
(deflazy learning-get-learning)
(deflazy learning-update-learning!)
(deflazy learning-delete-learning!)
(deflazy learning-get-user-history)
(deflazy learning-recall-by-pattern)
(deflazy learning-recall-by-category)
(deflazy learning-find-related)
(deflazy learning-increment-application!)
(deflazy learning-get-user-stats)
(deflazy learning-detect-gaps)
(deflazy learning-create-from-error)
(deflazy learning-create-from-explanation)

;; Convenience wrappers that handle the delay
(defn save-insight!
  "Save a learning insight

   Usage: (save-insight! :user-123 {:title \"...\" :insights [...]})"
  [user-id record]
  (let [f (resolve-learning 'save-insight!)]
    (f user-id record)))

(defn get-history
  "Get learning history for a user

   Usage: (get-history :user-123)"
  [user-id]
  (let [f (resolve-learning 'get-user-history)]
    (f user-id)))

(defn recall-pattern
  "Recall learnings by pattern

   Usage: (recall-pattern :user-123 \"sequence-type\")"
  [user-id pattern]
  (let [f (resolve-learning 'recall-by-pattern)]
    (f user-id pattern)))

(defn find-related-learnings
  "Find related learnings for context

   Usage: (find-related-learnings :user-123 \"python error\")"
  [user-id context]
  (let [f (resolve-learning 'find-related)]
    (f user-id context)))

(defn create-error-learning
  "Create learning from error/fix pattern

   Usage: (create-error-learning :user-123 \"TypeError\" \"Fix explanation\" \"context\")"
  [user-id error-type fix-explanation context]
  (let [f (resolve-learning 'create-from-error)]
    (f user-id error-type fix-explanation context)))

(defn apply-learning!
  "Increment application count for a learning

   Usage: (apply-learning! \"user-123/sequence-types-1234567890\")"
  [learning-id]
  (let [f (resolve-learning 'increment-application!)]
    (f learning-id)))

(defn user-stats
  "Get learning statistics for user

   Usage: (user-stats :user-123)"
  [user-id]
  (let [f (resolve-learning 'get-user-stats)]
    (f user-id)))

(comment
  ;; Usage
  (require '[ouroboros.interface :as iface])
  (require '[ouroboros.interface.learning :as learning])

  ;; Save learning
  (learning/save-insight! :alex
    {:title "Sequence Types Safety"
     :insights ["Sequence ops need integers"]
     :pattern "sequence-type-mismatch"})

  ;; Get history
  (learning/get-history :alex)

  ;; Recall by pattern
  (learning/recall-pattern :alex "sequence")

  ;; Create from error
  (learning/create-error-learning :alex
    "TypeError: can't multiply sequence"
    "Convert float to integer"
    "utils.py line 42")

  ;; User stats
  (learning/user-stats :alex))
