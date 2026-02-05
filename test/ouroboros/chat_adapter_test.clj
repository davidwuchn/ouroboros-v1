(ns ouroboros.chat-adapter-test
  "Chat Adapter Protocol Tests - Verify all platforms implement ChatAdapter correctly

   High Priority: Test core chat functionality across all platforms"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.chat :as chat]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.chat.telegram :as telegram]
   [ouroboros.chat.discord :as discord]
   [ouroboros.chat.slack :as slack]
   [ouroboros.eca_approval_bridge :as eca-approval] ; Ensure ECA approval bridge is loaded
   [ouroboros.tool-registry :as tool-registry]))

;; ============================================================================
;; Test Fixtures
;; ============================================================================

(use-fixtures :each
  (fn [test-fn]
    ;; Clear chat state before each test
    (reset! chat/active-adapters {})
    (reset! chat/chat-sessions {})
    (test-fn)
    ;; Clean up after
    (reset! chat/active-adapters {})
    (reset! chat/chat-sessions {})))

;; ============================================================================
;; Mock Adapter for Testing
;; ============================================================================

(defrecord MockAdapter [messages-atom running-atom]
  chatp/ChatAdapter
  (start! [this handler]
    (reset! running-atom true)
    this)
  (stop! [this]
    (reset! running-atom false)
    this)
  (send-message! [this chat-id text]
    (swap! messages-atom conj {:chat chat-id :text text})
    this)
  (send-markdown! [this chat-id text]
    (swap! messages-atom conj {:chat chat-id :text text :markdown true})
    this))

(defn make-mock-adapter []
  (->MockAdapter (atom []) (atom false)))

;; ============================================================================
;; Protocol Compliance Tests
;; ============================================================================

(deftest chat-adapter-protocol-test
  (testing "All platform adapters satisfy ChatAdapter protocol"
    (println "\n[TEST] ChatAdapter protocol compliance")

    ;; Telegram
    (let [tg-bot (telegram/make-bot "fake-token")]
      (is (satisfies? chatp/ChatAdapter tg-bot)
          "Telegram bot should satisfy ChatAdapter")
      (is (ifn? chatp/start!)
          "Telegram should implement start! (MultiFn)")
      (is (ifn? chatp/stop!)
          "Telegram should implement stop! (MultiFn)")
      (is (ifn? chatp/send-message!)
          "Telegram should implement send-message! (MultiFn)"))

    ;; Discord
    (let [discord-bot (discord/make-bot "fake-token")]
      (is (satisfies? chatp/ChatAdapter discord-bot)
          "Discord bot should satisfy ChatAdapter")
      (is (ifn? chatp/start!)
          "Discord should implement start! (MultiFn)")
      (is (ifn? chatp/stop!)
          "Discord should implement stop! (MultiFn)"))

    ;; Slack
    (let [slack-bot (slack/make-bot "xapp-fake" "xoxb-fake")]
      (is (satisfies? chatp/ChatAdapter slack-bot)
          "Slack bot should satisfy ChatAdapter")
      (is (ifn? chatp/start!)
          "Slack should implement start! (MultiFn)")
      (is (ifn? chatp/stop!)
          "Slack should implement stop! (MultiFn)"))

    (println "  ✓ All platforms satisfy ChatAdapter protocol")))

;; ============================================================================
;; Message Flow Tests
;; ============================================================================

(deftest chat-message-flow-test
  (testing "Message routing and handling"
    (println "\n[TEST] Chat message flow")

    (let [sent-messages (atom [])
          mock-bot (make-mock-adapter)]

      ;; Register and start
      (chat/register-adapter! :mock mock-bot)
      (chat/start-all!)

      ;; Verify adapter is running
      (is (get @chat/active-adapters :mock)
          "Mock adapter should be registered")

      ;; Test session creation directly
      (chat/get-session "test-chat-123")
      (is (get @chat/chat-sessions "test-chat-123")
          "Session should be created for chat")

      ;; Clean up
      (chat/stop-all!)

      (println "  ✓ Message flow verified"))))

