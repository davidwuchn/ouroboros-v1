(ns ouroboros.frontend.ui.pages.mvp-builder
  "MVP Planning builder page"
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

(m/defmutation start-mvp-session [{:keys [project-id]}]
  (remote [env] env)
  (ok-action [{:keys [result state]}]
    (let [session-data (:body result)]
      (swap! state assoc-in [:mvp-session :session/data] session-data))))

(m/defmutation submit-mvp-section [{:keys [session-id section-key response]}]
  (remote [env] env)
  (ok-action [{:keys [result state]}]
    (let [next-prompt (:body result)]
      (swap! state assoc-in [:mvp-session :session/data] (:session next-prompt))
      (swap! state assoc-in [:mvp-session :ui/current-prompt] next-prompt))))

(m/defmutation complete-mvp-session [{:keys [session-id]}]
  (remote [env] env))

;; ============================================================================
;; Section Components
;; ============================================================================

(defsc MVPSection
  "Individual MVP planning section display"
  [this {:keys [section-key title response completed?]}]
  (dom/div {:className (str "mvp-section " (when completed? "completed"))}
    (dom/div :.section-header
      (dom/h4 title)
      (when completed?
        (dom/span :.completed-badge "✓")))
    (when response
      (dom/div :.section-response response))))

(def ui-mvp-section (comp/factory MVPSection {:keyfn :section-key}))

;; ============================================================================
;; Progress Component
;; ============================================================================

(defn mvp-progress [{:keys [current total]}]
  (let [percentage (if (> total 0) (* 100 (/ current total)) 0)]
    (dom/div :.progress-container
      (dom/div :.progress-bar
        (dom/div :.progress-fill {:style {:width (str percentage "%")}}))
      (dom/span :.progress-text (str current "/" total " sections")))))

;; ============================================================================
;; Input Component
;; ============================================================================

(defsc MVPInput
  "Input form for current MVP planning section"
  [this {:keys [prompt hint on-submit]}]
  (let [response (or (comp/get-state this :response) "")]
    (dom/div :.mvp-input
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

(def ui-mvp-input (comp/factory MVPInput))

;; ============================================================================
;; Main Builder Page
;; ============================================================================

(defsc MVPBuilderPage
  "MVP Planning builder page"
  [this {:keys [project-id project-name session/ui] :as props}]
  {:query         [:project-id :project-name
                   {:session/ui [:ui/current-section :ui/total-sections :ui/prompt :ui/hint
                                :ui/completed-sections :ui/complete?]}
                   :session/data
                   [df/marker-table :mvp-builder]]
   :ident         (fn [] [:page/id :mvp-builder])
   :route-segment ["project" :project-id "mvp"]
   :initial-state (fn [_] {:session/ui {:ui/current-section 0
                                        :ui/total-sections 8
                                        :ui/prompt "What is the smallest version of your product?"
                                        :ui/hint "Focus on the core functionality that delivers value"
                                        :ui/completed-sections []
                                        :ui/complete? false}})
   :will-enter    (fn [app {:keys [project-id]}]
                    (dr/route-deferred [:page/id :mvp-builder]
                      (fn []
                        (df/load! app [:page/id :mvp-builder] MVPBuilderPage
                          {:marker :mvp-builder
                           :params {:project-id project-id}
                           :post-mutation `dr/target-ready
                           :post-mutation-params {:target [:page/id :mvp-builder]}}))))}
  
  (let [loading? (df/loading? (get props [df/marker-table :mvp-builder]))
        {:keys [ui/current-section ui/total-sections ui/prompt ui/hint
                ui/completed-sections ui/complete?]} (or ui {})
        session-data (or (:session/data props) {})]
    
    (if loading?
      (dom/div :.loading "Loading MVP planner...")
      (dom/div :.mvp-builder-page
        ;; Header
        (dom/div :.builder-header
          (dom/h1 "🚀 MVP Planning Builder")
          (dom/p :.builder-subtitle (str "Project: " project-name)))
        
        ;; Progress
        (mvp-progress {:current (count completed-sections) :total total-sections})
        
        (if complete?
          ;; Completion State
          (dom/div :.completion-state
            (dom/div :.completion-icon "🎉")
            (dom/h2 "MVP Plan Complete!")
            (dom/p "You now have a clear MVP plan. Ready for the next step?")
            (dom/div :.completion-actions
              (ui/button
                {:on-click #(dr/change-route! this ["project" {:project-id project-id}])
                 :variant :secondary}
                "Back to Project")
              (ui/button
                {:on-click #(dr/change-route! this ["project" {:project-id project-id} "canvas"])
                 :variant :primary}
                "Continue to Lean Canvas →")))
          
          ;; Active Builder
          (dom/div :.builder-content
            ;; Current Input
            (when prompt
              (ui/card {:title (str "Section " (inc (count completed-sections)) "/" total-sections)}
                (ui-mvp-input
                  {:prompt prompt
                   :hint hint
                   :on-submit (fn [response]
                                (comp/transact! this [(submit-mvp-section
                                                        {:session-id (:session/id session-data)
                                                         :section-key (keyword (str "section-" current-section))
                                                         :response response})]))})))

            ;; Completed Sections Summary
            (when (seq completed-sections)
              (ui/card {:title "Completed Sections"}
                (dom/div :.completed-sections
                  (map #(ui-mvp-section %) completed-sections))))))))))
