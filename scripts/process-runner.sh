#!/bin/bash
# Process Runner - Manage long-running processes with tmux for full interactive control
# Works with shell_command because tmux exits immediately after creating session

set -e

VERSION="2.0"
SESSION_PREFIX="proc-"

usage() {
    cat <<EOF
Process Runner v${VERSION} - Manage long-running processes with tmux

Usage: $0 <command> [args...]

Commands:
  start <name> <command>    Start a process in a tmux session
  stop <name>               Stop a tmux session (kills process)
  status <name>             Check if session is running
  attach <name>             Attach to session (interactive)
  detach                    Detach from current session (while attached)
  send <name> <input>       Send input to session
  logs <name> [-f|lines]    View session output
  list                      List all managed sessions
  clean                     Clean up dead sessions
  check                     Verify tmux is installed and working

Examples:
  $0 check                   # Verify tmux installation
  $0 start webserver 'python -m http.server 8081'
  $0 status webserver
  $0 attach webserver        # Interactive control (Ctrl+B, D to detach)
  $0 send webserver 'ls'
  $0 logs webserver -f
  $0 stop webserver

Features:
  - Full interactive control when attached
  - Real-time output viewing
  - Input sending capability  
  - Session persists after detaching
  - Works with shell_command (exits quickly)
  - Requires tmux (run '$0 check' to verify)
EOF
}

# Helper functions
error() {
    echo "Error: $@" >&2
    exit 1
}

info() {
    echo "$@" >&2
}

get_session_name() {
    local name="$1"
    echo "${SESSION_PREFIX}${name}"
}

session_exists() {
    local session_name="$1"
    tmux has-session -t "$session_name" 2>/dev/null
}

ensure_tmux() {
    if ! command -v tmux >/dev/null 2>&1; then
        cat <<EOF >&2
Error: tmux is not installed.

This script requires tmux for process management. Install tmux for your system:

  macOS:            brew install tmux
  Ubuntu/Debian:    sudo apt-get install tmux
  Fedora/RHEL:      sudo dnf install tmux
  Arch Linux:       sudo pacman -S tmux
  OpenSUSE:         sudo zypper install tmux
  Alpine Linux:     sudo apk add tmux
  Windows (WSL):    sudo apt-get install tmux  # in Ubuntu WSL

Or download from: https://github.com/tmux/tmux

Once installed, verify with: tmux -V
EOF
        exit 1
    fi
    
    # Verify tmux works (not just in PATH)
    if ! tmux -V >/dev/null 2>&1; then
        error "tmux found but not working. Check installation."
    fi
}

# Command implementations
cmd_start() {
    local name="$1"
    local command="$2"
    
    if [ -z "$name" ] || [ -z "$command" ]; then
        error "Usage: $0 start <name> <command>"
    fi
    
    ensure_tmux
    
    local session_name=$(get_session_name "$name")
    
    if session_exists "$session_name"; then
        error "Session '$name' already exists. Use '$0 stop $name' first."
    fi
    
    info "Starting process '$name' in tmux session..."
    info "Command: $command"
    
    # Create detached tmux session with the command
    # Use bash -c to ensure proper signal handling and shell features
    if ! tmux new-session -s "$session_name" -d "bash -c '$command'; exec bash"; then
        error "Failed to create tmux session"
    fi
    
    # Wait a moment for session to initialize
    sleep 0.5
    
    if session_exists "$session_name"; then
        echo "Process '$name' started in tmux session: $session_name"
        echo ""
        echo "To interact:"
        echo "  $0 attach $name      # Attach interactively (Ctrl+B, D to detach)"
        echo "  $0 send $name 'ls'   # Send command to session"
        echo "  $0 logs $name -f     # Follow output"
        echo "  $0 stop $name        # Stop the session"
    else
        error "Failed to start session (session disappeared)"
    fi
}

