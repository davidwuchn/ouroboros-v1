# Findings: Learning System Activation

<!--
  π: Research synthesis — your external memory for discoveries.
  WHY: Context is limited. Files are unlimited. Store everything here.
  WHEN: Update after ANY discovery, research, or key insight.
-->

---

## Summary

<!-- π: High-level synthesis of what you found -->

Backend learning system is fully implemented with core, index, search, analytics, review, and semantic modules. Frontend has WebSocket handlers for `:learning/flywheel`, `:learning/due-reviews`, `:learning/review-completed`, and `:learning/review-skipped` messages. Wisdom page has templates, categories, and insights UI components. Gap: Flywheel UI components (phase stepper, wisdom sidebar integration) and chat command parsing/execution not yet wired to handlers.

---

## Key Discoveries

### Discovery 1: Backend Learning System Complete

**What:** Learning system backend is modularized into 11 modules: core, index, search, analytics, review, semantic, empathy_map, value_proposition, mvp_planning, lean_canvas, and cli.

**Why it matters:** Backend foundation is solid. Focus should be on frontend UI integration and chat command wiring.

**Source:** `/src/ouroboros/learning/` directory analysis

```
src/ouroboros/learning/
├── analytics.clj      # User stats, gap detection
├── cli.clj           # CLI commands for learning
├── core.clj          # Core CRUD operations, deduplication
├── empathy_map.clj   # Empathy map-specific patterns
├── index.clj         # Search indexing
├── lean_canvas.clj   # Lean canvas-specific patterns
├── mvp_planning.clj  # MVP-specific patterns
├── review.clj        # Spaced repetition logic
├── search.clj        # Search functionality
└── semantic.clj      # Vector-based semantic search
```

**Key Backend Functions:**
- `save-insight!` - Create learning
- `get-user-history` - Retrieve user learnings
- `recall-by-pattern` - Search by pattern
- `get-user-stats` - Statistics (total, by level, review stats)
- `due-reviews` - Get spaced repetition queue
- `mark-review!` - Mark learning reviewed (update level/interval)
- `find-related` - Find related learnings

---

### Discovery 2: Frontend WebSocket Handlers Exist

**What:** Frontend has complete WebSocket message handlers for learning flywheel and spaced repetition in `ws/handlers/learning.cljs`.

**Why it matters:** No backend changes needed. Focus is on UI components that consume these handlers.

**Source:** `/src/frontend/ouroboros/frontend/ws/handlers/learning.cljs`

```
Handlers implemented:
- :learning/categories (stores categories in app state)
- :wisdom/page-data (batch templates + categories)
- :learning/category-insights (store per-category insights)
- :project/detected (workspace detection)
- :eca/auto-insight-* (auto-insight streaming)
- :learning/flywheel (flywheel progress data)
- :learning/due-reviews (spaced repetition queue)
- :learning/review-completed (remove from queue, update counts)
- :learning/review-skipped (remove from queue)
- :learning/search-results (search response)
```

**App State Structure:**
```clojure
{:learning/categories []
 :learning/total-insights 0
 :learning/flywheel-loading? false
 :learning/total 42
 :learning/by-level {:utility 15 :understanding 12 :insight 10 :wisdom 5}
 :learning/current-level :understanding
 :learning/progress-to-next 0.67
 :learning/suggested-focus "mvp-strategy"
 :learning/recent-insights [...]
 :learning/due-reviews [...]
 :learning/due-count 3
 :learning/review-stats {...}}
```

---

### Discovery 3: Wisdom UI Has Templates, Categories, Insights

**What:** Wisdom page (`wisdom/data.cljs`) has comprehensive UI components for templates, learning categories, insights, and contextual wisdom cards.

**Why it matters:** Most UI infrastructure exists. Need to add phase stepper, flywheel progress visualization, and review queue UI.

**Source:** `/src/frontend/ouroboros/frontend/ui/wisdom/data.cljs`

```
Components available:
- fallback-templates (static template cards)
- fallback-learning-categories-base (5 categories with icons/descriptions)
- default-category-insights (pre-filled insights for instant loading)
- contextual-wisdom-cards (flywheel-specific wisdom by phase)
- bmc-block-config (Lean Canvas block mappings)
- wisdom-state (global state atom)
- template-filters (filter by B2B, B2C, Developer, etc.)
```

**Missing Components:**
1. Flywheel phase stepper (Utility → Understanding → Insight → Wisdom)
2. Flywheel progress visualization (progress bar, level indicator)
3. Review queue UI component (cards with Remember/Forgot buttons)
4. Chat command parser/executor

---

### Discovery 4: Chat Panel Has Command Infrastructure

