# Contributing to Ouroboros

Thank you for your interest in contributing to Ouroboros! This document provides guidelines for participating in the project.

## Code of Conduct

Be respectful, constructive, and collaborative. We're building a tool for human-AI co-evolution — that starts with how we treat each other.

## How to Contribute

### Reporting Issues

1. Check existing issues first
2. Provide clear reproduction steps
3. Include system information (OS, Clojure version, etc.)
4. Use issue templates if available

### Submitting Changes

1. **Fork and branch**: Create a feature branch from `main`
2. **Follow conventions**: See [AGENTS.md](AGENTS.md) for commit message symbols and vocabulary
3. **Test**: Run `bb test` before committing (pre-commit hook will enforce this)
4. **Document**: Update relevant docs/ files if your change introduces new patterns
5. **Small PRs**: Prefer focused changes over large refactoring

### Commit Message Format

Use symbolic prefixes from [AGENTS.md](AGENTS.md):

```
⚒ Feature implementation
◇ Research or exploration
⊘ Debugging or fixes
◈ Documentation or reflection
∿ Creative or experimental
· Atomic, single step
```

Example: `⚒ Add websocket reconnection logic`

### Documentation

- **Code**: Add docstrings for public functions
- **Architecture**: Update [LEARNING.md](LEARNING.md) for patterns discovered
- **Status**: Update [STATE.md](STATE.md) for component changes
- **Plans**: Create docs/plans/ for significant features

### Review Process

1. All PRs require review
2. CI must pass (tests + linting)
3. Address feedback constructively
4. Squash commits if requested

## Development Setup

```bash
# Clone and setup
git clone https://github.com/davidwuchn/ouroboros-v1.git
cd ouroboros-v1

# Install pre-commit hook
bb git:install-hooks

# Start REPL
bb nrepl
```

See [README.md](README.md) for full setup instructions.

## Questions?

- Open a [GitHub Discussion](https://github.com/davidwuchn/ouroboros-v1/discussions)
- Check [AGENTS.md](AGENTS.md) for project vocabulary and conventions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
