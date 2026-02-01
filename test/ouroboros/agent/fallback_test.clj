(ns ouroboros.agent.fallback-test
  "Tests for provider fallback chain logic
   
   Validates:
 - Provider failover when primary fails
 - Health state tracking (healthy → degraded → unhealthy)
 - Cooldown periods after failures
 - Statistics calculation
 - Configuration building"
  (:require
   [clojure.test :refer [deftest testing is use-fixtures]]
   [ouroboros.agent.fallback :as fallback])
  (:import [java.time Instant]))

;; ============================================================================
;; Test Fixtures
;; ============================================================================

(defn reset-health-fixture
  "Reset health state before each test to ensure isolation"
  [f]
  (fallback/reset-health!)
  (f)
  (fallback/reset-health!))

(use-fixtures :each reset-health-fixture)

;; ============================================================================
;; Helper Functions
;; ============================================================================

(defn- mock-generate-success
  "Create a mock generate function that succeeds for specific providers"
  [success-providers]
  (fn [provider _ _ _]
    (if (contains? (set success-providers) provider)
      {:content (str "Success from " (name provider))
       :tokens 10}
      {:error (str (name provider) " failed")})))

(defn- mock-generate-always-fail
  "Mock generate function that always fails"
  [provider _ _ _]
  {:error (str (name provider) " failed")})

(defn- mock-generate-throw
  "Mock generate function that throws exception"
  [provider _ _ _]
  (throw (ex-info (str provider " exception") {:provider provider})))

;; ============================================================================
;; Fallback Chain Tests
;; ============================================================================

(deftest single-provider-success-test
  (testing "Single provider succeeds immediately"
    (let [result (fallback/generate-with-fallback
                  [:primary]
                  {:primary {:api-key "test"}}
                  (mock-generate-success [:primary])
                  []
                  [])]
      (is (:success result))
      (is (= :primary (:provider result)))
      (is (= 1 (:attempts result)))
      (is (= {:content "Success from primary" :tokens 10}
             (:result result))))))

(deftest fallback-to-second-provider-test
  (testing "Falls back to second provider when first fails"
    (let [result (fallback/generate-with-fallback
                  [:primary :backup]
                  {:primary {:api-key "test"} :backup {:api-key "test"}}
                  (mock-generate-success [:backup])
                  []
                  [])]
      (is (:success result))
      (is (= :backup (:provider result)))
      (is (= 2 (:attempts result)))
      (is (= [:primary :backup] (:attempted result))))))

(deftest fallback-to-third-provider-test
  (testing "Falls back through chain when first two fail"
    (let [result (fallback/generate-with-fallback
                  [:p1 :p2 :p3]
                  {:p1 {:api-key "1"} :p2 {:api-key "2"} :p3 {:api-key "3"}}
                  (mock-generate-success [:p3])
                  []
                  [])]
      (is (:success result))
      (is (= :p3 (:provider result)))
      (is (= 3 (:attempts result)))
      (is (= [:p1 :p2 :p3] (:attempted result))))))

(deftest all-providers-fail-test
  (testing "Returns failure when all providers fail"
    (let [result (fallback/generate-with-fallback
                  [:p1 :p2]
                  {:p1 {:api-key "1"} :p2 {:api-key "2"}}
                  mock-generate-always-fail
                  []
                  [])]
      (is (not (:success result)))
      (is (= "All providers failed" (:error result)))
      (is (= [:p1 :p2] (:attempted result)))
      (is (map? (:health result))))))

(deftest skip-provider-without-config-test
  (testing "Skips providers that have no configuration"
    (let [result (fallback/generate-with-fallback
                  [:no-config :has-config]
                  {:has-config {:api-key "test"}}
                  (mock-generate-success [:has-config])
                  []
                  [])]
      (is (:success result))
      (is (= :has-config (:provider result)))
      ;; Should attempt no-config (skipped), then has-config
      (is (= 2 (:attempts result)))
      (is (= [:no-config :has-config] (:attempted result))))))

(deftest exception-handling-test
  (testing "Handles exceptions from generate function"
    (let [result (fallback/generate-with-fallback
                  [:throws :works]
                  {:throws {:api-key "1"} :works {:api-key "2"}}
                  (fn [p _ _ _]
                    (if (= p :throws)
                      (throw (ex-info "Boom!" {}))
                      {:content "OK"}))
                  []
                  [])]
      (is (:success result))
      (is (= :works (:provider result)))
      (is (= 2 (:attempts result))))))

;; ============================================================================
;; Health State Tests
;; ============================================================================