cmd_stop() {
    local name="$1"
    
    if [ -z "$name" ]; then
        error "Usage: $0 stop <name>"
    fi
    
    ensure_tmux
    
    local session_name=$(get_session_name "$name")
    
    if ! session_exists "$session_name"; then
        info "Session '$name' not found"
        return 0
    fi
    
    info "Stopping session '$name'..."
    
    # Kill the session (sends SIGHUP to processes in the session)
    tmux kill-session -t "$session_name"
    
    # Verify it's gone
    sleep 0.5
    if session_exists "$session_name"; then
        error "Failed to stop session '$name'"
    else
        echo "Session '$name' stopped"
    fi
}

cmd_status() {
    local name="$1"
    
    if [ -z "$name" ]; then
        error "Usage: $0 status <name>"
    fi
    
    ensure_tmux
    
    local session_name=$(get_session_name "$name")
    
    if session_exists "$session_name"; then
        echo "Session '$name': RUNNING"
        echo "Session name: $session_name"
        
        # Try to get some info about the session
        if tmux list-panes -t "$session_name" >/dev/null 2>&1; then
            local window_count=$(tmux list-windows -t "$session_name" | wc -l)
            echo "Windows: $window_count"
            
            # Show first few lines of output if available
            echo ""
            echo "Recent output (last 5 lines):"
            tmux capture-pane -t "$session_name" -p 2>/dev/null | tail -5 | sed 's/^/  /' || echo "  (no output captured)"
        fi
    else
        echo "Session '$name': STOPPED"
    fi
}

cmd_attach() {
    local name="$1"
    
    if [ -z "$name" ]; then
        error "Usage: $0 attach <name>"
    fi
    
    ensure_tmux
    
    local session_name=$(get_session_name "$name")
    
    if ! session_exists "$session_name"; then
        error "Session '$name' not found"
    fi
    
    echo "Attaching to session '$name' (Press Ctrl+B, D to detach)..."
    tmux attach-session -t "$session_name"
}

cmd_detach() {
    # This only works if we're inside a tmux session
    if [ -n "$TMUX" ]; then
        tmux detach-client
        echo "Detached from session"
    else
        error "Not inside a tmux session"
    fi
}

cmd_send() {
    local name="$1"
    local input="${*:2}"
    
    if [ -z "$name" ] || [ -z "$input" ]; then
        error "Usage: $0 send <name> <input>"
    fi
    
    ensure_tmux
    
    local session_name=$(get_session_name "$name")
    
    if ! session_exists "$session_name"; then
        error "Session '$name' not found"
    fi
    
    # Send input followed by Enter
    tmux send-keys -t "$session_name" "$input" Enter
    
    echo "Sent to '$name': $input"
}

cmd_logs() {
    local name="$1"
    local follow="${2:-}"
    
    if [ -z "$name" ]; then
        error "Usage: $0 logs <name> [-f|lines]"
    fi
    
    ensure_tmux
    
    local session_name=$(get_session_name "$name")
    
    if ! session_exists "$session_name"; then
        error "Session '$name' not found"
    fi
    
    if [ "$follow" = "-f" ]; then
        # Follow output (attach in a limited way)
        echo "Following output from '$name' (Ctrl+C to stop)..."
        # Use capture-pane with follow mode
        tmux capture-pane -t "$session_name" -p -S -1000 2>/dev/null | tail -f 2>/dev/null || {
            # Fallback: attach in read-only mode if available
            tmux attach -t "$session_name" 2>&1 | grep -v "lost server" || true
        }
    else
        # Show specific number of lines (default 50)
        local lines="${2:-50}"
        tmux capture-pane -t "$session_name" -p 2>/dev/null | tail -n "$lines"
    fi
}

