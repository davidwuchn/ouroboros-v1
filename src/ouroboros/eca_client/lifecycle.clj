(ns ouroboros.eca-client.lifecycle
  "ECA Client Lifecycle - Process management

   Handles starting, stopping, and monitoring the ECA process.
   Includes health checks and auto-restart functionality.

   This namespace is an implementation detail - prefer using
   the public API in ouroboros.eca-client"
  (:require
    [clojure.string :as str]
    [ouroboros.fs :as fs]
    [ouroboros.telemetry :as telemetry]
    [ouroboros.eca-client.core :as core])
  (:import [java.io BufferedReader InputStreamReader]
           [java.util.concurrent TimeUnit]))

;; ============================================================================
;; Initialization
;; ============================================================================

(defn- initialize!
  "Send initialize handshake to ECA. Returns true on success, false on failure."
  [{}]
  (let [;; Get actual process ID for ECA liveness probe
        process-id (try
                     (.pid (java.lang.ProcessHandle/current))
                     (catch Exception _
                       ;; Fallback to hash if ProcessHandle not available (Java 8)
                       (long (hash (str (System/getProperty "user.name") (System/currentTimeMillis))))))
        params {:processId process-id
                :clientInfo {:name "ouroboros"
                             :version "0.1.0"}
                :capabilities {}
                :workspaceFolders [{:uri (str "file://" (System/getProperty "user.dir"))
                                    :name "ouroboros"}]}
        response-promise (core/send-request! "initialize" params)
        timeout-ms 30000
        start-time (System/currentTimeMillis)]

    (telemetry/emit! {:event :eca/initialize})

    (try
      ;; Wait for response with timeout using polling loop
      (loop []
        (cond
          ;; Response received
          (realized? response-promise)
          (let [response @response-promise]
            (if (:error response)
              (do
                (telemetry/emit! {:event :eca/initialize-error
                                  :error (:error response)})
                (println "✗ ECA initialize error:" (:error response))
                false)
              (do
                (println "✓ ECA initialized")
                (telemetry/emit! {:event :eca/initialized})
                ;; Send initialized notification to complete handshake
                (core/send-notification! "initialized" {})
                true)))

          ;; Timeout reached
          (> (- (System/currentTimeMillis) start-time) timeout-ms)
          (do
            (telemetry/emit! {:event :eca/initialize-timeout})
            (println "⚠️  ECA initialize timeout")
            false)

          ;; Keep waiting
          :else
          (do
            (Thread/sleep 100)
            (recur))))

      (catch Exception e
        (telemetry/emit! {:event :eca/initialize-exception
                          :error (.getMessage e)})
        (println "✗ ECA initialize exception:" (.getMessage e))
        false))))

;; ============================================================================
;; Process Management - Track only OUR process via PID file
;; ============================================================================

(def ^:private pid-file
  "Path to the PID file for tracking our ECA process across processes"
  (str (System/getProperty "user.home") "/.cache/ouroboros/eca.pid"))

(defn- ensure-pid-dir!
  "Ensure the PID file directory exists"
  []
  (let [dir (.getParent (java.io.File. pid-file))]
    (when-not (fs/exists? dir)
      (fs/create-dirs dir))))

(defn- read-pid-file
  "Read the PID from the file, or nil if not found/invalid"
  []
  (try
    (when (fs/exists? pid-file)
      (let [pid-str (str/trim (slurp pid-file))]
        (when (seq pid-str)
          (Long/parseLong pid-str))))
    (catch Exception _
      nil)))

(defn- write-pid-file!
  "Write the PID to the file"
  [pid]
  (ensure-pid-dir!)
  (spit pid-file (str pid)))

(defn- clear-pid-file!
  "Remove the PID file"
  []
  (try
    (when (fs/exists? pid-file)
      (.delete (java.io.File. pid-file)))
    (catch Exception _
      nil)))

(defn- process-alive-by-pid?
  "Check if a process with the given PID is alive using ps command"
  [pid]
  (try
    (let [proc (-> (ProcessBuilder. ["ps" "-p" (str pid)])
                   (.start))
          exit-code (.waitFor proc)]
      (zero? exit-code))
    (catch Exception _
      false)))

