(ns ouroboros.chat.notifications
  "Learning notification system - proactive review reminders
   
   Periodically checks for due reviews and sends notifications
   to users via their configured chat platforms."
  (:require
   [clojure.string :as str]
   [ouroboros.learning :as learning]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.memory :as memory])
  (:import
   [java.util.concurrent ScheduledThreadPoolExecutor TimeUnit]))

;; ============================================================================
;; Configuration
;; ============================================================================

(def ^:private notification-interval-minutes
  "How often to check for due reviews (default: every hour)"
  60)

(def ^:private min-due-threshold
  "Minimum number of due reviews to trigger notification"
  1)

;; ============================================================================
;; Scheduler State
;; ============================================================================

(defonce ^:private scheduler (atom nil))

;; ============================================================================
;; Notification Logic
;; ============================================================================

(defn- format-review-notification
  "Format a notification message for due reviews"
  [due-count first-review]
  (str "📚 *Learning Review Due*\n\n"
       "You have " due-count " " (if (= 1 due-count) "review" "reviews") " ready:\n\n"
       "• " (:title first-review) "\n"
       "  (" (:category first-review) ")\n\n"
       (when (> due-count 1)
         (str "...and " (dec due-count) " more\n\n"))
       "Use `/reviews` to start your review session."))

(defn- notify-user!
  "Send notification to a user about due reviews
   
   Note: This is a placeholder - actual implementation needs
   user → chat platform/adapter mapping"
  [user-id due-reviews]
  (when (seq due-reviews)
    (let [due-count (count due-reviews)
          first-review (first due-reviews)]
      ;; Log notification attempt
      (telemetry/emit! {:event :learning/notification-sent
                        :user-id user-id
                        :due-count due-count})
      ;; TODO: Implement actual chat notification
      ;; This requires user -> chat adapter mapping from session
      ;; For now, notifications are shown when user runs /wisdom or /reviews
      )))

(defn- check-and-notify!
  "Check all users for due reviews and send notifications"
  []
  (try
    (let [users (learning/get-all-users)]
      (doseq [user-id users]
        (let [due (learning/get-due-reviews user-id)]
          (when (>= (count due) min-due-threshold)
            ;; Check if we already notified recently (rate limiting)
            (let [last-notified-key (keyword (str "notifications/last-" (name user-id)))
                  last-notified (memory/get-value last-notified-key)
                  now (System/currentTimeMillis)
                  ;; Don't notify more than once every 4 hours
                  cooldown-ms (* 4 60 60 1000)]
              (when (or (nil? last-notified)
                        (> (- now (:timestamp last-notified 0)) cooldown-ms))
                (notify-user! user-id due)
                (memory/save-value! last-notified-key
                                    {:timestamp now
                                     :due-count (count due)})))))))
    (catch Exception e
      (telemetry/emit! {:event :learning/notification-error
                        :error (.getMessage e)}))))

;; ============================================================================
;; Scheduler Management
;; ============================================================================

(defn start-notification-scheduler!
  "Start the periodic notification scheduler"
  []
  (when @scheduler
    (.shutdown ^ScheduledThreadPoolExecutor @scheduler))
  (let [executor (ScheduledThreadPoolExecutor. 1)]
    (.scheduleAtFixedRate
     executor
     ^Runnable check-and-notify!
     notification-interval-minutes
     notification-interval-minutes
     TimeUnit/MINUTES)
    (reset! scheduler executor)
    (telemetry/emit! {:event :learning/scheduler-started
                      :interval notification-interval-minutes})
    {:started true :interval notification-interval-minutes}))

(defn stop-notification-scheduler!
  "Stop the notification scheduler"
  []
  (when @scheduler
    (.shutdown ^ScheduledThreadPoolExecutor @scheduler)
    (reset! scheduler nil)
    (telemetry/emit! {:event :learning/scheduler-stopped})
    {:stopped true}))

(defn scheduler-status
  "Get scheduler status"
  []
  {:running (boolean @scheduler)
   :interval notification-interval-minutes})

;; ============================================================================
;; Manual Notification Trigger
;; ============================================================================

(defn send-due-review-notification!
  "Manually trigger a due review notification for a user
   Returns formatted message (for chat response)"
  [user-id]
  (let [due (learning/get-due-reviews user-id)]
    (if (seq due)
      (format-review-notification (count due) (first due))
      nil)))

;; ============================================================================
;; Initialization
;; ============================================================================

(defn init!
  "Initialize notification system"
  []
  ;; Don't auto-start scheduler to avoid side effects during testing
  ;; Caller should explicitly start with (start-notification-scheduler!)
  (telemetry/emit! {:event :learning/notifications-init})
  {:initialized true})

(comment
  ;; Manual testing
  (start-notification-scheduler!)
  (stop-notification-scheduler!)
  (check-and-notify!)
  (send-due-review-notification! :test-user))
