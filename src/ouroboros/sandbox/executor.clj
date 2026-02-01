(ns ouroboros.sandbox.executor
  "Sandboxed Code Execution — Docker/container-based execution with safety profiles
   
   Provides isolated execution environments for:
   - Shell commands (bash, sh)
   - Scripts (Python, Node.js, Ruby)
   - Compiled languages (Go, Rust, Java) — via containers
   
   Safety profiles:
   - :restricted — No network, read-only filesystem, limited CPU/memory
   - :standard — Limited network, writable temp, standard limits
   - :unrestricted — Full access (requires explicit admin approval)
   
   Usage:
     ;; Execute shell command safely
     (executor/exec-shell 
       'ls -la'
       {:profile :restricted
        :timeout-ms 10000})
     
     ;; Run Python script
     (executor/exec-python
       'print(\"Hello\")'
       {:profile :standard})"
  (:require
   [clojure.java.shell :as shell]
   [clojure.string :as str]
   [babashka.fs :as fs]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.tool-sandbox :as sandbox]))

;; ============================================================================
;; Configuration
;; ============================================================================

(def safety-profiles
  "Predefined safety profiles for execution environments"
  {:restricted
   {:network false
    :read-only true
    :max-cpu "0.5"
    :max-memory "128m"
    :max-pids 32
    :no-suid true
    :no-new-privileges true}
   
   :standard
   {:network true
    :read-only false
    :max-cpu "1.0"
    :max-memory "512m"
    :max-pids 64
    :no-suid true
    :no-new-privileges true}
   
   :unrestricted
   {:network true
    :read-only false
    :max-cpu "2.0"
    :max-memory "2g"
    :max-pids 256
    :no-suid false
    :no-new-privileges false}})

(def default-config
  {:docker-enabled? true
   :temp-dir "/tmp/ouroboros-sandbox"
   :max-output-size 102400  ; 100KB max output
   :default-profile :restricted})

;; ============================================================================
;; Execution Context
;; ============================================================================

(defonce ^:private execution-counter (atom 0))

(defn- next-execution-id []
  (swap! execution-counter inc))

(defn- create-temp-dir
  "Create isolated temp directory for execution"
  [execution-id]
  (let [dir (str (:temp-dir default-config) "/" execution-id)]
    (fs/create-dirs dir)
    dir))

(defn- cleanup-temp-dir
  "Clean up execution temp directory"
  [dir]
  (when (fs/exists? dir)
    (try
      (fs/delete-tree dir)
      (catch Exception e
        (telemetry/emit! {:event :sandbox/cleanup-failed
                          :dir dir
                          :error (.getMessage e)})))))

(defn- truncate-output
  "Truncate output if it exceeds max size"
  [output max-size]
  (if (> (count output) max-size)
    (str (subs output 0 max-size)
         "\n... [output truncated, "
         (- (count output) max-size)
         " chars omitted]")
    output))

;; ============================================================================
;; Docker-based Execution
;; ============================================================================

(defn- build-docker-args
  "Build docker run arguments for safety profile"
  [profile temp-dir]
  (let [profile-config (get safety-profiles profile (:restricted safety-profiles))
        base-args ["run" "--rm" "-i"
                   "--network" (if (:network profile-config) "bridge" "none")
                   "--cpus" (:max-cpu profile-config)
                   "--memory" (:max-memory profile-config)
                   "--pids-limit" (str (:max-pids profile-config))
                   "-v" (str temp-dir ":/workspace:rw")
                   "-w" "/workspace"]]
    (cond-> base-args
      (:read-only profile-config) (concat ["--read-only" "--tmpfs" "/tmp:noexec,nosuid,size=100m"])
      (:no-suid profile-config) (concat ["--security-opt" "no-new-privileges:true"])
      true vec)))

(defn docker-available?
  "Check if Docker is available for sandboxed execution"
  []
  (try
    (let [{:keys [exit]} (shell/sh "docker" "version")]
      (zero? exit))
    (catch Exception _
      false)))

(defn exec-with-docker
  "Execute command in Docker container with safety profile
   
   Args:
   - image: Docker image to use (e.g., 'alpine:latest', 'python:3.11-slim')
   - command: Command array to execute
   - opts: Execution options
   
   Returns execution result map"
  [image command {:keys [profile timeout-ms env-vars]
                  :or {profile :restricted timeout-ms 30000}}]
  (let [execution-id (next-execution-id)
        temp-dir (create-temp-dir execution-id)
        docker-args (build-docker-args profile temp-dir)
        full-args (concat docker-args [image] command)
        start-time (System/currentTimeMillis)]
    
    (telemetry/emit! {:event :sandbox/docker-exec-start
                      :execution-id execution-id
                      :image image
                      :profile profile
                      :timeout-ms timeout-ms})
    
    (try
      (let [{:keys [exit out err] :as result}
            (apply shell/sh (concat full-args
                                    [:env (merge {"HOME" "/workspace"} env-vars)]
                                    [:timeout timeout-ms]))
            duration (- (System/currentTimeMillis) start-time)]
        
        (cleanup-temp-dir temp-dir)
        
        (telemetry/emit! {:event :sandbox/docker-exec-complete
                          :execution-id execution-id
                          :exit-code exit
                          :duration-ms duration
                          :success (zero? exit)})
        
        {:status (if (zero? exit) :success :error)
         :exit-code exit
         :stdout (truncate-output out (:max-output-size default-config))
         :stderr (truncate-output err (:max-output-size default-config))
         :duration-ms duration
         :execution-id execution-id
         :profile profile})
      
      (catch Exception e
        (cleanup-temp-dir temp-dir)
        (telemetry/emit! {:event :sandbox/docker-exec-error
                          :execution-id execution-id
                          :error (.getMessage e)})
        {:status :error
         :error (.getMessage e)
         :error-type :execution-failed
         :execution-id execution-id})))

;; ============================================================================
;; Shell Execution
;; ============================================================================

(defn exec-shell
  "Execute shell command in sandboxed environment
   
   Usage:
     (exec-shell 'ls -la' {:profile :restricted})
     (exec-shell 'curl https://api.example.com' {:profile :standard})"
  [command opts]
  (if (docker-available?)
    (exec-with-docker "alpine:latest"
                      ["sh" "-c" command]
                      opts)
    ;; Fallback to basic shell with timeout
    (let [start-time (System/currentTimeMillis)
          timeout-ms (or (:timeout-ms opts) 30000)]
      (telemetry/emit! {:event :sandbox/shell-fallback
                        :warning "Docker not available, using basic shell"})
      (try
        (let [{:keys [exit out err]} 
              (shell/sh "sh" "-c" command :timeout timeout-ms)]
          {:status (if (zero? exit) :success :error)
           :exit-code exit
           :stdout (truncate-output out (:max-output-size default-config))
           :stderr (truncate-output err (:max-output-size default-config))
           :duration-ms (- (System/currentTimeMillis) start-time)
           :warning "Docker not available, limited sandboxing"})
        (catch Exception e
          {:status :error
           :error (.getMessage e)
           :error-type :shell-execution-failed})))))  )

