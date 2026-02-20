# Task Plan: Learning System Activation

<!--
  φ: This is your roadmap. Working memory on disk.
  WHY: After 50+ tool calls, goals get forgotten. This keeps them fresh.
  WHEN: Create FIRST. Update after each phase.
-->

---

## Goal (e — Purpose)

Activate the learning flywheel UI: complete flywheel phase stepper, wisdom sidebar integration, spaced repetition scheduling, and chat command integration to enable progressive learning from utility → understanding → insight → wisdom.

---

## Current Phase

**Phase:** Phase 5: Testing **Phase:** Phase 4: Chat Command Integration Polish

**Phase:** Phase 3: Spaced Repetition Integration

---

## Phases

<!--
  Break task into 3-7 logical phases.
  Each phase should be completable and testable.
  Update status: pending → in_progress → complete
-->

### Phase 1: Discovery & Assessment (φ)

<!-- τ: Understand before building -->

- [x] Review current learning system implementation (backend + frontend)
- [x] Identify gaps in flywheel UI components
- [x] Document current state of spaced repetition system
- [x] Verify chat command infrastructure readiness
- [x] Document findings in findings.md
- **Status:** `complete`

<!--
  STATUS VALUES:
  - pending: Not started
  - in_progress: Currently working
  - complete: Finished, verified
  - blocked: Cannot proceed (document why)
-->

### Phase 2: Flywheel UI Polish (π) (SKIPPED)

<!-- π: Synthesize findings into structure -->

- [ ] Implement phase stepper component (4 levels: Utility → Understanding → Insight → Wisdom)
- [ ] Integrate wisdom sidebar across all builder pages
- [ ] Connect flywheel progress data to UI
- [ ] Add flywheel indicator to navbar
- [ ] Test flywheel navigation and state transitions
- **Status:** `in_progress`

### Phase 3: Spaced Repetition Integration (Δ) (COMPLETE) (IN PROGRESS)

<!-- Δ: Execute and track changes -->

- [ ] Build review queue UI component
- [ ] Implement review interaction (Remember/Forgot buttons)
- [ ] Add scheduling logic for review intervals (1d, 3d, 1w, 3w)
- [ ] Create review reminders/notifications
- [ ] Test full spaced repetition cycle
- **Status:** `pending` (User skipped)

### Phase 4: Chat Command Integration (∀) (COMPLETE) (IN PROGRESS)

<!-- ∀: Defensive checking -->

- [ ] Implement `/learn <pattern>` command (create learning from context)
- [ ] Implement `/recall <query>` command (search learnings)
- [ ] Implement `/wisdom` command (show current level + due reviews)
- [ ] Implement `/build <type>` command (quick builder navigation)
- [ ] Test all chat commands with user workflows
- **Status:** `pending` (User skipped)

### Phase 5: Testing ### Phase 5: Testing & Polish (μ) Polish (μ) (IN PROGRESS)

<!-- μ: Direct, no fluff -->

- [ ] End-to-end flywheel testing (save → apply → review → level up)
- [ ] UI polish (transitions, animations, accessibility)
- [ ] Documentation updates (README.md, STATE.md)
- [ ] Demo walkthrough preparation
- **Status:** `pending` (User skipped)

---

## Key Questions

<!-- π: Questions to answer during the task -->

1. What backend endpoints exist for flywheel progress and spaced repetition?
2. Are the frontend WebSocket handlers for `:learning/flywheel` and `:learning/due-reviews` wired to UI?
3. What's the current state of chat command parsing infrastructure?
4. How should the phase stepper integrate with existing wisdom sidebar?
5. What's the UX for review interactions (Remember/Forgot)?

---

## Decisions Made

<!-- τ: Record why choices were made -->

| Decision | Rationale | Date |
|----------|-----------|------|
| | | |

---

## Blockers & Risks

<!-- ∀: What could go wrong? -->

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Backend endpoints missing for flywheel/reviews | Medium | Verify in Phase 1, implement if needed |
| Chat command infrastructure incomplete | Medium | Check dispatcher/parser, extend if needed |
| UI state management complexity | Low | Use existing Fulcro state patterns |
| Spaced repetition algorithm edge cases | Low | Follow existing intervals from learning.clj |

---

## Errors Encountered

<!-- ∃: Log all errors to prevent repetition -->

| Error | Attempt | Resolution | Timestamp |
|-------|---------|------------|-----------|
| | | | |

---

## Notes

<!-- Free-form notes, reminders, context -->

- Update phase status as you progress
- Re-read this plan before major decisions
- Log ALL errors — they prevent repetition
- Never repeat a failed action — mutate approach
- Backend is complete (learning.core, learning.review), frontend handlers exist but UI needs wiring

---

## Completion Checklist

<!-- ∀: Verify before finishing -->

- [ ] All phases marked `complete`
- [ ] findings.md contains research
- [ ] progress.md contains session log
- [ ] No orphaned temporary files
- [ ] User delivered working solution
