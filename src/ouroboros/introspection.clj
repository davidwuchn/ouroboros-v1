(ns ouroboros.introspection
  "Introspection - The Engine queries itself
   
   Exposes statechart structure and runtime state as queryable EQL nodes:
   - :introspection/states - statechart state definitions
   - :introspection/transitions - available transitions
   - :introspection/current-state - detailed current state info
   - :introspection/events - events that can be processed"
  (:require
   [clojure.pprint :as pprint]
   [com.fulcrologic.statecharts :as sc]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.engine :as engine]
   [ouroboros.resolver-registry :as registry]))

;; ============================================================================
;; Statechart Structure Extraction
;; ============================================================================

(defn- extract-states
  "Extract state definitions from statechart"
  [statechart]
  (->> (::sc/elements-by-id statechart)
       (filter #(= :state (:node-type (val %))))
       (map (fn [[id elem]]
              {:state/id id
               :state/type (:node-type elem)
               :state/initial? (contains? elem :initial)
               :state/parent (:parent elem)}))))

(defn- extract-transitions
  "Extract transition definitions from statechart"
  [statechart]
  (->> (::sc/elements-by-id statechart)
       (filter #(= :transition (:node-type (val %))))
       (map (fn [[_id elem]]
              {:transition/event (:event elem)
               :transition/target (:target elem)
               :transition/source (:parent elem)}))))

;; ============================================================================
;; Runtime State Introspection
;; ============================================================================

(defn- get-statechart
  "Get the system statechart from env"
  [_env]
  (let [registry (::sc/statechart-registry _env)]
    (get @(:charts registry) ::engine/system)))

(defn- current-state-details
  "Get detailed info about current state"
  []
  (when-let [{:keys [_env session]} @engine/system-instance]
    (let [config (::sc/configuration session)]
      {:introspection/configuration (vec config)
       :introspection/state-names (mapv name config)
       :introspection/can-stop? (contains? config ::engine/running)
       :introspection/can-initialize? (contains? config ::engine/stopped)})))

(defn- available-events
  "Get events that can be processed from current state"
  []
  (when-let [{:keys [env session]} @engine/system-instance]
    (let [statechart (get-statechart env)
          config (::sc/configuration session)
          elements (::sc/elements-by-id statechart)]
      (->> elements
           (filter #(= :transition (:node-type (val %))))
           (filter #(contains? config (:parent (val %))))
           (map #(:event (val %)))
           (remove nil?)
           (distinct)
           (mapv name)))))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver introspection-states [_]
  {::pco/output [{:introspection/states [:state/id :state/type :state/initial? :state/parent]}]}
  (when-let [{:keys [env]} @engine/system-instance]
    (let [statechart (get-statechart env)]
      {:introspection/states (extract-states statechart)})))

(pco/defresolver introspection-transitions [_]
  {::pco/output [{:introspection/transitions [:transition/event :transition/target :transition/source]}]}
  (when-let [{:keys [env]} @engine/system-instance]
    (let [statechart (get-statechart env)]
      {:introspection/transitions (extract-transitions statechart)})))

(pco/defresolver introspection-current [_]
  {::pco/output [:introspection/configuration
                 :introspection/state-names
                 :introspection/can-stop?
                 :introspection/can-initialize?]}
  (current-state-details))

(pco/defresolver introspection-events [_]
  {::pco/output [:introspection/available-events]}
  {:introspection/available-events (available-events)})

(pco/defresolver introspection-meta [_]
  {::pco/output [:introspection/meta]}
  {:introspection/meta {:introspection/version "0.1.0"
                        :introspection/engine-type "statecharts"
                        :introspection/self-aware? true}})

(pco/defresolver introspection-resolvers [_]
  {::pco/output [{:introspection/resolvers [:resolver/count :resolver/names]}]}
  (let [resolvers (registry/all-resolvers)]
    {:introspection/resolvers
     {:resolver/count (count resolvers)
      :resolver/names (mapv #(str (get-in % [:com.wsscode.pathom3.connect.operation/op-name]))
                          resolvers)}}))

(pco/defresolver introspection-mutations [_]
  {::pco/output [{:introspection/mutations [:mutation/count :mutation/names]}]}
  (let [mutations (registry/all-mutations)]
    {:introspection/mutations
     {:mutation/count (count mutations)
       :mutation/names (mapv #(str (get-in % [:com.wsscode.pathom3.connect.operation/op-name]))
                           mutations)}}))

(pco/defresolver introspection-system-info [_]
  {::pco/output [:introspection/system-info]}
  {:introspection/system-info
   {:system/java-version (System/getProperty "java.version")
    :system/clojure-version (clojure-version)
    :system/os-name (System/getProperty "os.name")
    :system/os-arch (System/getProperty "os.arch")
    :system/available-processors (.availableProcessors (Runtime/getRuntime))
    :system/max-memory-mb (quot (.maxMemory (Runtime/getRuntime)) (* 1024 1024))
    :system/total-memory-mb (quot (.totalMemory (Runtime/getRuntime)) (* 1024 1024))
    :system/free-memory-mb (quot (.freeMemory (Runtime/getRuntime)) (* 1024 1024))}})

(def resolvers
  "Pathom resolvers for engine introspection"
  [introspection-states
   introspection-transitions
   introspection-current
   introspection-events
   introspection-meta
   introspection-resolvers
   introspection-mutations
   introspection-system-info])

;; Register with resolver registry on load
(registry/register-resolvers! resolvers)

(comment
  ;; Direct usage
  (when-let [{:keys [env]} @engine/system-instance]
    (let [statechart (get @(::sc/statechart-registry env) ::engine/system)]
      (clojure.pprint/pprint (extract-states statechart))))
  
  (current-state-details)
  (available-events)
  
  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:introspection/configuration :introspection/available-events])
  (q/q [{:introspection/states [:state/id :state/type]}]))
