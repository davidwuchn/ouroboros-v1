---
name: resolver-registry-pattern
domain: architecture
φ: 0.95
e: use-registry-for-resolvers
λ: when.circular-deps or when.query-god-module
Δ: 0.02
source: learning-md-pattern-1
evidence: 10
access-count: 0
last-accessed: never
timeframe: long-term
---

# Resolver Registry Pattern

Break circular dependencies by having resolvers self-register instead of centralizing imports.

## λ(e): Action

When `query.clj` grows into a "god module" with many requires creating circular dependencies:

1. Extract registry to its own namespace (`resolver-registry`)
2. Each resolver namespace requires only the registry
3. Resolvers self-register on namespace load via `register-resolvers!`
4. Query collects registered resolvers at runtime

**Before (circular):**
```clojure
;; query.clj - 16 requires, god module
(:require
  [ouroboros.history]      ; for git resolvers
  [ouroboros.knowledge]    ; for file resolvers
  [ouroboros.api]          ; for http resolvers
  ... 13 more)
```

**After (decoupled):**
```clojure
;; query.clj - 3 requires only
(:require
  [ouroboros.resolver-registry :as registry]
  [ouroboros.engine :as engine])

;; Each namespace self-registers
(ns ouroboros.history
  (:require [ouroboros.resolver-registry :as registry]))

(def resolvers [git-commits git-status ...])
(registry/register-resolvers! resolvers)
```

## λ(φ): Why

Circular dependencies complicate testing, slow compilation, and make refactoring hazardous. The registry pattern:

- **Eliminates import cycles**: Query doesn't import resolvers; resolvers import registry
- **Enables lazy loading**: Namespaces load when needed, register automatically
- **Simplifies testing**: Mock registry for isolated tests
- **Scales cleanly**: Add new resolver namespaces without touching query

Proven in production: 52 tests pass, circular deps reduced from 15→3, query requires 16→3.

## λ(λ): When to Apply

**Trigger conditions:**
- `:query.clj` requires >10 namespaces
- Circular dependency errors on compilation
- Adding a new resolver requires editing `query.clj`
- "Cannot find resolver" errors after namespace splits

**Also applies to:**
- Tool registries (when `tools.clj` grows)
- Handler registries (when `websocket.clj` grows)
- Any system where core module imports all features

## λ(Δ): Evolution

- **Validated**: φ += 0.02 (continue using, proven in 10+ scenarios)
- **Corrected**: φ -= 0.01 (if over-applied to simple cases)

## Implementation Notes

### Registry Namespace Structure
```
src/ouroboros/resolver_registry.clj  ; Storage atom + register function
src/ouroboros/history.clj            ; Resolvers + registration
src/ouroboros/knowledge.clj          ; Resolvers + registration
src/ouroboros/api.clj                ; Resolvers + registration
src/ouroboros/query.clj              ; Collects from registry only
```

### Protocol Extraction (Bonus)
When adapters need protocols but shouldn't depend on implementation:
```clojure
;; Extract to ouroboros.chat.protocol
(defprotocol ChatAdapter
  (start! [this handler])
  (send-message! [this chat-id text]))

;; Adapters use protocol namespace only
(ns ouroboros.chat.telegram
  (:require [ouroboros.chat.protocol :as chatp]))
```

Same pattern: protocol namespace has no deps, implementations register themselves.

## Context

- **Applies to**: Pathom resolvers, tool definitions, chat adapters, any plugin architecture
- **Avoid for**: Simple systems (<5 modules), true one-way data flow (no cycles)
- **Related instincts**: protocol-extraction, god-module-refactor, circular-dependency-break
- **See also**: [LEARNING.md#architecture-evolution](LEARNING.md#architecture-evolution)

## Evidence Log

| Date | Scenario | Result | φ Change |
|------|----------|--------|----------|
| 2026-02 | Query god module (16 requires) | 15→3 circular deps | +0.10 |
| 2026-02 | Learning system modularization | 700 LOC→5 modules | +0.05 |
| 2026-02 | WebSocket handler extraction | Applied pattern | +0.02 |
