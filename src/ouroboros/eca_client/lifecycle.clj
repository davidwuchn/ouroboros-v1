(ns ouroboros.eca-client.lifecycle
  "ECA Client Lifecycle - Process management

   Handles starting, stopping, and monitoring the ECA process.
   Includes health checks and auto-restart functionality.

   This namespace is an implementation detail - prefer using
   the public API in ouroboros.eca-client"
  (:require
    [ouroboros.fs :as fs]
    [ouroboros.telemetry :as telemetry]
    [ouroboros.eca-client.core :as core])
  (:import [java.io BufferedReader InputStreamReader]
           [java.util.concurrent TimeUnit]))

;; ============================================================================
;; Initialization
;; ============================================================================

(defn- initialize!
  "Send initialize handshake to ECA"
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
                (println "✗ ECA initialize error:" (:error response)))
              (do
                (println "✓ ECA initialized")
                (telemetry/emit! {:event :eca/initialized})
                ;; Send initialized notification to complete handshake
                (core/send-notification! "initialized" {}))))

          ;; Timeout reached
          (> (- (System/currentTimeMillis) start-time) timeout-ms)
          (do
            (telemetry/emit! {:event :eca/initialize-timeout})
            (println "⚠️  ECA initialize timeout"))

          ;; Keep waiting
          :else
          (do
            (Thread/sleep 100)
            (recur))))

      (catch Exception e
        (telemetry/emit! {:event :eca/initialize-exception
                          :error (.getMessage e)})
        (println "✗ ECA initialize exception:" (.getMessage e))))))

;; ============================================================================
;; Lifecycle
;; ============================================================================

(defn start!
   "Start ECA process and initialize connection

    Usage: (start!)
           (start! {:eca-path \"/path/to/eca\"})"
  ([] (start! {}))
  ([{:keys [eca-path debug?] :or {eca-path (core/get-eca-path)}}]
   (println "◈ Starting ECA client...")
   (println "  ECA path:" eca-path)
   (when debug?
     (println "  Debug mode: enabled"))

   (when-not (fs/exists? eca-path)
     (println "⚠️  ECA not found at:" eca-path)
     (println "   Download from: https://github.com/editor-code-assistant/eca/releases")
     (throw (ex-info "ECA binary not found" {:path eca-path})))

     (try
        (let [cmd (cond-> [eca-path "server"]
                    debug? (conj "--log-level" "debug"))
              proc (.start (ProcessBuilder. cmd))
              stdin-raw (.getOutputStream proc)
              stdout-stream (java.io.BufferedInputStream. (.getInputStream proc))
              stderr-reader (BufferedReader. (InputStreamReader. (.getErrorStream proc)))]

        ;; Start thread to drain stderr (prevents ECA from blocking)
        (future
          (loop []
            (when-let [line (.readLine stderr-reader)]
              (telemetry/emit! {:event :eca/stderr :line line})
              (recur))))

        ;; Monitor process health
        (future
          (loop []
            (Thread/sleep 1000)
            (when (:running (core/get-state))
              (when-not (.isAlive proc)
                (println "⚠️  ECA process has exited!")
                (telemetry/emit! {:event :eca/process-exit
                                  :exit-code (try (.exitValue proc) (catch Exception _ nil))})
                (core/swap-state! assoc :running false))
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
                            :debug? (boolean debug?)})

       (println "✓ ECA process started")

       ;; Start reading responses
       (core/read-loop!)

       ;; Initialize handshake
       (initialize! {})

       {:status :running
        :eca-path eca-path
        :debug? (boolean debug?)})

     (catch Exception e
       (telemetry/emit! {:event :eca/start-error
                         :error (.getMessage e)})
       (println "✗ Failed to start ECA:" (.getMessage e))
       (throw e)))))

(defn stop!
  "Stop ECA process

   Usage: (stop!)"
  []
  (telemetry/emit! {:event :eca/stop})
  (let [{:keys [eca-process running]} (core/get-state)]
    (when running
      (core/swap-state! assoc :running false)

      (when eca-process
        (.destroy eca-process)
        ;; Wait briefly for clean shutdown
        (try (.waitFor eca-process 2 TimeUnit/SECONDS)
             (catch Exception _ nil))
        (when (.isAlive eca-process)
          (.destroyForcibly eca-process))
        (println "✓ ECA process stopped"))))
   (core/swap-state! assoc :debug? false))

(defn status
  "Get ECA client status

   Usage: (status)"
  []
  (let [s @(core/get-state)]
    {:running (:running s)
     :eca-path (:eca-path s)
     :pending-requests (count (:pending-requests s))
     :debug? (:debug? s)}))

(defn alive?
  "Check if ECA process is truly alive (not just :running flag).
   Validates the underlying OS process is still running.

   Usage: (alive?) ;; => true/false"
  []
  (let [s (core/get-state)]
    (and (:running s)
         (when-let [proc (:eca-process s)]
           (.isAlive proc)))))

(defn restart!
  "Stop and restart ECA process. Returns start! result or throws.

   Usage: (restart!)"
  []
  (telemetry/emit! {:event :eca/restart})
  (println "↺ Restarting ECA...")
  (try (stop!) (catch Exception _ nil))
  ;; Brief pause to let OS reclaim resources
  (Thread/sleep 500)
  (start! {}))

(defn ensure-alive!
  "Ensure ECA is running. If dead, attempt auto-restart.

   Returns true if ECA is alive after this call, false otherwise.

   Usage: (ensure-alive!) ;; => true/false"
  []
  (if (alive?)
    true
    (do
      (telemetry/emit! {:event :eca/ensure-alive-restart})
      (try
        (restart!)
        (alive?)
        (catch Exception e
          (telemetry/emit! {:event :eca/ensure-alive-failed
                            :error (.getMessage e)})
          false)))))