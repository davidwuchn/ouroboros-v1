(ns ouroboros.frontend.model.user
  "User data model"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]))

;; ============================================================================
;; User Entity
;; ============================================================================

(defsc User [this {:keys [:user/id :user/name :user/platform :user/role
                          :user/created-at :user/last-active]}]
  {:query [:user/id
           :user/name
           :user/platform
           :user/role
           :user/created-at
           :user/last-active]
   :ident :user/id}
  {})

;; ============================================================================
;; User List Component
;; ============================================================================

(defsc UserList [this {:keys [:user-list/users]}]
  {:query [{:user-list/users (comp/get-query User)}]
   :ident (fn [] [:component/id :user-list])}
  {})

;; ============================================================================
;; Queries
;; ============================================================================

(defn users-query
  "Query for all users"
  []
  [{:auth/users (comp/get-query User)}])
