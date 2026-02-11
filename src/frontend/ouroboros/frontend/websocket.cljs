(ns ouroboros.frontend.websocket
  "WebSocket client for real-time updates"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.application :as app]))

;; Forward declarations
(declare connected? stop-ping-loop! send!)

;; ============================================================================
;; App State Reference
;; ============================================================================

(defonce app-state-atom (atom nil))
(defonce render-callback (atom nil))
(defonce navigate-callback (atom nil))

;; ============================================================================
;; Wisdom Cache Persistence (localStorage)
;; ============================================================================

(def ^:private wisdom-cache-key "ouroboros.wisdom-cache")

(defn- load-wisdom-cache
  "Load wisdom cache from localStorage. Returns map or nil."
  []
  (try
    (when-let [raw (.getItem js/localStorage wisdom-cache-key)]
      (let [parsed (js/JSON.parse raw)
            m (js->clj parsed :keywordize-keys true)]
        ;; Convert string keys back to [phase request-type] vectors
        ;; Stored as {"empathy:tips" "content"} -> {[:empathy :tips] "content"}
        (into {}
              (keep (fn [[k v]]
                      (let [parts (str/split (name k) #":")]
                        (when (= 2 (count parts))
                          [[(keyword (first parts)) (keyword (second parts))] v]))))
              m)))
    (catch :default _e nil)))

(defn- save-wisdom-cache!
  "Persist wisdom cache to localStorage."
  [cache-map]
  (try
    ;; Convert [phase request-type] keys to strings: "empathy:tips"
    (let [serializable (into {}
                             (map (fn [[[phase req-type] content]]
                                    [(str (name phase) ":" (name req-type)) content]))
                             cache-map)]
      (.setItem js/localStorage wisdom-cache-key
                (js/JSON.stringify (clj->js serializable))))
    (catch :default _e nil)))

;; ============================================================================
;; Default Wisdom Cache (pre-fill for instant display)
;; ============================================================================

(def default-wisdom-cache
  "Pre-filled wisdom content for instant display before ECA personalizes.
   Keyed by [phase request-type] vectors matching the cache structure.
   Provides genuinely useful content so first-time users see value immediately."
  {;; -- Empathy Phase --
   [:empathy :tips]
   "## Empathy Tips

1. **Start with observation, not assumptions** -- Watch how your target users currently solve this problem. What workarounds do they use?

2. **Listen for emotions, not features** -- When users say \"it's fine,\" dig deeper. The strongest opportunities hide behind accepted frustrations.

3. **Map the full journey** -- Don't focus only on the core task. Look at what happens before and after -- setup, cleanup, sharing results.

4. **Separate what people say from what they do** -- Interview data and behavioral data often contradict. Both are valuable signals.

5. **Find the non-consumers** -- Who *should* be using a solution but isn't? They often reveal unmet needs that current users have normalized."

   [:empathy :analysis]
   "## Empathy Analysis

### What to look for

Your empathy map captures four dimensions of your user's experience: what they **say**, **think**, **do**, and **feel**. The most valuable insights come from contradictions between these dimensions.

### Common gaps at this stage

- **Too solution-focused** -- If your pains and gains read like feature requests, go back to the human level. What job is the user trying to get done?
- **Single persona trap** -- If all your insights describe one type of user, you may be missing important segments. Try mapping a second persona.
- **Missing emotional context** -- Facts about user behavior are useful, but understanding *why* users feel frustrated, anxious, or delighted is what drives product decisions.

### Strengthening your empathy work

The best empathy maps are built from real conversations, not assumptions. Even 3-5 user interviews can dramatically shift your understanding of the problem space."

   [:empathy :suggestions]
   "## Ideas to Explore

1. **\"What's the most frustrating part of your current workflow?\"** -- Ask this to real users. The answer often reveals the core pain point your product should address.

2. **Shadow a user for 30 minutes** -- Watch someone go through their current process without interrupting. Note where they hesitate, backtrack, or express frustration.

3. **Map competing alternatives** -- List every way users currently solve this problem (including doing nothing). What does each alternative get right?

4. **Write a \"day in the life\" narrative** -- Describe a typical day for your target user. Where does your problem space fit into their priorities?"

   ;; -- Value Proposition Phase --
   [:valueprop :tips]
   "## Value Proposition Tips

1. **Start with jobs, not features** -- What is your customer trying to accomplish? Frame everything around their goal, not your solution.

2. **Rank pains by severity** -- Not all problems are equal. A pain that costs users time every day matters more than an occasional annoyance.

3. **Pain relievers beat gain creators** -- Removing a real frustration is more compelling than adding a nice-to-have improvement.

4. **Test your fit statement** -- Can you complete this sentence clearly? \"My product helps [customer] who want to [job] by [value] unlike [alternative].\"

5. **Validate with real language** -- Use the exact words your users use to describe their problems. If your value prop doesn't resonate in their vocabulary, it won't land."

   [:valueprop :analysis]
   "## Value Proposition Analysis

### Evaluating your fit

A strong value proposition connects three things: a specific customer segment, a clearly defined job-to-be-done, and a differentiated way you deliver value. Weakness in any leg makes the whole proposition fragile.

### Common gaps at this stage

- **Feature list disguised as value** -- If your gain creators are just product features, translate them into outcomes. \"Dashboard\" becomes \"see all metrics in one place without switching tools.\"
- **Weak differentiation** -- If a competitor could make the same claim, your proposition isn't specific enough. What can only *you* deliver?
- **Mismatched severity** -- The pains you're relieving should match the gains you're creating in intensity. Solving a minor annoyance with a complex solution won't work.

### Next steps

Validate your value proposition by sharing it with 3-5 potential users. If they immediately understand what you do and why it matters to them, you have product-market fit signal."

   [:valueprop :suggestions]
   "## Ideas to Explore

1. **Run a \"fake door\" test** -- Create a simple landing page describing your value proposition. Measure how many people click \"Sign Up\" or \"Learn More.\"

2. **Compare your top 3 pains against competitors** -- For each pain you address, how do existing solutions handle it? Where is the biggest gap?

3. **Try the \"5 Whys\" on your primary gain** -- Why does your user want this gain? Keep asking why to find the deeper motivation driving demand.

4. **Flip your proposition** -- What if you targeted the opposite user segment? Sometimes the best market is the one you haven't considered."

   ;; -- MVP Phase --
   [:mvp :tips]
   "## MVP Tips

1. **Cut features until it hurts, then cut one more** -- An MVP tests a hypothesis, not a product. Every extra feature delays learning.

2. **Define success metrics before you build** -- What number proves your core assumption? If you can't measure it, you can't learn from it.

3. **Focus on ONE user, ONE problem, ONE solution** -- Breadth comes later. Depth of learning comes from constraint.

4. **Time-box your build** -- Set a deadline (2-4 weeks) and ship whatever you have. The goal is feedback, not perfection.

5. **Make the manual version first** -- Before automating anything, can you deliver the value manually? A concierge MVP tests demand without engineering investment."

   [:mvp :analysis]
   "## MVP Analysis

### Evaluating your MVP plan

A good MVP is the smallest experiment that tests your riskiest assumption. It should be buildable in weeks, not months, and produce clear evidence of whether your value proposition works.

### Common gaps at this stage

- **Building too much** -- If your MVP has more than 3 core features, you're probably building a v1, not an MVP. Strip it down to one core flow.
- **Unclear success criteria** -- \"Users like it\" is not a metric. Define specific, measurable outcomes: signups, retention rate, task completion time, willingness to pay.
- **Missing the risky assumption** -- What's the one thing that must be true for your product to succeed? Your MVP should test exactly that.

### De-risking your build

Consider what you can learn *without* building software. Mockups, prototypes, landing pages, and manual processes can all validate assumptions faster and cheaper than code."

   [:mvp :suggestions]
   "## Ideas to Explore

1. **Identify your riskiest assumption** -- What single belief, if wrong, would kill this project? Design your MVP to test exactly that.

2. **Map the critical user journey** -- Draw the 3-5 steps your user takes from first touch to achieving their goal. Which step has the highest drop-off risk?

3. **Create a \"wizard of oz\" prototype** -- Build the interface but handle the backend manually. Users get the experience; you get learning without engineering cost.

4. **Set a 2-week build deadline** -- What's the most valuable thing you could ship in 14 days? That constraint often reveals the true MVP."

   ;; -- Lean Canvas Phase --
   [:canvas :tips]
   "## Lean Canvas Tips

1. **Fill Problem and Customer Segments first** -- Everything else flows from a clear understanding of who you serve and what problem you solve.

2. **Your Unfair Advantage is the hardest box** -- It's not a feature. It's something that can't be easily copied: expertise, network, data, or community.

3. **Key Metrics: pick 1-3 numbers** -- What metrics prove traction? Choose leading indicators (activation, retention) over vanity metrics (page views, downloads).

4. **Revenue streams need specifics** -- \"Subscription\" isn't enough. What price point? What billing frequency? What's the willingness-to-pay evidence?

5. **Iterate, don't perfect** -- A lean canvas is a living document. Update it as you learn. The first version is always wrong -- that's the point."

   [:canvas :analysis]
   "## Lean Canvas Analysis

### Evaluating your canvas

A complete lean canvas should tell a coherent story: a specific customer has a specific problem, your solution delivers unique value, and there's a viable path to revenue and growth.

### Common gaps at this stage

- **Disconnected boxes** -- If your Problem doesn't clearly connect to your Solution, or your Channels don't reach your Customer Segments, the canvas has internal contradictions.
- **Generic advantages** -- \"Great UX\" or \"better technology\" are not unfair advantages. What do you have that competitors genuinely cannot replicate in 12 months?
- **Missing cost structure** -- Many canvases detail revenue but skip realistic cost projections. Include customer acquisition cost, infrastructure, and team costs.

### Strengthening your canvas

The most useful exercise is sharing your canvas with someone outside your team. If they can't explain your business model back to you in 30 seconds, simplify further."

   [:canvas :suggestions]
   "## Ideas to Explore

1. **Test your pricing** -- Ask 5 potential customers: \"Would you pay $X/month for this?\" Their hesitation (or enthusiasm) is more valuable than any spreadsheet model.

2. **Map your channel strategy** -- How will your first 100 users find you? Be specific: which communities, platforms, or networks will you target?

3. **Calculate your unit economics** -- What does it cost to acquire one customer? What's their lifetime value? If LTV < CAC, the business model needs work.

4. **Review a competitor's canvas** -- Fill out a lean canvas for your strongest competitor. Where are the gaps in their model that you can exploit?"})

;; ============================================================================
;; Content Cache Persistence (localStorage)
;; ============================================================================

(def ^:private content-cache-key "ouroboros.content-cache")

;; Content types worth caching (expensive ECA calls with stable results)
(def ^:private cacheable-content-types
  #{:templates :learning-categories :chat-suggestions :flywheel-guide})

(defn- load-content-cache
  "Load cached content/generated data from localStorage.
   Returns map of {content-type-kw -> data} or nil."
  []
  (try
    (when-let [raw (.getItem js/localStorage content-cache-key)]
      (let [parsed (js/JSON.parse raw)]
        (js->clj parsed :keywordize-keys true)))
    (catch :default _e nil)))

(defn- save-content-cache!
  "Persist content/generated data to localStorage.
   Only caches content types in `cacheable-content-types`."
  [generated-map]
  (try
    (let [to-cache (select-keys generated-map cacheable-content-types)]
      (when (seq to-cache)
        (.setItem js/localStorage content-cache-key
                  (js/JSON.stringify (clj->js to-cache)))))
    (catch :default _e nil)))

(defn set-app-state-atom!
  "Set the app state atom for merging data"
  [state-atom]
  (reset! app-state-atom state-atom)
  ;; Hydrate wisdom cache: defaults as base, localStorage overrides on top
  (let [persisted (or (load-wisdom-cache) {})
        merged (merge default-wisdom-cache persisted)]
    (swap! state-atom assoc :wisdom/cache merged))
  ;; Hydrate content cache from localStorage
  (when-let [cached-content (load-content-cache)]
    (swap! state-atom update :content/generated merge cached-content))
  ;; Hydrate learning categories cache from localStorage
  (try
    (when-let [raw (.getItem js/localStorage "ouroboros.learning-categories")]
      (let [parsed (js->clj (js/JSON.parse raw) :keywordize-keys true)]
        (when (seq (:categories parsed))
          (swap! state-atom
                 (fn [s]
                   (-> s
                       (assoc :learning/categories (:categories parsed))
                       (assoc :learning/total-insights (:total-insights parsed))))))))
    (catch :default _e nil)))

(defn set-render-callback!
  "Set a callback to trigger UI re-render after state mutation"
  [cb]
  (reset! render-callback cb))

(defn set-navigate-callback!
  "Set a callback for programmatic navigation: (fn [route-segments])"
  [cb]
  (reset! navigate-callback cb))

(defn schedule-render!
  "Schedule a UI re-render after direct state mutation.
   Public to allow timeout callbacks in other namespaces."
  []
  (when-let [cb @render-callback]
    (cb)))

;; ============================================================================
;; Connection State
;; ============================================================================

(defonce ws-connection (atom nil))
(defonce reconnect-timeout (atom nil))
(defonce reconnect-attempts (atom 0))
(defonce subscribed-topics (atom #{}))  ;; Track topics we're subscribed to

(def max-reconnect-attempts 5)
(def reconnect-delay-ms 3000)

;; ============================================================================
;; Message Handlers
;; ============================================================================

(defmulti handle-message :type)

(defmethod handle-message :default
  [message]
  (js/console.log "Unknown WebSocket message type:" (:type message))
  (js/console.log "Full message keys:" (keys message))
  (js/console.log "Full message:" (clj->js message)))

(defmethod handle-message :connected
  [{:keys [client-id timestamp]}]
  (js/console.log "WebSocket connected, client ID:" client-id))

(defmethod handle-message :telemetry/event
  [{:keys [data]}]
  (js/console.log "Telemetry event received:" data)
  (when-let [state-atom @app-state-atom]
    ;; Normalize WS event to same shape as page-load events:
    ;; {:event/id ..., :event/timestamp ..., :event/extra <raw-event>}
    (let [normalized {:event/id (or (:event/id data) (str (random-uuid)))
                      :event/timestamp (or (:event/timestamp data) (str (js/Date.)))
                      :event/extra data}]
      ;; Update shared state
      (swap! state-atom update-in [:telemetry/events] (fnil conj []) normalized)
      ;; Also update Fulcro normalized path for TelemetryPage component
      (swap! state-atom (fn [s]
                          (-> s
                              (update-in [:page/id :telemetry :telemetry/events]
                                         (fn [events]
                                           (vec (cons normalized (take 49 events)))))
                              (update-in [:page/id :telemetry :telemetry/total-events] (fnil inc 0))
                              (cond->
                                (= :tool/invoke (:event data))
                                (update-in [:page/id :telemetry :telemetry/tool-invocations] (fnil inc 0))
                                (false? (:success? data))
                                (update-in [:page/id :telemetry :telemetry/errors] (fnil inc 0)))))))
    (schedule-render!)))

(defmethod handle-message :builder-session/update
  [{:keys [session-id data]}]
  (js/console.log "Builder session update received:" session-id data)
  ;; Merge into app state - update session data
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:builder-session/data session-id] data)))

(defmethod handle-message :pong
  [{:keys [timestamp]}]
  ;; Keep connection alive
  nil)

;; ============================================================================
;; ECA Chat Message Handlers
;; ============================================================================

(defmethod handle-message :eca/chat-response
  [{:keys [text]}]
  ;; Complete (non-streaming) response from ECA
  (when-let [state-atom @app-state-atom]
    (let [messages (get-in @state-atom [:chat/id :global :chat/messages] [])
          idx (dec (count messages))]
      (when (and (>= idx 0)
                 (= :assistant (:role (nth messages idx)))
                 (:streaming? (nth messages idx)))
        (swap! state-atom
               (fn [s]
                 (-> s
                     (assoc-in [:chat/id :global :chat/messages idx]
                               {:role :assistant
                                :content text
                                :timestamp (js/Date.now)})
                     (assoc-in [:chat/id :global :chat/loading?] false))))
        (schedule-render!)))))

(defmethod handle-message :eca/chat-token
  [{:keys [token]}]
  ;; Streaming token from ECA
  (when-let [state-atom @app-state-atom]
    (let [messages (get-in @state-atom [:chat/id :global :chat/messages] [])
          idx (dec (count messages))]
      (when (and (>= idx 0)
                 (= :assistant (:role (nth messages idx))))
        (swap! state-atom update-in
               [:chat/id :global :chat/messages idx :content] str token)
        (schedule-render!)))))

(defmethod handle-message :eca/chat-done
  [_]
  ;; Streaming complete
  (when-let [state-atom @app-state-atom]
    (let [messages (get-in @state-atom [:chat/id :global :chat/messages] [])
          idx (dec (count messages))]
      (when (and (>= idx 0)
                 (= :assistant (:role (nth messages idx))))
        (swap! state-atom
               (fn [s]
                 (-> s
                     (update-in [:chat/id :global :chat/messages idx] dissoc :streaming?)
                     (assoc-in [:chat/id :global :chat/loading?] false))))
        (schedule-render!)))))

(defmethod handle-message :eca/chat-error
  [{:keys [error]}]
  ;; Chat error from ECA - mark last assistant message as errored
  (when-let [state-atom @app-state-atom]
    (let [messages (get-in @state-atom [:chat/id :global :chat/messages] [])
          idx (dec (count messages))]
      (when (and (>= idx 0)
                 (= :assistant (:role (nth messages idx))))
        (swap! state-atom
               (fn [s]
                 (-> s
                     (update-in [:chat/id :global :chat/messages idx]
                                assoc
                                :error? true
                                :streaming? false
                                :content (or error "Something went wrong. Click retry to try again."))
                     (assoc-in [:chat/id :global :chat/loading?] false))))
        (schedule-render!)))))

(defmethod handle-message :eca/debug-status
  [{:keys [enabled? error]}]
  (when error
    (js/console.warn "ECA debug toggle failed:" error))
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:page/id :telemetry :debug/enabled?] (boolean enabled?))
    (schedule-render!)))

;; ============================================================================
;; ECA Wisdom Message Handlers
;; ============================================================================

(defmethod handle-message :eca/wisdom-token
  [{:keys [token request-type]}]
  ;; Streaming wisdom token from ECA
  ;; During silent refresh: accumulate tokens in shadow buffer (no content flash)
  ;; Normal mode: append tokens directly to visible content
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (let [refreshing? (get-in s [:wisdom/id :global :wisdom/refreshing?])]
               (if refreshing?
                 ;; Silent refresh: accumulate in shadow buffer, keep cache visible
                 (update-in s [:wisdom/id :global :wisdom/shadow-content] str token)
                 ;; Normal token: append to visible content
                 (update-in s [:wisdom/id :global :wisdom/content] str token)))))
    ;; Only schedule render for non-silent tokens (silent ones are invisible)
    (when-not (get-in @state-atom [:wisdom/id :global :wisdom/refreshing?])
      (schedule-render!))))

