# Runtime Installation

Required tools for Ouroboros development. Install in order.

## 1. Babashka (bb)

Babashka is the Clojure runtime substrate. Required.

| OS      | Install Command                                                                                                 |
| ------- | --------------------------------------------------------------------------------------------------------------- |
| macOS   | `brew install borkdude/brew/babashka`                                                                           |
| Linux   | `curl -sLO https://raw.githubusercontent.com/babashka/babashka/master/install && chmod +x install && ./install` |
| Windows | `scoop bucket add scoop-clojure https://github.com/littleli/scoop-clojure && scoop install babashka`            |

**Verify:** `bb --version`

Alternative install methods: https://github.com/babashka/babashka#installation

## 2. bbin

bbin is a package manager for Babashka scripts and tools.

| OS  | Install Command                                                                                                                                      |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| All | `mkdir -p ~/.local/bin && curl -o- -L https://raw.githubusercontent.com/babashka/bbin/v0.2.4/bbin > ~/.local/bin/bbin && chmod +x ~/.local/bin/bbin` |

**Verify:** `bbin --version`

Alternative install methods: https://github.com/babashka/bbin#installation

## 3. Clojure MCP Light Tools

These provide REPL evaluation and code repair capabilities for the AI.

```bash
bbin install io.github.bhauman/clojure-mcp-light
```

**Verify:**

- `clj-nrepl-eval --help` — evaluates Clojure in running nREPL
- `clj-paren-repair --help` — fixes delimiter errors in Clojure files

Source: https://github.com/bhauman/clojure-mcp-light

## 4. clj-kondo (optional but recommended)

Static analysis and linting for Clojure. Catches errors before evaluation.

```bash
bbin install https://github.com/clj-kondo/clj-kondo.git
```

**Verify:** `clj-kondo --version`

Source: https://github.com/clj-kondo/clj-kondo

---

## Verification Checklist

Run each command. All should succeed before starting development.

```bash
bb --version           # Babashka runtime
bbin --version         # Package manager
clj-nrepl-eval --help  # REPL evaluation tool
clj-paren-repair --help # Code repair tool
clj-kondo --version    # Linter (optional)
```

✓ All tools installed → return to AGENTS.md, proceed to First Step.

---

## Manual Installation

If you prefer to manage installations yourself:

| Tool              | Purpose                                          | Source                                       |
| ----------------- | ------------------------------------------------ | -------------------------------------------- |
| bb                | Clojure runtime (substrate)                      | https://babashka.org                         |
| bbin              | Package manager for bb tools                     | https://github.com/babashka/bbin             |
| clojure-mcp-light | AI REPL tools (clj-nrepl-eval, clj-paren-repair) | https://github.com/bhauman/clojure-mcp-light |

All tools must be functional before development begins.

---

**See Also:** [README](README.md) · [AGENTS](AGENTS.md)
