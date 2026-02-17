# Documentation Index

> Navigate Ouroboros documentation.

---

## Core Documentation

| File | Purpose |
|------|---------|
| [README.md](/README.md) | Project overview, quick start, capabilities |
| [AGENTS.md](/AGENTS.md) | System bootstrap for AI assistants (essential hints, vocabulary) |
| [STATE.md](/STATE.md) | Current system status (what is true now) |
| [PLAN.md](/PLAN.md) | Future roadmap and architecture decisions |
| [LEARNING.md](/LEARNING.md) | Patterns discovered, eternal truths |
| [CHANGELOG.md](/CHANGELOG.md) | Commit history |

---

## Concept Guides

| File | Purpose |
|------|---------|
| [CONCEPTS.md](./CONCEPTS.md) | **Clear definitions** of flywheels, workflows (prevents confusion) |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Quick lookup for common tasks |
| [README.md](./README.md) | Documentation overview |

---

## Design Specifications

| File | Purpose |
|------|---------|
| [learning-flywheel-design.md](./learning-flywheel-design.md) | Chat interaction design (utility→wisdom) |
| [lambda-system-evolve.md](./lambda-system-evolve.md) | Self-evolution system design |
| [lambda-system-metrics.md](./lambda-system-metrics.md) | λ(system) metrics specification |
| [tool-resolver-convergence.md](./tool-resolver-convergence.md) | Tool/Resolver unification |

---

## Agent Reviewers

Located in `agents/` — prompt-driven reviewers for code quality.

| Directory | Purpose |
|-----------|---------|
| `agents/review/` | Code review agents (idioms, style, god objects) |
| `agents/security/` | Security-focused reviewers |
| `agents/architecture/` | Architecture pattern reviewers |

---

## Implementation Plans

Located in `plans/` — per-feature planning documents.

| File | Purpose |
|------|---------|
| [TEMPLATE.md](./plans/TEMPLATE.md) | Standard plan format |
| [2026-02-14-websocket-god-object-split.md](./plans/2026-02-14-websocket-god-object-split.md) | WebSocket refactoring plan |

---

## Solutions

Located in `solutions/` — institutional knowledge base.

| File | Purpose |
|------|---------|
| [TEMPLATE.md](./solutions/TEMPLATE.md) | Solution capture format |
| [eca-integration-debugging.md](./solutions/eca-integration-debugging.md) | ECA troubleshooting |

---

## Patterns

Located in `patterns/` — reusable architectural patterns.

| File | Purpose |
|------|---------|
| [statechart-patterns.md](./patterns/statechart-patterns.md) | Statechart best practices |
| [pathom-resolver-patterns.md](./patterns/pathom-resolver-patterns.md) | Pathom/EQL patterns |

---

## Key Distinctions

### Two Different "Flywheels"

1. **Product Development Flywheel** (4 phases)
   - Empathy Map → Value Proposition → MVP → Lean Canvas
   - Used in: Web UX builders, dashboard
   - See: [CONCEPTS.md](./CONCEPTS.md)

2. **Learning Flywheel** (4 levels)
   - Utility → Understanding → Insight → Wisdom
   - Used in: Chat/ECA interactions
   - See: [learning-flywheel-design.md](./learning-flywheel-design.md)

### "Workflow" Meanings

- **Development workflow** — Local dev process (`bb dev`)
- **Tool approval workflow** — Security approval flow
- **Message workflow** — WebSocket message handling

See [CONCEPTS.md](./CONCEPTS.md) for full definitions.
