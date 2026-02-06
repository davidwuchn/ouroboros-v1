(ns ouroboros.frontend.ui.pages.sessions
  "Chat sessions page"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
;; Error Handling Mutation
;; ============================================================================

(m/defmutation handle-load-error [{:keys [page-id error-message]}]
  (action [{:keys [state]}]
          (swap! state assoc-in [:page/error page-id] error-message))
  (remote [env] true))

(m/defmutation clear-page-error [{:keys [page-id]}]
  (action [{:keys [state]}]
          (swap! state update :page/error dissoc page-id)))

;; ============================================================================
;; Loading Skeleton
;; ============================================================================

(defn sessions-loading []
  (dom/div
   (dom/h1 "Chat Sessions")
    ;; Sessions table skeleton
   (ui/card {:title "Active Sessions"}
            (dom/div {:className "skeleton-table"}
        ;; Header
                     (dom/div {:className "skeleton-row"
                               :style {:display "flex"
                                       :gap "1rem"
                                       :padding "0.75rem 0"
                                       :borderBottom "2px solid var(--color-border)"
                                       :marginBottom "0.5rem"}}
                              (dom/div {:className "skeleton-text" :style {:width "200px" :fontWeight "bold"}})
                              (dom/div {:className "skeleton-text" :style {:width "100px" :fontWeight "bold"}})
                              (dom/div {:className "skeleton-text" :style {:width "80px" :fontWeight "bold"}})
                              (dom/div {:className "skeleton-text" :style {:width "150px" :fontWeight "bold"}}))
        ;; Rows
                     (repeat 3
                             (dom/div {:className "skeleton-row"
                                       :style {:display "flex"
                                               :gap "1rem"
                                               :padding "0.75rem 0"
                                               :borderBottom "1px solid var(--color-border)"}}
                                      (dom/div {:className "skeleton-text" :style {:width "200px"}})
                                      (dom/div {:className "skeleton-text" :style {:width "100px"}})
                                      (dom/div {:className "skeleton-text" :style {:width "80px"}})
                                      (dom/div {:className "skeleton-text" :style {:width "150px"}})))))
    ;; Adapters skeleton
   (ui/card {:title "Chat Adapters"}
            (dom/div {:className "flex flex-col gap-2"}
                     (repeat 3
                             (dom/div {:className "flex items-center gap-2"}
                                      (dom/div {:className "skeleton-text" :style {:width "12px" :height "12px" :borderRadius "50%"}})
                                      (dom/div {:className "skeleton-text" :style {:width "120px"}})))))))

;; ============================================================================
;; Chat Entities
;; ============================================================================

(defsc ChatSession
  [this {:keys [chat/id chat/message-count chat/created-at
                chat/platform chat/running?]}]
  {:query [:chat/id :chat/message-count :chat/created-at
           :chat/platform :chat/running?]
   :ident :chat/id}
  (dom/div))

(defsc ChatAdapter
  [this {:keys [adapter/platform adapter/running?]}]
  {:query [:adapter/platform :adapter/running?]
   :ident (fn [] [:adapter/platform (:adapter/platform this)])}
  (dom/div))

;; ============================================================================
;; Session Table
;; ============================================================================

(defn session-table
  "Table of chat sessions"
  [sessions]
  (let [columns [{:key :id :label "Session ID"}
                 {:key :platform :label "Platform"}
                 {:key :message-count :label "Messages"}
                 {:key :created-at :label "Created"}]
        rows (map (fn [s]
                    {:id (:chat/id s)
                     :platform (name (or (:chat/platform s) :unknown))
                     :message-count (:chat/message-count s)
                     :created-at (:chat/created-at s)})
                  sessions)]
    (ui/data-table
     {:columns columns
      :rows rows
      :empty-message "No active chat sessions"})))

;; ============================================================================
;; Adapters List
;; ============================================================================

(defn adapter-list
  "List of chat adapters"
  [adapters]
  (dom/div
   (map (fn [adapter]
          (dom/div {:key (str (:adapter/platform adapter))
                    :className "flex items-center gap-2 mb-2"}
                   (ui/status-badge
                    {:ok? (:adapter/running? adapter)
                     :text (str (name (:adapter/platform adapter))
                                " "
                                (if (:adapter/running? adapter) "Running" "Stopped"))})))
        adapters)))

;; ============================================================================
;; Main Sessions Page
;; ============================================================================

(defsc SessionsPage
  [this {:keys [chat/sessions chat/adapters
                page/error]
         :as props}]
  {:query [{:chat/sessions (comp/get-query ChatSession)}
           {:chat/adapters (comp/get-query ChatAdapter)}
           [df/marker-table :sessions]
           {:page/error (comp/get-query ui/ErrorDisplay)}]
   :ident (fn [] [:page/id :sessions])
   :route-segment ["sessions"]
   :will-enter (fn [app route-params]
                 (dr/route-deferred [:page/id :sessions]
                                    (fn []
                                      (df/load! app [:page/id :sessions] SessionsPage
                                                {:marker :sessions
                                                 :post-mutation `dr/target-ready
                                                 :post-mutation-params {:target [:page/id :sessions]}
                                                 :fallback `handle-load-error
                                                 :fallback-params {:page-id :sessions
                                                                   :error-message "Failed to load sessions data"}}))))}

  (let [loading? (df/loading? (get props [df/marker-table :sessions]))
        error-msg (get-in props [:page/error :sessions])]
    (cond
      error-msg
      (ui/error-state
       {:message error-msg
        :on-retry #(do
                     (comp/transact! this `[(clear-page-error {:page-id :sessions})])
                     (df/load! this [:page/id :sessions] SessionsPage
                               {:marker :sessions
                                :fallback `handle-load-error
                                :fallback-params {:page-id :sessions
                                                  :error-message "Failed to load sessions data"}}))})

      loading?
      (sessions-loading)

      :else
      (dom/div
       (dom/h1 "Chat Sessions")

        ;; Active Sessions
       (ui/card {:title (str "Active Sessions (" (count sessions) ")")}
                (if (seq sessions)
                  (session-table sessions)
                  (ui/empty-state
                   {:icon "Chat"
                    :message "No active chat sessions"})))

        ;; Adapters
       (when (seq adapters)
         (ui/card {:title "Chat Adapters"}
                  (adapter-list adapters)))))))