(defmethod handle-message :eca/wisdom-done
  [{:keys [request-type]}]
  ;; Wisdom streaming complete - swap shadow buffer (if silent refresh) or finalize
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (let [refreshing? (get-in s [:wisdom/id :global :wisdom/refreshing?])
                   shadow (get-in s [:wisdom/id :global :wisdom/shadow-content])
                   ;; If we were refreshing silently, use shadow buffer; else use visible content
                   content (if (and refreshing? (seq shadow))
                             shadow
                             (get-in s [:wisdom/id :global :wisdom/content]))
                   phase (get-in s [:wisdom/id :global :wisdom/phase])
                   req-type (or (when (string? request-type) (keyword request-type))
                                (when (keyword? request-type) request-type)
                                (get-in s [:wisdom/id :global :wisdom/request-type]))]
               (cond-> (-> s
                           (assoc-in [:wisdom/id :global :wisdom/loading?] false)
                           (assoc-in [:wisdom/id :global :wisdom/streaming?] false)
                           (assoc-in [:wisdom/id :global :wisdom/refreshing?] false)
                           ;; Swap shadow content to visible (silent refresh complete)
                           (cond->
                             (and refreshing? (seq shadow))
                             (assoc-in [:wisdom/id :global :wisdom/content] shadow))
                           ;; Clear shadow buffer
                           (assoc-in [:wisdom/id :global :wisdom/shadow-content] nil))
                 ;; Cache the completed content keyed by [phase request-type]
                 (and phase req-type (seq content))
                 (assoc-in [:wisdom/cache [phase req-type]] content)))))
    ;; Persist cache to localStorage
    (save-wisdom-cache! (:wisdom/cache @state-atom))
    (schedule-render!)))

