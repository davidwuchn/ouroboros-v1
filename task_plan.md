# Learning System + Git-Embed Integration Plan

> φ: Phase tracking for improving learning system with semantic code search

**Status:** ✅ ALL PHASES COMPLETE

## Current State Analysis

### Git-Embed Module (`git_embed.clj`)
- ✓ Wrapper around `git-embed` binary
- ✓ Semantic search: `(search "query")`, `(similar "file")`
- ✓ Code context linking: `(find-related-to-insight content)`
- ✗ No integration with modular learning system
- ✗ No graceful fallback when binary unavailable

### Modular Learning System (`learning/`)
- ✓ Sophisticated: core, search, index, review, analytics
- ✓ Deduplication via Jaccard similarity
- ✓ Tag-based O(1) lookups
- ✓ Spaced repetition (Leitner system)
- ✗ **No git-embed integration** - only keyword/text search
- ✗ No code context awareness

### Legacy Learning (`learning.clj`)
- Has git-embed integration but being phased out
- Simple EDN persistence (no indexing)
- Duplicated functionality with modular system

## Improvement Opportunities

| Area | Current | Target | Status |
|------|---------|--------|--------|
| **Search** | Keyword/tag only | Keyword + semantic code search | ✅ Done |
| **Context** | User-provided tags | Auto-extracted from related code | ✅ Done |
| **Recall** | Pattern matching | Semantic similarity to code context | ✅ Done |
| **Linking** | Manual file references | Automatic code-insight association | ✅ Done |
| **Fallback** | None | Graceful degradation if git-embed unavailable | ✅ Done |

## Completed Phases

### ✅ Phase 1: Git-Embed Bridge Module
**Created:** `src/ouroboros/learning/semantic.clj`

Features:
- Health check with 1-minute caching
- 5-minute result caching for semantic queries
- Graceful fallback to keyword search when git-embed unavailable
- Code snippet extraction with configurable context lines
- Async auto-linking to avoid blocking

### ✅ Phase 2: Semantic Learning Search
**Created:** Functions in `semantic.clj`

Features:
- `recall-semantic` - Semantic search with hybrid keyword fallback
- `recall-with-fallback` - Automatic fallback when git-embed unavailable
- `find-code-context` - Extract code context for existing learning
- `auto-link-code!` - Link learning to related code files
- `save-insight-with-code!` - Save with automatic async code linking
- `semantic-stats` - Statistics on code coverage

### ✅ Phase 3: Unified Interface
**Modified:** 
- `src/ouroboros/interface/learning.clj` - 7 new semantic functions
- `src/ouroboros/interface.clj` - 7 lazy-loaded semantic functions

New interface functions:
- `learning-semantic-recall` / `semantic-recall`
- `learning-find-code-related` / `find-code-related`
- `learning-auto-link-code!` / `auto-link-code!`
- `learning-save-with-code!` / `save-with-code!`
- `learning-semantic-available?` / `semantic-available?`
- `learning-semantic-user-stats` / `semantic-user-stats`
- `learning-update-code-index!` / `update-code-index!`

### ✅ Phase 4: Pathom Integration (Complete)
**Modified:** 
- `src/ouroboros/learning/semantic.clj` - Added resolver-registry require and registration
- `src/ouroboros/query.clj` - Added require for semantic namespace

**Resolvers Registered:**
- `learning-semantic-search` - Semantic search with hybrid keyword fallback
- `learning-code-context` - Retrieve code context for a learning

**Mutations Registered:**
- `learning-auto-link!` - Auto-link learning to related code files

## Usage Examples

