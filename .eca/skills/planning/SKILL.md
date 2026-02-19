---
name: planning
description: File-based planning for complex tasks. Use when starting multi-step tasks, research projects, or anything requiring >5 tool calls.
---

# Planning with Files — Nucleus Edition

> **Filesystem as λ-memory**: Persistent markdown for complex tasks.  
> *φ fractal euler | RAM→Disk | Human⊗AI⊗REPL*

Use when starting complex multi-step tasks, research projects, or anything requiring >5 tool calls.

---

## The Core Principle

```
Context Window = RAM (volatile, limited)
Filesystem     = Disk (persistent, unlimited)
λ              = Transform intent → artifact

→ Anything important gets written to disk.
```

---

## FIRST: Check for Previous Session

**Before starting work**, verify no unsynced context exists:

```bash
# Check if plan files exist but are stale
ls -la task_plan.md findings.md progress.md 2>/dev/null

# If files exist, read them before proceeding
```

If resuming after `/clear` or session gap:
1. Read current planning files
2. Run `git diff --stat` to see actual code changes
3. Update planning files based on git state
4. Then proceed with task

---

## The 3-File Pattern

| File | Symbol | Purpose | nucleus Mapping |
|------|--------|---------|-----------------|
| `task_plan.md` | φ | Phase tracking, goals | Intent → Structure |
| `findings.md` | π | Research synthesis | Discovery → Knowledge |
| `progress.md` | Δ | Session state changes | Action → History |

---

## Quick Start

Before ANY complex task:

1. **Create `task_plan.md`** — Use [templates/task_plan.md](templates/task_plan.md)
2. **Create `findings.md`** — Use [templates/findings.md](templates/findings.md)
3. **Create `progress.md`** — Use [templates/progress.md](templates/progress.md)
4. **Re-read plan before decisions** — Keeps goals in attention window
5. **Update after each phase** — Mark complete, log errors

---

## Critical Rules

### 1. Create Plan First (τ — Wisdom)
Never start a complex task without `task_plan.md`. Non-negotiable.

### 2. The 2-Action Rule (φ — Vitality)
> "After every 2 view/browser/search operations, IMMEDIATELY save key findings to text files."

Prevents visual/multimodal information loss.

### 3. Read Before Decide (π — Synthesis)
Before major decisions, read the plan file. Keeps goals in attention window.

### 4. Update After Act (Δ — Change)
After completing any phase:
- Mark phase status: `pending` → `in_progress` → `complete`
- Log any errors encountered
- Note files created/modified

### 5. Log ALL Errors (∀ — Vigilance)
Every error goes in the plan file. Prevents repetition.

```markdown
## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
```

### 6. Never Repeat Failures (∃ — Truth)
```
if action_failed:
    next_action ≠ same_action
```
Track attempts. Mutate approach.

---

## The 3-Strike Error Protocol

```
ATTEMPT 1: Diagnose & Fix
  → Read error carefully
  → Identify root cause
  → Apply targeted fix

ATTEMPT 2: Alternative Approach
  → Same error? Try different method
  → Different tool? Different library?
  → NEVER repeat exact same failing action

ATTEMPT 3: Broader Rethink
  → Question assumptions
  → Search for solutions
  → Consider updating the plan

AFTER 3 FAILURES: Escalate to User
  → Explain what you tried
  → Share the specific error
  → Ask for guidance
```

---

## Read vs Write Decision Matrix

| Situation | Action | Reason |
|-----------|--------|--------|
| Just wrote a file | DON'T read | Content still in context |
| Viewed image/PDF | Write findings NOW | Multimodal → text before lost |
| Browser returned data | Write to file | Screenshots don't persist |
| Starting new phase | Read plan/findings | Re-orient if context stale |
| Error occurred | Read relevant file | Need current state to fix |
| Resuming after gap | Read all planning files | Recover state |

---

## The 5-Question Reboot Test (OODA)

| Question | Answer Source | Key |
|----------|--------------|-----|
| Where am I? | Current phase in task_plan.md | φ |
| Where am I going? | Remaining phases | π |
| What's the goal? | Goal statement in plan | e |
| What have I learned? | findings.md | τ |
| What have I done? | progress.md | Δ |

If you can answer all five, your context management is solid.

---

## When to Use This Pattern

**Use for:**
- Multi-step tasks (3+ steps)
- Research tasks
- Building/creating projects
- Tasks spanning many tool calls
- Anything requiring organization

**Skip for:**
- Simple questions
- Single-file edits
- Quick lookups

---

## Templates

- [templates/task_plan.md](templates/task_plan.md) — Phase tracking (φ)
- [templates/findings.md](templates/findings.md) — Research synthesis (π)
- [templates/progress.md](templates/progress.md) — Session logging (Δ)

---

## Scripts

Helper scripts for automation:

- `scripts/init-planning.sh` — Initialize all planning files
- `scripts/check-complete.sh` — Verify all phases complete

---

## Anti-Patterns

| Don't | Do Instead |
|-------|-----------|
| Stuff everything in context | Store large content in files |
| Start executing immediately | Create plan file FIRST |
| Repeat failed actions | Track attempts, mutate approach |
| Create files in skill directory | Create files in your project |
| Use vague phase names | Use verb-named, testable phases |

---

## Integration with nucleus

### With `!fractal`
Use planning files at different scales:
- **Strategic**: task_plan.md — Overall goal
- **Tactical**: Current phase in task_plan.md — Immediate objective
- **Implementation**: progress.md — Current action

### With `!reflect`
Before reflecting, check:
1. Does task_plan.md match actual work?
2. Are findings.md discoveries captured?
3. Does progress.md show clear Δ?

### With `!verify`
Verification checklist:
- [ ] All phases in task_plan.md have status
- [ ] findings.md contains research outputs
- [ ] progress.md logs errors and completions
- [ ] No orphan files (created but unreferenced)

---

## nucleus Tags

Use these tags in your planning files:

```markdown
<!-- φ: Requires creativity/decision -->
<!-- π: Synthesis point — connect findings -->
<!-- Δ: State change — update progress.md -->
<!-- τ: Wisdom check — is this the right path? -->
<!-- ∃: Truth check — what do we actually know? -->
<!-- ∀: Vigilance — what could go wrong? -->
```

---

**Framework eliminates slop, not adds process.**