(defmethod handle-message :eca/wisdom-response
  [{:keys [text request-type]}]
  ;; Complete (non-streaming) wisdom response or error - cache and persist
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (let [phase (get-in s [:wisdom/id :global :wisdom/phase])
                   req-type (or (when (string? request-type) (keyword request-type))
                                (when (keyword? request-type) request-type)
                                (get-in s [:wisdom/id :global :wisdom/request-type]))]
               (cond-> (-> s
                           (assoc-in [:wisdom/id :global :wisdom/content] text)
                           (assoc-in [:wisdom/id :global :wisdom/loading?] false)
                           (assoc-in [:wisdom/id :global :wisdom/streaming?] false)
                           (assoc-in [:wisdom/id :global :wisdom/refreshing?] false))
                 ;; Cache the completed content
                 (and phase req-type (seq text))
                 (assoc-in [:wisdom/cache [phase req-type]] text)))))
    ;; Persist cache to localStorage
    (save-wisdom-cache! (:wisdom/cache @state-atom))
    (schedule-render!)))

;; ============================================================================
;; Flywheel Progress Message Handlers
;; ============================================================================

(defmethod handle-message :flywheel/progress
  [{:keys [project-id progress]}]
  ;; Flywheel progress data from backend
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:flywheel/progress project-id] progress)
    (schedule-render!)))

