(ns ouroboros.process-runner
  "Process runner using tmux for long-running processes with full interactive control.
   
   Features:
   - Start/stop/restart processes in tmux sessions
   - Real-time output viewing via attachment
   - Input sending capability
   - Status monitoring
   - Session persistence after detachment
   - Works with shell_command (exits quickly)
   
   Usage:
   (require '[ouroboros.process-runner :as pr])
   
   ;; Start a process
   (pr/start! \"webserver\" \"python -m http.server 8080\")
   
   ;; Check status
   (pr/status \"webserver\")
   
   ;; Send input
   (pr/send! \"webserver\" \"ls\")
   
   ;; Stop process
   (pr/stop! \"webserver\")
   
   CLI interface:
   $ bb -m ouroboros.process-runner start webserver \"python -m http.server 8080\"
   $ bb -m ouroboros.process-runner status webserver
   $ bb -m ouroboros.process-runner stop webserver
   
   Or via bb.edn tasks:
   $ bb process start webserver \"python -m http.server 8080\""
  (:require
   [babashka.process :as p]
   [clojure.set :as set]
   [clojure.string :as str]
   [clojure.pprint :refer [pprint]]))

(def ^:private session-prefix "proc-")

(defn- get-session-name
  "Get tmux session name for a given process name."
  [name]
  (str session-prefix name))

(defn- ensure-tmux
  "Check that tmux is installed and working."
  []
  (let [tmux-exists? (try
                       (p/sh ["tmux" "-V"])
                       true
                       (catch Exception _ false))]
    (when-not tmux-exists?
      (throw (ex-info "tmux is not installed or not working"
                      {:message "Install tmux for your system"
                       :install-commands {:macos "brew install tmux"
                                          :ubuntu "sudo apt-get install tmux"
                                          :fedora "sudo dnf install tmux"
                                          :arch "sudo pacman -S tmux"
                                          :windows-wsl "sudo apt-get install tmux"}})))))

(defn session-exists?
  "Check if a tmux session exists."
  [session-name]
  (let [result (p/sh ["tmux" "has-session" "-t" session-name])]
    (= 0 (:exit result))))

(defn- ensure-session-absent!
  "Throw if session already exists."
  [name session-name]
  (when (session-exists? session-name)
    (throw (ex-info (str "Session already exists: " name)
                    {:name name :session-name session-name}))))

(defn- create-tmux-session!
  "Create a new tmux session. Returns session-name on success, throws on failure."
  [session-name command]
  (let [cmd ["tmux" "new-session" "-s" session-name "-d" (str "bash -c '" command "'; exec bash")]
        result (p/sh cmd)]
    (when-not (= 0 (:exit result))
      (throw (ex-info (str "Failed to create tmux session: " (:err result))
                      {:command cmd :error (:err result)})))
    (Thread/sleep 500)
    session-name))

(defn- verify-session-started!
  "Verify session exists after creation. Throws if session disappeared."
  [session-name name]
  (when-not (session-exists? session-name)
    (throw (ex-info "Failed to start session (session disappeared)"
                    {:name name :session-name session-name})))
  session-name)

(defn- print-start-help [session-name name]
  (println "Process '" name "' started in tmux session:" session-name)
  (println)
  (println "To interact:")
  (println "  bb process attach " name "      # Attach interactively (Ctrl+B, D to detach)")
  (println "  bb process send " name " 'ls'   # Send command to session")
  (println "  bb process logs " name " -f     # Follow output")
  (println "  bb process stop " name "        # Stop the session"))

(defn start!
  "Start a process in a tmux session.

   Args:
     name - unique name for the process
     command - shell command to execute

   Returns:
     session name if successful

   Throws:
     ex-info if session already exists or tmux fails"
  [name command]
  (ensure-tmux)
  (let [session-name (get-session-name name)]
    (ensure-session-absent! name session-name)
    (println "Starting process '" name "' in tmux session...")
    (println "Command:" command)
    (-> session-name
        (create-tmux-session! command)
        (verify-session-started! name)
        (doto (print-start-help name)))))

(defn start-or-ignore!
  "Start a process, or do nothing if already running.
   Returns :started or :already-running."
  [name command]
  (let [session-name (get-session-name name)]
    (if (session-exists? session-name)
      (do (println "[INFO]" name "already running")
          :already-running)
      (do (start! name command)
          :started))))

(defn stop!
  "Stop a tmux session (kills the process).
   
   Args:
     name - process name
   
   Returns:
     true if stopped, false if not found
   
   Throws:
     ex-info if tmux fails"
  [name]
  (ensure-tmux)
  (let [session-name (get-session-name name)]
    (if-not (session-exists? session-name)
      (do
        (println "Session '" name "' not found")
        false)
      (do
        (println "Stopping session '" name "'...")
        (let [result (p/sh ["tmux" "kill-session" "-t" session-name])]
          (when-not (= 0 (:exit result))
            (throw (ex-info (str "Failed to stop session: " (:err result))
                            {:name name :session-name session-name :error (:err result)})))

          ;; Verify it's gone
          (Thread/sleep 500)
          (if (session-exists? session-name)
            (throw (ex-info "Failed to stop session (still exists)"
                            {:name name :session-name session-name}))
            (do
              (println "Session '" name "' stopped")
              true)))))))

(defn status
  "Get status of a process.
   
   Args:
     name - process name
   
   Returns:
     map with keys:
       :name - process name
       :session-name - tmux session name
       :running? - boolean
       :info - additional session info if running
   
   Throws:
     ex-info if tmux fails"
  [name]
  (ensure-tmux)
  (let [session-name (get-session-name name)]
    (if-not (session-exists? session-name)
      {:name name
       :session-name session-name
       :running? false}
      (let [info-result (try
                          (p/sh ["tmux" "list-sessions" "-F" "#{session_name}:#{session_windows}:#{session_created}"])
                          (catch Exception _ nil))
            sessions (when info-result
                       (str/split-lines (:out info-result)))
            session-info (when sessions
                           (first (filter #(str/starts-with? % session-name) sessions)))]
        {:name name
         :session-name session-name
         :running? true
         :info (when session-info
                 (let [[_ windows created] (str/split session-info #":" 3)]
                   {:windows windows :created created}))}))))

(defn attach!
  "Attach to a tmux session interactively.
   
   Note: This will block until you detach (Ctrl+B, D).
   
   Args:
     name - process name
   
   Throws:
     ex-info if session not found or tmux fails"
  [name]
  (ensure-tmux)
  (let [session-name (get-session-name name)]
    (when-not (session-exists? session-name)
      (throw (ex-info (str "Session not found: " name)
                      {:name name :session-name session-name})))

    (println "Attaching to session '" name "' (Press Ctrl+B, D to detach)...")
    (p/process ["tmux" "attach-session" "-t" session-name]
               {:inherit true})))

(defn send!
  "Send input to a tmux session.
   
   Args:
     name - process name
     input - string to send (will be followed by Enter)
   
   Returns:
     true if sent successfully
   
   Throws:
     ex-info if session not found or tmux fails"
  [name input]
  (ensure-tmux)
  (let [session-name (get-session-name name)]
    (when-not (session-exists? session-name)
      (throw (ex-info (str "Session not found: " name)
                      {:name name :session-name session-name})))

    (let [result (p/sh ["tmux" "send-keys" "-t" session-name input "Enter"])]
      (when-not (= 0 (:exit result))
        (throw (ex-info (str "Failed to send input: " (:err result))
                        {:name name :input input :error (:err result)})))
      (println "Sent to '" name "':" input)
      true)))

(defn logs
  "Get logs/output from a tmux session.
   
   Args:
     name - process name
     opts - map with keys:
            :follow? - boolean, follow output (default false)
            :lines - number of lines to show (default 50, ignored if :follow? true)
   
   Returns:
     sequence of output lines (if not following)
     nil if following (blocks until interrupted)
   
   Throws:
     ex-info if session not found or tmux fails"
  [name & {:keys [follow? lines] :or {follow? false lines 50}}]
  (ensure-tmux)
  (let [session-name (get-session-name name)]
    (when-not (session-exists? session-name)
      (throw (ex-info (str "Session not found: " name)
                      {:name name :session-name session-name})))

    (if follow?
      (do
        (println "Following output from '" name "' (Ctrl+C to stop)...")
        (p/process ["tmux" "capture-pane" "-t" session-name "-p" "-S" "-1000"]
                   {:inherit true}))
      (let [result (p/sh ["tmux" "capture-pane" "-t" session-name "-p"])]
        (when-not (= 0 (:exit result))
          (throw (ex-info (str "Failed to capture output: " (:err result))
                          {:name name :error (:err result)})))
        (->> (:out result)
             str/split-lines
             (take-last lines))))))

(defn list-sessions
  "List all managed tmux sessions.
   
   Returns:
     sequence of session maps with keys:
       :name - clean process name (without prefix)
       :session-name - full tmux session name
       :info - session info string
   
   Throws:
     ex-info if tmux fails"
  []
  (ensure-tmux)
  (let [result (p/sh ["tmux" "list-sessions" "-F" "#{session_name}:#{session_windows}:#{session_created}"])]
    (when-not (= 0 (:exit result))
      (throw (ex-info (str "Failed to list sessions: " (:err result))
                      {:error (:err result)})))

    (->> (:out result)
         str/split-lines
         (filter #(str/starts-with? % session-prefix))
         (map (fn [line]
                (let [[session-name windows created] (str/split line #":" 3)
                      clean-name (subs session-name (count session-prefix))]
                  {:name clean-name
                   :session-name session-name
                   :info (str windows " windows, created " created)}))))))

(defn- kill-session!
  "Kill a tmux session, ignoring errors if it doesn't exist."
  [session-name]
  (try
    (let [result (p/sh ["tmux" "kill-session" "-t" session-name])]
      (= 0 (:exit result)))
    (catch Exception _
      false)))

(defn clean!
  "Clean up zombie tmux sessions - sessions that exist in tmux but have no
   running process (defunct/zombie state).

   Returns:
     number of sessions cleaned up

   Throws:
     ex-info if tmux fails"
  []
  (ensure-tmux)
  (let [result (p/sh ["tmux" "list-sessions" "-F" "#{session_name}"])
        all-tmux-sessions (when (= 0 (:exit result))
                            (->> (:out result)
                                 str/split-lines
                                 (filter #(str/starts-with? % session-prefix))
                                 set))
        managed-sessions (set (map :session-name (list-sessions)))
        ;; Find sessions in tmux that aren't properly managed (orphaned)
        orphaned (clojure.set/difference all-tmux-sessions managed-sessions)]
    (doseq [session-name orphaned]
      (println "Removing orphaned session:" (subs session-name (count session-prefix)))
      (kill-session! session-name))
    (count orphaned)))

(defonce ^:private activity-timestamps (atom {}))

(defn last-activity
  "Get the last activity timestamp for a session.
    
    Args:
      name - process name
    
    Returns:
      epoch millis of last activity, or nil if never tracked"
  [name]
  (get @activity-timestamps name))

(defn- capture-pane-content
  "Get raw pane content from a tmux session.
    
    Args:
      session-name - tmux session name
    
    Returns:
      raw string content, or nil if failed"
  [session-name]
  (try
    (let [result (p/sh ["tmux" "capture-pane" "-t" session-name "-p" "-S" "-100"])]
      (when (= 0 (:exit result))
        (:out result)))
    (catch Exception _
      nil)))

(defn idle?
  "Check if a terminal session appears idle (no recent output).
    
    Args:
      name - process name
      threshold-ms - idle threshold in ms (default 5000)
    
    Returns:
      map with keys:
        :idle? - boolean, true if no output since threshold
        :last-activity - epoch millis of last activity
        :has-output - boolean, whether output was captured"
  ([name] (idle? name 5000))
  ([name threshold-ms]
   (ensure-tmux)
   (let [session-name (get-session-name name)]
     (if-not (session-exists? session-name)
       {:idle? false :last-activity nil :has-output false :error "session not found"}
       (let [content (capture-pane-content session-name)
             has-output? (and content (not (str/blank? content)))
             now (System/currentTimeMillis)
             last-activity (or (last-activity name) now)
             idle-threshold (+ last-activity threshold-ms)
             idle? (and has-output? (<= now idle-threshold))]
         {:idle? idle?
          :last-activity last-activity
          :has-output has-output?
          :time-since-last-activity (when last-activity (- now last-activity))})))))

(def ^:private prompt-patterns
  "Shell prompt patterns with their type identifiers."
  [[#".*\$ *$" :bash]
   [#".*❯ *$" :zsh]
   [#".* > *$" :fish]
   [#".*➜" :git]
   [#".*λ" :plan9]
   [#".*\]" :posix]])

(defn- detect-prompt
  "Detect prompt type from last line. Returns [matched? prompt-type]."
  [last-line patterns]
  (if-let [match (some (fn [[regex ptype]]
                         (when (re-find regex last-line)
                           [true ptype]))
                       patterns)]
    match
    [(boolean last-line) :unknown]))

(defn at-prompt?
  "Check if the terminal is at a prompt state.

    Detects common shell prompts by pattern matching on the last line.

    Args:
      name - process name
      patterns - optional custom prompt patterns (default: common shell prompts)

    Returns:
      map with keys:
        :at-prompt? - boolean
        :prompt-line - the detected prompt line, if any
        :prompt-type - :bash :zsh :fish :unknown :none"
  ([name] (at-prompt? name nil))
  ([name custom-patterns]
   (ensure-tmux)
   (let [session-name (get-session-name name)]
     (if-not (session-exists? session-name)
       {:at-prompt? false :prompt-line nil :prompt-type :none :error "session not found"}
       (let [content (capture-pane-content session-name)
             lines (when content (str/split-lines content))
             last-line (when (seq lines) (last lines))
             patterns (or custom-patterns prompt-patterns)
             [matched? ptype] (when last-line (detect-prompt last-line patterns))]
         {:at-prompt? matched?
          :prompt-line last-line
          :prompt-type (if last-line ptype :none)})))))

(defn terminal-state
  "Get terminal dimensions and cursor information.
    
    Args:
      name - process name
    
    Returns:
      map with keys:
        :width - terminal width in columns
        :height - terminal height in lines
        :cursor-x - cursor x position (0-indexed)
        :cursor-y - cursor y position (0-indexed)
        :pane-id - tmux pane identifier"
  [name]
  (ensure-tmux)
  (let [session-name (get-session-name name)]
    (if-not (session-exists? session-name)
      {:width nil :height nil :error "session not found"}
      (try
        (let [pane-result (p/sh ["tmux" "display-message" "-t" session-name "-p" "#{pane_width}x#{pane_height}"])
              cursor-result (p/sh ["tmux" "display-message" "-t" session-name "-p" "#{cursor_x} #{cursor_y}"])
              pane-id-result (p/sh ["tmux" "display-message" "-t" session-name "-p" "#{pane_id}"])]
          (when (= 0 (:exit pane-result))
            (let [[width height] (str/split (str/trim (:out pane-result)) #"x")]
              (when width
                (merge {:width (Integer/parseInt width)
                        :height (Integer/parseInt height)
                        :pane-id (str/trim (:out pane-id-result))}
                       (when (and (= 0 (:exit cursor-result)) (:out cursor-result))
                         (let [[x y] (str/split (str/trim (:out cursor-result)) #" ")]
                           (when (and x y)
                             {:cursor-x (Integer/parseInt x)
                              :cursor-y (Integer/parseInt y)}))))))))
        (catch Exception e
          {:error (.getMessage e)})))))

(defn recent-output
  "Get recent output from a session since a given timestamp.
    
    Args:
      name - process name
      since-ms - epoch millis to get output since (default: last known activity)
    
    Returns:
      map with keys:
        :lines - sequence of output lines
        :new-activity - whether new output was detected"
  ([name] (recent-output name nil))
  ([name since-ms]
   (ensure-tmux)
   (let [session-name (get-session-name name)
         since (or since-ms (last-activity name) 0)
         content (capture-pane-content session-name)
         lines (when content (str/split-lines content))]
     {:lines (or lines [])
      :new-activity (> (System/currentTimeMillis) since)})))

(defn session-stats
  "Get comprehensive session statistics.
    
    Args:
      name - process name
    
    Returns:
      map with all session introspection data"
  [name]
  (let [idle-data (idle? name)
        prompt-data (at-prompt? name)
        term-data (terminal-state name)
        activity (last-activity name)]
    {:name name
     :session-name (get-session-name name)
     :running? (:running? (status name))
     :idle idle-data
     :prompt prompt-data
     :terminal term-data
     :last-activity activity
     :timestamp (System/currentTimeMillis)}))

(defn check
  "Check tmux installation and basic functionality.
   
   Returns:
     true if tmux is properly installed and working"
  []
  (let [check-failed (ex-info "check failed" {})]
    (try
      (println "Checking tmux installation...")

      ;; Check if tmux is in PATH
      (let [version-result (p/sh ["tmux" "-V"])]
        (if (= 0 (:exit version-result))
          (println "✓ tmux found in PATH, version:" (str/trim (:out version-result)))
          (do
            (println "✗ tmux NOT found in PATH")
            (println)
            (println "Install tmux for your system:")
            (println "  macOS:            brew install tmux")
            (println "  Ubuntu/Debian:    sudo apt-get install tmux")
            (println "  Fedora/RHEL:      sudo dnf install tmux")
            (println "  Arch Linux:       sudo pacman -S tmux")
            (println "  OpenSUSE:         sudo zypper install tmux")
            (println "  Alpine Linux:     sudo apk add tmux")
            (println "  Windows (WSL):    sudo apt-get install tmux")
            (println)
            (println "Or download from: https://github.com/tmux/tmux")
            (throw check-failed))))

      ;; Check if tmux server can be started
      (let [server-result (p/sh ["tmux" "start-server"])]
        (if (= 0 (:exit server-result))
          (println "✓ tmux server can be started")
          (do
            (println "✗ tmux server failed to start")
            (throw check-failed))))

      ;; Test basic functionality
      (let [test-session (str "test-" (System/currentTimeMillis))
            create-result (p/sh ["tmux" "new-session" "-s" test-session "-d" "sleep 0.1"])]
        (if (= 0 (:exit create-result))
          (do
            (println "✓ tmux can create sessions")
            (p/sh ["tmux" "kill-session" "-t" test-session]))
          (do
            (println "✗ tmux cannot create sessions")
            (throw check-failed))))

      (println)
      (println "✅ tmux is properly installed and working!")
      (println "   Process Runner is ready to use.")
      true
      (catch Exception e
        (if (= e check-failed)
          false
          (do
            (println "✗ Error checking tmux:" (.getMessage e))
            false))))))

;; CLI command registry: name -> {:arity n :fn (fn [args] ...)}
(def ^:private cli-commands
  {"start"    {:arity 2 :fn (fn [[name cmd]] (start! name cmd))}
   "stop"     {:arity 1 :fn (fn [[name]] (stop! name))}
   "status"   {:arity 1 :fn (fn [[name]] (pprint (status name)))}
   "attach"   {:arity 1 :fn (fn [[name]] (attach! name))}
   "send"     {:arity 2 :fn (fn [[name input]] (send! name input))}
   "list"     {:arity 0 :fn (fn [_] (doseq [s (list-sessions)]
                                      (println " " (:name s) "-" (:info s))))}
   "clean"    {:arity 0 :fn (fn [_] (println "Cleaned up" (clean!) "orphaned session(s)"))}
   "check"    {:arity 0 :fn (fn [_] (check))}
   "prompt"   {:arity 1 :fn (fn [[name]] (pprint (at-prompt? name)))}
   "terminal" {:arity 1 :fn (fn [[name]] (pprint (terminal-state name)))}
   "stats"    {:arity 1 :fn (fn [[name]] (pprint (session-stats name)))}})

(defn- print-help []
  (println "Process Runner - Manage long-running processes with tmux")
  (println)
  (println "Usage: bb -m ouroboros.process-runner <command> [args...]")
  (println)
  (println "Commands:")
  (println "  start <name> <command>    Start a process in a tmux session")
  (println "  stop <name>               Stop a tmux session (kills process)")
  (println "  status <name>             Check if session is running")
  (println "  attach <name>             Attach to session (interactive)")
  (println "  send <name> <input>       Send input to session")
  (println "  list                      List all managed sessions")
  (println "  clean                     Clean up orphaned sessions")
  (println "  check                     Verify tmux is installed and working")
  (println "  prompt <name>             Check if terminal is at shell prompt")
  (println "  terminal <name>           Get terminal dimensions and cursor")
  (println "  stats <name>              Get comprehensive session statistics")
  (println)
  (println "Examples:")
  (println "  bb -m ouroboros.process-runner start webserver \"python -m http.server 8080\"")
  (println "  bb -m ouroboros.process-runner status webserver")
  (println "  bb -m ouroboros.process-runner stop webserver"))

(defn- run-cli-command [cmd-name args]
  (if-let [{:keys [arity fn]} (get cli-commands cmd-name)]
    (if (>= (count args) arity)
      (try
        (fn (take arity args))
        true
        (catch Exception e
          (println "Error:" (.getMessage e))
          false))
      (do (println (str "Error: " cmd-name " requires " arity " argument(s)"))
          false))
    (do (println "Unknown command:" cmd-name)
        false)))

(defn -main [& args]
  (if (empty? args)
    (do (print-help)
        (System/exit 1))
    (let [cmd-name (first args)
          rest-args (rest args)]
      (if (run-cli-command cmd-name rest-args)
        (System/exit 0)
        (System/exit 1)))))