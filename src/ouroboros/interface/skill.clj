(ns ouroboros.interface.skill
  "Skill system interface - Reusable capabilities for AI agents
   
   Usage:
     ;; Register and load skills
     (skill/register! :my-skill {...})
     (skill/load! :my-skill)
     
     ;; Query skills
     (skill/list)
     (skill/loaded)
     (skill/tools :my-skill)
     
     ;; Manage lifecycle
     (skill/unload! :my-skill)
     (skill/reload! :my-skill)"
  (:require
   [ouroboros.skill :as skill]))

;; ============================================================================
;; Skill Registration
;; ============================================================================

(defn register!
  "Register a skill definition
   
   Usage:
     (register! {:id :file-ops
                 :name \"File Operations\"
                 :version \"1.0.0\"
                 :description \"Work with files\"
                 :provides [:file/read :file/write]})"
  [skill-def]
  (skill/register-skill! skill-def))

(defn unregister!
  "Remove a skill from registry"
  [skill-id]
  (skill/unregister-skill! skill-id))

;; ============================================================================
;; Skill Lifecycle
;; ============================================================================

(defn load!
  "Load a skill and its dependencies
   
   Usage:
     (load! :file-operations)
     (load! :file-operations {:max-file-size 2000000})"
  ([skill-id]
   (skill/load-skill! skill-id))
  ([skill-id config]
   (skill/load-skill! skill-id config)))

(defn unload!
  "Unload a skill"
  [skill-id]
  (skill/unload-skill! skill-id))

(defn reload!
  "Reload a skill (unload then load)"
  ([skill-id]
   (skill/reload-skill! skill-id))
  ([skill-id config]
   (skill/reload-skill! skill-id config)))

;; ============================================================================
;; Skill Queries
;; ============================================================================

(defn list
  "List all registered skills"
  []
  (skill/list-skills))

(defn loaded
  "List all currently loaded skills"
  []
  (skill/loaded-skills-list))

(defn get
  "Get skill definition by ID"
  [skill-id]
  (skill/get-skill skill-id))

(defn exists?
  "Check if skill exists"
  [skill-id]
  (skill/skill-exists? skill-id))

(defn loaded?
  "Check if skill is loaded"
  [skill-id]
  (skill/skill-loaded? skill-id))

;; ============================================================================
;; Tool Integration
;; ============================================================================

(defn tools
  "Get tools provided by a skill"
  [skill-id]
  (skill/skill-tools skill-id))

(defn tool->skill
  "Find which skill provides a tool"
  [tool-name]
  (skill/tool->skill tool-name))

(defn providing
  "Find skills providing a specific tool"
  [tool-name]
  (skill/skills-providing tool-name))

;; ============================================================================
;; Configuration
;; ============================================================================

(defn config
  "Get skill configuration"
  [skill-id]
  (skill/get-skill-config skill-id))

(defn set-config!
  "Update skill configuration"
  [skill-id new-config]
  (skill/update-skill-config! skill-id new-config))

;; ============================================================================
;; Discovery
;; ============================================================================

(defn search
  "Search skills by keyword"
  [query]
  (skill/search-skills query))

(defn categories
  "Get skills grouped by category"
  []
  (skill/skill-categories))

;; ============================================================================
;; Dependencies
;; ============================================================================

(defn dependencies
  "Resolve dependencies for a skill"
  [skill-id]
  (skill/resolve-dependencies skill-id))

;; ============================================================================
;; Statistics
;; ============================================================================

(defn stats
  "Get skill system statistics"
  []
  (skill/skill-stats))

;; ============================================================================
;; Built-in Skills
;; ============================================================================

(defn register-built-ins!
  "Register all built-in skills"
  []
  (skill/register-built-in-skills!))

(comment
  ;; Quick start
  (register-built-ins!)
  (load! :file/operations)
  (list)
  (loaded)
  (tools :file/operations)
  (stats))