;; ============================================================================
;; Builder Data Persistence Handlers
;; ============================================================================

(defmethod handle-message :builder/data-saved
  [{:keys [session-id project-id builder-type]}]
  ;; Confirmation that builder data was persisted
  ;; Also refresh Kanban board if it's loaded
  (js/console.log "Builder data saved:" builder-type session-id)
  (when-let [state-atom @app-state-atom]
    (when (get-in @state-atom [:kanban/board project-id])
      ;; Re-request Kanban board to reflect updated builder data
      (send! {:type "kanban/board" :project-id project-id}))))

(defmethod handle-message :wisdom/template
  [{:keys [template-key data]}]
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:wisdom/template (keyword template-key)] data)
    (schedule-render!)))

;; ============================================================================
;; Kanban Board Message Handlers
;; ============================================================================

(defmethod handle-message :kanban/board
  [{:keys [project-id board]}]
  ;; Kanban board data from backend
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:kanban/board project-id] board)
    (schedule-render!)))

;; ============================================================================
;; Analytics Dashboard Message Handlers
;; ============================================================================

(defmethod handle-message :analytics/dashboard
  [{:keys [project-id data]}]
  ;; Real analytics data from backend (progress, health, funnel, prediction, time)
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:analytics/dashboard project-id] data)
    (schedule-render!)))

