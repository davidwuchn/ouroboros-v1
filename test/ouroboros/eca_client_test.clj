(ns ouroboros.eca-client-test
  "Tests for ECA client"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.eca-client :as eca]
   [ouroboros.telemetry :as telemetry]))

;; Helper to reset state before each test
(defn reset-state! []
  (reset! eca/state {:running false
                     :callbacks {}
                     :pending-requests {}
                     :request-id 0}))

(use-fixtures :each
  (fn [test-fn]
    (reset-state!)
    (test-fn)))

(deftest callback-registration
  (testing "Registering a callback stores it in state"
    (let [called? (atom false)
          callback (fn [_] (reset! called? true))]
      (eca/register-callback! "test/method" callback)
      (let [callbacks (:callbacks @eca/state)]
        (is (contains? callbacks "test/method"))
        (is (fn? (get callbacks "test/method"))))))

  (testing "Unregistering removes callback"
    (let [callback (fn [_])]
      (eca/register-callback! "test/method" callback)
      (eca/unregister-callback! "test/method")
      (is (not (contains? (:callbacks @eca/state) "test/method")))))

  (testing "Clearing callbacks removes all"
    (let [callback (fn [_])]
      (eca/register-callback! "method1" callback)
      (eca/register-callback! "method2" callback)
      (eca/clear-callbacks!)
      (is (empty? (:callbacks @eca/state))))))

(deftest callback-invocation
  (testing "Registered callback is invoked on notification"
    (let [called? (atom false)
          captured (atom nil)
          callback (fn [notification] (reset! called? true) (reset! captured notification))
          notification {:method "test/method" :params {:foo "bar"}}]
      (eca/register-callback! "test/method" callback)
      ;; Call private function handle-notification!
      (#'eca/handle-notification! notification)
      (is @called? "Callback should have been called")
      (is (= notification @captured)))))

(deftest jsonrpc-message-format
  (testing "JSON-RPC message structure"
    (let [message (#'eca/make-jsonrpc-message "test/method" {:param 1} 42)]
      (is (= "2.0" (:jsonrpc message)))
      (is (= "test/method" (:method message)))
      (is (= {:param 1} (:params message)))
      (is (= 42 (:id message)))))

  (testing "Message serialization includes Content-Length"
    (let [message (#'eca/make-jsonrpc-message "test" {} 1)
          serialized (#'eca/serialize-message message)]
      (is (re-find #"Content-Length: \d+" serialized))
      (is (re-find #"\r\n\r\n" serialized)))))

(deftest telemetry-emission
  (testing "Telemetry events are emitted for notifications"
    (let [telemetry-events (atom [])
          original-emit telemetry/emit!]
      (with-redefs [telemetry/emit! (fn [event] (swap! telemetry-events conj event))]
        (#'eca/handle-notification! {:method "chat/contentReceived" :params {:role "user"}})
        (is (some #(= :eca/notification (:event %)) @telemetry-events))
        (is (some #(= :eca/content-received (:event %)) @telemetry-events))))))

(deftest start-stop-lifecycle
  (testing "Status reflects running state"
    (reset-state!)
    (is (false? (:running (eca/status))))
    (with-redefs [eca/start! (fn [] (swap! eca/state assoc :running true))]
      (eca/start!)
      (is (true? (:running (eca/status)))))))