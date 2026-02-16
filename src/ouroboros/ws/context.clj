(ns ouroboros.ws.context
  "Workspace detection and project context assembly for ECA prompts.
   Shared utilities used by multiple handler modules."
  (:require
   [clojure.string :as str]
   [ouroboros.memory :as memory]
   [ouroboros.wisdom :as wisdom]
   [ouroboros.telemetry :as telemetry])
  (:import [java.io File]))

;; ============================================================================
;; Current User
;; ============================================================================

(defn current-user-id
  "Get the current system user as a keyword.
   Uses the OS login username (e.g. :davidwu) instead of a hardcoded demo user."
  []
  (keyword (System/getProperty "user.name")))

;; ============================================================================
;; Phase Definitions
;; ============================================================================

(def phase-order
  "The 4 flywheel phases in order"
  [:empathy-map :value-proposition :mvp-planning :lean-canvas])

(def phase-labels
  {:empathy-map "Empathy Map"
   :value-proposition "Value Proposition"
   :mvp-planning "MVP Planning"
   :lean-canvas "Lean Canvas"})

;; ============================================================================
;; Workspace Detection
;; ============================================================================

(defn- detect-workspace-info
  "Detect project info from the current working directory.
   Reads directory name and looks for common project files to build a description."
  []
  (let [cwd (System/getProperty "user.dir")
        dir (File. cwd)
        dir-name (.getName dir)
        readme-desc (let [readme (File. dir "README.md")]
                      (when (.exists readme)
                        (try
                          (let [lines (str/split-lines (slurp readme))
                                content (->> lines
                                             (drop-while #(or (str/blank? %) (str/starts-with? % "#")))
                                             first)]
                            (when (and content (not (str/blank? content)))
                              (let [trimmed (str/trim content)]
                                (if (> (count trimmed) 200)
                                  (str (subs trimmed 0 200) "...")
                                  trimmed))))
                          (catch Exception _ nil))))
        project-type (cond
                       (.exists (File. dir "deps.edn")) "Clojure"
                       (.exists (File. dir "project.clj")) "Clojure (Leiningen)"
                       (.exists (File. dir "bb.edn")) "Babashka"
                       (.exists (File. dir "package.json")) "Node.js"
                       (.exists (File. dir "Cargo.toml")) "Rust"
                       (.exists (File. dir "go.mod")) "Go"
                       (.exists (File. dir "pyproject.toml")) "Python"
                       (.exists (File. dir "requirements.txt")) "Python"
                       (.exists (File. dir "pom.xml")) "Java (Maven)"
                       (.exists (File. dir "build.gradle")) "Java (Gradle)"
                       :else nil)
        description (str/join " | "
                      (remove nil?
                        [(when project-type (str project-type " project"))
                         readme-desc]))]
    {:name dir-name
     :description (if (str/blank? description)
                    (str "Project in " cwd)
                    description)
     :path cwd
     :project-type project-type}))

(defn ensure-workspace-project!
  "Find or create the project for the current workspace directory.
   Returns the project map."
  []
  (let [user-id (current-user-id)
        {:keys [name description path]} (detect-workspace-info)
        projects-key (keyword (str "projects/" (clojure.core/name user-id)))
        existing-projects (or (memory/get-value projects-key) {})
        existing (first (filter (fn [[_ p]]
                                  (= path (:project/path p)))
                                existing-projects))]
    (if existing
      (val existing)
      (let [project-id (str (clojure.core/name user-id) "/project-"
                            (str/replace (str/lower-case name) #"[^a-z0-9]+" "-")
                            "-" (System/currentTimeMillis))
            project {:project/id project-id
                     :project/name name
                     :project/description (or description "")
                     :project/path path
                     :project/owner (clojure.core/name user-id)
                     :project/status :active
                     :project/created-at (str (java.time.Instant/now))
                     :project/updated-at (str (java.time.Instant/now))}]
        (memory/update! projects-key
                        (fn [projects]
                          (assoc (or projects {}) project-id project)))
        (telemetry/emit! {:event :ws/workspace-project-created
                          :project-id project-id
                          :path path})
        project))))

;; ============================================================================
;; Project Context Assembly
;; ============================================================================

(defn assemble-project-context
  "Build a rich context string from project data for ECA.
   Loads project info, all builder sessions, and learning patterns."
  [user-id project-id phase]
  (let [projects-key (keyword (str "projects/" (clojure.core/name user-id)))
        project (get (or (memory/get-value projects-key) {}) project-id)
        sessions-key (keyword (str "builder-sessions/" (clojure.core/name user-id)))
        all-sessions (vals (or (memory/get-value sessions-key) {}))
        project-sessions (filter #(= (:session/project-id %) project-id) all-sessions)
        by-type (group-by :session/type project-sessions)
        patterns (wisdom/analyze-learning-patterns user-id)
        context-parts
        [(str "# Project: " (or (:project/name project) "Unknown"))
         (when-let [desc (:project/description project)]
           (when-not (str/blank? desc)
             (str "Description: " desc)))
         (str "\nCurrent Phase: " (or (get phase-labels phase) (clojure.core/name (or phase :unknown))))
         (when (seq project-sessions)
           (str "\n## Builder Session Data\n"
                (str/join "\n\n"
                  (for [[builder-type sessions] by-type
                        :let [latest (last (sort-by :session/updated-at sessions))
                              data (:session/data latest)]]
                    (str "### " (get phase-labels builder-type (clojure.core/name builder-type))
                         " (" (clojure.core/name (or (:session/state latest) :unknown)) ")\n"
                         (let [notes (vals (or data {}))]
                           (if (seq notes)
                             (str/join "\n" (for [note notes
                                                  :let [section (:item/section note)
                                                        content (:item/content note)]
                                                  :when (and content (not (str/blank? (str content))))]
                                              (str "- " (clojure.core/name section) ": " content)))
                             "No data yet")))))))
         (when (pos? (:total-insights patterns 0))
           (str "\n## User History\n"
                "Total insights: " (:total-insights patterns) "\n"
                "Categories: " (str/join ", " (map (fn [[k v]] (str (clojure.core/name k) " (" v ")"))
                                                   (:categories patterns)))))]]
    (str/join "\n" (remove nil? context-parts))))
