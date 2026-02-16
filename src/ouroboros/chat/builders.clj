(ns ouroboros.chat.builders
  "Chat Builder Mode Handlers

   Handles interactive builder modes for product development:
   - Lean Canvas (/build canvas)
   - Empathy Map (/build empathy)
   - Value Proposition (/build valueprop)
   - MVP Planning (/build mvp)
   - Workflow modes (/plan, /work, /review, /compound)

   This namespace is an implementation detail - prefer using
   the public API in ouroboros.chat"
  (:require
   [clojure.string :as str]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.chat.session :as session]
   [ouroboros.chat.streaming :as streaming]
   [ouroboros.eca-client :as eca]
   [ouroboros.learning.lean-canvas :as canvas]
   [ouroboros.learning.empathy-map :as empathy]
   [ouroboros.learning.value-proposition :as vp]
   [ouroboros.learning.mvp-planning :as mvp]
   [ouroboros.workflow :as workflow]
   [ouroboros.telemetry :as telemetry]))

;; Re-export protocol functions
(def send-markdown! chatp/send-markdown!)
(def send-message! chatp/send-message!)

;; ============================================================================
;; Natural Message Handler
;; ============================================================================

(defn handle-natural-message
  "Handle natural language message via ECA with streaming response.

   Flow:
   1. Store user message in session
   2. Send placeholder message to chat
   3. Fire ECA prompt (fast mode - returns immediately)
   4. Streaming callback handles content notifications -> edit-message!
   5. On completion, final edit with full response

   Fallback: If adapter doesn't support editing, waits for full response."
  [adapter chat-id user-name text]
  (telemetry/emit! {:event :chat/message :chat-id chat-id :user user-name})

  ;; Store user message
  (session/update-session! chat-id :user text)

  ;; Check if ECA is running
  (let [eca-status (ouroboros.eca-client/status)]
    (if-not (:running eca-status)
      (let [error-msg (str "⚠️ AI Chat requires ECA (Editor Code Assistant)\n\n"
                           "To enable AI chat features:\n"
                           "1. Install ECA: bb setup:eca\n"
                           "2. Restart the chat bot\n\n"
                           "Or manually start:\n"
                           "(require '[ouroboros.interface :as iface])\n"
                           "(iface/eca-start!)\n\n"
                           "Download: https://github.com/editor-code-assistant/eca/releases")]
        (telemetry/emit! {:event :chat/eca-not-running})
        (send-message! adapter chat-id error-msg))

      (if (streaming/supports-edit? adapter)
        ;; Streaming mode: send placeholder, then progressively edit
        (let [eca-chat-id (str "chat-" chat-id)]
          (streaming/start-streaming! adapter chat-id eca-chat-id)

          ;; Fire ECA prompt (fast mode - returns after ack)
          (let [result (ouroboros.eca-client/chat-prompt text {:chat-id eca-chat-id})]
            (when (= :error (:status result))
              ;; Prompt failed - clean up and show error
              (streaming/stop-streaming! eca-chat-id)
              (let [error-msg (str "ECA error: "
                                   (or (:error result) "Unknown error")
                                   "\n" (:message result))]
                (telemetry/emit! {:event :chat/eca-error :error (:error result)})
                (send-message! adapter chat-id error-msg)))

            ;; Wait for streaming to complete (with timeout)
            (future
              (let [timeout-ms 120000
                    start-time (System/currentTimeMillis)]
                (loop []
                  (let [sstate (streaming/get-streaming-state eca-chat-id)]
                    (cond
                      ;; Streaming finished
                      (nil? sstate)
                      nil ;; Already cleaned up

                      (= :done (:phase sstate))
                      (let [final-text (streaming/stop-streaming! eca-chat-id)]
                        (session/update-session! chat-id :assistant final-text)
                        (telemetry/emit! {:event :chat/stream-complete
                                          :chat-id chat-id
                                          :text-length (count final-text)}))

                      ;; Timeout
                      (> (- (System/currentTimeMillis) start-time) timeout-ms)
                      (let [partial-text (streaming/stop-streaming! eca-chat-id)]
                        (telemetry/emit! {:event :chat/stream-timeout :chat-id chat-id})
                        (session/update-session! chat-id :assistant
                                         (str partial-text "\n\n(Response timed out)")))

                      ;; Continue waiting
                      :else
                      (do
                        (Thread/sleep 100)
                        (recur))))))))

        ;; Non-streaming mode: wait for full response
        (let [result (ouroboros.eca-client/chat-prompt text {:wait? true :timeout-ms 120000})]
          (if (= :success (:status result))
            (let [response (:content result)]
              (session/update-session! chat-id :assistant response)
              (send-message! adapter chat-id response))
            (send-message! adapter chat-id
                           (str "ECA error: " (:message result)))))))))

;; ============================================================================
;; Generic Builder Handler
;; ============================================================================

(def ^:private builder-configs
  "Configuration for each builder type. Defines session keys, functions, and UI strings."
  {:canvas
   {:session-key :canvas/session
    :mode-key :canvas/mode
    :process-fn canvas/process-response!
    :summary-fn canvas/get-canvas-summary
    :cancel-msg "🗑️ Canvas building cancelled. All progress lost."
    :summary-title "🎯 *Lean Canvas Summary*"
    :name-key :canvas/project-name
    :completed-key :canvas/completed-sections
    :total-key :canvas/total-sections
    :id-key :canvas/id
    :recall-hint "Use /recall lean-canvas- to review later."
    :next-step "Next step: Use /build empathy to understand your users."}

   :empathy
   {:session-key :empathy/session
    :mode-key :empathy/mode
    :process-fn empathy/process-response!
    :summary-fn empathy/get-empathy-summary
    :cancel-msg "🗑️ Empathy map cancelled. All progress lost."
    :summary-title "🎯 *Empathy Map Summary*"
    :name-key :empathy/persona-name
    :completed-key :empathy/completed-sections
    :total-key :empathy/total-sections
    :id-key :empathy/id
    :recall-hint "Use /recall empathy- to review later."
    :next-step "Next step: Use /build valueprop to define your value proposition."}

   :vp
   {:session-key :vp/session
    :mode-key :vp/mode
    :process-fn vp/process-response!
    :summary-fn vp/get-vp-summary
    :cancel-msg "🗑️ Value Proposition cancelled. All progress lost."
    :summary-title "🎯 *Value Proposition Summary*"
    :name-key :vp/project-name
    :completed-key :vp/completed-sections
    :total-key :vp/total-sections
    :id-key :vp/id
    :recall-hint "Use /recall value-prop- to review later."
    :next-step "Next step: Use /build mvp to create an MVP plan."}

   :mvp
   {:session-key :mvp/session
    :mode-key :mvp/mode
    :process-fn mvp/process-response!
    :summary-fn mvp/get-mvp-summary
    :cancel-msg "🗑️ MVP planning cancelled. All progress lost."
    :summary-title "🚀 *MVP Planning Summary*"
    :name-key :mvp/project-name
    :completed-key :mvp/completed-sections
    :total-key :mvp/total-sections
    :id-key :mvp/id
    :recall-hint "Use /recall mvp- to review later."
    :next-step "Next step: Use /build canvas to create a Lean Canvas."}})

(defn- handle-builder-message
  "Generic handler for all builder types.

   Dispatches to the appropriate builder logic based on config.
   Handles: cancel, process response, complete, continue."
  [builder-type adapter chat-id user-name text]
  (let [{:keys [session-key mode-key process-fn summary-fn cancel-msg
                summary-title name-key completed-key total-key id-key
                recall-hint next-step]}
        (get builder-configs builder-type)

        session (session/get-session chat-id)
        builder-session (get-in session [:context session-key])
        text-normalized (str/trim text)
        cancel? (= "cancel" (str/lower-case text-normalized))]
    (if builder-session
      (if cancel?
        (do
          (session/update-context! chat-id dissoc session-key mode-key)
          (send-message! adapter chat-id cancel-msg))
        (let [result (process-fn builder-session text)]
          (session/assoc-context! chat-id session-key (:session result))
          (if (:complete? result)
            (do
              (session/update-context! chat-id dissoc session-key mode-key)
              (let [summary (summary-fn (:session result))]
                (send-markdown! adapter chat-id
                                (str (:message result) "\n\n"
                                     summary-title "\n"
                                     "Project: " (get summary name-key) "\n"
                                     "Completed: " (get summary completed-key) "/" (get summary total-key) " sections\n"
                                     "ID: " (get summary id-key) "\n\n"
                                     "Each section has been saved as a learning insight.\n"
                                     recall-hint "\n\n"
                                     next-step))))
            (send-markdown! adapter chat-id (:message result)))))
      (handle-natural-message adapter chat-id user-name text))))

;; ============================================================================
;; Builder Handlers (thin wrappers around generic handler)
;; ============================================================================

(defn handle-canvas-message
  "Handle message when user is in canvas building mode"
  [adapter chat-id user-name text]
  (handle-builder-message :canvas adapter chat-id user-name text))

(defn handle-empathy-message
  "Handle message when user is in empathy map building mode"
  [adapter chat-id user-name text]
  (handle-builder-message :empathy adapter chat-id user-name text))

(defn handle-vp-message
  "Handle message when user is in value proposition mode"
  [adapter chat-id user-name text]
  (handle-builder-message :vp adapter chat-id user-name text))

(defn handle-mvp-message
  "Handle message when user is in MVP planning mode"
  [adapter chat-id user-name text]
  (handle-builder-message :mvp adapter chat-id user-name text))

;; ============================================================================
;; Workflow Handler
;; ============================================================================

(defn handle-workflow-message
  "Handle message when user is in workflow mode"
  [adapter chat-id user-name text]
  (let [session (session/get-session chat-id)
        workflow-type (get-in session [:context :workflow/type])
        text-normalized (str/trim text)
        cancel? (= "cancel" (str/lower-case text-normalized))]
    (if cancel?
      (do
        (workflow/cancel-workflow! chat-id)
        (session/update-context! chat-id dissoc :workflow/type :workflow/mode)
        (send-message! adapter chat-id "Workflow cancelled."))
      (case workflow-type
        :plan (let [result (workflow/process-plan-response! chat-id text)]
                (if (= :complete (:status result))
                  (do
                    (session/update-context! chat-id dissoc :workflow/type :workflow/mode)
                    (send-markdown! adapter chat-id (:message result)))
                  (send-markdown! adapter chat-id (:message result))))

        :work (let [result (workflow/process-work-response! chat-id text)]
                (send-markdown! adapter chat-id (:message result)))

        :review (let [result (workflow/process-review-response! chat-id text)]
                  (if (= :continued (:status result))
                    (send-markdown! adapter chat-id (:message result))
                    (do
                      (session/update-context! chat-id dissoc :workflow/type :workflow/mode)
                      (send-markdown! adapter chat-id (:message result)))))

        :compound (let [result (workflow/process-compound-response! chat-id text)]
                    (if (= :complete (:status result))
                      (do
                        (session/update-context! chat-id dissoc :workflow/type :workflow/mode)
                        (send-markdown! adapter chat-id (:message result)))
                      (send-markdown! adapter chat-id (:message result))))

        ;; Unknown workflow type - exit and treat as normal message
        (do
          (session/update-context! chat-id dissoc :workflow/type :workflow/mode)
          (handle-natural-message adapter chat-id user-name text))))))
)