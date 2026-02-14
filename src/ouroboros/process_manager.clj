(ns ouroboros.process-manager
  "Manage long-running processes with full control.
   
   Features:
   - Start/stop/restart processes
   - Real-time output streaming
   - Interactive input sending
   - Status monitoring
   - No backgrounding issues (proper process management)
   
   Usage:
   (def proc (start! \"python\" [\"-m\" \"http.server\" \"8080\"] {:name \"web-server\"}))
   (status proc)
   (stop! proc)
   
   Or with shell command:
   (def proc (start-shell! \"python -m http.server 8080\" {:name \"web-server\"}))
   
   Interactive control:
   (send-input! proc \"GET / HTTP/1.0\\n\\n\")
   (read-output! proc) ; returns available output
   (stream-output! proc println) ; stream output to function"
  (:require
   [clojure.java.io :as io]
   [clojure.string :as str]
   [taoensso.timbre :as log])
  (:import
   (java.io BufferedReader InputStreamReader OutputStreamWriter)
   (java.lang ProcessBuilder ProcessBuilder$Redirect)
   (java.util.concurrent LinkedBlockingQueue TimeUnit)))

(defonce ^:private processes (atom {}))

(defrecord ManagedProcess [name pid process stdin stdout stderr output-queue exit-future])

(defn- start-process
  "Start a process with given command and args."
  [command args env]
  (let [pb (ProcessBuilder. (into-array String (cons command args)))
        env-map (.environment pb)]
    ;; Set environment variables
    (doseq [[k v] env]
      (.put env-map (name k) (str v)))

    ;; Redirect stderr to stdout for combined output
    (.redirectErrorStream pb true)

    (.start pb)))

(defn- start-output-reader
  "Start reading process output in background."
  [process output-queue]
  (future
    (with-open [reader (BufferedReader. (InputStreamReader. (.getInputStream process)))]
      (loop []
        (when-let [line (.readLine reader)]
          (.put output-queue line)
          (recur))))
    (.put output-queue :EOF)))

(defn- start-exit-watcher
  "Watch for process exit and cleanup."
  [process name pid output-queue]
  (future
    (.waitFor process)
    (let [exit-code (.exitValue process)]
      (log/info "Process" name "(PID:" pid ") exited with code" exit-code)
      (.put output-queue (str "Process exited with code: " exit-code))
      (swap! processes dissoc name)
      exit-code)))

(defn start!
  "Start a managed process.
   
   Args:
     command - string command to execute
     args - sequence of arguments
     opts - map with keys:
       :name - unique name for the process (required)
       :env - map of environment variables
       :dir - working directory
   
   Returns:
     ManagedProcess record"
  [command args {:keys [name env dir] :as opts}]
  {:pre [(string? name)]}

  (when (contains? @processes name)
    (throw (ex-info (str "Process already exists with name: " name)
                    {:name name :existing (@processes name)})))

  (log/info "Starting process:" name "with command:" command args)

  (let [process (start-process command args (or env {}))
        pid (try
              (let [pid-field (.getDeclaredField (class process) "pid")]
                (.setAccessible pid-field true)
                (.get pid-field process))
              (catch Exception _ nil))

        output-queue (LinkedBlockingQueue.)
        output-reader (start-output-reader process output-queue)
        exit-future (start-exit-watcher process name pid output-queue)

        proc (->ManagedProcess name pid process
                               (.getOutputStream process)
                               (.getInputStream process)
                               (.getErrorStream process)
                               output-queue exit-future)]

    (swap! processes assoc name proc)
    proc))

(defn start-shell!
  "Start a process from shell command string.
   
   Example:
   (start-shell! \"python -m http.server 8080\" {:name \"web-server\"})"
  [shell-command opts]
  (let [args (if (str/includes? shell-command " ")
               (str/split shell-command #"\s+")
               [shell-command])]
    (start! (first args) (rest args) opts)))

(defn stop!
  "Stop a managed process.
   
   Args:
     proc-or-name - ManagedProcess record or process name
   
   Returns:
     exit code or nil if already stopped"
  [proc-or-name]
  (let [proc (if (instance? ManagedProcess proc-or-name)
               proc-or-name
               (get @processes proc-or-name))]

    (when proc
      (log/info "Stopping process:" (:name proc))
      (.destroy (:process proc))

      ;; Wait for exit (with timeout)
      (try
        (.waitFor (:process proc) 5 TimeUnit/SECONDS)
        (catch Exception _ nil))

      ;; Force kill if still alive
      (when (.isAlive (:process proc))
        (.destroyForcibly (:process proc)))

      ;; Remove from registry
      (swap! processes dissoc (:name proc))

      (try
        (.exitValue (:process proc))
        (catch Exception _ nil)))))

(defn status
  "Get status of a managed process.
   
   Returns map with keys:
     :name - process name
     :running? - boolean
     :pid - process ID (if available)
     :has-output? - true if output available"
  [proc-or-name]
  (let [proc (if (instance? ManagedProcess proc-or-name)
               proc-or-name
               (get @processes proc-or-name))]

    (if proc
      {:name (:name proc)
       :running? (.isAlive (:process proc))
       :pid (:pid proc)
       :has-output? (not (.isEmpty (:output-queue proc)))}
      {:name (if (string? proc-or-name) proc-or-name "unknown")
       :running? false
       :pid nil
       :has-output? false})))

(defn list-processes
  "List all managed processes.
   
   Returns sequence of status maps."
  []
  (->> @processes
       vals
       (map status)))

(defn read-output!
  "Read available output from process.
   
   Args:
     proc-or-name - ManagedProcess or name
     opts - map with keys:
       :timeout-ms - timeout in milliseconds (default 100)
       :max-lines - maximum lines to read
   
   Returns:
     sequence of output lines"
  [proc-or-name & [{:keys [timeout-ms max-lines] :or {timeout-ms 100}}]]
  (let [proc (if (instance? ManagedProcess proc-or-name)
               proc-or-name
               (get @processes proc-or-name))]

    (when proc
      (let [queue (:output-queue proc)
            result (atom [])]

        (loop [lines-read 0]
          (when (or (nil? max-lines) (< lines-read max-lines))
            (if-let [line (.poll queue timeout-ms TimeUnit/MILLISECONDS)]
              (do
                (when (not= line :EOF)
                  (swap! result conj line)
                  (recur (inc lines-read))))
              ;; No more output within timeout
              nil)))

        @result))))

(defn stream-output!
  "Stream process output to a function.
   
   Args:
     proc-or-name - ManagedProcess or name
     callback - function called with each output line
     opts - map with keys:
       :timeout-ms - timeout between checks (default 100)
       :stop? - predicate returning true to stop streaming"
  [proc-or-name callback & [{:keys [timeout-ms stop?] :or {timeout-ms 100}}]]
  (let [proc (if (instance? ManagedProcess proc-or-name)
               proc-or-name
               (get @processes proc-or-name))]

    (when proc
      (future
        (let [queue (:output-queue proc)]
          (loop []
            (when (and (.isAlive (:process proc))
                       (or (nil? stop?) (not (stop?))))
              (when-let [line (.poll queue timeout-ms TimeUnit/MILLISECONDS)]
                (when (not= line :EOF)
                  (callback line)))
              (recur))))))))

(defn send-input!
  "Send input to process stdin.
   
   Args:
     proc-or-name - ManagedProcess or name
     input - string to send
   
   Returns:
     true if sent successfully"
  [proc-or-name input]
  (let [proc (if (instance? ManagedProcess proc-or-name)
               proc-or-name
               (get @processes proc-or-name))]

    (when (and proc (.isAlive (:process proc)))
      (try
        (with-open [writer (OutputStreamWriter. (:stdin proc))]
          (.write writer (str input))
          (.flush writer))
        true
        (catch Exception e
          (log/error "Failed to send input to process" (:name proc) e)
          false)))))

(defn send-input-line!
  "Send input line to process stdin (adds newline).
   
   Returns:
     true if sent successfully"
  [proc-or-name line]
  (send-input! proc-or-name (str line "\n")))

(defn restart!
  "Restart a managed process.
   
   Note: Requires original command/args to be known.
   Currently only works if you keep the original opts.
   
   Args:
     proc-or-name - ManagedProcess or name
     command - original command (if not in registry)
     args - original args
     opts - original opts"
  [proc-or-name & [command args opts]]
  (let [proc (if (instance? ManagedProcess proc-or-name)
               proc-or-name
               (get @processes proc-or-name))
        name (if (string? proc-or-name) proc-or-name (:name proc))]

    (stop! proc)
    (Thread/sleep 1000) ; Wait before restart

    (if (and command args opts)
      (start! command args (assoc opts :name name))
      (throw (ex-info "Cannot restart without original command/args/opts"
                      {:name name})))))

(defn cleanup-all!
  "Stop all managed processes."
  []
  (doseq [proc (vals @processes)]
    (try
      (stop! proc)
      (catch Exception e
        (log/error "Error cleaning up process" (:name proc) e))))
  (reset! processes {}))

;; Register cleanup on shutdown
(.addShutdownHook (Runtime/getRuntime)
                  (Thread. ^Runnable (fn [] (cleanup-all!))))

(comment
  ;; Example usage
  (def web-server
    (start-shell! "python -m http.server 8080"
                  {:name "web-server"
                   :env {:PYTHONUNBUFFERED "1"}}))

  (status web-server)
  ;; => {:name "web-server", :running? true, :pid 12345, :has-output? true}

  ;; Read recent output
  (read-output! web-server {:max-lines 10})

  ;; Stream output to console
  (stream-output! web-server println)

  ;; Send input (for interactive processes)
  (send-input-line! web-server "GET / HTTP/1.0")
  (send-input-line! web-server "")

  ;; Check if running
  (.isAlive (:process web-server))

  ;; Stop the process
  (stop! web-server)

  ;; List all processes
  (list-processes)

  ;; Cleanup everything
  (cleanup-all!))