(ns ouroboros.ws.stream
  "DRY helper for streaming ECA responses to WebSocket clients.
   Replaces ~300 lines of duplicated register/stream/unregister boilerplate."
  (:require
   [ouroboros.eca-client :as eca]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.connections :as conn]))

(defn stream-eca-to-client!
  "Stream an ECA chat response to a WebSocket client.
   Handles the full lifecycle: register callback, stream tokens, unregister on done.

   Args:
     client-id  - WebSocket connection id
     opts       - Map with:
       :chat-id      - Unique chat identifier for ECA
       :listener-id  - Keyword for callback registration
       :prompt       - The prompt string to send to ECA
       :token-type   - Message type for streaming tokens (e.g. :eca/chat-token)
       :done-type    - Message type for completion (e.g. :eca/chat-done)
       :error-type   - Message type for errors (e.g. :eca/chat-error)
       :extra-fields - Extra fields to include in all messages (e.g. {:project-id id})
       :on-token     - Optional (fn [text]) called on each token (for accumulation)
       :on-done      - Optional (fn []) called on completion (for post-processing)
       :on-error     - Optional (fn [error-msg]) called on error"
  [client-id {:keys [chat-id listener-id prompt
                     token-type done-type error-type
                     extra-fields on-token on-done on-error
                     suppress-done-msg?]}]
  (let [base-msg (merge {:timestamp (System/currentTimeMillis)} extra-fields)]

    ;; Register callback to relay ECA content to this specific WS client
    (eca/register-callback! "chat/contentReceived" listener-id
      (fn [notification]
        (let [params (:params notification)
              notif-chat-id (:chatId params)
              role (:role params)
              content (:content params)]
          (when (= notif-chat-id chat-id)
            (cond
              ;; Progress: done -> send done msg (unless suppressed), unregister, call on-done
              (and (= "progress" (:type content))
                   (#{"done" "finished"} (:state content)))
              (do
                (when-not suppress-done-msg?
                  (conn/send-to! client-id (assoc base-msg :type done-type)))
                (eca/unregister-callback! "chat/contentReceived" listener-id)
                (when on-done (on-done)))

              ;; Assistant text content -> stream as token
              (and (= role "assistant") (= "text" (:type content)))
              (do
                (when on-token (on-token (:text content)))
                (conn/send-to! client-id (assoc base-msg
                                                :type token-type
                                                :token (:text content))))

              ;; Reasoning/other -> skip
              :else nil)))))

    ;; Send prompt to ECA
    (try
      (let [result (eca/chat-prompt prompt {:chat-id chat-id})]
        (when (= :error (:status result))
          (let [error-msg (or (:message result)
                              (when (keyword? (:error result)) (name (:error result)))
                              (str (:error result)))]
            (conn/send-to! client-id (assoc base-msg
                                            :type (or error-type done-type)
                                            :error error-msg
                                            :text (str "Error: " error-msg)))
            (eca/unregister-callback! "chat/contentReceived" listener-id)
            (when on-error (on-error error-msg)))))
      (catch Exception e
        (let [error-msg (.getMessage e)]
          (conn/send-to! client-id (assoc base-msg
                                          :type (or error-type done-type)
                                          :error error-msg
                                          :text (str "ECA error: " error-msg)))
          (eca/unregister-callback! "chat/contentReceived" listener-id)
          (when on-error (on-error error-msg)))))))

(defn ensure-eca-alive!
  "Ensure ECA is running, auto-starting if needed.
   Returns true if ECA is alive, false otherwise.
   Sends error message to client if ECA cannot be started."
  [client-id error-type extra-fields]
  (if (eca/alive?)
    true
    (do
      (telemetry/emit! {:event :ws/eca-auto-start :client-id client-id})
      (if (eca/ensure-alive!)
        true
        (do
          (conn/send-to! client-id (merge {:type error-type
                                           :error "ECA could not be started. Ensure the ECA binary is installed and try again."
                                           :text "ECA could not be started. Ensure the ECA binary is installed."
                                           :timestamp (System/currentTimeMillis)}
                                          extra-fields))
          (telemetry/emit! {:event :ws/eca-auto-start-failed :client-id client-id})
          false)))))
