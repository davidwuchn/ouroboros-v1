(ns ouroboros.process-runner-test
  "Tests for tmux-based process runner."
  (:require
   [clojure.test :refer [deftest testing is use-fixtures]]
   [ouroboros.process-runner :as pr]
   [babashka.process :as p]))

;; Skip tests if tmux is not available
(def ^:private tmux-available?
  (try
    (p/sh ["tmux" "-V"])
    true
    (catch Exception _ false)))

(defn tmux-fixture [f]
  (if tmux-available?
    (f)
    (do
      (println "SKIP: tmux not available")
      (println "Install tmux to run process-runner tests"))))

(use-fixtures :once tmux-fixture)

(defn cleanup-session! [name]
  "Ensure session doesn't exist before/after test."
  (try
    (p/sh ["tmux" "kill-session" "-t" (str "proc-" name)])
    (catch Exception _)))

(deftest session-exists?-test
  (testing "Returns false for non-existent session"
    (is (false? (pr/session-exists? "nonexistent-session-12345")))))

(deftest start-stop-test
  (when tmux-available?
    (let [name "test-basic"]
      (cleanup-session! name)
      
      (testing "Start process"
        (let [result (pr/start! name "echo 'hello world'")]
          (is (string? result))
          (is (pr/session-exists? (str "proc-" name)))))
      
      (testing "Status after start"
        (let [status (pr/status name)]
          (is (:running? status))
          (is (= name (:name status)))))
      
      (testing "Stop process"
        (pr/stop! name)
        (is (false? (pr/session-exists? (str "proc-" name)))))
      
      (cleanup-session! name))))

(deftest list-sessions-test
  (when tmux-available?
    (testing "List returns vector"
      (let [sessions (pr/list-sessions)]
        (is (vector? sessions))))))

(deftest check-test
  (when tmux-available?
    (testing "Check returns status map"
      (let [result (pr/check)]
        (is (map? result))
        (is (contains? result :installed?))
        (is (contains? result :version))))))

(comment
  ;; Run tests
  (run-tests 'ouroboros.process-runner-test))