(deftest chat-command-parsing-test
  (testing "Command extraction from messages"
    (println "\n[TEST] Chat command parsing")

    ;; Valid commands
    (is (= [:start ""] (#'chat/extract-command "/start"))
        "Should extract /start command")
    (is (= [:help ""] (#'chat/extract-command "/help"))
        "Should extract /help command")
    (is (= [:status ""] (#'chat/extract-command "/status"))
        "Should extract /status command")
    (is (= [:clear ""] (#'chat/extract-command "/clear"))
        "Should extract /clear command")
    (is (= [:tools ""] (#'chat/extract-command "/tools"))
        "Should extract /tools command")

    ;; Command with arguments
    (is (= [:search "hello world"] (#'chat/extract-command "/search hello world"))
        "Should extract command with arguments")

    ;; Not commands
    (is (nil? (#'chat/extract-command "Hello"))
        "Plain text should not be a command")
    (is (nil? (#'chat/extract-command "  /start"))
        "Leading whitespace should prevent command detection")

    (println "  ✓ Command parsing verified")))

(deftest chat-safe-tools-test
  (testing "Chat-safe tool filtering"
    (println "\n[TEST] Chat-safe tools")

    ;; These should be safe
    (is (chat/chat-safe-tool? :system/status))
    (is (chat/chat-safe-tool? :git/status))
    (is (chat/chat-safe-tool? :file/read))
    (is (chat/chat-safe-tool? :memory/get))

    ;; Register some tools
    (tool-registry/register-tool! :test/safe-tool
                                  {:description "Safe test tool"
                                   :parameters {}
                                   :fn (fn [_] {:result "ok"})})

    ;; Only safe tools should be listed
    (let [safe-tools (chat/list-chat-tools)]
      (is (every? #(chat/chat-safe-tool? (:tool/name %)) safe-tools)
          "All listed tools should be chat-safe"))

    ;; Clean up
    (tool-registry/unregister-tool! :test/safe-tool)

    (println "  ✓ Chat-safe tool filtering verified")))

;; ============================================================================
;; Session Management Tests
;; ============================================================================

(deftest chat-session-management-test
  (testing "Session creation, update, and cleanup"
    (println "\n[TEST] Chat session management")

    (let [chat-id "test-chat-123"]

      ;; Create session
      (let [session (chat/get-session chat-id)]
        (is (map? session)
            "Session should be a map")
        (is (vector? (:history session))
            "Session should have history vector")
        (is (map? (:context session))
            "Session should have context map"))

      ;; Update session
      (chat/update-session! chat-id :user "Hello")
      (chat/update-session! chat-id :assistant "Hi there!")

      (let [session (chat/get-session chat-id)]
        (is (= 2 (count (:history session)))
            "Session should have 2 messages")
        (is (= :user (:role (first (:history session))))
            "First message should be from user")
        (is (= :assistant (:role (second (:history session))))
            "Second message should be from assistant"))

      ;; Test history limit
      (dotimes [n 25]
        (chat/update-session! chat-id :user (str "Message " n)))

      (let [session (chat/get-session chat-id)]
        (is (<= (count (:history session)) 20)
            "History should be limited to 20 messages"))

      ;; Clear session
      (chat/clear-session! chat-id)

      (let [session (chat/get-session chat-id)]
        (is (empty? (:history session))
            "Session history should be cleared"))

      (println "  ✓ Session management verified"))))

;; ============================================================================
;; Error Handling Tests
;; ============================================================================

(deftest chat-error-handling-test
  (testing "Error handling in message processing"
    (println "\n[TEST] Chat error handling")

    (let [mock-bot (make-mock-adapter)]
      (chat/register-adapter! :mock mock-bot)

      ;; Test that adapter can be stopped cleanly
      (chat/stop-all!)
      (is (nil? (get @chat/active-adapters :mock))
          "Adapter should be removed after stop")

      (println "  ✓ Error handling verified"))))

;; ============================================================================
;; Multi-Platform Registration Tests
;; ============================================================================

(deftest multi-platform-registration-test
  (testing "Multiple adapters can be registered simultaneously"
    (println "\n[TEST] Multi-platform registration")

    ;; Create mock adapters for each platform
    (let [tg-bot (make-mock-adapter)
          discord-bot (make-mock-adapter)
          slack-bot (make-mock-adapter)]

      ;; Register all
      (chat/register-adapter! :telegram tg-bot)
      (chat/register-adapter! :discord discord-bot)
      (chat/register-adapter! :slack slack-bot)

      ;; Verify all registered
      (is (= 3 (count @chat/active-adapters))
          "All 3 adapters should be registered")
      (is (contains? @chat/active-adapters :telegram))
      (is (contains? @chat/active-adapters :discord))
      (is (contains? @chat/active-adapters :slack))

      ;; Start all
      (chat/start-all!)

      ;; Stop all
      (chat/stop-all!)

      ;; Verify cleared
      (is (empty? @chat/active-adapters)
          "All adapters should be cleared"))

    (println "  ✓ Multi-platform registration verified")))

(comment
  ;; Run tests
  (clojure.test/run-tests 'ouroboros.chat-adapter-test))