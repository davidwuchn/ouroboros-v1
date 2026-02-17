(ns learning-verification-test
  "Comprehensive verification of learning system functions"
  (:require
   [ouroboros.learning :as learning]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.chat.commands :as cmds]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.chat.session :as session]
   [clojure.string :as str]))

;; ============================================================================
;; Test Setup
;; ============================================================================

(def test-user-id :test-verification-user)
(def test-chat-id "test-verification-chat")
(def test-results (atom []))

(defn record-result! [category function status details]
  (swap! test-results conj {:category category :function function :status status :details details}))

(defn print-header [title]
  (println "")
  (println (str "=== " title " ==="))
  (println (apply str (repeat (+ 6 (count title)) "="))))

(defn print-result [function status]
  (let [icon (if (= status :passed) "✓" "✗")]
    (println (str "   " icon " " function))))

;; ============================================================================
;; Mock Adapter for Chat Command Tests
;; ============================================================================

(defrecord MockAdapter [messages-atom]
  chatp/ChatAdapter
  (start! [this _handler] this)
  (stop! [this] this)
  (send-message! [_this chat-id text]
    (swap! messages-atom conj {:type :message :chat chat-id :text text})
    nil)
  (send-markdown! [_this chat-id text]
    (swap! messages-atom conj {:type :markdown :chat chat-id :text text})
    nil))

(defn mock-adapter []
  (->MockAdapter (atom [])))

;; ============================================================================
;; Main Test Runner
;; ============================================================================

