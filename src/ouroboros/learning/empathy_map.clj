(ns ouroboros.learning.empathy-map
  "Empathy mapping for customer understanding

   Guides users through creating an empathy map to understand their target customers.
   Based on Dave Gray's empathy map framework: Think & Feel, Hear, See, Say & Do, Pains, Gains.

   Each section becomes a learning insight that informs the Value Proposition Canvas.
   "
  (:require
   [clojure.string :as str]
   [ouroboros.learning :as learning]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Empathy Map Sections
;; ============================================================================

(def ^:private empathy-sections
  "The 6 empathy map sections in recommended order"
  [{:key :persona :question "Who is your customer? (Create a persona)"
    :hint "Give them a name, age, job. E.g., 'Alex, 28, curious developer building AI tools'"}
   {:key :think-feel :question "What do they THINK & FEEL? (Internal world)"
    :hint "Hopes, fears, dreams, worries. E.g., 'Wants to build meaningful products, fears wasting time on wrong features'"}
   {:key :hear :question "What do they HEAR? (External influences)"
    :hint "Friends, colleagues, media, influencers. E.g., 'Hears about AI safety concerns, reads Hacker News'"}
   {:key :see :question "What do they SEE? (Environment)"
    :hint "Market trends, competitors, friends' experiences. E.g., 'Sees other tools fail, sees successful indie makers'"}
   {:key :say-do :question "What do they SAY & DO? (Public behavior)"
    :hint "Actions, quotes, social media, buying patterns. E.g., 'Says \"I need better tooling\", attends tech meetups'"}
   {:key :pains :question "What are their PAINS? (Frustrations)"
    :hint "Obstacles, risks, undesired outcomes. E.g., 'Wasting time on configuration, unclear ROI from tools'"}
   {:key :gains :question "What are their GAINS? (Desired outcomes)"
    :hint "Success measures, wants, needs, dreams. E.g., 'Ship faster, learn from mistakes, build profitable product'"}])

(defn- generate-empathy-id
  [user-id persona-name]
  (str (name user-id) "/empathy-" (str/replace persona-name #"\s+" "-") "-" (System/currentTimeMillis)))

(defn- get-section-index
  [session]
  (or (:empathy/current-section session) 0))

(defn- get-current-section
  [session]
  (let [idx (get-section-index session)]
    (when (< idx (count empathy-sections))
      (nth empathy-sections idx))))

(defn- format-progress
  [session]
  (let [idx (get-section-index session)
        total (count empathy-sections)]
    (str "(" (inc idx) "/" total ")")))

;; ============================================================================
;; Session Management
;; ============================================================================

(defn start-empathy-session!
  "Start a new empathy mapping session"
  [user-id persona-name]
  (let [empathy-id (generate-empathy-id user-id persona-name)]
    {:empathy/id empathy-id
     :empathy/user-id user-id
     :empathy/persona-name persona-name
     :empathy/state :active
     :empathy/current-section 0
     :empathy/sections {}
     :empathy/started-at (System/currentTimeMillis)
     :empathy/updated-at (System/currentTimeMillis)}))

(defn update-empathy-section!
  "Update a section in empathy session"
  [session section-key response]
  (let [updated (-> session
                    (assoc-in [:empathy/sections section-key] response)
                    (update :empathy/current-section inc)
                    (assoc :empathy/updated-at (System/currentTimeMillis)))]

    ;; Save as learning insight
    (let [_section-info (first (filter #(= (:key %) section-key) empathy-sections))
          section-name (name section-key)]
      (learning/save-insight! (:empathy/user-id session)
                              {:title (str "Empathy Map: " section-name)
                               :insights [response]
                               :pattern (str "empathy-" section-name)
                               :category "customer-understanding"
                               :tags (cond-> #{"empathy-map" "customer"}
                                       (not= section-name "persona") (conj section-name))
                               :examples [{:empathy-id (:empathy/id session)
                                           :persona (:empathy/persona-name session)
                                           :section section-key
                                           :response response}]}))

    (telemetry/emit! {:event :learning/empathy-section-saved
                      :user-id (:empathy/user-id session)
                      :empathy-id (:empathy/id session)
                      :section section-key})

    updated))

(defn get-empathy-summary
  "Generate summary of completed empathy map"
  [session]
  (let [sections (:empathy/sections session)
        completed (count (keys sections))
        total (count empathy-sections)]
    {:empathy/id (:empathy/id session)
     :empathy/persona-name (:empathy/persona-name session)
     :empathy/completed-sections completed
     :empathy/total-sections total
     :empathy/completion-percent (int (* 100 (/ completed total)))
     :empathy/sections (keys sections)
     :empathy/started-at (:empathy/started-at session)
     :empathy/updated-at (:empathy/updated-at session)}))

(defn is-complete?
  "Check if empathy map is complete"
  [session]
  (>= (get-section-index session) (count empathy-sections)))

(defn get-next-prompt
  "Get next prompt for user"
  [session]
  (let [idx (get-section-index session)]
    (cond
      (>= idx (count empathy-sections))
      {:message "🎯 *Empathy Map Complete!*\n\nNow you deeply understand your customer. Next step: Value Proposition."
       :session session
       :complete? true}

      :else
      (let [section (nth empathy-sections idx)
            progress (format-progress session)]
        {:message (str "🧠 **Section " progress ": " (name (:key section)) "**\n"
                       (:question section) "\n\n"
                       "💡 *Hint*: " (:hint section) "\n\n"
                       "Type your answer (or 'skip' to move on):")
         :session session
         :complete? false
         :current-section (:key section)}))))

(defn process-response!
  "Process user response for current section"
  [session response]
  (if (is-complete? session)
    {:session session
     :message "Empathy map is already complete. Use /empathy summary to view."
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
        (let [updated-session (update-empathy-section! session section-key "[User skipped this section]")
              next-prompt (get-next-prompt updated-session)]
          (merge next-prompt {:session updated-session}))

        :else
        (let [updated-session (update-empathy-section! session section-key response-normalized)
              next-prompt (get-next-prompt updated-session)]
          (merge next-prompt {:session updated-session}))))))

;; ============================================================================
;; Value Proposition Connection
;; ============================================================================

(defn extract-pains-gains
  "Extract pains and gains from empathy map for Value Proposition Canvas"
  [session]
  (let [sections (:empathy/sections session)]
    {:pains (get sections :pains "")
     :gains (get sections :gains "")
     :persona-name (:empathy/persona-name session)
     :empathy-id (:empathy/id session)}))

(defn create-value-prop-from-empathy
  "Create Value Proposition Canvas inputs from empathy map"
  [session]
  (let [{:keys [pains gains persona-name]} (extract-pains-gains session)
        pains-list (str/split (or pains "") #"\n")
        gains-list (str/split (or gains "") #"\n")]
    {:customer-jobs (get-in session [:empathy/sections :say-do] "")
     :pains (str/join "\n" (take 3 pains-list))
     :gains (str/join "\n" (take 3 gains-list))
     :persona persona-name}))

;; ============================================================================
;; Learning Integration
;; ============================================================================

(defn recall-user-empathy-maps
  "Find all empathy map learnings for a user"
  [user-id]
  (learning/recall-by-pattern user-id "empathy-"))

(defn find-related-empathy
  "Find empathy maps related to current context"
  [user-id project-context]
  (learning/find-related user-id project-context))

(comment
  ;; Test the flow
  (require '[ouroboros.learning.empathy-map :as empathy])

  ;; Start a session
  (def session (empathy/start-empathy-session! :alex "Curious Developer"))

  ;; Get first prompt
  (empathy/get-next-prompt session)

  ;; Process response
  (empathy/process-response! session "Alex, 28, builds AI tools and wants to ship faster")

  ;; Extract for value proposition
  (empathy/extract-pains-gains session)

  ;; Create value prop inputs
  (empathy/create-value-prop-from-empathy session))