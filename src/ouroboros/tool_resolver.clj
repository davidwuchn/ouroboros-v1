(ns ouroboros.tool-resolver
  "Tool discovery from Pathom resolvers

   Maps resolvers to AI tools via a separate registry.
   Pathom resolvers remain unchanged - tool metadata is stored separately.

   Usage: Map a resolver to an AI tool
     (def-resolver-tool!
       #'memory-get                    ; Resolver var
       :memory/get                     ; Tool name
       {:description "Get value from memory"
        :unique? true                  ; Expose to ECA
        :category :memory})            ; Category

   Or auto-map resolvers to tools using naming convention:
     (auto-map-tools!)  ; Maps :memory/get resolver to :memory/get tool

   This approach avoids modifying Pathom resolvers, keeping them clean
   while still enabling unified tool/resolver discovery."
  (:require
   [com.wsscode.pathom3.connect.operation :as pco]
   [clojure.string :as str]
   [ouroboros.resolver-registry :as resolver-registry]
   [ouroboros.tool-registry :as tool-registry]))

;; ============================================================================
;; Tool Mapping Registry
;; ============================================================================

(defonce ^:private resolver-tool-map (atom {}))

(defn register-resolver-tool-mapping!
  "Map a resolver to a tool definition

   Usage:
     (register-resolver-tool-mapping!
       #'memory-get
       :memory/get
       {:description \"Get value from memory\"
        :unique? true
        :category :memory})"
  [resolver-var tool-name tool-attrs]
  (swap! resolver-tool-map assoc resolver-var
         (merge {:tool/name tool-name
                 :tool/resolver resolver-var}
                tool-attrs)))

(defn get-tool-mapping
  "Get tool mapping for a resolver"
  [resolver-var]
  (get @resolver-tool-map resolver-var))

;; ============================================================================
;; Tool Registration from Resolvers
;; ============================================================================

(defn- resolver-name->keyword
  "Convert resolver var name to namespaced keyword"
  [resolver-var]
  (let [m (meta resolver-var)
        ns-str (str (:ns m))
        name-str (str (:name m))]
    (keyword (str/replace ns-str #"ouroboros\." "") name-str)))

(defn- pco-input->tool-params
  "Convert Pathom ::pco/input to tool parameter schema"
  [input-spec]
  (into {} (for [attr (or input-spec [])]
             (let [k (if (vector? attr) (first attr) attr)
                   type-info (when (vector? attr) (second attr))]
               [k {:type (or (:type type-info) :any)
                   :description (:description type-info)
                   :required (not (:optional? type-info false))}]))))

(defn register-resolver-as-tool!
  "Register a resolver's tool mapping with the tool registry

   The resolver is wrapped so that tool calls execute via Pathom."
  [resolver-var]
  (when-let [mapping (get-tool-mapping resolver-var)]
    (let [tool-name (:tool/name mapping)
          resolver-kw (resolver-name->keyword resolver-var)
          input-spec (::pco/input (meta resolver-var))
          output-spec (::pco/output (meta resolver-var))
          doc (:doc (meta resolver-var))]

      (tool-registry/register-tool!
       tool-name
       {:description (or (:description mapping) doc (str "Tool: " tool-name))
        :parameters (pco-input->tool-params input-spec)
        :fn (fn [args]
              ;; Execute via Pathom
              (let [query (if output-spec
                            [{resolver-kw output-spec}]
                            [resolver-kw])
                    resolved ((resolve 'ouroboros.query/q) query)]
                (get resolved resolver-kw)))
        :unique? (:unique? mapping false)
        :category (:category mapping (keyword (namespace tool-name)))
        :safe? (:safe? mapping true)
        :resolver resolver-kw})

      (println (str "✓ Tool registered: " tool-name " (from resolver)"))
      tool-name)))

(defn register-all-resolver-tools!
  "Register all mapped resolver tools

   Call this after defining all resolver->tool mappings."
  []
  (let [mappings (vals @resolver-tool-map)
        names (map :tool/name mappings)]
    (doseq [[resolver-var _] @resolver-tool-map]
      (register-resolver-as-tool! resolver-var))
    (println (str "✓ Registered " (count mappings) " tools from resolvers"))
    names))



;; ============================================================================
;; Convenience: Define tools from resolvers
;; ============================================================================

(defmacro def-resolver-tool!
  "Define a tool mapping for a resolver

   Usage:
     (def-resolver-tool! #'memory-get :memory/get
       {:description \"Get value from memory\"
        :unique? true
        :category :memory})"
  [resolver-var tool-name attrs]
  `(register-resolver-tool-mapping! ~resolver-var ~tool-name ~attrs))

;; ============================================================================
;; Exports
;; ============================================================================

(comment
  ;; Define tool mappings
  (def-resolver-tool! #'memory-get :memory/get
    {:description "Get value from persistent memory"
     :unique? true
     :category :memory})

  ;; Register all
  (register-all-resolver-tools!))