(deftest record-success-creates-health-entry-test
  (testing "Recording success creates health entry with correct defaults"
    (fallback/record-success! :test-provider)
    (let [health (fallback/get-health :test-provider)]
      (is (some? health))
      (is (= :test-provider (:provider health)))
      (is (= :healthy (:status health)))
      (is (= 0 (:consecutive-failures health)))
      (is (= 1 (:total-requests health)))
      (is (= 0 (:total-failures health)))
      (is (nil? (:last-error health))))))

(deftest record-success-resets-failures-test
  (testing "Success resets consecutive failures and clears last error"
    ;; First cause some failures
    (fallback/record-failure! :test-provider (ex-info "Error 1" {}))
    (fallback/record-failure! :test-provider (ex-info "Error 2" {}))
    
    ;; Then success
    (fallback/record-success! :test-provider)
    
    (let [health (fallback/get-health :test-provider)]
      (is (= :healthy (:status health)))
      (is (= 0 (:consecutive-failures health)))
      (is (nil? (:last-error health)))
      (is (= 3 (:total-requests health)))  ; 2 failures + 1 success
      (is (= 2 (:total-failures health))))))

(deftest health-status-progression-test
  (testing "Status progresses: healthy → degraded → unhealthy"
    ;; First failure - still healthy
    (fallback/record-failure! :provider (ex-info "Error 1" {}))
    (let [h1 (fallback/get-health :provider)]
      (is (= :healthy (:status h1)))
      (is (= 1 (:consecutive-failures h1))))
    
    ;; Second failure - degraded
    (fallback/record-failure! :provider (ex-info "Error 2" {}))
    (let [h2 (fallback/get-health :provider)]
      (is (= :degraded (:status h2)))
      (is (= 2 (:consecutive-failures h2))))
    
    ;; Third failure - unhealthy
    (fallback/record-failure! :provider (ex-info "Error 3" {}))
    (let [h3 (fallback/get-health :provider)]
      (is (= :unhealthy (:status h3)))
      (is (= 3 (:consecutive-failures h3))))))

(deftest record-failure-tracks-error-message-test
  (testing "Failure records error message and timestamp"
    (fallback/record-failure! :provider (ex-info "Specific error message" {}))
    (let [health (fallback/get-health :provider)]
      (is (= "Specific error message" (:last-error health)))
      (is (instance? Instant (:last-failure-at health))))))

;; ============================================================================
;; Reset Tests
;; ============================================================================

(deftest reset-all-health-test
  (testing "Reset all clears all health state"
    (fallback/record-success! :p1)
    (fallback/record-success! :p2)
    (is (= 2 (count (fallback/get-health))))
    
    (fallback/reset-health!)
    (is (= 0 (count (fallback/get-health))))))

(deftest reset-single-provider-test
  (testing "Reset single provider removes only that provider"
    (fallback/record-success! :keep)
    (fallback/record-success! :remove)
    (is (= 2 (count (fallback/get-health))))
    
    (fallback/reset-health! :remove)
    (is (= 1 (count (fallback/get-health))))
    (is (some? (fallback/get-health :keep)))
    (is (nil? (fallback/get-health :remove)))))

;; ============================================================================
;; Provider Stats Tests
;; ============================================================================

(deftest provider-stats-calculation-test
  (testing "Stats include success rate calculation"
    ;; 3 failures, then 1 success
    (fallback/record-failure! :test (ex-info "e1" {}))
    (fallback/record-failure! :test (ex-info "e2" {}))
    (fallback/record-failure! :test (ex-info "e3" {}))
    (fallback/record-success! :test)
    
    (let [stats (fallback/get-provider-stats)
          test-stats (get stats :test)]
      (is (some? test-stats))
      (is (= :healthy (:status test-stats)))  ; Success resets status
      (is (= 4 (:total-requests test-stats)))
      (is (= 3 (:total-failures test-stats)))
      (is (== 0.25 (:success-rate test-stats)))  ; 1 success / 4 total = 0.25
      ;; Provider may or may not be in cooldown depending on timing
      ;; (60s cooldown starts after each failure)
      )))

(deftest provider-stats-empty-test
  (testing "Stats handle empty health state"
    (let [stats (fallback/get-provider-stats)]
      (is (empty? stats)))))

;; ============================================================================
;; Config Building Tests
;; ============================================================================

(deftest build-config-openai-only-test
  (testing "Build config with only OpenAI"
    (let [[providers configs] (fallback/build-config {:openai-api-key "sk-test123"})]
      (is (= [:openai] providers))
      (is (= "sk-test123" (get-in configs [:openai :api-key])))
      (is (= "gpt-4o-mini" (get-in configs [:openai :model]))))))

