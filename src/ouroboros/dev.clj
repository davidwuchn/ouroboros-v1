(ns ouroboros.dev
  "Dev stack orchestration for backend + frontend.
   Manages process lifecycle, health checks, and clean shutdown."
  (:require
   [clojure.string :as str]
   [ouroboros.process-runner :as pr]))

(def ^:private backend-name "ouroboros-backend")
(def ^:private frontend-name "ouroboros-frontend")
(def ^:private backend-cmd "clojure -M -m ouroboros.dashboard")
(def ^:private frontend-cmd "npx shadow-cljs watch dashboard")

(def ^:private health-url "http://localhost:8080/api/status")

(defn- wait-for-health
  "Poll health endpoint, return true if healthy within retries."
  [retries]
  (Thread/sleep 500)
  (if (try (-> (slurp health-url) (str/includes? "healthy"))
           (catch Exception _ false))
    (do (println "[OK] Backend ready") true)
    (when (pos? retries)
      (print ".") (flush)
      (recur (dec retries)))))

(defn stop-stack!
  "Stop all dev stack processes."
  []
  (println "\n[STOP] Stopping...")
  (doseq [proc [backend-name frontend-name]]
    (if (pr/stop! proc)
      (println proc "stopped")
      (println proc "was not running"))))

(defn start-stack!
  "Start full dev stack (blocking). Ctrl+C to stop.
   Starts backend, waits for health, then starts frontend."
  []
  (let [backend-result (pr/start-or-ignore! backend-name backend-cmd)]
    (when (= :started backend-result)
      (println "[WAIT] Waiting for backend...")
      (wait-for-health 30)))

  (pr/start-or-ignore! frontend-name frontend-cmd)

  (println "\n=== DEV STACK ===")
  (println "Backend:  http://localhost:8080")
  (println "Frontend: http://localhost:8081")
  (println "Shadow:   http://localhost:9630")
  (println "\nCtrl+C to stop")

  (.addShutdownHook (Runtime/getRuntime) (Thread. stop-stack!))
  (try (deref (promise))
       (catch InterruptedException _ (stop-stack!))))

(defn start-stack-detached!
  "Start dev stack (non-blocking, returns immediately)."
  []
  (pr/start-or-ignore! backend-name backend-cmd)
  (Thread/sleep 1000)
  (pr/start-or-ignore! frontend-name frontend-cmd)

  (println "\n=== DEV STACK ===")
  (println "Backend:  http://localhost:8080")
  (println "Frontend: http://localhost:8081")
  (println "\nStop: bb dev:stop"))
