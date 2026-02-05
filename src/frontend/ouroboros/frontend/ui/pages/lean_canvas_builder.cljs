(ns ouroboros.frontend.ui.pages.lean-canvas-builder
  "Lean Canvas builder page"
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

(m/defmutation start-lean-canvas-session [{:keys [project-id]}]
  (remote [env] env)
  (ok-action [{:keys [result state]}]
    (let [session-data (:body result)]
      (swap! state assoc-in [:lean-canvas-session :session/data] session-data))))

(m/defmutation submit-lean-canvas-section [{:keys [session-id section-key response]}]
  (remote [env] env)
  (ok-action [{:keys [result state]}]
    (let [next-prompt (:body result)]
      (swap! state assoc-in [:lean-canvas-session :session/data] (:session next-prompt))
      (swap! state assoc-in [:lean-canvas-session :ui/current-prompt] next-prompt))))

(m/defmutation complete-lean-canvas-session [{:keys [session-id]}]
  (remote [env] env))

;; ============================================================================
;; Section Components
;; ============================================================================

(defsc LeanCanvasSection
  "Individual Lean Canvas section display"
  [this {:keys [section-key title response completed?]}]
  (dom/div {:className (str "lean-canvas-section " (when completed? "completed"))}
    (dom/div :.section-header
      (dom/h4 title)
      (when completed?
        (dom/span :.completed-badge "✓")))
    (when response
      (dom/div :.section-response response))))

(def ui-lean-canvas-section (comp/factory LeanCanvasSection {:keyfn :section-key}))

;; ============================================================================
;; Progress Component
;; ============================================================================

(defn lean-canvas-progress [{:keys [current total]}]
  (let [percentage (if (> total 0) (* 100 (/ current total)) 0)]
    (dom/div :.progress-container
      (dom/div :.progress-bar
        (dom/div :.progress-fill {:style {:width (str percentage "%")}}))
      (dom/span :.progress-text (str current "/" total " sections")))))

;; ============================================================================
;; Input Component
;; ============================================================================

(defsc LeanCanvasInput
  "Input form for current Lean Canvas section"
  [this {:keys [prompt hint on-submit]}]
  (let [response (or (comp/get-state this :response) "")]
    (dom/div :.lean-canvas-input
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

(defsc LeanCanvasBuilderPage
  "Lean Canvas builder page"
  [this {:keys [project-id project-name session/ui] :as props}]
  {:query         [:project-id :project-name
                   {:session/ui [:ui/current-section :ui/total-sections :ui/prompt :ui/hint
                                :ui/completed-sections :ui/complete?]}
                   :session/data
                   [df/marker-table :lean-canvas-builder]]
   :ident         (fn [] [:page/id :lean-canvas-builder])
   :route-segment ["project" :project-id "canvas"]
   :initial-state (fn [_] {:session/ui {:ui/current-section 0
                                        :ui/total-sections 9
                                        :ui/prompt "What is your unique value proposition?"
                                        :ui/hint "The single, clear, compelling message"
                                        :ui/completed-sections []
                                        :ui/complete? false}})
   :will-enter    (fn [app {:keys [project-id]}]
                    (dr/route-deferred [:page/id :lean-canvas-builder]
                      (fn []
                        (df/load! app [:page/id :lean-canvas-builder] LeanCanvasBuilderPage
                          {:marker :lean-canvas-builder
                           :params {:project-id project-id}
                           :post-mutation `dr/target-ready
                           :post-mutation-params {:target [:page/id :lean-canvas-builder]}}))))}
  
  (let [loading? (df/loading? (get props [df/marker-table :lean-canvas-builder]))
        {:keys [ui/current-section ui/total-sections ui/prompt ui/hint
                ui/completed-sections ui/complete?]} (or ui {})
        session-data (or (:session/data props) {})]
    
    (if loading?
      (dom/div :.loading "Loading Lean Canvas builder...")
      (dom/div :.lean-canvas-builder-page
        ;; Header
        (dom/div :.builder-header
          (dom/h1 "📊 Lean Canvas Builder")
          (dom/p :.builder-subtitle (str "Project: " project-name)))
        
        ;; Progress
        (lean-canvas-progress {:current (count completed-sections) :total total-sections})
        
        (if complete?
          ;; Completion State
          (dom/div :.completion-state
            (dom/div :.completion-icon "🎉")
            (dom/h2 "Lean Canvas Complete!")
            (dom/p "You now have a complete business model canvas. Ready to launch!")
            (dom/div :.completion-actions
              (ui/button
                {:on-click #(dr/change-route! this ["project" {:project-id project-id}])
                 :variant :secondary}
                "Back to Project")
              (ui/button
                {:on-click #(dr/change-route! this ["project" {:project-id project-id}])
                 :variant :primary}
                "View Project Dashboard")))
          
          ;; Active Builder
          (dom/div :.builder-content
            ;; Current Input
            (when prompt
              (ui/card {:title (str "Section " (inc (count completed-sections)) "/" total-sections)}
                (lean-canvas-input
                  {:prompt prompt
                   :hint hint
                   :on-submit (fn [response]
                                (comp/transact! this [(submit-lean-canvas-section
                                                        {:session-id (:session/id session-data)
                                                         :section-key (keyword (str "section-" current-section))
                                                         :response response})]))})))
            
            ;; Completed Sections Summary
            (when (seq completed-sections)
              (ui/card {:title "Completed Sections"}
                (dom/div :.completed-sections
                  (map #(ui-lean-canvas-section %) completed-sections))))))))))
