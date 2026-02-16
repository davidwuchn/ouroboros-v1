(ns ouroboros.resolver-registry
  "Resolver Registry - Break circular dependencies via registration pattern
   
   Instead of query.clj requiring all namespaces (circular deps),
   each namespace registers its resolvers here. Query reads from registry.
   
   Usage in resolver namespace:
     (registry/register-resolvers! [my-resolver-1 my-resolver-2])
   
   Usage in query:
     (def all-resolvers (registry/all-resolvers))"
  )

(defonce ^:private resolver-registry (atom []))
(defonce ^:private mutation-registry (atom []))

(defn register-resolvers!
  "Register resolvers with the global registry.
   
   Call from each namespace that defines resolvers.
   Idempotent - safe to call multiple times."
  [resolvers]
  (swap! resolver-registry 
         (fn [current]
           (vec (distinct (concat current (flatten resolvers)))))))

(defn register-mutations!
  "Register mutations with the global registry.
   
   Call from each namespace that defines mutations."
  [mutations]
  (swap! mutation-registry
         (fn [current]
           (vec (distinct (concat current (flatten mutations)))))))

(defn all-resolvers
  "Get all registered resolvers. Call from query.clj to build environment."
  []
  @resolver-registry)

(defn all-mutations
  "Get all registered mutations. Call from query.clj to build environment."
  []
  @mutation-registry)

(defn clear!
  "Clear all registrations. Useful for testing."
  []
  (reset! resolver-registry [])
  (reset! mutation-registry []))

(defn count-resolvers
  "Count registered resolvers (for debugging)."
  []
  (count @resolver-registry))

(defn count-mutations
  "Count registered mutations (for debugging)."
  []
  (count @mutation-registry))

(defn list-sources
  "List which namespaces have registered (for debugging).
   
   Note: Pathom doesn't track source namespace automatically.
   This is a placeholder for future enhancement."
  []
  (map #(str (:name (meta %))) @resolver-registry))