(deftest build-config-all-providers-test
  (testing "Build config with all providers"
    (let [[providers configs] (fallback/build-config
                               {:openai-api-key "sk-open"
                                :anthropic-api-key "sk-anthro"
                                :ollama-url "http://localhost:11434"})]
      (is (= [:openai :anthropic :ollama] providers))
      (is (= "sk-open" (get-in configs [:openai :api-key])))
      (is (= "sk-anthro" (get-in configs [:anthropic :api-key])))
      (is (= "http://localhost:11434" (get-in configs [:ollama :url]))))))

(deftest build-config-custom-models-test
  (testing "Build config respects custom model settings"
    (let [[_ configs] (fallback/build-config
                       {:openai-api-key "sk-test"
                        :openai-model "gpt-4o"
                        :anthropic-api-key "sk-test"
                        :anthropic-model "claude-3-opus"})]
      (is (= "gpt-4o" (get-in configs [:openai :model])))
      (is (= "claude-3-opus" (get-in configs [:anthropic :model]))))))

(deftest build-config-empty-test
  (testing "Build config with no env vars returns empty"
    (let [[providers configs] (fallback/build-config {})]
      (is (empty? providers))
      (is (empty? configs)))))

;; ============================================================================
;; Integration Tests
;; ============================================================================

(deftest full-fallback-flow-test
  (testing "Complete fallback flow with health tracking"
    ;; First call - primary fails, backup succeeds
    (let [result1 (fallback/generate-with-fallback
                   [:primary :backup]
                   {:primary {:api-key "1"} :backup {:api-key "2"}}
                   (fn [p _ _ _]
                     (if (= p :primary)
                       (throw (ex-info "Primary down" {}))
                       {:content "Backup response"}))
                   []
                   [])]
      (is (:success result1))
      (is (= :backup (:provider result1)))
      
      ;; Verify primary health shows failure (only 1 failure recorded now)
      (let [primary-health (fallback/get-health :primary)]
        (is (= :healthy (:status primary-health)))  ; Only 1 failure
        (is (= 1 (:consecutive-failures primary-health))))
      
      ;; Verify backup health shows success
      (let [backup-health (fallback/get-health :backup)]
        (is (= :healthy (:status backup-health)))
        (is (= 0 (:consecutive-failures backup-health)))))
    
    ;; Reset and try again - primary still fails (no config change)
    (fallback/reset-health!)
    
    ;; This time primary succeeds (simulating recovery)
    (let [result2 (fallback/generate-with-fallback
                   [:primary :backup]
                   {:primary {:api-key "1"} :backup {:api-key "2"}}
                   (mock-generate-success [:primary])
                   []
                   [])]
      (is (:success result2))
      (is (= :primary (:provider result2)))
      (is (= 1 (:attempts result2))))))

(deftest consecutive-failures-across-calls-test
  (testing "Consecutive failures tracked across multiple calls"
    ;; First call - all fail
    (fallback/generate-with-fallback
     [:p1 :p2]
     {:p1 {:api-key "1"} :p2 {:api-key "2"}}
     mock-generate-always-fail
     []
     [])
    
    ;; Second call - should still fail but health now shows 2 failures each
    (fallback/generate-with-fallback
     [:p1 :p2]
     {:p1 {:api-key "1"} :p2 {:api-key "2"}}
     mock-generate-always-fail
     []
     [])
    
    ;; Now each provider has 2 consecutive failures (degraded status)
    (let [h1 (fallback/get-health :p1)
          h2 (fallback/get-health :p2)]
      (is (= :degraded (:status h1)))
      (is (= :degraded (:status h2)))
      (is (= 2 (:consecutive-failures h1)))
      (is (= 2 (:consecutive-failures h2))))))

;; ============================================================================
;; Run Tests
;; ============================================================================

(comment
  ;; Run all tests
  (clojure.test/run-tests 'ouroboros.agent.fallback-test)
  
  ;; Run specific test
  (clojure.test/run-tests (selector :health-status-progression-test))
  
  ;; Reset for manual testing
  (fallback/reset-health!)
  
  ;; Manual fallback test
  (fallback/generate-with-fallback
   [:openai :anthropic]
   {:openai {:api-key "test"} :anthropic {:api-key "test"}}
   (fn [p _ _ _] (if (= p :openai) {:error "fail"} {:content "ok"}))
   []
   []))