(defmethod handle-message :analytics/prediction-token
  [{:keys [token project-id]}]
  ;; Streaming prediction message token from ECA
  (when-let [state-atom @app-state-atom]
    (swap! state-atom update-in
           [:analytics/dashboard project-id :prediction-message] str token)
    (schedule-render!)))

(defmethod handle-message :analytics/prediction-done
  [{:keys [project-id]}]
  ;; Prediction streaming complete
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in
           [:analytics/dashboard project-id :prediction-streaming?] false)
    (schedule-render!)))

;; ============================================================================
;; Content Generation Message Handlers
;; ============================================================================

(defmethod handle-message :content/token
  [{:keys [token content-type]}]
  ;; Streaming content token from ECA
  (when-let [state-atom @app-state-atom]
    (swap! state-atom update-in
           [:content/streaming content-type] str token)
    (schedule-render!)))

(defmethod handle-message :content/generated
  [{:keys [content-type content]}]
  ;; Content generation complete
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:content/generated content-type] content)
                 (update :content/streaming dissoc content-type)
                 (assoc-in [:content/loading? content-type] false))))
    ;; Persist to localStorage for instant load on next visit
    (save-content-cache! (:content/generated @state-atom))
    (schedule-render!)))

(defmethod handle-message :content/error
  [{:keys [content-type error]}]
  ;; Content generation error
  (js/console.error "Content generation error:" content-type error)
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:content/loading? content-type] false)
    (schedule-render!)))

