(ns ouroboros.collaboration
  "Real-time collaboration for Web UX Platform

   Manages multi-user presence, cursor tracking, and operational transforms
   for concurrent editing on shared canvases.

   Features:
   - User presence (join/leave notifications)
   - Cursor position tracking
   - Operational transforms for conflict resolution
   - Comment threads on canvas elements
   - Version history and snapshots

   Usage:
   (require '[ouroboros.collaboration :as collab])
   (collab/join-session! :session-123 :user-456)
   (collab/update-cursor! :session-123 :user-456 {:x 100 :y 200})
   (collab/add-comment! :session-123 :user-456 :item-789 \"Great insight!\")"
  (:require
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.resolver-registry :as registry]
   [ouroboros.websocket :as ws])
  (:import [java.util.concurrent.atomic AtomicLong]))

;; ============================================================================
;; Session State
;; ============================================================================

(defonce session-presence (atom {}))
(defonce cursor-positions (atom {}))
(defonce operation-log (atom {}))
(defonce comments-store (atom {}))
(defonce version-history (atom {}))

(defonce operation-counter (AtomicLong. 0))

;; Session TTL: 24 hours
(def ^:private session-ttl-ms (* 24 60 60 1000))

(defn- next-op-id []
  (.incrementAndGet operation-counter))

(defn- session-key [session-id]
  (keyword (str "collab-session/" session-id)))

(defn- presence-key [session-id]
  (keyword (str "presence/" session-id)))

(defn- cursors-key [session-id]
  (keyword (str "cursors/" session-id)))

(defn- comments-key [session-id]
  (keyword (str "comments/" session-id)))

(defn- versions-key [session-id]
  (keyword (str "versions/" session-id)))

;; ============================================================================
;; Session Cleanup
;; ============================================================================

(defn cleanup-stale-sessions!
  "Remove sessions inactive for longer than session-ttl-ms"
  []
  (let [cutoff (- (System/currentTimeMillis) session-ttl-ms)]
    (swap! session-presence
           (fn [presences]
             (->> presences
                  (remove (fn [[session-id users]]
                            (every? #(> cutoff (:user/joined-at %))
                                    (vals users))))
                  (into {}))))
    (swap! cursor-positions
           (fn [cursors]
             (->> cursors
                  (remove (fn [[session-id positions]]
                            (every? #(> cutoff (:timestamp %))
                                    (vals positions))))
                  (into {}))))))

;; ============================================================================
;; Presence Management
;; ============================================================================

(def ^:private user-colors
  ["#FF6B6B" "#4ECDC4" "#45B7D1" "#96CEB4" "#FFEAA7" "#DDA0DD"])

(defn- deterministic-color
  "Get a deterministic color for a user based on their ID"
  [user-id]
  (nth user-colors (mod (hash user-id) (count user-colors))))

(defn join-session!
  "User joins a collaboration session"
  [session-id user-id user-name & {:keys [color avatar]}]
  (let [user-info {:user/id user-id
                   :user/name user-name
                   :user/color (or color (deterministic-color user-id))
                   :user/avatar (or avatar "👤")
                   :user/joined-at (System/currentTimeMillis)}
        key (presence-key session-id)]

    ;; Update in-memory state
    (swap! session-presence assoc-in [session-id user-id] user-info)

    ;; Persist to memory
    (memory/update! key
                    (fn [users]
                      (assoc (or users {}) user-id user-info)))

    ;; Broadcast to other participants
    (ws/broadcast-to! (session-key session-id)
                      {:type :presence/join
                       :session-id session-id
                       :user user-info
                       :timestamp (System/currentTimeMillis)})

    (telemetry/emit! {:event :collab/join
                      :session-id session-id
                      :user-id user-id})

    user-info))

(defn leave-session!
  "User leaves a collaboration session"
  [session-id user-id]
  (swap! session-presence update session-id dissoc user-id)
  (swap! cursor-positions update session-id dissoc user-id)

  ;; Persist removal
  (let [key (presence-key session-id)]
    (memory/update! key
                    (fn [users]
                      (dissoc (or users {}) user-id))))

  ;; Broadcast departure
  (ws/broadcast-to! (session-key session-id)
                    {:type :presence/leave
                     :session-id session-id
                     :user-id user-id
                     :timestamp (System/currentTimeMillis)})

  (telemetry/emit! {:event :collab/leave
                    :session-id session-id
                    :user-id user-id})

  {:user/id user-id
   :session-id session-id
   :left? true})

(defn get-session-users
  "Get all users currently in a session"
  [session-id]
  (vals (get @session-presence session-id {})))

(defn get-session-user-count
  "Get number of active users in session"
  [session-id]
  (count (get @session-presence session-id {})))

;; ============================================================================
;; Cursor Tracking
;; ============================================================================

(defn update-cursor!
  "Update user's cursor position (throttled by client)"
  [session-id user-id position]
  (let [cursor-data {:user/id user-id
                     :position position
                     :timestamp (System/currentTimeMillis)}]
    (swap! cursor-positions assoc-in [session-id user-id] cursor-data)

    ;; Broadcast to other participants (not self)
    (ws/broadcast-to! (session-key session-id)
                      {:type :cursor/update
                       :session-id session-id
                       :user-id user-id
                       :position position
                       :timestamp (System/currentTimeMillis)})

    cursor-data))

(defn get-cursor-positions
  "Get all cursor positions for a session (excluding a specific user if provided)"
  [session-id & {:keys [exclude-user]}]
  (->> (get @cursor-positions session-id {})
       (remove #(= (key %) exclude-user))
       (into {})))

;; ============================================================================
;; Operational Transform (Simplified)
;; ============================================================================

(defn apply-operation!
  "Apply an operation to the shared state with conflict resolution"
  [session-id user-id operation-type target-id data]
  (let [op-id (next-op-id)
        operation {:op/id op-id
                   :op/type operation-type
                   :op/target target-id
                   :op/data data
                   :op/user-id user-id
                   :op/timestamp (System/currentTimeMillis)
                   :op/session-id session-id}
        key (keyword (str "ops/" session-id))]

    ;; Log operation
    (swap! operation-log update session-id conj operation)

    ;; Persist operation log
    (memory/update! key
                    (fn [ops]
                      (conj (or ops []) operation)))

    ;; Broadcast to all participants
    (ws/broadcast-to! (session-key session-id)
                      {:type :operation/applied
                       :session-id session-id
                       :operation operation})

    (telemetry/emit! {:event :collab/operation
                      :session-id session-id
                      :user-id user-id
                      :op-type operation-type})

    operation))

(defn get-operation-log
  "Get operation log for a session"
  [session-id & {:keys [since-timestamp limit]
                 :or {limit 100}}]
  (->> (get @operation-log session-id [])
       (filter #(or (nil? since-timestamp)
                    (> (:op/timestamp %) since-timestamp)))
       (take-last limit)))

(defn replay-operations
  "Replay operations from a specific point in time"
  [session-id since-timestamp]
  (get-operation-log session-id :since-timestamp since-timestamp))

;; ============================================================================
;; Comments System
;; ============================================================================

(defn add-comment!
  "Add a comment to a canvas item"
  [session-id user-id item-id text & {:keys [parent-id]}]
  (let [comment-id (str "comment-" (System/currentTimeMillis) "-" (rand-int 10000))
        comment {:comment/id comment-id
                 :comment/text text
                 :comment/author user-id
                 :comment/item-id item-id
                 :comment/parent-id parent-id
                 :comment/created-at (System/currentTimeMillis)
                 :comment/resolved? false}
        key (comments-key session-id)]

    ;; Store comment
    (swap! comments-store assoc-in [session-id comment-id] comment)

    ;; Persist
    (memory/update! key
                    (fn [comments]
                      (assoc (or comments {}) comment-id comment)))

    ;; Broadcast
    (ws/broadcast-to! (session-key session-id)
                      {:type :comment/added
                       :session-id session-id
                       :comment comment})

    (telemetry/emit! {:event :collab/comment
                      :session-id session-id
                      :user-id user-id
                      :item-id item-id})

    comment))

(defn resolve-comment!
  "Mark a comment as resolved"
  [session-id comment-id user-id]
  (let [key (comments-key session-id)]
    (swap! comments-store update-in [session-id comment-id] assoc
           :comment/resolved? true
           :comment/resolved-at (System/currentTimeMillis)
           :comment/resolved-by user-id)

    (memory/update! key
                    (fn [comments]
                      (update-in (or comments {}) [comment-id] assoc
                                 :comment/resolved? true
                                 :comment/resolved-at (System/currentTimeMillis)
                                 :comment/resolved-by user-id)))

    (ws/broadcast-to! (session-key session-id)
                      {:type :comment/resolved
                       :session-id session-id
                       :comment-id comment-id
                       :resolved-by user-id})

    {:comment/id comment-id
     :comment/resolved? true}))

(defn delete-comment!
  "Delete a comment"
  [session-id comment-id]
  (swap! comments-store update session-id dissoc comment-id)

  (let [key (comments-key session-id)]
    (memory/update! key
                    (fn [comments]
                      (dissoc (or comments {}) comment-id))))

  (ws/broadcast-to! (session-key session-id)
                    {:type :comment/deleted
                     :session-id session-id
                     :comment-id comment-id})

  {:comment/id comment-id
   :deleted? true})

(defn get-comments
  "Get all comments for a session or specific item"
  [session-id & {:keys [item-id include-resolved?]
                 :or {include-resolved? false}}]
  (let [comments (vals (get @comments-store session-id {}))]
    (->> comments
         (filter #(or include-resolved? (not (:comment/resolved? %))))
         (filter #(or (nil? item-id) (= (:comment/item-id %) item-id)))
         (sort-by :comment/created-at))))

;; ============================================================================
;; Version History / Snapshots
;; ============================================================================

(defn create-snapshot!
  "Create a version snapshot of the current canvas state"
  [session-id user-id canvas-state & {:keys [label description]}]
  (let [version-id (str "v-" (System/currentTimeMillis))
        version {:version/id version-id
                 :version/label (or label (str "Snapshot " version-id))
                 :version/description description
                 :version/state canvas-state
                 :version/created-by user-id
                 :version/created-at (System/currentTimeMillis)
                 :version/session-id session-id}
        key (versions-key session-id)]

    ;; Store version
    (swap! version-history assoc-in [session-id version-id] version)

    ;; Persist
    (memory/update! key
                    (fn [versions]
                      (assoc (or versions {}) version-id version)))

    ;; Broadcast
    (ws/broadcast-to! (session-key session-id)
                      {:type :version/created
                       :session-id session-id
                       :version (select-keys version [:version/id :version/label :version/created-at :version/created-by])})

    (telemetry/emit! {:event :collab/snapshot
                      :session-id session-id
                      :user-id user-id})

    version))

(defn restore-version!
  "Restore canvas to a specific version"
  [session-id version-id user-id]
  (if-let [version (get-in @version-history [session-id version-id])]
    (do
      (ws/broadcast-to! (session-key session-id)
                        {:type :version/restored
                         :session-id session-id
                         :version-id version-id
                         :restored-by user-id
                         :state (:version/state version)})

      (telemetry/emit! {:event :collab/restore
                        :session-id session-id
                        :user-id user-id
                        :version-id version-id})

      {:version/id version-id
       :restored? true
       :state (:version/state version)})

    {:error :version-not-found
     :version-id version-id}))

(defn get-versions
  "Get all versions for a session"
  [session-id]
  (->> (get @version-history session-id {})
       vals
       (sort-by :version/created-at)
       reverse))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver session-presence-resolver
  "Get all users present in a session"
  [{:keys [session/id]}]
  {::pco/input [:session/id]
   ::pco/output [{:session/presence [:user/id :user/name :user/color :user/avatar]}]}
  {:session/presence (get-session-users id)})

(pco/defresolver session-cursors-resolver
  "Get cursor positions for a session"
  [{:keys [session/id requester-id]}]
  {::pco/input [:session/id]
   ::pco/output [{:session/cursors [:user/id :position :timestamp]}]}
  {:session/cursors (vals (get-cursor-positions id :exclude-user requester-id))})

(pco/defresolver session-comments-resolver
  "Get comments for a session"
  [{:keys [session/id]}]
  {::pco/input [:session/id]
   ::pco/output [{:session/comments [:comment/id :comment/text :comment/author
                                     :comment/item-id :comment/created-at :comment/resolved?]}]}
  {:session/comments (get-comments id)})

(pco/defresolver session-versions-resolver
  "Get version history for a session"
  [{:keys [session/id]}]
  {::pco/input [:session/id]
   ::pco/output [{:session/versions [:version/id :version/label :version/description
                                     :version/created-at :version/created-by]}]}
  {:session/versions (get-versions id)})

(pco/defresolver collaboration-stats
  "Get collaboration statistics for a session"
  [{:keys [session/id]}]
  {::pco/input [:session/id]
   ::pco/output [:collab/active-users :collab/total-comments :collab/total-versions]}
  (let [comments (get-comments id :include-resolved? true)
        versions (get-versions id)]
    {:collab/active-users (get-session-user-count id)
     :collab/total-comments (count comments)
     :collab/total-versions (count versions)}))

;; ============================================================================
;; Mutations
;; ============================================================================

(pco/defmutation join-session-mutation!
  "Mutation to join a collaboration session"
  [{:keys [session-id user-id user-name color avatar]}]
  {::pco/output [:user/id :user/name :user/color]}
  (join-session! session-id user-id user-name :color color :avatar avatar))

(pco/defmutation leave-session-mutation!
  "Mutation to leave a collaboration session"
  [{:keys [session-id user-id]}]
  {::pco/output [:user/id :left?]}
  (leave-session! session-id user-id))

(pco/defmutation add-comment-mutation!
  "Mutation to add a comment"
  [{:keys [session-id user-id item-id text parent-id]}]
  {::pco/output [:comment/id :comment/text :comment/created-at]}
  (add-comment! session-id user-id item-id text :parent-id parent-id))

(pco/defmutation resolve-comment-mutation!
  "Mutation to resolve a comment"
  [{:keys [session-id comment-id user-id]}]
  {::pco/output [:comment/id :comment/resolved?]}
  (resolve-comment! session-id comment-id user-id))

(pco/defmutation create-snapshot-mutation!
  "Mutation to create a version snapshot"
  [{:keys [session-id user-id canvas-state label description]}]
  {::pco/output [:version/id :version/label :version/created-at]}
  (create-snapshot! session-id user-id canvas-state :label label :description description))

(pco/defmutation restore-version-mutation!
  "Mutation to restore a version"
  [{:keys [session-id version-id user-id]}]
  {::pco/output [:version/id :restored?]}
  (restore-version! session-id version-id user-id))

;; ============================================================================
;; Registration
;; ============================================================================

(def resolvers [session-presence-resolver session-cursors-resolver
                session-comments-resolver session-versions-resolver
                collaboration-stats])

(def mutations [join-session-mutation! leave-session-mutation!
                add-comment-mutation! resolve-comment-mutation!
                create-snapshot-mutation! restore-version-mutation!])

(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

;; ============================================================================
;; Comment / Examples
;; ============================================================================

(comment
  ;; User joins session
  (join-session! :empathy-session-123 :user-456 "Alice" :color "#FF6B6B")

  ;; Update cursor position
  (update-cursor! :empathy-session-123 :user-456 {:x 100 :y 200})

  ;; Add comment to sticky note
  (add-comment! :empathy-session-123 :user-456 :item-789 "Great insight about the customer!")

  ;; Create version snapshot
  (create-snapshot! :empathy-session-123 :user-456
                    {:notes {"n1" "note"} :sections {"s1" "section"}}
                    :label "Initial empathy map"
                    :description "First draft completed")

  ;; Get session state
  (get-session-users :empathy-session-123)
  (get-cursor-positions :empathy-session-123)
  (get-comments :empathy-session-123)
  (get-versions :empathy-session-123)

  ;; Query via Pathom
  (require '[ouroboros.query :as q])
  (q/q [{[:session/id :empathy-session-123]
         [:session/presence :session/cursors :session/comments :collab/active-users]}]))
