(ns ouroboros.frontend.ui.pages.value-prop-builder
  "Value Proposition builder page"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
;; Mutations
;; ============================================================================

(m/defmutation start-value-prop-session [{:keys [project-id]}]
  (remote [env] env)
  (ok-action [{:keys [result state]}]
    (let [session-data (:body result)]
      (swap! state assoc-in [:value-prop-session :session/data] session-data))))

(m/defmutation submit-value-prop-section [{:keys [session-id section-key response]}]
  (remote [env] env)
  (ok-action [{:keys [result state]}]
    (let [next-prompt (:body result)]
      (swap! state assoc-in [:value-prop-session :session/data] (:session next-prompt))
      (swap! state assoc-in [:value-prop-session :ui/current-prompt] next-prompt))))

(m/defmutation complete-value-prop-session [{:keys [session-id]}]
  (remote [env] env))

;; ============================================================================
;; Section Components
;; ============================================================================

(defsc ValuePropSection
  "Individual value proposition section display"
  [this {:keys [section-key title response completed?]}]
  (dom/div {:className (str "value-prop-section " (when completed? "completed"))}
    (dom/div :.section-header
      (dom/h4 title)
      (when completed?
        (dom/span :.completed-badge "✓")))
    (when response
      (dom/div :.section-response response))))

(def ui-value-prop-section (comp/factory ValuePropSection {:keyfn :section-key}))

;; ============================================================================
;; Progress Component
;; ============================================================================

(defn value-prop-progress [{:keys [current total]}]
  (let [percentage (if (> total 0) (* 100 (/ current total)) 0)]
    (dom/div :.progress-container
      (dom/div :.progress-bar
        (dom/div :.progress-fill {:style {:width (str percentage "%")}}))
      (dom/span :.progress-text (str current "/" total " sections")))))

;; ============================================================================
;; Input Component
;; ============================================================================

(defsc ValuePropInput
  "Input form for current value proposition section"
  [this {:keys [prompt hint on-submit]}]
  (let [response (or (comp/get-state this :response) "")]
    (dom/div :.value-prop-input
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

(defsc ValuePropBuilderPage
  "Value Proposition builder page"
  [this {:keys [project-id project-name session/ui] :as props}]
  {:query         [:project-id :project-name
                   {:session/ui [:ui/current-section :ui/total-sections :ui/prompt :ui/hint
                                :ui/completed-sections :ui/complete?]}
                   :session/data
                   [df/marker-table :value-prop-builder]]
   :ident         (fn [] [:page/id :value-prop-builder])
   :route-segment ["project" :project-id "valueprop"]
   :initial-state (fn [_] {:session/ui {:ui/current-section 0
                                        :ui/total-sections 6
                                        :ui/prompt "What job does your customer need to get done?"
                                        :ui/hint "Describe the core problem they're trying to solve"
                                        :ui/completed-sections []
                                        :ui/complete? false}})
   :will-enter    (fn [app {:keys [project-id]}]
                    (dr/route-deferred [:page/id :value-prop-builder]
                      (fn []
                        (df/load! app [:page/id :value-prop-builder] ValuePropBuilderPage
                          {:marker :value-prop-builder
                           :params {:project-id project-id}
                           :post-mutation `dr/target-ready
                           :post-mutation-params {:target [:page/id :value-prop-builder]}}))))}
  
  (let [loading? (df/loading? (get props [df/marker-table :value-prop-builder]))
        {:keys [ui/current-section ui/total-sections ui/prompt ui/hint
                ui/completed-sections ui/complete?]} (or ui {})
        session-data (or (:session/data props) {})]
    
    (if loading?
      (dom/div :.loading "Loading value proposition builder...")
      (dom/div :.value-prop-builder-page
        ;; Header
        (dom/div :.builder-header
          (dom/h1 "🎯 Value Proposition Builder")
          (dom/p :.builder-subtitle (str "Project: " project-name)))
        
        ;; Progress
        (value-prop-progress {:current (count completed-sections) :total total-sections})
        
        (if complete?
          ;; Completion State
          (dom/div :.completion-state
            (dom/div :.completion-icon "🎉")
            (dom/h2 "Value Proposition Complete!")
            (dom/p "You now have a clear value proposition. Ready for the next step?")
            (dom/div :.completion-actions
              (ui/button
                {:on-click #(dr/change-route! this ["project" {:project-id project-id}])
                 :variant :secondary}
                "Back to Project")
              (ui/button
                {:on-click #(dr/change-route! this ["project" {:project-id project-id} "mvp"])
                 :variant :primary}
                "Continue to MVP Planning →")))
          
          ;; Active Builder
          (dom/div :.builder-content
            ;; Current Input
            (when prompt
              (ui/card {:title (str "Section " (inc (count completed-sections)) "/" total-sections)}
                (value-prop-input
                  {:prompt prompt
                   :hint hint
                   :on-submit (fn [response]
                                (comp/transact! this [(submit-value-prop-section
                                                        {:session-id (:session/id session-data)
                                                         :section-key (keyword (str "section-" current-section))
                                                         :response response})]))})))
            
            ;; Completed Sections Summary
            (when (seq completed-sections)
              (ui/card {:title "Completed Sections"}
                (dom/div :.completed-sections
                  (map #(ui-value-prop-section %) completed-sections))))))))))
