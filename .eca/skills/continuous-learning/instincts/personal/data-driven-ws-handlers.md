---
name: data-driven-ws-handlers
domain: architecture
φ: 0.85
e: use-dispatch-map-not-case-statement
λ: when.websocket-god-module or when.handler-dispatch
Δ: 0.03
source: learning-md-pattern-32
evidence: 5
access-count: 0
last-accessed: never
timeframe: long-term
---

# Data-Driven WebSocket Handler Dispatch

`websocket.clj` (1420 LOC) and `websocket.cljs` (1704 LOC) are god objects. Every new feature adds more handlers via `case` statements, making files harder to navigate, review, and test.

## λ(e): Action

**Before: case statement (scales linearly)**
```clojure
(defn handle-message [ws-id msg]
  (case (:type msg)
    :chat/message (handle-chat ws-id msg)
    :telemetry/event (handle-telemetry ws-id msg)
    :builder/save-data (handle-builder ws-id msg)
    :eca/wisdom (handle-wisdom ws-id msg)
    ;; Every new handler adds a branch here
    (log/warn "Unknown message type" (:type msg))))
```

**After: dispatch map (scales modularly)**
```clojure
;; In websocket.clj - thin dispatcher
(def handlers
  {:chat/message handlers.chat/handle-message
   :telemetry/event handlers.telemetry/handle-event
   :builder/save-data handlers.builder/handle-save-data
   :eca/wisdom handlers.wisdom/handle-request})

(defn handle-message [ws-id msg]
  (if-let [handler (get handlers (:type msg))]
    (handler ws-id msg)
    (log/warn "Unknown message type" (:type msg))))

;; In ws/handlers/builder.clj - isolated module
(ns ouroboros.ws.handlers.builder)

(defn handle-save-data [ws-id msg]
  ;; Builder-specific logic here
  )
```

## λ(φ): Why

**Problems with case statements:**
- File grows linearly with features (1400+ LOC)
- Merge conflicts on every new handler
- Hard to test (need to test entire websocket ns)
- No clear ownership (everyone edits same file)

**Benefits of dispatch maps:**
- Modular: each handler in own file
- Testable: test handlers in isolation
- Discoverable: all handlers listed in one place
- Extensible: add new handler without touching core

## λ(λ): When to Apply

**Trigger conditions:**
- `websocket.clj` or `websocket.cljs` > 400 LOC
- Adding handler requires editing core file
- Merge conflicts on handler additions
- Hard to find where message types are handled

**Implementation path:**
1. Create `ws/handlers/` directory
2. Extract each handler to own namespace
3. Register in dispatch map
4. Remove case statement branches
5. Keep only core connection management in main file

## λ(Δ): Evolution

- **Validated**: φ += 0.03 (pattern proven in resolver-registry)
- **Corrected**: φ -= 0.02 (if over-extracted to 1-handler-per-file)

## Target Structure

```
src/ouroboros/websocket.clj           ; Connection management only (~200 LOC)
src/ouroboros/ws/handlers/
├── chat.clj                          ; Chat message handlers
├── telemetry.clj                     ; Telemetry event handlers
├── builder.clj                       ; Builder persistence handlers
├── wisdom.clj                        ; ECA wisdom handlers
└── analytics.clj                     ; Analytics data handlers
```

## Context

- **Applies to**: websocket.clj, websocket.cljs, any dispatch-heavy module
- **Avoid for**: Simple dispatch (< 5 handlers), truly cohesive logic
- **Related instincts**: resolver-registry-pattern, god-module-refactor
- **See also**: [LEARNING.md#patterns](LEARNING.md#patterns)

## Evidence Log

| Date | Scenario | Result | φ Change |
|------|----------|--------|----------|
| 2026-02 | websocket.cljs at 1700 LOC | Plan extraction | +0.05 |
| 2026-02 | Resolver registry success | Proven pattern | +0.03 |
| 2025-02 | Query god module fix | Applied same pattern | +0.02 |
