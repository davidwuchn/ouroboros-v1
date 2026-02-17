(ns ouroboros.frontend.ui.pages.wisdom
  "Wisdom page - Templates, AI insights, learning patterns.
   
   This is a thin orchestration layer. All heavy lifting is in:
   - ouroboros.frontend.ui.wisdom.data     - Fallback data
   - ouroboros.frontend.ui.wisdom.resize   - Drawer resize logic
   - ouroboros.frontend.ui.wisdom.bmc      - BMC canvas
   - ouroboros.frontend.ui.wisdom.templates - Template section
   - ouroboros.frontend.ui.wisdom.learning  - Learning patterns section"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [ouroboros.frontend.ui.wisdom.data :as data]
   [ouroboros.frontend.ui.wisdom.templates :as templates]
   [ouroboros.frontend.ui.wisdom.learning :as learning]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Wisdom Page Component
;; ============================================================================

(defsc WisdomPage
  [this _props]
  {:query         [:page/id :ui/dummy]
   :ident         (fn [] [:page/id :wisdom])
   :initial-state (fn [_] {:page/id :wisdom
                           :ui/dummy nil})
   :route-segment ["wisdom"]
   :initLocalState (fn [_] {:bmc/selected-key :saas
                            :category-drawer/open? false
                            :category-drawer/state {}})
   :will-enter    (fn [_ _] (dr/route-immediate [:page/id :wisdom]))
   :componentDidMount (fn [this]
                        (let [state-atom @ws/app-state-atom
                              state (when state-atom @state-atom)]
                          ;; Request templates if not loaded
                          (when (and state
                                     (ws/connected?)
                                     (not (get-in state [:content/generated :templates]))
                                     (not (get-in state [:content/loading? :templates])))
                            (ws/request-content! :templates))
                          ;; Pre-seed category insights with defaults
                          (when state-atom
                            (swap! state-atom
                                   (fn [s]
                                     (reduce-kv (fn [acc cat insights]
                                                  (if (seq (get-in acc [:learning/category-insights cat]))
                                                    acc
                                                    (assoc-in acc [:learning/category-insights cat] insights)))
                                                s
                                                data/default-category-insights))))
                          ;; Request real learning categories
                          (when (and state
                                     (not (get state :learning/categories-loading?)))
                            (ws/request-learning-categories!))))}

  (let [state-atom @ws/app-state-atom
        state (when state-atom @state-atom)
        ;; Templates
        eca-templates (when state (get-in state [:content/generated :templates]))
        templates-loading? (when state (get-in state [:content/loading? :templates]))
        templates (if (seq eca-templates) eca-templates data/fallback-templates)
        template-store (get-in state [:wisdom/template])
        selected-key (or (comp/get-state this :bmc/selected-key) :saas)
        ;; Learning categories
        real-categories (when state (get state :learning/categories))
        categories-loading? (when state (get state :learning/categories-loading?))
        categories (if (seq real-categories)
                     (data/enrich-categories real-categories)
                     (mapv #(assoc % :count (count (get data/default-category-insights (:category %) [])))
                           data/fallback-learning-categories-base))
        ;; Project info
        ws-project (get state :workspace/project)
        project-id (:project/id ws-project)
        ;; Drawer state
        drawer-open? (boolean (comp/get-state this :category-drawer/open?))
        drawer-state (or (comp/get-state this :category-drawer/state) {})]

    (dom/div {:className "wisdom-page"}
      ;; Page Header
      (dom/div :.wisdom-page-header
        (dom/h1 "Wisdom")
        (dom/p :.wisdom-subtitle
          "Templates, insights, and patterns to accelerate your product thinking."))

      ;; Templates Section
      (templates/templates-section
        {:templates templates
         :templates-loading? templates-loading?
         :template-store template-store
         :selected-key selected-key
         :project-id project-id
         :on-select-template (fn [k]
                               (comp/set-state! this {:bmc/selected-key k}))})

      ;; Learning Patterns Section
      (learning/learning-section
        {:this this
         :categories categories
         :categories-loading? categories-loading?
         :category-insights (get state :learning/category-insights)
         :category-insights-loading? (get state :learning/category-insights-loading?)
         :drawer-open? drawer-open?
         :drawer-state drawer-state
         :on-category-select (fn [label category]
                               (let [insights (get data/default-category-insights category [])
                                     insight-count (if (sequential? insights) (cljs.core/count insights) 0)]
                                 (comp/set-state! this
                                   {:category-drawer/open? true
                                    :category-drawer/state {:category category
                                                            :label label
                                                            :description (get-in data/category-metadata [category :description])
                                                            :card-count insight-count}})))
         :on-close-drawer (fn []
                            (comp/set-state! this {:category-drawer/open? false}))}))))

(def ui-wisdom-page (comp/factory WisdomPage))