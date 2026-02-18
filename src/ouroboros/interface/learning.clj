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
;; Instinct Tracking (NEW)
;; ============================================================================

(defn determine-instinct
  "Determine instinct level for a learning

   Usage: (determine-instinct learning-map)"
  [learning]
  (let [f (resolve-learning 'determine-instinct-level)]
    (f learning)))

(defn instinct-progress
  "Get progress toward next instinct level (0.0-1.0)

   Usage: (instinct-progress learning)"
  [learning]
  (let [f (resolve-learning 'instinct-level-progress)]
    (f learning)))

(defn record-transfer
  "Record that you taught someone this learning

   Usage: (record-transfer \"learning-id\" :who \"John\" :context \"in a workshop\")"
  [learning-id & {:keys [who context]}]
  (let [f (resolve-learning 'record-transfer!)]
    (f learning-id :who who :context context)))

;; ============================================================================
;; Proactive Capture (NEW)
;; ============================================================================

(defn suggest-capture
  "Get learning capture suggestion based on context

   Usage: (suggest-capture :user-123 :error-pattern {:error \"NullPointer\"})"
  [user-id context-type data]
  (let [f (resolve-learning 'suggest-capture)]
    (f user-id context-type data)))

(defn capture-planning
  "Capture insights from planning files

   Usage: (capture-planning :user-123 :empathy :project-1 [\"insight1\" \"insight2\"])"
  [user-id phase project-id insights]
  (let [f (resolve-learning 'capture-planning-insight!)]
    (f user-id phase project-id insights)))

(defn capture-phase
  "Capture phase completion as learning

   Usage: (capture-phase :user-123 :empathy :project-1 \"completed successfully\")"
  [user-id phase project-id result]
  (let [f (resolve-learning 'capture-phase-completion!)]
    (f user-id phase project-id result)))

;; ============================================================================
;; Review System (NEW)
;; ============================================================================

(defn get-reviews-due
  "Get reviews due for user

   Usage: (get-reviews-due :user-123)"
  [user-id]
  (let [f (resolve-learning 'get-due-reviews)]
    (f user-id)))

(defn get-review-stats
  "Get review statistics

   Usage: (get-review-stats :user-123)"
  [user-id]
  (let [f (resolve-learning 'get-review-stats)]
    (f user-id)))

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
