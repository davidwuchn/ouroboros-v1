(ns ouroboros.frontend.ui.pages.users
  "User management page"
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

(defn users-loading []
  (dom/div
    (dom/h1 "Users")
    ;; Stats skeleton
    (dom/div {:className "metrics-grid mb-3"}
      (repeat 2
        (dom/div :.metric-card
          (dom/div {:className "skeleton-text"
                    :style {:width "60px" :height "2.5rem" :margin "0 auto"}})
          (dom/div {:className "skeleton-text"
                    :style {:width "100px" :margin "0.5rem auto 0"}}))))
    ;; Table skeleton
    (ui/card {:title "Registered Users"}
      (dom/div {:className "skeleton-table"}
        ;; Header
        (dom/div {:className "skeleton-row"
                  :style {:display "flex"
                          :gap "1rem"
                          :padding "0.75rem 0"
                          :borderBottom "2px solid var(--color-border)"
                          :marginBottom "0.5rem"}}
          (dom/div {:className "skeleton-text" :style {:width "100px" :fontWeight "bold"}})
          (dom/div {:className "skeleton-text" :style {:width "80px" :fontWeight "bold"}})
          (dom/div {:className "skeleton-text" :style {:width "60px" :fontWeight "bold"}})
          (dom/div {:className "skeleton-text" :style {:width "120px" :fontWeight "bold"}})
          (dom/div {:className "skeleton-text" :style {:width "120px" :fontWeight "bold"}}))
        ;; Rows
        (repeat 5
          (dom/div {:className "skeleton-row"
                    :style {:display "flex"
                            :gap "1rem"
                            :padding "0.75rem 0"
                            :borderBottom "1px solid var(--color-border)"}}
            (dom/div {:className "skeleton-text" :style {:width "100px"}})
            (dom/div {:className "skeleton-text" :style {:width "80px"}})
            (dom/div {:className "skeleton-text" :style {:width "60px"}})
            (dom/div {:className "skeleton-text" :style {:width "120px"}})
            (dom/div {:className "skeleton-text" :style {:width "120px"}}))))))))

;; ============================================================================
;; User Entity
;; ============================================================================

(defsc User
  [this {:keys [user/id user/name user/platform user/role
                user/created-at user/last-active]}]
  {:query [:user/id :user/name :user/platform :user/role
           :user/created-at :user/last-active]
   :ident :user/id}
  (dom/div))

;; ============================================================================
;; User Table
;; ============================================================================

(defn user-table
  "Table of users"
  [users]
  (let [columns [{:key :name :label "Name"}
                 {:key :platform :label "Platform"}
                 {:key :role
                  :label "Role"
                  :format (fn [v _]
                            (dom/span
                              {:className (str "badge "
                                              (case v
                                                :admin "badge-primary"
                                                "badge-secondary"))}
                              (name v)))}
                 {:key :created-at :label "Created"}
                 {:key :last-active :label "Last Active"}]
        rows (map (fn [u]
                    {:name (:user/name u)
                     :platform (name (:user/platform u))
                     :role (:user/role u)
                     :created-at (:user/created-at u)
                     :last-active (:user/last-active u)})
                  users)]
    (ui/data-table
      {:columns columns
       :rows rows
       :empty-message "No users registered"})))

;; ============================================================================
;; Main Users Page
;; ============================================================================

(defsc UsersPage
  [this {:keys [auth/user-count auth/admin-count auth/users
                page/error]
         :as props}]
  {:query [:auth/user-count
           :auth/admin-count
           {:auth/users (comp/get-query User)}
           [df/marker-table :users]
           {:page/error (comp/get-query ui/ErrorDisplay)}]
   :ident (fn [] [:page/id :users])
   :route-segment ["users"]
   :will-enter (fn [app route-params]
                 (dr/route-deferred [:page/id :users]
                   (fn []
                     (df/load! app [:page/id :users] UsersPage
                       {:marker :users
                        :post-mutation `dr/target-ready
                        :post-mutation-params {:target [:page/id :users]}
                        :fallback `handle-load-error
                        :fallback-params {:page-id :users
                                          :error-message "Failed to load users data"}}))))}

  (let [loading? (df/loading? (get props [df/marker-table :users]))
        error-msg (get-in props [:page/error :users])]
    (cond
      error-msg
      (ui/error-state
        {:message error-msg
         :on-retry #(do
                      (comp/transact! this `[(clear-page-error {:page-id :users})])
                      (df/load! this [:page/id :users] UsersPage
                        {:marker :users
                         :fallback `handle-load-error
                         :fallback-params {:page-id :users
                                           :error-message "Failed to load users data"}}))})

      loading?
      (users-loading)

      :else
      (dom/div
        (dom/h1 "Users")

        ;; Stats
        (dom/div {:className "metrics-grid mb-3"}
          (ui/metric-card
            {:value (or user-count 0)
             :label "Total Users"})
          (ui/metric-card
            {:value (or admin-count 0)
             :label "Admins"}))

        ;; Users Table
        (ui/card {:title "Registered Users"}
          (if (seq users)
            (user-table users)
            (ui/empty-state
              {:icon "Users"
               :message "No users registered yet"}))))))))
