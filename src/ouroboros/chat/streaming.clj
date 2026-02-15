(ns ouroboros.chat.streaming
  "Chat Streaming Bridge

   Handles real-time message streaming from ECA to chat platforms.
   Manages debounced edit updates and accumulates streaming content.

   This namespace is an implementation detail - prefer using
   the public API in ouroboros.chat"
  (:require
   [clojure.string :as str]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.eca-client :as eca]))

;; Re-export protocol functions for convenience
(def send-message! chatp/send-message!)
(def edit-message! chatp/edit-message!)
(def supports-edit? chatp/supports-edit?)

;; ============================================================================
;; Streaming State
;; ============================================================================

(defonce streaming-state
  (atom {}))
;; Shape: {chat-id {:message-id    <platform msg id>
;;                   :adapter       <ChatAdapter>
;;                   :text          <accumulated text>
;;                   :reasoning     <accumulated reasoning>
;;                   :phase         :thinking | :responding | :done
;;                   :last-edit-ms  <epoch ms of last edit>
;;                   :edit-pending? <boolean - debounce scheduled?>}}

(def ^:private edit-debounce-ms
  "Minimum ms between edit-message! calls to respect platform rate limits.
   Telegram: 30 msg/sec, Discord: 5/sec, Slack: ~1/sec for updates."
  500)

(def ^:private max-message-length
  "Maximum text length for a single chat message.
   Telegram: 4096, Discord: 2000, Slack: 40000. Use lowest common."
  2000)

;; ============================================================================
;; Display Helpers
;; ============================================================================

(defn truncate-for-chat
  "Truncate text to fit platform limits, adding ellipsis if needed"
  [text]
  (if (> (count text) max-message-length)
    (str (subs text 0 (- max-message-length 20)) "\n\n... (truncated)")
    text))

(defn build-display-text
  "Build the display text from streaming state"
  [{:keys [phase text reasoning]}]
  (cond
    ;; Still thinking, no text yet
    (and (= phase :thinking) (str/blank? text))
    (if (str/blank? reasoning)
      "... thinking"
      (str "... thinking\n\n> " (truncate-for-chat reasoning)))

    ;; Responding with text
    (not (str/blank? text))
    (truncate-for-chat text)

    ;; Fallback
    :else "... processing"))

;; ============================================================================
;; Edit Management
;; ============================================================================

(defn flush-edit!
  "Send an edit-message! for the current streaming state of a chat-id.
   Only edits if the adapter supports it and enough time has passed."
  [eca-chat-id]
  (when-let [{:keys [adapter message-id chat-id] :as sstate} (get @streaming-state eca-chat-id)]
    (when (and adapter message-id (supports-edit? adapter))
      (let [display-text (build-display-text sstate)]
        (try
          (edit-message! adapter chat-id message-id display-text)
          (swap! streaming-state update eca-chat-id assoc
                 :last-edit-ms (System/currentTimeMillis)
                 :edit-pending? false)
          (telemetry/emit! {:event :chat/stream-edit
                            :chat-id chat-id
                            :text-length (count display-text)})
          (catch Exception e
            (telemetry/emit! {:event :chat/stream-edit-error
                              :chat-id chat-id
                              :error (.getMessage e)})))))))

(defn- schedule-debounced-edit!
  "Schedule an edit after debounce period if one isn't already pending"
  [chat-id]
  (when-let [sstate (get @streaming-state chat-id)]
    (when-not (:edit-pending? sstate)
      (swap! streaming-state assoc-in [chat-id :edit-pending?] true)
      (future
        (Thread/sleep edit-debounce-ms)
        ;; Only edit if still streaming (not already done)
        (when-let [current (get @streaming-state chat-id)]
          (when (not= :done (:phase current))
            (flush-edit! chat-id)))))))

;; ============================================================================
;; Content Handling
;; ============================================================================

(defn handle-stream-content!
  "Handle a chat/contentReceived notification for streaming.
   Routes content to the correct chat-id's streaming state."
  [notification]
  (let [params (:params notification)
        role (:role params)
        content (:content params)
        chat-id (:chatId params)]
    (when-let [_sstate (get @streaming-state chat-id)]
      (cond
        ;; Progress notification (reasoning/responding/done)
        (= "progress" (:type content))
        (let [new-phase (case (:state content)
                          "reasoning" :thinking
                          "responding" :responding
                          ("done" "finished") :done
                          nil)]
          (when new-phase
            (swap! streaming-state assoc-in [chat-id :phase] new-phase)
            (when (= new-phase :done)
              ;; Final edit with complete text
              (flush-edit! chat-id))))

        ;; Assistant text content
        (and (= role "assistant") (= "text" (:type content)))
        (do
          (swap! streaming-state update-in [chat-id :text] str (:text content))
          (swap! streaming-state assoc-in [chat-id :phase] :responding)
          (schedule-debounced-edit! chat-id))

        ;; Reasoning content
        (and (= role "assistant") (= "reasoning" (:type content)))
        (do
          (swap! streaming-state update-in [chat-id :reasoning] str (:reasoning content))
          (schedule-debounced-edit! chat-id))))))

;; ============================================================================
;; Streaming Lifecycle
;; ============================================================================

(defn start-streaming!
  "Initialize streaming state for a chat-id and send placeholder message.
   Returns the message-id of the placeholder."
  [adapter chat-id eca-chat-id]
  (let [message-id (send-message! adapter chat-id "... thinking")]
    (swap! streaming-state assoc eca-chat-id
           {:message-id message-id
            :adapter adapter
            :chat-id chat-id
            :text ""
            :reasoning ""
            :phase :thinking
            :last-edit-ms (System/currentTimeMillis)
            :edit-pending? false})
    message-id))

(defn stop-streaming!
  "Clean up streaming state for a chat-id. Returns the final text."
  [eca-chat-id]
  (let [sstate (get @streaming-state eca-chat-id)
        final-text (:text sstate)]
    (swap! streaming-state dissoc eca-chat-id)
    final-text))

(defn setup-streaming-callback!
  "Register the global streaming callback with ECA client.
   Only needs to be called once."
  []
  (eca/register-callback! "chat/contentReceived" :streaming-bridge
                          handle-stream-content!)
  (telemetry/emit! {:event :chat/streaming-callback-registered}))

;; ============================================================================
;; State Accessors
;; ============================================================================

(defn get-streaming-state
  "Get the streaming state for a chat-id (for testing/debugging)"
  [chat-id]
  (get @streaming-state chat-id))

(defn streaming-active?
  "Check if streaming is active for a chat-id"
  [chat-id]
  (some? (get @streaming-state chat-id)))

(defn get-phase
  "Get the current phase for a chat-id's streaming"
  [chat-id]
  (get-in @streaming-state [chat-id :phase]))