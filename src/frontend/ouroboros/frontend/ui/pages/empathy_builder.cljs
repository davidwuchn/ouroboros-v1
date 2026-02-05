(ns ouroboros.frontend.ui.pages.empathy-builder
  "Empathy Map builder page"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
;; Mutations
;; ============================================================================

(m/defmutation start-empathy-session [{:keys [project-id persona-name]}]
  (remote [env] env)
  (ok-action [{:keys [result state]}]
    (let [session-data (:body result)]
      (swap! state assoc-in [:empathy-session :session/data] session-data))))

(m/defmutation submit-empathy-section [{:keys [session-id section-key response]}]
  (remote [env] env)
  (ok-action [{:keys [result state]}]
    (let [next-prompt (:body result)]
      (swap! state assoc-in [:empathy-session :session/data] (:session next-prompt))
      (swap! state assoc-in [:empathy-session :ui/current-prompt] next-prompt))))

(m/defmutation complete-empathy-session [{:keys [session-id]}]
  (remote [env] env))

;; ============================================================================
;; Section Components
;; ============================================================================

(defsc EmpathySection
  "Individual empathy map section display"
  [this {:keys [section-key title response completed?]}]
  (dom/div {:className (str "empathy-section " (when completed? "completed"))}
    (dom/div :.section-header
      (dom/h4 title)
      (when completed?
        (dom/span :.completed-badge "✓")))
    (when response
      (dom/div :.section-response response))))

(def ui-empathy-section (comp/factory EmpathySection {:keyfn :section-key}))

;; ============================================================================
;; Progress Component
;; ============================================================================

(defn empathy-progress [{:keys [current total]}]
  (let [percentage (if (> total 0) (* 100 (/ current total)) 0)]
    (dom/div :.progress-container
      (dom/div :.progress-bar
        (dom/div :.progress-fill {:style {:width (str percentage "%")}}))
      (dom/span :.progress-text (str current "/" total " sections")))))

;; ============================================================================
;; Input Component
;; ============================================================================

(defsc EmpathyInput
  "Input form for current empathy section"
  [this {:keys [prompt hint on-submit]}]
  (let [response (or (comp/get-state this :response) "")]
    (dom/div :.empathy-input
      (dom/div :.prompt-section
        (dom/h3 :.prompt-text prompt)
        (when hint
          (dom/div :.prompt-hint (str "💡 " hint))))
      (dom/div :.input-section
        (dom/textarea {:value response
                       :onChange #(comp/set-state! this {:response (.. % -target -value)})
                       :placeholder "Type your response here..."
                       :rows 5}))
      (dom/div :.input-actions
        (ui/button
          {:on-click #(on-submit response)
           :variant :primary
           :disabled (empty? (str/trim response))}
          "Submit")
        (ui/button
          {:on-click #(on-submit "skip")
           :variant :secondary}
          "Skip")))))

;; ============================================================================
;; Main Builder Page
;; ============================================================================

(defsc EmpathyBuilderPage
  "Empathy Map builder page"
  [this {:keys [project-id project-name session/ui] :as props}]
  {:query         [:project-id :project-name
                   {:session/ui [:ui/current-section :ui/total-sections :ui/prompt :ui/hint
                                :ui/completed-sections :ui/complete?]}
                   :session/data
                   [df/marker-table :empathy-builder]]
   :ident         (fn [] [:page/id :empathy-builder])
   :route-segment ["project" :project-id "empathy"]
   :initial-state (fn [_] {:session/ui {:ui/current-section 0
                                        :ui/total-sections 7
                                        :ui/prompt "Who is your customer?"
                                        :ui/hint "Give them a name, age, job"
                                        :ui/completed-sections []
                                        :ui/complete? false}})
   :will-enter    (fn [app {:keys [project-id]}]
                    (dr/route-deferred [:page/id :empathy-builder]
                      (fn []
                        (df/load! app [:page/id :empathy-builder] EmpathyBuilderPage
                          {:marker :empathy-builder
                           :params {:project-id project-id}
                           :post-mutation `dr/target-ready
                           :post-mutation-params {:target [:page/id :empathy-builder]}}))))}
  
  (let [loading? (df/loading? (get props [df/marker-table :empathy-builder]))
        {:keys [ui/current-section ui/total-sections ui/prompt ui/hint
                ui/completed-sections ui/complete?]} (or ui {})
        session-data (or (:session/data props) {})]
    
    (if loading?
      (dom/div :.loading "Loading empathy builder...")
      (dom/div :.empathy-builder-page
        ;; Header
        (dom/div :.builder-header
          (dom/h1 "🧠 Empathy Map Builder")
          (dom/p :.builder-subtitle (str "Project: " project-name)))
        
        ;; Progress
        (empathy-progress {:current (count completed-sections) :total total-sections})
        
        (if complete?
          ;; Completion State
          (dom/div :.completion-state
            (dom/div :.completion-icon "🎉")
            (dom/h2 "Empathy Map Complete!")
            (dom/p "You now deeply understand your customer. Ready for the next step?")
            (dom/div :.completion-actions
              (ui/button
                {:on-click #(dr/change-route! this ["project" {:project-id project-id}])
                 :variant :secondary}
                "Back to Project")
              (ui/button
                {:on-click #(dr/change-route! this ["project" {:project-id project-id} "valueprop"])
                 :variant :primary}
                "Continue to Value Proposition →")))
          
          ;; Active Builder
          (dom/div :.builder-content
            ;; Current Input
            (when prompt
              (ui/card {:title (str "Section " (inc (count completed-sections)) "/" total-sections)}
                (empathy-input
                  {:prompt prompt
                   :hint hint
                   :on-submit (fn [response]
                                (comp/transact! this [(submit-empathy-section
                                                        {:session-id (:session/id session-data)
                                                         :section-key (keyword (str "section-" current-section))
                                                         :response response})]))})))
            
            ;; Completed Sections Summary
            (when (seq completed-sections)
              (ui/card {:title "Completed Sections"}
                (dom/div :.completed-sections
                  (map #(ui-empathy-section %) completed-sections))))))))))
