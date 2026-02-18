# Task Plan: Learning System Gaps Implementation

## Goal

Implement all 7 identified gaps in the learning system:
1. λ-based pattern learning (symbolic pattern detection)
2. Symbolic instinct tracking (behavioral commitment)
3. Proactive learning capture (telemetry hooks)
4. Planning integration (planning files → learnings)
5. Transfer tracking mechanism (teaching capture)
6. Active gap notifications
7. Review system integration (Leitner triggers)

## Phases

### Phase 1: Instinct Tracking System
- [x] Add instinct-level field to learning core
- [x] Add threshold configuration
- [x] Add helper to compute instinct level
- [x] Update analytics to expose instinct stats
- [x] Update interface exports

### Phase 2: Review System Integration
- [x] Find/correct review.clj reference
- [x] Add get-due-reviews function
- [x] Wire up Leitner system to triggers
- [x] Add review notification data

### Phase 3: Proactive Capture Hooks
- [x] Add telemetry hook for learning suggestions
- [x] Add error-pattern capture
- [x] Add session-end learning prompt

### Phase 4: Planning Integration
- [x] Add capture-planning-insight function
- [x] Link task_plan.md / findings.md / progress.md learnings
- [x] Add phase-completion capture

### Phase 5: Transfer/Teaching Mechanism
- [x] Add transfer recording
- [x] Update wisdom level to use real transfer count

### Phase 6: Active Gap Notifications
- [x] Add gap notification to stats
- [x] Add recommended actions

### Phase 7: Documentation & Testing
- [x] Update LEARNING.md with new patterns
- [x] Run tests to verify no breakage

## Success Criteria

- [x] All 7 gaps addressed
- [x] Tests pass (existing + new)
- [x] No circular dependencies introduced
- [x] Documentation updated

## Symbol Key

- φ: Phase requiring creativity/decision
- π: Synthesis point
- Δ: State change - update progress.md
- τ: Wisdom check - is this the right path?
- ∃: Truth check - what do we actually know?
- ∀: Vigilance - what could go wrong?
