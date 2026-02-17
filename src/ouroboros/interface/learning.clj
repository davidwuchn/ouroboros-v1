(ns ouroboros.interface.learning
  "Learning interface - Lazy loading wrapper

   Provides lazy-loaded access to learning system functions.

   Usage:
   (require '[ouroboros.interface :as iface])
   (iface/learning-save-insight! :user-123 {...})
   (iface/learning-get-user-history :user-123)")

;; Lazy loading - resolve at call time, not load time
(defn- resolve-learning [sym]
  (require 'ouroboros.learning)
  (ns-resolve 'ouroboros.learning sym))

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

(defn create-from-explanation
  "Create learning from explanation

   Usage: (create-from-explanation :user-123 \"Topic\" \"Explanation\" :medium)"
  [user-id topic explanation depth]
  (let [f (resolve-learning 'create-from-explanation)]
    (f user-id topic explanation depth)))

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

(defn detect-gaps
  "Detect learning gaps for user

   Usage: (detect-gaps :user-123)"
  [user-id]
  (let [f (resolve-learning 'detect-gaps)]
    (f user-id)))

(defn get-all-users
  "Get all users with learnings

   Usage: (get-all-users)"
  []
  (let [f (resolve-learning 'get-all-users)]
    (f)))

(defn delete-learning!
  "Delete a learning by ID

   Usage: (delete-learning! \"user-123/sequence-types-1234567890\")"
  [learning-id]
  (let [f (resolve-learning 'delete-learning!)]
    (f learning-id)))

(defn rebuild-index!
  "Rebuild learning index from memory

   Usage: (rebuild-index!)"
  []
  (let [f (resolve-learning 'rebuild-index!)]
    (f)))

(comment
  ;; Usage
  (require '[ouroboros.interface :as iface])
  (require '[ouroboros.interface.learning :as learning])

  ;; Save learning - returns record with :learning/id
  (let [result (learning/save-insight! :alex {:title \"Test\" :insights [\"test\"] :pattern \"test\"})]
    (:learning/id result))

  ;; Get history
  (learning/get-history :alex)

  ;; Recall by pattern
  (learning/recall-pattern :alex \"sequence\")

  ;; User stats
  (learning/user-stats :alex)

  ;; Detect gaps
  (learning/detect-gaps :alex)

  ;; Get all users
  (learning/get-all-users))