**What:** Chat panel (`ui/chat_panel.cljs`) has localStorage persistence, conversation management, and keyboard shortcuts. No chat command parsing visible.

**Why it matters:** Need to implement command parser that intercepts `/learn`, `/recall`, `/wisdom`, `/build` commands and routes to backend.

**Source:** `/src/frontend/ouroboros/frontend/ui/chat_panel.cljs` (first 100 lines)

```
Features implemented:
- localStorage persistence (conversations, active ID, sidebar width)
- Resize sidebar
- Multiple conversations (max 20)
- Keyboard shortcuts: Ctrl+/ toggle, Escape close, Ctrl+L clear
- Tabbed sidebar: Chat / Wisdom / Context

Missing:
- Command parser (/learn, /recall, /wisdom, /build)
- Command execution via WebSocket
- Command help/integration
```

---

### Discovery 5: Frontend API Functions Exist But Not Called

**What:** Frontend API has complete functions for flywheel and spaced repetition, but no UI components call them.

**Why it matters:** API is ready. Need to build UI components that call these functions.

**Source:** `/src/frontend/ouroboros/frontend/ws/api.cljs`

```
API functions implemented (not called from UI):
- request-learning-flywheel! - Request flywheel progress
- request-due-reviews! - Request due reviews
- complete-review! - Complete a review with confidence (1-4)
- skip-review! - Skip a review (reschedules with shorter interval)
- search-learnings! - Search learning insights by query
```

**UX Gap:** No flywheel progress UI, no review queue UI, no chat command invocation.

---

## Research Log

<!-- Δ: Chronological record of research activities -->

| Timestamp | Activity | Finding | Location |
|-----------|----------|---------|----------|
| 2026-02-19T10:00 | Read learning system directory | 11 modules, backend complete | `/src/ouroboros/learning/` |
| 2026-02-19T10:05 | Read interface/learning.clj | Lazy-loaded API exposed | `/src/ouroboros/interface/learning.clj` |
| 2026-02-19T10:10 | Read wisdom/data.cljs | UI components exist | `/src/frontend/ouroboros/frontend/ui/wisdom/data.cljs` |
| 2026-02-19T10:15 | Read learning.cljs handlers | All handlers implemented | `/src/frontend/ouroboros/frontend/ws/handlers/learning.cljs` |
| 2026-02-19T10:20 | Read chat_panel.cljs | Command infrastructure missing | `/src/frontend/ouroboros/frontend/ui/chat_panel.cljs` |
| 2026-02-19T10:25 | Grep for flywheel references | Found in multiple files | Frontend codebase |
| 2026-02-19T10:30 | Read backend ws/handlers/learning.clj | All endpoints implemented | `/src/ouroboros/ws/handlers/learning.clj` |
| 2026-02-19T10:35 | Read ws/dispatch.clj | All handlers registered | `/src/ouroboros/ws/dispatch.clj` |
| 2026-02-19T10:40 | Read websocket.clj | Auto-sends :connected, :project/detected | `/src/ouroboros/websocket.clj` |
| 2026-02-19T10:45 | Read frontend ws/api.cljs | API functions exist, not called | `/src/frontend/ouroboros/frontend/ws/api.cljs` |

---

## URLs & References

<!-- π: External resources -->

| URL | Title | Relevance | Accessed |
|-----|-------|-----------|----------|
| | | | |

---

## Code Snippets

<!-- Useful code discovered during research -->

### Snippet 1: Flywheel Handler

**Source:** `/src/frontend/ouroboros/frontend/ws/handlers/learning.cljs`

**Purpose:** Handler for flywheel progress data

```clojure
(defmethod dispatch/handle-message :learning/flywheel
  [{:keys [total by-level current-level progress-to-next suggested-focus recent-insights]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc :learning/total total)
                 (assoc :learning/by-level by-level)
                 (assoc :learning/current-level current-level)
                 (assoc :learning/progress-to-next progress-to-next)
                 (assoc :learning/suggested-focus suggested-focus)
                 (assoc :learning/recent-insights recent-insights)
                 (assoc :learning/flywheel-loading? false))))
    (state/schedule-render!)))
```

### Snippet 2: Due Reviews Handler

**Source:** `/src/frontend/ouroboros/frontend/ws/handlers/learning.cljs`

**Purpose:** Handler for spaced repetition queue

```clojure
(defmethod dispatch/handle-message :learning/due-reviews
  [{:keys [reviews due-count stats]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc :learning/due-reviews reviews)
                 (assoc :learning/due-count due-count)
                 (assoc :learning/review-stats stats)
                 (assoc :learning/due-reviews-loading? false))))
    (state/schedule-render!)))
```