;; ============================================================================
;; Learning Categories Message Handlers
;; ============================================================================

(defmethod handle-message :learning/categories
  [{:keys [categories total-insights]}]
  ;; Real learning categories from backend memory (fast, no ECA)
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc :learning/categories categories)
                 (assoc :learning/total-insights total-insights)
                 (assoc :learning/categories-loading? false))))
    ;; Cache in localStorage for instant load on next visit
    (try
      (.setItem js/localStorage "ouroboros.learning-categories"
                (js/JSON.stringify (clj->js {:categories categories
                                             :total-insights total-insights})))
      (catch :default _e nil))
    (schedule-render!)))

(defmethod handle-message :learning/category-insights
  [{:keys [category insights count]}]
  ;; Actual insight records for a specific category
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:learning/category-insights category] insights)
                 (assoc-in [:learning/category-insights-loading? category] false))))
    (schedule-render!)))

;; ============================================================================
;; Auto-Insight Message Handlers
;; ============================================================================

(defmethod handle-message :project/detected
  [{:keys [project]}]
  ;; Workspace project auto-detected by backend on WS connect
  (js/console.log "Workspace project detected:" (clj->js project))
  (when-let [state-atom @app-state-atom]
    (let [project-id (:project/id project)
          encoded-id (str/replace (str project-id) "/" "~")]
      (swap! state-atom
             (fn [s]
               (-> s
                   ;; Store the active workspace project
                   (assoc-in [:workspace/project] project)
                   ;; Also normalize it into the project table for Fulcro
                   (assoc-in [:project/id project-id] project))))
      (schedule-render!)
      ;; Auto-navigate to the project detail page (kanban view)
      (when-let [nav @navigate-callback]
        (nav ["project" encoded-id])))))

(defmethod handle-message :eca/auto-insight-start
  [{:keys [project-id builder-type]}]
  ;; Auto-insight generation started after builder completion
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:auto-insight/id project-id :auto-insight/content] "")
                 (assoc-in [:auto-insight/id project-id :auto-insight/loading?] true)
                 (assoc-in [:auto-insight/id project-id :auto-insight/streaming?] true)
                 (assoc-in [:auto-insight/id project-id :auto-insight/builder-type] builder-type))))
    (schedule-render!)))

(defmethod handle-message :eca/auto-insight-token
  [{:keys [token project-id builder-type]}]
  ;; Streaming auto-insight token
  (when-let [state-atom @app-state-atom]
    (swap! state-atom update-in
           [:auto-insight/id project-id :auto-insight/content] str token)
    (schedule-render!)))

(defmethod handle-message :eca/auto-insight-done
  [{:keys [project-id builder-type]}]
  ;; Auto-insight streaming complete
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:auto-insight/id project-id :auto-insight/loading?] false)
                 (assoc-in [:auto-insight/id project-id :auto-insight/streaming?] false))))
    (schedule-render!)))

;; ============================================================================
;; Connection Management
;; ============================================================================

(defn- get-ws-url
  "Get WebSocket URL based on current location
   
   In development, Shadow-CLJS serves on port 8081 but WebSocket server is on 8080.
   We detect this and use the correct port."
  []
  (let [protocol (if (= js/window.location.protocol "https:") "wss:" "ws:")
        host js/window.location.host
        port js/window.location.port]
    (str protocol "//"
         js/window.location.hostname
         (if (= port "8081")
           ":8080"  ; Development: Shadow-CLJS on 8081, API on 8080
           (if (seq port) (str ":" port) ""))
         "/ws")))

(defn connect!
  "Establish WebSocket connection"
  []
  (when-not @ws-connection
    (try
      ;; Mark that we're attempting a connection
      (swap! reconnect-attempts inc)
      (let [ws (js/WebSocket. (get-ws-url))]
        (set! (.-onopen ws)
              (fn []
                (js/console.log "WebSocket connection opened")
                (reset! reconnect-attempts 0)
                ;; Subscribe to telemetry events
                (.send ws (js/JSON.stringify
                           #js {:type "subscribe"
                                :topic "telemetry/events"}))))

        (set! (.-onmessage ws)
              (fn [event]
                (try
                  (let [json-data (.-data event)]
                    (js/console.log "WebSocket raw JSON:" json-data)
                    (let [parsed (js/JSON.parse json-data)]
                      (js/console.log "WebSocket parsed JS object:" parsed)
                      ;; Check if parsed is a JS object (not array)
                      (if (and (object? parsed) (not (array? parsed)))
                        (let [data (js->clj parsed :keywordize-keys true)
                              ;; Ensure :type is a keyword for multimethod dispatch
                              data (if (:type data)
                                     (update data :type keyword)
                                     data)]
                          (js/console.log "WebSocket CLJS data:" data)
                          (if (:type data)
                            (handle-message data)
                            (js/console.warn "WebSocket message missing :type:" data)))
                        (js/console.warn "WebSocket received non-object message:" parsed))))
                  (catch js/Error e
                    (js/console.error "WebSocket message error:" e)))))

        (set! (.-onclose ws)
              (fn [event]
                (js/console.log "WebSocket connection closed")
                (reset! ws-connection nil)
                ;; Attempt reconnection if we were previously connected
                (when (and (> @reconnect-attempts 0)
                           (< @reconnect-attempts max-reconnect-attempts))
                  (swap! reconnect-attempts inc)
                  (js/console.log "WebSocket reconnect attempt" @reconnect-attempts "/" max-reconnect-attempts)
                  (reset! reconnect-timeout
                          (js/setTimeout connect! reconnect-delay-ms)))))

        (set! (.-onerror ws)
              (fn [error]
                ;; Only log as warning - backend may not be running
                (js/console.warn "WebSocket connection failed (backend may not be running)")))

        (reset! ws-connection ws))
      (catch js/Error e
        (js/console.error "WebSocket connection error:" e)))))

