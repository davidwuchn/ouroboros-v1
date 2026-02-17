# Ouroboros Concepts

> Clear definitions of core concepts to prevent confusion.

---

## Flywheels (Two Different Concepts)

### 1. Product Development Flywheel 🎯

**What:** A 4-phase methodology for building products, implemented as interactive visual builders.

**Phases:**
1. **Empathy Map** — Understand your users (Think/Feel, Hear, See, Say/Do, Pains, Gains)
2. **Value Proposition** — Define your offering (Features, Benefits, Differentiators)
3. **MVP** — Plan your minimum viable product (Scope, Timeline, Resources)
4. **Lean Canvas** — Model your business (Problem, Solution, Metrics, etc.)

**Where Used:**
- Dashboard project page
- Builder canvases (Empathy Map, Value Prop, MVP, Lean Canvas)
- Kanban board (derived from builder progress)
- Flywheel step indicator UI

**Key Property:** Each phase feeds into the next. Completing Empathy unlocks Value Prop, etc.

**See Also:** `docs/learning-flywheel-design.md` (different concept!)

---

### 2. Learning Flywheel 🧠

**What:** A chat interaction pattern that transforms Ouroboros from **utility assistant** to **wisdom partner**.

**Levels (Progressive Disclosure):**
1. **Utility** — The direct answer ("Fix this error by...")
2. **Understanding** — The "why" ("This error occurs because...")
3. **Insight** — Pattern recognition ("You've seen this before in...")
4. **Wisdom** — Transferable knowledge ("Apply this pattern to...")

**Where Used:**
- Chat sidebar (ECA integration)
- `/learn`, `/recall`, `/wisdom` commands
- Educational tool approvals
- Wisdom sidebar in builders

**Key Property:** Users control depth. Start with utility, offer deeper understanding on demand.

**See:** `docs/learning-flywheel-design.md` for full specification.

---

### 3. λ(system) Self-Evolution (Internal Flywheel) ⚙️

**What:** The system's ability to improve itself through observation and adaptation.

**Components:**
- **λ(self)** — Code/skill evolution (reviews → rules)
- **λ(memory)** — Knowledge evolution (access tracking → promotion/indexing)
- **λ(system).maintain** — Automated maintenance checklists

**Where Used:**
- Telemetry events (`:review/*`, `:memory/*`, `:tool/*`)
- `bb lambda:cron` scheduled tasks
- LEARNING.md pattern updates

---

## Workflows (Process Patterns)

### 1. Development Workflow

**What:** Local development process management.

**Tools:**
- `bb dev` — Full stack (backend + frontend)
- `bb dev:backend` — Backend only
- `bb dev:frontend` — Frontend only
- `bb dashboard` — Dashboard server

**Implementation:** `ouroboros.process-runner` (tmux-based)

---

### 2. Tool Approval Workflow

**What:** Security process for dangerous operations.

**Flow:**
```
ECA requests tool → Ouroboros → Chat platform → User approves → ECA continues
```

**Tools Requiring Approval:**
- `file/write` — Data loss risk
- `shell/exec` — System compromise risk
- `memory/clear` — Data destruction risk

**Implementation:** `ouroboros.eca-approval-bridge`

---

### 3. Message Workflow (WebSocket)

**What:** Real-time communication flow for chat and collaboration.

**Flow:**
```
Client → WebSocket → Handler dispatch → Response → Client
```

**Handlers:**
- `chat/message` — Chat messages
- `builder/update` — Builder data sync
- `cursor/update` — Collaboration cursors
- `eca/wisdom` — Wisdom requests

**Implementation:** `ouroboros.ws.handlers.*`

---

## Quick Reference

| Term | Type | Purpose | Location |
|------|------|---------|----------|
| **Product Dev Flywheel** | 4-phase methodology | Guide product development | Web UX builders |
| **Learning Flywheel** | 4-level interaction | Build wisdom over time | Chat/ECA |
| **λ(system)** | Self-evolution | System improvement | Telemetry, cron |
| **Dev Workflow** | Process | Local development | `bb dev` tasks |
| **Approval Workflow** | Security | Dangerous ops safety | Chat platforms |
| **Message Workflow** | Communication | Real-time messaging | WebSocket handlers |

---

## Anti-Patterns to Avoid

1. **"The Flywheel"** — Always specify which flywheel (Product Dev vs Learning)
2. **"Phase" without context** — "Phase 2" could mean Value Prop or Understanding level
3. **"Workflow" alone** — Clarify: dev workflow, approval workflow, or message workflow

---

*See also: AGENTS.md (system bootstrap), PLAN.md (roadmap), STATE.md (current status)*
