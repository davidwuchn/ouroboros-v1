(ns ouroboros.eca-client-test
  "Tests for ECA client"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [clojure.string :as str]
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
      (eca/register-callback! "test/method" :test callback)
      (let [callbacks (:callbacks @eca/state)]
        (is (contains? callbacks "test/method"))
        (is (fn? (get-in callbacks ["test/method" :test]))))))

  (testing "Unregistering removes callback"
    (let [callback (fn [_])]
      (eca/register-callback! "test/method" :test callback)
      (eca/unregister-callback! "test/method" :test)
      (is (not (contains? (:callbacks @eca/state) "test/method")))))

  (testing "Clearing callbacks removes all"
    (let [callback (fn [_])]
      (eca/register-callback! "method1" :test callback)
      (eca/register-callback! "method2" :test callback)
      (eca/clear-callbacks!)
      (is (empty? (:callbacks @eca/state))))))

(deftest callback-invocation
  (testing "Registered callback is invoked on notification"
    (let [called? (atom false)
          captured (atom nil)
          callback (fn [notification] (reset! called? true) (reset! captured notification))
          notification {:method "test/method" :params {:foo "bar"}}]
      (eca/register-callback! "test/method" :test callback)
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

;; ============================================================================
;; Multi-Listener Callback Tests
;; ============================================================================

(deftest multi-listener-registration
  (testing "Multiple listeners on same method all get stored"
    (let [cb1 (fn [_])
          cb2 (fn [_])]
      (eca/register-callback! "test/method" :listener-1 cb1)
      (eca/register-callback! "test/method" :listener-2 cb2)
      (let [listeners (get-in @eca/state [:callbacks "test/method"])]
        (is (= 2 (count listeners)))
        (is (fn? (get listeners :listener-1)))
        (is (fn? (get listeners :listener-2))))))

  (testing "Auto-generated listener IDs work (2-arity)"
    (let [cb (fn [_])
          listener-id (eca/register-callback! "auto/method" cb)]
      (is (string? listener-id))
      (is (str/starts-with? listener-id "auto/method-"))
      (let [listeners (get-in @eca/state [:callbacks "auto/method"])]
        (is (= 1 (count listeners)))
        (is (fn? (get listeners listener-id))))))

  (testing "Removing one listener doesn't affect others"
    (reset-state!)
    (let [cb1 (fn [_])
          cb2 (fn [_])]
      (eca/register-callback! "test/method" :keep cb1)
      (eca/register-callback! "test/method" :remove cb2)
      ;; Remove one
      (eca/unregister-callback! "test/method" :remove)
      (let [listeners (get-in @eca/state [:callbacks "test/method"])]
        (is (= 1 (count listeners)))
        (is (fn? (get listeners :keep)))
        (is (nil? (get listeners :remove))))))

  (testing "Removing last listener cleans up method entry"
    (reset-state!)
    (let [cb (fn [_])]
      (eca/register-callback! "cleanup/method" :only-one cb)
      (eca/unregister-callback! "cleanup/method" :only-one)
      (is (nil? (get-in @eca/state [:callbacks "cleanup/method"]))))))

(deftest multi-listener-invocation
  (testing "All listeners for a method get called"
    (let [calls (atom [])
          cb1 (fn [n] (swap! calls conj [:listener-1 n]))
          cb2 (fn [n] (swap! calls conj [:listener-2 n]))
          notification {:method "multi/test" :params {:data "hello"}}]
      (eca/register-callback! "multi/test" :listener-1 cb1)
      (eca/register-callback! "multi/test" :listener-2 cb2)
      (#'eca/handle-notification! notification)
      (is (= 2 (count @calls)))
      (is (some #(= :listener-1 (first %)) @calls))
      (is (some #(= :listener-2 (first %)) @calls))))

  (testing "Error in one listener doesn't prevent others from executing"
    (let [calls (atom [])
          bad-cb (fn [_] (throw (Exception. "boom")))
          good-cb (fn [n] (swap! calls conj :good-called))
          notification {:method "error/test" :params {}}]
      (eca/register-callback! "error/test" :bad bad-cb)
      (eca/register-callback! "error/test" :good good-cb)
      ;; Should not throw
      (#'eca/handle-notification! notification)
      ;; Good listener should still have been called
      (is (= [:good-called] @calls)))))

(deftest start-stop-lifecycle
  (testing "Status reflects running state"
    (reset-state!)
    (is (false? (:running (eca/status))))
    (with-redefs [eca/start! (fn [] (swap! eca/state assoc :running true))]
      (eca/start!)
      (is (true? (:running (eca/status)))))))