(ns ouroboros.frontend.ui.chat-panel
  "Global chat sidebar for ECA AI assistant interaction

   A slide-out panel accessible from every page that provides:
   - Context-aware AI chat (detects current page/builder)
   - Message history with user/assistant roles
   - Streaming response display with markdown rendering
   - Quick action suggestions based on current context
   - Multiple conversations with localStorage persistence
   - Copy-to-clipboard, error recovery, message edit/delete
   - Keyboard shortcuts: Ctrl+/ toggle, Escape close, Ctrl+L clear
   - Tabbed sidebar: Chat / Wisdom / Context
   - Auto-resize textarea"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; localStorage Persistence
;; ============================================================================

(def ^:private storage-key "ouroboros.chat-conversations")
(def ^:private active-conv-key "ouroboros.chat-active-conversation")
(def ^:private sidebar-width-key "ouroboros.chat-sidebar-width")
(def ^:private max-conversations 20)
(def ^:private default-sidebar-width 400)
(def ^:private min-sidebar-width 300)
(def ^:private max-sidebar-width-vw 80)

(defn- generate-id
  "Generate a simple unique conversation ID"
  []
  (str "conv-" (js/Date.now) "-" (rand-int 10000)))

(defn- load-conversations
  "Load all conversations from localStorage"
  []
  (try
    (when-let [raw (.getItem js/localStorage storage-key)]
      (let [parsed (js/JSON.parse raw)]
        (js->clj parsed :keywordize-keys true)))
    (catch :default _e nil)))

(defn- save-conversations!
  "Persist conversations to localStorage"
  [conversations]
  (try
    (.setItem js/localStorage storage-key
              (js/JSON.stringify (clj->js conversations)))
    (catch :default _e nil)))

(defn- load-active-conversation-id
  "Load the active conversation ID from localStorage"
  []
  (try
    (.getItem js/localStorage active-conv-key)
    (catch :default _e nil)))

(defn- save-active-conversation-id!
  "Persist the active conversation ID to localStorage"
  [conv-id]
  (try
    (.setItem js/localStorage active-conv-key conv-id)
    (catch :default _e nil)))

(defn- conversation->storable
  "Convert a conversation map for storage (strip streaming state)"
  [conv]
  (-> conv
      (update :messages
              (fn [msgs]
                (mapv (fn [msg]
                        (-> msg
                            (dissoc :streaming? :error?)
                            ;; Ensure role is stored as string
                            (update :role name)))
                      (or msgs []))))
      (dissoc :loading?)))

;; ============================================================================
;; Sidebar Width Persistence & Resize
;; ============================================================================

(defn- load-sidebar-width
  "Load persisted sidebar width from localStorage, or return default."
  []
  (try
    (when-let [raw (.getItem js/localStorage sidebar-width-key)]
      (let [w (js/parseInt raw 10)]
        (when (and (number? w) (not (js/isNaN w)))
          w)))
    (catch :default _e nil)))

(defn- save-sidebar-width!
  "Persist sidebar width to localStorage."
  [width]
  (try
    (.setItem js/localStorage sidebar-width-key (str width))
    (catch :default _e nil)))

(defn- clamp-sidebar-width
  "Clamp width between min and max-vw of viewport."
  [w]
  (let [max-px (* (.-innerWidth js/window) (/ max-sidebar-width-vw 100))]
    (max min-sidebar-width (min w max-px))))

(defn- sync-sidebar-css-var!
  "Set --chat-sidebar-width on :root so CSS can use it for margin-right."
  [width-px]
  (.setProperty (.-style (.-documentElement js/document))
                "--chat-sidebar-width" (str width-px "px")))

(defn- start-sidebar-resize!
  "Begin resizing the chat sidebar. Sets up mousemove/mouseup listeners."
  [this start-x start-width]
  (let [on-move (fn [e]
                  (.preventDefault e)
                  ;; Dragging left edge: mouse moving left = wider
                  (let [dx (- (.-clientX e) start-x)
                        new-w (clamp-sidebar-width (- start-width dx))]
                    (comp/set-state! this {:resize/width new-w})
                    (sync-sidebar-css-var! new-w)))
        on-up   (fn on-up-fn [_e]
                  (let [final-w (comp/get-state this :resize/width)]
                    (when (number? final-w)
                      (save-sidebar-width! final-w))
                    (comp/set-state! this {:resize/active? false})
                    (.remove (.-classList (.-body js/document)) "chat-resizing-global")
                    (.removeEventListener js/window "mousemove" (comp/get-state this :resize/move-fn))
                    (.removeEventListener js/window "mouseup" on-up-fn)))]
    (comp/set-state! this {:resize/active? true
                           :resize/move-fn on-move})
    (.add (.-classList (.-body js/document)) "chat-resizing-global")
    (.addEventListener js/window "mousemove" on-move)
    (.addEventListener js/window "mouseup" on-up)))

(m/defmutation toggle-chat
  "Toggle chat panel open/closed"
  [_]
  (action [{:keys [state]}]
          (swap! state update-in [:chat/id :global :chat/open?] not)))

(m/defmutation open-chat
  "Open chat panel"
  [_]
  (action [{:keys [state]}]
          (swap! state assoc-in [:chat/id :global :chat/open?] true)))

(m/defmutation close-chat
  "Close chat panel"
  [_]
  (action [{:keys [state]}]
          (swap! state assoc-in [:chat/id :global :chat/open?] false)))

(m/defmutation set-active-tab
  "Set the active sidebar tab (:chat, :wisdom, :context)"
  [{:keys [tab]}]
  (action [{:keys [state]}]
          (swap! state assoc-in [:chat/id :global :chat/active-tab] tab)))

(m/defmutation send-chat-message
  "Send a message and add to chat history"
  [{:keys [text context]}]
  (action [{:keys [state]}]
          ;; Check WebSocket connection first
          (if-not (ws/connected?)
            ;; Not connected — show error immediately instead of hanging
            (let [user-msg {:role :user
                            :content text
                            :timestamp (js/Date.now)}
                  error-msg {:role :assistant
                             :content "Cannot reach the server. Please check that the backend is running and refresh the page."
                             :error? true
                             :timestamp (js/Date.now)}]
              (swap! state
                     (fn [s]
                       (-> s
                           (update-in [:chat/id :global :chat/messages]
                                      (fnil conj []) user-msg)
                           (update-in [:chat/id :global :chat/messages]
                                      conj error-msg)
                           (assoc-in [:chat/id :global :chat/loading?] false)))))
            ;; Connected — proceed normally
            (let [user-msg {:role :user
                            :content text
                            :timestamp (js/Date.now)}
                  assistant-placeholder {:role :assistant
                                         :content ""
                                         :streaming? true
                                         :timestamp (js/Date.now)}
                  conv-id (get-in @state [:chat/id :global :chat/active-conversation])]
              (swap! state
                     (fn [s]
                       (-> s
                           (update-in [:chat/id :global :chat/messages]
                                      (fnil conj []) user-msg)
                           (update-in [:chat/id :global :chat/messages]
                                      conj assistant-placeholder)
                           (assoc-in [:chat/id :global :chat/loading?] true))))
              ;; Persist to localStorage
              (let [convs (or (load-conversations) [])
                    updated (mapv (fn [c]
                                    (if (= (:id c) conv-id)
                                      (-> c
                                          (update :messages (fnil conj [])
                                                  (conversation->storable {:messages [user-msg]}))
                                          (assoc :messages
                                                 (mapv #(-> % (dissoc :streaming? :error?) (update :role name))
                                                       (get-in @state [:chat/id :global :chat/messages])))
                                          (assoc :updated-at (js/Date.now))
                                          (assoc :title (or (:title c)
                                                            (subs text 0 (min 50 (count text))))))
                                      c))
                                  convs)]
                (save-conversations! updated))
              ;; Send via WebSocket
              (ws/send! {:type "eca/chat"
                         :text text
                         :context (or context "")})
              ;; Safety timeout: if no response in 25s, show error in frontend
              ;; (Backend does 10s ack + restart + 10s retry, this is a last-resort fallback)
              ;; Store timeout-id so we can cancel it when response arrives
              (let [timeout-id (js/setTimeout
                                (fn []
                                  ;; Clear the stored timeout-id since we're executing
                                  (swap! state assoc-in [:chat/id :global :chat/timeout-id] nil)
                                  (let [messages (get-in @state [:chat/id :global :chat/messages] [])
                                        idx (dec (count messages))
                                        last-msg (when (>= idx 0) (nth messages idx))]
                                    ;; Only fire if we're still in streaming state with no content
                                    (when (and last-msg
                                               (= :assistant (:role last-msg))
                                               (:streaming? last-msg)
                                               (empty? (:content last-msg)))
                                      (swap! state
                                             (fn [s]
                                               (-> s
                                                   (update-in [:chat/id :global :chat/messages idx]
                                                              assoc
                                                              :error? true
                                                              :streaming? false
                                                              :content "AI service is not responding. The backend attempted to restart the AI -- please click Retry.")
                                                   (assoc-in [:chat/id :global :chat/loading?] false))))
                                      (ws/schedule-render!))))
                                25000)]
                (swap! state assoc-in [:chat/id :global :chat/timeout-id] timeout-id))))))

(m/defmutation append-streaming-token
  "Append streaming token to the last assistant message"
  [{:keys [token]}]
  (action [{:keys [state]}]
          (swap! state
                 (fn [s]
                   (let [messages (get-in s [:chat/id :global :chat/messages] [])
                         idx (dec (count messages))]
                     (if (and (>= idx 0)
                              (= :assistant (:role (nth messages idx))))
                       (update-in s [:chat/id :global :chat/messages idx :content] str token)
                       s))))))

(m/defmutation finish-streaming
  "Mark streaming as complete on the last assistant message"
  [_]
  (action [{:keys [state]}]
          (swap! state
                 (fn [s]
                   (let [messages (get-in s [:chat/id :global :chat/messages] [])
                         idx (dec (count messages))]
                     (if (and (>= idx 0)
                              (= :assistant (:role (nth messages idx))))
                       (-> s
                           (update-in [:chat/id :global :chat/messages idx] dissoc :streaming?)
                           (assoc-in [:chat/id :global :chat/loading?] false))
                       (assoc-in s [:chat/id :global :chat/loading?] false)))))
          ;; Persist completed message
          (let [conv-id (get-in @state [:chat/id :global :chat/active-conversation])
                messages (get-in @state [:chat/id :global :chat/messages] [])
                convs (or (load-conversations) [])
                updated (mapv (fn [c]
                                (if (= (:id c) conv-id)
                                  (assoc c :messages
                                         (mapv #(-> % (dissoc :streaming? :error?) (update :role name)) messages)
                                         :updated-at (js/Date.now))
                                  c))
                              convs)]
            (save-conversations! updated))))

(m/defmutation receive-chat-response
  "Receive a complete (non-streaming) response from ECA"
  [{:keys [text]}]
  (action [{:keys [state]}]
          (swap! state
                 (fn [s]
                   (let [messages (get-in s [:chat/id :global :chat/messages] [])
                         idx (dec (count messages))]
                     (if (and (>= idx 0)
                              (= :assistant (:role (nth messages idx)))
                              (:streaming? (nth messages idx)))
                       ;; Replace the placeholder
                       (-> s
                           (assoc-in [:chat/id :global :chat/messages idx]
                                     {:role :assistant
                                      :content text
                                      :timestamp (js/Date.now)})
                           (assoc-in [:chat/id :global :chat/loading?] false))
                       ;; Append new message
                       (-> s
                           (update-in [:chat/id :global :chat/messages]
                                      (fnil conj [])
                                      {:role :assistant
                                       :content text
                                       :timestamp (js/Date.now)})
                           (assoc-in [:chat/id :global :chat/loading?] false))))))))

(m/defmutation mark-error
  "Mark the last assistant message as errored"
  [{:keys [error-text]}]
  (action [{:keys [state]}]
          (swap! state
                 (fn [s]
                   (let [messages (get-in s [:chat/id :global :chat/messages] [])
                         idx (dec (count messages))]
                     (if (and (>= idx 0)
                              (= :assistant (:role (nth messages idx))))
                       (-> s
                           (update-in [:chat/id :global :chat/messages idx]
                                      assoc
                                      :error? true
                                      :streaming? false
                                      :content (or error-text "Something went wrong. Click retry to try again."))
                           (assoc-in [:chat/id :global :chat/loading?] false))
                       s))))))

(m/defmutation clear-chat
  "Clear chat history for the active conversation"
  [_]
  (action [{:keys [state]}]
          (let [conv-id (get-in @state [:chat/id :global :chat/active-conversation])]
            (swap! state
                   (fn [s]
                     (-> s
                         (assoc-in [:chat/id :global :chat/messages] [])
                         (assoc-in [:chat/id :global :chat/loading?] false))))
            ;; Update localStorage
            (let [convs (or (load-conversations) [])
                  updated (mapv (fn [c]
                                  (if (= (:id c) conv-id)
                                    (assoc c :messages [] :updated-at (js/Date.now))
                                    c))
                                convs)]
              (save-conversations! updated)))))

(m/defmutation set-chat-context
  "Update the current chat context based on active page"
  [{:keys [context]}]
  (action [{:keys [state]}]
          (swap! state assoc-in [:chat/id :global :chat/context] context)))

(m/defmutation delete-message
  "Delete a message at the given index"
  [{:keys [idx]}]
  (action [{:keys [state]}]
          (swap! state
                 (fn [s]
                   (let [messages (get-in s [:chat/id :global :chat/messages] [])
                         updated (into (subvec messages 0 idx)
                                       (subvec messages (inc idx)))]
                     (assoc-in s [:chat/id :global :chat/messages] updated))))
          ;; Persist
          (let [conv-id (get-in @state [:chat/id :global :chat/active-conversation])
                messages (get-in @state [:chat/id :global :chat/messages] [])
                convs (or (load-conversations) [])
                updated (mapv (fn [c]
                                (if (= (:id c) conv-id)
                                  (assoc c :messages
                                         (mapv #(-> % (dissoc :streaming? :error?) (update :role name)) messages))
                                  c))
                              convs)]
            (save-conversations! updated))))

(m/defmutation edit-user-message
  "Replace user message content at index, remove all messages after it"
  [{:keys [idx text context]}]
  (action [{:keys [state]}]
          (let [assistant-placeholder {:role :assistant
                                       :content ""
                                       :streaming? true
                                       :timestamp (js/Date.now)}]
            (swap! state
                   (fn [s]
                     (let [messages (get-in s [:chat/id :global :chat/messages] [])
                           updated-msg (assoc (nth messages idx) :content text :timestamp (js/Date.now))]
                       (-> s
                           (assoc-in [:chat/id :global :chat/messages]
                                     (conj (into [] (take idx messages))
                                           updated-msg
                                           assistant-placeholder))
                           (assoc-in [:chat/id :global :chat/loading?] true)))))
            ;; Re-send via WebSocket
            (ws/send! {:type "eca/chat"
                       :text text
                       :context (or context "")}))))

(m/defmutation switch-conversation
  "Switch to a different conversation"
  [{:keys [conv-id]}]
  (action [{:keys [state]}]
          (let [convs (or (load-conversations) [])
                conv (some #(when (= (:id %) conv-id) %) convs)
                messages (if conv
                           (mapv (fn [msg] (update msg :role keyword)) (:messages conv))
                           [])]
            (swap! state
                   (fn [s]
                     (-> s
                         (assoc-in [:chat/id :global :chat/messages] messages)
                         (assoc-in [:chat/id :global :chat/active-conversation] conv-id)
                         (assoc-in [:chat/id :global :chat/loading?] false)
                         (assoc-in [:chat/id :global :chat/show-conversations?] false))))
            (save-active-conversation-id! conv-id))))

(m/defmutation new-conversation
  "Create a new conversation"
  [_]
  (action [{:keys [state]}]
          (let [conv-id (generate-id)
                convs (or (load-conversations) [])
                new-conv {:id conv-id
                          :title nil
                          :messages []
                          :created-at (js/Date.now)
                          :updated-at (js/Date.now)}
                ;; Limit total conversations
                updated (take max-conversations (cons new-conv convs))]
            (save-conversations! (vec updated))
            (save-active-conversation-id! conv-id)
            (swap! state
                   (fn [s]
                     (-> s
                         (assoc-in [:chat/id :global :chat/messages] [])
                         (assoc-in [:chat/id :global :chat/active-conversation] conv-id)
                         (assoc-in [:chat/id :global :chat/loading?] false)
                         (assoc-in [:chat/id :global :chat/show-conversations?] false)))))))

(m/defmutation delete-conversation
  "Delete a conversation by ID"
  [{:keys [conv-id]}]
  (action [{:keys [state]}]
          (let [convs (or (load-conversations) [])
                updated (vec (remove #(= (:id %) conv-id) convs))
                active (get-in @state [:chat/id :global :chat/active-conversation])]
            (save-conversations! updated)
            ;; If we deleted the active conversation, switch to another
            (when (= conv-id active)
              (if (seq updated)
                (let [next-id (:id (first updated))]
                  (save-active-conversation-id! next-id)
                  (swap! state
                         (fn [s]
                           (let [next-conv (first updated)
                                 messages (mapv (fn [msg] (update msg :role keyword))
                                                (:messages next-conv))]
                             (-> s
                                 (assoc-in [:chat/id :global :chat/messages] messages)
                                 (assoc-in [:chat/id :global :chat/active-conversation] next-id))))))
                ;; No conversations left, create a fresh one
                (let [new-id (generate-id)
                      new-conv {:id new-id :title nil :messages []
                                :created-at (js/Date.now) :updated-at (js/Date.now)}]
                  (save-conversations! [new-conv])
                  (save-active-conversation-id! new-id)
                  (swap! state
                         (fn [s]
                           (-> s
                               (assoc-in [:chat/id :global :chat/messages] [])
                               (assoc-in [:chat/id :global :chat/active-conversation] new-id))))))))))

(m/defmutation toggle-conversations-list
  "Toggle the conversations list panel"
  [_]
  (action [{:keys [state]}]
          (swap! state update-in [:chat/id :global :chat/show-conversations?] not)))

;; ============================================================================
;; Context Detection
;; ============================================================================

(def fallback-context-suggestions
  "Fallback quick action suggestions shown while ECA generates context-aware ones.
   Kept minimal - ECA provides richer, project-specific suggestions."
  {"empathy"   {:label "Empathy Map"
                :icon "🧠"
                :suggestions ["What am I missing in my empathy map?"
                              "Help me understand my customer better"]}
   "valueprop" {:label "Value Proposition"
                :icon "✨"
                :suggestions ["Is my value proposition strong enough?"
                              "How can I differentiate from competitors?"]}
   "canvas"    {:label "Lean Canvas"
                :icon "📊"
                :suggestions ["Review my business model assumptions"
                              "What risks should I test first?"]}
   "mvp"       {:label "MVP Planning"
                :icon "🚀"
                :suggestions ["What features should I cut from MVP?"
                              "How should I measure MVP success?"]}
   "dashboard" {:label "Dashboard"
                :icon "📋"
                :suggestions ["What should I work on first?"
                              "Explain the product development flywheel"]}
   "projects"  {:label "Projects"
                :icon "📁"
                :suggestions ["How should I structure my project?"
                              "Help me name my project"]}
   :default    {:label "General"
                :icon "💬"
                :suggestions ["How do I use Ouroboros?"
                              "Help me with product strategy"]}})

(defn detect-context
  "Detect the current page context from the route"
  [route]
  (let [route-str (str/join "/" (or route []))]
    (cond
      (str/includes? route-str "empathy")   "empathy"
      (str/includes? route-str "valueprop") "valueprop"
      (str/includes? route-str "canvas")    "canvas"
      (str/includes? route-str "mvp")       "mvp"
      (str/includes? route-str "project")   "projects"
      (str/includes? route-str "dashboard") "dashboard"
      :else                                 nil)))

(defn get-context-info
  "Get context label, icon, and suggestions for current route.
   Uses ECA-generated suggestions if available, falls back to static.
   Pure function - does not trigger side-effects."
  [route]
  (let [ctx (detect-context route)
        ;; Check for ECA-generated suggestions
        state-atom @ws/app-state-atom
        eca-suggestions (when state-atom (get-in @state-atom [:content/generated :chat-suggestions]))
        fallback (get fallback-context-suggestions (or ctx :default)
                      (get fallback-context-suggestions :default))]
    ;; Use ECA suggestions if available for this context
    (if-let [eca-ctx (and eca-suggestions (get eca-suggestions (or ctx :default)))]
      (merge fallback eca-ctx)
      fallback)))

;; ============================================================================
;; Clipboard Utility
;; ============================================================================

(defn- copy-to-clipboard!
  "Copy text to clipboard, returns a promise"
  [text]
  (when (and js/navigator (.-clipboard js/navigator))
    (.writeText (.-clipboard js/navigator) text)))

;; ============================================================================
;; Auto-resize textarea
;; ============================================================================

(defn- auto-resize-textarea!
  "Auto-resize a textarea element to fit its content"
  [el]
  (when el
    (set! (.-height (.-style el)) "auto")
    (let [scroll-height (.-scrollHeight el)
          max-height 160
          new-height (min scroll-height max-height)]
      (set! (.-height (.-style el)) (str new-height "px")))))

;; ============================================================================
;; Chat Message Component
;; ============================================================================

(defn chat-message
  "Render a single chat message with markdown, copy, edit/delete actions"
  [{:keys [role content streaming? error?]} idx {:keys [on-retry on-copy on-delete on-edit _editing-idx]}]
  (let [is-user? (= role :user)]
    (dom/div {:key idx
              :className (str "chat-msg chat-msg-" (name role)
                              (when error? " chat-msg-error"))}
             (dom/div :.chat-msg-avatar
                      (if is-user? "👤" "🤖"))
             (dom/div :.chat-msg-body
                      (dom/div :.chat-msg-header
                               (dom/span :.chat-msg-role
                                         (if is-user? "You" "AI Assistant"))
                               ;; Action buttons
                               (dom/div :.chat-msg-actions
                                        ;; Copy button (for assistant messages with content)
                                        (when (and (not is-user?) (seq content) (not streaming?))
                                          (dom/button
                                           {:className "chat-msg-action-btn"
                                            :title "Copy to clipboard"
                                            :onClick (fn []
                                                       (copy-to-clipboard! content)
                                                       (on-copy idx))}
                                           "Copy"))
                                        ;; Edit button (for user messages)
                                        (when (and is-user? (not streaming?))
                                          (dom/button
                                           {:className "chat-msg-action-btn"
                                            :title "Edit and resend"
                                            :onClick #(on-edit idx)}
                                           "Edit"))
                                        ;; Delete button
                                        (when (and (not streaming?) (not error?))
                                          (dom/button
                                           {:className "chat-msg-action-btn chat-msg-action-delete"
                                            :title "Delete message"
                                            :onClick #(on-delete idx)}
                                           "Del"))
                                        ;; Retry button (for error state)
                                        (when error?
                                          (dom/button
                                           {:className "chat-msg-action-btn chat-msg-action-retry"
                                            :title "Retry this message"
                                            :onClick #(on-retry idx)}
                                           "Retry"))))
                      ;; Message content
                      (dom/div {:className (str "chat-msg-content"
                                                (when (and (not is-user?) (not streaming?) (seq content))
                                                  " chat-msg-markdown"))}
                               (cond
                                 ;; Typing indicator
                                 (and streaming? (empty? content))
                                 (dom/span :.chat-typing
                                           (dom/span :.typing-dot)
                                           (dom/span :.typing-dot)
                                           (dom/span :.typing-dot))

                                 ;; Error state
                                 error?
                                 (dom/div :.chat-msg-error-content
                                          (dom/span :.chat-msg-error-icon "!")
                                          (dom/span content))

                                 ;; Markdown rendering for assistant messages
                                 (and (not is-user?) (seq content))
                                 (ui/render-markdown content "chat-markdown")

                                 ;; User messages as plain text
                                 :else
                                 content))))))

;; ============================================================================
;; Quick Suggestions Component
;; ============================================================================

(defn quick-suggestions
  "Render context-aware quick action buttons"
  [{:keys [suggestions on-select]}]
  (dom/div :.chat-suggestions
           (dom/div :.chat-suggestions-label "Try asking:")
           (dom/div :.chat-suggestions-list
                    (for [suggestion suggestions]
                      (dom/button
                       {:key suggestion
                        :className "chat-suggestion-btn"
                        :onClick #(on-select suggestion)}
                       suggestion)))))

;; ============================================================================
;; Conversations List Component
;; ============================================================================

(defn conversations-list
  "Render the list of saved conversations"
  [{:keys [active-id on-switch on-delete on-new]}]
  (let [convs (or (load-conversations) [])]
    (dom/div :.chat-conversations
             (dom/div :.chat-conversations-header
                      (dom/span "Conversations")
                      (dom/button
                       {:className "chat-conv-new-btn"
                        :onClick on-new
                        :title "New conversation"}
                       "+"))
             (dom/div :.chat-conversations-list
                      (if (seq convs)
                        (for [conv convs]
                          (let [conv-id (:id conv)
                                is-active? (= conv-id active-id)
                                title (or (:title conv) "New conversation")
                                msg-count (count (:messages conv))]
                            (dom/div {:key conv-id
                                      :className (str "chat-conv-item"
                                                      (when is-active? " chat-conv-active"))}
                                     (dom/div {:className "chat-conv-info"
                                               :onClick #(on-switch conv-id)}
                                              (dom/div :.chat-conv-title
                                                       (if (> (count title) 40)
                                                         (str (subs title 0 40) "...")
                                                         title))
                                              (dom/div :.chat-conv-meta
                                                       (str msg-count " messages")))
                                     (when (not is-active?)
                                       (dom/button
                                        {:className "chat-conv-delete-btn"
                                         :onClick (fn [e]
                                                    (.stopPropagation e)
                                                    (on-delete conv-id))
                                         :title "Delete conversation"}
                                        "x")))))
                        (dom/div :.chat-conv-empty "No conversations yet"))))))

;; ============================================================================
;; Wisdom Tab Component (inline from components.cljs)
;; ============================================================================

(defn wisdom-tab-content
  "Wisdom content rendered inside the sidebar tab"
  [{:keys [route project-id]}]
  (let [ctx (detect-context route)
        phase (keyword (or ctx "empathy"))]
    (dom/div :.chat-wisdom-tab
             (dom/div :.chat-wisdom-tab-header
                      (dom/span "💡 Wisdom")
                      (dom/span :.chat-wisdom-tab-phase
                                (str "Phase: " (str/capitalize (or ctx "general")))))
             (ui/wisdom-panel-body {:phase phase :project-id project-id}))))

;; ============================================================================
;; Context Tab Component
;; ============================================================================

(defn context-tab-content
  "Show current app context (page/phase) and chat context (conversation stats)"
  [{:keys [route messages]}]
  (let [ctx-info (get-context-info route)
        msg-count (count messages)
        ;; Summarization threshold from backend config
        max-history 20
        _recent-count 10
        needs-summary? (> msg-count max-history)
        summarized-count (max 0 (- msg-count max-history))]
    (dom/div :.chat-context-tab
             ;; App Context Section
             (dom/div :.chat-context-section
                      (dom/div :.chat-context-section-header
                               (dom/span :.chat-context-icon "📍")
                               (dom/span "App Context"))
                      (dom/div :.chat-context-app-info
                               (dom/div :.chat-context-app-phase
                                        (dom/span (:icon ctx-info) " ")
                                        (dom/strong (:label ctx-info)))
                               (dom/div :.chat-context-app-route
                                        (str "Route: " (str/join "/" (or route ["dashboard"]))))
                               (dom/p :.chat-context-app-desc
                                      "The AI assistant is aware of your current page. It tailors suggestions based on where you are in the product development flywheel.")))

             ;; Chat Context Section
             (dom/div :.chat-context-section
                      (dom/div :.chat-context-section-header
                               (dom/span :.chat-context-icon "💬")
                               (dom/span "Chat Context"))
                      (dom/div :.chat-context-chat-info
                               (dom/div :.chat-context-stat
                                        (dom/span :.chat-context-stat-label "Messages:")
                                        (dom/span :.chat-context-stat-value msg-count))
                               (when needs-summary?
                                 (dom/div :.chat-context-summary-status
                                          (dom/span :.chat-context-summary-icon "🗜")
                                          (dom/span (str "Context compressed: " summarized-count " older messages summarized"))))
                               (dom/div :.chat-context-memory
                                        (dom/p "Recent messages are shown in full. Older messages are compressed to conserve context window while preserving key decisions and outcomes."))))

             ;; Suggestions Section
             (dom/div :.chat-context-section
                      (dom/div :.chat-context-section-header
                               (dom/span :.chat-context-icon "💡")
                               (dom/span "Suggested Questions"))
                      (dom/ul :.chat-context-suggestions
                              (for [s (:suggestions ctx-info)]
                                (dom/li {:key s} s)))))))

;; ============================================================================
;; Chat Panel Component
;; ============================================================================

(defsc ChatPanel
  "Global slide-out chat sidebar with tabs: Chat / Wisdom / Context.
   Mounted in Root, accessible from every page."
  [this {:chat/keys [open? messages loading? context active-tab
                     active-conversation show-conversations?]}]
  {:query [:chat/open? :chat/messages :chat/loading? :chat/context
           :chat/active-tab :chat/active-conversation :chat/show-conversations?]
   :ident (fn [] [:chat/id :global])
   :initial-state (fn [_]
                    (let [;; Restore from localStorage on init
                          saved-id (load-active-conversation-id)
                          convs (or (load-conversations) [])
                          ;; If we have a saved conversation, restore it
                          active-conv (when saved-id
                                        (some #(when (= (:id %) saved-id) %) convs))
                          ;; If no saved conversation, create one
                          new-id (or saved-id (generate-id))
                          initial-messages (if active-conv
                                             (mapv (fn [msg] (update msg :role keyword))
                                                   (:messages active-conv))
                                             [])]
                      ;; If we created a new conversation, persist it
                      (when-not active-conv
                        (let [new-conv {:id new-id :title nil :messages []
                                        :created-at (js/Date.now) :updated-at (js/Date.now)}]
                          (save-conversations! (vec (cons new-conv convs)))
                          (save-active-conversation-id! new-id)))
                      {:chat/open? false
                       :chat/messages initial-messages
                       :chat/loading? false
                       :chat/context nil
                       :chat/active-tab :chat
                       :chat/active-conversation new-id
                       :chat/show-conversations? false}))
   ;; Request ECA-generated chat suggestions on mount (not during render)
    :componentDidMount
    (fn [this]
      ;; Sync persisted sidebar width to CSS variable
      (let [w (or (comp/get-state this :resize/width) default-sidebar-width)]
        (sync-sidebar-css-var! w))
      (let [state-atom @ws/app-state-atom
            eca-suggestions (when state-atom (get-in @state-atom [:content/generated :chat-suggestions]))
            eca-loading? (when state-atom (get-in @state-atom [:content/loading? :chat-suggestions]))]
        (when (and state-atom (ws/connected?) (not eca-suggestions) (not eca-loading?))
          (let [route (:chat/context (comp/props this))
                ctx (detect-context route)]
            (ws/request-content! :chat-suggestions :context (or ctx "general"))))))
    :initLocalState (fn [_]
                      {:resize/width (or (load-sidebar-width) default-sidebar-width)
                       :resize/active? false})}

  (let [input-text (or (comp/get-state this :input) "")
        editing-idx (comp/get-state this :editing-idx)
        edit-text (or (comp/get-state this :edit-text) "")
        current-route (or context [])
        ctx-info (get-context-info current-route)
        has-messages? (seq messages)
        active-tab (or active-tab :chat)
        sidebar-width (or (comp/get-state this :resize/width) default-sidebar-width)
        resizing? (comp/get-state this :resize/active?)

        ;; Get project ID from workspace state
        state-atom @ws/app-state-atom
        project-id (when state-atom
                     (get-in @state-atom [:workspace/project :project/id]))

        do-send (fn []
                  (let [text (str/trim (or input-text ""))]
                    (when (seq text)
                      (comp/transact! this [(send-chat-message
                                             {:text text
                                              :context (str (:label ctx-info) ": " (str/join "/" current-route))})])
                      (comp/set-state! this {:input "" :editing-idx nil :edit-text ""}))))

        do-edit-send (fn []
                       (let [text (str/trim (or edit-text ""))]
                         (when (and (some? editing-idx) (seq text))
                           (comp/transact! this [(edit-user-message
                                                  {:idx editing-idx
                                                   :text text
                                                   :context (str (:label ctx-info) ": " (str/join "/" current-route))})])
                           (comp/set-state! this {:editing-idx nil :edit-text ""}))))]

    ;; Overlay backdrop (click to close)
    (dom/div {:className (str "chat-sidebar-wrapper "
                              (when open? "chat-open ")
                              (when resizing? "chat-resizing"))}
             (dom/div :.chat-backdrop
                      {:onClick #(comp/transact! this [(close-chat {})])})

             ;; Sidebar panel
             (dom/div {:className "chat-sidebar"
                       :style {:width (str sidebar-width "px")}}
                      ;; Resize handle (left edge)
                      (dom/div {:className "chat-resize-handle"
                                :onMouseDown (fn [e]
                                               (.preventDefault e)
                                               (.stopPropagation e)
                                               (start-sidebar-resize! this (.-clientX e) sidebar-width))})
                      ;; Header with tabs
                      (dom/div :.chat-header
                               (dom/div :.chat-header-left
                                        (dom/div :.chat-header-tabs
                                                 (dom/button
                                                  {:className (str "chat-tab-btn" (when (= active-tab :chat) " active"))
                                                   :onClick #(comp/transact! this [(set-active-tab {:tab :chat})])}
                                                  "🤖 Chat")
                                                 (dom/button
                                                  {:className (str "chat-tab-btn" (when (= active-tab :wisdom) " active"))
                                                   :onClick #(comp/transact! this [(set-active-tab {:tab :wisdom})])}
                                                  "💡 Wisdom")
                                                 (dom/button
                                                  {:className (str "chat-tab-btn" (when (= active-tab :context) " active"))
                                                   :onClick #(comp/transact! this [(set-active-tab {:tab :context})])}
                                                  "📍 Context")))
                               (dom/div :.chat-header-actions
                                        ;; Conversations list toggle (only in chat tab)
                                        (when (= active-tab :chat)
                                          (dom/button
                                           {:className (str "chat-action-btn" (when show-conversations? " active"))
                                            :onClick #(comp/transact! this [(toggle-conversations-list {})])
                                            :title "Conversations"}
                                           "☰"))
                                        (when (and (= active-tab :chat) has-messages?)
                                          (dom/button
                                           {:className "chat-action-btn"
                                            :onClick #(comp/transact! this [(clear-chat {})])
                                            :title "Clear chat"}
                                           "🗑"))
                                        (dom/button
                                         {:className "chat-action-btn chat-close-btn"
                                          :onClick #(comp/transact! this [(close-chat {})])}
                                         "x")))

                      ;; Conversations list overlay
                      (when (and show-conversations? (= active-tab :chat))
                        (conversations-list
                         {:active-id active-conversation
                          :on-switch (fn [conv-id]
                                       (comp/transact! this [(switch-conversation {:conv-id conv-id})]))
                          :on-delete (fn [conv-id]
                                       (comp/transact! this [(delete-conversation {:conv-id conv-id})]))
                          :on-new (fn []
                                    (comp/transact! this [(new-conversation {})]))}))

                      ;; Tab content
                      (case active-tab
                        ;; ===== CHAT TAB =====
                        :chat
                        (dom/div :.chat-tab-content
                                 ;; Messages area
                                 (dom/div :.chat-messages
                                          {:ref (fn [el]
                                                  (when el
                                                    ;; Scroll to bottom on next animation frame (avoids re-render loop)
                                                    (js/requestAnimationFrame
                                                     (fn [] (set! (.-scrollTop el) (.-scrollHeight el))))))}
                                          (if has-messages?
                                            (map-indexed
                                             (fn [idx msg]
                                               ;; Inline edit form for user messages
                                               (if (and (= idx editing-idx) (= :user (:role msg)))
                                                 (dom/div {:key idx :className "chat-msg chat-msg-user chat-msg-editing"}
                                                          (dom/div :.chat-msg-avatar "👤")
                                                          (dom/div :.chat-msg-body
                                                                   (dom/textarea
                                                                    {:className "chat-edit-input"
                                                                     :value edit-text
                                                                     :autoFocus true
                                                                     :onChange #(comp/set-state! this {:edit-text (.. % -target -value)})
                                                                     :onKeyDown (fn [e]
                                                                                  (when (and (= "Enter" (.-key e))
                                                                                             (not (.-shiftKey e)))
                                                                                    (.preventDefault e)
                                                                                    (do-edit-send))
                                                                                  (when (= "Escape" (.-key e))
                                                                                    (comp/set-state! this {:editing-idx nil :edit-text ""})))})
                                                                   (dom/div :.chat-edit-actions
                                                                            (dom/button
                                                                             {:className "chat-edit-save-btn"
                                                                              :onClick do-edit-send}
                                                                             "Save & Resend")
                                                                            (dom/button
                                                                             {:className "chat-edit-cancel-btn"
                                                                              :onClick #(comp/set-state! this {:editing-idx nil :edit-text ""})}
                                                                             "Cancel"))))
                                                 ;; Normal message rendering
                                                 (chat-message msg idx
                                                               {:on-retry (fn [_idx]
                                                                            ;; Find the user message before this assistant message
                                                                            (let [prev-idx (dec _idx)
                                                                                  prev-msg (when (>= prev-idx 0)
                                                                                             (nth messages prev-idx))]
                                                                              (when (and prev-msg (= :user (:role prev-msg)))
                                                                                ;; Delete the error message and resend
                                                                                (comp/transact! this [(delete-message {:idx _idx})])
                                                                                (comp/transact! this [(send-chat-message
                                                                                                       {:text (:content prev-msg)
                                                                                                        :context (str (:label ctx-info) ": "
                                                                                                                      (str/join "/" current-route))})]))))
                                                                :on-copy (fn [_idx]
                                                                           (comp/set-state! this {:copied-idx _idx})
                                                                           (js/setTimeout
                                                                            #(comp/set-state! this {:copied-idx nil})
                                                                            2000))
                                                                :on-delete (fn [_idx]
                                                                             (comp/transact! this [(delete-message {:idx _idx})]))
                                                                :on-edit (fn [_idx]
                                                                           (comp/set-state! this
                                                                                            {:editing-idx _idx
                                                                                             :edit-text (:content (nth messages _idx))}))
                                                                :editing-idx editing-idx})))
                                             messages)
                                            ;; Welcome state
                                            (dom/div :.chat-welcome
                                                     (dom/div :.chat-welcome-icon "🤖")
                                                     (dom/h3 "How can I help?")
                                                     (dom/p "I'm your AI assistant, powered by ECA. I can help you with your product development - from empathy mapping to lean canvas.")))

                                          ;; Quick suggestions (shown when few/no messages)
                                          (when (< (count messages) 3)
                                            (quick-suggestions
                                             {:suggestions (:suggestions ctx-info)
                                              :on-select (fn [text]
                                                           (comp/transact! this [(send-chat-message
                                                                                  {:text text
                                                                                   :context (str (:label ctx-info) ": " (str/join "/" current-route))})]))})))

                                 ;; Input area
                                 (dom/div :.chat-input-area
                                           (dom/textarea
                                            {:className "chat-input"
                                             :value (or input-text "")
                                             :placeholder (str "Ask about " (:label ctx-info) "...")
                                             :rows 1
                                             :onChange (fn [e]
                                                        (comp/set-state! this {:input (.. e -target -value)})
                                                        (auto-resize-textarea! (.-target e)))
                                            :onKeyDown (fn [e]
                                                         (cond
                                                           ;; Enter to send (without shift)
                                                           (and (= "Enter" (.-key e))
                                                                (not (.-shiftKey e)))
                                                           (do (.preventDefault e)
                                                               (do-send))

                                                           ;; Up arrow in empty input = edit last user message
                                                            (and (= "ArrowUp" (.-key e))
                                                                 (empty? (str/trim (or input-text ""))))
                                                           (let [last-user-idx (some (fn [i]
                                                                                       (when (= :user (:role (nth messages i)))
                                                                                         i))
                                                                                     (reverse (range (count messages))))]
                                                             (when last-user-idx
                                                               (.preventDefault e)
                                                               (comp/set-state! this
                                                                                {:editing-idx last-user-idx
                                                                                 :edit-text (:content (nth messages last-user-idx))})))))})
                                          (dom/button
                                           {:className (str "chat-send-btn "
                                                             (when (or loading? (empty? (str/trim (or input-text ""))))
                                                               "disabled"))
                                             :disabled (or loading? (empty? (str/trim (or input-text ""))))
                                            :onClick do-send}
                                           (if loading? "..." "↑"))))

                        ;; ===== WISDOM TAB =====
                        :wisdom
                        (dom/div :.chat-tab-content
                                 (wisdom-tab-content {:route current-route
                                                      :project-id project-id}))

                        ;; ===== CONTEXT TAB =====
                        :context
                        (dom/div :.chat-tab-content
                                 (context-tab-content {:route current-route
                                                       :messages messages})))))))

(def ui-chat-panel (comp/factory ChatPanel))