### Snippet 3: Review Completion Handler

**Source:** `/src/frontend/ouroboros/frontend/ws/handlers/learning.cljs`

**Purpose:** Handler for marking review as complete

```clojure
(defmethod dispatch/handle-message :learning/review-completed
  [{:keys [learning-id title level]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (update :learning/due-reviews
                         (fn [reviews]
                           (remove #(= (:learning-id %) learning-id) reviews)))
                 (update :learning/due-count dec))))
    (state/schedule-render!)))
```

---

## Assumptions Validated

<!-- ∃: What we confirmed to be true -->

| Assumption | Validated? | Evidence | Date |
|------------|------------|----------|------|
| Backend learning system complete | ✅ Yes | 11 modules with full CRUD | 2026-02-19 |
| Frontend handlers exist | ✅ Yes | All handlers in learning.cljs | 2026-02-19 |
| Wisdom UI components exist | ✅ Yes | Templates, categories, insights | 2026-02-19 |
| Chat command infrastructure exists | ❌ No | No parser found in chat_panel.cljs | 2026-02-19 |
| Frontend API functions exist | ✅ Yes | request-learning-flywheel, request-due-reviews, etc. | 2026-02-19 |
| API functions called from UI | ❌ No | Grep found zero usages | 2026-02-19 |

---

## Assumptions Invalidated

<!-- ∃: What we learned was wrong -->

| Assumption | Reality | Impact | Date |
|------------|---------|--------|------|
| Need to implement backend endpoints | No, handlers already exist | Focus on UI only | 2026-02-19 |

---

## Open Questions

<!-- Questions still unanswered -->

1. Where should the flywheel phase stepper be placed? (Wisdom page? Navbar? Both?)
2. How should chat commands be parsed? (Regex? Custom parser?)
3. Should review queue be a modal, sidebar, or separate page?
4. What's the UX flow for "Remember" vs "Forgot" in reviews?
5. Should flywheel/due-reviews be auto-requested on WS connect or on-demand?
6. Where should chat command help be displayed? (Welcome message? /help command?)

---

## Related Files

<!-- Links to relevant code, docs, artifacts -->

| File | Relevance | Notes |
|------|-----------|-------|
| `/src/ouroboros/learning/core.clj` | Backend core | CRUD, flywheel thresholds, review intervals |
| `/src/ouroboros/learning/review.clj` | Spaced repetition | Due queue, mark-review! logic |
| `/src/ouroboros/interface/learning.clj` | API layer | Lazy-loaded API for learning operations |
| `/src/frontend/ouroboros/frontend/ws/handlers/learning.cljs` | Frontend handlers | All message handlers implemented |
| `/src/frontend/ouroboros/frontend/ui/wisdom/data.cljs` | Wisdom UI | Templates, categories, insights |
| `/src/frontend/ouroboros/frontend/ui/chat_panel.cljs` | Chat UI | Panel component, no command parser |
| `/src/frontend/ouroboros/frontend/ws/dispatch.cljs` | Dispatcher | Message routing to handlers |

---

## Synthesis Notes

<!-- π: Connect the dots between findings -->

**Backend → Frontend Gap:** Backend is complete, frontend handlers are complete, API functions exist but no UI components call them.

**Phase 2 (Flywheel UI Polish) Focus:**
- Phase stepper component (visual 4-level progress: Utility → Understanding → Insight → Wisdom)
- Wisdom sidebar integration with flywheel data (current-level, progress-to-next, suggested-focus)
- Flywheel indicator in navbar (or wisdom page)
- Call `request-learning-flywheel!` on component mount

**Phase 3 (Spaced Repetition) Focus:**
- Review queue UI component (due-reviews as cards)
- Review interaction buttons (Remember [confidence 1-4], Forgot)
- Call `request-due-reviews!` on component mount
- Send `complete-review!` / `skip-review!` on user action
- Review reminder notification (badge count in navbar)

**Phase 4 (Chat Commands) Focus:**
- Command parser (`/learn`, `/recall`, `/wisdom`, `/build`)
- Command routing to WS handlers
- Help text for commands
- Integrate parser into chat panel message handler

**Design Questions to Resolve:**
1. Flywheel stepper placement (navbar badge vs wisdom page header vs both)
2. Review queue presentation (modal, sidebar tab, separate page)
3. Command format (e.g., `/learn "title" -p "pattern"` vs `/learn title=... pattern=...`)
4. Auto-request strategy (on connect vs on page load vs on-demand)
5. Confidence UI (1-4 scale vs emoji feedback vs swipe gesture)

---

*Last updated: 2026-02-19T10:30*
*φ fractal euler | π synthesis | ∃ truth*
