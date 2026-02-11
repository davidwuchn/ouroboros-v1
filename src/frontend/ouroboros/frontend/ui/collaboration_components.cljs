(ns ouroboros.frontend.ui.collaboration-components
  "Real-time collaboration UI components

   Provides visual indicators for multi-user collaboration:
   - User presence list
   - Cursor tracking display
   - Comment threads
   - Version history sidebar"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.mutations :as m]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Mutations
;; ============================================================================

(m/defmutation join-session
  "Join a collaboration session"
  [{:keys [session-id user-name]}]
  (remote [env] env)
  (ok-action [{:keys [state result]}]
             (let [user-data (:body result)]
               (swap! state assoc-in [:collaboration :current-user] user-data)
               (swap! state assoc-in [:collaboration :joined?] true))))

(m/defmutation leave-session
  "Leave a collaboration session"
  [{:keys [session-id]}]
  (remote [env] env)
  (ok-action [{:keys [state]}]
             (swap! state assoc-in [:collaboration :joined?] false)))

(m/defmutation update-cursor-position
  "Update local cursor position (throttled)"
  [{:keys [session-id position]}]
  (remote [env] env))

(m/defmutation add-comment
  "Add a comment to a canvas item"
  [{:keys [session-id item-id text parent-id]}]
  (remote [env]
          (-> env
              (m/returning CommentItem)
              (m/with-target [:collaboration :comments])))
  (ok-action [{:keys [state]}]
             (swap! state assoc-in [:collaboration :comment-input] "")
             (swap! state assoc-in [:collaboration :replying-to] nil)))

(m/defmutation resolve-comment
  "Mark a comment as resolved"
  [{:keys [session-id comment-id]}]
  (remote [env] env)
  (action [{:keys [state]}]
          (swap! state update-in [:collaboration :comments]
                 (fn [comments]
                   (mapv #(if (= (:comment/id %) comment-id)
                            (assoc % :comment/resolved? true)
                            %)
                         comments)))))

(m/defmutation create-snapshot
  "Create a version snapshot"
  [{:keys [session-id label description]}]
  (remote [env]
          (-> env
              (m/returning VersionItem)
              (m/with-target [:collaboration :versions])))
  (ok-action [{:keys [state]}]
             (swap! state assoc-in [:collaboration :show-snapshot-modal?] false)))

(m/defmutation restore-version
  "Restore a specific version"
  [{:keys [session-id version-id]}]
  (remote [env] env)
  (ok-action [{:keys [state]}]
             (swap! state assoc-in [:collaboration :restoring?] false)))

;; ============================================================================
;; Presence Components
;; ============================================================================

(defsc UserAvatar
  "Small user avatar with color indicator"
  [this {:user/keys [id name color avatar]}]
  {:query [:user/id :user/name :user/color :user/avatar]
   :ident :user/id}
  (dom/div :.user-avatar
           {:title name
            :style {:backgroundColor color}}
           (dom/span :.avatar-emoji avatar)))

(def ui-user-avatar (comp/factory UserAvatar {:keyfn :user/id}))

(defsc PresenceIndicator
  "Shows online status with user count"
  [this {:keys [user-count active?]}]
  (dom/div :.presence-indicator
           {:className (when active? "active")}
           (dom/span :.presence-dot)
           (dom/span :.presence-count
                     (str user-count " " (if (= 1 user-count) "user" "users")))))

(defsc UserPresenceList
  "List of users currently in the session"
  [this {:keys [users current-user-id]}]
  (dom/div :.presence-list
           (dom/h4 "Collaborators")
           (if (seq users)
             (dom/div :.presence-avatars
                      (map ui-user-avatar (filter :user/id users))
                      (when (> (count users) 5)
                        (dom/div :.presence-more
                                 (str "+" (- (count users) 5) " more"))))
             (dom/div :.presence-empty "No other users"))))

;; ============================================================================
;; Cursor Tracking
;; ============================================================================

(defsc RemoteCursor
  "Display another user's cursor position"
  [this {:keys [user-id user-name color position]}]
  (dom/div
   {:className "remote-cursor"
    :style {:position "absolute"
            :left (str (:x position) "px")
            :top (str (:y position) "px")
            :zIndex 1000
            :pointerEvents "none"
            :transition "all 0.1s ease-out"}}
   (dom/svg
    {:width 24 :height 24 :viewBox "0 0 24 24"}
    (dom/path
     {:d "M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.87a.5.5 0 00.35-.85L6.35 2.85a.5.5 0 00-.85.36z"
      :fill color}))
   (dom/span
    {:className "cursor-label"
     :style {:backgroundColor color}}
    user-name)))

