(ns ouroboros.frontend.ui.chat-panel
  "Global chat sidebar for ECA AI assistant interaction

   A slide-out panel accessible from every page that provides:
   - Context-aware AI chat (detects current page/builder)
   - Message history with user/assistant roles
   - Streaming response display
   - Quick action suggestions based on current context
   - Keyboard shortcut (Ctrl+/) to toggle"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Chat State (stored in app state at [:chat/id :global])
;; ============================================================================

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

(m/defmutation send-chat-message
  "Send a message and add to chat history"
  [{:keys [text context]}]
  (action [{:keys [state]}]
          (let [user-msg {:role :user
                          :content text
                          :timestamp (js/Date.now)}
                assistant-placeholder {:role :assistant
                                       :content ""
                                       :streaming? true
                                       :timestamp (js/Date.now)}]
            (swap! state
                   (fn [s]
                     (-> s
                         (update-in [:chat/id :global :chat/messages]
                                    (fnil conj []) user-msg)
                         (update-in [:chat/id :global :chat/messages]
                                    conj assistant-placeholder)
                         (assoc-in [:chat/id :global :chat/loading?] true))))
            ;; Send via WebSocket
            (ws/send! {:type "eca/chat"
                       :text text
                       :context (or context "")}))))

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
                       (assoc-in s [:chat/id :global :chat/loading?] false)))))))

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

(m/defmutation clear-chat
  "Clear chat history"
  [_]
  (action [{:keys [state]}]
          (swap! state
                 (fn [s]
                   (-> s
                       (assoc-in [:chat/id :global :chat/messages] [])
                       (assoc-in [:chat/id :global :chat/loading?] false))))))

(m/defmutation set-chat-context
  "Update the current chat context based on active page"
  [{:keys [context]}]
  (action [{:keys [state]}]
          (swap! state assoc-in [:chat/id :global :chat/context] context)))

;; ============================================================================
;; Context Detection
;; ============================================================================

(def context-suggestions
  "Fallback quick action suggestions based on page context.
   ECA-generated suggestions replace these when available."
  {"empathy"   {:label "Empathy Map"
                :icon "🧠"
                :suggestions ["What am I missing in my empathy map?"
                              "Help me understand my customer better"
                              "What questions should I ask in user interviews?"
                              "Analyze my persona for blind spots"]}
   "valueprop" {:label "Value Proposition"
                :icon "✨"
                :suggestions ["Is my value proposition strong enough?"
                              "How can I differentiate from competitors?"
                              "Help me refine my messaging"
                              "What objections might customers have?"]}
   "canvas"    {:label "Lean Canvas"
                :icon "📊"
                :suggestions ["Review my business model assumptions"
                              "What risks should I test first?"
                              "Help me identify my unfair advantage"
                              "Are my revenue streams realistic?"]}
   "mvp"       {:label "MVP Planning"
                :icon "🚀"
                :suggestions ["What features should I cut from MVP?"
                              "Help me prioritize my feature list"
                              "How should I measure MVP success?"
                              "What's the fastest way to validate this?"]}
   "dashboard" {:label "Dashboard"
                :icon "📋"
                :suggestions ["How do I get started with Ouroboros?"
                              "What should I work on first?"
                              "Explain the product development flywheel"
                              "Help me create my first project"]}
   "projects"  {:label "Projects"
                :icon "📁"
                :suggestions ["How should I structure my project?"
                              "What makes a good project scope?"
                              "Help me name my project"
                              "When should I start a new project?"]}
   :default    {:label "General"
                :icon "💬"
                :suggestions ["How do I use Ouroboros?"
                              "What is an empathy map?"
                              "Explain lean canvas methodology"
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
  "Get context label, icon, and suggestions for current route"
  [route]
  (let [ctx (detect-context route)]
    (get context-suggestions (or ctx :default) (get context-suggestions :default))))

;; ============================================================================
;; Chat Message Component
;; ============================================================================

(defn chat-message
  "Render a single chat message"
  [{:keys [role content streaming?]} idx]
  (dom/div {:key idx
            :className (str "chat-msg chat-msg-" (name role))}
           (dom/div :.chat-msg-avatar
                    (if (= role :user) "👤" "🤖"))
           (dom/div :.chat-msg-body
                    (dom/div :.chat-msg-role
                             (if (= role :user) "You" "AI Assistant"))
                    (dom/div :.chat-msg-content
                             (if (and streaming? (empty? content))
                               (dom/span :.chat-typing
                                         (dom/span :.typing-dot)
                                         (dom/span :.typing-dot)
                                         (dom/span :.typing-dot))
                               content)))))

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
;; Chat Panel Component
;; ============================================================================

(defsc ChatPanel
  "Global slide-out chat sidebar.
   Mounted in Root, accessible from every page."
  [this {:chat/keys [open? messages loading? context]}]
  {:query [:chat/open? :chat/messages :chat/loading? :chat/context]
   :ident (fn [] [:chat/id :global])
   :initial-state (fn [_] {:chat/open? false
                            :chat/messages []
                            :chat/loading? false
                            :chat/context nil})}

  (let [input-text (or (comp/get-state this :input) "")
        current-route (or context [])
        ctx-info (get-context-info current-route)
        has-messages? (seq messages)

        do-send (fn []
                  (let [text (str/trim input-text)]
                    (when (seq text)
                      (comp/transact! this [(send-chat-message
                                             {:text text
                                              :context (str (:label ctx-info) ": " (str/join "/" current-route))})])
                      (comp/set-state! this {:input ""}))))]

    ;; Overlay backdrop (click to close)
    (dom/div {:className (str "chat-sidebar-wrapper " (when open? "chat-open"))}
             (dom/div :.chat-backdrop
                      {:onClick #(comp/transact! this [(close-chat {})])})

             ;; Sidebar panel
             (dom/div :.chat-sidebar
                      ;; Header
                      (dom/div :.chat-header
                               (dom/div :.chat-header-left
                                        (dom/span :.chat-header-icon "🤖")
                                        (dom/div :.chat-header-text
                                                 (dom/h3 "AI Assistant")
                                                 (dom/span :.chat-context-badge
                                                           (str (:icon ctx-info) " " (:label ctx-info)))))
                               (dom/div :.chat-header-actions
                                        (when has-messages?
                                          (dom/button
                                           {:className "chat-action-btn"
                                            :onClick #(comp/transact! this [(clear-chat {})])
                                            :title "Clear chat"}
                                           "🗑"))
                                        (dom/button
                                         {:className "chat-action-btn chat-close-btn"
                                          :onClick #(comp/transact! this [(close-chat {})])}
                                         "x")))

                      ;; Messages area
                      (dom/div :.chat-messages
                               {:ref (fn [el]
                                       (when el
                                         (set! (.-scrollTop el) (.-scrollHeight el))))}
                               (if has-messages?
                                 (map-indexed
                                  (fn [idx msg]
                                    (chat-message msg idx))
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
                                 :onChange #(comp/set-state! this {:input (.. % -target -value)})
                                 :onKeyDown (fn [e]
                                              (when (and (= "Enter" (.-key e))
                                                         (not (.-shiftKey e)))
                                                (.preventDefault e)
                                                (do-send)))})
                               (dom/button
                                {:className (str "chat-send-btn "
                                                 (when (or loading? (empty? (str/trim input-text)))
                                                   "disabled"))
                                 :disabled (or loading? (empty? (str/trim input-text)))
                                 :onClick do-send}
                                (if loading? "..." "↑")))))))

(def ui-chat-panel (comp/factory ChatPanel))
