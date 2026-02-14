(ns ouroboros.debug
  "Debug utilities for Ouroboros system components.
   
   Use this namespace to inspect and debug running systems
   from the REPL or current file."
  (:require [babashka.process :refer [shell process]]
            [babashka.fs :as fs]
            [clojure.string :as str]
            [clojure.pprint :as pp])
  (:import [java.time Instant Duration]
           [java.io BufferedReader InputStreamReader]))

;; ============================================================================
;; ECA Debug Utilities
;; ============================================================================

(def ^:private eca-default-path
  "Default ECA path - checks same locations as core/get-eca-path"
  (let [home (System/getProperty "user.home")]
    (cond
      (System/getenv "ECA_PATH") (System/getenv "ECA_PATH")
      (fs/exists? "/usr/local/bin/eca") "/usr/local/bin/eca"
      (fs/exists? (str home "/.local/bin/eca")) (str home "/.local/bin/eca")
      (fs/exists? (str home "/bin/eca")) (str home "/bin/eca")
      :else "eca")))

(defn eca-status
  "Check ECA binary status and return detailed info.
   
   Usage:
     (eca-status)              ; Use default path
     (eca-status \"path/to/eca\") ; Custom path"
  ([] (eca-status eca-default-path))
  ([eca-path]
   (let [exists? (fs/exists? eca-path)
         file (when exists? (fs/file eca-path))]
     {:path eca-path
      :exists? exists?
      :executable? (when exists? (fs/executable? file))
      :size-bytes (when exists? (fs/size file))
      :size-mb (when exists? (/ (fs/size file) 1024.0 1024.0))
      :version (when exists?
                 (try
                   (-> (shell {:out :string} eca-path "--version")
                       :out
                       str/trim)
                   (catch Exception e
                     (str "Error: " (.getMessage e)))))
      :last-modified (when exists?
                       (str (fs/last-modified-time file)))})))

(defn eca-check
  "Print human-readable ECA status to console.

   Usage:
     (eca-check)            ; Quick check
     (eca-check :verbose)   ; Detailed output"
  ([] (eca-check nil))
  ([mode]
   (let [status (eca-status)
         verbose? (= mode :verbose)]
     (println "\n╔══════════════════════════════════════════════════════════════╗")
     (println "║                    ECA Debug Report                          ║")
     (println "╠══════════════════════════════════════════════════════════════╣")
     (printf  "║  Path:         %-46s║%n" (:path status))
     (printf  "║  Exists:       %-46s║%n" (if (:exists? status) "✓ Yes" "✗ No"))
     (printf  "║  Executable:   %-46s║%n" (if (:executable? status) "✓ Yes" "✗ No"))
     (when (:exists? status)
       (printf "║  Size:         %.2f MB%-38s║%n" (:size-mb status) "")
       (printf "║  Version:      %-46s║%n" (:version status))
       (when verbose?
         (printf "║  Modified:     %-46s║%n" (or (:last-modified status) "N/A"))))
     (println "╚══════════════════════════════════════════════════════════════╝")
     (when-not (:exists? status)
       (println "\n⚠️  ECA not found!")
       (println "   ECA (Editor Code Assistant) is required for AI chat features.")
       (println "")
       (println "   To install:")
       (println "     bb setup:eca")
       (println "")
       (println "   Or download manually:")
       (println "     https://github.com/editor-code-assistant/eca/releases"))
     status)))

(defn eca-test-server
  "Test ECA server mode with a simple request.
   
   Usage:
     (eca-test-server)      ; Test with default timeout (5s)
     (eca-test-server 10)   ; Custom timeout in seconds"
  ([] (eca-test-server 5))
  ([timeout-secs]
   (println "\n=== ECA Server Mode Test ===")
   (let [status (eca-status)]
     (if-not (:exists? status)
       (do
         (println "✗ ECA binary not found at:" (:path status))
         (println "  Run: bb test:eca  to auto-download")
         (println)
         nil)
       (do
         (println "Starting ECA server (timeout:" timeout-secs "s)...")
         (try
           ;; Start ECA server process
           (let [proc (process (:path status) "server" "--log-level" "debug")
                 start-time (Instant/now)]

             (println "✓ Process started, PID:" (.pid (:proc proc)))

             ;; Wait a bit for server to initialize
             (Thread/sleep 500)

             ;; Check if process is still alive
             (if (.isAlive (:proc proc))
               (do
                 (println "✓ Server is running")
                 (println "  Runtime:" (.toMillis (Duration/between start-time (Instant/now))) "ms")

                 ;; Read any initial output
                 (let [reader (BufferedReader. (InputStreamReader. (:out proc)))]
                   (println "\n--- Server Output (first 5 lines) ---")
                   (dotimes [_ 5]
                     (when-let [line (.readLine reader)]
                       (println "  " line)))
                   (.close reader)))

               (do
                 (println "✗ Server process exited early")
                 (when-let [err (:err proc)]
                   (println "  Stderr:" (slurp err)))))

             ;; Cleanup
             (when (.isAlive (:proc proc))
               (.destroy (:proc proc))
               (println "\n✓ Server stopped"))

             {:success true :runtime-ms (.toMillis (Duration/between start-time (Instant/now)))})

           (catch Exception e
             (println "✗ Error starting server:" (.getMessage e))
             {:success false :error (.getMessage e)})))))))

(defn eca-test-prompt
  "Test ECA with a simple prompt (requires API key).
   
   Usage:
     (eca-test-prompt)                    ; Default prompt
     (eca-test-prompt \"What is Clojure?\") ; Custom prompt"
  ([] (eca-test-prompt "What is 2+2? Answer with just the number."))
  ([prompt]
   (println "\n=== ECA Prompt Test ===")
   (let [status (eca-status)]
     (if-not (:exists? status)
       (do
         (println "✗ ECA binary not found")
         (println "  Run: bb test:eca  to auto-download")
         (println)
         nil)
       (do
         (println "Prompt:" prompt)
         (println "Running...")

         (try
           (let [result (shell {:out :string :err :string :timeout 30000}
                               (:path status)
                               "--prompt" prompt
                               "--provider" "openai"
                               "--model" "gpt-4o-mini")]
             (if (zero? (:exit result))
               (do
                 (println "\n✓ Success!")
                 (println "Response:")
                 (println "  " (str/replace (:out result) #"\n" "\n   ")))
               (do
                 (println "\n✗ Failed with exit code:" (:exit result))
                 (when (seq (:err result))
                   (println "Stderr:" (:err result)))))
             result)

           (catch Exception e
             (println "✗ Error:" (.getMessage e))
             {:error (.getMessage e)})))))))

;; ============================================================================
;; System Debug Utilities
;; ============================================================================

(defn system-status
  "Check Ouroboros system status."
  []
  (println "\n=== Ouroboros System Status ===")
  (try
    (require 'ouroboros.interface)
    (let [q-fn (resolve 'ouroboros.interface/q)
          status (q-fn [:system/status])]
      (pp/pprint status)
      status)
    (catch Exception e
      (println "System not booted or error:")
      (println " " (.getMessage e))
      {:error (.getMessage e)})))

(defn tool-registry
  "List all registered tools."
  []
  (println "\n=== Registered Tools ===")
  (try
    (require 'ouroboros.tool-registry)
    (let [list-tools-fn (resolve 'ouroboros.tool-registry/list-tools)
          tools (list-tools-fn)]
      (doseq [tool tools]
        (printf "  • %s%n" tool))
      (println (format "\nTotal: %d tools" (count tools)))
      tools)
    (catch Exception e
      (println "Error accessing tool registry:")
      (println " " (.getMessage e))
      [])))

(defn resolver-info
  "List all registered Pathom resolvers."
  []
  (println "\n=== Registered Resolvers ===")
  (try
    (require 'ouroboros.interface)
    (let [query-env-fn (resolve 'ouroboros.interface/query-env)
          env (query-env-fn)
          resolvers (-> env :com.wsscode.pathom3.connect.indexes/index-oir keys)]
      (doseq [r (sort resolvers)]
        (printf "  • %s%n" r))
      (println (format "\nTotal: %d resolvers" (count resolvers)))
      resolvers)
    (catch Exception e
      (println "Error accessing resolvers:")
      (println " " (.getMessage e))
      [])))

;; ============================================================================
;; Interactive Debug Menu
;; ============================================================================

(defn debug-menu
  "Show interactive debug menu.
   
   Usage: (debug-menu)"
  []
  (println "\n╔══════════════════════════════════════════════════════════════╗")
  (println "║              Ouroboros Debug Menu                            ║")
  (println "╠══════════════════════════════════════════════════════════════╣")
  (println "║  Quick commands:                                             ║")
  (println "║    (eca-check)           - Check ECA binary status           ║")
  (println "║    (eca-check :verbose)  - Detailed ECA status               ║")
  (println "║    (eca-test-server)     - Test ECA server mode              ║")
  (println "║    (system-status)       - Check system health               ║")
  (println "║    (tool-registry)       - List registered tools             ║")
  (println "║    (resolver-info)       - List Pathom resolvers             ║")
  (println "╚══════════════════════════════════════════════════════════════╝"))

;; Usage: (debug-menu) to show menu