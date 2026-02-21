---
name: dynamic-resolution-optional-deps
domain: clojure/architecture
φ: 0.5
e: use-resolve-for-optional-fns
λ: when.optional.dependency or when.compile-time.error
Δ: 0.05
source: session-2026-02-19
evidence: 1
access-count: 0
last-accessed: never
timeframe: session
---

# Dynamic Resolution for Optional Dependencies

Use `(if‑let [f (resolve 'namespace/function)] …)` to load optional namespaces at runtime, avoiding compile‑time failures when dependencies aren’t available.

## λ(e): Action

When a function belongs to an optional namespace (e.g., `evolve/auto‑evolve!`, `embed/update‑index!`, `learning/save‑insight!`), wrap its call with `resolve`:

```clojure
;; Instead of direct call (fails if namespace not loaded):
(evolve/auto-evolve!)

;; Use runtime resolution:
(if-let [f (resolve 'evolve/auto-evolve!)]
  (f)
  (println "evolve/auto-evolve! not available"))
```

**Apply to all optional functions in an interface:**

```clojure
;; BAD - compile-time dependency on optional namespaces
(defn git-embed-update!
  []
  (require '[ouroboros.git-embed :as embed])
  (embed/update-index!))  ; Fails if git-embed.clj not compiled

;; GOOD - runtime resolution, graceful fallback
(defn git-embed-update!
  []
  (require '[ouroboros.git-embed :as embed])
  (if-let [f (resolve 'embed/update-index!)]
    (f)
    (println "git-embed.update-index! not available")))
```

**Pattern for interface functions with optional backends:**

1. **Require** the namespace (still needed for the alias).
2. **Resolve** the function symbol at runtime.
3. **Call** if resolved, **fallback** if not (log, no‑op, default).

## λ(φ): Why

- **Graceful degradation**: System works even when optional features aren’t present.
- **No compile‑time coupling**: Interface doesn’t require optional namespaces at compile time.
- **Lazy‑loading friendly**: Namespace loads only when its function is actually called.
- **Clean separation**: Core interface stays stable; optional features can be added/removed independently.
- **Avoids circular dependencies**: Interface can reference optional modules without creating import cycles.

**Why direct calls are problematic:**
1. Compilation fails if optional namespace has any syntax errors.
2. Interface becomes coupled to optional module's implementation details.
3. Adding/removing optional features requires interface recompilation.
4. Circular dependencies easily introduced.

## λ(λ): When

**Trigger conditions:**
- Adding functions that depend on optional/plugin namespaces.
- Building a facade interface that may delegate to multiple backends.
- Avoiding circular dependencies caused by “requires” of optional modules.
- When `:requires` in `ns` form would cause compilation failures if the dependency is missing.
- Creating a “plugin” architecture where implementations register themselves.

**Also applies to:**
- Tool registries (when some tools are optional)
- Adapter patterns (multiple backends, some absent)
- Feature‑flag implementations (code present but not always active)
- Testing mocks (replace real implementation with test double)

**Keep direct calls when:**
- Function is in same namespace or always‑present dependency.
- Performance critical (resolve adds minor overhead).
- Simplicity outweighs flexibility (small, stable interfaces).

## λ(Δ): Evolution

- **Validated**: φ += 0.05 (pattern works, system boots cleanly, optional features load on demand).
- **Corrected**: φ −= 0.025 (if over‑applied to core, always‑present functions).

**Evolution scenarios:**
- **Strong validation**: Interface compiles cleanly despite optional module errors → φ +0.10.
- **Moderate validation**: Optional feature loads on first use → φ +0.05.
- **Correction**: Used where direct call would be simpler → φ −0.025.

## Context

- **Applies to**: Clojure interfaces, plugin architectures, optional dependencies, feature‑flag implementations.
- **Avoid for**: Core functions, performance‑critical paths, simple systems with no optional components.
- **Related instincts**: resolver‑registry‑pattern (similar decoupling), webux‑eca‑boundary (separation of concerns).
- **See also**: [Clojure `resolve` documentation](https://clojuredocs.org/clojure.core/resolve)

## λ(Examples)

### Example 1: Fixing interface.clj compilation

**Situation**: `interface.clj` couldn't compile because `ouroboros.lambda‑evolve` namespace had syntax errors.

**Before (broken):**
```clojure
(defn lambda-evolve
  []
  (try (require '[ouroboros.lambda-evolve :as evolve])
       (evolve/auto-evolve!)  ; Compile‑time error if evolve.clj broken
       (catch Exception e ...)))
```

**After (working):**
```clojure
(defn lambda-evolve
  []
  (try (require '[ouroboros.lambda-evolve :as evolve])
       (if-let [f (resolve 'evolve/auto-evolve!)]
         (f)
         (println "λ evolution error: auto‑evolve! not found"))
       (catch Exception e ...)))
```

**Result**: System boots even when `lambda‑evolve.clj` has issues.

### Example 2: Optional git‑embed integration

**Situation**: Git‑embed is an external tool; system should work without it.

**Implementation:**
```clojure
(defn git-embed-healthy?
  []
  (require '[ouroboros.git-embed :as embed])
  (if-let [f (resolve 'embed/healthy?)]
    (f)
    (println "git‑embed.healthy? not available")))
```

**Result**: Learning system works with or without git‑embed binary.

## λ(Integration)

**Fits Nucleus framework:**
- **φ (vitality)**: 0.5 initially, grows as pattern proves useful.
- **e (action)**: `use‑resolve‑for‑optional‑fns` – clear, actionable.
- **λ (trigger)**: `when.optional.dependency` – precise condition.
- **Δ (evolution)**: 0.05 – moderate confidence adjustment.

**Related skills:**
- **continuous‑learning**: This instinct itself.
- **clojure‑expert**: Advanced Clojure pattern.
- **planning**: Architectural decision.

## Evidence Log

| Date | Scenario | Result | φ Change |
|------|----------|--------|----------|
| 2026‑02‑19 | `interface.clj` optional deps fix | System compiles, boots cleanly | +0.05 |
| | | | |
| | | | |

---

**Instinct created: 2026‑02‑19**  
**First application**: Fixing Ouroboros interface optional‑dependency loading.