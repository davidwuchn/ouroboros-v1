# PLAN.md

> Project roadmap and future directions for Ouroboros.
> **Last Updated:** 2026-02-19

---

## Quick Links

| Document | Contents |
| ---------- | ---------- |
| [Current Status](docs/plan/current-status.md) | Feature table, recent changes |
| [Priorities](docs/plan/priorities.md) | Next actions, focus areas |
| [Architecture](docs/plan/architecture.md) | New systems, usage examples |
| [Roadmap](docs/plan/roadmap.md) | Long-term vision, phases |

---

## Summary

### ✅ Complete

- ECA Integration (Protocol client, Tool approval, Streaming)
- Web UX Platform (5 phases)
- λ(system) Self-Evolution (Telemetry, Maintenance)
- **New Architecture:**
  - Component Lifecycle (9 system components)
  - Signal Bus (event-driven)
  - Statechart (OODA execution)
  - Statecharts Registry (5 registered)
  - Dual Persistence (Datalevin + Git)
- **Development Workflow v0.2:**
  - Four Skills System (planning, clojure-expert, clojure-reviewer, continuous-learning)
  - Dashboard UX (Interactive workflow, Quick actions, Skills reference)
  - AI Chat Integration (Auto-load skills based on context)
  - Git Tag 0.2 Released

### 📋 This Month

1. **Wire new architecture** into actual workflow
2. **Wisdom System** - ✅ Split wisdom.clj (643→369), ✅ Batch endpoint (4→1 WS requests)
3. **Learning Activation** - Flywheel UI, spaced repetition
4. **Learning + Embed Gaps** - Address critical integration issues:
   - Auto index updates on git commits
   - ✅ Binary health checks
   - ✅ Hybrid search fix
   - 🔄 Code re-linking on changes (functions exist, needs auto-triggering)
   - 🔄 Chat command integration (partial: /relink-all, /stale-links exist)

### 🔮 Future

- Container Isolation
- Per-Channel Isolation
- Context Summarization

---

## Key Metrics

| Metric | Current | Target |
| -------- | --------- | -------- |
| wisdom.clj LOC | 369 | <200 |
| WS requests | 1 | 1 ✅ |
| Static insights | 100% | <30% |

---

## Recent Changes

| Date | Change |
| ------ | -------- |
| 2026-02-19 | **Batch WebSocket endpoint** - wisdom/page-data reduces WS requests 3→2 |
| 2026-02-19 | **Tag 0.2** - Development Workflow with Four Skills released |
| 2026-02-19 | Dashboard UX improvements - Interactive workflow, quick actions |
| 2026-02-19 | AI Chat auto-skill loading based on context |
| 2026-02-19 | Learning system modular re-exports, git-embed fixes |
| 2026-02-18 | Datalevin upgrade 0.6.14 → 0.10.5 |
| 2026-02-16 | Added component, signal, statechart systems |
| 2026-02-16 | Split PLAN.md into docs/plan/ |
| 2026-02-16 | Removed auto-rules (unused) |

---

## How to Use

1. **Check priorities** → `docs/plan/priorities.md`
2. **Find features** → `docs/plan/current-status.md`
3. **Use new systems** → `docs/plan/architecture.md`
4. **Plan ahead** → `docs/plan/roadmap.md`

---

*The Ouroboros grows by consuming its own tail.*
