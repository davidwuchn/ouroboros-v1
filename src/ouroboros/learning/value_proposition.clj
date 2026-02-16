(ns ouroboros.learning.value-proposition
  "Value Proposition Canvas - Connect customer needs to your solution

   Based on Strategyzer's Value Proposition Canvas:
   - Customer Profile: Jobs, Pains, Gains (from empathy map)
   - Value Map: Products & Services, Pain Relievers, Gain Creators

   Connects empathy map insights to your solution, creating a strong value proposition
   that will feed into the Lean Canvas UVP (Unique Value Proposition) block.
   "
  (:require
   [clojure.string :as str]
   [ouroboros.learning :as learning]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Value Proposition Canvas Sections
;; ============================================================================

(def ^:private vp-sections
  "Value Proposition Canvas sections (Customer Profile → Value Map)"
  [{:key :customer-jobs :question "What JOBS is your customer trying to get done?"
    :hint "Functional, social, emotional jobs. E.g., 'Write code faster, learn new tech, build portfolio'"}
   {:key :customer-pains :question "What PAINS does your customer experience? (Top 3)"
    :hint "From empathy map. E.g., 'Wasting time on setup, unclear documentation, fear of breaking things'"}
   {:key :customer-gains :question "What GAINS does your customer want? (Top 3)"
    :hint "From empathy map. E.g., 'Ship faster, get recognition, learn transferable skills'"}
   {:key :products-services :question "What PRODUCTS & SERVICES do you offer?"
    :hint "Your solution components. E.g., 'AI assistant with memory, educational approvals, learning flywheel'"}
   {:key :pain-relievers :question "How do you RELIEVE customer pains?"
    :hint "Map each pain to a solution. E.g., 'Memory system prevents repeating mistakes'"}
   {:key :gain-creators :question "How do you CREATE customer gains?"
    :hint "Map each gain to a feature. E.g., 'Learning flywheel helps ship faster by building on insights'"}
   {:key :fit-assessment :question "How well does your solution FIT the customer profile? (1-10)"
    :hint "Rate fit based on pain relievers and gain creators alignment. E.g., '8 - Strong pain relief, good gain creation'"}])

(defn- generate-vp-id
  [user-id project-name]
  (str (name user-id) "/value-prop-" (str/replace project-name #"\s+" "-") "-" (System/currentTimeMillis)))

(defn start-vp-from-empathy!
  "Start a Value Proposition Canvas session from empathy map insights"
  [user-id project-name {:keys [customer-jobs pains gains persona]}]
  (let [vp-id (generate-vp-id user-id project-name)]
    {:vp/id vp-id
     :vp/user-id user-id
     :vp/project-name project-name
     :vp/persona persona
     :vp/state :active
     :vp/current-section 0
     :vp/sections {:customer-jobs customer-jobs
                   :customer-pains pains
                   :customer-gains gains}
     :vp/started-at (System/currentTimeMillis)
     :vp/updated-at (System/currentTimeMillis)}))

(defn start-vp-session!
  "Start a new Value Proposition Canvas session"
  [user-id project-name]
  (let [vp-id (generate-vp-id user-id project-name)]
    {:vp/id vp-id
     :vp/user-id user-id
     :vp/project-name project-name
     :vp/state :active
     :vp/current-section 0
     :vp/sections {}
     :vp/started-at (System/currentTimeMillis)
     :vp/updated-at (System/currentTimeMillis)}))

(defn- get-section-index
  [session]
  (or (:vp/current-section session) 0))

(defn- get-current-section
  [session]
  (let [idx (get-section-index session)
        ;; Skip customer profile sections if already populated from empathy
        existing-keys (set (keys (:vp/sections session)))
        sections-to-process (filterv #(not (contains? existing-keys (:key %))) vp-sections)]
    (when (< idx (count sections-to-process))
      (nth sections-to-process idx))))

(defn- format-progress
  [session]
  (let [existing-keys (set (keys (:vp/sections session)))
        total (- (count vp-sections) (count existing-keys))
        idx (get-section-index session)]
    (str "(" (inc idx) "/" total ")")))

(defn update-vp-section!
  "Update a section in VP session"
  [session section-key response]
  (let [updated (-> session
                    (assoc-in [:vp/sections section-key] response)
                    (update :vp/current-section inc)
                    (assoc :vp/updated-at (System/currentTimeMillis)))]

    ;; Save as learning insight
    (let [_section-info (first (filter #(= (:key %) section-key) vp-sections))]
      (learning/save-insight! (:vp/user-id session)
                              {:title (str "Value Proposition: " (name section-key))
                               :insights [response]
                               :pattern (str "value-prop-" (name section-key))
                               :category "product-strategy"
                               :tags #{"value-proposition" "strategy" "customer-fit" (name section-key)}
                               :examples [{:vp-id (:vp/id session)
                                           :project (:vp/project-name session)
                                           :section section-key
                                           :response response}]}))

    (telemetry/emit! {:event :learning/vp-section-saved
                      :user-id (:vp/user-id session)
                      :vp-id (:vp/id session)
                      :section section-key})

    updated))

(defn get-vp-summary
  "Generate summary of completed Value Proposition Canvas"
  [session]
  (let [sections (:vp/sections session)
        completed (count (keys sections))
        total (count vp-sections)]
    {:vp/id (:vp/id session)
     :vp/project-name (:vp/project-name session)
     :vp/persona (:vp/persona session)
     :vp/completed-sections completed
     :vp/total-sections total
     :vp/completion-percent (int (* 100 (/ completed total)))
     :vp/sections (keys sections)
     :vp/started-at (:vp/started-at session)
     :vp/updated-at (:vp/updated-at session)}))

(defn is-complete?
  "Check if Value Proposition Canvas is complete"
  [session]
  (let [existing-keys (set (keys (:vp/sections session)))
        total-sections (count vp-sections)]
    (>= (count existing-keys) total-sections)))

(defn get-next-prompt
  "Get next prompt for user"
  [session]
  (if (is-complete? session)
    {:message "🎯 *Value Proposition Canvas Complete!*\n\nNow you have a strong customer-solution fit. Next: MVP Planning."
     :session session
     :complete? true}
    (let [current-section (get-current-section session)
          progress (format-progress session)]
      {:message (str "🎯 **Section " progress ": " (name (:key current-section)) "**\n"
                     (:question current-section) "\n\n"
                     "💡 *Hint*: " (:hint current-section) "\n\n"
                     (when (= :customer-jobs (:key current-section))
                       "From empathy map: \"" (get-in session [:vp/sections :customer-jobs] "") "\"\n\n")
                     (when (= :customer-pains (:key current-section))
                       "From empathy map: \"" (get-in session [:vp/sections :customer-pains] "") "\"\n\n")
                     (when (= :customer-gains (:key current-section))
                       "From empathy map: \"" (get-in session [:vp/sections :customer-gains] "") "\"\n\n")
                     "Type your answer (or 'skip' to move on):")
       :session session
       :complete? false
       :current-section (:key current-section)})))

(defn process-response!
  "Process user response for current section"
  [session response]
  (if (is-complete? session)
    {:session session
     :message "Value Proposition Canvas is already complete. Use /vp summary to view."
     :complete? true}
    (let [current-section (get-current-section session)
          section-key (:key current-section)
          response-normalized (str/trim response)
          skip? (= "skip" (str/lower-case response-normalized))]
      (cond
        (str/blank? response-normalized)
        {:session session
         :message "Please provide an answer. You can type 'skip' to move on."
         :complete? false}

        skip?
        (let [updated-session (update-vp-section! session section-key "[User skipped this section]")
              next-prompt (get-next-prompt updated-session)]
          (merge next-prompt {:session updated-session}))

        :else
        (let [updated-session (update-vp-section! session section-key response-normalized)
              next-prompt (get-next-prompt updated-session)]
          (merge next-prompt {:session updated-session}))))))

;; ============================================================================
;; Lean Canvas Connection
;; ============================================================================

(defn extract-uvp
  "Extract Unique Value Proposition for Lean Canvas"
  [session]
  (let [sections (:vp/sections session)
        pain-relievers (get sections :pain-relievers "")
        gain-creators (get sections :gain-creators "")
        products-services (get sections :products-services "")]
    (str "Helps " (:vp/persona session "customers") " by "
         (if (str/blank? pain-relievers)
           (if (str/blank? gain-creators)
             products-services
             (str "creating gains like: " (first (str/split gain-creators #"\n"))))
           (str "relieving pains like: " (first (str/split pain-relievers #"\n")))))))

(defn extract-unfair-advantage
  "Extract Unfair Advantage insights for Lean Canvas"
  [session]
  (let [sections (:vp/sections session)
        fit-score (get sections :fit-assessment "")]
    (cond
      (str/includes? fit-score "9") "Exceptional customer-solution fit based on deep empathy mapping"
      (str/includes? fit-score "8") "Strong alignment between customer pains/gains and solution features"
      (str/includes? fit-score "7") "Good fit validated through structured value proposition process"
      :else "Customer-validated solution based on empathy mapping")))

;; ============================================================================
;; Learning Integration
;; ============================================================================

(defn recall-user-value-props
  "Find all value proposition learnings for a user"
  [user-id]
  (learning/recall-by-pattern user-id "value-prop-"))

(defn find-related-value-props
  "Find value propositions related to current context"
  [user-id project-context]
  (learning/find-related user-id project-context))

(comment
  ;; Test the flow
  (require '[ouroboros.learning.value-proposition :as vp])

  ;; Start from empathy
  (def empathy-data {:customer-jobs "Build AI tools faster"
                     :pains "Forgets past insights\nOpaque tool approvals"
                     :gains "Ship faster\nLearn from mistakes"
                     :persona "Curious Developer"})

  (def session (vp/start-vp-from-empathy! :alex "Ouroboros" empathy-data))

  ;; Get first prompt (should skip to products-services since customer profile is populated)
  (vp/get-next-prompt session)

  ;; Extract UVP for Lean Canvas
  (vp/extract-uvp session))