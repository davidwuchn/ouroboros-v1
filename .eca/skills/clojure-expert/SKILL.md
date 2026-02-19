---
name: clojure-expert
description: Writing/generating Clojure code with REPL-first methodology. Use when Clojure REPL tools available.
---

```
engage nucleus:
[φ fractal e τ π μ ∃ ∀] | [Δ λ ∞/0 | ε/φ Σ/μ c/h] | OODA
Human ⊗ AI ⊗ REPL
```

# Clojure Expert

**Purpose**: Write idiomatic Clojure code using REPL-first development.

**When to use**: Authoring new code, implementing features, refactoring.

---

## REPL-First Development (Core)

**Before ANY file modification:**

```clojure
;; 1. Read source (whole file)
;; 2. Test current behavior
(require '[ns :as n] :reload)
(n/current-fn test-data)

;; 3. Develop fix in REPL
(defn fix [d] ...)
(fix edge-case-1)  ; nil, empty, invalid
(fix edge-case-2)

;; 4. Verify edge cases
;; 5. Save to file ONLY after verification
```

**Never**: Edit file → hope it works → run tests.
**Always**: REPL → verify → save.

---

## The Three Questions (Pre-Implementation)

1. **Intentions?** - What behavior, not how. Test the what.
2. **Why this approach?** - Challenge: need Component? Or plain functions?
3. **Simpler way?** - Protocol for single impl? Macro when function works?

---

## Idiomatic Patterns

### Threading (Prefer Over Nesting)

```clojure
(-> user
    (assoc :login (Instant/now))
    (update :count inc))

(->> users
     (filter active?)
     (map :email))

(some-> user :address :code (subs 0 5))  ; short-circuit nil
```

### Control Flow

```clojure
(when (valid? data)           ; single branch + side effects
  (process data))

(cond                         ; multiple conditions
  (< n 0) :negative
  (= n 0) :zero
  :else   :positive)

(case op                      ; constant dispatch
  :add (+ a b)
  :sub (- a b))
```

### Data & Functions

```clojure
;; Destructuring with defaults
(defn connect [{:keys [host port] :or {port 8080}}])

;; Into for transformations
(into [] (filter even?) nums)

;; Ex-info for structured errors
(throw (ex-info "Not found" {:id user-id}))
```

### Naming

| Type | Pattern | Example |
|------|---------|---------|
| Functions | kebab-case | `calculate-total` |
| Predicates | `?` suffix | `valid?` |
| Conversions | `src->dst` | `map->vector` |
| Dynamic | `*earmuffs*` | `*connection*` |
| Private | `-` prefix | `-parse-date` |

**NEVER use `!` suffix** - not idiomatic.

---

## Verification Gates (Pre-Save)

- [ ] Tested in REPL (happy path + nil/empty/invalid)
- [ ] Threading macros over deep nesting
- [ ] No `!` suffix in names
- [ ] Standard aliases (`str`, `set`, `io`)
- [ ] Zero compilation warnings

---

## Anti-Patterns (Avoid)

| Instead of... | Use... |
|---------------|--------|
| Atoms for accumulation | `reduce` |
| Nested null checks | `some->` |
| `(! suffix)` | Remove it |
| String keys | Keywords `:key` |
| Explicit recursion | Higher-order functions |
| `println` debugging | REPL evaluation |

---

## Context7 Integration

For library/framework questions:

1. `context7__resolve-library-id` with library name
2. `context7__query-docs` with specific query
3. Use docs to inform implementation

---

## Definition of Done

- [ ] REPL testing completed (all edge cases)
- [ ] Zero compilation/linting errors
- [ ] All tests pass

**"It works" ≠ "It's done"**
