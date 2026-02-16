#!/usr/bin/env bb
"""
ECA Diagnostic Script

Troubleshoots ECA startup issues with detailed logging.

Usage:
  bb eca:diagnose    # Run full diagnostics
"""

(require '[babashka.process :refer [shell process]]
         '[babashka.fs :as fs]
         '[clojure.string :as str]
         '[clojure.java.io :as io])

(def ^:private eca-paths
  "Possible ECA locations to check"
  [(System/getenv "ECA_PATH")
   "/usr/local/bin/eca"
   (str (System/getProperty "user.home") "/.local/bin/eca")
   (str (System/getProperty "user.home") "/bin/eca")
   "eca"])

(defn- find-eca
  "Find ECA binary in common locations"
  []
  (first (filter #(and % (fs/exists? %)) eca-paths)))

(defn- test-eca-binary
  "Test if ECA binary works"
  [path]
  (println "\n📍 Testing ECA binary...")
  (println "   Path:" path)

  ;; Check file properties
  (let [file (fs/file path)]
    (println "   Exists:" (fs/exists? file))
    (println "   Is file:" (fs/regular-file? file))
    (println "   Executable:" (fs/executable? file))
    (println "   Size:" (when (fs/exists? file) (str (fs/size file) " bytes"))))

  ;; Try to get version
  (try
    (let [result (shell {:out :string :err :string} path "--version")]
      (println "   ✓ Version command succeeded")
      (println "   Version:" (str/trim (:out result)))
      (when (seq (:err result))
        (println "   Stderr:" (str/trim (:err result))))
      true)
    (catch Exception e
      (println "   ✗ Version command failed:")
      (println "   Error:" (.getMessage e))
      false)))

(defn- test-eca-server
  "Test ECA server mode with timeout"
  [path]
  (println "\n🖥️  Testing ECA server mode...")

  (let [temp-log (str "/tmp/eca-test-" (System/currentTimeMillis) ".log")]
    (try
      ;; Start ECA server process
      (println "   Starting ECA server...")
      (let [proc (process [path "server" "--log-level" "debug"]
                          {:out temp-log
                           :err temp-log})]

        ;; Wait a moment for startup
        (Thread/sleep 2000)

        ;; Check if process is alive
        (if (.isAlive (:proc proc))
          (do
            (println "   ✓ Server process is running (PID:" (.pid (:proc proc)) ")")

            ;; Send initialize request
            (println "   Sending initialize request...")
            (let [init-json (str "{\"jsonrpc\":\"2.0\",\"id\":1,\"method\":\"initialize\","
                                 "\"params\":{\"processId\":" (.pid (java.lang.ProcessHandle/current))
                                 ",\"clientInfo\":{\"name\":\"test\",\"version\":\"1.0.0\"}}}")
                  stdin (:in proc)]

              ;; Write JSON-RPC message
              (let [message (str "Content-Length: " (count (.getBytes init-json)) "\r\n\r\n" init-json)
                    bytes (.getBytes message "UTF-8")]
                (.write stdin bytes)
                (.flush stdin))

              ;; Wait for response
              (Thread/sleep 2000)

              ;; Read response
              (let [stdout (:out proc)
                    response (try
                               (slurp temp-log)
                               (catch Exception _ "<could not read log>"))]
                (println "   Response log preview:")
                (println "   ---")
                (doseq [line (take 20 (str/split-lines response))]
                  (println "   " line))
                (println "   ---")

                (if (str/includes? response "initialized")
                  (println "   ✓ Initialize handshake successful")
                  (println "   ✗ Initialize handshake failed or incomplete"))

                ;; Kill process
                (.destroy (:proc proc))
                (Thread/sleep 500)
                (when (.isAlive (:proc proc))
                  (.destroyForcibly (:proc proc)))

                true)))

          (do
            (println "   ✗ Server process exited immediately")
            (let [log-content (try (slurp temp-log) (catch Exception _ ""))]
              (when (seq log-content)
                (println "   Server log:")
                (println "   ---")
                (doseq [line (take 30 (str/split-lines log-content))]
                  (println "   " line))
                (println "   ---")))
            false)))

      (catch Exception e
        (println "   ✗ Server test failed:")
        (println "   Error:" (.getMessage e))
        false)

      (finally
        (fs/delete-if-exists temp-log)))))

(defn- check-config
  "Check ECA configuration"
  []
  (println "\n⚙️  Checking ECA configuration...")

  ;; Check project config
  (let [project-config ".eca/config.json"
        user-config (str (System/getProperty "user.home") "/.config/eca/config.json")]

    (println "   Project config (" project-config "):"
             (if (fs/exists? project-config) "✓ found" "✗ not found"))

    (println "   User config (" user-config "):"
             (if (fs/exists? user-config) "✓ found" "✗ not found"))

    (when (fs/exists? project-config)
      (try
        (let [content (slurp project-config)]
          (println "   Project config preview:")
          (println "   ---")
          (doseq [line (take 10 (str/split-lines content))]
            (println "   " line))
          (println "   ---"))
        (catch Exception e
          (println "   Could not read project config:" (.getMessage e)))))))

(defn -main
  "Run full ECA diagnostics"
  [& _]
  (println "╔══════════════════════════════════════════════════════════════╗")
  (println "║                 ECA Diagnostic Tool                          ║")
  (println "╚══════════════════════════════════════════════════════════════╝")

  (let [path (find-eca)]
    (if-not path
      (do
        (println "\n✗ ECA binary not found in any of these locations:")
        (doseq [p eca-paths]
          (println "   -" (or p "<nil>")))
        (println "\n   To install:")
        (println "     bb setup:eca"))

      (do
        (println (str "\n✓ Found ECA at: " path))

        ;; Run tests
        (let [binary-ok (test-eca-binary path)
              server-ok (and binary-ok (test-eca-server path))]

          (check-config)

          ;; Summary
          (println "\n═══════════════════════════════════════════════════════════════")
          (println "                         SUMMARY                              ")
          (println "═══════════════════════════════════════════════════════════════")
          (println (str "Binary check:  " (if binary-ok "✓ PASS" "✗ FAIL")))
          (println (str "Server check:  " (if server-ok "✓ PASS" "✗ FAIL")))

          (cond
            (not binary-ok)
            (do (println "\n⚠️  ECA binary is not working properly.")
                (println "    Try reinstalling: bb setup:eca"))

            (not server-ok)
            (do (println "\n⚠️  ECA binary works but server mode fails.")
                (println "    Possible causes:")
                (println "    - Missing API key in ECA config")
                (println "    - Port conflict")
                (println "    - Incompatible ECA version")
                (println "\n    Check: " (str (System/getProperty "user.home") "/.config/eca/config.json")))

            :else
            (println "\n✓ ECA looks healthy! If chat still fails, check the application logs."))))))

;; Run if called as script
(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
)