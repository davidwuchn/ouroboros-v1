(ns ouroboros.auth
  "Auth - User authentication and authorization
   
   Manages user identities across chat platforms.
   Simple token-based auth for API access.
   
   Features:
   - User registration by platform ID
   - Permission levels (user, admin)
   - API token generation
   - Rate limit tracking per user"
  (:require
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.resolver-registry :as registry]
   [ouroboros.telemetry :as telemetry])
  (:import [java.time Instant]
           [java.security SecureRandom]
           [java.util Base64]))

;; ============================================================================
;; User Registry
;; ============================================================================

(defonce ^:private users (atom {}))

(defn- generate-token
  "Generate secure random token"
  []
  (let [bytes (byte-array 32)
        random (SecureRandom.)]
    (.nextBytes random bytes)
    (.encodeToString (Base64/getEncoder) bytes)))

(defn- make-user
  "Create user record"
  [platform platform-id name]
  {:user/id (str (java.util.UUID/randomUUID))
   :user/platform platform
   :user/platform-id platform-id
   :user/name name
   :user/role :user
   :user/created-at (str (Instant/now))
   :user/api-token (generate-token)
   :user/last-active (str (Instant/now))})

(defn get-or-create-user
  "Get existing user or create new one"
  [platform platform-id name]
  (let [key [platform platform-id]]
    (if-let [user (get @users key)]
      (do
        (swap! users assoc-in [key :user/last-active] (str (Instant/now)))
        user)
      (let [new-user (make-user platform platform-id name)]
        (swap! users assoc key new-user)
        (telemetry/emit! {:event :auth/user-created
                          :platform platform
                          :user-id (:user/id new-user)})
        new-user))))

(defn get-user
  "Get user by platform ID"
  [platform platform-id]
  (get @users [platform platform-id]))

(defn get-user-by-token
  "Get user by API token"
  [token]
  (first (filter #(= (:user/api-token %) token) (vals @users))))

(defn list-users
  "List all registered users"
  []
  (vals @users))

;; ============================================================================
;; Permissions
;; ============================================================================

(def ^:private role-permissions
  {:user #{:chat :read :query}
   :admin #{:chat :read :query :admin :config :shutdown}})

(defn has-permission?
  "Check if user has permission"
  [user permission]
  (let [role (:user/role user :user)
        perms (get role-permissions role #{})]
    (contains? perms permission)))

(defn set-role!
  "Set user role (admin only)"
  [admin-user target-user-id new-role]
  (if (has-permission? admin-user :admin)
    (let [target (first (filter #(= (:user/id %) target-user-id) (vals @users)))]
      (if target
        (do
          (swap! users assoc-in [[(:user/platform target) (:user/platform-id target)] :user/role] new-role)
          {:status :success :user-id target-user-id :role new-role})
        {:status :error :message "User not found"}))
    {:status :error :message "Permission denied"}))

;; ============================================================================
;; Rate Limiting
;; ============================================================================

(defonce ^:private rate-limits (atom {}))

(def ^:private rate-config
  {:messages-per-minute 30
   :queries-per-minute 60})

(defn check-rate-limit
  "Check if user is within rate limits"
  [user-id action]
  (let [now (System/currentTimeMillis)
        window-ms (* 60 1000)  ; 1 minute
        key [user-id action]
        timestamps (get @rate-limits key [])
        ;; Filter to last minute
        recent (filter #(> % (- now window-ms)) timestamps)
        limit (case action
                :message (:messages-per-minute rate-config)
                :query (:queries-per-minute rate-config)
                30)]
    (if (>= (count recent) limit)
      {:allowed? false
       :retry-after (- window-ms (- now (first recent)))
       :limit limit}
      (do
        (swap! rate-limits assoc key (conj recent now))
        {:allowed? true :remaining (- limit (count recent) 1)}))))

(defn with-rate-limit
  "Execute function with rate limiting"
  [user-id action f]
  (let [check (check-rate-limit user-id action)]
    (if (:allowed? check)
      (try
        {:result (f) :rate-limit check}
        (catch Exception e
          {:error (.getMessage e) :rate-limit check}))
      {:error "Rate limit exceeded"
       :retry-after (:retry-after check)
       :rate-limit check})))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(pco/defresolver auth-users [_]
  {::pco/output [{:auth/users [:user/id :user/name :user/platform :user/role :user/created-at :user/last-active]}]}
  {:auth/users (map #(select-keys % [:user/id :user/name :user/platform :user/role :user/created-at :user/last-active])
                    (vals @users))})

(pco/defresolver auth-stats [_]
  {::pco/output [:auth/user-count :auth/admin-count]}
  {:auth/user-count (count @users)
   :auth/admin-count (count (filter #(= (:user/role %) :admin) (vals @users)))})

(pco/defresolver page-users [_]
  {::pco/output [:page/id :users
                 :auth/user-count :auth/admin-count
                 {:auth/users [:user/id :user/name :user/platform :user/role :user/created-at :user/last-active]}]}
  {:page/id :users
   :auth/user-count (count @users)
   :auth/admin-count (count (filter #(= (:user/role %) :admin) (vals @users)))
   :auth/users (map #(select-keys % [:user/id :user/name :user/platform :user/role :user/created-at :user/last-active])
                    (vals @users))})

(pco/defmutation auth-set-role! [{:keys [admin-token target-id role]}]
  {::pco/output [:status :message]}
  (let [admin (get-user-by-token admin-token)]
    (if admin
      (let [result (set-role! admin target-id (keyword role))]
        result)
      {:status :error :message "Invalid admin token"})))

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [auth-users auth-stats page-users])

(def mutations
  [auth-set-role!])

;; Register with resolver registry on load
(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

(comment
  ;; Create users
  (get-or-create-user :telegram "123456" "Alice")
  (get-or-create-user :slack "U123" "Bob")

  ;; Check permissions
  (def alice (get-user :telegram "123456"))
  (has-permission? alice :chat)
  (has-permission? alice :admin)

  ;; Rate limiting
  (check-rate-limit (:user/id alice) :message)
  (dotimes [_ 35] (check-rate-limit "test" :message))

  ;; List users
  (list-users)

  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:auth/user-count :auth/admin-count])
  (q/q [{:auth/users [:user/id :user/name]}]))