(def ui-remote-cursor (comp/factory RemoteCursor {:keyfn :user-id}))

(defsc CursorOverlay
  "Overlay showing all remote cursors"
  [this {:keys [cursors]}
   (dom/div :.cursor-overlay
            {:style {:position "absolute"
                     :top 0 :left 0
                     :width "100%" :height "100%"
                     :pointerEvents "none"
                     :zIndex 999}}
            (map ui-remote-cursor (filter :user-id cursors)))])

;; ============================================================================
;; Comments System
;; ============================================================================

(defsc CommentItem
  "Individual comment display"
  [this {:comment/keys [id text author created-at resolved? parent-id replies]}]
  {:query [:comment/id :comment/text :comment/author
           :comment/created-at :comment/resolved?
           :comment/parent-id
           {:comment/replies (comp/get-query CommentItem)}]
   :ident :comment/id}
  (dom/div
   {:className (str "comment-item " (when resolved? "resolved"))}
   (dom/div :.comment-header
            (dom/span :.comment-author author)
            (dom/span :.comment-time
                      (js/Date. created-at)))
   (dom/div :.comment-text text)
   (when resolved?
     (dom/div :.comment-resolved-badge "✓ Resolved"))
   (dom/div :.comment-actions
            (when (not resolved?)
              (dom/button
               {:onClick #(comp/transact! this [(resolve-comment {:comment-id id})])
                :className "btn btn-sm btn-secondary"}
               "Resolve"))
            (dom/button
             {:onClick #(m/set-value! this :ui/replying-to id)
              :className "btn btn-sm"}
             "Reply"))
   (when (seq replies)
     (dom/div :.comment-replies
              (map ui-comment (filter :comment/id replies))))))

(def ui-comment (comp/factory CommentItem {:keyfn :comment/id}))

(defsc CommentThread
  "Thread of comments on a canvas item"
  [this {:keys [item-id comments on-close]}]
  (let [input-text (or (comp/get-state this :comment-input) "")]
    (dom/div :.comment-thread
             (dom/div :.comment-thread-header
                      (dom/h4 "Comments")
                      (dom/button
                       {:onClick on-close
                        :className "btn btn-close"}
                       "×"))
             (dom/div :.comments-list
                       (if (seq comments)
                         (map ui-comment (filter :comment/id comments))
                         (dom/div :.comments-empty "No comments yet")))
             (dom/div :.comment-input-area
                      (dom/textarea
                       {:value (or input-text "")
                        :onChange #(comp/set-state! this {:comment-input (.. % -target -value)})
                        :placeholder "Add a comment..."
                        :rows 3})
                      (dom/button
                       {:onClick #(comp/transact! this
                                                  [(add-comment {:item-id item-id :text input-text})])
                        :disabled (empty? (str/trim (or input-text "")))
                        :className "btn btn-primary"}
                       "Post")))))

;; ============================================================================
;; Version History
;; ============================================================================

(defsc VersionItem
  "Individual version snapshot"
  [this {:version/keys [id label description created-at created-by]}]
  {:query [:version/id :version/label :version/description
           :version/created-at :version/created-by]
   :ident :version/id}
  (dom/div :.version-item
           (dom/div :.version-header
                    (dom/h4 label)
                    (dom/span :.version-time (js/Date. created-at)))
           (when description
             (dom/p :.version-description description))
           (dom/div :.version-meta
                    (dom/span :.version-author (str "by " created-by)))
           (dom/div :.version-actions
                    (dom/button
                     {:onClick #(comp/transact! this [(restore-version {:version-id id})])
                      :className "btn btn-sm btn-secondary"}
                     "Restore")
                    (dom/button
                     {:onClick #(js/alert "Compare coming soon!")
                      :className "btn btn-sm"}
                     "Compare"))))

(def ui-version (comp/factory VersionItem {:keyfn :version/id}))

