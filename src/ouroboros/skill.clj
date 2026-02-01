(ns ouroboros.skill
  "Skill System - Reusable, composable capabilities for AI agents
   
   Inspired by OpenClaw's skill system:
   - Skills are self-contained capabilities with clear interfaces
   - Skills can depend on other skills
   - Skills are versioned and documented
   - Skills integrate seamlessly with the tool system
   
   A Skill is a map with:
   - :id - Unique keyword identifier
   - :name - Human-readable name
   - :version - Semantic version string like 1.0.0
   - :description - What the skill does
   - :dependencies - Vector of required skill IDs
   - :provides - Vector of tool keywords provided
   - :config - Default configuration map
   - :lifecycle - Optional init/shutdown hooks
   
   Usage:
     (register-skill! {:id :file-ops ...})
     (load-skill! :file-ops)
     (skill-tools :file-ops)"
  (:require
   [clojure.string :as str]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Skill Registry
;; ============================================================================

(defonce ^:private skill-registry (atom {}))
(defonce ^:private loaded-skills (atom #{}))
(defonce ^:private skill-instances (atom {}))

;; ============================================================================
;; Skill Schema
;; ============================================================================

(def skill-schema
  "Expected keys for a skill definition"
  {:id {:type :keyword :required true}
   :name {:type :string :required true}
   :version {:type :string :required true :pattern #"^\d+\.\d+\.\d+$"}
   :description {:type :string :required true}
   :author {:type :string :required false}
   :dependencies {:type :vector :default []}
   :provides {:type :vector :required true}  ; List of tool names
   :config {:type :map :default {}}
   :lifecycle {:type :map :default {}}
   :doc {:type :string :default ""}})

(defn validate-skill
  "Validate a skill definition against the schema
   Returns {:valid? true} or {:valid? false :errors [...]}"
  [skill]
  (let [errors (atom [])]
    ;; Check required fields
    (doseq [[k v] skill-schema]
      (when (and (:required v) (not (contains? skill k)))
        (swap! errors conj (str "Missing required field: " k))))
    
    ;; Check types
    (when-let [id (:id skill)]
      (when-not (keyword? id)
        (swap! errors conj ":id must be a keyword")))
    
    (when-let [version (:version skill)]
      (when-not (re-matches #"^\d+\.\d+\.\d+$" version)
        (swap! errors conj ":version must be semantic version (e.g., 1.0.0)")))
    
    (when-let [provides (:provides skill)]
      (when-not (and (vector? provides) (every? keyword? provides))
        (swap! errors conj ":provides must be a vector of keywords")))
    
    (if (seq @errors)
      {:valid? false :errors @errors}
      {:valid? true})))

;; ============================================================================
;; Skill Registration
;; ============================================================================

(defn register-skill!
  "Register a skill definition in the registry
   
   Usage:
     (register-skill! {:id :file-ops
                       :name \"File Operations\"
                       :version \"1.0.0\"
                       :description \"Work with files\"
                       :provides [:file/read :file/write]})"
  [skill]
  (let [validation (validate-skill skill)]
    (if (:valid? validation)
      (do
        (swap! skill-registry assoc (:id skill) skill)
        (telemetry/emit! {:event :skill/registered
                          :skill (:id skill)
                          :version (:version skill)
                          :provides (count (:provides skill))})
        {:success true :skill (:id skill)})
      {:success false :errors (:errors validation)})))

(defn unregister-skill!
  "Remove a skill from the registry"
  [skill-id]
  (swap! skill-registry dissoc skill-id)
  (swap! loaded-skills disj skill-id)
  (swap! skill-instances dissoc skill-id)
  (telemetry/emit! {:event :skill/unregistered :skill skill-id})
  skill-id)

(defn get-skill
  "Get a skill definition by ID"
  [skill-id]
  (get @skill-registry skill-id))

(defn skill-exists?
  "Check if a skill is registered"
  [skill-id]
  (contains? @skill-registry skill-id))

(defn list-skills
  "List all registered skills with metadata"
  []
  (map (fn [[id skill]]
         {:skill/id id
          :skill/name (:name skill)
          :skill/version (:version skill)
          :skill/description (:description skill)
          :skill/loaded? (contains? @loaded-skills id)
          :skill/provides (count (:provides skill))})
       @skill-registry))

;; ============================================================================
;; Dependency Resolution
;; ============================================================================

(defn- collect-dependencies
  "Collect all dependencies recursively for a skill"
  [skill-id visited]
  (if (contains? visited skill-id)
    visited
    (if-let [skill (get-skill skill-id)]
      (let [deps (:dependencies skill)
            visited-with-current (conj visited skill-id)]
        (reduce (fn [v dep]
                  (collect-dependencies dep v))
                visited-with-current
                deps))
      visited)))

(defn resolve-dependencies
  "Resolve dependency order for a skill
   Returns {:order [...] :error nil} or {:order nil :error ...}"
  [skill-id]
  (if-let [skill (get-skill skill-id)]
    (let [deps (:dependencies skill)
          missing (filter #(not (skill-exists? %)) deps)]
      (if (seq missing)
        {:order nil :error {:type :missing-dependencies
                            :skill skill-id
                            :missing missing}}
        (let [all-deps (collect-dependencies skill-id #{})]
          {:order (vec all-deps) :error nil})))
    {:order nil :error {:type :skill-not-found
                        :skill skill-id}}))

;; ============================================================================
;; Skill Lifecycle
;; ============================================================================

(defn load-skill!
  "Load a skill and its dependencies
   
   Usage:
     (load-skill! :file-operations)
     (load-skill! :file-operations {:max-file-size 2000000})"
  ([skill-id]
   (load-skill! skill-id {}))
  ([skill-id user-config]
   (let [{:keys [order error]} (resolve-dependencies skill-id)]
     (if error
       {:success false :error error}
       (do
         ;; Load dependencies first
         (doseq [dep (butlast order)]
           (when-not (contains? @loaded-skills dep)
             (let [skill (get-skill dep)
                   merged-config (merge (:config skill) user-config)]
               ;; Call init lifecycle hook if present
               (when-let [init-fn (get-in skill [:lifecycle :init])]
                 (init-fn merged-config))
               (swap! loaded-skills conj dep)
               (swap! skill-instances assoc dep {:config merged-config
                                                  :loaded-at (System/currentTimeMillis)})
               (telemetry/emit! {:event :skill/loaded
                                 :skill dep
                                 :version (:version skill)}))))
         
         ;; Load the main skill
         (let [skill (get-skill skill-id)
               merged-config (merge (:config skill) user-config)]
           (when-let [init-fn (get-in skill [:lifecycle :init])]
             (init-fn merged-config))
           (swap! loaded-skills conj skill-id)
           (swap! skill-instances assoc skill-id {:config merged-config
                                                  :loaded-at (System/currentTimeMillis)})
           (telemetry/emit! {:event :skill/loaded
                             :skill skill-id
                             :version (:version skill)})
           {:success true :skill skill-id :loaded (count order)}))))))

(defn unload-skill!
  "Unload a skill and call shutdown hook"
  [skill-id]
  (when (contains? @loaded-skills skill-id)
    (when-let [skill (get-skill skill-id)]
      (when-let [shutdown-fn (get-in skill [:lifecycle :shutdown])]
        (shutdown-fn (get-in @skill-instances [skill-id :config]))))
    (swap! loaded-skills disj skill-id)
    (swap! skill-instances dissoc skill-id)
    (telemetry/emit! {:event :skill/unloaded :skill skill-id}))
  skill-id)

(defn reload-skill!
  "Reload a skill (unload then load)"
  ([skill-id]
   (reload-skill! skill-id {}))
  ([skill-id config]
   (unload-skill! skill-id)
   (load-skill! skill-id config)))

;; ============================================================================
;; Skill Queries
;; ============================================================================

(defn skill-loaded?
  "Check if a skill is currently loaded"
  [skill-id]
  (contains? @loaded-skills skill-id))

(defn loaded-skills-list
  "List all currently loaded skills"
  []
  (map (fn [id]
         (let [skill (get-skill id)
               instance (get @skill-instances id)]
           {:skill/id id
            :skill/name (:name skill)
            :skill/version (:version skill)
            :skill/loaded-at (:loaded-at instance)
            :skill/config (:config instance)}))
       @loaded-skills))

(defn skill-tools
  "Get list of tools provided by a skill"
  [skill-id]
  (when-let [skill (get-skill skill-id)]
    (:provides skill)))

(defn tool->skill
  "Find which skill provides a given tool"
  [tool-name]
  (some (fn [[id skill]]
          (when (contains? (set (:provides skill)) tool-name)
            id))
        @skill-registry))

(defn skills-providing
  "Find all skills that provide a specific capability"
  [capability]
  (filter (fn [[_ skill]]
            (some #(= % capability) (:provides skill)))
          @skill-registry))

;; ============================================================================
;; Skill Configuration
;; ============================================================================

(defn get-skill-config
  "Get configuration for a loaded skill"
  [skill-id]
  (get-in @skill-instances [skill-id :config]))

(defn update-skill-config!
  "Update configuration for a loaded skill"
  [skill-id new-config]
  (swap! skill-instances update skill-id merge {:config new-config})
  (telemetry/emit! {:event :skill/config-updated :skill skill-id})
  (get-skill-config skill-id))

;; ============================================================================
;; Skill Discovery
;; ============================================================================

(defn search-skills
  "Search skills by keyword in name or description"
  [query]
  (let [query-lower (str/lower-case query)]
    (filter (fn [[_ skill]]
              (or (str/includes? (str/lower-case (:name skill)) query-lower)
                  (str/includes? (str/lower-case (:description skill)) query-lower)))
            @skill-registry)))

(defn skill-categories
  "Group skills by inferred category"
  []
  (group-by (fn [[id _]]
              (cond
                (str/starts-with? (name id) "file") :file-operations
                (str/starts-with? (name id) "git") :version-control
                (str/starts-with? (name id) "http") :network
                (str/starts-with? (name id) "db") :database
                :else :general))
            @skill-registry))

;; ============================================================================
;; Skill Statistics
;; ============================================================================

(defn skill-stats
  "Get statistics about the skill system"
  []
  {:total-registered (count @skill-registry)
   :total-loaded (count @loaded-skills)
   :total-tools (reduce + (map #(count (:provides (val %))) @skill-registry))
   :by-category (update-vals (skill-categories) count)})

;; ============================================================================
;; Built-in Skills
;; ============================================================================

(def core-skill
  "Core skill that provides essential tools"
  {:id :core/essentials
   :name "Core Essentials"
   :version "1.0.0"
   :description "Essential system tools"
   :author "Ouroboros"
   :dependencies []
   :provides [:system/status :system/report]
   :config {}})

(def file-skill
  "File operations skill"
  {:id :file/operations
   :name "File Operations"
   :version "1.0.0"
   :description "Read, write, search, and manage files"
   :author "Ouroboros"
   :dependencies [:core/essentials]
   :provides [:file/read :file/write :file/search :file/list :file/delete]
   :config {:max-file-size (* 10 1024 1024)  ; 10MB default
            :allowed-extensions #{".clj" ".edn" ".md" ".txt"}}
   :lifecycle
   {:init (fn [config]
            (println (str "✓ File operations skill loaded"
                         " (max size: " (:max-file-size config) ")")))
    :shutdown (fn [_] (println "✓ File operations skill unloaded"))}})

(def git-skill
  "Git operations skill"
  {:id :git/operations
   :name "Git Operations"
   :version "1.0.0"
   :description "Git version control operations"
   :author "Ouroboros"
   :dependencies [:core/essentials :file/operations]
   :provides [:git/status :git/commits :git/diff :git/branch]
   :config {:max-commits 100}})

(defn register-built-in-skills!
  "Register all built-in skills"
  []
  (doseq [skill [core-skill file-skill git-skill]]
    (register-skill! skill))
  (println (str "✓ Registered " (count @skill-registry) " built-in skills")))

;; ============================================================================
;; Exports
;; ============================================================================

(comment
  ;; Register skills
  (register-built-in-skills!)
  
  ;; Load a skill
  (load-skill! :file/operations)
  
  ;; Check what's loaded
  (loaded-skills-list)
  
  ;; Get tools from a skill
  (skill-tools :file/operations)
  
  ;; Find which skill provides a tool
  (tool->skill :file/read)
  
  ;; Search skills
  (search-skills "file")
  
  ;; Get stats
  (skill-stats))