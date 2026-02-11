(ns ouroboros.frontend.ui.components
  "Reusable UI components"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Markdown Rendering
;; ============================================================================

(defn- process-inline
  "Convert inline markdown syntax to HTML.
   Handles: bold, italic, bold+italic, inline code, links, strikethrough."
  [text]
  (when (seq text)
    (-> text
        ;; Inline code first (protect from other transforms)
        (str/replace #"`([^`]+)`" "<code>$1</code>")
        ;; Links [text](url)
        (str/replace #"\[([^\]]+)\]\(([^)]+)\)" "<a href=\"$2\" target=\"_blank\" rel=\"noopener\">$1</a>")
        ;; Bold+italic
        (str/replace #"\*\*\*(.+?)\*\*\*" "<strong><em>$1</em></strong>")
        ;; Bold
        (str/replace #"\*\*(.+?)\*\*" "<strong>$1</strong>")
        ;; Italic
        (str/replace #"(?<![*])\*([^*]+?)\*(?![*])" "<em>$1</em>")
        ;; Strikethrough
        (str/replace #"~~(.+?)~~" "<del>$1</del>"))))

(defn- classify-line
  "Classify a markdown line by its type."
  [line]
  (cond
    (re-matches #"^#{1,4}\s+.+" line) :heading
    (re-matches #"^>\s*.*" line) :blockquote
    (re-matches #"^```.*" line) :code-fence
    (re-matches #"^---+$|^\*\*\*+$|^___+$" line) :hr
    (re-matches #"^\d+\.\s+.+" line) :ol-item
    (re-matches #"^[-*+]\s+.+" line) :ul-item
    (re-matches #"^\|.+\|$" line) :table-row
    (re-matches #"^\s*$" line) :blank
    :else :text))

(defn markdown->html
  "Markdown to HTML converter with proper block structure.
   Supports: headers, bold, italic, links, lists (ul/ol), blockquotes,
   code blocks, inline code, tables, horizontal rules, paragraphs."
  [text]
  (when (seq text)
    (let [lines (str/split-lines text)
          out (volatile! [])
          ;; Mutable state for tracking block context
          state (volatile! {:in-code false :in-ul false :in-ol false
                            :in-blockquote false :in-table false :in-p false})
          emit! (fn [s] (vswap! out conj s))
          close-open-blocks!
          (fn []
            (let [s @state]
              (when (:in-p s) (emit! "</p>") (vswap! state assoc :in-p false))
              (when (:in-ul s) (emit! "</ul>") (vswap! state assoc :in-ul false))
              (when (:in-ol s) (emit! "</ol>") (vswap! state assoc :in-ol false))
              (when (:in-blockquote s) (emit! "</blockquote>") (vswap! state assoc :in-blockquote false))
              (when (:in-table s) (emit! "</table>") (vswap! state assoc :in-table false))))]
      (doseq [line lines]
        (let [s @state
              line-type (if (:in-code s) :code-content (classify-line line))]
          (case line-type
            ;; Code fence toggle
            :code-fence
            (if (:in-code s)
              (do (emit! "</code></pre>") (vswap! state assoc :in-code false))
              (do (close-open-blocks!)
                  (emit! "<pre><code>") (vswap! state assoc :in-code true)))

            ;; Inside code block - emit raw (escaped)
            :code-content
            (emit! (-> line
                       (str/replace "&" "&amp;")
                       (str/replace "<" "&lt;")
                       (str/replace ">" "&gt;")
                       (str "\n")))

            ;; Headings
            :heading
            (let [[_ hashes content] (re-matches #"^(#{1,4})\s+(.+)" line)
                  level (count hashes)
                  tag (str "h" (min (inc level) 5))]
              (close-open-blocks!)
              (emit! (str "<" tag ">" (process-inline content) "</" tag ">")))

            ;; Horizontal rule
            :hr
            (do (close-open-blocks!)
                (emit! "<hr>"))

            ;; Blockquote
            :blockquote
            (let [content (str/replace line #"^>\s*" "")]
              (when-not (:in-blockquote s)
                (close-open-blocks!)
                (vswap! state assoc :in-blockquote true)
                (emit! "<blockquote>"))
              (emit! (str (process-inline content) " ")))

            ;; Unordered list item
            :ul-item
            (let [content (str/replace line #"^[-*+]\s+" "")]
              (when-not (:in-ul s)
                (close-open-blocks!)
                (vswap! state assoc :in-ul true)
                (emit! "<ul>"))
              (emit! (str "<li>" (process-inline content) "</li>")))

            ;; Ordered list item
            :ol-item
            (let [content (str/replace line #"^\d+\.\s+" "")]
              (when-not (:in-ol s)
                (close-open-blocks!)
                (vswap! state assoc :in-ol true)
                (emit! "<ol>"))
              (emit! (str "<li>" (process-inline content) "</li>")))

            ;; Table row
            :table-row
            (let [cells (->> (str/split line #"\|")
                             (remove str/blank?)
                             (map str/trim))]
              ;; Skip separator rows like |---|---|
              (when-not (every? #(re-matches #"[-:]+\s*" %) cells)
                (when-not (:in-table s)
                  (close-open-blocks!)
                  (vswap! state assoc :in-table true)
                  (emit! "<table>"))
                (let [is-first-row (not (some #(str/includes? % "<tr>") @out))
                      tag (if is-first-row "th" "td")]
                  (emit! "<tr>")
                  (doseq [cell cells]
                    (emit! (str "<" tag ">" (process-inline cell) "</" tag ">")))
                  (emit! "</tr>"))))

            ;; Blank line - close paragraphs
            :blank
            (when (:in-p s)
              (emit! "</p>")
              (vswap! state assoc :in-p false))

            ;; Regular text - wrap in paragraph
            :text
            (do
              (when (or (:in-ul s) (:in-ol s) (:in-blockquote s) (:in-table s))
                (close-open-blocks!))
              (when-not (:in-p s)
                (emit! "<p>")
                (vswap! state assoc :in-p true))
              (emit! (str (process-inline line) " "))))))
      ;; Close any remaining open blocks
      (close-open-blocks!)
      (when (:in-code @state)
        (emit! "</code></pre>"))
      (str/join @out))))

(defn render-markdown
  "Render markdown text as DOM elements with proper styling."
  ([text class-name]
   (let [html (markdown->html text)]
     (dom/div {:className (str "markdown-content " class-name)
               :dangerouslySetInnerHTML {:__html html}})))
  ([text]
   (render-markdown text "")))

(defn extract-plain-text-from-markdown
  "Extract plain text summary from markdown for card preview.
   Strips markdown syntax and returns first sentence or short excerpt."
  ([text max-length]
   (let [max-len (or max-length 120)
         plain-text (-> text
                        ;; Remove headers
                        (str/replace #"(?m)^#+\s*" "")
                        ;; Remove bold/italic markers
                        (str/replace #"\*\*\*" "")
                        (str/replace #"\*\*" "")
                        (str/replace #"\*" "")
                        ;; Remove code markers
                        (str/replace #"`" "")
                        ;; Remove blockquote markers
                        (str/replace #"^>\s*" "")
                        ;; Remove table markers
                        (str/replace #"\|" " ")
                        ;; Remove list markers
                        (str/replace #"^[-\*\d\.]\s*" "")
                        ;; Collapse multiple spaces
                        (str/replace #"\s+" " ")
                        ;; Trim
                        str/trim)]
     (if (> (count plain-text) max-len)
       (str (subs plain-text 0 max-len) "...")
       plain-text)))
  ([text]
   (extract-plain-text-from-markdown text 120)))

;; ============================================================================
;; Button
;; ============================================================================

(defn button
  "Button component"
  [{:keys [on-click variant disabled className]} & children]
  (let [variant-class (case variant
                        :secondary "btn-secondary"
                        :danger "btn-danger"
                        "btn-primary")]
    (apply dom/button
           {:className (str "btn " variant-class " " className)
            :disabled disabled
            :onClick on-click}
           children)))

;; ============================================================================
;; Error Display Component
;; ============================================================================

(defsc ErrorDisplay [this props]
  {:query [:message]
   :ident (fn [] [:component/id :error-display])
   :initial-state (fn [_] {:message nil})}
  (let [message (:message props)
        retry-fn (:on-retry props)]
    (dom/div :.error-state
             (dom/div :.error-state-icon "⚠️")
             (dom/div :.error-state-message message)
             (when retry-fn
               (button
                {:on-click retry-fn
                 :variant :primary}
                "Try Again")))))

;; ============================================================================
;; Connection Status Component
;; ============================================================================

(defn connection-status [{:keys [connected?]}]
  (dom/div {:className (str "connection-status " (if connected? "connected" "disconnected"))}
           (dom/span :.connection-indicator)
           (dom/span :.connection-text
                     (if connected? "Live" "Offline"))))

;; ============================================================================
;; Layout Components
;; ============================================================================

(defn navbar
  "Navigation bar component"
  [{:keys [active-route on-navigate on-toggle-chat chat-open?]}]
  (let [is? (fn [& routes] (some #(= active-route %) routes))]
    (dom/nav :.navbar
             (dom/a :.navbar-brand
                    {:onClick #(on-navigate "dashboard")}
                    "🐍 Ouroboros")
             (dom/ul :.navbar-nav
                      (dom/li (dom/a {:className (str "nav-link" (when (is? "dashboard") " active"))
                                      :onClick #(on-navigate "dashboard")}
                                     "Dashboard"))
                      (dom/li (dom/a {:className (str "nav-link" (when (is? "projects" "project") " active"))
                                      :onClick (fn [_]
                                                 (let [ws-state (when-let [sa @ws/app-state-atom] @sa)
                                                       project-id (get-in ws-state [:workspace/project :project/id])
                                                       encoded (when project-id (str/replace (str project-id) "/" "~"))]
                                                   (if encoded
                                                     (on-navigate ["project" encoded])
                                                     (on-navigate "projects"))))}
                                     "Project"))
                      (dom/li (dom/a {:className (str "nav-link" (when (is? "wisdom") " active"))
                                      :onClick #(on-navigate "wisdom")}
                                     "Wisdom"))
                      (dom/li (dom/a {:className (str "nav-link" (when (is? "telemetry") " active"))
                                       :onClick #(on-navigate "telemetry")}
                                      "Telemetry")))
             ;; Chat toggle button
             (dom/button
              {:className (str "chat-toggle-btn " (when chat-open? "chat-toggle-active"))
               :onClick on-toggle-chat
               :title "AI Assistant (Ctrl+/)"}
              (dom/span :.chat-toggle-icon "🤖")
              (dom/span :.chat-toggle-label "AI Chat")))))

(defn main-layout
  "Main application layout"
  [{:keys [navbar-content children]}]
  (dom/div :.app-container
           navbar-content
           (dom/main :.main-content
                     children)))

;; ============================================================================
;; Card Components
;; ============================================================================

(defn metric-card
  "Display a metric with label"
  [{:keys [value label className key]}]
  (dom/div {:className (str "metric-card " className)
            :key (or key label)}
           (dom/div {:className (str "metric-value " className)} value)
           (dom/div :.metric-label label)))

(defn card
  "Card container with optional title"
  [{:keys [title className actions key]} & children]
  (apply dom/div {:className (str "card " className) :key key}
         (when (or title actions)
           (dom/div :.card-header
                    (when title
                      (dom/h2 :.card-title title))
                    (when actions
                      (dom/div :.card-actions actions))))
         children))

;; ============================================================================
;; Status Components
;; ============================================================================

(defn status-badge
  "Status indicator badge"
  [{:keys [ok? text]}]
  (dom/span {:className (str "status-badge " (if ok? "status-ok" "status-error"))}
            (dom/span :.status-indicator)
            text))

(defn loading
  "Loading spinner"
  []
  (dom/div :.loading
           (dom/div :.spinner)
           "Loading..."))

(defn empty-state
  "Empty state message"
  [{:keys [icon message]}]
  (dom/div :.empty-state
           (dom/div :.empty-state-icon (or icon "Empty"))
           (dom/div message)))

(defn error-state
  "Error state message with optional retry"
  [{:keys [message] :as props}]
  (let [retry-fn (:on-retry props)]
    (dom/div :.error-state
             (dom/div :.error-state-icon "⚠️")
             (dom/div :.error-state-message message)
             (when retry-fn
               (button
                {:on-click retry-fn
                 :variant :primary}
                "Try Again")))))

;; ============================================================================
;; Data Table
;; ============================================================================

(defn- safe-render-value
  "Ensure a value is safe to render in React (convert keywords/symbols to strings)"
  [v]
  (cond
    (keyword? v) (name v)
    (symbol? v) (str v)
    (nil? v) ""
    :else v))

(defn data-table
  "Generic data table"
  [{:keys [columns rows empty-message on-row-click]}]
  (if (seq rows)
    (dom/div :.table-container
             (dom/table :.data-table
                        (dom/thead
                         (apply dom/tr
                                (for [[idx col] (map-indexed vector columns)]
                                  (dom/th {:key (or (some-> (:key col) name) (str "col-" idx))}
                                          (:label col)))))
                        (apply dom/tbody
                               (for [[idx row] (map-indexed vector rows)]
                                 (apply dom/tr {:key (str (or (:id row) idx))
                                                :className (when on-row-click "data-row-clickable")
                                                :onClick (when on-row-click
                                                           (fn [_] (on-row-click row)))}
                                        (for [[cidx col] (map-indexed vector columns)]
                                          (let [key (:key col)
                                                value (get row key)
                                                formatter (:format col identity)
                                                rendered (formatter value row)]
                                            (dom/td {:key (or (some-> key name) (str "cell-" cidx))}
                                                    (safe-render-value rendered))))))))
             (empty-state {:message (or empty-message "No data available")}))))

;; ============================================================================
;; Code Block
;; ============================================================================

(defn code-block
  "Display code/data"
  [{:keys [content]}]
  (dom/pre :.code-block
           (dom/code (str content))))

;; ============================================================================
;; Flywheel Steps - Product Development Progression
;; ============================================================================

(def flywheel-steps
  "The 4-phase product development flywheel"
  [{:key :empathy
    :label "Empathy Map"
    :icon "🧠"
    :route "empathy"
    :description "Understand your customer deeply"}
   {:key :valueprop
    :label "Value Prop"
    :icon "💎"
    :route "valueprop"
    :description "Map your product to their needs"}
   {:key :mvp
    :label "MVP"
    :icon "🚀"
    :route "mvp"
    :description "Define what to build first"}
   {:key :canvas
    :label "Lean Canvas"
    :icon "📊"
    :route "canvas"
    :description "Complete business model"}])

(defn flywheel-indicator
  "Compact 4-phase product development stepper.
   Shows progression as numbered circles connected by lines.
   
   Props:
   - current-step: keyword (:empathy, :valueprop, :mvp, :canvas)
   - project-id: encoded project id for navigation
   - on-navigate: fn called with route segment on click"
  [{:keys [current-step project-id on-navigate]}]
  (let [step-order [:empathy :valueprop :mvp :canvas]
        current-idx (.indexOf step-order current-step)]
    (dom/nav :.fw-stepper
             {:aria-label "Product development progress"}
             (for [[idx step] (map-indexed vector flywheel-steps)]
               (let [is-current? (= (:key step) current-step)
                     is-past? (< idx current-idx)
                     is-future? (> idx current-idx)
                     state (cond is-current? "current"
                                 is-past? "done"
                                 :else "pending")]
                 (dom/div {:key (name (:key step))
                           :className (str "fw-node fw-" state)}
                          ;; Connector line (except before first)
                          (when (> idx 0)
                            (dom/div {:className (str "fw-line"
                                                      (when (or is-past? is-current?) " fw-line-done"))}))
                          ;; Clickable step
                          (dom/button {:className "fw-dot"
                                       :onClick (when on-navigate
                                                  #(on-navigate (:route step)))
                                       :title (:description step)
                                       :aria-current (when is-current? "step")}
                                      (if is-past?
                                        (dom/svg {:width 12 :height 12 :viewBox "0 0 12 12"
                                                  :className "fw-check-svg"}
                                                 (dom/path {:d "M2 6l3 3 5-5"
                                                            :fill "none"
                                                            :stroke "currentColor"
                                                            :strokeWidth "2"
                                                            :strokeLinecap "round"
                                                            :strokeLinejoin "round"}))
                                        (dom/span :.fw-num (str (inc idx)))))
                          ;; Label
                          (dom/span :.fw-label (:label step))))))))

;; ============================================================================
;; Wisdom Tips - Contextual guidance per builder phase
;; ============================================================================

(def wisdom-tips
  "Fallback contextual wisdom tips shown while ECA loads or is unavailable.
   ECA replaces these with personalized, project-aware guidance."
  {:empathy
   {:title "Empathy Phase"
    :tagline "Walk in their shoes before you build."
    :tips ["Start by observing real users"
           "Look for contradictions between what people say and do"
           "Focus on pains they have accepted as normal"]
    :next-hint "Your empathy insights will directly feed the Value Proposition."}
   :valueprop
   {:title "Value Proposition Phase"
    :tagline "Connect what they need to what you offer."
    :tips ["Start with customer jobs, not your product features"
           "Rank pains by severity"
           "A great pain reliever beats a nice-to-have gain creator"]
    :next-hint "Your value fit will guide what to build in the MVP."}
   :mvp
   {:title "MVP Phase"
    :tagline "Build the smallest thing that proves your value."
    :tips ["Cut features until it hurts, then cut one more"
           "Focus on ONE user, ONE problem, ONE solution"
           "Define success metrics BEFORE you build"]
    :next-hint "Your MVP learnings will validate the business model."}
    :canvas
   {:title "Lean Canvas Phase"
    :tagline "Connect all the dots into a business model."
    :tips ["Fill in Problem and Customer Segments first"
           "Your Unfair Advantage is the hardest box"
           "Key Metrics: pick 1-3 numbers that prove traction"]
    :next-hint "Iterate: go back to Empathy with new learnings!"}})

(defn wisdom-panel-body
  "Core wisdom content for a phase. Can be embedded in pages or sidebars.
   Cache-first UX: shows cached/default content instantly, silent ECA refresh
   in background. No visible 'Updating...' badge -- content silently swaps
   when first streaming token arrives.

   Props:
   - phase: keyword (:empathy, :valueprop, :mvp, :canvas)
   - project-id: string (for ECA context)"
  [{:keys [phase project-id]}]
  (let [fallback (get wisdom-tips phase)
        ;; Read ECA wisdom state from app state atom
        sa @ws/app-state-atom
        wisdom-state (when sa (get-in @sa [:wisdom/id :global]))
        eca-content (:wisdom/content wisdom-state)
        eca-loading? (:wisdom/loading? wisdom-state)
        eca-streaming? (:wisdom/streaming? wisdom-state)
        eca-refreshing? (:wisdom/refreshing? wisdom-state)
        request-type (or (:wisdom/request-type wisdom-state) :tips)
        has-eca-content? (and eca-content (seq eca-content))
        ;; Look up cache for this phase+request-type (includes defaults)
        cached-content (when sa
                         (get-in @sa [:wisdom/cache [phase request-type]]))
        has-cached? (and cached-content (seq cached-content))
        ;; Read auto-insight state
        auto-insight (when (and sa project-id)
                       (get-in @sa [:auto-insight/id project-id]))
        auto-insight-content (:auto-insight/content auto-insight)
        auto-insight-loading? (:auto-insight/loading? auto-insight)
        auto-insight-streaming? (:auto-insight/streaming? auto-insight)
        has-auto-insight? (and auto-insight-content (seq auto-insight-content))
        ;; Request type tabs
        request-types [{:key :tips :label "Tips" :icon "💡"}
                       {:key :analysis :label "Analysis" :icon "🔍"}
                       {:key :suggestions :label "Ideas" :icon "🎯"}]]
    ;; On first render: show cache instantly, fire silent ECA refresh
    (when (and project-id (not eca-loading?) (not eca-streaming?) (not eca-refreshing?)
               (not has-eca-content?))
      (if has-cached?
        ;; Cache exists: display it, fire silent refresh
        (do
          (when sa
            (swap! sa assoc-in [:wisdom/id :global :wisdom/content] cached-content))
          (ws/request-wisdom! project-id phase :tips {:silent? true}))
        ;; No cache at all (shouldn't happen with defaults): normal request
        (ws/request-wisdom! project-id phase :tips)))
    (dom/div :.wisdom-panel-body
      ;; Request type tabs
             (when project-id
               (dom/div :.wisdom-tabs
                        (for [{:keys [key label icon]} request-types]
                          (let [tab-cache (when sa
                                           (get-in @sa [:wisdom/cache [phase key]]))]
                            (dom/button
                             {:key (name key)
                              :className (str "wisdom-tab"
                                              (when (= request-type key) " active")
                                              (when (seq tab-cache) " has-cache"))
                              :onClick (fn []
                                         (let [tab-cached (when sa
                                                            (get-in @sa [:wisdom/cache [phase key]]))]
                                           (if (seq tab-cached)
                                             ;; Cache hit: show cached content instantly, silent ECA refresh
                                             (do
                                               (when sa
                                                 (swap! sa
                                                        (fn [s]
                                                          (-> s
                                                              (assoc-in [:wisdom/id :global :wisdom/content] tab-cached)
                                                              (assoc-in [:wisdom/id :global :wisdom/request-type] key)))))
                                               (ws/request-wisdom! project-id phase key {:silent? true}))
                                             ;; No cache: normal request with loading UI
                                             (do
                                               (when sa
                                                 (swap! sa assoc-in [:wisdom/id :global :wisdom/content] ""))
                                               (ws/request-wisdom! project-id phase key)))))
                              :disabled (and eca-loading? (= request-type key))}
                             (dom/span :.wisdom-tab-icon icon)
                             (dom/span label))))))
      ;; Auto-insight notification (proactive, from builder completion)
             (when (or has-auto-insight? auto-insight-loading?)
               (dom/div :.wisdom-auto-insight
                        (dom/div :.wisdom-auto-insight-header
                                 (dom/span :.wisdom-auto-insight-icon "🎯")
                                 (dom/span :.wisdom-auto-insight-title "Builder Insight"))
                        (if has-auto-insight?
                          (dom/div :.wisdom-auto-insight-content
                                   (render-markdown auto-insight-content "wisdom-eca-text")
                                   (when auto-insight-streaming?
                                     (dom/span :.wisdom-typing-cursor)))
                          (when auto-insight-loading?
                            (dom/div :.wisdom-loading
                                     (dom/div :.wisdom-loading-dots
                                              (dom/span :.dot)
                                              (dom/span :.dot)
                                              (dom/span :.dot))
                                     (dom/span "Analyzing your work..."))))))
      ;; Main content area (scrollable)
             (dom/div :.wisdom-content-area
                      (cond
          ;; Live or cached content visible (may be streaming or complete)
                        has-eca-content?
                        (dom/div :.wisdom-eca-content
                                 (render-markdown eca-content "wisdom-eca-text")
                                 (when eca-streaming?
                                   (dom/span :.wisdom-typing-cursor)))

          ;; Loading with no content at all - show loading dots + fallback tips
                        eca-loading?
                        (dom/div :.wisdom-fallback
                                 (dom/div :.wisdom-loading
                                          (dom/div :.wisdom-loading-dots
                                                   (dom/span :.dot)
                                                   (dom/span :.dot)
                                                   (dom/span :.dot))
                                          (dom/span "AI is thinking..."))
                                 (dom/div :.wisdom-tips-list
                                          (for [tip (:tips fallback)]
                                            (dom/div {:key tip :className "wisdom-tip-item"}
                                                     (dom/span :.wisdom-bullet "->")
                                                     (dom/span tip)))))

          ;; Nothing at all - static fallback tips
                        :else
                        (dom/div :.wisdom-fallback
                                 (dom/div :.wisdom-tips-list
                                          (for [tip (:tips fallback)]
                                            (dom/div {:key tip :className "wisdom-tip-item"}
                                                     (dom/span :.wisdom-bullet "->")
                                                     (dom/span tip)))))))
      ;; Next hint
             (when-let [next-hint (:next-hint fallback)]
               (dom/div :.wisdom-next-hint
                        (dom/span :.wisdom-hint-icon ">>")
                        (dom/span next-hint)))
      ;; Refresh button (always visible when there's content or not loading)
             (when (and project-id (or has-eca-content? (not eca-loading?)))
               (dom/div :.wisdom-actions
                        (dom/button
                         {:className "wisdom-refresh-btn"
                          :onClick (fn []
                                     (when sa
                                       (swap! sa assoc-in [:wisdom/id :global :wisdom/content] ""))
                                     (ws/request-wisdom! project-id phase request-type))
                          :disabled (or eca-loading? eca-streaming?)}
                         "Refresh"))))))
(defn wisdom-sidebar
  "Contextual wisdom tips panel for the current builder phase.
   Fetches ECA-powered tips on open, shows fallback tips while loading.
   Also displays auto-insights from builder completion.
    
   Props:
   - phase: keyword (:empathy, :valueprop, :mvp, :canvas)
   - show?: boolean
   - project-id: string (for ECA context)"
  [{:keys [phase show? on-close project-id]}]
  (when show?
    (let [fallback (get wisdom-tips phase)]
      (dom/div :.wisdom-sidebar
               (dom/div :.wisdom-sidebar-header
                        (dom/div :.wisdom-sidebar-title
                                 (dom/span :.wisdom-sidebar-icon "💡")
                                 (dom/div
                                  (dom/h3 (:title fallback))
                                  (dom/p :.wisdom-tagline (:tagline fallback))))
                        (dom/button {:className "wisdom-close-btn"
                                     :onClick on-close
                                     :aria-label "Close wisdom panel"}
                                    "\u00D7"))
               (wisdom-panel-body {:phase phase :project-id project-id})))))
