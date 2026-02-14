# Ouroboros Documentation

This directory contains the institutional knowledge base for Ouroboros, structured following Compound Engineering patterns.

## Quick Start

**Planning work?** → See [`plans/TEMPLATE.md`](plans/TEMPLATE.md)

**Reviewing code?** → See [`agents/`](agents/) for specialized reviewers

**Solved a problem?** → Document it in [`solutions/`](solutions/)

**Looking for patterns?** → Check [`patterns/`](patterns/)

## Directory Structure

```
docs/
├── agents/              # AI reviewer agents (prompt-driven)
│   ├── review/          # Code quality, idioms, style
│   ├── security/        # Security vulnerability detection
│   └── architecture/    # Statecharts, resolvers, design patterns
├── plans/               # Feature implementation plans
├── solutions/           # Solved problems (institutional memory)
└── patterns/            # Reusable architectural patterns
```

## Workflow

### 1. Plan (`docs/plans/`)

Before coding, create a plan:

```bash
# Copy template
cp docs/plans/TEMPLATE.md docs/plans/2026-02-14-my-feature.md

# Fill in: problem, approach, success criteria, steps
```

### 2. Work (code)

Implement following the plan. Update plan with discoveries.

### 3. Review (`docs/agents/`)

Use specialized agents for review:

```markdown
Review with: docs/agents/review/clojure-idiom-reviewer.md
Focus areas:
- Simplicity over cleverness
- State management
- Testing signals
```

### 4. Capture (`docs/solutions/`)

After fixing non-trivial problems:

```bash
# Document the solution
cp docs/solutions/TEMPLATE.md docs/solutions/websocket-reconnection-timeouts.md

# Include: symptom, root cause, solution, prevention
```

### 5. Evolve (`docs/patterns/`)

When solutions reveal reusable patterns, extract them:

```markdown
Pattern: Handler Registry
From: Multiple handler implementations
Usage: WebSocket dispatch, tool registry, resolver registry
```

## Contributing

- **Agents:** Add new reviewers in `agents/{category}/`
- **Plans:** Create before significant work
- **Solutions:** Document after fixing tricky bugs
- **Patterns:** Extract from 3+ similar solutions

See top-level `AGENTS.md` for project-wide conventions.