cmd_list() {
    ensure_tmux
    
    echo "Managed tmux sessions (prefix: $SESSION_PREFIX):"
    echo ""
    
    local sessions=$(tmux list-sessions 2>/dev/null | grep "^$SESSION_PREFIX" || true)
    
    if [ -z "$sessions" ]; then
        echo "  No managed sessions found"
        return 0
    fi
    
    local count=0
    while IFS= read -r session_line; do
        count=$((count + 1))
        local session_name=$(echo "$session_line" | cut -d: -f1)
        local clean_name="${session_name#$SESSION_PREFIX}"
        
        echo "  $clean_name:"
        echo "    Session: $session_name"
        
        # Extract window info if available
        local window_info=$(echo "$session_line" | sed 's/^[^:]*: //')
        echo "    Status: $window_info"
        
        # Show if any panes are active
        if tmux list-panes -t "$session_name" >/dev/null 2>&1; then
            local pane_count=$(tmux list-panes -t "$session_name" | wc -l)
            echo "    Panes: $pane_count"
        fi
        
        echo ""
    done <<< "$sessions"
    
    echo "Total: $count session(s)"
}

cmd_clean() {
    ensure_tmux
    
    info "Cleaning up dead sessions..."
    
    local sessions=$(tmux list-sessions 2>/dev/null | grep "^$SESSION_PREFIX" || true)
    local cleaned=0
    
    while IFS= read -r session_line; do
        local session_name=$(echo "$session_line" | cut -d: -f1)
        
        # Check if session is actually responsive
        if ! tmux list-panes -t "$session_name" >/dev/null 2>&1; then
            info "  Removing dead session: $session_name"
            tmux kill-session -t "$session_name" 2>/dev/null || true
            cleaned=$((cleaned + 1))
        fi
    done <<< "$sessions"
    
    echo "Cleaned up $cleaned dead session(s)"
}

cmd_check() {
    echo "Checking tmux installation..."
    
    # Check if tmux is in PATH
    if command -v tmux >/dev/null 2>&1; then
        echo "✓ tmux found in PATH"
    else
        echo "✗ tmux NOT found in PATH"
        echo ""
        echo "Install tmux for your system:"
        echo "  macOS:            brew install tmux"
        echo "  Ubuntu/Debian:    sudo apt-get install tmux"
        echo "  Fedora/RHEL:      sudo dnf install tmux"
        echo "  Arch Linux:       sudo pacman -S tmux"
        echo "  OpenSUSE:         sudo zypper install tmux"
        echo "  Alpine Linux:     sudo apk add tmux"
        echo "  Windows (WSL):    sudo apt-get install tmux"
        echo ""
        echo "Or download from: https://github.com/tmux/tmux"
        return 1
    fi
    
    # Check version
    local version=$(tmux -V 2>/dev/null || echo "unknown")
    echo "✓ tmux version: $version"
    
    # Check if tmux server can be started
    if tmux start-server 2>/dev/null; then
        echo "✓ tmux server can be started"
    else
        echo "✗ tmux server failed to start"
        return 1
    fi
    
    # Test basic functionality
    local test_session="test-$$"
    if tmux new-session -s "$test_session" -d "sleep 0.1" 2>/dev/null; then
        echo "✓ tmux can create sessions"
        tmux kill-session -t "$test_session" 2>/dev/null || true
    else
        echo "✗ tmux cannot create sessions"
        # Don't kill server as it might be in use by other processes
        return 1
    fi
    
    # Clean up test server if we started it (but be careful not to kill existing server)
    # tmux kill-server 2>/dev/null || true
    
    echo ""
    echo "✅ tmux is properly installed and working!"
    echo "   Process Runner is ready to use."
    return 0
}

# Main command dispatch
main() {
    local command="${1:-help}"
    
    case "$command" in
        start)
            shift
            cmd_start "$@"
            ;;
        stop)
            shift
            cmd_stop "$@"
            ;;
        status)
            shift
            cmd_status "$@"
            ;;
        attach)
            shift
            cmd_attach "$@"
            ;;
        detach)
            cmd_detach
            ;;
        send)
            shift
            cmd_send "$@"
            ;;
        logs)
            shift
            cmd_logs "$@"
            ;;
        list)
            cmd_list
            ;;
        clean)
            cmd_clean
            ;;
        check)
            cmd_check
            ;;
        help|--help|-h)
            usage
            ;;
        *)
            if [ -z "$command" ]; then
                usage
            else
                error "Unknown command: $command"
            fi
            ;;
    esac
}

# Run main
ensure_tmux
main "$@"