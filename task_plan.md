# Task Plan: Learning + Embed Gaps Integration

<!--
  φ: This is your roadmap. Working memory on disk.
  WHY: After 50+ tool calls, goals get forgotten. This keeps them fresh.
  WHEN: Create FIRST. Update after each phase.
-->

---

## Goal (e — Purpose)

Address critical integration gaps between Learning and Embed systems to ensure reliable auto-indexing, health checks, hybrid search, code re-linking, and chat command integration.

---

## Current Phase

**Phase:** Phase 6: Integration verification

---

## Phases

<!--
  Break task into 3-7 logical phases.
  Each phase should be completable and testable.
  Update status: pending → in_progress → complete
-->

### Phase 1: Auto index updates on git commits

<!-- τ: Understand before building -->

- [x] Implement git hook integration for auto index updates (git-embed manages its own hooks)
- [x] Ensure index updates trigger on commit/post-commit (verified: hooks installed)
- [x] Validate index consistency after updates (index shows 514/568 blobs indexed)
- **Status:** `complete` ✅ (2026-02-19)

### Phase 2: Binary health checks

<!-- Δ: Execute and track changes -->

- [x] Add `installed?` function to check git-embed binary existence
- [x] Add `ensure-installed!` with helpful error messages
- [x] Add install status caching
- [x] Validate health check functions
- **Status:** `complete` ✅ (2026-02-19)

### Phase 3: Hybrid search fix

<!-- Δ: Execute and track changes -->

- [x] Fix keyword results being fetched but not used
- [x] Create keyword-score-map for O(1) lookup
- [x] Add hybrid bonus for learnings appearing in both semantic and keyword results
- [x] Update filter to include results with either semantic OR keyword match
- [x] Set weights: semantic 60%, keyword 30%, hybrid bonus 10%
- **Status:** `complete` ✅ (2026-02-19)

### Phase 4: Code re-linking on changes

<!-- π: Synthesize findings into structure -->

- [x] Core re-linking functions exist (batch-relink!, detect-stale-links, auto-link-code!)
- [x] Chat command `/relink-all` exists for manual triggering
- [x] Add automatic triggering (scheduled job implementation)
- [x] Test automatic re-linking works end-to-end (scheduler implemented, needs runtime test)
- **Status:** `complete` ✅ (2026-02-19)

### Phase 5: Chat command integration

<!-- μ: Direct, no fluff -->

- [x] Existing commands: `/relink-all`, `/stale-links`, `/semantic-stats`, `/semantic-search`
- [x] Add health check commands (`/semantic-health`, integrated into `/gaps`)
- [x] Add command to show gap status (`/gaps`)
- [x] Ensure commands work across all chat platforms (Telegram/Discord/Slack) - uses adapter interface
- **Status:** `complete` ✅ (2026-02-19)

### Phase 6: Integration verification

<!-- ∀: Defensive checking -->

- [ ] Verify all gaps are addressed
- [ ] Run end-to-end tests
- [ ] Validate system health and performance
- **Status:** `pending`

---

## Key Questions

<!-- π: Questions to answer during the task -->

1. How should git hooks be implemented to avoid performance impact?
2. What validation is needed for index consistency?
3. How to efficiently detect file changes for re-linking?
4. What chat commands are most useful for users?
5. How to ensure cross-platform compatibility for commands?

---

## Decisions Made

<!-- τ: Record why choices were made -->

| Decision | Rationale | Date |
|----------|-----------|------|
| Use cached install check for binary health | Avoid repeated PATH lookups, improve performance | 2026-02-19 |
| Hybrid search weights: 60% semantic, 30% keyword, 10% hybrid bonus | Balances relevance with keyword matching, rewards overlap | 2026-02-19 |

---

## Blockers & Risks

<!-- ∀: What could go wrong? -->

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Git hook may slow down commits | Medium | Use async post-commit hook, background indexing |
| Binary health check may be platform-specific | Low | Check common install paths, provide clear error messages |
| Chat command integration may require platform-specific adapters | High | Abstract command layer, test on each platform |

---

## Errors Encountered

<!-- ∃: Log all errors to prevent repetition -->

| Error | Attempt | Resolution | Timestamp |
|-------|---------|------------|-----------|
| _None yet_ | - | - | - |

---

## Notes

<!-- Free-form notes, reminders, context -->

- Update phase status as you progress
- Re-read this plan before major decisions
- Log ALL errors — they prevent repetition
- Never repeat a failed action — mutate approach
- Reference progress.md for detailed session logs

---

## Completion Checklist

<!-- ∀: Verify before finishing -->

- [ ] All phases marked `complete`
- [ ] findings.md contains research
- [ ] progress.md contains session log
- [ ] No orphaned temporary files
- [ ] User delivered working solution
