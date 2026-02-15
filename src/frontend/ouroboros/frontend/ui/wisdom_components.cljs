(ns ouroboros.frontend.ui.wisdom-components
  "Wisdom & AI components for the Web UX Platform

   Provides:
   - Template library for quick starts
   - Learning insights panel
   - AI assistant integration (ECA)
   - Smart suggestions
   - Pattern recognition display"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
;; Mutations
;; ============================================================================

(m/defmutation apply-template
  "Apply a template to current session"
  [_props]
  (remote [env]
          (-> env
              (m/returning TemplateCard)
              (m/with-target [:wisdom :applied-templates])))
  (ok-action [{:keys [state result]}]
    (let [data (:body result)]
      (when (:template/applied? data)
        (swap! state assoc-in [:wisdom :show-templates?] false)
        (js/alert (str "Template applied: " (:template/name data)))))))

(m/defmutation request-ai-insight
  "Request AI analysis of current canvas"
  [_props]
  (remote [env]
          (-> env
              (m/returning AIInsight)
              (m/with-target [:wisdom :ai-insights])))
  (action [{:keys [state]}]
    (swap! state assoc-in [:wisdom :loading-insight?] true))
  (ok-action [{:keys [state]}]
    (swap! state assoc-in [:wisdom :loading-insight?] false)))

(m/defmutation generate-eca-prompt
  "Generate context-aware prompt for ECA"
  [_props]
  (remote [env] env)
  (ok-action [{:keys [state result]}]
    (let [formatted (:context/formatted (:body result))]
      (swap! state assoc-in [:wisdom :eca-prompt] formatted)
      (swap! state assoc-in [:wisdom :show-chat?] true))))

;; ============================================================================
;; Template Library
;; ============================================================================

(defsc TemplateCard
  "Individual template card"
  [_this {:template/keys [key name description]}]
  {:query [:template/key :template/name :template/description]
   :ident :template/key}
  (dom/div :.template-card
    (dom/h4 :.template-name name)
    (dom/p :.template-description description)
    (dom/div :.template-actions
      (ui/button
        {:onClick #(comp/transact! this [(apply-template {:template-key key})])
         :variant :primary}
        "Apply")
      (ui/button
        {:onClick #(js/alert "Preview coming soon!")
         :variant :secondary}
        "Preview"))))

(def ui-template-card (comp/factory TemplateCard {:keyfn :template/key}))

(defsc TemplateLibrary
  "Template library modal/grid"
  [_this {:keys [templates on-close]}]
  (dom/div :.template-library
    (dom/div :.template-library-header
      (dom/h2 "📚 Template Library")
      (dom/p "Start with a pre-built template for your product type")
      (dom/button
        {:onClick on-close
         :className "btn btn-close"}
        "×"))
    (dom/div :.template-grid
      (if (seq templates)
         (map ui-template-card (filter :template/key templates))
        (dom/div :.templates-empty
          "No templates available")))))

;; ============================================================================
;; AI Insights
;; ============================================================================

(defsc AIInsight
  "Individual AI-generated insight"
  [_this {:insight/keys [type title description confidence]}]
  {:query [:insight/type :insight/title :insight/description :insight/confidence]
   :ident (fn [] [:insight/type type])}
  (dom/div :.ai-insight
    {:className (str "insight-" (name (or type :unknown)))}
    (dom/div :.insight-header
      (dom/h4 title)
      (dom/span :.insight-confidence
        (str (int (* 100 confidence)) "% confident")))
    (dom/p :.insight-description description)
    (dom/div :.insight-actions
      (dom/button
        {:onClick #(js/alert "Action taken!")
         :className "btn btn-sm"}
        "Apply Suggestion")
      (dom/button
        {:onClick #(js/alert "Dismissed")
         :className "btn btn-sm btn-secondary"}
        "Dismiss"))))

(def ui-ai-insight (comp/factory AIInsight {:keyfn :insight/type}))

(defsc InsightsPanel
  "Panel displaying AI insights"
  [this {:keys [insights loading? on-refresh]}]
  (dom/div :.insights-panel
    (dom/div :.insights-header
      (dom/h3 "💡 AI Insights")
      (dom/button
        {:onClick on-refresh
         :disabled loading?
         :className "btn btn-sm"}
        (if loading? "Analyzing..." "Refresh")))
    (if loading?
      (dom/div :.insights-loading
        (ui/loading))
       (if (seq insights)
         (dom/div :.insights-list
           (map #(when (:insight/type %) (ui-ai-insight %)) insights))
         (dom/div :.insights-empty
           "No insights yet. Complete more of your canvas to get AI suggestions.")))))

;; ============================================================================
;; Learning Patterns
;; ============================================================================

(defsc PatternCard
  "Display a recognized pattern"
  [this {:pattern/keys [category count recent]}]
  (dom/div :.pattern-card
    (dom/div :.pattern-icon
      (case category
        "customer-understanding" "🧠"
        "product-development" "🚀"
        "business-model" "💼"
        "📊"))
    (dom/div :.pattern-info
      (dom/h4 (str/capitalize (or category "unknown")))
      (dom/p (str count " insights"))
      (when recent
        (dom/span :.pattern-recent "Recent activity")))))

(def ui-pattern-card (comp/factory PatternCard {:keyfn :pattern/category}))

(defsc LearningDashboard
  "Dashboard showing user's learning patterns"
  [_this {:keys [total-insights categories _patterns]}]
  (dom/div :.learning-dashboard
    (dom/div :.learning-header
      (dom/h3 "📈 Your Learning Journey")
      (dom/div :.learning-stats
        (dom/div :.stat
          (dom/span :.stat-value total-insights)
          (dom/span :.stat-label "Total Insights"))))
    (dom/div :.patterns-grid
      (if (seq categories)
         (map (fn [[cat cnt]]
                (ui-pattern-card {:pattern/category cat
                                  :pattern/count cnt
                                  :pattern/recent? true}))
              (filter (fn [[cat _]] cat) categories))
        (dom/div :.patterns-empty
          "Start building to see your patterns emerge!")))))

;; ============================================================================
;; Smart Suggestions
;; ============================================================================

(defsc NextStepSuggestion
  "Suggestion for next action"
  [_this {:keys [next-stage reason action on-accept]}]
  (dom/div :.next-step-suggestion
    (dom/div :.suggestion-badge "🎯 Suggested Next Step")
    (dom/h4 action)
    (dom/p reason)
    (dom/div :.suggestion-actions
      (ui/button
        {:onClick on-accept
         :variant :primary}
        (str "Go to " (name (or next-stage :unknown))))
      (ui/button
        {:onClick #(js/alert "Suggestion dismissed")
         :variant :secondary}
        "Dismiss"))))

;; ============================================================================
;; ECA Chat Integration
;; ============================================================================

(defsc ECAChatPanel
  "Integrated ECA chat with project context"
  [this {:keys [context _prompt messages on-send]}]
  (let [input-text (or (comp/get-state this :chat-input) "")]
    (dom/div :.eca-chat-panel
      (dom/div :.eca-chat-header
        (dom/h3 "🤖 AI Assistant")
        (dom/p "Powered by ECA - Context-aware help"))
      
      ;; Context indicator
      (when context
        (dom/div :.eca-context
          (dom/span :.context-label "Context:")
          (dom/span :.context-value context)))
      
      ;; Messages
      (dom/div :.eca-messages
        (if (seq messages)
          (map-indexed
            (fn [idx msg]
              (dom/div {:key idx :className (str "eca-message eca-" (:role msg))}
                (dom/div :.message-content (:content msg))))
            messages)
          (dom/div :.eca-welcome
            (dom/p "Ask me anything about your project!")
            (dom/p :.eca-examples
              "Examples:"
              (dom/ul
                (dom/li "What am I missing in my empathy map?")
                (dom/li "How can I improve my value proposition?")
                (dom/li "Suggest features for my MVP"))))))
      
      ;; Input
      (dom/div :.eca-input-area
        (dom/textarea
          {:value (or input-text "")
           :onChange #(comp/set-state! this {:chat-input (.. % -target -value)})
           :placeholder "Ask AI assistant..."
           :rows 2})
        (ui/button
          {:onClick #(on-send input-text)
           :disabled (empty? (str/trim (or input-text "")))
           :variant :primary}
          "Send")))))

;; ============================================================================
;; Wisdom Sidebar
;; ============================================================================

(defsc WisdomSidebar
  "Combined wisdom panel with insights, suggestions, and chat"
  [this {:keys [insights suggestions templates show-chat? eca-prompt]}]
  {:query [{:wisdom/insights (comp/get-query AIInsight)}
           :wisdom/next-stage
           :wisdom/reason
           :wisdom/action
           {:wisdom/templates (comp/get-query TemplateCard)}
           :wisdom/show-chat?
           :wisdom/eca-prompt]
   :ident (fn [] [:component/id :wisdom-sidebar])
   :initial-state (fn [_] {:wisdom/show-chat? false})}
   (dom/div :.wisdom-page-sidebar
    ;; Header with toggle
    (dom/div :.wisdom-header
      (dom/h3 "✨ Wisdom")
      (dom/button
        {:onClick #(m/toggle! this :wisdom/show-chat?)
         :className (str "btn btn-sm " (when show-chat? "active"))}
        "🤖 Chat"))
    
    (if show-chat?
      ;; ECA Chat mode
      (dom/div :.wisdom-content
        (ui/component ECAChatPanel
          {:context eca-prompt
           :on-send (fn [text]
                     ;; Send to ECA via WebSocket or API
                     (js/console.log "Sending to ECA:" text))}))
      
      ;; Insights mode
      (dom/div :.wisdom-content
        ;; Next step suggestion (if available)
        (when suggestions
          (ui/component NextStepSuggestion suggestions))
        
        ;; AI Insights
        (when (seq insights)
          (dom/div :.wisdom-section
            (dom/h4 "AI Insights")
            (map ui-ai-insight (filter :insight/type insights))))

        ;; Template quick access
        (when (seq templates)
          (dom/div :.wisdom-section
            (dom/h4 "Quick Start Templates")
            (dom/div :.template-mini-list
              (map ui-template-card (take 3 (filter :template/key templates))))))
        
        ;; Generate context button
        (dom/div :.wisdom-actions
          (ui/button
            {:onClick #(comp/transact! this [(generate-eca-prompt {})])
             :variant :secondary}
            "🤖 Ask AI About This"))))))

;; ============================================================================
;; Export
;; ============================================================================

(def sidebar WisdomSidebar)
(def insights InsightsPanel)
(def templates TemplateLibrary)
(def chat ECAChatPanel)
(def learning LearningDashboard)
