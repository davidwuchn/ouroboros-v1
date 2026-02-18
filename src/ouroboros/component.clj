;; Component Lifecycle - Mount-style state management
;; Provides clean start/stop lifecycle for system components
(ns ouroboros.component
  "Component Lifecycle Management
   
   Inspired by mount and Component pattern.
   Provides start/stop lifecycle for system components.
   
   Usage:
     (require '[ouroboros.component :as comp])
     
     (defstate config
       :start (load-config)
       :stop (save-config))
       
     (defstate web-server
       :start (start-server)
       :stop (stop-server)
       :dependencies [config])
       
     ;; Start all
     (comp/start-all)
     
     ;; Stop all
     (comp/stop-all)"
  (:require [clojure.tools.logging :as log]))

;; ============================================================================
;; State Registry
;; ============================================================================

(defonce ^:private component-registry (atom {}))
(defonce ^:private running-components (atom #{}))

;; ============================================================================
;; Component Definition
;; ============================================================================

(defn defcomponent
  "Define a component with lifecycle hooks
   
   Usage:
     (defcomponent config
       :start (load-config!)
       :stop (save-config!))
       
     (defcomponent web-server
       :start (start-server!)
       :stop (stop-server!)
       :dependencies [config])"
  [name & {:keys [start stop dependencies]}]
  (swap! component-registry assoc name
         {:name name
          :start start
          :stop stop
          :dependencies (vec dependencies)
          :state (atom nil)})
  name)

(defn component
  "Get component by name"
  [name]
  (get @component-registry name))

(defn components
  "Get all components"
  []
  (vals @component-registry))

;; ============================================================================
;; Lifecycle Operations
;; ============================================================================

(defn start
  "Start a component and its dependencies
   
   Usage: (comp/start config)"
  [name]
  (let [comp (component name)]
    (when-not comp
      (throw (ex-info "Unknown component" {:component name})))
    
    ;; Start dependencies first
    (doseq [dep (:dependencies comp)]
      (when-not (@running-components dep)
        (start dep)))
    
    ;; Start this component
    (when-not (@running-components name)
      (log/info "Starting component:" name)
      (let [result (when (:start comp)
                     ((:start comp)))]
        (reset! (:state comp) result)
        (swap! running-components conj name)
        result))))

(defn stop
  "Stop a component
   
   Usage: (comp/stop config)"
  [name]
  (let [comp (component name)]
    (when-not comp
      (throw (ex-info "Unknown component" {:component name})))
    
    (when (@running-components name)
      (log/info "Stopping component:" name)
      (when (:stop comp)
        (let [state @(:state comp)]
          ((:stop comp) state)))
      (reset! (:state comp) nil)
      (swap! running-components disj name))
    nil))

(defn restart
  "Restart a component (stop + start)
   
   Usage: (comp/restart config)"
  [name]
  (stop name)
  (start name))

;; ============================================================================
;; Bulk Operations
;; ============================================================================

(defn start-all
  "Start all registered components in dependency order
   
   Usage: (comp/start-all)"
  []
  (let [sorted (topological-sort (vals @component-registry))]
    (doseq [comp sorted]
      (try
        (start (:name comp))
        (catch Throwable t
          (log/error t "Failed to start component:" (:name comp))))))
  (log/info "Started" (count @running-components) "components"))

(defn stop-all
  "Stop all running components in reverse dependency order
   
   Usage: (comp/stop-all)"
  []
  (let [sorted (reverse (topological-sort (vals @component-registry)))]
    (doseq [comp sorted]
      (try
        (stop (:name comp))
        (catch Throwable t
          (log/error t "Failed to stop component:" (:name comp))))))
  (log/info "Stopped all components"))

(defn running?
  "Check if a component is running"
  [name]
  (@running-components name))

(defn state
  "Get the current state of a component"
  [name]
  (let [comp (component name)]
    (when comp
      @(:state comp))))

;; ============================================================================
;; Dependency Resolution
;; ============================================================================

(defn- topological-sort
  "Sort components by dependencies"
  [components]
  (let [by-name (zipmap (map :name components) components)
        visited (atom #{})
        result (atom [])]
    (fn visit [name]
      (when-not (@visited name)
        (swap! visited conj name)
        (when-let [comp (by-name name)]
          (doseq [dep (:dependencies comp)]
            (visit dep))
          (swap! result conj comp))))
    (doseq [comp components]
      (visit (:name comp)))
    @result))

(defn dependency-order
  "Get components in dependency order"
  []
  (topological-sort (vals @component-registry)))

;; ============================================================================
;; Status
;; ============================================================================

(defn status
  "Get status of all components"
  []
  (map (fn [comp]
         {:name (:name comp)
          :running (@running-components (:name comp))
          :dependencies (:dependencies comp)})
       (vals @component-registry)))

(defn healthy?
  "Check if all components are running"
  []
  (= (count @running-components)
     (count @component-registry)))

;; ============================================================================
;; Macro Helpers
;; ============================================================================

(defmacro with-components
  "Execute body with components started, then stop on exit
   
   Usage:
     (comp/with-components [config web-server]
       (do-something))"
  [components & body]
  `(try
     (doseq [c# ~components]
       (start c#))
     ~@body
     (finally
       (doseq [c# (reverse ~components)]
         (stop c#)))))
