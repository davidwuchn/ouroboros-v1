# Learning System + Git-Embed Integration Findings

> π: Research synthesis and design decisions

## Key Findings

### 1. Learning System Architecture

The modular learning system has clean separation:

```
learning/
├── core.clj     - CRUD, deduplication, validation
├── index.clj    - O(1) indexes (WAL-backed)
├── search.clj   - Pattern matching, full-text
├── review.clj   - Spaced repetition
├── analytics.clj - Stats, flywheel progression
└── *.clj        - Domain-specific (empathy_map, etc.)
```

**Integration Point:** The search layer (`search.clj`) is the ideal place to add semantic capabilities because:
- Already handles query → results transformation
- Has scoring infrastructure (`:match-score`)
- Has Pathom resolver integration

### 2. Git-Embed Capabilities

Current `git_embed.clj` provides:
- `(search query limit)` - Semantic search for code
- `(similar file limit)` - Find similar files
- `(find-related-to-insight content)` - Link insights to code

**Gap:** No caching, no health check with fallback, no snippet extraction with context.

### 3. Code Context Data Model

Current learning record:
```clojure
{:learning/id "..."
 :learning/title "..."
 :learning/insights [...]
 :learning/tags #{...}
 ;; Missing: code context
}
```

**Proposed extension:**
```clojure
{:learning/code-context
  [{:file "src/api.clj"
    :line-start 42
    :line-end 50
    :snippet "(defn handle-error [e] ...)"
    :semantic-score 0.87}
   ...]}
```

### 4. Interface Patterns

The interface follows lazy-loading:
```clojure
(defn- resolve-learning [sym]
  (require 'ouroboros.learning)
  (ns-resolve 'ouroboros.learning sym))
```

**Best practice:** Keep this pattern for new semantic functions.

## Design Decisions

### Decision 1: Bridge Module Pattern

Instead of calling git-embed directly from learning code, create a bridge:

```clojure
;; ouroboros.learning.code-bridge
(defprotocol CodeContextProvider
  (healthy? [this])
  (find-related [this content limit])
  (extract-snippets [this files]))

(defrecord GitEmbedProvider [...] ...)
(defrecord FallbackProvider [...] ...)
```

**Why:** Enables testing without git-embed, allows mock providers, centralizes error handling.

### Decision 2: Async Context Extraction

When saving insights with auto-linking:
- Don't block on git-embed call
- Return learning record immediately
- Async populate `:learning/code-context`
- Fire telemetry event when complete

**Why:** Git-embed may be slow; don't block user interaction.

### Decision 3: Semantic + Keyword Hybrid Search

Semantic recall algorithm:
1. Get keyword/tag matches (fast, from index)
2. Get semantic matches via git-embed (if healthy)
3. Merge results with weighted scoring
4. Return unified result set

**Why:** Keyword search is O(1) from index; semantic adds value but shouldn't replace.

### Decision 4: Lazy Semantic Index

Don't maintain a separate semantic index. Instead:
- Query git-embed on-demand
- Cache results in memory (TTL: 5 min)
- Persist only the file references, not embeddings

**Why:** Git-embed manages its own index; don't duplicate. Caching prevents repeated queries.

## Implementation Notes

### Cache Strategy

```clojure
(def ^:private semantic-cache (atom {}))

(defn- cache-key [query user-id]
  (str (name user-id) "/" (hash query)))

(defn- get-cached [query user-id]
  (when-let [entry (get @semantic-cache (cache-key query user-id))]
    (when (< (- (System/currentTimeMillis) (:timestamp entry)) 300000) ; 5 min
      (:results entry))))
```

### Health Check with TTL

```clojure
(def ^:private git-embed-health (atom {:last-check 0 :healthy? false}))

(defn git-embed-healthy? []
  (let [{:keys [last-check healthy?]} @git-embed-health
        now (System/currentTimeMillis)]
    (if (< (- now last-check) 60000) ; 1 min cache
      healthy?
      (let [new-health (check-git-embed-actual)]
        (reset! git-embed-health {:last-check now :healthy? new-health})
        new-health))))
```

### Code Snippet Extraction

```clojure
(defn extract-snippet [file line-num context-lines]
  (let [lines (str/split-lines (slurp file))
        start (max 0 (- line-num context-lines))
        end (min (count lines) (+ line-num context-lines))
        snippet (str/join "\n" (subvec lines start end))]
    {:file file
     :line-start (inc start)
     :line-end end
     :snippet snippet}))
```

## API Design

### New Functions

```clojure
;; ouroboros.learning.semantic
(defn recall-semantic [user-id query & {:keys [limit hybrid?] :or {limit 5 hybrid? true}}])
(defn find-code-context [user-id learning-id])
(defn auto-link-code! [learning-id])
(defn semantic-stats [user-id])

;; ouroboros.interface.learning (add)
(defn semantic-recall [user-id query])
(defn find-code-related [user-id context])
(defn auto-link-code! [learning-id])
```

### Pathom Integration

```clojure
(pco/defresolver learning-semantic-search
  [{:keys [user/id query hybrid]}]
  {::pco/output [{:learning/semantic-results [:learning/id :learning/title :semantic/score]}]}
  {:learning/semantic-results (semantic/recall-semantic id query :hybrid? hybrid)})
```

## Testing Strategy

1. **Unit tests** with mock `CodeContextProvider`
2. **Integration tests** require git-embed binary
3. **Fallback tests** verify behavior when git-embed unavailable
4. **Performance tests** for cache effectiveness

## Open Questions

<!-- ?: Maybe - needs validation -->
1. Should we store embeddings in learning records, or just file refs?
2. How to handle git-embed index updates? Manual or auto on save?
3. Should semantic search be default, or opt-in per query?

<!-- ∃: Truth - validated finding -->
- The modular learning system is production-ready and should be the integration target
- Git-embed binary dependency is acceptable with graceful fallback
- Code context significantly enhances learning value
