(ns ouroboros.learning.lean-canvas
  "Lean Canvas building with learning integration

   Guides users through creating a Lean Canvas, saving each block as a learning insight,
   and building wisdom about product development.

   Usage:
   (start-canvas-session! :user-123 \"my-startup\")
   (process-canvas-response! :user-123 \"Customers need better memory for AI tools\")"
  (:require
   [clojure.string :as str]
   [ouroboros.learning :as learning]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Canvas Data Model
;; ============================================================================

(def ^:private canvas-blocks
  "The 9 Lean Canvas blocks in recommended order"
  [{:key :problems :question "What are the top 3 problems your customers face?"
    :hint "Focus on pain points, not solutions. E.g., 'AI tools forget past conversations'"}
   {:key :solution :question "How does your product solve these problems?"
    :hint "List your top 3 features that address the problems above"}
   {:key :uvp :question "What is your Unique Value Proposition? (One sentence)"
    :hint "Clear message that states why you're different and worth buying"}
   {:key :unfair-advantage :question "What is your Unfair Advantage? (Cannot be copied)"
    :hint "Something competitors can't easily replicate: data, team, patents, network effects"}
   {:key :customer-segments :question "Who are your target customers? (Early adopters first)"
    :hint "Be specific: 'Curious developers building AI tools', not 'everyone'"}
   {:key :key-metrics :question "What Key Metrics will you track? (AARRR framework)"
    :hint "Acquisition, Activation, Retention, Revenue, Referral. E.g., 'Monthly active users'"}
   {:key :channels :question "How will you reach customers?"
    :hint "Distribution channels: GitHub, app stores, content marketing, partnerships"}
   {:key :cost-structure :question "What are your main costs?"
    :hint "Fixed (servers, salaries) and variable (customer acquisition, support) costs"}
   {:key :revenue-streams :question "How will you make money?"
    :hint "Pricing model: subscription, freemium, enterprise, ads"}])

(defn- generate-canvas-id
  [user-id project-name]
  (str (name user-id) "/" (str/replace project-name #"\s+" "-") "-" (System/currentTimeMillis)))

(defn- get-block-index
  "Get current block index from session"
  [session]
  (or (:canvas/current-block session) 0))

(defn- get-current-block
  "Get current block question"
  [session]
  (let [idx (get-block-index session)]
    (when (< idx (count canvas-blocks))
      (nth canvas-blocks idx))))

(defn- format-progress
  [session]
  (let [idx (get-block-index session)
        total (count canvas-blocks)]
    (str "(" (inc idx) "/" total ")")))

;; ============================================================================
;; Session Management
;; ============================================================================

(defn start-canvas-session!
  "Start a new Lean Canvas session
  
   Returns session map with initial state"
  [user-id project-name]
  (let [canvas-id (generate-canvas-id user-id project-name)]
    {:canvas/id canvas-id
     :canvas/user-id user-id
     :canvas/project-name project-name
     :canvas/state :active
     :canvas/current-block 0
     :canvas/blocks {}
     :canvas/started-at (System/currentTimeMillis)
     :canvas/updated-at (System/currentTimeMillis)}))

(defn update-canvas-block!
  "Update a block in canvas session
  
   Returns updated session"
  [session block-key response]
  (let [updated (-> session
                   (assoc-in [:canvas/blocks block-key] response)
                   (update :canvas/current-block inc)
                   (assoc :canvas/updated-at (System/currentTimeMillis)))]
    
    ;; Save as learning insight
    (let [_block-info (first (filter #(= (:key %) block-key) canvas-blocks))]
      (learning/save-insight! (:canvas/user-id session)
        {:title (str "Lean Canvas: " (name block-key))
         :insights [response]
         :pattern (str "lean-canvas-" (name block-key))
         :category "product-development"
         :tags #{"lean-canvas" "product" "business-model" (name block-key)}
         :examples [{:canvas-id (:canvas/id session)
                     :project (:canvas/project-name session)
                     :block block-key
                     :response response}]}))
    
    (telemetry/emit! {:event :learning/canvas-block-saved
                      :user-id (:canvas/user-id session)
                      :canvas-id (:canvas/id session)
                      :block block-key
                      :response-length (count response)})
    
    updated))

(defn get-canvas-summary
  "Generate summary of completed canvas"
  [session]
  (let [blocks (:canvas/blocks session)
        completed (count (keys blocks))
        total (count canvas-blocks)]
    {:canvas/id (:canvas/id session)
     :canvas/project-name (:canvas/project-name session)
     :canvas/completed-blocks completed
     :canvas/total-blocks total
     :canvas/completion-percent (int (* 100 (/ completed total)))
     :canvas/blocks (keys blocks)
     :canvas/started-at (:canvas/started-at session)
     :canvas/updated-at (:canvas/updated-at session)}))

(defn is-complete?
  "Check if canvas is complete"
  [session]
  (>= (get-block-index session) (count canvas-blocks)))

(defn get-next-prompt
  "Get next prompt for user
  
   Returns map with :message (prompt) and :session (updated if needed)"
  [session]
  (let [idx (get-block-index session)]
    (cond
      (>= idx (count canvas-blocks))
      {:message "🎉 *Lean Canvas Complete!*\n\nYour business model is ready. Summary:\n"
       :session session
       :complete? true}
      
      :else
      (let [block (nth canvas-blocks idx)
            progress (format-progress session)]
        {:message (str "📌 **Block " progress ": " (name (:key block)) "**\n"
                       (:question block) "\n\n"
                       "💡 *Hint*: " (:hint block) "\n\n"
                       "Type your answer below:")
         :session session
         :complete? false
         :current-block (:key block)}))))

(defn process-response!
  "Process user response for current block
  
   Returns map with:
   - :session - updated session
   - :message - feedback/next prompt
   - :complete? - true if canvas is complete"
  [session response]
  (if (is-complete? session)
    {:session session
     :message "Canvas is already complete. Use /canvas summary to view."
     :complete? true}
    (let [current-block (get-current-block session)
          block-key (:key current-block)
          response-normalized (str/trim response)
          skip? (= "skip" (str/lower-case response-normalized))]
      (cond
        (str/blank? response-normalized)
        {:session session
         :message "Please provide an answer. You can type 'skip' to move on."
         :complete? false}
        
        skip?
        (let [updated-session (update-canvas-block! session block-key "[User skipped this block]")
              next-prompt (get-next-prompt updated-session)]
          (merge next-prompt {:session updated-session}))
        
        :else
        (let [updated-session (update-canvas-block! session block-key response-normalized)
              next-prompt (get-next-prompt updated-session)]
          (merge next-prompt {:session updated-session}))))))

;; ============================================================================
;; Learning Integration
;; ============================================================================

(defn recall-user-canvases
  "Find all Lean Canvas learnings for a user"
  [user-id]
  (learning/recall-by-pattern user-id "lean-canvas-"))

(defn find-related-canvases
  "Find canvases related to current context"
  [user-id project-context]
  (learning/find-related user-id project-context))

(defn create-canvas-from-template
  "Create a canvas session from a template (e.g., SaaS, Marketplace)"
  [user-id project-name _template-name]
  (let [session (start-canvas-session! user-id project-name)]
    ;; TODO: Load template responses for first few blocks
    session))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(require '[com.wsscode.pathom3.connect.operation :as pco])

(pco/defresolver canvas-user-sessions [{:keys [user/id]}]
  {::pco/output [{:canvas/sessions [:canvas/id
                                    :canvas/project-name
                                    :canvas/completed-blocks
                                    :canvas/total-blocks
                                    :canvas/completion-percent]}]}
  (let [learnings (recall-user-canvases id)
        sessions (map (fn [learning]
                        (let [example (first (:learning/examples learning))]
                          {:canvas/id (:canvas-id example)
                           :canvas/project-name (:project example)
                           :canvas/completed-blocks 1 ; TODO: Count blocks per canvas
                           :canvas/total-blocks 9
                           :canvas/completion-percent 11}))
                      learnings)]
    {:canvas/sessions sessions}))

(def resolvers [canvas-user-sessions])

(comment
  ;; Test the flow
  (require '[ouroboros.learning.lean-canvas :as canvas])

  ;; Start a session
  (def session (canvas/start-canvas-session! :alex "My AI Tool"))

  ;; Get first prompt
  (canvas/get-next-prompt session)

  ;; Process response
  (canvas/process-response! session "AI tools don't remember past conversations")

  ;; Complete all blocks (simulated)
  (def completed-session
    (reduce (fn [s _] (canvas/process-response! s "test response")) session (range 9)))

  ;; Get summary
  (canvas/get-canvas-summary completed-session)

  ;; Recall user canvases
  (canvas/recall-user-canvases :alex))