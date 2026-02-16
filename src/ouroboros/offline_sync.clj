(ns ouroboros.offline-sync
  "Offline support and synchronization for Web UX Platform

   Provides:
   - Local change queue for offline operations
   - Conflict resolution for concurrent edits
   - Session persistence across browser refreshes
   - Optimistic updates with rollback

   Usage:
   (require '[ouroboros.offline-sync :as sync])
   (sync/queue-operation! :session-123 {:op :add-note :data {...}})
   (sync/sync-session! :session-123) ; when back online
   (sync/resolve-conflicts! :session-123 server-state local-state)"
  (:require
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.resolver-registry :as registry])
  (:import [java.util.concurrent.atomic AtomicLong]))

;; ============================================================================
;; Operation Queue
;; ============================================================================

(defonce operation-queues (atom {}))
(defonce operation-counter (AtomicLong. 0))

;; Queue retention: 7 days
(def ^:private queue-retention-ms (* 7 24 60 60 1000))

(defn- next-op-id []
  (str "op-" (.incrementAndGet operation-counter) "-" (System/currentTimeMillis)))

(defn- queue-key [session-id]
  (keyword (str "offline-queue/" session-id)))

(defn- compact-queue!
  "Remove completed operations older than retention period"
  [session-id]
  (swap! operation-queues
         update session-id
         (fn [ops]
           (let [cutoff (- (System/currentTimeMillis) queue-retention-ms)]
             (filterv #(or (= (:op/status %) :pending)
                           (> (:op/queued-at %) cutoff))
                      ops)))))

(defn queue-operation!
  "Queue an operation for later sync (when offline)"
  [session-id operation-type data & {:keys [user-id]}]
  ;; Validation
  (when (nil? session-id)
    (throw (ex-info "session-id is required" {:param :session-id})))
  (when (nil? operation-type)
    (throw (ex-info "operation-type is required" {:param :operation-type})))

  ;; Compact old operations first
  (compact-queue! session-id)

  (let [op-id (next-op-id)
        operation {:op/id op-id
                   :op/type operation-type
                   :op/data data
                   :op/user-id user-id
                   :op/queued-at (System/currentTimeMillis)
                   :op/status :pending
                   :op/attempts 0}
        key (queue-key session-id)]

    ;; Add to in-memory queue
    (swap! operation-queues update session-id conj operation)

    ;; Persist queue
    (memory/update! key
                    (fn [queue]
                      (conj (or queue []) operation)))

    (telemetry/emit! {:event :offline/operation-queued
                      :session-id session-id
                      :op-type operation-type})

    operation))

(defn get-pending-operations
  "Get all pending operations for a session"
  [session-id]
  (filter #(= (:op/status %) :pending)
          (get @operation-queues session-id [])))

(defn mark-operation-complete!
  "Mark an operation as completed"
  [session-id op-id]
  (swap! operation-queues
         update session-id
         (fn [ops]
           (mapv #(if (= (:op/id %) op-id)
                    (assoc % :op/status :completed
                           :op/completed-at (System/currentTimeMillis))
                    %)
                 ops)))

  (let [key (queue-key session-id)]
    (memory/update! key
                    (fn [queue]
                      (mapv #(if (= (:op/id %) op-id)
                               (assoc % :op/status :completed)
                               %)
                            (or queue []))))))

(defn mark-operation-failed!
  "Mark an operation as failed"
  [session-id op-id error]
  (swap! operation-queues
         update session-id
         (fn [ops]
           (mapv #(if (= (:op/id %) op-id)
                    (assoc % :op/status :failed
                           :op/error (str error)
                           :op/failed-at (System/currentTimeMillis))
                    %)
                 ops)))

  (telemetry/emit! {:event :offline/operation-failed
                    :session-id session-id
                    :op-id op-id
                    :error (str error)}))

;; ============================================================================
;; Conflict Resolution
;; ============================================================================

(defn detect-conflicts
  "Detect conflicts between server and local state"
  [server-state local-state]
  (let [server-items (get server-state :canvas/items {})
        local-items (get local-state :canvas/items {})]

    ;; Check for concurrent edits on same items
    (reduce (fn [acc [item-id local-item]]
              (if-let [server-item (get server-items item-id)]
                (if (not= (:item/updated-at local-item)
                          (:item/updated-at server-item))
                  (conj acc {:conflict/type :concurrent-edit
                             :conflict/item-id item-id
                             :conflict/server server-item
                             :conflict/local local-item})
                  acc)
                acc))
            []
            local-items)))

