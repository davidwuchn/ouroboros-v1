---
name: webux-eca-boundary
domain: architecture
φ: 0.85
e: separate-state-from-wisdom
λ: when.ui-component or when.builder or when.dynamic-content
Δ: 0.03
source: learning-md-pattern-23
evidence: 8
access-count: 1
last-accessed: now
timeframe: project
---

# WebUX = State/CRUD, ECA = Knowledge/Wisdom

Separate concerns: WebUX handles state and interaction; ECA provides dynamic content and guidance. Never hardcode wisdom content in UI components.

## λ(e): Action

**Anti-pattern: Static wisdom in `def` blocks**
```clojure
;; BAD - static, can't adapt to project context
(def wisdom-tips
  {:empathy [{:title "Start with Why" :text "Understanding..."}
             {:title "Observe First" :text "Watch how..."}]})
```

**Pattern: Dynamic wisdom via ECA pipeline**
```clojure
;; GOOD - wisdom from ECA/LLM with project context
(defn request-wisdom! [project-id phase]
  (let [context (assemble-project-context project-id)]
    (ws/send! {:type "eca/wisdom"
               :project-id project-id
               :phase phase
               :context context})))

;; Backend streams ECA-generated tips back
;; Frontend renders progressively with Fulcro scheduling
```

## λ(φ): Why

**Why static wisdom is wrong:**
1. Same tips for every user regardless of progress
2. No learning or adaptation over time  
3. Duplicates knowledge ECA/LLM already has
4. Requires code changes to update content

**Why the boundary matters:**
- **WebUX**: Fast, reliable, handles interaction state (drag/drop, forms, presence)
- **ECA**: Intelligent, contextual, generates insights from project data
- **Separation**: Each layer optimized for its strength

**Reference implementation:** Chat sidebar pipeline (`chat_panel.cljs` + `websocket.clj`):
1. Frontend sends context + request via WebSocket
2. Backend assembles project context, sends to ECA
3. ECA streams response tokens back
4. Frontend renders progressively with Fulcro render scheduling

## λ(λ): When to Apply

**Trigger conditions:**
- Adding tips, templates, or guidance to UI
- Creating "wisdom" components (sidebar, suggestions, insights)
- Building product development flywheel UI
- Content could benefit from project context

**Replace static `def` content when:**
- Content describes best practices (can be LLM-generated)
- Content should adapt to user progress
- Same content appears across multiple builders/phases
- Content is longer than 3 lines

**Keep static when:**
- UX structure (button labels, section headers)
- Purely presentational (color names, layout descriptions)
- Needs instant load (initial skeleton state)

## λ(Δ): Evolution

- **Validated**: φ += 0.03 (wisdom sidebar, flywheel, tips all ECA-powered)
- **Corrected**: φ -= 0.02 (if over-applied to simple static UI text)

## Implementation Pattern

**End-to-end data flow:**
```
Browser (wisdom sidebar opens)
  -> ws/request-wisdom! sends {type: "eca/wisdom", project-id, phase}
  -> Backend assembles project context (empathy entries, value prop, canvas)
  -> Backend builds system prompt + wisdom instruction
  -> ECA/LLM generates wisdom
  -> Tokens stream via WebSocket
  -> Frontend accumulates in Fulcro state
  -> Fulcro re-renders progressively
  -> If ECA unavailable: static fallback shown
```

**Key design decisions:**
1. Reuse chat pipeline (same callbacks, same streaming)
2. Context enrichment (project data → system prompt)
3. Static fallback (graceful degradation)
4. Phase keyword mapping (backend `:empathy-map` → frontend `:empathy`)

## Static Content Inventory (Migrated)

| File | What | Migrated To |
|------|------|-------------|
| `components.cljs` | `wisdom-tips` def | ECA streaming |
| `wisdom.cljs` | `templates` def | ECA streaming |
| `wisdom.cljs` | `learning-categories` def | ECA streaming |
| `project_detail.cljs` | `flywheel-phases` def | ECA streaming |
| `chat_panel.cljs` | `context-suggestions` def | ECA streaming |

## Context

- **Applies to**: Product development flywheel, builder UIs, wisdom components, contextual help
- **Avoid for**: Pure UI chrome (labels, buttons), performance-critical paths
- **Related instincts**: eca-streaming-pipeline, fulcro-render-scheduling, project-context-assembly
- **See also**: [LEARNING.md#web-ux-platform-patterns](LEARNING.md#web-ux-platform-patterns)

## Evidence Log

| Date | Scenario | Result | φ Change |
|------|----------|--------|----------|
| 2026-02 | Wisdom sidebar | ECA-powered tips | +0.10 |
| 2026-02 | Flywheel progress | Dynamic from backend | +0.05 |
| 2026-02 | Quick Tips page | ECA streaming complete | +0.05 |
| 2026-02 | Chat suggestions | Context-aware from ECA | +0.03 |
