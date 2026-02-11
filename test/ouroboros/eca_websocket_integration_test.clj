(ns ouroboros.eca-websocket-integration-test
  "Integration tests for ECA-WebSocket callback flows.

   Tests the ECA client callback system as used by WebSocket handlers:
   - Callback registration, notification dispatch, and cleanup
   - Chat-id based filtering (each WS session gets unique chat-id)
   - Token streaming via callbacks
   - Content accumulation patterns
   - chat-prompt retry logic (timeout -> restart -> retry)
   - ensure-alive! auto-restart behavior
   - Concurrent sessions with independent chat-ids
   - Error propagation and callback cleanup

   Note: websocket.clj cannot be loaded in Babashka (httpkit server macros).
   These tests replicate the handler patterns using the ECA callback system
   directly, which is the core integration point."
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [clojure.string :as str]
   [ouroboros.eca-client :as eca]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Test Helpers
;; ============================================================================

(defn- reset-eca-state! []
  (reset! eca/state {:eca-process nil
                     :stdin nil
                     :stdout nil
                     :running false
                     :request-id 0
                     :pending-requests {}
                     :callbacks {}
                     :chat-contents []}))

(def ^:private ws-messages
  "Atom to capture simulated WebSocket messages"
  (atom []))

(def ^:private telemetry-events
  "Atom to capture telemetry events"
  (atom []))

(defn- reset-captures! []
  (reset! ws-messages [])
  (reset! telemetry-events []))

(use-fixtures :each
  (fn [test-fn]
    (reset-eca-state!)
    (reset-captures!)
    (test-fn)
    (reset-eca-state!)
    (reset-captures!)))

(defn- send-to-client!
  "Mock send-to! that captures messages by client-id"
  [id message]
  (swap! ws-messages conj {:client-id id :message message}))

(defn- messages-for
  "Get all captured messages for a specific client-id"
  [client-id]
  (->> @ws-messages
       (filter #(= client-id (:client-id %)))
       (mapv :message)))

(defn- messages-of-type
  "Get captured messages of a specific type for a client"
  [client-id msg-type]
  (->> (messages-for client-id)
       (filter #(= msg-type (:type %)))))

(defn- simulate-eca-notification!
  "Simulate an ECA notification by invoking registered callbacks.
   This mimics what handle-notification! does internally -- dispatches
   to all listeners registered for the given method."
  [method notification]
  (let [listeners (get-in @eca/state [:callbacks method])]
    (doseq [[_listener-id callback-fn] listeners]
      (try
        (callback-fn notification)
        (catch Exception e
          (println "Test: callback error:" (.getMessage e)))))))

(defn- make-text-notification
  "Create a text content notification matching ECA protocol"
  [chat-id text]
  {:method "chat/contentReceived"
   :params {:chatId chat-id
            :role "assistant"
            :content {:type "text" :text text}}})

(defn- make-done-notification
  "Create a progress done notification matching ECA protocol"
  [chat-id]
  {:method "chat/contentReceived"
   :params {:chatId chat-id
            :role "system"
            :content {:type "progress" :state "done"}}})

;; ============================================================================
;; Handler Simulation Helpers
;; ============================================================================
;; These replicate the core logic of websocket.clj handlers, using only the
;; ECA callback API. This lets us test the callback integration without
;; loading httpkit.

(defn- simulate-eca-chat-handler!
  "Replicates handle-eca-chat! logic: register callback, send prompt, stream tokens.
   Returns the chat-id used for this session."
  [client-id text {:keys [alive? prompt-fn]}]
  (if-not alive?
    (do
      (send-to-client! client-id {:type :eca/chat-error
                                   :error "ECA could not be started. Ensure the ECA binary is installed."
                                   :timestamp (System/currentTimeMillis)})
      nil)
    (let [chat-id (str "ws-" client-id "-" (System/currentTimeMillis))
          listener-id (keyword (str "ws-chat-" client-id))]
      ;; Register callback to relay ECA content to this specific WS client
      (eca/register-callback! "chat/contentReceived" listener-id
        (fn [notification]
          (let [params (:params notification)
                notif-chat-id (:chatId params)
                role (:role params)
                content (:content params)]
            (when (= notif-chat-id chat-id)
              (cond
                ;; Progress done -> send done and unregister
                (and (= "progress" (:type content))
                     (#{"done" "finished"} (:state content)))
                (do
                  (send-to-client! client-id {:type :eca/chat-done
                                               :timestamp (System/currentTimeMillis)})
                  (eca/unregister-callback! "chat/contentReceived" listener-id))

                ;; Assistant text -> stream as token
                (and (= role "assistant") (= "text" (:type content)))
                (send-to-client! client-id {:type :eca/chat-token
                                             :token (:text content)
                                             :timestamp (System/currentTimeMillis)})

                :else nil)))))

      ;; Send prompt to ECA
      (try
        (let [result (prompt-fn text {:chat-id chat-id})]
          (when (= :error (:status result))
            (let [error-msg (or (:message result)
                                (when (keyword? (:error result)) (name (:error result)))
                                (str (:error result)))]
              (send-to-client! client-id {:type :eca/chat-error
                                           :error (str "AI error: " error-msg)
                                           :timestamp (System/currentTimeMillis)})
              (eca/unregister-callback! "chat/contentReceived" listener-id))))
        (catch Exception e
          (send-to-client! client-id {:type :eca/chat-error
                                       :error (str "ECA error: " (.getMessage e))
                                       :timestamp (System/currentTimeMillis)})
          (eca/unregister-callback! "chat/contentReceived" listener-id)))
      chat-id)))

(defn- simulate-content-generate-handler!
  "Replicates handle-content-generate! logic: register callback, accumulate tokens.
   Returns the chat-id used."
  [client-id content-type {:keys [alive? prompt-fn]}]
  (let [content-type-kw (if (string? content-type) (keyword content-type) content-type)]
    (if-not alive?
      (do
        (send-to-client! client-id {:type :content/error
                                     :content-type content-type-kw
                                     :error "ECA not available"
                                     :timestamp (System/currentTimeMillis)})
        nil)
      (let [chat-id (str "ws-content-" (name content-type-kw) "-" client-id "-" (System/currentTimeMillis))
            listener-id (keyword (str "ws-content-" (name content-type-kw) "-" client-id))
            accumulated (atom "")]
        ;; Register streaming callback
        (eca/register-callback! "chat/contentReceived" listener-id
          (fn [notification]
            (let [params (:params notification)
                  notif-chat-id (:chatId params)
                  role (:role params)
                  content (:content params)]
              (when (= notif-chat-id chat-id)
                (cond
                  ;; Done -> send accumulated content
                  (and (= "progress" (:type content))
                       (#{"done" "finished"} (:state content)))
                  (do
                    (send-to-client! client-id {:type :content/generated
                                                 :content-type content-type-kw
                                                 :content @accumulated
                                                 :timestamp (System/currentTimeMillis)})
                    (eca/unregister-callback! "chat/contentReceived" listener-id))

                  ;; Token -> accumulate and stream
                  (and (= role "assistant") (= "text" (:type content)))
                  (do
                    (swap! accumulated str (:text content))
                    (send-to-client! client-id {:type :content/token
                                                 :content-type content-type-kw
                                                 :token (:text content)
                                                 :timestamp (System/currentTimeMillis)}))

                  :else nil)))))

        ;; Send to ECA
        (try
          (let [result (prompt-fn "generated prompt" {:chat-id chat-id})]
            (when (= :error (:status result))
              (send-to-client! client-id {:type :content/error
                                           :content-type content-type-kw
                                           :error (or (:message result) (:error result))
                                           :timestamp (System/currentTimeMillis)})
              (eca/unregister-callback! "chat/contentReceived" listener-id)))
          (catch Exception e
            (send-to-client! client-id {:type :content/error
                                         :content-type content-type-kw
                                         :error (.getMessage e)
                                         :timestamp (System/currentTimeMillis)})
            (eca/unregister-callback! "chat/contentReceived" listener-id)))
        chat-id))))

(defn- simulate-auto-insight-handler!
  "Replicates handle-auto-insight! logic: stream insight tokens, save to learning.
   Returns the chat-id used."
  [client-id builder-type {:keys [alive? prompt-fn save-insight-fn]}]
  (let [builder-type-kw (if (string? builder-type) (keyword builder-type) builder-type)]
    (when alive?
      (let [chat-id (str "ws-insight-" client-id "-" (System/currentTimeMillis))
            listener-id (keyword (str "ws-insight-" client-id))
            insight-text (atom "")]

        ;; Notify start
        (send-to-client! client-id {:type :eca/auto-insight-start
                                     :builder-type builder-type-kw
                                     :timestamp (System/currentTimeMillis)})

        ;; Register streaming callback
        (eca/register-callback! "chat/contentReceived" listener-id
          (fn [notification]
            (let [params (:params notification)
                  notif-chat-id (:chatId params)
                  role (:role params)
                  content (:content params)]
              (when (= notif-chat-id chat-id)
                (cond
                  ;; Done -> save insight and send done
                  (and (= "progress" (:type content))
                       (#{"done" "finished"} (:state content)))
                  (do
                    (send-to-client! client-id {:type :eca/auto-insight-done
                                                 :builder-type builder-type-kw
                                                 :timestamp (System/currentTimeMillis)})
                    (eca/unregister-callback! "chat/contentReceived" listener-id)
                    ;; Save to learning
                    (let [full-text @insight-text]
                      (when (and save-insight-fn (seq full-text))
                        (save-insight-fn {:title (str (name builder-type-kw) " Completion Insight")
                                          :insights [full-text]
                                          :pattern (str "builder-completion-" (name builder-type-kw))}))))

                  ;; Token -> accumulate and stream
                  (and (= role "assistant") (= "text" (:type content)))
                  (do
                    (swap! insight-text str (:text content))
                    (send-to-client! client-id {:type :eca/auto-insight-token
                                                 :token (:text content)
                                                 :builder-type builder-type-kw
                                                 :timestamp (System/currentTimeMillis)}))

                  :else nil)))))

        ;; Send prompt
        (try
          (let [result (prompt-fn "insight prompt" {:chat-id chat-id})]
            (when (= :error (:status result))
              (eca/unregister-callback! "chat/contentReceived" listener-id)))
          (catch Exception e
            (eca/unregister-callback! "chat/contentReceived" listener-id)))
        chat-id))))

(defn- simulate-wisdom-handler!
  "Replicates handle-eca-wisdom! logic: stream wisdom tokens with request-type.
   Returns the chat-id used."
  [client-id request-type {:keys [alive? prompt-fn]}]
  (let [request-type-kw (if (string? request-type) (keyword request-type) request-type)]
    (if-not alive?
      (do
        (send-to-client! client-id {:type :eca/wisdom-response
                                     :text "ECA could not be started."
                                     :request-type request-type-kw
                                     :timestamp (System/currentTimeMillis)})
        nil)
      (let [chat-id (str "ws-wisdom-" client-id "-" (System/currentTimeMillis))
            listener-id (keyword (str "ws-wisdom-" client-id))]

        ;; Register callback
        (eca/register-callback! "chat/contentReceived" listener-id
          (fn [notification]
            (let [params (:params notification)
                  notif-chat-id (:chatId params)
                  role (:role params)
                  content (:content params)]
              (when (= notif-chat-id chat-id)
                (cond
                  ;; Done
                  (and (= "progress" (:type content))
                       (#{"done" "finished"} (:state content)))
                  (do
                    (send-to-client! client-id {:type :eca/wisdom-done
                                                 :request-type request-type-kw
                                                 :timestamp (System/currentTimeMillis)})
                    (eca/unregister-callback! "chat/contentReceived" listener-id))

                  ;; Token
                  (and (= role "assistant") (= "text" (:type content)))
                  (send-to-client! client-id {:type :eca/wisdom-token
                                               :token (:text content)
                                               :request-type request-type-kw
                                               :timestamp (System/currentTimeMillis)})

                  :else nil)))))

        ;; Send prompt
        (try
          (let [result (prompt-fn "wisdom prompt" {:chat-id chat-id})]
            (when (= :error (:status result))
              (send-to-client! client-id {:type :eca/wisdom-response
                                           :text (str "Error: " (or (:message result) (:error result)))
                                           :request-type request-type-kw
                                           :timestamp (System/currentTimeMillis)})
              (eca/unregister-callback! "chat/contentReceived" listener-id)))
          (catch Exception e
            (send-to-client! client-id {:type :eca/wisdom-response
                                         :text (str "ECA error: " (.getMessage e))
                                         :request-type request-type-kw
                                         :timestamp (System/currentTimeMillis)})
            (eca/unregister-callback! "chat/contentReceived" listener-id)))
        chat-id))))

;; ============================================================================
;; Test 1: ECA chat success flow
;; ============================================================================

(deftest handle-eca-chat-success-flow
  (testing "Full ECA chat flow: tokens streamed, done message sent, callback cleaned up"
    (let [client-id "test-client-1"
          prompt-captured (atom nil)
          prompt-fn (fn [text opts]
                      (reset! prompt-captured text)
                      {:status :success :response {:id 1}})
          chat-id (simulate-eca-chat-handler! client-id "Hello AI"
                    {:alive? true :prompt-fn prompt-fn})]

      ;; Verify prompt was sent
      (is (= "Hello AI" @prompt-captured))
      (is (some? chat-id))
      (is (str/starts-with? chat-id "ws-test-client-1-"))

      ;; Verify callback was registered
      (let [listeners (get-in @eca/state [:callbacks "chat/contentReceived"])]
        (is (= 1 (count listeners)) "Should have one callback registered"))

      ;; Simulate ECA streaming tokens
      (simulate-eca-notification! "chat/contentReceived"
        (make-text-notification chat-id "Hello"))
      (simulate-eca-notification! "chat/contentReceived"
        (make-text-notification chat-id " world"))

      ;; Verify tokens were sent to client
      (let [tokens (messages-of-type client-id :eca/chat-token)]
        (is (= 2 (count tokens)))
        (is (= "Hello" (:token (first tokens))))
        (is (= " world" (:token (second tokens)))))

      ;; Simulate done
      (simulate-eca-notification! "chat/contentReceived"
        (make-done-notification chat-id))

      ;; Verify done message sent
      (is (= 1 (count (messages-of-type client-id :eca/chat-done))))

      ;; Verify callback was cleaned up
      (let [listeners (get-in @eca/state [:callbacks "chat/contentReceived"])]
        (is (or (nil? listeners) (empty? listeners))
            "Callback should be unregistered after done")))))

;; ============================================================================
;; Test 2: ECA chat - not available
;; ============================================================================

(deftest handle-eca-chat-not-available
  (testing "When ECA is not alive, sends error to client"
    (let [client-id "test-client-2"
          chat-id (simulate-eca-chat-handler! client-id "Hello"
                    {:alive? false :prompt-fn (fn [_ _] {:status :success})})]

      ;; Should have sent an error message
      (let [errors (messages-of-type client-id :eca/chat-error)]
        (is (= 1 (count errors)))
        (is (str/includes? (:error (first errors)) "ECA could not be started")))

      ;; No callbacks should be registered
      (is (empty? (:callbacks @eca/state)))
      ;; chat-id should be nil
      (is (nil? chat-id)))))

;; ============================================================================
;; Test 3: ECA chat - prompt error
;; ============================================================================

(deftest handle-eca-chat-prompt-error
  (testing "When chat-prompt returns error, sends error to client and cleans up callback"
    (let [client-id "test-client-3"
          prompt-fn (fn [_ _]
                      {:status :error
                       :error :llm-error
                       :message "Model rate limited"})
          chat-id (simulate-eca-chat-handler! client-id "Hello"
                    {:alive? true :prompt-fn prompt-fn})]

      ;; Should have sent error to client
      (let [errors (messages-of-type client-id :eca/chat-error)]
        (is (= 1 (count errors)))
        (is (str/includes? (:error (first errors)) "Model rate limited")))

      ;; Callback should be cleaned up
      (let [listeners (get-in @eca/state [:callbacks "chat/contentReceived"])]
        (is (or (nil? listeners) (empty? listeners)))))))

;; ============================================================================
;; Test 4: Content generation success flow
;; ============================================================================

(deftest handle-content-generate-success
  (testing "Content generation streams tokens and sends accumulated result"
    (let [client-id "test-client-4"
          prompt-fn (fn [_ _] {:status :success :response {:id 1}})
          chat-id (simulate-content-generate-handler! client-id "insights"
                    {:alive? true :prompt-fn prompt-fn})]

      (is (some? chat-id))

      ;; Simulate streaming tokens
      (simulate-eca-notification! "chat/contentReceived"
        (make-text-notification chat-id "First "))
      (simulate-eca-notification! "chat/contentReceived"
        (make-text-notification chat-id "insight"))

      ;; Verify tokens sent
      (let [tokens (messages-of-type client-id :content/token)]
        (is (= 2 (count tokens)))
        (is (= "First " (:token (first tokens))))
        (is (= "insight" (:token (second tokens)))))

      ;; Simulate done
      (simulate-eca-notification! "chat/contentReceived"
        (make-done-notification chat-id))

      ;; Verify final accumulated content message
      (let [generated (messages-of-type client-id :content/generated)]
        (is (= 1 (count generated)))
        (is (= "First insight" (:content (first generated))))
        (is (= :insights (:content-type (first generated)))))

      ;; Callback cleaned up
      (let [listeners (get-in @eca/state [:callbacks "chat/contentReceived"])]
        (is (or (nil? listeners) (empty? listeners)))))))

;; ============================================================================
;; Test 5: Content generation - ECA not available
;; ============================================================================

(deftest handle-content-generate-eca-not-available
  (testing "When ECA is not available, sends content/error to client"
    (let [client-id "test-client-5"
          chat-id (simulate-content-generate-handler! client-id "insights"
                    {:alive? false :prompt-fn (fn [_ _] {:status :success})})]

      (let [errors (messages-of-type client-id :content/error)]
        (is (= 1 (count errors)))
        (is (= "ECA not available" (:error (first errors))))
        (is (= :insights (:content-type (first errors)))))
      (is (nil? chat-id)))))

;; ============================================================================
;; Test 6: Auto-insight success with learning persistence
;; ============================================================================

(deftest handle-auto-insight-success
  (testing "Auto-insight streams tokens, saves to learning, and sends done"
    (let [client-id "test-client-6"
          insight-saved (atom nil)
          prompt-fn (fn [_ _] {:status :success :response {:id 1}})
          save-fn (fn [data] (reset! insight-saved data))
          chat-id (simulate-auto-insight-handler! client-id :empathy-map
                    {:alive? true :prompt-fn prompt-fn :save-insight-fn save-fn})]

      (is (some? chat-id))

      ;; Verify start message sent
      (let [starts (messages-of-type client-id :eca/auto-insight-start)]
        (is (= 1 (count starts)))
        (is (= :empathy-map (:builder-type (first starts)))))

      ;; Simulate streaming
      (simulate-eca-notification! "chat/contentReceived"
        (make-text-notification chat-id "Great work on "))
      (simulate-eca-notification! "chat/contentReceived"
        (make-text-notification chat-id "empathy map!"))

      ;; Verify tokens sent
      (let [tokens (messages-of-type client-id :eca/auto-insight-token)]
        (is (= 2 (count tokens)))
        (is (= :empathy-map (:builder-type (first tokens)))))

      ;; Simulate done
      (simulate-eca-notification! "chat/contentReceived"
        (make-done-notification chat-id))

      ;; Verify done message
      (let [dones (messages-of-type client-id :eca/auto-insight-done)]
        (is (= 1 (count dones))))

      ;; Verify insight was saved to learning
      (is (some? @insight-saved))
      (is (= "Great work on empathy map!" (first (:insights @insight-saved))))
      (is (str/includes? (:title @insight-saved) "empathy-map"))

      ;; Callback cleaned up
      (let [listeners (get-in @eca/state [:callbacks "chat/contentReceived"])]
        (is (or (nil? listeners) (empty? listeners)))))))

;; ============================================================================
;; Test 7: ECA wisdom success with request-type routing
;; ============================================================================

(deftest handle-eca-wisdom-success
  (testing "Wisdom handler streams tokens with request-type metadata"
    (let [client-id "test-client-7"
          prompt-fn (fn [_ _] {:status :success :response {:id 1}})
          chat-id (simulate-wisdom-handler! client-id "tips"
                    {:alive? true :prompt-fn prompt-fn})]

      (is (some? chat-id))
      (is (str/starts-with? chat-id "ws-wisdom-"))

      ;; Simulate streaming
      (simulate-eca-notification! "chat/contentReceived"
        (make-text-notification chat-id "Tip 1: Focus on..."))

      ;; Verify wisdom token
      (let [tokens (messages-of-type client-id :eca/wisdom-token)]
        (is (= 1 (count tokens)))
        (is (= "Tip 1: Focus on..." (:token (first tokens))))
        (is (= :tips (:request-type (first tokens)))))

      ;; Simulate done
      (simulate-eca-notification! "chat/contentReceived"
        (make-done-notification chat-id))

      ;; Verify wisdom-done
      (let [dones (messages-of-type client-id :eca/wisdom-done)]
        (is (= 1 (count dones)))
        (is (= :tips (:request-type (first dones)))))

      ;; Callback cleaned up
      (let [listeners (get-in @eca/state [:callbacks "chat/contentReceived"])]
        (is (or (nil? listeners) (empty? listeners)))))))

;; ============================================================================
;; Test 8: chat-prompt retry on timeout
;; ============================================================================

(deftest chat-prompt-retry-on-timeout
  (testing "chat-prompt retries after timeout by restarting ECA"
    ;; Since Babashka/SCI may not support with-redefs on private defn-,
    ;; we test the retry logic by testing the public API behavior:
    ;; When chat-prompt-once returns timeout, chat-prompt should call restart!
    ;; then retry. We verify this by checking restart was called and the
    ;; final result reflects the retry outcome.
    (let [restart-called? (atom false)
          send-count (atom 0)]

      ;; We redef the public fns that chat-prompt calls
      (with-redefs [ouroboros.eca-client/restart!
                    (fn []
                      (reset! restart-called? true)
                      (swap! eca/state assoc :running true))
                    ouroboros.eca-client/alive? (constantly true)
                    ;; Mock send-request! to simulate timeout on first call, success on second
                    ouroboros.eca-client/send-request!
                    (fn [method params]
                      (let [n (swap! send-count inc)
                            p (promise)]
                        (if (= 1 n)
                          ;; First call: never deliver (causes timeout)
                          p
                          ;; Second call: deliver immediately
                          (do (deliver p {:id 2 :result "ok"}) p))))
                    telemetry/emit! (fn [e] (swap! telemetry-events conj e))]

        ;; Use short timeout so test doesn't wait long
        (let [result (eca/chat-prompt "test message" {:timeout-ms 100})]
          ;; After timeout on first attempt, chat-prompt should have:
          ;; 1. Called restart!
          ;; 2. Retried with send-request! again
          ;; 3. Got success on retry
          (is @restart-called? "Should have called restart! after timeout")
          (is (= 2 @send-count) "Should have called send-request! twice (initial + retry)")
          (is (= :success (:status result)) "Retry should succeed"))))))

;; ============================================================================
;; Test 9: ensure-alive! restarts dead process
;; ============================================================================

(deftest ensure-alive-restarts-dead-process
  (testing "ensure-alive! attempts restart when ECA is dead"
    (let [restart-called? (atom false)
          is-alive? (atom false)]

      ;; Start with dead state
      (reset! eca/state {:running false :eca-process nil :callbacks {}
                         :pending-requests {} :request-id 0 :chat-contents []})

      (with-redefs [ouroboros.eca-client/alive?
                    (fn [] @is-alive?)
                    ouroboros.eca-client/restart!
                    (fn []
                      (reset! restart-called? true)
                      ;; Simulate successful restart
                      (reset! is-alive? true))
                    telemetry/emit! (fn [e] (swap! telemetry-events conj e))]

        (let [result (eca/ensure-alive!)]
          (is @restart-called? "Should have attempted restart")
          (is (true? result) "Should return true after successful restart"))))))

;; ============================================================================
;; Test 10: Concurrent chat sessions with different chat-ids
;; ============================================================================

(deftest concurrent-chat-sessions
  (testing "Multiple simultaneous chat sessions route to correct clients"
    (let [client-1 "client-concurrent-1"
          client-2 "client-concurrent-2"
          prompt-fn (fn [_ _] {:status :success :response {:id 1}})
          chat-id-1 (simulate-eca-chat-handler! client-1 "Question 1"
                      {:alive? true :prompt-fn prompt-fn})]

      ;; Small delay to ensure unique timestamps
      (Thread/sleep 5)

      (let [chat-id-2 (simulate-eca-chat-handler! client-2 "Question 2"
                         {:alive? true :prompt-fn prompt-fn})]

        (is (some? chat-id-1))
        (is (some? chat-id-2))
        (is (not= chat-id-1 chat-id-2) "Each session should have unique chat-id")

        ;; Should have 2 callbacks registered
        (let [listeners (get-in @eca/state [:callbacks "chat/contentReceived"])]
          (is (= 2 (count listeners))))

        ;; Send token for client-1's chat-id
        (simulate-eca-notification! "chat/contentReceived"
          (make-text-notification chat-id-1 "Answer for Q1"))

        ;; Only client-1 should have received a token
        (is (= 1 (count (messages-of-type client-1 :eca/chat-token))))
        (is (= 0 (count (messages-of-type client-2 :eca/chat-token))))

        ;; Send token for client-2's chat-id
        (simulate-eca-notification! "chat/contentReceived"
          (make-text-notification chat-id-2 "Answer for Q2"))

        ;; Now client-2 should have a token too
        (is (= 1 (count (messages-of-type client-2 :eca/chat-token))))
        (is (= "Answer for Q2" (:token (first (messages-of-type client-2 :eca/chat-token)))))

        ;; Complete client-1
        (simulate-eca-notification! "chat/contentReceived"
          (make-done-notification chat-id-1))

        ;; Client-1 callback should be cleaned up but client-2 still active
        (let [listeners (get-in @eca/state [:callbacks "chat/contentReceived"])]
          (is (= 1 (count listeners)) "Only client-2's callback should remain"))

        ;; Complete client-2
        (simulate-eca-notification! "chat/contentReceived"
          (make-done-notification chat-id-2))

        ;; All callbacks cleaned up
        (let [listeners (get-in @eca/state [:callbacks "chat/contentReceived"])]
          (is (or (nil? listeners) (empty? listeners))))))))

;; ============================================================================
;; Test 11: Callback cleanup on exception
;; ============================================================================

(deftest callback-cleanup-on-exception
  (testing "Callbacks are unregistered when chat-prompt throws an exception"
    (let [client-id "test-client-error"
          prompt-fn (fn [_ _] (throw (Exception. "Connection refused")))
          chat-id (simulate-eca-chat-handler! client-id "Hello"
                    {:alive? true :prompt-fn prompt-fn})]

      ;; Error message should be sent
      (let [errors (messages-of-type client-id :eca/chat-error)]
        (is (= 1 (count errors)))
        (is (str/includes? (:error (first errors)) "Connection refused")))

      ;; Callback must be cleaned up
      (let [listeners (get-in @eca/state [:callbacks "chat/contentReceived"])]
        (is (or (nil? listeners) (empty? listeners))
            "Callback should be unregistered after exception")))))

;; ============================================================================
;; Test 12: Notification chat-id filtering
;; ============================================================================

(deftest notification-chat-id-filtering
  (testing "Callbacks only process notifications matching their chat-id"
    (let [client-id "test-client-filter"
          prompt-fn (fn [_ _] {:status :success :response {:id 1}})
          chat-id (simulate-eca-chat-handler! client-id "Hello"
                    {:alive? true :prompt-fn prompt-fn})]

      (is (some? chat-id))

      ;; Send notification with WRONG chat-id -- should be ignored
      (simulate-eca-notification! "chat/contentReceived"
        (make-text-notification "wrong-chat-id-999" "Should not appear"))

      ;; No tokens should have been sent
      (is (= 0 (count (messages-of-type client-id :eca/chat-token)))
          "Notification with wrong chat-id should be ignored")

      ;; Send notification with CORRECT chat-id
      (simulate-eca-notification! "chat/contentReceived"
        (make-text-notification chat-id "Correct response"))

      ;; This one should arrive
      (is (= 1 (count (messages-of-type client-id :eca/chat-token)))
          "Notification with correct chat-id should be processed")
      (is (= "Correct response" (:token (first (messages-of-type client-id :eca/chat-token)))))

      ;; Send done with WRONG chat-id -- callback should NOT be unregistered
      (simulate-eca-notification! "chat/contentReceived"
        (make-done-notification "wrong-chat-id-999"))

      (let [listeners (get-in @eca/state [:callbacks "chat/contentReceived"])]
        (is (= 1 (count listeners)) "Callback should still be registered (wrong chat-id done)"))

      ;; Send done with CORRECT chat-id
      (simulate-eca-notification! "chat/contentReceived"
        (make-done-notification chat-id))

      ;; Now cleaned up
      (let [listeners (get-in @eca/state [:callbacks "chat/contentReceived"])]
        (is (or (nil? listeners) (empty? listeners))
            "Callback should be unregistered after correct chat-id done")))))
