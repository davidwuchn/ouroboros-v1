(ns ouroboros.interface.auth
  "Auth interface - Authentication and permissions"
  (:require
   [ouroboros.auth :as auth]))

(defn auth-get-user
  "Get or create user by platform ID
   
   Usage: (auth-get-user :telegram \"123456\" \"Alice\")"
  [platform platform-id name]
  (auth/get-or-create-user platform platform-id name))

(defn auth-users
  "List all registered users
   
   Usage: (auth-users)"
  []
  (auth/list-users))

(defn auth-check-permission
  "Check if user has permission
   
   Usage: (auth-check-permission user :admin)"
  [user permission]
  (auth/has-permission? user permission))

(defn auth-rate-limit
  "Check rate limit for user action
   
   Usage: (auth-rate-limit user-id :message)"
  [user-id action]
  (auth/check-rate-limit user-id action))
