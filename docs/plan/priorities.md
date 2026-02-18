# Priorities

## Next Actions

### Immediate (This Week)

1. **Architecture Integration** — Wire new systems into actual workflow
   - Component lifecycle for system startup
   - Signal bus for event handling
   - Statechart for ECA execution

2. **Wisdom System Improvements** — Fix critical issues
   - Template data duplication (643 LOC → <200)
   - WS requests: 4 → 1 batch endpoint

### Short-term (This Month)

| Priority | Feature | Effort | Impact |
|----------|---------|--------|--------|
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

- Split `wisdom.clj` (643 LOC → modules)
- Single batch endpoint for page load
- Connect to learning namespace

### 3. Learning Activation

Implement the Learning Flywheel UI:
- Utility → Understanding → Insight → Wisdom
- Spaced repetition system
- Connect to ECA wisdom pipeline
