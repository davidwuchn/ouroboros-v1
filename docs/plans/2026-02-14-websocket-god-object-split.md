---
title: "P0: Split WebSocket God Objects"
created: 2026-02-14
status: completed
priority: P0
owner: @psi
---

# Plan: P0 Split WebSocket God Objects

## Problem Statement

The WebSocket files were monolithic "god objects" violating the 400 LOC target:
- `websocket.clj` (backend): ~1400 LOC
- `websocket.cljs` (frontend): ~1700 LOC

This made:
- Code review difficult (too much to comprehend)
- Testing challenging (tight coupling)
- Maintenance risky (changes affect unknown areas)

## Success Criteria

- [x] All WebSocket modules under 400 LOC
- [x] Clear separation of concerns
- [x] Handler-based architecture
- [x] Data-driven dispatch
- [x] All tests passing

## Approach

### Decision: Handler-Based Modularization

Split into focused modules:
- `ws/connections.clj` - Connection atom, broadcast
- `ws/context.clj` - Project context assembly
- `ws/dispatch.clj` - Data-driven message routing
- `ws/stream.clj` - ECA streaming helper
- `ws/handlers/*.clj` - Domain-specific handlers

### Not Taken: Keep as-is with better docs

Rejected because docs don't fix complexity — code needs to be split.

## Implementation Steps

1. [x] Extract connection management (89 LOC)
2. [x] Extract context assembly (156 LOC)
3. [x] Extract dispatch logic (98 LOC)
4. [x] Extract streaming helper (101 LOC)
5. [x] Create handler modules (36-208 LOC each)
6. [x] Update main `websocket.clj` to facade (75 LOC)
7. [x] Verify all tests pass

## Results

### Before
```
websocket.clj          1420 LOC
websocket.cljs         1704 LOC
```

### After
```
ws/connections.clj       89 LOC
ws/context.clj          156 LOC
ws/dispatch.clj          98 LOC
ws/stream.clj           101 LOC
ws/handlers/builder.clj 208 LOC
ws/handlers/analytics.clj 70 LOC
...
websocket.clj            75 LOC (facade)
```

## Solution Documentation

Added to `docs/patterns/`:
- `statechart-patterns.md`
- `pathom-resolver-patterns.md`

## Lessons Learned

1. **Files grow organically** - Regular monitoring needed
2. **Facade pattern works** - Thin re-exports maintain backward compat
3. **Handler registration** - Multimethod dispatch enables extensibility
4. **Test coverage** - Need more tests for new handler modules

## Related

- Pattern: [Statechart Patterns](../patterns/statechart-patterns.md)
- Reviewer: [Clojure Idiom Reviewer](../agents/review/clojure-idiom-reviewer.md)