(defn disconnect!
  "Close WebSocket connection"
  []
  (when-let [timeout @reconnect-timeout]
    (js/clearTimeout timeout)
    (reset! reconnect-timeout nil))
  (when-let [ws @ws-connection]
    (.close ws)
    (reset! ws-connection nil)
    (js/console.log "WebSocket disconnected")))

(defn send!
  "Send message via WebSocket"
  [message]
  (when-let [ws @ws-connection]
    (when (= (.-readyState ws) js/WebSocket.OPEN)
      (.send ws (js/JSON.stringify (clj->js message))))))

(defn request-wisdom!
  "Request ECA wisdom for a project phase.
   request-type: :tips, :next-steps, :analysis, :suggestions, :templates
   Options:
     :silent? - When true, don't show loading UI (cache is already displayed).
                ECA refreshes in background; first token triggers content swap.
   Includes a 25s safety timeout to clear loading state if no response."
  [project-id phase request-type & [{:keys [silent?]}]]
  ;; Reset live wisdom state before sending (cache is preserved)
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 ;; In silent mode, keep current content visible (cache or default)
                 ;; In normal mode, clear content to show loading UI
                 (cond-> (not silent?)
                   (-> (assoc-in [:wisdom/id :global :wisdom/content] "")
                       (assoc-in [:wisdom/id :global :wisdom/loading?] true)
                       (assoc-in [:wisdom/id :global :wisdom/streaming?] true)))
                 ;; Always track the request type and phase
                 (assoc-in [:wisdom/id :global :wisdom/request-type] request-type)
                 (assoc-in [:wisdom/id :global :wisdom/phase] phase)
                 ;; Track silent refresh so token handler knows to swap content
                 (assoc-in [:wisdom/id :global :wisdom/refreshing?] (boolean silent?)))))
    (schedule-render!))
  (send! (cond-> {:type "eca/wisdom"
                  :project-id project-id
                  :request-type (name request-type)}
           phase (assoc :phase (name phase))))
  ;; Safety timeout: clear loading/streaming/refreshing state if no response in 25s
  (js/setTimeout
   (fn []
     (when-let [state-atom @app-state-atom]
       (let [s @state-atom
             loading? (get-in s [:wisdom/id :global :wisdom/loading?])
             refreshing? (get-in s [:wisdom/id :global :wisdom/refreshing?])]
         (when (or loading? refreshing?)
           (swap! state-atom
                  (fn [s]
                    (-> s
                        (assoc-in [:wisdom/id :global :wisdom/loading?] false)
                        (assoc-in [:wisdom/id :global :wisdom/streaming?] false)
                        (assoc-in [:wisdom/id :global :wisdom/refreshing?] false))))
           (schedule-render!)))))
   25000))

(defn request-eca-debug!
  "Toggle ECA debug mode. Triggers ECA restart on backend."
  [enabled?]
  (send! {:type "eca/debug"
          :enabled? (boolean enabled?)}))

(defn request-flywheel-progress!
  "Request flywheel progress for a project"
  [project-id]
  (send! {:type "flywheel/progress"
          :project-id project-id}))

(defn request-kanban-board!
  "Request Kanban board state for a project"
  [project-id]
  (send! {:type "kanban/board"
          :project-id project-id}))

(defn request-analytics!
  "Request real analytics dashboard data for a project"
  [project-id]
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in
           [:analytics/dashboard project-id :prediction-streaming?] true))
  (send! {:type "analytics/dashboard"
          :project-id project-id}))

(defn request-content!
  "Request ECA-generated content by type.
   content-type: :insights, :blockers, :templates, :chat-suggestions,
                  :flywheel-guide, :section-hints, :learning-categories
   Includes a 25s safety timeout to clear loading state if no response."
  [content-type & {:keys [project-id context]}]
  (when-let [state-atom @app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:content/loading? content-type] true)
                 (assoc-in [:content/streaming content-type] "")))))
    (send! (cond-> {:type "content/generate"
                    :content-type (name content-type)}
             project-id (assoc :project-id project-id)
             context (assoc :context context)))
    ;; Safety timeout: clear loading state if no response in 25s
    (js/setTimeout
     (fn []
       (when-let [state-atom @app-state-atom]
         (when (get-in @state-atom [:content/loading? content-type])
           (swap! state-atom assoc-in [:content/loading? content-type] false)
           (schedule-render!))))
     25000))

