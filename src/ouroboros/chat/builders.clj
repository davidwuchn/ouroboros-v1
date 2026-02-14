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
      (let [error-msg (str "ECA is not running.\n\n"
                           "Please start ECA first:\n"
                           "(require '[ouroboros.interface :as iface])\n"
                           "(iface/eca-start!)\n\n"
                           "Or set ECA_PATH environment variable.")]
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
;; Canvas Builder
;; ============================================================================

(defn handle-canvas-message
  "Handle message when user is in canvas building mode"
  [adapter chat-id user-name text]
  (let [session (session/get-session chat-id)
        canvas-session (get-in session [:context :canvas/session])
        text-normalized (str/trim text)
        cancel? (= "cancel" (str/lower-case text-normalized))]
    (if canvas-session
      (if cancel?
        (do
          ;; Cancel canvas building
          (session/update-context! chat-id dissoc :canvas/session :canvas/mode)
          (send-message! adapter chat-id "🗑️ Canvas building cancelled. All progress lost."))
        (let [result (canvas/process-response! canvas-session text)]
          ;; Update session with new canvas state
          (session/assoc-context! chat-id :canvas/session (:session result))

          (if (:complete? result)
            (do
              ;; Canvas complete - show summary and exit mode
              (session/update-context! chat-id dissoc :canvas/session :canvas/mode)
              (let [summary (canvas/get-canvas-summary (:session result))]
                (send-markdown! adapter chat-id
                                (str (:message result) "\n\n"
                                     "🎯 *Lean Canvas Summary*\n"
                                     "Project: " (:canvas/project-name summary) "\n"
                                     "Completed: " (:canvas/completed-sections summary) "/" (:canvas/total-sections summary) " sections\n"
                                     "Canvas ID: " (:canvas/id summary) "\n\n"
                                     "Each section has been saved as a learning insight.\n"
                                     "Use /recall lean-canvas- to review later.\n\n"
                                     "Next step: Use /build empathy to understand your users."))))
            ;; Continue with next prompt
            (send-markdown! adapter chat-id (:message result)))))
      ;; No canvas session - treat as normal message
      (handle-natural-message adapter chat-id user-name text))))

;; ============================================================================
;; Empathy Map Builder
;; ============================================================================

(defn handle-empathy-message
  "Handle message when user is in empathy map building mode"
  [adapter chat-id user-name text]
  (let [session (session/get-session chat-id)
        empathy-session (get-in session [:context :empathy/session])
        text-normalized (str/trim text)
        cancel? (= "cancel" (str/lower-case text-normalized))]
    (if empathy-session
      (if cancel?
        (do
          ;; Cancel empathy building
          (session/update-context! chat-id dissoc :empathy/session :empathy/mode)
          (send-message! adapter chat-id "🗑️ Empathy map cancelled. All progress lost."))
        (let [result (empathy/process-response! empathy-session text)]
          ;; Update session with new empathy state
          (session/assoc-context! chat-id :empathy/session (:session result))

          (if (:complete? result)
            (do
              ;; Empathy complete - show summary and exit mode
              (session/update-context! chat-id dissoc :empathy/session :empathy/mode)
              (let [summary (empathy/get-empathy-summary (:session result))]
                (send-markdown! adapter chat-id
                                (str (:message result) "\n\n"
                                     "🎯 *Empathy Map Summary*\n"
                                     "Persona: " (:empathy/persona-name summary) "\n"
                                     "Completed: " (:empathy/completed-sections summary) "/" (:empathy/total-sections summary) " sections\n"
                                     "Map ID: " (:empathy/id summary) "\n\n"
                                     "Each section has been saved as a learning insight.\n"
                                     "Use /recall empathy- to review later.\n\n"
                                     "Next step: Use /build valueprop to define your value proposition."))))
            ;; Continue with next prompt
            (send-markdown! adapter chat-id (:message result)))))
      ;; No empathy session - treat as normal message
      (handle-natural-message adapter chat-id user-name text))))

;; ============================================================================
;; Value Proposition Builder
;; ============================================================================

(defn handle-vp-message
  "Handle message when user is in value proposition mode"
  [adapter chat-id user-name text]
  (let [session (session/get-session chat-id)
        vp-session (get-in session [:context :vp/session])
        text-normalized (str/trim text)
        cancel? (= "cancel" (str/lower-case text-normalized))]
    (if vp-session
      (if cancel?
        (do
          ;; Cancel VP building
          (session/update-context! chat-id dissoc :vp/session :vp/mode)
          (send-message! adapter chat-id "🗑️ Value Proposition cancelled. All progress lost."))
        (let [result (vp/process-response! vp-session text)]
          ;; Update session with new VP state
          (session/assoc-context! chat-id :vp/session (:session result))

          (if (:complete? result)
            (do
              ;; VP complete - show summary and exit mode
              (session/update-context! chat-id dissoc :vp/session :vp/mode)
              (let [summary (vp/get-vp-summary (:session result))]
                (send-markdown! adapter chat-id
                                (str (:message result) "\n\n"
                                     "🎯 *Value Proposition Summary*\n"
                                     "Project: " (:vp/project-name summary) "\n"
                                     "Completed: " (:vp/completed-sections summary) "/" (:vp/total-sections summary) " sections\n"
                                     "VP ID: " (:vp/id summary) "\n\n"
                                     "Each section has been saved as a learning insight.\n"
                                     "Use /recall value-prop- to review later.\n\n"
                                     "Next step: Use /build mvp to create an MVP plan."))))
            ;; Continue with next prompt
            (send-markdown! adapter chat-id (:message result)))))
      ;; No VP session - treat as normal message
      (handle-natural-message adapter chat-id user-name text))))

;; ============================================================================
;; MVP Planning Builder
;; ============================================================================

(defn handle-mvp-message
  "Handle message when user is in MVP planning mode"
  [adapter chat-id user-name text]
  (let [session (session/get-session chat-id)
        mvp-session (get-in session [:context :mvp/session])
        text-normalized (str/trim text)
        cancel? (= "cancel" (str/lower-case text-normalized))]
    (if mvp-session
      (if cancel?
        (do
          ;; Cancel MVP building
          (session/update-context! chat-id dissoc :mvp/session :mvp/mode)
          (send-message! adapter chat-id "🗑️ MVP planning cancelled. All progress lost."))
        (let [result (mvp/process-response! mvp-session text)]
          ;; Update session with new MVP state
          (session/assoc-context! chat-id :mvp/session (:session result))

          (if (:complete? result)
            (do
              ;; MVP complete - show summary and exit mode
              (session/update-context! chat-id dissoc :mvp/session :mvp/mode)
              (let [summary (mvp/get-mvp-summary (:session result))]
                (send-markdown! adapter chat-id
                                (str (:message result) "\n\n"
                                     "🚀 *MVP Planning Summary*\n"
                                     "Project: " (:mvp/project-name summary) "\n"
                                     "Completed: " (:mvp/completed-sections summary) "/" (:mvp/total-sections summary) " sections\n"
                                     "MVP ID: " (:mvp/id summary) "\n\n"
                                     "Each section has been saved as a learning insight.\n"
                                     "Use /recall mvp- to review later.\n\n"
                                     "Next step: Use /build canvas to create a Lean Canvas."))))
            ;; Continue with next prompt
            (send-markdown! adapter chat-id (:message result)))))
      ;; No MVP session - treat as normal message
      (handle-natural-message adapter chat-id user-name text))))

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
          (handle-natural-message adapter chat-id user-name text)))))))