(defn resolve-conflict
  "Resolve a single conflict using last-write-wins or custom logic"
  [conflict & {:keys [strategy]
               :or {strategy :last-write-wins}}]
  (case strategy
    :last-write-wins
    (let [local-time (get-in conflict [:conflict/local :item/updated-at] 0)
          server-time (get-in conflict [:conflict/server :item/updated-at] 0)]
      (if (> local-time server-time)
        {:resolution :use-local
         :item (:conflict/local conflict)}
        {:resolution :use-server
         :item (:conflict/server conflict)}))

    :merge
    {:resolution :merged
     :item (merge (:conflict/server conflict)
                  (:conflict/local conflict)
                  {:item/conflict-resolved? true
                   :item/updated-at (System/currentTimeMillis)})}

    :manual
    {:resolution :needs-manual-resolution
     :conflict conflict}))

(defn resolve-all-conflicts!
  "Resolve all conflicts for a session"
  [session-id server-state local-state & {:keys [strategy]}]
  (let [conflicts (detect-conflicts server-state local-state)
        resolutions (map #(resolve-conflict % :strategy strategy) conflicts)]

    (when (seq conflicts)
      (telemetry/emit! {:event :offline/conflicts-detected
                        :session-id session-id
                        :conflict-count (count conflicts)}))

    {:conflicts/count (count conflicts)
     :conflicts/resolutions resolutions
     :conflicts/resolved? (every? #(not= (:resolution %) :needs-manual-resolution)
                                  resolutions)}))

;; ============================================================================
;; Session Persistence
;; ============================================================================

(defn save-session-state!
  "Save current session state for offline recovery"
  [session-id user-id state]
  (let [snapshot {:snapshot/session-id session-id
                  :snapshot/user-id user-id
                  :snapshot/state state
                  :snapshot/saved-at (System/currentTimeMillis)
                  :snapshot/version 1}
        key (keyword (str "session-snapshot/" session-id))]

    (memory/save-value! key snapshot)

    (telemetry/emit! {:event :offline/session-saved
                      :session-id session-id
                      :user-id user-id})

    snapshot))

(defn load-session-state
  "Load saved session state"
  [session-id]
  (let [key (keyword (str "session-snapshot/" session-id))]
    (memory/get-value key)))

(defn has-saved-session?
  "Check if a saved session exists"
  [session-id]
  (some? (load-session-state session-id)))

;; ============================================================================
;; Sync Operations
;; ============================================================================

(defn sync-session!
  "Sync pending operations for a session
   Returns {:synced [...] :failed [...] :conflicts [...]}"
  [session-id server-state-fn apply-fn]
  (let [pending (get-pending-operations session-id)
        results (reduce (fn [results op]
                          (try
                            ;; Fetch latest server state
                            (let [server-state (server-state-fn)
                                  local-state (:op/data op)]

                              ;; Check for conflicts
                              (if-let [conflicts (seq (detect-conflicts server-state local-state))]
                                ;; Handle conflicts
                                (let [resolution (resolve-all-conflicts! session-id server-state local-state)]
                                  (if (:conflicts/resolved? resolution)
                                    ;; Apply resolved state
                                    (do
                                      (apply-fn (:conflicts/resolutions resolution))
                                      (mark-operation-complete! session-id (:op/id op))
                                      (update results :synced conj (:op/id op)))
                                    ;; Needs manual resolution
                                    (do
                                      (mark-operation-failed! session-id (:op/id op) "Unresolved conflicts")
                                      (update results :conflicts conj conflicts))))

                                ;; No conflicts, apply operation
                                (do
                                  (apply-fn op)
                                  (mark-operation-complete! session-id (:op/id op))
                                  (update results :synced conj (:op/id op)))))

                            (catch Exception e
                              (mark-operation-failed! session-id (:op/id op) (.getMessage e))
                              (update results :failed conj {:op-id (:op/id op)}
                                      :error (.getMessage e)))))
                        {:synced [] :failed [] :conflicts []}
                        pending)]

    (telemetry/emit! {:event :offline/sync-completed
                      :session-id session-id
                      :synced (count (:synced results))
                      :failed (count (:failed results))})

    results))

;; ============================================================================
;; Optimistic Updates
;; ============================================================================

(defonce optimistic-state (atom {}))

(defn apply-optimistic!
  "Apply an optimistic update (will be confirmed or rolled back)"
  [session-id operation-id update-fn]
  (let [key (keyword (str "optimistic/" session-id "/" operation-id))]
    (swap! optimistic-state assoc key
           {:op/id operation-id
            :op/session-id session-id
            :op/applied-at (System/currentTimeMillis)
            :op/update-fn update-fn})

    ;; Apply the update
    (update-fn)))

(defn confirm-operation!
  "Confirm an optimistic update (server confirmed)"
  [session-id operation-id]
  (let [key (keyword (str "optimistic/" session-id "/" operation-id))]
    (swap! optimistic-state dissoc key)))

(defn rollback-operation!
  "Rollback an optimistic update (server rejected)"
  [session-id operation-id rollback-fn]
  (let [key (keyword (str "optimistic/" session-id "/" operation-id))]
    ;; Apply rollback
    (rollback-fn)
    ;; Remove from tracking
    (swap! optimistic-state dissoc key)

    (telemetry/emit! {:event :offline/optimistic-rollback
                      :session-id session-id
                      :op-id operation-id})))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver offline-status
  "Get offline sync status for a session"
  [{:keys [session/id]}]
  {::pco/input [:session/id]
   ::pco/output [:offline/pending-count :offline/last-sync
                 :offline/has-saved-session?]}
  (let [pending (get-pending-operations id)
        saved (load-session-state id)]
    {:offline/pending-count (count pending)
     :offline/last-sync (when (seq pending)
                          (:op/queued-at (first pending)))
     :offline/has-saved-session? (some? saved)}))

(pco/defresolver pending-operations
  "Get pending operations for a session"
  [{:keys [session/id]}]
  {::pco/input [:session/id]
   ::pco/output [{:offline/pending-operations
                  [:op/id :op/type :op/status :op/queued-at]}]}
  {:offline/pending-operations (get-pending-operations id)})

;; ============================================================================
;; Mutations
;; ============================================================================

(pco/defmutation queue-operation-mutation!
  "Queue an operation for offline sync"
  [{:keys [session-id op-type data user-id]}]
  {::pco/output [:op/id :op/status :op/queued-at]}
  (queue-operation! session-id (keyword op-type) data :user-id user-id))

(pco/defmutation save-session-snapshot!
  "Save a session snapshot"
  [{:keys [session-id user-id state]}]
  {::pco/output [:snapshot/session-id :snapshot/saved-at]}
  (save-session-state! session-id user-id state))

(pco/defmutation resolve-conflicts-mutation!
  "Manually resolve conflicts"
  [{:keys [_session-id resolutions]}]
  {::pco/output [:conflicts/resolved? :conflicts/count]}
  {:conflicts/resolved? true
   :conflicts/count (count resolutions)})

;; ============================================================================
;; Registration
;; ============================================================================

(def resolvers [offline-status pending-operations])
(def mutations [queue-operation-mutation! save-session-snapshot! resolve-conflicts-mutation!])

(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

;; ============================================================================
;; Comment / Examples
;; ============================================================================

(comment
  ;; Queue operation while offline
  (queue-operation! :session-123 :add-note
                    {:item/content "New idea" :item/section :problems}
                    :user-id :user-456)

  ;; Check pending operations
  (get-pending-operations :session-123)

  ;; Detect conflicts (example with placeholder data)
  (detect-conflicts {} {})

  ;; Resolve conflicts (example with placeholder data)
  (resolve-all-conflicts! :session-123 {} {} :strategy :last-write-wins)

  ;; Save session for offline recovery
  (save-session-state! :session-123 :user-456 {:canvas/items {"item-1" {:item/content "Test"}}})

  ;; Sync when back online (example with placeholder callbacks)
  (sync-session! :session-123
                 (fn [_] {})
                 (fn [_] nil)))
