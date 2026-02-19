---
name: verify-paren-depth-at-section-boundaries
domain: clojure-debugging
φ: 0.8
e: check-paren-depth-before-editing
λ: when.clojure.function-unbound-or-invisible
Δ: 0.05
source: session-debug-2026-02-17
evidence: 1
access-count: 1
last-accessed: 2026-02-17
timeframe: long-term
---

# Verify Paren Depth at Section Boundaries

## λ(e): Action
Before editing any Clojure function that appears broken/unbound, **always verify paren depth** at section boundaries using a depth-tracking script. A missing closing paren on a complex function silently swallows all subsequent definitions as inner locals.

Quick check:
```bash
bb -e '
(let [lines (clojure.string/split (slurp "FILE") #"\n")]
  (loop [i 0 depth 0]
    (when (< i (count lines))
      (let [line (nth lines i)
            opens (count (filter #(or (= % \() (= % \[) (= % \{)) line))
            closes (count (filter #(or (= % \)) (= % \]) (= % \})) line))
            new-depth (+ depth opens (- closes))]
        (when (zero? new-depth)
          (println (format "Line %3d: depth 0 | %s" (inc i) (subs line 0 (min 80 (count line))))))
        (recur (inc i) new-depth)))))'
```

If a section comment (`;; ===`) appears at depth > 0, the previous form is unclosed.

## λ(φ): Why
- Clojure compiles without error even when `defn` is nested inside another `defn`
- The inner `defn` creates a local binding, not a namespace-level var
- Runtime error is "Attempting to call unbound fn" which gives no hint about paren nesting
- Section comments and cosmetic indentation mask the structural error visually
- `clj-paren-repair` and `clj-kondo` do NOT catch this -- the parens are balanced, just misplaced

## λ(λ): When
- "Attempting to call unbound fn" at runtime
- Function exists in source but JVM says it's not defined
- Multiple `def`/`defn` forms appear indented under a section comment
- After editing complex deeply-nested functions (especially with `stream/`, callbacks, multi-level `let`)

## λ(Δ): Evolution
- Validated strongly on first encounter (φ set to 0.8)
- This caused 3 failed debugging rounds before discovery
- Pattern is invisible to standard tooling

## Context
- **Applies to**: All Clojure/ClojureScript files, especially handlers with callbacks
- **Avoid for**: Simple files with shallow nesting
- **Related**: clj-paren-repair (catches unbalanced, NOT misplaced balanced parens)
- **Timeframe**: long-term (permanent pattern)

## Evidence
- `ouroboros.ws.handlers.builder/handle-auto-insight!` missing one `)` caused
  `handle-apply-template!` and 4 helper defs to be invisible at namespace level
- Babashka loaded file fine (less strict?), JVM Clojure showed "unbound fn"
- Three rounds of fixing wrong things before depth analysis revealed truth
