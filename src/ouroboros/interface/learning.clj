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

(defn- resolve-semantic [sym]
  (require 'ouroboros.learning.semantic)
  (ns-resolve 'ouroboros.learning.semantic sym))

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

;; ============================================================================
;; Semantic / Code-Aware Learning (NEW)
;; ============================================================================

(defn semantic-recall
  "Recall learnings using semantic similarity to code context

   Usage: (semantic-recall :user-123 \"error handling\" :limit 5)"
  [user-id query & {:keys [limit] :or {limit 10}}]
  (let [f (resolve-semantic 'recall-with-fallback)]
    (f user-id query :limit limit)))

(defn find-code-related
  "Find code context for an existing learning

   Usage: (find-code-related :user-123 \"learning-id\")"
  [user-id learning-id]
  (let [f (resolve-semantic 'find-code-context)]
    (f user-id learning-id)))

(defn auto-link-code!
  "Auto-link learning to related code files

   Usage: (auto-link-code! \"user-123/learning-id\")"
  [learning-id]
  (let [f (resolve-semantic 'auto-link-code!)]
    (f learning-id)))

(defn save-with-code!
  "Save learning with automatic code context extraction

   Usage: (save-with-code! :user-123 {:title \"...\" :insights [...]})"
  [user-id record]
  (let [f (resolve-semantic 'save-insight-with-code!)]
    (f user-id record)))

(defn semantic-available?
  "Check if semantic search is available (git-embed healthy)

   Usage: (semantic-available?)"
  []
  (let [f (resolve-semantic 'available?)]
    (f)))

(defn semantic-user-stats
  "Get semantic search statistics for user

   Usage: (semantic-user-stats :user-123)"
  [user-id]
  (let [f (resolve-semantic 'semantic-stats)]
    (f user-id)))

(defn update-code-index!
  "Update git-embed code index

   Usage: (update-code-index!)"
  []
  (let [f (resolve-semantic 'update-code-index!)]
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
