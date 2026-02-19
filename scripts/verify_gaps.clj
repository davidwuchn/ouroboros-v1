#!/usr/bin/env bb
;; Verification script for Learning+Embed Gaps integration
;; Run with: bb scripts/verify_gaps.clj

(require '[clojure.string :as str])
(require '[clojure.java.shell :as shell])
(require '[clojure.java.io :as io])

(defn print-header [msg]
  (println)
  (println "=" 60)
  (println msg)
  (println "=" 60))

(defn print-section [msg]
  (println)
  (println "-" 40)
  (println msg)
  (println "-" 40))

(defn print-check [label status & [detail]]
  (let [icon (case status
               :ok "✅"
               :warning "⚠️"
               :error "❌"
               "⏺️")]
    (print (format "%s %-30s" icon label))
    (when detail
      (print (str " " detail)))
    (println)))

(defn check-git-embed-installed []
  (print-section "1. Git-Embed Binary Check")
  (let [which-result (shell/sh "which" "git-embed")]
    (if (zero? (:exit which-result))
      (do
        (print-check "Binary found in PATH" :ok (str/trim (:out which-result)))
        (let [version-result (shell/sh "git-embed" "--version")]
          (if (zero? (:exit version-result))
            (print-check "Version check" :ok (str/trim (:out version-result)))
            (print-check "Version check" :error (:err version-result)))))
      (print-check "Binary not found" :error "Install with: cargo install git-embed"))))

(defn check-git-embed-hooks []
  (print-section "2. Git-Embed Hooks Check")
  (let [hook-result (shell/sh "git" "embed" "status")]
    (if (zero? (:exit hook-result))
      (let [output (str/trim (:out hook-result))]
        (print-check "Git hooks status" :ok "git-embed manages hooks")
        (doseq [line (str/split-lines output)]
          (println "   " line)))
      (print-check "Git hooks status" :warning "git-embed status failed"))))

(defn check-semantic-clj-compilation []
  (print-section "3. Semantic.clj Scheduler Compilation Check")
  (let [file-path "src/ouroboros/learning/semantic.clj"
        file (io/file file-path)]
    (if (.exists file)
      (do
        (print-check "File exists" :ok file-path)
        (try
          ;; Try to load the namespace to check for compilation errors
          (load-string (format "(require '%s)" 'ouroboros.learning.semantic))
          (print-check "Namespace loads" :ok "No compilation errors")
          (catch Exception e
            (print-check "Compilation error" :error (.getMessage e)))))
      (print-check "File missing" :error file-path))))

(defn check-commands-clj-compilation []
  (print-section "4. Commands.clj Compilation Check")
  (let [file-path "src/ouroboros/chat/commands.clj"
        file (io/file file-path)]
    (if (.exists file)
      (do
        (print-check "File exists" :ok file-path)
        ;; Check for new command handlers
        (let [content (slurp file-path)
              has-gaps-command (str/includes? content "defmethod handle-command :gaps")
              has-auto-relink-start (str/includes? content "defmethod handle-command :auto-relink-start")
              has-auto-relink-stop (str/includes? content "defmethod handle-command :auto-relink-stop")
              has-auto-relink-status (str/includes? content "defmethod handle-command :auto-relink-status")
              has-semantic-health (str/includes? content "defmethod handle-command :semantic-health")]
          (print-check "/gaps command" (if has-gaps-command :ok :error))
          (print-check "/auto-relink-start" (if has-auto-relink-start :ok :error))
          (print-check "/auto-relink-stop" (if has-auto-relink-stop :ok :error))
          (print-check "/auto-relink-status" (if has-auto-relink-status :ok :error))
          (print-check "/semantic-health" (if has-semantic-health :ok :error))))
      (print-check "File missing" :error file-path))))

(defn check-plan-md-updates []
  (print-section "5. PLAN.md Gap Status Check")
  (let [file-path "PLAN.md"
        file (io/file file-path)]
    (if (.exists file)
      (let [content (slurp file-path)
            lines (str/split-lines content)
            gap-section (first (filter #(str/includes? % "Learning + Embed Gaps") lines))]
        (if gap-section
          (do
            (print-check "Gap section found" :ok)
            ;; Count checkmarks
            (let [auto-index (some #(str/includes? % "Auto index updates") lines)
                  binary-health (some #(str/includes? % "Binary health checks") lines)
                  hybrid-search (some #(str/includes? % "Hybrid search fix") lines)
                  code-relinking (some #(str/includes? % "Code re-linking on changes") lines)
                  chat-commands (some #(str/includes? % "Chat command integration") lines)]
              (print-check "Auto index updates" (if (and auto-index (str/includes? auto-index "✅")) :ok :warning))
              (print-check "Binary health checks" (if (and binary-health (str/includes? binary-health "✅")) :ok :warning))
              (print-check "Hybrid search fix" (if (and hybrid-search (str/includes? hybrid-search "✅")) :ok :warning))
              (print-check "Code re-linking" (if (and code-relinking (str/includes? code-relinking "✅")) :ok :warning))
              (print-check "Chat commands" (if (and chat-commands (str/includes? chat-commands "✅")) :ok :warning))))
          (print-check "Gap section missing" :error)))
      (print-check "PLAN.md missing" :error))))

(defn check-state-md-updates []
  (print-section "6. STATE.md Gap Status Check")
  (let [file-path "STATE.md"
        file (io/file file-path)]
    (if (.exists file)
      (let [content (slurp file-path)
            lines (str/split-lines content)
            gap-line (first (filter #(str/includes? % "Learning + Embed Gaps Integration") lines))]
        (if gap-line
          (do
            (print-check "Gap status line found" :ok)
            (let [all-addressed (str/includes? gap-line "all gaps addressed")]
              (print-check "All gaps addressed" (if all-addressed :ok :warning) gap-line)))
          (print-check "Gap status missing" :warning)))
      (print-check "STATE.md missing" :error))))

(defn main []
  (print-header "Learning+Embed Gaps Integration Verification")
  (println "Date:" (java.time.LocalDateTime/now))
  (println "Repository:" (.getAbsolutePath (io/file ".")))
  (println)
  
  (check-git-embed-installed)
  (check-git-embed-hooks)
  (check-semantic-clj-compilation)
  (check-commands-clj-compilation)
  (check-plan-md-updates)
  (check-state-md-updates)
  
  (print-header "Verification Complete")
  (println "📊 Summary: All 5 gaps should show ✅ in checks above.")
  (println "📝 Next: Run actual scheduler tests when system is running.")
  (println "💡 Use chat commands: /gaps, /auto-relink-status, /semantic-health"))

(main)