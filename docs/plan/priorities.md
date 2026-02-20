# Priorities

## Next Actions

### Immediate (This Week)

1. **Architecture Integration** — Wire new systems into actual workflow
   - Component lifecycle for system startup
   - Signal bus for event handling
   - Statechart for ECA execution

2. **Wisdom System Improvements** — Fix critical issues
   - ✅ Template data duplication (643 LOC → 369)
   - ⚒ WS requests: 4 → 2 (batch endpoint implemented, target: 4 → 1)

### ASSESSMENT.md Gaps (Decisions Made)

Based on architectural blueprint analysis:

| Priority | Gap | Effort | Impact |
|----------|-----|--------|--------|
| P0 | **Vector Semantic Memory** - Add embeddings + cosine similarity to memory/search | Medium | 🔴 Critical |
| P0 | **Token Usage Tracking** - Track input/output tokens per LLM call | Low | 🔴 Critical |
| P0 | **Rate Limiting** - Per-tool, per-user rate limits in tool_resolver | Low | 🔴 Critical |
| P1 | **WhatsApp Adapter** - Add WhatsApp Business API support | Medium | 🟡 Medium |
| P1 | **Task Scheduler** - Cron-style recurring agent tasks | Medium | 🟡 Medium |
| P1 | **Agent Swarm** - Multi-agent coordination | High | 🟡 Medium |
| P2 | **Distributed Tracing** - OpenTelemetry integration | Medium | 🟢 Low |
| P2 | **Kubernetes Manifests** - Cloud-native deployment | Medium | 🟢 Low |

### Short-term (This Month)

| Priority | Feature | Effort | Impact |
|----------|---------|--------|--------|
| P0 | Vector Semantic Memory | Medium | 🔴 Critical |
| P0 | Token Usage Tracking | Low | 🔴 Critical |
| P0 | Rate Limiting | Low | 🔴 Critical |
| P1 | Container Isolation | High | 🔴 Critical |
| P1 | Per-Channel Isolation | Medium | 🔴 High |
| P1 | Context Summarization | Medium | 🔴 High |
| P1 | Learning System Activation | Medium | 🔴 High |
| P2 | Prompt-Driven Architecture | Medium | 🟡 Medium |
| P2 | Extension Points | High | 🟡 Medium |

### Completed This Week

| Feature | Status |
|---------|--------|
| Component Lifecycle | ✅ Added |
| Signal Bus | ✅ Added |
| Statechart | ✅ Added |
| Skill Cleanup | ✅ Done |
| **Development Workflow** | ✅ **Complete** |
| - Four Skills Integration | ✅ Dashboard + Chat |
| - Planning Skill | ✅ task_plan.md pattern |
| - Clojure-Expert Skill | ✅ REPL-first workflow |
| - Clojure-Reviewer Skill | ✅ Multi-scale review |
| - Continuous-Learning Skill | ✅ λ-based patterns |
| **Dashboard Improvements** | ✅ UX Enhancement |
| - Interactive Workflow Steps | ✅ Plan → Build → Review → Learn |
| - Quick Actions | ✅ One-click commands |
| - Skills Reference | ✅ Visual skill cards |
| - Pro Tips Section | ✅ Usage examples |
| **AI Chat Integration** | ✅ Auto-skill loading |
| - Context-aware skills | ✅ Based on route |
| - eca/load-skills handler | ✅ Backend support |
| **Learning System Fixes** | ✅ Modular re-exports |
| - git-embed integration | ✅ Fixed function refs |
| - Backward compatibility | ✅ All functions exposed |
| **Wisdom System Improvements** | ✅ **Progress** |
| - wisdom.clj split | ✅ 643 → 369 LOC (-43%) |
| - Batch endpoint | ✅ 3 → 2 WS requests (wisdom/page-data) |

---

## Focus Areas

### 1. Wire New Architecture

```clojure
;; Use component lifecycle
(defcomponent system
  :start (start-all!)
  :stop (stop-all!))

;; Use signal bus
(signal/publish! :tool/execute {:tool :file/read})

;; Use statechart
(sm/transition! :eca-ooda :orient)
```

### 2. Wisdom System

- ✅ Split `wisdom.clj` (643 LOC → 369, templates extracted)
- ⚒ Batch endpoint implemented (3 → 2 WS requests, target: 4 → 1)
- ◐ Connect to learning namespace

### 3. Learning Activation

Implement the Learning Flywheel UI:
- Utility → Understanding → Insight → Wisdom
- Spaced repetition system
- Connect to ECA wisdom pipeline

### 4. ASSESSMENT Gaps (P0)

Start with these critical gaps:

1. **Rate Limiting** — Add to `tool_registry.clj`:
   ```clojure
   (def rate-limits (atom {}))
   (defn check-rate-limit [tool-id user-id] ...)
   ```

2. **Token Tracking** — Add to `metrics.clj`:
   ```clojure
   (def token-usage (atom []))
   (defn record-tokens [provider model input output] ...)
   ```

3. **Vector Semantic Memory** — Extend `memory/search.clj`:
   ```clojure
   (defn semantic-search [query top-k] ...)
   ```
