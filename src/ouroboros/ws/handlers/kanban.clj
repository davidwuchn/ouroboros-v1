(ns ouroboros.ws.handlers.kanban
  "Kanban board computation and handler."
  (:require
   [ouroboros.memory :as memory]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.context :as ctx]))

;; ============================================================================
;; Kanban Section Definitions
;; ============================================================================

(def ^:private builder-sections
  "All sections across all builders, in flywheel order.
   Each section maps to one Kanban card."
  [{:builder-type :empathy-map
    :builder-label "Empathy Map"
    :builder-color "#8E24AA"
    :sections [{:key :persona     :title "Persona"       :icon "person" :description "Who is your ideal customer?"}
               {:key :think-feel  :title "Think & Feel"  :icon "brain" :description "What's going on inside their head?"}
               {:key :hear        :title "Hear"          :icon "ear" :description "What do they hear from others?"}
               {:key :see         :title "See"           :icon "eye" :description "What do they see in their environment?"}
               {:key :say-do      :title "Say & Do"      :icon "speech" :description "What do they say and how do they behave?"}
               {:key :pains-gains :title "Pains & Gains" :icon "bolt" :description "What frustrates them? What do they want?"}]}
   {:builder-type :value-proposition
    :builder-label "Value Prop"
    :builder-color "#1565C0"
    :sections [{:key :customer-job   :title "Customer Job"    :icon "target" :description "What job does your customer need done?"}
               {:key :pains          :title "Customer Pains"  :icon "frown" :description "What frustrates your customer?"}
               {:key :gains          :title "Customer Gains"  :icon "star" :description "What would make their life better?"}
               {:key :products       :title "Products & Services" :icon "package" :description "What will you offer?"}
               {:key :pain-relievers :title "Pain Relievers"  :icon "pill" :description "How do you reduce pains?"}
               {:key :gain-creators  :title "Gain Creators"   :icon "rocket" :description "How do you create gains?"}]}
   {:builder-type :mvp-planning
    :builder-label "MVP"
    :builder-color "#E65100"
    :sections [{:key :core-problem       :title "Core Problem"       :icon "target" :description "The single most important problem"}
               {:key :target-user        :title "Target User"        :icon "person" :description "Your FIRST target user"}
               {:key :success-metric     :title "Success Metric"     :icon "chart" :description "How will you measure success?"}
               {:key :must-have-features :title "Must-Have Features" :icon "check" :description "Essential MVP features"}
               {:key :nice-to-have       :title "Nice-to-Have (V2)"  :icon "thought" :description "Features for after MVP"}
               {:key :out-of-scope       :title "Out of Scope"       :icon "ban" :description "Explicitly NOT building"}
               {:key :timeline           :title "Timeline"           :icon "calendar" :description "Timeline to launch"}
               {:key :risks              :title "Risks & Assumptions" :icon "warning" :description "Biggest risks"}]}
   {:builder-type :lean-canvas
    :builder-label "Lean Canvas"
    :builder-color "#2E7D32"
    :sections [{:key :problems          :title "Problems"           :icon "frown" :description "Top 3 customer problems"}
               {:key :customer-segments :title "Customer Segments"  :icon "users" :description "Target customers and users"}
               {:key :uvp              :title "Unique Value Prop"   :icon "sparkle" :description "Single compelling message"}
               {:key :solution         :title "Solution"            :icon "bulb" :description "Top 3 features"}
               {:key :channels         :title "Channels"            :icon "megaphone" :description "Path to customers"}
               {:key :revenue-streams  :title "Revenue Streams"     :icon "dollar" :description "How you make money"}
               {:key :cost-structure   :title "Cost Structure"      :icon "coins" :description "Fixed and variable costs"}
               {:key :key-metrics      :title "Key Metrics"         :icon "chart" :description "Key activities you measure"}
               {:key :unfair-advantage :title "Unfair Advantage"    :icon "shield" :description "Can't be easily copied"}]}])

;; ============================================================================
;; Kanban Computation
;; ============================================================================

(defn- section-completed?
  "Check if a specific section has data in a builder session."
  [_builder-type section-key data]
  (let [notes (vals (or data {}))
        sections-with-notes (set (map :item/section notes))]
    (contains? sections-with-notes section-key)))

(defn- compute-kanban-board
  "Compute the full Kanban board state for a project.
   Derives card status from actual builder session data."
  [user-id project-id]
  (let [sessions-key (keyword (str "builder-sessions/" (name user-id)))
        all-sessions (vals (or (memory/get-value sessions-key) {}))
        project-sessions (filter #(= (:session/project-id %) project-id) all-sessions)
        by-type (group-by :session/type project-sessions)
        cards (for [{:keys [builder-type builder-label builder-color sections]} builder-sections
                    {:keys [key title icon description]} sections]
                (let [sessions (get by-type builder-type [])
                      latest (last (sort-by :session/updated-at sessions))
                      data (:session/data latest)
                      session-exists? (some? latest)
                      section-done? (and session-exists?
                                         (section-completed? builder-type key data))
                      note-count (case builder-type
                                   (:empathy-map :lean-canvas)
                                   (count (filter #(= key (:item/section %))
                                                  (vals (or data {}))))
                                   (:value-proposition :mvp-planning)
                                   (if section-done? 1 0)
                                   0)
                      status (cond
                               section-done? :done
                               session-exists? :in-progress
                               :else :not-started)]
                  {:id (str (name builder-type) ":" (name key))
                   :title title
                   :icon icon
                   :builder-type builder-type
                   :builder-label builder-label
                   :builder-color builder-color
                   :section-key key
                   :status status
                   :description description
                   :has-data? section-done?
                   :note-count note-count}))
        by-status (group-by :status cards)
        columns [{:id :not-started
                  :label "Not Started"
                  :cards (vec (get by-status :not-started []))}
                 {:id :in-progress
                  :label "In Progress"
                  :cards (vec (get by-status :in-progress []))}
                 {:id :done
                  :label "Done"
                  :cards (vec (get by-status :done []))}]
        total (count cards)
        done-count (count (get by-status :done []))
        in-progress-count (count (get by-status :in-progress []))]
    {:columns columns
     :summary {:total total
               :done done-count
               :in-progress in-progress-count
               :not-started (- total done-count in-progress-count)}}))

(defn handle-kanban-board!
  "Handle a kanban/board request from the frontend."
  [client-id {:keys [project-id]}]
  (let [user-id (ctx/current-user-id)
        board (compute-kanban-board user-id project-id)]
    (conn/send-to! client-id {:type :kanban/board
                              :project-id project-id
                              :board board
                              :timestamp (System/currentTimeMillis)})))
