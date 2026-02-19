---
name: builder-persistence
domain: webux
φ: 0.90
e: persist-builder-data-via-websocket
λ: when.builder-data or when.sync-to-backend
Δ: 0.02
source: learning-md-builder-persistence
evidence: 6
access-count: 0
last-accessed: never
timeframe: long-term
---

# Builder Data Persistence Pipeline

Builder interactions (sticky notes, sections) only exist in frontend Fulcro state. Backend has no knowledge of what users built, so it can't detect completion or trigger analysis.

## λ(e): Action

**End-to-End Data Flow:**
```
User adds sticky note / submits section
  -> Frontend mutation updates Fulcro state
  -> [500ms debounce for sticky-note builders]
  -> ws/save-builder-data!(project-id, session-id, builder-type, data)
  -> WebSocket "builder/save-data" message
  -> Backend handle-save-builder-data!
       -> Persist to memory: :memory/key = builder-session-key
       -> Sends :builder/data-saved confirmation
       -> If builder-complete? AND not already completed:
            -> Mark completed in session
            -> Trigger ECA auto-insight generation
            -> Stream insight tokens to frontend
  -> Frontend receives :builder/data-saved
  -> If builder complete: display insight in wisdom sidebar
```

**Frontend Implementation:**
```clojure
;; Debounced sync for sticky-note builders
(defn save-builder-data-debounced! [project-id builder-type data]
  (js/clearTimeout @save-timeout)
  (reset! save-timeout
          (js/setTimeout
            #(ws/send! {:type "builder/save-data"
                        :project-id project-id
                        :builder-type builder-type
                        :data data})
            500)))  ; 500ms debounce

;; Immediate sync for section submission
(defn save-builder-section! [project-id builder-type section value]
  (ws/send! {:type "builder/save-data"
             :project-id project-id
             :builder-type builder-type
             :section section
             :value value}))
```

**Backend Implementation:**
```clojure
(defn handle-save-builder-data! [ws-id msg]
  (let [{:keys [project-id builder-type data]} msg
        session-key (str project-id "/" builder-type)
        existing (memory/recall session-key)]
    ;; Persist to memory
    (memory/remember! session-key (merge existing data))
    ;; Confirm to frontend
    (send-to! ws-id {:type :builder/data-saved})
    ;; Check completion
    (when (and (builder-complete? builder-type data)
               (not (:completed existing)))
      (mark-builder-completed! session-key)
      (trigger-auto-insight! project-id builder-type data))))
```

## λ(φ): Why

**Why persistence matters:**
1. **Cross-session recovery**: Users can resume work after refresh/disconnect
2. **Completion detection**: Backend knows when to trigger ECA analysis
3. **Multi-user sync**: Foundation for real-time collaboration
4. **Audit trail**: History of builder interactions

**Why debounce sticky notes:**
- Rapid typing would flood WebSocket
- 500ms balances responsiveness with efficiency
- Section submissions are immediate (explicit action)

## λ(λ): When to Apply

**Trigger conditions:**
- Builder needs backend persistence
- Completion detection required
- Auto-insight generation on completion
- Multi-user collaboration planned

**Builder Types & Required Sections:**
```clojure
(def builder-section-counts
  {:empathy-map 6        ; Persona, Think/Feel, Hear, See, Say/Do, Pains, Gains
   :value-proposition 6  ; Product, Customer, Problem, Solution, Value, Differentiation
   :mvp-planning 8       ; Core features, Nice-to-have, etc.
   :lean-canvas 9})      ; Problem, Solution, Key Metrics, etc.
```

**Completion Detection:**
- **Sticky-note builders**: Group by section, count unique non-empty sections
- **Form builders**: Check all required fields present

## λ(Δ): Evolution

- **Validated**: φ += 0.02 (4 builders successfully using pattern)
- **Corrected**: φ -= 0.01 (if debounce too aggressive)

## Implementation Checklist

```clojure
;; 1. Define builder config
(def builder-config
  {:empathy-map
   {:required-sections [:persona :think-feel :hear :see :say-do :pains :gains]
    :debounce? true
    :debounce-ms 500}})

;; 2. Wire mutations to persist
(m/defmutation add-sticky-note [{:keys [section content]}]
  (action [{:keys [state]}]
    (swap! state update-in [...] conj {:content content})
    (schedule-render!)
    ;; Trigger debounced save
    (save-builder-data-debounced! project-id :empathy-map (get-current-data))))

;; 3. Handle backend confirmation
(m/defmutation builder-data-saved [_]
  (action [{:keys [state]}]
    (swap! state assoc-in [... :last-saved] (js/Date.now))))

;; 4. Display auto-insight
(m/defmutation builder-insight-received [{:keys [insight]}]
  (action [{:keys [state]}]
    (swap! state assoc-in [... :insight] insight)
    (schedule-render!)))
```

## Context

- **Applies to**: Empathy Map, Value Prop, MVP, Lean Canvas builders
- **Avoid for**: Transient UI state (selections, scroll position)
- **Related instincts**: webux-eca-boundary, fulcro-render-scheduling, eca-auto-insight
- **See also**: [LEARNING.md#web-ux-platform-patterns](LEARNING.md#web-ux-platform-patterns)

## Evidence Log

| Date | Scenario | Result | φ Change |
|------|----------|--------|----------|
| 2026-02 | Empathy Map persistence | Working end-to-end | +0.08 |
| 2026-02 | Auto-insight on completion | ECA streams to sidebar | +0.05 |
| 2026-02 | Debounce prevents WS flood | 500ms works well | +0.03 |
| 2026-02 | Completion detection | 6/6 sections triggers insight | +0.02 |
