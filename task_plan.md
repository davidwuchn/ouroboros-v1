# Task Plan: Fix Learning + Embed Integration Gaps

**Goal:** Address critical gaps in learning system with git-embed integration

**Last Updated:** 2026-02-19

## Phase 1: Binary Health & Validation (φ)

### 1.1 Add git-embed Binary Validation
- [ ] Add binary existence check on startup
- [ ] Add installation detection
- [ ] Add graceful fallback when binary missing
- [ ] Add setup instructions

**Files:** `git_embed.clj`, `learning/semantic.clj`

### 1.2 Health Check Improvements
- [ ] Extend health check with version detection
- [ ] Add index existence validation
- [ ] Add disk space check for index

## Phase 2: Auto Index Updates (π)

### 2.1 Git Hook Integration
- [ ] Create post-commit hook template
- [ ] Add hook installation command
- [ ] Auto-update index on commit

### 2.2 File Watcher (Optional)
- [ ] Detect file changes in src/
- [ ] Debounced index updates
- [ ] Background update queue

## Phase 3: Fix Hybrid Search (Δ)

### 3.1 Merge Keyword + Semantic Results
- [ ] Fix keyword result merging
- [ ] Implement proper scoring weighting
- [ ] Add result deduplication

**File:** `learning/semantic.clj:160-199`

## Phase 4: Code Re-linking (τ)

### 4.1 Re-link on Changes
- [ ] Detect stale code links
- [ ] Periodic re-linking job
- [ ] Re-link on learning update

## Current Status

| Phase | Status | Notes |
|-------|--------|-------|
| 1.1 | `complete` | Binary validation added: installed?, ensure-installed!, reset-install-check! |
| 1.2 | `pending` | |
| 2.1 | `pending` | |
| 2.2 | `pending` | Optional |
| 3.1 | `complete` | Fixed hybrid search to properly merge keyword + semantic results |
| 4.1 | `pending` | |

## Errors Encountered

| Error | Attempt | Resolution |
|-------|---------|------------|

<!-- φ: Planning phase -->
<!-- π: Implementation phase -->
<!-- Δ: Testing/verification -->
<!-- τ: Review/reflection -->