(defn- get-our-pid
  "Get the PID of our managed ECA process from the PID file.
   Returns nil if the process is not alive."
  []
  (when-let [pid (read-pid-file)]
    ;; Verify the process is actually alive
    (if (process-alive-by-pid? pid)
      pid
      (do
        ;; Process not found, clean up stale PID file
        (clear-pid-file!)
        nil))))

;; Forward declarations
(declare alive? status)

(defn- set-our-pid!
  "Set the PID of our managed ECA process in the PID file"
  [pid]
  (write-pid-file! pid))

(defn- clear-our-pid!
  "Clear our tracked PID from the PID file"
  []
  (clear-pid-file!))

(defn- is-our-process?
  "Check if a process is the one we started by comparing PIDs"
  [proc]
  (when-let [our-pid (get-our-pid)]
    (and proc
         (.isAlive proc)
         (= our-pid (.pid proc)))))

(defn- stop-our-process!
  "Stop only OUR ECA process, not any other ECA processes.
   Returns true if a process was stopped, false otherwise."
  []
  (let [{:keys [eca-process]} (core/get-state)]
    (when (and eca-process (is-our-process? eca-process))
      (println (str "↺ Stopping our ECA process (PID: " (.pid eca-process) ")..."))
      (.destroy eca-process)
      ;; Wait briefly for clean shutdown
      (try (.waitFor eca-process 2 TimeUnit/SECONDS)
           (catch Exception _ nil))
      (when (.isAlive eca-process)
        (println "  Forcibly killing ECA process...")
        (.destroyForcibly eca-process))
      (println "✓ Our ECA process stopped")
      true)))

;; ============================================================================
;; Lifecycle
;; ============================================================================

