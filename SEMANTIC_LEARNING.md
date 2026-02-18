# Semantic Learning System

> Code-aware learning with git-embed integration

## Overview

The semantic learning system enhances the modular learning system with **code context awareness**. It uses git-embed for semantic code search to:

1. **Recall learnings** based on similarity to current code context
2. **Auto-link insights** to related code files
3. **Extract code snippets** for learning context
4. **Fallback gracefully** when git-embed is unavailable

## Quick Start

```clojure
(require '[ouroboros.interface :as iface])

;; Check availability
(iface/learning-semantic-available?)
;; => true (if git-embed healthy)

;; Semantic recall (auto-fallback to keyword if git-embed down)
(iface/learning-semantic-recall :user-123 "error handling" :limit 5)
;; => [{:learning/id ... :learning/title ... :semantic/score 15.5 ...}]

;; Save with auto code-linking (async)
(iface/learning-save-with-code!
  :user-123
  {:title "Threading Macros"
   :insights ["Use -> for sequential operations"]
   :tags #{"clojure" "patterns"}})
```

## API Reference

### Interface Functions (ouroboros.interface)

| Function | Purpose |
|----------|---------|
| `learning-semantic-available?` | Check if git-embed is healthy |
| `learning-semantic-recall` | Search learnings with semantic similarity |
| `learning-find-code-related` | Find code context for a learning |
| `learning-auto-link-code!` | Link existing learning to code |
| `learning-save-with-code!` | Save learning with auto code-linking |
| `learning-semantic-user-stats` | Get semantic statistics for user |
| `learning-update-code-index!` | Update git-embed code index |

### Direct Module Functions (ouroboros.learning.semantic)

| Function | Purpose |
|----------|---------|
| `available?` | Check if semantic search is available |
| `recall-semantic` | Semantic search with hybrid keyword option |
| `recall-with-fallback` | Auto-fallback when git-embed unavailable |
| `find-code-context` | Extract code context for learning |
| `auto-link-code!` | Link learning to related code |
| `save-insight-with-code!` | Save with async code linking |
| `semantic-stats` | Get statistics |
| `update-code-index!` | Refresh git-embed index |
| `clear-cache!` | Clear semantic search cache |

## How It Works

### Hybrid Search Algorithm

```
User Query
    │
    ▼
┌─────────────────────┐
│ 1. Keyword Search   │ ← O(1) from tag index (fast)
│    (from index)     │
└─────────────────────┘
    │
    ▼
┌─────────────────────┐     ┌──────────────────────┐
│ 2. Semantic Search  │────▶│ Git-Embed Binary     │
│    (if available)   │     │ (semantic similarity)│
└─────────────────────┘     └──────────────────────┘
    │                               │
    ▼                               ▼
┌─────────────────────┐     ┌──────────────────────┐
│ 3. Merge & Score    │     │ Code Files           │
│    (60% sem +       │     │ [{:file :score}...]  │
│     40% keyword)    │     └──────────────────────┘
└─────────────────────┘
    │
    ▼
┌─────────────────────┐
│ 4. Return Results   │
│    Ranked by score  │
└─────────────────────┘
```

### Caching Strategy

- **Health cache:** 1 minute - avoids repeated binary checks
- **Result cache:** 5 minutes - avoids repeated git-embed queries
- **Cache key:** `user-id + query hash`

### Graceful Fallback

If git-embed is unavailable:
1. Return keyword search results only
2. Emit telemetry event for monitoring
3. No errors thrown to user

## Data Model Extension

Learning records now include code context:

```clojure
{:learning/id "user-123/pattern-1234567890-42"
 :learning/title "Threading Macros"
 :learning/insights [...]
 :learning/tags #{...}
 ;; NEW: Code context
 :learning/code-files ["src/api.clj" "src/utils.clj"]
 :learning/code-snippets [{:file "src/api.clj"
                           :line-start 42
                           :line-end 50
                           :snippet "(defn process [data] (-> data ...))"
                           :truncated? false}]
 :learning/code-linked-at "2025-01-15T10:30:00Z"}
```

## Pathom Integration

EQL queries for semantic learning:

```clojure
;; Semantic search
(q [{[:user/id :user-123 :query/query "error handling"]
     [:learning/semantic-results]}])

;; Code context for learning
(q [{[:learning/id "user-123/pattern-123"]
     [:learning/code-files :learning/code-snippets]}])

;; Auto-link mutation
(m 'ouroboros.learning.semantic/learning-auto-link!
   {:learning/id "user-123/pattern-123"})
```

## Configuration

No configuration needed - uses existing git-embed binary.

To check git-embed status:
```bash
git-embed embed status
```

To update code index:
```bash
git-embed embed update
# Or via interface:
(iface/learning-update-code-index!)
```

## Performance Considerations

| Operation | Time | Notes |
|-----------|------|-------|
| Health check | ~1ms | Cached for 1 minute |
| Keyword search | ~10ms | O(1) tag index lookup |
| Semantic search | ~100-500ms | Depends on repo size |
| Cache hit | ~1ms | Returned from memory |
| Code extraction | ~5ms per file | File I/O |

## Files

- `src/ouroboros/learning/semantic.clj` - Core semantic module
- `src/ouroboros/interface/learning.clj` - Interface wrapper
- `src/ouroboros/interface.clj` - Public API

## Planning Skill Integration

The semantic learning system integrates with the **planning skill** for complex, multi-step tasks. Use the 3-file pattern alongside semantic learning to capture insights from research and implementation work.

### The 3-File Pattern

| File | Symbol | Purpose | Learnings Captured |
|------|--------|---------|-------------------|
| `task_plan.md` | φ | Phase tracking, goals | Intent → Structure |
| `findings.md` | π | Research synthesis | Discovery → Knowledge |
| `progress.md` | Δ | Session logging | Action → History |

### Workflow: Planning + Semantic Learning

```clojure
;; 1. Start complex task with planning files
;; (planning skill creates task_plan.md, findings.md, progress.md)

;; 2. Research phase - save findings as you discover
(iface/learning-save-with-code!
  :user-123
  {:title "Git-Embed Binary Interface"
   :insights ["Use subprocess with 30s timeout" 
              "Parse output with line-split regex"
              "Cache health checks for 60s"]
   :tags #{"git-embed" "integration" "patterns"}
   :category "research"})

;; 3. Implementation phase - semantic recall finds relevant code
;; Query "subprocess timeout" finds your git-embed research
(iface/learning-semantic-recall 
  :user-123 
  "subprocess timeout implementation" 
  :limit 3)
;; => [{:learning/title "Git-Embed Binary Interface" 
;;      :semantic/score 12.5
;;      :semantic/code-files ["src/git_embed.clj"]} ...]

;; 4. Update progress.md with completion status
;; Link to related learnings via semantic search
```

### Capturing Research Insights

When doing deep research:

1. **Save raw findings** with code context:
   ```clojure
   (iface/learning-save-with-code!
     :user-id
     {:title "Pathom 3 Batch Resolvers"
      :insights ["Use pc/batch-resolver for N+1 queries"
                 "Batch key must match input key"]
      :examples [{:code "(pco/defresolver batch-users [...])"}]
      :tags #{"pathom" "performance" "graphql"}})
   ```

2. **Synthesize in findings.md** - High-level patterns from multiple sources

3. **Link to code** - Semantic auto-link connects insights to actual implementation

### Querying Across Planning Context

```clojure
;; Find all learnings related to current task
;; (searches both keywords and code context)
(iface/learning-semantic-recall 
  :user-123 
  "error handling subprocess git-embed"
  :limit 10)

;; Get stats on code coverage
(iface/learning-semantic-user-stats :user-123)
;; => {:available? true 
;;     :learnings-with-code 12  ; research linked to code
;;     :total-code-files 45
;;     :code-coverage 0.6}        ; 60% have code context
```

### Best Practices

1. **Start with planning files** for any task >5 tool calls
2. **Save learnings immediately** when you discover something
3. **Use semantic recall** before implementing - find prior research
4. **Update findings.md** with synthesized knowledge
5. **Let auto-link run** - Code context appears async

### Files

- `src/ouroboros/learning/semantic.clj` - Core semantic module
- `src/ouroboros/interface/learning.clj` - Interface wrapper
- `src/ouroboros/interface.clj` - Public API

## See Also

- `task_plan.md` - Implementation plan
- `findings.md` - Design decisions
- `progress.md` - Implementation log
- `LEARNING.md` - Learning system patterns
- `.eca/skills/planning/` - Planning skill documentation