(defn request-learning-save-examples!
  "Save builder contents as learning examples"
  [{:keys [project-id label template-key builder-type session-id data]}]
  (send! {:type "learning/save-examples"
          :project-id project-id
          :label label
          :template-key (when template-key (name template-key))
          :builder-type (name builder-type)
          :session-id session-id
          :data data}))

(defn request-wisdom-template!
  "Request template data from backend"
  [template-key]
  (send! {:type "wisdom/template"
          :template-key (name template-key)}))

(defn request-learning-categories!
  "Request real learning categories from backend memory.
   Fast (no ECA) -- reads directly from learning storage."
  []
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc :learning/categories-loading? true))
  (send! {:type "learning/categories"}))

(defn request-category-insights!
  "Request actual insight records for a specific learning category."
  [category]
  (when-let [state-atom @app-state-atom]
    (swap! state-atom assoc-in [:learning/category-insights-loading? category] true))
  (send! {:type "learning/category-insights"
          :category category}))

(defn save-builder-data!
  "Send builder section data to backend for persistence.
   builder-type: :empathy-map, :value-proposition, :mvp-planning, :lean-canvas
   data: the full builder data (notes map or responses vector)"
  [project-id session-id builder-type data]
  (send! {:type "builder/save-data"
          :project-id project-id
          :session-id session-id
          :builder-type (name builder-type)
          :data data}))

(defn merge-builder-data-into-state!
  "Write builder data directly into Fulcro state at the correct ident path.
   Called after template injection to make data immediately available to builder
   components without requiring navigation + df/load! round-trip.
   builder-type: :empathy-map, :value-proposition, :mvp-planning, :lean-canvas
   data: the builder data (notes map or responses vector)"
  [builder-type data]
  (when-let [state-atom @app-state-atom]
    (case builder-type
      :empathy-map
      (swap! state-atom assoc-in [:page/id :empathy-builder :empathy/notes] data)

      :lean-canvas
      (swap! state-atom assoc-in [:page/id :lean-canvas-builder :lean-canvas/notes] data)

      :value-proposition
      (swap! state-atom assoc-in [:page/id :value-prop-builder :completed-responses] data)

      :mvp-planning
      (swap! state-atom assoc-in [:page/id :mvp-builder :completed-responses] data)

      nil)
    (schedule-render!)))

(defn- send-subscription!
  "Send subscription/unsubscription message"
  [type topic]
  (send! {:type type :topic topic}))

(defn subscribe!
  "Subscribe to a WebSocket topic"
  [topic]
  (when (and (connected?) (not (contains? @subscribed-topics topic)))
    (send-subscription! "subscribe" topic)
    (swap! subscribed-topics conj topic)
    (js/console.log "Subscribed to topic:" topic)))

(defn unsubscribe!
  "Unsubscribe from a WebSocket topic"
  [topic]
  (when (and (connected?) (contains? @subscribed-topics topic))
    (send-subscription! "unsubscribe" topic)
    (swap! subscribed-topics disj topic)
    (js/console.log "Unsubscribed from topic:" topic)))

(defn subscribe-builder-session!
  "Subscribe to builder session updates"
  [session-id]
  (let [topic (str "builder-session/" session-id)]
    (subscribe! topic)))

(defn unsubscribe-builder-session!
  "Unsubscribe from builder session updates"
  [session-id]
  (let [topic (str "builder-session/" session-id)]
    (unsubscribe! topic)))

(defn ping!
  "Send ping to keep connection alive"
  []
  (send! {:type :ping}))

;; ============================================================================
;; Health Check
;; ============================================================================

(defonce ping-interval (atom nil))

(defn start-ping-loop!
  "Start periodic ping to keep connection alive"
  []
  (stop-ping-loop!)
  (reset! ping-interval
          (js/setInterval ping! 30000))) ;; Ping every 30 seconds

(defn stop-ping-loop!
  "Stop ping loop"
  []
  (when-let [interval @ping-interval]
    (js/clearInterval interval)
    (reset! ping-interval nil)))

;; ============================================================================
;; Lifecycle
;; ============================================================================

(defn init!
  "Initialize WebSocket connection"
  []
  (connect!)
  (start-ping-loop!))

(defn destroy!
  "Clean up WebSocket connection"
  []
  (stop-ping-loop!)
  (disconnect!))

;; ============================================================================
;; Status
;; ============================================================================

(defn connected?
  "Check if WebSocket is connected"
  []
  (and @ws-connection
       (= (.-readyState @ws-connection) js/WebSocket.OPEN)))

(defn status
  "Get WebSocket status"
  []
  {:connected (connected?)
   :reconnect-attempts @reconnect-attempts})