(defn start!
  "Start ECA process and initialize connection.
   If we already have a running process, stops it first.

   Usage: (start!)
          (start! {:eca-path \"/path/to/eca\"})"
  ([] (start! {}))
  ([{:keys [eca-path debug?] :or {eca-path (core/get-eca-path)}}]
   (println "◈ Starting ECA client...")
   (println "  ECA path:" eca-path)

   ;; Check if we already have a process running
   (when-let [existing-pid (get-our-pid)]
     (println (str "  Found existing ECA process (PID: " existing-pid "), stopping it first..."))
     (try (stop-our-process!) (catch Exception _ nil))
     (clear-our-pid!)
     (Thread/sleep 500))

   (when debug?
     (println "  Debug mode: enabled"))

   (when-not (fs/exists? eca-path)
     (println "⚠️  ECA binary not found at:" eca-path)
     (println "")
     (println "   ECA (Editor Code Assistant) is required for AI chat features.")
     (println "")
     (println "   To install:")
     (println "     bb setup:eca")
     (println "")
     (println "   Or download manually from:")
     (println "     https://github.com/editor-code-assistant/eca/releases")
     (println "")
     (println "   Then set ECA_PATH environment variable if installing to a custom location.")
     (throw (ex-info "ECA binary not found. Run: bb setup:eca" {:path eca-path})))

   (try
     (let [cmd (cond-> [eca-path "server"]
                 debug? (conj "--log-level" "debug"))
           proc (.start (ProcessBuilder. cmd))
           pid (.pid proc)
           stdin-raw (.getOutputStream proc)
           stdout-stream (java.io.BufferedInputStream. (.getInputStream proc))
           stderr-reader (BufferedReader. (InputStreamReader. (.getErrorStream proc)))
           ;; Buffer to collect stderr for error reporting
           stderr-buffer (atom [])]

       ;; Track OUR process PID
       (set-our-pid! pid)
       (println (str "  Started ECA process (PID: " pid ")"))

       ;; Start thread to drain stderr (prevents ECA from blocking)
       (future
         (loop []
           (when-let [line (.readLine stderr-reader)]
             (swap! stderr-buffer conj line)
             (telemetry/emit! {:event :eca/stderr :line line})
             (recur))))

       ;; Monitor process health - only track OUR process
       (future
         (loop []
           (Thread/sleep 1000)
           (when (and (:running (core/get-state))
                      (is-our-process? (:eca-process (core/get-state))))
             (when-not (.isAlive proc)
               (println (str "⚠️  Our ECA process (PID: " pid ") has exited!"))
               (telemetry/emit! {:event :eca/process-exit
                                 :exit-code (try (.exitValue proc) (catch Exception _ nil))})
               (core/swap-state! assoc :running false)
               (clear-our-pid!))
             (recur))))

       (core/reset-state! {:eca-process proc
                           :stdin stdin-raw
                           :stdout stdout-stream
                           :stderr stderr-reader
                           :running true
                           :request-id 0
                           :pending-requests {}
                           :callbacks (:callbacks (core/get-state))
                           :chat-contents []
                           :eca-path eca-path
                           :debug? (boolean debug?)
                           :stderr-buffer stderr-buffer
                           :our-pid pid})

       ;; Start reading responses
       (core/read-loop!)

       ;; Wait briefly for ECA to be ready
       (Thread/sleep 500)

       ;; Initialize handshake
       (let [init-success (initialize! {})]
         (when-not init-success
           ;; Initialization failed - stop our process and throw
           (stop-our-process!)
           (clear-our-pid!)
           (Thread/sleep 500) ;; Give time for stderr to be collected
           (let [stderr-lines @stderr-buffer
                 stderr-summary (if (seq stderr-lines)
                                  (str "\n\nECA stderr output:\n"
                                       (str/join "\n" (take 10 stderr-lines)))
                                  "")]
             (throw (ex-info (str "ECA initialization failed."
                                  " The binary started but did not respond to handshake."
                                  "\nPossible causes:"
                                  "\n  - Missing API key configuration"
                                  "\n  - Incompatible ECA version"
                                  "\n  - ECA crashed immediately"
                                  stderr-summary
                                  "\n\nRun 'bb eca:diagnose' for detailed diagnostics.")
                             {:type :eca-init-failed
                              :stderr stderr-lines})))))

       (println "✓ ECA client ready")

       {:status :running
        :pid pid
        :eca-path eca-path
        :debug? (boolean debug?)})

     (catch Exception e
       (telemetry/emit! {:event :eca/start-error
                         :error (.getMessage e)})
       (clear-our-pid!)
       (println "✗ Failed to start ECA:" (.getMessage e))
       (throw e)))))

(defn stop!
  "Stop our ECA process.
   Only stops the process we started, never touches other ECA processes.

   Usage: (stop!)"
  []
  (telemetry/emit! {:event :eca/stop})
  (core/swap-state! assoc :running false)
  (stop-our-process!)
  (clear-our-pid!)
  (core/swap-state! assoc :debug? false))

(defn status
  "Get ECA client status

   Usage: (status)"
  []
  (let [s @(core/get-state)
        proc (:eca-process s)
        our-pid (get-our-pid)]
    {:running (alive?)
     :our-pid our-pid
     :process-alive? (when proc (.isAlive proc))
     :is-our-process? (is-our-process? proc)
     :eca-path (:eca-path s)
     :pending-requests (count (:pending-requests s))
     :debug? (:debug? s)}))

(defn- list-all-eca-processes
  "List all ECA server processes on the system.
   Returns vector of {:pid :command} maps.
   Works in both Babashka and JVM Clojure, and on both Linux and macOS."
  []
  (try
    ;; Use ps instead of pgrep for better cross-platform compatibility
    ;; ps -eo pid,comm,args = PID, command name, full arguments
    (let [proc (-> (ProcessBuilder. ["ps" "-eo" "pid,comm,args"])
                   (.start))
          output (with-open [reader (BufferedReader. (InputStreamReader. (.getInputStream proc)))]
                   (str/join "\n" (line-seq reader)))
          exit-code (.waitFor proc)]
      (if (zero? exit-code)
        (->> (str/split-lines output)
             (filter #(str/includes? % "eca"))
             (filter #(str/includes? % "server"))
             (map #(let [trimmed (str/trim %)
                          parts (str/split trimmed #"\s+" 3)]  ;; pid, comm, args
                     {:pid (str/trim (first parts))
                      :command (str/trim (nth parts 2 ""))}))
             vec)
        []))
    (catch Exception _
      ;; ps not available or no processes found
      [])))

(defn list-orphaned-processes
  "List ECA processes that are not the one we're managing.
   These may be leftover from previous runs or other applications.

   Usage: (list-orphaned-processes)
          ;; => [{:pid \"1234\" :command \"eca server\"} ...]"
  []
  (let [our-pid (get-our-pid)
        all-eca (list-all-eca-processes)
        our-pid-str (when our-pid (str our-pid))]
    (if our-pid-str
      (filterv #(not= our-pid-str (:pid %)) all-eca)
      all-eca)))

(defn print-process-status
  "Print detailed status of ECA processes.
   Shows our process and any orphaned ones."
  []
  (let [our-pid (get-our-pid)
        all-eca (list-all-eca-processes)
        orphaned (list-orphaned-processes)
        state-pid (when-let [proc (:eca-process @(core/get-state))]
                    (try (.pid proc) (catch Exception _ nil)))
        state-orphaned? (when state-pid
                          (some #(= (str state-pid) (:pid %)) orphaned))]
    (println "\n=== ECA Process Status ===")
    (println (str "Our process PID: " (or our-pid "none")))
    (when state-pid
      (println (str "Process in memory: " state-pid))
      (when (nil? our-pid)
        (println "⚠️  PID file missing but state references a process")))
    (when state-orphaned?
      (println "⚠️  State references orphaned process (PID file missing or stale)"))
    (println (str "Total ECA processes: " (count all-eca)))
    (when (seq orphaned)
      (println "\n⚠️  Orphaned ECA processes (not ours):")
      (doseq [{:keys [pid command]} orphaned]
        (println (str "   PID " pid ": " command))))
    (println "")
    {:our-pid our-pid
     :state-pid state-pid
     :state-orphaned? state-orphaned?
     :total (count all-eca)
     :orphaned-count (count orphaned)
     :orphaned orphaned}))

(defn alive?
  "Check if OUR ECA process is truly alive.
   Validates that:
   1. We have a running flag set
   2. We have a process object
   3. The process is the one we started (by PID)
   4. The OS process is actually alive

   Usage: (alive?) ;; => true/false"
  []
  (let [s @(core/get-state)
        proc (:eca-process s)]
    (and (:running s)
         proc
         (is-our-process? proc)
         (.isAlive proc))))

(defn restart!
  "Stop our ECA process and start a new one.
   Returns start! result or throws.

   Usage: (restart!)"
  []
  (telemetry/emit! {:event :eca/restart})
  (let [current-pid (get-our-pid)]
    (if current-pid
      (println (str "↺ Restarting ECA (current PID: " current-pid ")..."))
      (println "↺ Starting ECA (no existing process)..."))
    (try (stop!) (catch Exception _ nil))
    ;; Brief pause to let OS reclaim resources
    (Thread/sleep 500)
    (start! {})))

(defn ensure-alive!
  "Ensure OUR ECA process is running. If dead or not ours, start/restart.

   Returns true if ECA is alive after this call, false otherwise.

   Usage: (ensure-alive!) ;; => true/false"
  []
  (if (alive?)
    true
    (do
      (telemetry/emit! {:event :eca/ensure-alive-restart})
      (println "◈ ECA not running or not our process, starting...")
      (try
        ;; Clear any stale PID tracking
        (clear-our-pid!)
        (restart!)
        (if (alive?)
          (do
            (println "✓ ECA is now running (PID: " (get-our-pid) ")")
            true)
          (do
            (println "✗ ECA failed to start")
            false))
        (catch Exception e
          (telemetry/emit! {:event :eca/ensure-alive-failed
                            :error (.getMessage e)})
          (println "✗ ECA start failed:" (.getMessage e))
          false)))))