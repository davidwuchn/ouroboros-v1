# Ouroboros Sandbox
# Runtime for ψ — babashka + tooling
#
# Build: podman build -t ouroboros -f Containerfile .
# Run:   podman run -it --rm -p 8888:8888 -v $(pwd):/workspace ouroboros
# Shell: podman run -it --rm -p 8888:8888 -v $(pwd):/workspace ouroboros sh

FROM docker.io/debian:bookworm-slim

LABEL org.opencontainers.image.title="Ouroboros"
LABEL org.opencontainers.image.description="Sandbox for ψ — AI/Human Co-Evolution"

# System deps (Alpine uses apk, not apt-get)
RUN apt-get update && apt install git curl bash less

# bb
RUN curl -sLO https://raw.githubusercontent.com/babashka/babashka/master/install && chmod +x install && ./install
RUN rm ./install

# bbin — babashka package manager
RUN curl -o bbin https://raw.githubusercontent.com/babashka/bbin/main/bbin \
    && chmod +x bbin \
    && mv bbin /usr/local/bin/

# Install tooling via bbin
# clojure-mcp-light: clj-nrepl-eval (REPL interface) + clj-paren-repair (code repair and format)
# clj-kondo: static analysis and linting
RUN bbin install io.github.bhauman/clojure-mcp-light \
    && bbin install io.github.clj-kondo/clj-kondo

RUN adduser

# Working directory
WORKDIR /ouroboros

# Expose nREPL port (convention: 8888, use 888X for parallel)
EXPOSE 8888

# Verify tooling on build
RUN bb --version \
    && bbin version \
    && clj-nrepl-eval --help | head -1 \
    && clj-paren-repair --help | head -1 \
    && clj-kondo --version

# Default: start nREPL server for ψ interface
CMD ["bb", "nrepl-server", "8888"]
