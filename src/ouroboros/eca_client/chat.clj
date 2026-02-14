(ns ouroboros.eca-client.chat
  "ECA Client Chat Operations - High-level chat interface

   Provides chat-prompt, query-context, query-files and other
   chat-related operations that build on the core JSON-RPC protocol.

   This namespace is an implementation detail - prefer using
   the public API in ouroboros.eca-client"
  (:require
    [clojure.string :as str]
    [ouroboros.telemetry :as telemetry]
    [ouroboros.eca-client.core :as core]
    [ouroboros.eca-client.lifecycle :as lifecycle]))

;; ============================================================================
;; Chat Prompt
;; ============================================================================

(defn- chat-prompt-once
  "Internal: Send a single chat-prompt attempt. Returns result map.
   Does NOT retry -- that's handled by chat-prompt."
  [message {:keys [wait? timeout-ms chat-id]
            :or {wait? false timeout-ms 120000 chat-id "default"}}]
  (let [params {:chatId chat-id
                :message message}
        response-promise (core/send-request! "chat/prompt" params)
        ;; For wait mode: track content received via callback
        content-promise (when wait? (promise))
        collected-content (when wait? (atom []))]

    (telemetry/emit! {:event :eca/chat-prompt-sent})

     ;; Register callback to collect assistant responses when waiting
     (when wait?
       (core/register-callback! "chat/contentReceived" :chat-prompt-wait
         (fn [notification]
           (let [params (:params notification)
                 role (:role params)
                 content (:content params)]
             (when (and content (= chat-id (:chatId params)))
               (swap! collected-content conj params)
               ;; Resolve when we get a "done" progress or assistant text content
               (when (or (and (= role "assistant")
                              (= "text" (:type content)))
                         (and (= "progress" (:type content))
                              (#{"done" "finished"} (:state content))))
                 (deliver content-promise @collected-content)))))))

     (try
      ;; Wait for the initial RPC acknowledgment (10s - fast fail for better UX)
      (let [ack-response (deref response-promise 10000 nil)]
         (if-not ack-response
           (do
             (when wait? (core/unregister-callback! "chat/contentReceived" :chat-prompt-wait))
             (telemetry/emit! {:event :eca/chat-timeout})
            {:status :error
             :error :timeout
             :message "Chat acknowledgment timeout"})

          (if-not wait?
            ;; Fast mode: return immediately after ack
            (do
              (telemetry/emit! {:event :eca/chat-response
                                :message message
                                :chat-id chat-id})
               {:status :success
                :response ack-response})

            ;; Wait mode: wait for full assistant response
             (let [contents (deref content-promise timeout-ms nil)]
               (core/unregister-callback! "chat/contentReceived" :chat-prompt-wait)
              (if contents
                (let [assistant-texts (->> contents
                                           (filter #(= "assistant" (:role %)))
                                           (filter #(= "text" (get-in % [:content :type])))
                                           (map #(get-in % [:content :text])))]
                  (telemetry/emit! {:event :eca/chat-response
                                     :content-count (count contents)
                                     :message message
                                     :chat-id chat-id
                                     :response-text (str/join "\n" assistant-texts)})
                  {:status :success
                   :response ack-response
                   :content (str/join "\n" assistant-texts)
                   :notifications contents})
                (do
                  (telemetry/emit! {:event :eca/chat-content-timeout})
                  {:status :error
                   :error :content-timeout
                   :response ack-response
                   :partial-content @collected-content
                   :message "Timed out waiting for assistant response"}))))))

       (catch Exception e
         (when wait? (core/unregister-callback! "chat/contentReceived" :chat-prompt-wait))
        (telemetry/emit! {:event :eca/chat-error
                          :error (.getMessage e)})
        {:status :error
         :error (.getMessage e)}))))

(defn chat-prompt
  "Send a chat message to ECA and get response.

   By default, returns immediately after ECA acknowledges the prompt.
   Set :wait? true to wait for the full assistant response (via notifications).

   On timeout or write failure, automatically restarts ECA and retries once.

   Usage: (chat-prompt \"Hello!\")
          (chat-prompt \"Hello!\" {:wait? true :timeout-ms 120000})"
  ([message] (chat-prompt message {}))
  ([message opts]
   (telemetry/emit! {:event :eca/chat-prompt
                      :message-length (count message)
                      :message message
                      :chat-id (:chat-id opts)})

   (let [result (try
                  (chat-prompt-once message opts)
                  (catch Exception e
                    {:status :error
                     :error (str "send-failed:" (.getMessage e))
                     :exception e}))]

     ;; If timeout or send failure, try restart + retry once
     (if (and (= :error (:status result))
              (or (= :timeout (:error result))
                  (and (string? (:error result))
                       (str/starts-with? (str (:error result)) "send-failed:"))))
       (do
         (telemetry/emit! {:event :eca/chat-retry-after-failure
                           :original-error (:error result)})
         (println "⚠️  ECA chat failed, attempting restart + retry...")
         (try
           (lifecycle/restart!)
           ;; Brief pause for ECA to initialize
           (Thread/sleep 1000)
           (if (lifecycle/alive?)
             (let [retry-result (try
                                  (chat-prompt-once message opts)
                                  (catch Exception e
                                    {:status :error
                                     :error (.getMessage e)
                                     :message "ECA retry failed after restart"}))]
               (telemetry/emit! {:event :eca/chat-retry-result
                                 :status (:status retry-result)})
               retry-result)
             {:status :error
              :error :restart-failed
              :message "ECA could not be restarted. Check that the ECA binary is installed."})
           (catch Exception e
             (telemetry/emit! {:event :eca/chat-restart-failed
                               :error (.getMessage e)})
             {:status :error
              :error :restart-failed
              :message (str "ECA restart failed: " (.getMessage e))})))
       ;; Success or non-retryable error
       result))))

;; ============================================================================
;; Query Operations
;; ============================================================================

(defn query-context
  "Query context from ECA (repoMap, files, etc.)

   Usage: (query-context)"
  []
  (let [params {:chat-id "default"}
        response-promise (core/send-request! "chat/queryContext" params)]

    (telemetry/emit! {:event :eca/query-context})

    (try
      (let [response (deref response-promise 30000 nil)]
        (if response
          {:status :success :context response}
          {:status :error :error :timeout}))

      (catch Exception e
        {:status :error :error (.getMessage e)}))))

(defn query-files
  "Search files in ECA workspace

   Usage: (query-files \"*.clj\")"
  [pattern]
  (let [params {:chat-id "default"
                :pattern pattern}
        response-promise (core/send-request! "chat/queryFiles" params)]

    (telemetry/emit! {:event :eca/query-files :pattern pattern})

    (try
      (let [response (deref response-promise 30000 nil)]
        (if response
          {:status :success :files response}
          {:status :error :error :timeout}))

      (catch Exception e
        {:status :error :error (.getMessage e)}))))