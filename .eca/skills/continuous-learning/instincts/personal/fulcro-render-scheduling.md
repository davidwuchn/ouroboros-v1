---
name: fulcro-render-scheduling
domain: frontend
φ: 0.90
e: call-schedule-render-after-swap
λ: when.websocket-handler or when.fulcro-state-mutation
Δ: 0.02
source: learning-md-pattern-24
evidence: 8
access-count: 0
last-accessed: never
timeframe: long-term
---

# Fulcro Render Scheduling for WebSocket State Mutations

WebSocket message handlers that mutate Fulcro's state atom via `swap!` don't trigger re-renders. Chat messages appear only after the *next* user action triggers a render.

## λ(e): Action

**The Problem:**
```clojure
;; WRONG - Direct swap! doesn't trigger re-render
(m/defmutation add-telemetry-event [{:keys [event]}]
  (action [{:keys [state]}]
    (swap! state update-in [:telemetry/events] conj event)))
;; ^ State updated, but UI doesn't refresh until next interaction
```

**The Fix:**
```clojure
;; websocket.cljs - store render callback in defonce atom
(defonce render-callback (atom nil))

(defn set-render-callback! [cb]
  (reset! render-callback cb))

(defn schedule-render! []
  (when-let [cb @render-callback]
    (cb)))

;; app.cljs - set callback during init
(set-render-callback! #(app/schedule-render! APP))

;; Every WS handler that mutates state must call:
(m/defmutation add-telemetry-event [{:keys [event]}]
  (action [{:keys [state]}]
    (swap! state update-in [:telemetry/events] conj event)
    (schedule-render!)))  ;; <- CRITICAL
```

**Hot Reload Caveat:**
```clojure
;; client.cljs - refresh hook must re-set callback
(defn ^:dev/after-load refresh []
  (ws/set-render-callback! #(app/schedule-render! APP))
  (app/mount! APP Root "app"))
```

## λ(φ): Why

**Root Cause:** Fulcro doesn't `add-watch` its state atom. It only re-renders after:
- `comp/transact!`
- `app/schedule-render!`

Direct `swap!` on the state atom changes data but Fulcro doesn't know to re-render.

**This is the #1 gotcha when integrating real-time data with Fulcro.** Any code path that bypasses Fulcro's transaction system (WebSocket handlers, external events, direct `swap!`) must explicitly schedule renders.

## λ(λ): When to Apply

**Trigger conditions:**
- WebSocket message handlers
- External event callbacks (timers, browser APIs)
- Real-time data updates
- Any `swap!` on Fulcro's state atom outside of `transact!`

**Applies to:**
- Telemetry event handlers
- Chat message streaming
- ECA wisdom token streaming
- Builder persistence updates
- Presence/cursor updates

**Does NOT apply to:**
- Mutations called via `comp/transact!` (already schedules render)
- Component local state (`set-state!`)
- UI event handlers (already in render cycle)

## λ(Δ): Evolution

- **Validated**: φ += 0.02 (fixed in 8+ handlers across codebase)
- **Corrected**: φ -= 0.01 (if schedule-render called unnecessarily)

## Implementation Checklist

When adding WebSocket-driven UI updates:

```clojure
;; 1. Add render callback registration
(defonce render-callback (atom nil))
(defn set-render-callback! [cb] (reset! render-callback cb))
(defn schedule-render! [] (when-let [cb @render-callback] (cb)))

;; 2. Wire in app init
(set-render-callback! #(app/schedule-render! APP))

;; 3. Wire in refresh hook
(defn ^:dev/after-load refresh []
  (ws/set-render-callback! #(app/schedule-render! APP))
  ...)

;; 4. Add to every WS mutation
(m/defmutation handle-ws-data [{:keys [data]}]
  (action [{:keys [state]}]
    (swap! state ... data ...)  ;; Update state
    (schedule-render!))))        ;; ALWAYS schedule render
```

## Context

- **Applies to**: Fulcro + WebSocket integrations, real-time UI updates
- **Avoid for**: Standard transact! mutations, synchronous updates
- **Related instincts**: websocket-handler-pattern, eca-streaming-pipeline
- **See also**: [LEARNING.md#clojurescriptfulcro-frontend](LEARNING.md#clojurescriptfulcro-frontend)

## Evidence Log

| Date | Scenario | Result | φ Change |
|------|----------|--------|----------|
| 2026-02 | Chat messages not appearing | Fixed with schedule-render! | +0.10 |
| 2026-02 | Telemetry events delayed | Fixed in telemetry.cljs | +0.05 |
| 2026-02 | ECA wisdom streaming | Progressive render working | +0.05 |
| 2026-02 | Hot reload broke callbacks | Added refresh hook fix | +0.03 |
