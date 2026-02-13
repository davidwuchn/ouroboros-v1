(ns ouroboros.ws.handlers.chat
  "ECA chat handler - relays chat messages between frontend and ECA."
  (:require
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.stream :as stream]))

(defn handle-eca-chat!
  "Handle an eca/chat message from the frontend.
   Registers a per-request ECA callback that streams tokens back to the
   specific WebSocket client, then cleans up when done."
  [client-id {:keys [text context]}]
  (when (stream/ensure-eca-alive! client-id :eca/chat-error {})
    (let [chat-id (str "ws-" client-id "-" (System/currentTimeMillis))
          listener-id (keyword (str "ws-chat-" client-id))]

      (telemetry/emit! {:event :ws/eca-chat-request
                        :client-id client-id
                        :chat-id chat-id
                        :context context
                        :text-length (count (str text))})

      (stream/stream-eca-to-client! client-id
        {:chat-id chat-id
         :listener-id listener-id
         :prompt text
         :token-type :eca/chat-token
         :done-type :eca/chat-done
         :error-type :eca/chat-error
         :on-done (fn []
                    (telemetry/emit! {:event :ws/eca-chat-done
                                      :client-id client-id
                                      :chat-id chat-id}))
         :on-error (fn [error-msg]
                     (telemetry/emit! {:event :ws/eca-chat-error
                                       :client-id client-id
                                       :error error-msg}))}))))
