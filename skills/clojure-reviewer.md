# Clojure Reviewer

**Purpose**: Review Clojure code with λ(system) evolution integration.

**When to use**: Code review, PR analysis, quality checks.

---

## Review Checklist

### Syntax Scale (Line-level)
- [ ] Line length < 100 characters
- [ ] Proper indentation (2 spaces)
- [ ] Nesting depth ≤ 3 (prefer threading)

### Semantic Scale (Idioms)
- [ ] No `!` suffix in function names
- [ ] Threading macros over deep nesting
- [ ] `when` for single branch, `if` for both
- [ ] Destructuring with `:keys` and `:or`
- [ ] `ex-info` for structured errors

### Architectural Scale (Design)
- [ ] Single-purpose namespaces
- [ ] Clear public/private separation
- [ ] Protocol only when needed
- [ ] No circular dependencies

---

## λ(system) Integration

When flagging issues, always call the evolution tracker:

```clojure
(require '[ouroboros.telemetry.lambda-bridge :as bridge])

;; Track a syntax issue
(bridge/emit-review-event 
  :deep-nesting 
  "src/ouroboros/example.clj"
  {:line 42 :nesting-level 5})

;; Track a semantic issue  
(bridge/emit-review-event
  :non-idiomatic-naming
  "src/ouroboros/api.clj"
  {:line 23 :name "process-data!"})

;; Track an architectural issue
(bridge/emit-review-event
  :god-object
  "src/ouroboros/core.clj"
  {:public-fns 50 :recommended-max 10})
```

### Auto-Generated Rules

After each review cycle, check `skills/auto-rules.md` for newly generated rules:

```clojure
;; Load and apply auto-rules
(require '[ouroboros.lambda-evolve :as evolve])
(evolve/auto-evolve!)
```

### Metrics Tracking

Record review effectiveness for λ(self) metrics:

```clojure
(require '[ouroboros.lambda-metrics :as metrics])

;; After review completion
(metrics/record-review!
  {:issues 5
   :suggestions 3
   :adopted 2
   :false-positive? false})
```

---

## Review Output Format

```markdown
## Review Summary

**File**: `src/namespace.clj`
**Lines**: 120
**Issues**: 2 syntax, 1 semantic, 0 architectural

### Syntax Issues
- Line 42: Nesting depth 4, consider `->>` threading

### Semantic Issues  
- Line 56: Function `save!` uses `!` suffix (not idiomatic)

### Architectural Issues
- None

### Recommendations
1. Apply threading macro to `process-data` function
2. Rename `save!` to `save-record`
```

---

## Definition of Done

- [ ] All files reviewed against checklist
- [ ] Issues tracked via `emit-review-event`
- [ ] Metrics recorded via `record-review!`
- [ ] Auto-evolution triggered if threshold met
- [ ] Review output follows format above

**Metrics Target**:
- False positive rate: < 10%
- Adoption rate: > 70%
