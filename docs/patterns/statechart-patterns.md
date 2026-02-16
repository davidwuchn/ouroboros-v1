---
title: "Statechart Patterns in Ouroboros"
category: architecture
date: 2026-02-14
---

# Statechart Patterns

## Engine State Machine

```
:uninitialized
    ↓ :initialize
:initializing
    ↓ :initialized  
:running ←——————┐
    ↓ :stop      │
:stopped         │
    ↑ :restart ——┘
```

## Pattern: Lifecycle Hooks

Use entry/exit actions for resource management:

```clojure
:entry (fn [env]
         ;; Initialize resources
         (tool-registry/init!)
         (telemetry/init!))

:exit (fn [env]
        ;; Cleanup resources
        (telemetry/shutdown!))
```

## Pattern: Error State Recovery

Always have an error state with transitions back to safe states:

```clojure
:error {:transitions {:retry {:target :initializing
                              :guard (fn [env] (retryable? env))}
                      :abort {:target :stopped}}}
```

## Pattern: Guard Functions

Keep guards pure and fast:

```clojure
;; ✅ GOOD - pure function, no side effects
:guard (fn [env] 
         (= (:state env) :ready))

;; 🔴 BAD - side effects in guard
:guard (fn [env]
         (db/check-status!)  ; Don't do this
         true)
```

## Anti-Patterns

1. **Deep nesting** - More than 3 levels of hierarchy
2. **Event spaghetti** - States with >5 outgoing transitions
3. **Silent failures** - No error state defined
4. **State explosion** - Using states for data variations

## Testing Statecharts

```clojure
(deftest test-engine-lifecycle
  (engine/boot!)
  (is (= #{:running :system} (engine/current-state)))
  
  (engine/stop!)
  (is (= #{:stopped :system} (engine/current-state))))
```

## Related Documentation

- [Statechart Reviewer](../agents/architecture/statechart-reviewer.md)
- [WebSocket God Object Split](../plans/2026-02-14-websocket-god-object-split.md)
