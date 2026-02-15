(ns ouroboros.educational-approval
  "Educational approval enhancement - Turn tool approvals into teaching moments

   Enhances tool approval requests with:
   - Risk level explanations
   - Best practices
   - Learning opportunities
   - Safety context

   Usage:
   (require '[ouroboros.educational-approval :as edu])
   (edu/enhance-approval-message \"file/write\" {:path \"config.json\"})"
  (:require
   [clojure.string :as str]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Tool Knowledge Base
;; ============================================================================

(def ^:private tool-knowledge
  "Knowledge base for common tools - risk levels, explanations, best practices"
  {"file/write" {:risk :medium
                 :title "File Write Operation"
                 :why-approval ["Writing files can change application behavior"
                                "Incorrect content may cause runtime errors"
                                "Version control helps track configuration changes"]
                 :best-practices ["Review the diff before approving"
                                  "Consider creating a backup first"
                                  "Test in development environment"]
                 :learning-opportunity "File system safety and configuration management"
                 :danger-patterns ["*.json" "*.yml" "*.env" "config*"]}

   "file/delete" {:risk :high
                  :title "File Delete Operation"
                  :why-approval ["Deleting files is irreversible"
                                 "System files deletion can break functionality"
                                 "Data loss may be permanent"]
                  :best-practices ["Double-check the file path"
                                   "Consider moving to trash instead"
                                   "Verify no other processes need the file"]
                  :learning-opportunity "Data lifecycle and safe deletion practices"
                  :danger-patterns ["*" ".*" "node_modules/" ".git/"]}

   "file/rename" {:risk :low
                  :title "File Rename Operation"
                  :why-approval ["Renaming may break references in code"
                                 "Some tools depend on specific file names"
                                 "Build systems may fail after rename"]
                  :best-practices ["Update references in code"
                                   "Check for hardcoded paths"
                                   "Test after rename"]
                  :learning-opportunity "Refactoring and dependency management"
                  :danger-patterns ["*.java" "*.py" "package.json"]}

   "shell/exec" {:risk :high
                 :title "Shell Command Execution"
                 :why-approval ["Shell commands can have side effects"
                                "Malicious or buggy commands can damage system"
                                "Some commands require elevated privileges"]
                 :best-practices ["Understand what the command does"
                                  "Run in isolated environment first"
                                  "Check for destructive flags (rm, -rf, format)"]
                 :learning-opportunity "Command-line safety and system administration"
                 :danger-patterns ["rm " "sudo " "chmod " "format "]}

   "bash" {:risk :high
           :title "Bash Script Execution"
           :why-approval ["Scripts can contain hidden commands"
                          "Variable expansion may have unexpected effects"
                          "Scripts can modify environment variables"]
           :best-practices ["Review script line by line"
                            "Check for external dependencies"
                            "Run with dry-run flag first"]
           :learning-opportunity "Shell scripting safety and debugging"
           :danger-patterns ["eval " "exec " ">$"]}

   "cmd" {:risk :high
          :title "Windows Command Execution"
          :why-approval ["Windows commands can modify registry"
                         "Batch files can have complex control flow"
                         "Some commands affect system configuration"]
          :best-practices ["Understand Windows-specific risks"
                           "Check for registry modifications"
                           "Review FOR loops and variable expansion"]
          :learning-opportunity "Windows system administration"
          :danger-patterns ["reg " "format " "del "]}

   "memory/clear" {:risk :low
                   :title "Memory Clear Operation"
                   :why-approval ["Clearing memory removes conversation history"
                                  "Some insights may be lost"
                                  "Learning patterns reset"]
                   :best-practices ["Export important insights first"
                                    "Consider selective clearing"
                                    "Understand what will be lost"]
                   :learning-opportunity "Memory management and data persistence"
                   :danger-patterns []}

   "memory/delete" {:risk :low
                    :title "Memory Delete Operation"
                    :why-approval ["Deleting specific memories may affect context"
                                   "Learning insights may be lost"
                                   "Pattern recognition may degrade"]
                    :best-practices ["Review what will be deleted"
                                     "Consider archiving instead"
                                     "Check dependencies"]
                    :learning-opportunity "Knowledge management and curation"
                    :danger-patterns []}

   "system/shutdown" {:risk :critical
                      :title "System Shutdown"
                      :why-approval ["Shutdown interrupts all operations"
                                     "Unsaved work may be lost"
                                     "Some processes may not restart cleanly"]
                      :best-practices ["Save all work first"
                                       "Check for running critical processes"
                                       "Consider graceful shutdown vs force"]
                      :learning-opportunity "System lifecycle management"
                      :danger-patterns []}

   "system/reboot" {:risk :critical
                    :title "System Reboot"
                    :why-approval ["Reboot interrupts all operations"
                                   "Services may not restart properly"
                                   "Temporary data will be lost"]
                    :best-practices ["Save all work first"
                                     "Check service dependencies"
                                     "Consider maintenance window"]
                    :learning-opportunity "System maintenance and recovery"
                    :danger-patterns []}})

(def ^:private risk-explanations
  "Explanations for risk levels"
  {:critical "Highest risk - Can cause system failure or data loss"
   :high "High risk - Can cause significant issues or data corruption"
   :medium "Medium risk - Can cause functional issues or configuration problems"
   :low "Low risk - Minor issues or inconvenience"
   :safe "No significant risk"})

(def ^:private risk-emoji
  "Emoji for risk levels"
  {:critical "☠️"
   :high "🔥"
   :medium "⚠️"
   :low "📝"
   :safe "✅"})

;; ============================================================================
;; Educational Content Generation
;; ============================================================================

(defn calculate-risk
  "Calculate risk level for tool with arguments"
  [tool-name arguments]
  (let [base-risk (get-in tool-knowledge [tool-name :risk] :medium)
        path (get arguments :path "")
        command (or (get arguments :command) (get arguments :code) "")]
    
    ;; Increase risk for dangerous patterns
    (cond
      (or (str/includes? command "sudo")
          (str/includes? command "rm -rf")
          (str/includes? command "format")) :critical
      
      (or (str/includes? path ".env")
          (str/includes? path "config")
          (str/includes? command "chmod 777")) :high
      
      :else base-risk)))

(defn get-tool-knowledge
  "Get knowledge about a tool"
  [tool-name]
  (get tool-knowledge tool-name
        {:risk :medium
         :title (str "Tool: " tool-name)
         :why-approval ["This tool requires approval for safety"]
         :best-practices ["Review carefully before approving"]
         :learning-opportunity "Tool safety and usage"
         :danger-patterns []}))

(defn format-risk
  "Format risk level for display"
  [risk]
  (let [emoji (get risk-emoji risk "❓")
        explanation (get risk-explanations risk "Unknown risk level")]
    (format "%s %s - %s" emoji (name risk) explanation)))

(defn format-why-approval
  "Format why approval is needed"
  [reasons]
  (str/join "\n• " (cons "" reasons)))  ; Start with empty string for bullet alignment

(defn format-best-practices
  "Format best practices"
  [practices]
  (str/join "\n1. " (cons "" practices)))  ; Start with empty string for numbered list

(defn format-arguments-preview
  "Format a preview of arguments"
  [tool-name arguments]
  (case tool-name
    "file/write" (let [path (get arguments :path "unknown")
                       content-str (or (get arguments :content) "")
                       content-preview (subs content-str 0 (min 100 (count content-str)))]
                   (format "```\nPath: %s\nPreview: %s...\n```" path content-preview))
    
    "file/delete" (format "```\nPath: %s\n```" (get arguments :path "unknown"))
    
    "file/rename" (format "```\nFrom: %s\nTo: %s\n```"
                          (get arguments :from "unknown")
                          (get arguments :to "unknown"))
    
    "shell/exec" (format "```bash\n%s\n```" (get arguments :command "unknown"))
    
    "bash" (let [code-str (or (get arguments :code) "")
                  code-preview (subs code-str 0 (min 200 (count code-str)))]
              (format "```bash\n%s\n```" code-preview))

    "cmd" (let [code-str (or (get arguments :code) "")
                 code-preview (subs code-str 0 (min 200 (count code-str)))]
             (format "```cmd\n%s\n```" code-preview))
    
    ;; Default
    (format "```json\n%s\n```" (pr-str arguments))))

;; ============================================================================
;; Enhanced Message Generation
;; ============================================================================

(defn enhance-approval-message
  "Create an educational approval message
  
   Returns a map with:
   - :message - Enhanced markdown message
   - :risk - Calculated risk level
   - :learning-opportunity - Learning topic"
  [tool-name arguments]
  (let [knowledge (get-tool-knowledge tool-name)
        risk (calculate-risk tool-name arguments)
        risk-display (format-risk risk)
        why-approval (format-why-approval (:why-approval knowledge))
        best-practices (format-best-practices (:best-practices knowledge))
        arguments-preview (format-arguments-preview tool-name arguments)
        learning-opportunity (:learning-opportunity knowledge)]
    
    {:message (format "*🔐 Tool Approval + Learning Opportunity*\n\n"
                      "**Tool**: `%s`\n"
                      "**Action**: %s\n"
                      "**Risk**: %s\n\n"
                      "📖 **Why this needs approval**:%s\n\n"
                      "✅ **Best practices**:%s\n\n"
                      "📋 **What will happen**:\n%s\n\n"
                      "💡 **Learning opportunity**: %s\n\n"
                      "🔒 **Approve with understanding**: `/confirm {id} understanding-risks`\n"
                      "🚫 **Deny with reason**: `/deny {id} {reason}`"
                      tool-name
                      (or (:title knowledge) tool-name)
                      risk-display
                      why-approval
                      best-practices
                      arguments-preview
                      learning-opportunity)
     :risk risk
     :learning-opportunity learning-opportunity}))

(defn create-learning-from-approval
  "Create a learning opportunity from approval context"
  [user-id tool-name arguments risk]
  (let [knowledge (get-tool-knowledge tool-name)
        title (str "Tool Safety: " (:title knowledge))
        insights [(str "Tool: " tool-name)
                  (str "Risk level: " (name risk))
                  (str "Why approval needed: " (first (:why-approval knowledge)))]
        pattern (str "tool-approval-" (str/replace tool-name #"/" "-"))]
    
    {:user-id user-id
     :title title
     :insights insights
     :pattern pattern
     :category "tool-safety"
     :tags #{tool-name "approval" "safety" (name risk)}
     :examples [{:tool tool-name :arguments arguments :risk risk}]}))

;; ============================================================================
;; Integration Helpers
;; ============================================================================

(defn wrap-forward-approval
  "Wrap the forward-approval function with educational enhancement
  
   Returns a function that can be used as :forward-approval-request in adapter"
  [original-forward-fn]
  (fn [confirmation-id _message tool-name arguments]
    (let [enhanced (enhance-approval-message tool-name arguments)
          ;; Replace {id} placeholder with actual confirmation ID
          final-message (str/replace (:message enhanced) "{id}" confirmation-id)]
      (original-forward-fn confirmation-id final-message tool-name arguments)
      
      ;; Track educational opportunity
      (telemetry/emit! {:event :educational-approval/sent
                        :confirmation-id confirmation-id
                        :tool tool-name
                        :risk (:risk enhanced)
                        :learning-opportunity (:learning-opportunity enhanced)}))))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(require '[com.wsscode.pathom3.connect.operation :as pco])

(pco/defresolver educational-tool-knowledge [_ {:keys [tool/name]}]
  {::pco/output [:tool/risk :tool/why-approval :tool/best-practices :tool/learning-opportunity]}
  (let [knowledge (get-tool-knowledge name)]
    {:tool/risk (:risk knowledge)
     :tool/why-approval (:why-approval knowledge)
     :tool/best-practices (:best-practices knowledge)
     :tool/learning-opportunity (:learning-opportunity knowledge)}))

(def resolvers [educational-tool-knowledge])

(comment
  ;; Usage examples
  (require '[ouroboros.educational-approval :as edu])

  ;; Enhance an approval message
  (edu/enhance-approval-message
    "file/write"
    {:path "config.json" :content "{\"api_key\": \"sk-...\"}"})

  ;; Wrap approval forwarding
  (def enhanced-forward (edu/wrap-forward-approval original-forward-fn))

  ;; Create learning from approval
  (edu/create-learning-from-approval
    :alex
    "file/write"
    {:path "config.json"}
    :medium)

  ;; Calculate risk
  (edu/calculate-risk "shell/exec" {:command "rm -rf /tmp/test"}))