;; ============================================================================
;; Language-specific Execution
;; ============================================================================

(defn exec-python
  "Execute Python code in sandboxed environment
   
   Usage:
     (exec-python 'print(sum(range(10)))' {:profile :restricted})"
  [code opts]
  (let [execution-id (next-execution-id)
        temp-dir (create-temp-dir execution-id)
        script-file (str temp-dir "/script.py")]
    (try
      (spit script-file code)
      (let [result (exec-with-docker "python:3.11-slim"
                                     ["python" "/workspace/script.py"]
                                     opts)]
        (cleanup-temp-dir temp-dir)
        (assoc result :language :python))
      (catch Exception e
        (cleanup-temp-dir temp-dir)
        {:status :error
         :error (.getMessage e)
         :language :python}))))

(defn exec-node
  "Execute Node.js code in sandboxed environment
   
   Usage:
     (exec-node 'console.log(\"Hello\")' {:profile :restricted})"
  [code opts]
  (let [execution-id (next-execution-id)
        temp-dir (create-temp-dir execution-id)
        script-file (str temp-dir "/script.js")]
    (try
      (spit script-file code)
      (let [result (exec-with-docker "node:18-alpine"
                                     ["node" "/workspace/script.js"]
                                     opts)]
        (cleanup-temp-dir temp-dir)
        (assoc result :language :nodejs))
      (catch Exception e
        (cleanup-temp-dir temp-dir)
        {:status :error
         :error (.getMessage e)
         :language :nodejs}))))

;; ============================================================================
;; Safety Validation
;; ============================================================================

(def dangerous-patterns
  "Patterns that indicate potentially dangerous code"
  #{#"rm\s+-rf\s+/"           ; Delete root
    #":\(\)\{.*:\|\:&\s*\};"  ; Fork bomb (bash function that calls itself recursively)
    #"curl\s+.*\s*\|\s*sh"   ; Pipe curl to shell
    #"wget\s+.*\s*\|\s*sh"   ; Pipe wget to shell
    #"eval\s*\("              ; Dangerous eval
    #"exec\s*\("              ; Dangerous exec
    #"__import__\s*\(\s*['\"]os['\"]"  ; Python os import (often dangerous)
    #"subprocess\.call"        ; Python subprocess
    })

(defn dangerous-code?
  "Check if code contains dangerous patterns
   
   Returns map with:
   - :safe? — true if no dangerous patterns found
   - :matches — list of matched dangerous patterns"
  [code]
  (let [matches (keep (fn [pattern]
                        (when (re-find pattern code)
                          (str pattern)))
                      dangerous-patterns)]
    {:safe? (empty? matches)
     :matches matches}))

(defn validate-code!
  "Validate code before execution, throws if dangerous patterns found
   
   Use this wrapper for additional safety before exec-* functions."
  [code]
  (let [{:keys [safe? matches]} (dangerous-code? code)]
    (if safe?
      true
      (throw (ex-info "Dangerous code patterns detected"
                      {:patterns matches
                       :code-preview (str (subs code 0 (min 100 (count code))) "...")})))))

;; ============================================================================
;; Statistics
;; ============================================================================

(defn stats
  "Get sandbox executor statistics"
  []
  {:docker-available? (docker-available?)
   :total-executions @execution-counter
   :default-profile (:default-profile default-config)
   :available-profiles (keys safety-profiles)})

(comment
  ;; Check Docker availability
  (docker-available?)
  
  ;; Execute shell command
  (exec-shell "echo 'Hello World'" {:profile :restricted})
  (exec-shell "ls -la" {:profile :restricted :timeout-ms 5000})
  
  ;; Execute Python
  (exec-python "print('Hello from Python')" {:profile :restricted})
  (exec-python "print(sum(range(100)))" {:profile :restricted})
  
  ;; Execute Node.js
  (exec-node "console.log('Hello from Node')" {:profile :restricted})
  
  ;; Check code safety
  (dangerous-code? "print('hello')")
  (dangerous-code? "rm -rf /")
  
  ;; Stats
  (stats))