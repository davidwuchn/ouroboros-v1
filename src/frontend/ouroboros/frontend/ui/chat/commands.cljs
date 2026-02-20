(ns ouroboros.frontend.ui.chat.commands
  "Chat command parser and execution.
   
   Commands:
   /learn <title> -p <pattern> -c <category> [Save a learning]
   /recall <query> [Search learnings]
   /wisdom [Show current level + due reviews]
   /build <type> [Navigate to builder: empathy|valueprop|mvp|canvas]
   /help [Show available commands]"
  (:require
   [clojure.string :as str]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Command Parser
;; ============================================================================

(def ^:private command-regex #"^/(\w+)(?:\s+(.+))?$")

(defn- parse-command
  "Parse a chat message into command and args.
   Returns {:command keyword :args string :raw string} or nil if not a command."
  [message]
  (when (and (string? message)
             (str/starts-with? message "/"))
    (let [[_ command-str args-str] (re-find command-regex message)]
      (when command-str
        {:command (keyword command-str)
         :args (str/trim (or args-str ""))
         :raw message}))))

;; ============================================================================
;; Argument Parser
;; ============================================================================

(defn- parse-args
  "Parse args string into keyword map.
   Supports flags: -p <pattern> -c <category> -t <title>
   Example: '/learn My Title -p "error pattern" -c errors/fixes'"
  [args-str]
  (if (str/blank? args-str)
    {}
    (let [;; Split by flags
          parts (re-seq #"(-\w+)\s+(?:(\"[^\"]+\")|(\S+))|([^\s-]+)" args-str)
          ;; Parse into key-value pairs
          result (reduce (fn [acc part]
                          (let [[flag quoted-val unquoted-val bare-val] part]
                            (cond
                              flag
                              (assoc acc (keyword (subs flag 1)) (or quoted-val unquoted-val))
                              bare-val
                              (assoc acc :title bare-val)
                              :else
                              acc)))
                        {}
                        (filter some? parts))]
      result)))

;; ============================================================================
;; Command Handlers
;; ============================================================================

(defn handle-learn-command
  "Handle /learn command.
   Usage: /learn <title> -p <pattern> -c <category>"
  [args]
  (let [parsed (parse-args args)
        title (or (:title parsed) (:t parsed))
        pattern (or (:pattern parsed) (:p parsed))
        category (or (:category parsed) (:c parsed) "general")]
    (if (str/blank? title)
      {:error "Missing title. Usage: /learn <title> -p <pattern> -c <category>"}
      ;; For now, show what would be saved
      ;; TODO: Integrate with learning API when ready
      {:type :learn-command
       :title title
       :pattern pattern
       :category category
       :message (str "✓ Would save learning: \"" title "\" in \"" category "\"")})))

(defn handle-recall-command
  "Handle /recall command.
   Usage: /recall <query>"
  [args]
  (let [query (str/trim args)]
    (if (str/blank? query)
      {:error "Missing query. Usage: /recall <query>"}
      ;; Request learning search
      (do
        (ws/search-learnings! query)
        {:type :recall-command
         :query query
         :message (str "🔍 Searching for: \"" query "\"...")}))))

(defn handle-wisdom-command
  "Handle /wisdom command.
   Shows current level and due reviews."
  [_args]
  ;; Request flywheel progress and due reviews
  (ws/request-learning-flywheel!)
  (ws/request-due-reviews!)
  {:type :wisdom-command
   :message "📊 Loading your learning wisdom..."})

(defn handle-build-command
  "Handle /build command.
   Usage: /build <type>
   Types: empathy|valueprop|mvp|canvas"
  [args]
  (let [builder-type (keyword (str/trim args))]
    (if (nil? builder-type)
      {:error "Missing type. Usage: /build <type> (empathy|valueprop|mvp|canvas)"}
      (if-not (#{:empathy :valueprop :mvp :canvas} builder-type)
        {:error (str "Invalid type. Valid: empathy, valueprop, mvp, canvas. Got: " args)}
        ;; Navigate to builder
        (when-let [nav @ws/navigate-callback]
          (let [state-atom @ws/app-state-atom
                ws-project (get @state-atom :workspace/project)
                project-id (:project/id ws-project)
                encoded-id (str/replace (str project-id) "/" "~")
                stage (case builder-type
                         :empathy "empathy"
                         :valueprop "valueprop"
                         :mvp "mvp"
                         :canvas "canvas")]
            (when project-id
              (nav ["project" encoded-id stage])
              {:type :build-command
               :builder-type builder-type
               :message (str "🚀 Opening " (name builder-type) " builder...")})))))))

(defn handle-help-command
  "Handle /help command.
   Shows available commands."
  [_args]
  {:type :help-command
   :message (str/join "\n"
                       ["📚 Available Commands:"
                        ""
                        "/learn <title> -p <pattern> -c <category>"
                        "  Save a learning insight"
                        "  Example: /learn Check nils -p \"always check for nil\" -c errors/fixes"
                        ""
                        "/recall <query>"
                        "  Search your learnings"
                        "  Example: /recall nil safety"
                        ""
                        "/wisdom"
                        "  Show your learning progress and due reviews"
                        ""
                        "/build <type>"
                        "  Navigate to a builder"
                        "  Example: /build empathy"
                        "  Types: empathy, valueprop, mvp, canvas"
                        ""
                        "/help"
                        "  Show this help message"
                        ""])})

;; ============================================================================
;; Command Router
;; ============================================================================

(defn execute-command
  "Execute a parsed command.
   Returns {:type ... :message ...} or {:error ...}"
  [{:keys [command args]}]
  (case command
    :learn (handle-learn-command args)
    :recall (handle-recall-command args)
    :wisdom (handle-wisdom-command args)
    :build (handle-build-command args)
    :help (handle-help-command args)
    {:error (str "Unknown command: " command ". Use /help for available commands.")}))

(defn parse-and-execute
  "Parse and execute a chat message.
   Returns nil if not a command, otherwise result map."
  [message]
  (when-let [parsed (parse-command message)]
    (execute-command parsed)))

;; ============================================================================
;; Command Detection
;; ============================================================================

(defn command?
  "Check if a message is a command."
  [message]
  (and (string? message)
       (str/starts-with? message "/")))

(defn help-command?
  "Check if message is a help request."
  [message]
  (or (= "/help" (str/trim message))
      (= "/?" (str/trim message))))

(comment
  ;; Test command parser
  (parse-command "/learn My Title -p \"pattern\" -c errors")
  ;; => {:command :learn, :args "My Title -p \"pattern\" -c errors", :raw "/learn My Title -p \"pattern\" -c errors"}
  
  ;; Test argument parser
  (parse-args "My Title -p \"error pattern\" -c errors/fixes")
  ;; => {:title "My Title", :pattern "error pattern", :category "errors/fixes"}
  
  ;; Test execute
  (execute-command {:command :help :args ""})
  (execute-command {:command :build :args "empathy"})
  (execute-command {:command :recall :args "nil"})
  
  ;; Test parse-and-execute
  (parse-and-execute "/help")
  (parse-and-execute "/not a command")
  (parse-and-execute "Just a regular message"))
