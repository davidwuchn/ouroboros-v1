(ns ouroboros.telemetry-test
  "Tests for the telemetry subsystem"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.telemetry :as telemetry]))

(use-fixtures :each
  (fn [test-fn]
    (telemetry/clear-events!)
    (test-fn)
    (telemetry/clear-events!)))

(deftest emit-event-test
  (testing "Emitting a telemetry event"
    (let [result (telemetry/emit! {:event :test/basic :data "hello"})]
      (is (map? result) "Should return enriched event")
      (is (:event/timestamp result) "Should have timestamp")
      (is (= :test/basic (:event result)) "Should preserve event type"))))

(deftest get-events-test
  (testing "Getting all events"
    (telemetry/emit! {:event :test/a})
    (telemetry/emit! {:event :test/b})
    (let [events (telemetry/get-events)]
      (is (>= (count events) 2) "Should have at least 2 events"))))

(deftest get-recent-events-test
  (testing "Getting recent events"
    (dotimes [_ 10]
      (telemetry/emit! {:event :test/bulk}))
    (let [recent (telemetry/get-recent-events 3)]
      (is (= 3 (count recent)) "Should return exactly 3"))))

(deftest clear-events-test
  (testing "Clearing events"
    (telemetry/emit! {:event :test/to-clear})
    (is (pos? (count (telemetry/get-events))) "Should have events")
    (telemetry/clear-events!)
    (is (empty? (telemetry/get-events)) "Should be empty after clear")))

(deftest backends-management-test
  (testing "Backend management"
    (let [backends (telemetry/get-backends)]
      (is (seq backends) "Should have at least one backend"))))

(deftest log-helpers-test
  (testing "Logging helper functions"
    (telemetry/log-tool-invoke :test/tool {:param "value"})
    (telemetry/log-tool-complete :test/tool {:result "ok"} 100)
    (telemetry/log-tool-error :test/tool (ex-info "test" {}))
    (telemetry/log-state-transition :state-a :state-b :trigger-x)
    (let [events (telemetry/get-events)]
      (is (>= (count events) 4) "Should have logged 4+ events"))))

(deftest resolvers-defined-test
  (testing "Telemetry resolvers are defined"
    (is (vector? telemetry/resolvers))
    (is (pos? (count telemetry/resolvers)))))

(deftest mutations-defined-test
  (testing "Telemetry mutations are defined"
    (is (vector? telemetry/mutations))
    (is (pos? (count telemetry/mutations)))))