(defn run-tests []
  (print-header "Learning System Verification")
  (println "Test User ID:" test-user-id)
  
  ;; Initialize
  (memory/init!)
  (learning/init!)
  (reset! session/chat-sessions {})
  (telemetry/clear-events!)
  
  ;; Clean up any existing test data
  (doseq [key (keys @memory/memory-store)]
    (when (or (str/starts-with? (name key) (name test-user-id))
              (str/starts-with? (name key) "review/")
              (str/starts-with? (name key) "learning/"))
      (memory/delete-value! key)))
  
  ;; ==========================================================================
  ;; 1. Spaced Repetition Functions
  ;; ==========================================================================
  (print-header "1. Spaced Repetition Functions")
  
  ;; Test 1.1: schedule-review!
  (try
    (let [test-learning-id (str (name test-user-id) "/test-learning-" (System/currentTimeMillis))
          _ (memory/save-value! (keyword test-learning-id) 
                                 {:learning/id test-learning-id
                                  :learning/title "Test Learning"
                                  :learning/user (name test-user-id)})
          result (learning/schedule-review! test-learning-id 3)]
      (if (and (:learning-id result) (:level result) (:next-review result))
        (record-result! "Spaced Repetition" "schedule-review!" :passed 
                        (select-keys result [:learning-id :level]))
        (record-result! "Spaced Repetition" "schedule-review!" :failed "Missing expected keys")))
    (catch Exception e
      (record-result! "Spaced Repetition" "schedule-review!" :failed (.getMessage e))))
  (print-result "schedule-review!" (:status (last (filter #(= "schedule-review!" (:function %)) @test-results))))
  
  ;; Test 1.2: get-due-reviews
  (try
    (let [result (learning/get-due-reviews test-user-id)]
      (if (vector? result)
        (record-result! "Spaced Repetition" "get-due-reviews" :passed 
                        (str "Found " (count result) " reviews"))
        (record-result! "Spaced Repetition" "get-due-reviews" :failed "Result is not a vector")))
    (catch Exception e
      (record-result! "Spaced Repetition" "get-due-reviews" :failed (.getMessage e))))
  (print-result "get-due-reviews" (:status (last (filter #(= "get-due-reviews" (:function %)) @test-results))))
  
  ;; Test 1.3: complete-review!
  (try
    (let [test-learning-id (str (name test-user-id) "/complete-test-" (System/currentTimeMillis))
          _ (memory/save-value! (keyword test-learning-id)
                                 {:learning/id test-learning-id
                                  :learning/title "Complete Test Learning"
                                  :learning/user (name test-user-id)
                                  :learning/applied-count 0})
          _ (learning/schedule-review! test-learning-id 1)
          result (learning/complete-review! test-learning-id 3)]
      (if (and (:learning-id result) (:level result) (:next-review result))
        (record-result! "Spaced Repetition" "complete-review!" :passed 
                        (select-keys result [:level]))
        (record-result! "Spaced Repetition" "complete-review!" :failed "Missing expected keys")))
    (catch Exception e
      (record-result! "Spaced Repetition" "complete-review!" :failed (.getMessage e))))
  (print-result "complete-review!" (:status (last (filter #(= "complete-review!" (:function %)) @test-results))))
  
  ;; Test 1.4: skip-review!
  (try
    (let [test-learning-id (str (name test-user-id) "/skip-test-" (System/currentTimeMillis))
          _ (memory/save-value! (keyword test-learning-id)
                                 {:learning/id test-learning-id
                                  :learning/title "Skip Test Learning"
                                  :learning/user (name test-user-id)})
          _ (learning/schedule-review! test-learning-id 3)
          result (learning/skip-review! test-learning-id)]
      (if (and (:learning-id result) (:level result) (:next-review result))
        (record-result! "Spaced Repetition" "skip-review!" :passed
                        (select-keys result [:level]))
        (record-result! "Spaced Repetition" "skip-review!" :failed "Missing expected keys")))
    (catch Exception e
      (record-result! "Spaced Repetition" "skip-review!" :failed (.getMessage e))))
  (print-result "skip-review!" (:status (last (filter #(= "skip-review!" (:function %)) @test-results))))
  
  ;; Test 1.5: get-review-stats
  (try
    (let [result (learning/get-review-stats test-user-id)]
      (if (and (contains? result :total-scheduled)
               (contains? result :due-now)
               (contains? result :upcoming)
               (contains? result :by-level))
        (record-result! "Spaced Repetition" "get-review-stats" :passed
                        (select-keys result [:total-scheduled :due-now :upcoming]))
        (record-result! "Spaced Repetition" "get-review-stats" :failed "Missing expected keys")))
    (catch Exception e
      (record-result! "Spaced Repetition" "get-review-stats" :failed (.getMessage e))))
  (print-result "get-review-stats" (:status (last (filter #(= "get-review-stats" (:function %)) @test-results))))
  
  ;; ==========================================================================
  ;; 2. Flywheel Functions
  ;; ==========================================================================
  (print-header "2. Flywheel Functions")
  
  ;; Test 2.1: determine-level
  (try
    (let [utility-level (learning/determine-level {:learning/applied-count 0 :learning/confidence 1})
          understanding-level (learning/determine-level {:learning/applied-count 1 :learning/confidence 3})
          insight-level (learning/determine-level {:learning/applied-count 2 :learning/confidence 3 :learning/transfers ["a"]})
          wisdom-level (learning/determine-level {:learning/applied-count 3 :learning/confidence 4 :learning/transfers ["a" "b"]})]
      (if (and (= utility-level :utility)
               (= understanding-level :understanding)
               (= insight-level :insight)
               (= wisdom-level :wisdom))
        (record-result! "Flywheel" "determine-level" :passed
                        {:utility utility-level :understanding understanding-level 
                         :insight insight-level :wisdom wisdom-level})
        (record-result! "Flywheel" "determine-level" :failed 
                        (str "Expected [:utility :understanding :insight :wisdom] got ["
                             utility-level " " understanding-level " " insight-level " " wisdom-level "]"))))
    (catch Exception e
      (record-result! "Flywheel" "determine-level" :failed (.getMessage e))))
  (print-result "determine-level" (:status (last (filter #(= "determine-level" (:function %)) @test-results))))
  
  ;; Test 2.2: promote-learning!
  (try
    (let [test-learning-id (str (name test-user-id) "/promote-test-" (System/currentTimeMillis))
          _ (memory/save-value! (keyword test-learning-id)
                                 {:learning/id test-learning-id
                                  :learning/title "Promote Test"
                                  :learning/user (name test-user-id)
                                  :learning/applied-count 0
                                  :learning/confidence 1
                                  :learning/level nil
                                  :learning/transfers []})
          new-level (learning/promote-learning! test-learning-id)]
      (if (keyword? new-level)
        (record-result! "Flywheel" "promote-learning!" :passed {:level new-level})
        (record-result! "Flywheel" "promote-learning!" :failed (str "Expected keyword, got " (type new-level)))))
    (catch Exception e
      (record-result! "Flywheel" "promote-learning!" :failed (.getMessage e))))
  (print-result "promote-learning!" (:status (last (filter #(= "promote-learning!" (:function %)) @test-results))))
  
  ;; Test 2.3: flywheel-progress
  (try
    (let [result (learning/flywheel-progress test-user-id)]
      (if (and (contains? result :total)
               (contains? result :by-level)
               (contains? result :current-level)
               (contains? result :progress-to-next)
               (contains? result :suggested-focus))
        (record-result! "Flywheel" "flywheel-progress" :passed
                        (select-keys result [:total :current-level :progress-to-next :suggested-focus]))
        (record-result! "Flywheel" "flywheel-progress" :failed "Missing expected keys")))
    (catch Exception e
      (record-result! "Flywheel" "flywheel-progress" :failed (.getMessage e))))
  (print-result "flywheel-progress" (:status (last (filter #(= "flywheel-progress" (:function %)) @test-results))))
  
  ;; ==========================================================================
  ;; 3. Chat Commands
  ;; ==========================================================================
  (print-header "3. Chat Commands")
  
  ;; Test 3.1: /learn command
  (try
    (let [adapter (mock-adapter)]
      (cmds/handle-command adapter test-chat-id "TestUser" :learn "clojure "Use keywords for map keys"")
      (let [messages @(:messages-atom adapter)
            last-msg (last messages)]
        (if (and (= :message (:type last-msg))
                 (str/includes? (:text last-msg) "saved"))
          (record-result! "Chat Commands" "/learn" :passed "Learning saved successfully")
          (record-result! "Chat Commands" "/learn" :failed (str "Unexpected response: " (:text last-msg))))))
    (catch Exception e
      (record-result! "Chat Commands" "/learn" :failed (.getMessage e))))
  (print-result "/learn" (:status (last (filter #(= "/learn" (:function %)) @test-results))))
  
  ;; Test 3.2: /recall command
  (try
    (let [adapter (mock-adapter)]
      (cmds/handle-command adapter test-chat-id "TestUser" :recall "clojure")
      (let [messages @(:messages-atom adapter)
            last-msg (last messages)]
        (if (= :message (:type last-msg))
          (record-result! "Chat Commands" "/recall" :passed "Recall executed")
          (record-result! "Chat Commands" "/recall" :failed (str "Unexpected response type: " (:type last-msg))))))
    (catch Exception e
      (record-result! "Chat Commands" "/recall" :failed (.getMessage e))))
  (print-result "/recall" (:status (last (filter #(= "/recall" (:function %)) @test-results))))
  
  ;; Test 3.3: /reviews command
  (try
    (let [adapter (mock-adapter)]
      (cmds/handle-command adapter test-chat-id "TestUser" :reviews "")
      (let [messages @(:messages-atom adapter)
            last-msg (last messages)]
        (if (= :message (:type last-msg))
          (record-result! "Chat Commands" "/reviews" :passed "Reviews command executed")
          (record-result! "Chat Commands" "/reviews" :failed (str "Unexpected response type: " (:type last-msg))))))
    (catch Exception e
      (record-result! "Chat Commands" "/reviews" :failed (.getMessage e))))
  (print-result "/reviews" (:status (last (filter #(= "/reviews" (:function %)) @test-results))))
  
  ;; Test 3.4: /wisdom command
  (try
    (let [adapter (mock-adapter)]
      (cmds/handle-command adapter test-chat-id "TestUser" :wisdom "")
      (let [messages @(:messages-atom adapter)
            last-msg (last messages)]
        (if (= :markdown (:type last-msg))
          (record-result! "Chat Commands" "/wisdom" :passed "Wisdom summary returned")
          (record-result! "Chat Commands" "/wisdom" :failed (str "Expected markdown, got " (:type last-msg))))))
    (catch Exception e
      (record-result! "Chat Commands" "/wisdom" :failed (.getMessage e))))
  (print-result "/wisdom" (:status (last (filter #(= "/wisdom" (:function %)) @test-results))))
  
  ;; ==========================================================================
  ;; 4. WebSocket Handlers
  ;; ==========================================================================
  (print-header "4. WebSocket Handlers (Manual Verification)")
  
  ;; WebSocket handlers require a live connection - we can verify the functions exist
  (try
    (require '[ouroboros.ws.handlers.learning :as ws-learning])
    (record-result! "WebSocket" "namespace-load" :passed "WebSocket learning handlers loaded")
    (catch Exception e
      (record-result! "WebSocket" "namespace-load" :failed (.getMessage e))))
  (print-result "namespace-load" (:status (last (filter #(= "namespace-load" (:function %)) @test-results))))
  
  ;; ==========================================================================
  ;; Summary
  ;; ==========================================================================
  (print-header "Test Summary")
  
  (let [passed (count (filter #(= :passed (:status %)) @test-results))
        failed (count (filter #(= :failed (:status %)) @test-results))
        total (+ passed failed)]
    (println (str "Total: " total " tests"))
    (println (str "Passed: " passed " ✓"))
    (println (str "Failed: " failed " ✗"))
    (println "")
    
    (when (pos? failed)
      (println "Failed Tests:")
      (doseq [fail (filter #(= :failed (:status %)) @test-results)]
        (println (str "  • " (:category fail) "/" (:function fail) ": " (:details fail)))))
    
    {:passed passed :failed failed :total total :results @test-results}))

;; Run the tests
(run-tests)