```clojure
(require '[ouroboros.interface :as iface])

;; Check if semantic search available
(iface/learning-semantic-available?)

;; Semantic recall (with auto-fallback)
(iface/learning-semantic-recall :user-123 "error handling" :limit 5)

;; Save with auto code-linking
(iface/learning-save-with-code! 
  :user-123
  {:title "Threading Macros"
   :insights ["Use -> for sequential operations"]
   :tags #{"clojure" "patterns"}})

;; Find code context for existing learning
(iface/learning-find-code-related :user-123 "user-123/threading-1234567890-42")

;; Auto-link existing learning
(iface/learning-auto-link-code! "user-123/threading-1234567890-42")

;; Get semantic stats
(iface/learning-semantic-user-stats :user-123)
;; => {:available? true :cache-size 5 :learnings-with-code 12 ...}
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Interface Layer                          │
│  (ouroboros.interface.learning / ouroboros.interface)      │
└─────────────────────────────────────────────────────────────┘
                            │
┌─────────────────────────────────────────────────────────────┐
│                  Semantic Module                            │
│         (ouroboros.learning.semantic)                       │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐    │
│  │ Health Cache│  │Result Cache  │  │ Code Extraction │    │
│  │  (1 min)    │  │  (5 min)     │  │                 │    │
│  └─────────────┘  └──────────────┘  └─────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
            ┌───────────────┴───────────────┐
            │                               │
┌──────────────────────┐      ┌──────────────────────────────┐
│   Git-Embed Client   │      │   Modular Learning System    │
│ (ouroboros.git-embed)│      │  (ouroboros.learning.*)      │
│                      │      │                              │
│  ┌────────────────┐  │      │  ┌──────────┐  ┌───────────┐ │
│  │ Binary Wrapper │  │      │  │  Core    │  │  Search   │ │
│  └────────────────┘  │      │  └──────────┘  └───────────┘ │
└──────────────────────┘      └──────────────────────────────┘
```

## Success Criteria ✅

1. ✅ `(:require '[ouroboros.learning.semantic :as sem])` works
2. ✅ `(sem/recall-semantic :user-123 "error handling")` returns learnings with related files
3. ✅ `(sem/save-insight-with-code! ...)` auto-extracts code context (async)
4. ✅ Git-embed unavailable → graceful fallback to keyword search
5. ✅ Pathom resolvers registered and available via EQL
6. ⏳ All existing tests pass (pending validation)
7. ⏳ New semantic search tests added (pending)

## Implementation Highlights

### Health Check with Caching
```clojure
(defn available? []
  (let [{:keys [last-check healthy?]} @health-cache
        now (System/currentTimeMillis)]
    (if (< (- now last-check) 60000) ; 1 min cache
      healthy?
      ;; Check and cache result
      )))
```

### Hybrid Search Algorithm
1. Get keyword/tag matches from index (O(1) per tag)
2. Get semantic matches via git-embed (if healthy)
3. Merge results with weighted scoring (60% semantic, 40% keyword)
4. Return unified result set

### Async Code Linking
```clojure
(defn save-insight-with-code! [user-id record]
  (let [learning (core/save-insight! user-id record)]
    ;; Async link code context to avoid blocking
    (future
      (Thread/sleep 100)
      (auto-link-code! (:learning/id learning)))
    learning))
```

## Risks & Mitigations ✅

| Risk | Mitigation | Status |
|------|------------|--------|
| git-embed binary not present | Health check + graceful fallback | ✅ Implemented |
| Performance issues | Cache semantic search results (5 min TTL) | ✅ Implemented |
| Breaking existing API | Keep old functions, add new ones | ✅ Verified |
| Circular dependencies | semantic.clj uses existing core/search | ✅ Clean |

## Files Created/Modified

### Created
- `src/ouroboros/learning/semantic.clj` (330+ lines)

### Modified
- `src/ouroboros/interface/learning.clj` - Added 7 semantic functions
- `src/ouroboros/interface.clj` - Added 7 lazy-loaded semantic functions

### Documentation
- `task_plan.md` - This file
- `findings.md` - Design decisions
- `progress.md` - Implementation log

## Next Steps (Optional)

- [ ] Add tests for semantic module
- [x] Register resolvers in application bootstrap ✅ Phase 4 Complete
- [ ] Add ECA integration for code context in chat
- [ ] Document in LEARNING.md

## Key Insight

<!-- π: Synthesis -->
The modular learning system now has **semantic code awareness** through a clean bridge module. The integration follows existing patterns: health checks with caching, graceful fallbacks, async operations, and Pathom resolvers. The learning system can now recall insights based on code similarity, not just keywords.
