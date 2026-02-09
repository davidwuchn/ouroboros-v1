(ns ouroboros.streaming-test
  "Streaming Bridge Tests - Verify streaming pipeline from ECA to chat platforms

   Tests cover:
   - Pure functions: build-display-text, truncate-for-chat
   - Stateful streaming: handle-stream-content!, start-streaming!, stop-streaming!
   - Edit dispatching: flush-edit!
   - EditableAdapter protocol compliance and supports-edit?"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [clojure.string :as str]
   [ouroboros.chat :as chat]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.chat.adapters :as adapters]))

;; ============================================================================
;; Helpers to access private streaming-state atom
;; ============================================================================

;; In Babashka, #'ns/var returns a sci.lang.Var. To get the atom,
;; we must deref the var with @. To mutate, we deref first to get the atom.
(def ^:private ss-var #'chat/streaming-state)
(defn- ss-atom [] @ss-var)
(defn- ss-reset! [] (reset! (ss-atom) {}))
(defn- ss-get
  ([] @(ss-atom))
  ([k] (get @(ss-atom) k)))
(defn- ss-swap! [f & args]
  (apply swap! (ss-atom) f args))

;; ============================================================================
;; Test Fixtures
;; ============================================================================

(use-fixtures :each
  (fn [test-fn]
    ;; Clear all state before each test
    (reset! chat/active-adapters {})
    (reset! chat/chat-sessions {})
    (ss-reset!)
    (test-fn)
    ;; Clean up after
    (reset! chat/active-adapters {})
    (reset! chat/chat-sessions {})
    (ss-reset!)))

;; ============================================================================
;; Editable Mock Adapter
;; ============================================================================

(defrecord EditableMockAdapter [messages-atom edits-atom running-atom msg-id-counter]
  chatp/ChatAdapter
  (start! [this handler]
    (reset! running-atom true)
    this)
  (stop! [this]
    (reset! running-atom false)
    this)
  (send-message! [this chat-id text]
    (let [id (swap! msg-id-counter inc)]
      (swap! messages-atom conj {:chat chat-id :text text :id id})
      id))
  (send-markdown! [this chat-id text]
    (let [id (swap! msg-id-counter inc)]
      (swap! messages-atom conj {:chat chat-id :text text :markdown true :id id})
      id))

  chatp/EditableAdapter
  (edit-message! [this chat-id message-id text]
    (swap! edits-atom conj {:chat chat-id :message-id message-id :text text})))

(defn make-editable-mock []
  (->EditableMockAdapter (atom []) (atom []) (atom false) (atom 0)))

;; Non-editable mock (same as in chat_adapter_test)
(defrecord PlainMockAdapter [messages-atom running-atom]
  chatp/ChatAdapter
  (start! [this handler]
    (reset! running-atom true)
    this)
  (stop! [this]
    (reset! running-atom false)
    this)
  (send-message! [this chat-id text]
    (swap! messages-atom conj {:chat chat-id :text text})
    nil)
  (send-markdown! [this chat-id text]
    (swap! messages-atom conj {:chat chat-id :text text :markdown true})
    nil))

(defn make-plain-mock []
  (->PlainMockAdapter (atom []) (atom false)))

;; ============================================================================
;; Pure Function Tests: truncate-for-chat
;; ============================================================================

(deftest truncate-for-chat-test
  (testing "Short text passes through unchanged"
    (println "\n[TEST] truncate-for-chat - short text")
    (is (= "Hello" (#'chat/truncate-for-chat "Hello")))
    (is (= "" (#'chat/truncate-for-chat "")))
    (is (= "a" (#'chat/truncate-for-chat "a")))
    (println "  ok"))

  (testing "Text at exactly max length passes through"
    (println "\n[TEST] truncate-for-chat - exact max length")
    (let [text (apply str (repeat 2000 "x"))]
      (is (= 2000 (count text)))
      (is (= text (#'chat/truncate-for-chat text))))
    (println "  ok"))

  (testing "Text over max length gets truncated"
    (println "\n[TEST] truncate-for-chat - over max length")
    (let [text (apply str (repeat 2500 "x"))
          result (#'chat/truncate-for-chat text)]
      (is (< (count result) 2500))
      (is (str/ends-with? result "... (truncated)"))
      (is (<= (count result) 2000)))
    (println "  ok"))

  (testing "Truncation preserves prefix content"
    (println "\n[TEST] truncate-for-chat - preserves prefix")
    (let [prefix "HELLO-"
          padding (apply str (repeat 3000 "z"))
          text (str prefix padding)
          result (#'chat/truncate-for-chat text)]
      (is (str/starts-with? result "HELLO-")))
    (println "  ok")))

;; ============================================================================
;; Pure Function Tests: build-display-text
;; ============================================================================

(deftest build-display-text-test
  (testing "Thinking phase with blank text and blank reasoning"
    (println "\n[TEST] build-display-text - thinking, no content")
    (is (= "... thinking"
           (#'chat/build-display-text {:phase :thinking :text "" :reasoning ""})))
    (is (= "... thinking"
           (#'chat/build-display-text {:phase :thinking :text nil :reasoning nil})))
    (is (= "... thinking"
           (#'chat/build-display-text {:phase :thinking :text "" :reasoning "  "})))
    (println "  ok"))

  (testing "Thinking phase with reasoning"
    (println "\n[TEST] build-display-text - thinking with reasoning")
    (let [result (#'chat/build-display-text {:phase :thinking :text "" :reasoning "Let me think about this"})]
      (is (str/starts-with? result "... thinking"))
      (is (str/includes? result "Let me think about this"))
      (is (str/includes? result "> ")))
    (println "  ok"))

  (testing "Responding phase with text"
    (println "\n[TEST] build-display-text - responding with text")
    (is (= "Here is my response"
           (#'chat/build-display-text {:phase :responding :text "Here is my response" :reasoning ""})))
    (println "  ok"))

  (testing "Responding phase with long text gets truncated"
    (println "\n[TEST] build-display-text - responding with long text")
    (let [long-text (apply str (repeat 3000 "x"))
          result (#'chat/build-display-text {:phase :responding :text long-text :reasoning ""})]
      (is (str/ends-with? result "... (truncated)"))
      (is (<= (count result) 2000)))
    (println "  ok"))

  (testing "Fallback when no phase or text"
    (println "\n[TEST] build-display-text - fallback")
    (is (= "... processing"
           (#'chat/build-display-text {:phase :done :text "" :reasoning ""})))
    (is (= "... processing"
           (#'chat/build-display-text {:phase nil :text "" :reasoning ""})))
    (println "  ok"))

  (testing "Text present overrides phase"
    (println "\n[TEST] build-display-text - text overrides thinking phase")
    ;; Even in :thinking phase, if text is present it should show text
    (is (= "Some text"
           (#'chat/build-display-text {:phase :thinking :text "Some text" :reasoning ""})))
    (println "  ok")))

;; ============================================================================
;; EditableAdapter Protocol Tests
;; ============================================================================

(deftest supports-edit-test
  (testing "Editable adapter supports edit"
    (println "\n[TEST] supports-edit? - editable adapter")
    (let [adapter (make-editable-mock)]
      (is (true? (chatp/supports-edit? adapter))))
    (println "  ok"))

  (testing "Plain adapter does not support edit"
    (println "\n[TEST] supports-edit? - plain adapter")
    (let [adapter (make-plain-mock)]
      (is (false? (chatp/supports-edit? adapter))))
    (println "  ok"))

  (testing "All platform adapters implement EditableAdapter"
    (println "\n[TEST] supports-edit? - platform adapters")
    (let [adapter-list [(adapters/telegram-bot "fake-token")
                        (adapters/discord-bot "fake-token")
                        (adapters/slack-bot "xapp-fake" "xoxb-fake")]]
      (doseq [adapter adapter-list]
        (is (satisfies? chatp/EditableAdapter adapter)
            (str (type adapter) " should satisfy EditableAdapter"))
        (is (true? (chatp/supports-edit? adapter))
            (str (type adapter) " should support edit"))))
    (println "  ok")))

;; ============================================================================
;; Streaming Lifecycle Tests
;; ============================================================================

(deftest start-streaming-test
  (testing "start-streaming! creates state entry and sends placeholder"
    (println "\n[TEST] start-streaming! - initialization")
    (let [adapter (make-editable-mock)
          chat-id "test-chat-1"
          eca-chat-id "eca-chat-1"]
      ;; Start streaming
      (let [msg-id (#'chat/start-streaming! adapter chat-id eca-chat-id)]
        ;; Should return a message-id
        (is (some? msg-id))
        (is (number? msg-id))

        ;; Should have sent "... thinking" placeholder
        (is (= 1 (count @(:messages-atom adapter))))
        (is (= "... thinking" (:text (first @(:messages-atom adapter)))))
        (is (= chat-id (:chat (first @(:messages-atom adapter)))))

        ;; Should have created streaming state
        (let [sstate (ss-get eca-chat-id)]
          (is (some? sstate))
          (is (= msg-id (:message-id sstate)))
          (is (= adapter (:adapter sstate)))
          (is (= chat-id (:chat-id sstate)))
          (is (= "" (:text sstate)))
          (is (= "" (:reasoning sstate)))
          (is (= :thinking (:phase sstate)))
          (is (false? (:edit-pending? sstate))))))
    (println "  ok")))

(deftest stop-streaming-test
  (testing "stop-streaming! cleans up state and returns final text"
    (println "\n[TEST] stop-streaming! - cleanup")
    (let [adapter (make-editable-mock)
          eca-chat-id "eca-chat-1"]
      ;; Manually set up streaming state
      (ss-swap! assoc eca-chat-id
                {:message-id 1
                 :adapter adapter
                 :chat-id "test-chat-1"
                 :text "Final response text"
                 :reasoning "Some reasoning"
                 :phase :done
                 :last-edit-ms 0
                 :edit-pending? false})

      ;; Stop streaming
      (let [final-text (#'chat/stop-streaming! eca-chat-id)]
        (is (= "Final response text" final-text))
        ;; State should be cleaned up
        (is (nil? (ss-get eca-chat-id)))))
    (println "  ok"))

  (testing "stop-streaming! returns nil for unknown chat-id"
    (println "\n[TEST] stop-streaming! - unknown chat-id")
    (let [result (#'chat/stop-streaming! "nonexistent")]
      (is (nil? result)))
    (println "  ok")))

;; ============================================================================
;; flush-edit! Tests
;; ============================================================================

(deftest flush-edit-test
  (testing "flush-edit! calls edit-message! on editable adapter"
    (println "\n[TEST] flush-edit! - editable adapter")
    (let [adapter (make-editable-mock)
          eca-chat-id "eca-flush-1"
          chat-id "test-chat-1"]
      ;; Set up streaming state
      (ss-swap! assoc eca-chat-id
                {:message-id 42
                 :adapter adapter
                 :chat-id chat-id
                 :text "Updated text"
                 :reasoning ""
                 :phase :responding
                 :last-edit-ms 0
                 :edit-pending? true})

      ;; Flush
      (#'chat/flush-edit! eca-chat-id)

      ;; Should have called edit-message!
      (is (= 1 (count @(:edits-atom adapter))))
      (let [edit (first @(:edits-atom adapter))]
        (is (= chat-id (:chat edit)))
        (is (= 42 (:message-id edit)))
        (is (= "Updated text" (:text edit))))

      ;; edit-pending? should be cleared
      (is (false? (:edit-pending? (ss-get eca-chat-id)))))
    (println "  ok"))

  (testing "flush-edit! does nothing for missing state"
    (println "\n[TEST] flush-edit! - missing state")
    ;; Should not throw
    (#'chat/flush-edit! "nonexistent-chat")
    (println "  ok"))

  (testing "flush-edit! does nothing for adapter without edit support"
    (println "\n[TEST] flush-edit! - non-editable adapter")
    (let [adapter (make-plain-mock)
          eca-chat-id "eca-flush-2"]
      (ss-swap! assoc eca-chat-id
                {:message-id nil
                 :adapter adapter
                 :chat-id "test-chat"
                 :text "Some text"
                 :reasoning ""
                 :phase :responding
                 :last-edit-ms 0
                 :edit-pending? false})

      ;; flush should be a no-op since adapter doesn't support edit
      (#'chat/flush-edit! eca-chat-id)
      ;; No crash = success
      )
    (println "  ok")))

;; ============================================================================
;; handle-stream-content! Tests
;; ============================================================================

(deftest handle-stream-content-progress-test
  (testing "Progress notification updates phase"
    (println "\n[TEST] handle-stream-content! - progress updates phase")
    (let [adapter (make-editable-mock)
          eca-chat-id "eca-stream-1"]
      ;; Set up streaming state
      (ss-swap! assoc eca-chat-id
                {:message-id 1
                 :adapter adapter
                 :chat-id "test-chat"
                 :text ""
                 :reasoning ""
                 :phase :thinking
                 :last-edit-ms 0
                 :edit-pending? false})

      ;; Send reasoning progress
      (#'chat/handle-stream-content!
       {:params {:chatId eca-chat-id
                 :role "assistant"
                 :content {:type "progress" :state "reasoning"}}})
      (is (= :thinking (:phase (ss-get eca-chat-id))))

      ;; Send responding progress
      (#'chat/handle-stream-content!
       {:params {:chatId eca-chat-id
                 :role "assistant"
                 :content {:type "progress" :state "responding"}}})
      (is (= :responding (:phase (ss-get eca-chat-id))))

      ;; Send done progress
      (#'chat/handle-stream-content!
       {:params {:chatId eca-chat-id
                 :role "assistant"
                 :content {:type "progress" :state "done"}}})
      (is (= :done (:phase (ss-get eca-chat-id)))))
    (println "  ok")))

(deftest handle-stream-content-text-test
  (testing "Text content accumulates in state"
    (println "\n[TEST] handle-stream-content! - text accumulation")
    (let [adapter (make-editable-mock)
          eca-chat-id "eca-stream-2"]
      ;; Set up streaming state
      (ss-swap! assoc eca-chat-id
                {:message-id 1
                 :adapter adapter
                 :chat-id "test-chat"
                 :text ""
                 :reasoning ""
                 :phase :thinking
                 :last-edit-ms 0
                 :edit-pending? false})

      ;; Send text chunks
      (#'chat/handle-stream-content!
       {:params {:chatId eca-chat-id
                 :role "assistant"
                 :content {:type "text" :text "Hello "}}})
      (is (= "Hello " (:text (ss-get eca-chat-id))))
      (is (= :responding (:phase (ss-get eca-chat-id))))

      (#'chat/handle-stream-content!
       {:params {:chatId eca-chat-id
                 :role "assistant"
                 :content {:type "text" :text "world!"}}})
      (is (= "Hello world!" (:text (ss-get eca-chat-id)))))
    (println "  ok")))

(deftest handle-stream-content-reasoning-test
  (testing "Reasoning content accumulates in state"
    (println "\n[TEST] handle-stream-content! - reasoning accumulation")
    (let [adapter (make-editable-mock)
          eca-chat-id "eca-stream-3"]
      ;; Set up streaming state
      (ss-swap! assoc eca-chat-id
                {:message-id 1
                 :adapter adapter
                 :chat-id "test-chat"
                 :text ""
                 :reasoning ""
                 :phase :thinking
                 :last-edit-ms 0
                 :edit-pending? false})

      ;; Send reasoning chunks
      (#'chat/handle-stream-content!
       {:params {:chatId eca-chat-id
                 :role "assistant"
                 :content {:type "reasoning" :reasoning "Let me "}}})
      (is (= "Let me " (:reasoning (ss-get eca-chat-id))))

      (#'chat/handle-stream-content!
       {:params {:chatId eca-chat-id
                 :role "assistant"
                 :content {:type "reasoning" :reasoning "think about this."}}})
      (is (= "Let me think about this." (:reasoning (ss-get eca-chat-id)))))
    (println "  ok")))

(deftest handle-stream-content-unknown-chat-test
  (testing "Ignores notifications for unknown chat-ids"
    (println "\n[TEST] handle-stream-content! - unknown chat-id")
    ;; Should not throw
    (#'chat/handle-stream-content!
     {:params {:chatId "nonexistent"
               :role "assistant"
               :content {:type "text" :text "ignored"}}})
    ;; No state created for unknown chat-ids
    (is (empty? (ss-get)))
    (println "  ok")))

(deftest handle-stream-content-done-triggers-flush-test
  (testing "Done progress triggers flush-edit!"
    (println "\n[TEST] handle-stream-content! - done triggers flush")
    (let [adapter (make-editable-mock)
          eca-chat-id "eca-stream-done"]
      ;; Set up streaming state with accumulated text
      (ss-swap! assoc eca-chat-id
                {:message-id 1
                 :adapter adapter
                 :chat-id "test-chat"
                 :text "Final answer"
                 :reasoning ""
                 :phase :responding
                 :last-edit-ms 0
                 :edit-pending? false})

      ;; Send done
      (#'chat/handle-stream-content!
       {:params {:chatId eca-chat-id
                 :role "assistant"
                 :content {:type "progress" :state "done"}}})

      ;; Should have triggered an edit with the final text
      (is (= 1 (count @(:edits-atom adapter))))
      (is (= "Final answer" (:text (first @(:edits-atom adapter))))))
    (println "  ok")))

;; ============================================================================
;; Full Streaming Lifecycle Integration
;; ============================================================================

(deftest streaming-lifecycle-test
  (testing "Full streaming lifecycle: start -> content -> done -> stop"
    (println "\n[TEST] Streaming lifecycle - full flow")
    (let [adapter (make-editable-mock)
          chat-id "test-chat-lifecycle"
          eca-chat-id "eca-lifecycle"]

      ;; 1. Start streaming
      (let [msg-id (#'chat/start-streaming! adapter chat-id eca-chat-id)]
        (is (some? msg-id))
        (is (= :thinking (:phase (ss-get eca-chat-id))))

        ;; 2. Receive reasoning content
        (#'chat/handle-stream-content!
         {:params {:chatId eca-chat-id
                   :role "assistant"
                   :content {:type "reasoning" :reasoning "Analyzing the question..."}}})
        (is (= "Analyzing the question..."
               (:reasoning (ss-get eca-chat-id))))

        ;; 3. Receive responding progress
        (#'chat/handle-stream-content!
         {:params {:chatId eca-chat-id
                   :role "assistant"
                   :content {:type "progress" :state "responding"}}})
        (is (= :responding (:phase (ss-get eca-chat-id))))

        ;; 4. Receive text content
        (#'chat/handle-stream-content!
         {:params {:chatId eca-chat-id
                   :role "assistant"
                   :content {:type "text" :text "The answer is "}}})
        (#'chat/handle-stream-content!
         {:params {:chatId eca-chat-id
                   :role "assistant"
                   :content {:type "text" :text "42."}}})
        (is (= "The answer is 42."
               (:text (ss-get eca-chat-id))))

        ;; 5. Receive done progress
        (#'chat/handle-stream-content!
         {:params {:chatId eca-chat-id
                   :role "assistant"
                   :content {:type "progress" :state "done"}}})
        (is (= :done (:phase (ss-get eca-chat-id))))

        ;; Should have triggered final edit
        (let [final-edit (last @(:edits-atom adapter))]
          (is (some? final-edit))
          (is (= "The answer is 42." (:text final-edit))))

        ;; 6. Stop streaming
        (let [final-text (#'chat/stop-streaming! eca-chat-id)]
          (is (= "The answer is 42." final-text))
          (is (nil? (ss-get eca-chat-id))))))
    (println "  ok")))

(deftest streaming-multiple-sessions-test
  (testing "Multiple concurrent streaming sessions are independent"
    (println "\n[TEST] Streaming - multiple sessions")
    (let [adapter1 (make-editable-mock)
          adapter2 (make-editable-mock)]

      ;; Start two streaming sessions
      (#'chat/start-streaming! adapter1 "chat-1" "eca-1")
      (#'chat/start-streaming! adapter2 "chat-2" "eca-2")

      ;; Both should exist
      (is (= 2 (count (ss-get))))

      ;; Send text to session 1
      (#'chat/handle-stream-content!
       {:params {:chatId "eca-1"
                 :role "assistant"
                 :content {:type "text" :text "Response for chat 1"}}})

      ;; Send text to session 2
      (#'chat/handle-stream-content!
       {:params {:chatId "eca-2"
                 :role "assistant"
                 :content {:type "text" :text "Response for chat 2"}}})

      ;; Verify independence
      (is (= "Response for chat 1" (:text (ss-get "eca-1"))))
      (is (= "Response for chat 2" (:text (ss-get "eca-2"))))

      ;; Stop session 1
      (let [text1 (#'chat/stop-streaming! "eca-1")]
        (is (= "Response for chat 1" text1))
        (is (nil? (ss-get "eca-1")))
        ;; Session 2 still alive
        (is (some? (ss-get "eca-2"))))

      ;; Stop session 2
      (#'chat/stop-streaming! "eca-2")
      (is (empty? (ss-get))))
    (println "  ok")))

;; ============================================================================
;; send-message! Return Value Tests
;; ============================================================================

(deftest send-message-returns-id-test
  (testing "EditableMockAdapter send-message! returns message-id"
    (println "\n[TEST] send-message! return value")
    (let [adapter (make-editable-mock)]
      (let [id1 (chatp/send-message! adapter "chat-1" "Hello")
            id2 (chatp/send-message! adapter "chat-1" "World")]
        (is (some? id1))
        (is (some? id2))
        (is (not= id1 id2) "Each message should get a unique id")))
    (println "  ok"))

  (testing "PlainMockAdapter send-message! returns nil"
    (println "\n[TEST] send-message! return value - plain adapter")
    (let [adapter (make-plain-mock)]
      (let [id (chatp/send-message! adapter "chat-1" "Hello")]
        (is (nil? id))))
    (println "  ok")))

(comment
  ;; Run tests
  (clojure.test/run-tests 'ouroboros.streaming-test))