(defsc VersionHistory
  "Sidebar showing version history"
  [this {:keys [versions current-version-id on-create-snapshot]}]
  (let [show-modal? (or (comp/get-state this :show-snapshot-modal?) false)
        snapshot-label (or (comp/get-state this :snapshot-label) "")
        snapshot-desc (or (comp/get-state this :snapshot-desc) "")]
    (dom/div :.version-history
             (dom/div :.version-history-header
                      (dom/h3 "Version History")
                      (dom/button
                       {:onClick #(comp/set-state! this {:show-snapshot-modal? true})
                        :className "btn btn-sm btn-primary"}
                       "+ Snapshot"))

      ;; Create snapshot modal
             (when show-modal?
               (dom/div :.modal-overlay
                        (dom/div :.modal-content
                                 (dom/h3 "Create Snapshot")
                                 (dom/div :.form-group
                                          (dom/label "Label")
                                          (dom/input
                                           {:value (or snapshot-label "")
                                            :onChange #(comp/set-state! this {:snapshot-label (.. % -target -value)})
                                            :placeholder "e.g., Initial Draft"}))
                                 (dom/div :.form-group
                                          (dom/label "Description (optional)")
                                          (dom/textarea
                                           {:value (or snapshot-desc "")
                                            :onChange #(comp/set-state! this {:snapshot-desc (.. % -target -value)})
                                            :rows 3}))
                                 (dom/div :.modal-actions
                                          (dom/button
                                           {:onClick #(comp/set-state! this {:show-snapshot-modal? false})
                                            :className "btn btn-secondary"}
                                           "Cancel")
                                          (dom/button
                                           {:onClick #(comp/transact! this
                                                                      [(create-snapshot
                                                                        {:label snapshot-label
                                                                         :description snapshot-desc})])
                                             :disabled (empty? (str/trim (or snapshot-label "")))
                                            :className "btn btn-primary"}
                                           "Create")))))

      ;; Version list
             (dom/div :.version-list
                      (if (seq versions)
                         (map ui-version (filter :version/id versions))
                        (dom/div :.versions-empty
                                 (dom/p "No versions yet")
                                 (dom/p "Create a snapshot to save your progress")))))))

;; ============================================================================
;; Collaboration Sidebar
;; ============================================================================

(defsc CollaborationSidebar
  "Main collaboration sidebar with presence, comments, and versions"
  [this {:keys [session-id users cursors comments versions active-tab]}]
  {:query [:session-id
           {:users (comp/get-query UserAvatar)}
           {:cursors [:user-id :user-name :color :position]}
           {:comments (comp/get-query CommentItem)}
           {:versions (comp/get-query VersionItem)}
           :active-tab]
   :ident (fn [] [:component/id :collaboration-sidebar])
   :initial-state (fn [_] {:active-tab :presence})}
  (dom/div :.collaboration-sidebar
    ;; Tabs
           (dom/div :.collab-tabs
                    (dom/button
                     {:className (str "collab-tab " (when (= active-tab :presence) "active"))
                      :onClick #(m/set-value! this :active-tab :presence)}
                     (str "👥 Users (" (count users) ")"))
                    (dom/button
                     {:className (str "collab-tab " (when (= active-tab :comments) "active"))
                      :onClick #(m/set-value! this :active-tab :comments)}
                     (str "💬 Comments (" (count comments) ")"))
                    (dom/button
                     {:className (str "collab-tab " (when (= active-tab :versions) "active"))
                      :onClick #(m/set-value! this :active-tab :versions)}
                     (str "📜 Versions (" (count versions) ")")))

    ;; Tab content
           (case active-tab
             :presence
             (dom/div :.collab-tab-content
                      (ui/component UserPresenceList {:users users}))

             :comments
             (dom/div :.collab-tab-content
                      (if (seq comments)
                        (map ui-comment (filter :comment/id comments))
                        (dom/div :.collab-empty "No comments yet")))

             :versions
             (dom/div :.collab-tab-content
                      (ui/component VersionHistory {:versions versions}))

             (dom/div :.collab-tab-content "Select a tab"))))

;; ============================================================================
;; Collaboration Provider
;; ============================================================================

(defn setup-websocket-handlers!
  "Set up WebSocket message handlers for collaboration"
  [app session-id]
  (ws/add-message-handler!
   (fn [message]
     (case (:type message)
       :presence/join
       (df/load! app [:component/id :collaboration-sidebar] CollaborationSidebar)

       :presence/leave
       (df/load! app [:component/id :collaboration-sidebar] CollaborationSidebar)

       :cursor/update
       (let [{:keys [user-id position]} message]
         (swap! (app->state-atom app)
                assoc-in [:collaboration :cursors user-id] position))

       :comment/added
       (df/load! app [:component/id :collaboration-sidebar] CollaborationSidebar)

       :version/created
       (df/load! app [:component/id :collaboration-sidebar] CollaborationSidebar)

       nil))))

;; ============================================================================
;; Export
;; ============================================================================

(def sidebar CollaborationSidebar)
(def presence UserPresenceList)
(def cursors CursorOverlay)
(def comments CommentThread)
(def versions VersionHistory)
