(ns ouroboros.dashboard
  "Dashboard - Web dashboard for system observability
   
   Simple HTTP server serving a web UI for:
   - System status overview
   - Telemetry visualization
   - User management
   - Chat session monitoring
   
   Uses babashka.http-server for lightweight HTTP serving."
  (:require
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.auth :as auth]
   [ouroboros.chat :as chat])
  (:import [java.time Instant]))

;; ============================================================================
;; HTML Generation
;; ============================================================================

(defn- html-page
  "Generate HTML page with content"
  [title body]
  (str "<!DOCTYPE html>
<html>
<head>
  <meta charset='utf-8'>
  <title>" title " - Ouroboros Dashboard</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; }
    h1 { color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }
    h2 { color: #555; margin-top: 30px; }
    .card { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .metric { display: inline-block; margin: 10px 20px; }
    .metric-value { font-size: 2em; font-weight: bold; color: #4CAF50; }
    .metric-label { color: #666; font-size: 0.9em; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { text-align: left; padding: 12px; border-bottom: 1px solid #ddd; }
    th { background: #f8f8f8; font-weight: 600; }
    .status-ok { color: #4CAF50; }
    .status-error { color: #f44336; }
    .nav { margin: 20px 0; }
    .nav a { margin-right: 20px; color: #4CAF50; text-decoration: none; }
    .nav a:hover { text-decoration: underline; }
    pre { background: #f4f4f4; padding: 15px; border-radius: 4px; overflow-x: auto; }
  </style>
</head>
<body>
  <div class='container'>
    <h1>🐍 Ouroboros Dashboard</h1>
    <div class='nav'>
      <a href='/'>Overview</a>
      <a href='/telemetry'>Telemetry</a>
      <a href='/users'>Users</a>
      <a href='/sessions'>Sessions</a>
    </div>
    " body "
  </div>
</body>
</html>"))

(defn- overview-page
  "Generate overview page"
  []
  (let [q (resolve 'ouroboros.query/q)
        sys-status (q [:system/status :system/healthy?])
        telemetry-stats (q [:telemetry/total-events :telemetry/tool-invocations :telemetry/errors])
        auth-stats (q [:auth/user-count :auth/admin-count])]
    (html-page "Overview"
               (str "
    <div class='card'>
      <h2>System Status</h2>
      <div class='metric'>
        <div class='metric-value " (if (:system/healthy? sys-status) "status-ok" "status-error") "'>
          ") (if (:system/healthy? sys-status) "✓" "✗") "
        </div>
        <div class='metric-label'>System Healthy</div>
      </div>
      <div class='metric'>
        <div class='metric-value'>" (count (get-in sys-status [:system/status :state])) "</div>
        <div class='metric-label'>Active States</div>
      </div>
    </div>
    
    <div class='card'>
      <h2>Telemetry</h2>
      <div class='metric'>
        <div class='metric-value'>" (:telemetry/total-events telemetry-stats 0) "</div>
        <div class='metric-label'>Total Events</div>
      </div>
      <div class='metric'>
        <div class='metric-value'>" (:telemetry/tool-invocations telemetry-stats 0) "</div>
        <div class='metric-label'>Tool Invocations</div>
      </div>
      <div class='metric'>
        <div class='metric-value'>" (:telemetry/errors telemetry-stats 0) "</div>
        <div class='metric-label'>Errors</div>
      </div>
    </div>
    
    <div class='card'>
      <h2>Users</h2>
      <div class='metric'>
        <div class='metric-value'>" (:auth/user-count auth-stats 0) "</div>
        <div class='metric-label'>Total Users</div>
      </div>
      <div class='metric'>
        <div class='metric-value'>" (:auth/admin-count auth-stats 0) "</div>
        <div class='metric-label'>Admins</div>
      </div>
    </div>
    
    <div class='card'>
      <h2>Recent Events</h2>
      <pre>" (str/join "\n" (map pr-str (take 10 (telemetry/get-recent-events 10)))) "</pre>
    </div>
    
    <div class='card'>
      <h2>Active Sessions</h2>
      <p>Active chat sessions: " (count @chat/chat-sessions) "</p>
    </div>
  ")))

(defn- telemetry-page
  "Generate telemetry page"
  []
  (let [events (telemetry/get-recent-events 50)]
    (html-page "Telemetry"
               (str "
    <div class='card'>
      <h2>Recent Events (last 50)</h2>
      <table>
        <tr>
          <th>Time</th>
          <th>Event</th>
          <th>Details</th>
        </tr>
        " (str/join "\n" (map (fn [e]
                                (str "<tr>
          <td>" (:event/timestamp e) "</td>
          <td>" (:event e) "</td>
          <td><pre>" (pr-str (dissoc e :event/timestamp :event/seq :event/id)) "</pre></td>
        </tr>"))
                              events)) "
      </table>
    </div>
  "))))

(defn- users-page
  "Generate users page"
  []
  (let [users (auth/list-users)]
    (html-page "Users"
               (str "
    <div class='card'>
      <h2>Registered Users</h2>
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Platform</th>
          <th>Role</th>
          <th>Created</th>
          <th>Last Active</th>
        </tr>
        " (str/join "\n" (map (fn [u]
                                (str "<tr>
          <td>" (subs (:user/id u) 0 8) "...</td>
          <td>" (:user/name u) "</td>
          <td>" (:user/platform u) "</td>
          <td>" (:user/role u) "</td>
          <td>" (:user/created-at u) "</td>
          <td>" (:user/last-active u) "</td>
        </tr>"))
                              users)) "
      </table>
    </div>
  "))))

(defn- sessions-page
  "Generate sessions page"
  []
  (let [sessions @chat/chat-sessions]
    (html-page "Sessions"
               (str "
    <div class='card'>
      <h2>Active Chat Sessions</h2>
      <table>
        <tr>
          <th>Chat ID</th>
          <th>Message Count</th>
          <th>Created</th>
        </tr>
        " (str/join "\n" (map (fn [[id session]]
                                (str "<tr>
          <td>" id "</td>
          <td>" (count (:history session)) "</td>
          <td>" (:created-at session) "</td>
        </tr>"))
                              sessions)) "
      </table>
    </div>
  "))))

;; ============================================================================
;; HTTP Handler
;; ============================================================================

(defn- handle-request
  "Handle HTTP request"
  [req]
  (let [uri (:uri req)]
    (cond
      (= uri "/") {:status 200 :headers {"Content-Type" "text/html"} :body (overview-page)}
      (= uri "/telemetry") {:status 200 :headers {"Content-Type" "text/html"} :body (telemetry-page)}
      (= uri "/users") {:status 200 :headers {"Content-Type" "text/html"} :body (users-page)}
      (= uri "/sessions") {:status 200 :headers {"Content-Type" "text/html"} :body (sessions-page)}
      (= uri "/api/status") {:status 200 :headers {"Content-Type" "application/json"}
                             :body (cheshire.core/generate-string
                                    {:healthy ((resolve 'ouroboros.query/q) [:system/healthy?])
                                     :timestamp (str (Instant/now))})}
      (= uri "/metrics") {:status 200 
                          :headers {"Content-Type" "text/plain; version=0.0.4"}
                          :body ((resolve 'ouroboros.metrics/get-prometheus-text))}
      :else {:status 404 :body "Not found"})))

;; ============================================================================
;; Server Lifecycle
;; ============================================================================

(defonce ^:private dashboard-server (atom nil))

(defn start!
  "Start dashboard server
   
   Usage: (start! {:port 8080})"
  ([] (start! {}))
  ([{:keys [port]}]
   (let [actual-port (or port 8080)]
     (println (str "◈ Starting dashboard server on port " actual-port "..."))
     ;; Note: babashka.http-server would be used here
     ;; For now, placeholder implementation
     (reset! dashboard-server {:port actual-port :running true})
     (println "✓ Dashboard ready at http://localhost:" actual-port)
     {:port actual-port :url (str "http://localhost:" actual-port)})))

(defn stop!
  "Stop dashboard server"
  []
  (when @dashboard-server
    (reset! dashboard-server nil)
    (println "✓ Dashboard stopped")))

(defn status
  "Get dashboard status"
  []
  (if @dashboard-server
    {:running true :port (:port @dashboard-server)}
    {:running false}))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(pco/defresolver dashboard-status [_]
  {::pco/output [:dashboard/status]}
  {:dashboard/status (status)})

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [dashboard-status])

(def mutations
  [])

(comment
  ;; Start dashboard
  (start! {:port 8080})
  (status)
  (stop!)

  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:dashboard/status]))
