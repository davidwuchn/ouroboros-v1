#!/bin/bash
# Process Manager v2 - Simple and robust
# Manages long-running processes with full control

set -e

VERSION="2.0"
DEFAULT_BASE_DIR="/tmp/process-manager"

usage() {
    cat <<EOF
Process Manager v${VERSION} - Manage long-running processes with full control

Usage: $0 <command> [args...]

Commands:
  start <command> <name> [base_dir]  Start a new managed process
  stop <name>                        Stop a running process  
  restart <name>                     Restart a process
  status <name>                      Check process status
  logs <name> [-f | lines]           View process logs
  send <name> <input>                Send input to process
  read <name> [-f]                   Read output from process
  control <name> <command>           Send control command (STOP, RESTART, STATUS)
  list                               List all managed processes
  cleanup                            Remove all stopped process files

Examples:
  $0 start 'python -m http.server 8080' web-server
  $0 status web-server
  $0 logs web-server -f
  $0 send web-server 'GET / HTTP/1.0\\n\\n'
  $0 control web-server STOP
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

get_process_paths() {
    local name="$1"
    local base_dir="${2:-$DEFAULT_BASE_DIR}"
    
    # Ensure base_dir exists
    mkdir -p "$base_dir"
    
    # Return as string to be eval'd
    cat <<EOF
BASE_DIR="$base_dir"
NAME="$name"
PID_FILE="$base_dir/$name.pid"
LOG_FILE="$base_dir/$name.log"
CTRL_PIPE="$base_dir/$name.ctrl"
STATUS_FILE="$base_dir/$name.status"
STDIN_PIPE="$base_dir/$name.stdin"
STDOUT_PIPE="$base_dir/$name.stdout"
EOF
}

is_process_running() {
    local pid_file="$1"
    
    if [ ! -f "$pid_file" ]; then
        return 1
    fi
    
    local pid=$(cat "$pid_file" 2>/dev/null)
    if [ -z "$pid" ]; then
        return 1
    fi
    
    if kill -0 "$pid" 2>/dev/null; then
        return 0
    else
        # Clean up stale PID file
        rm -f "$pid_file"
        return 1
    fi
}

ensure_pipes() {
    local ctrl_pipe="$1"
    local stdin_pipe="$2"
    local stdout_pipe="$3"
    
    # Remove existing pipes if they exist
    rm -f "$ctrl_pipe" "$stdin_pipe" "$stdout_pipe"
    
    # Create new pipes
    mkfifo "$ctrl_pipe" 2>/dev/null || error "Cannot create control pipe: $ctrl_pipe"
    mkfifo "$stdin_pipe" 2>/dev/null || error "Cannot create stdin pipe: $stdin_pipe"
    mkfifo "$stdout_pipe" 2>/dev/null || error "Cannot create stdout pipe: $stdout_pipe"
}

cleanup_pipes() {
    local ctrl_pipe="$1"
    local stdin_pipe="$2" 
    local stdout_pipe="$3"
    
    rm -f "$ctrl_pipe" "$stdin_pipe" "$stdout_pipe" 2>/dev/null || true
}

# Command implementations
cmd_start() {
    local command="$1"
    local name="$2"
    local base_dir="${3:-$DEFAULT_BASE_DIR}"
    
    if [ -z "$command" ] || [ -z "$name" ]; then
        error "Usage: $0 start <command> <name> [base_dir]"
    fi
    
    # Get process paths
    eval $(get_process_paths "$name" "$base_dir")
    
    # Check if already running
    if is_process_running "$PID_FILE"; then
        local pid=$(cat "$PID_FILE")
        error "Process '$name' is already running (PID: $pid)"
    fi
    
    info "Starting process: $name"
    info "Command: $command"
    info "Base directory: $BASE_DIR"
    
    # Create pipes
    ensure_pipes "$CTRL_PIPE" "$STDIN_PIPE" "$STDOUT_PIPE"
    
    # Initialize status
    echo "STARTING" > "$STATUS_FILE"
    
    # Start the manager in background
    (
        # Trap for cleanup
        trap 'echo "STOPPED" > "$STATUS_FILE"; cleanup_pipes "$CTRL_PIPE" "$STDIN_PIPE" "$STDOUT_PIPE"' EXIT
        
        # Log startup
        {
            echo "=== Process started at $(date) ==="
            echo "Command: $command"
            echo "PID: $$"
            echo "================================="
        } >> "$LOG_FILE"
        
        # Control handler
        control_handler() {
            while read -r cmd < "$CTRL_PIPE"; do
                case "$cmd" in
                    STOP)
                        echo "[CONTROL] Received STOP command" >> "$LOG_FILE"
                        kill -TERM $MAIN_PID 2>/dev/null || true
                        return
                        ;;
                    RESTART)
                        echo "[CONTROL] Received RESTART command" >> "$LOG_FILE"
                        kill -TERM $MAIN_PID 2>/dev/null || true
                        # Exit with special code to signal restart
                        exit 42
                        ;;
                    STATUS)
                        echo "[CONTROL] Status request - running (PID: $MAIN_PID)" >> "$LOG_FILE"
                        ;;
                    *)
                        echo "[CONTROL] Unknown command: $cmd" >> "$LOG_FILE"
                        ;;
                esac
            done
        }
        
        # Start control handler
        control_handler &
        CTRL_PID=$!
        
        # Main command execution
        (
            # Read from stdin pipe and feed to command
            cat "$STDIN_PIPE" | \
            bash -c "$command" 2>&1 | \
            tee -a "$LOG_FILE" "$STDOUT_PIPE"
        ) &
        MAIN_PID=$!
        
        # Save PID
        echo $MAIN_PID > "$PID_FILE"
        echo "RUNNING" > "$STATUS_FILE"
        echo "=== Process '$name' running (PID: $MAIN_PID) ===" >> "$LOG_FILE"
        
        # Wait for main process
        wait $MAIN_PID
        MAIN_EXIT=$?
        
        # Kill control handler
        kill $CTRL_PID 2>/dev/null || true
        
        echo "=== Process exited with code $MAIN_EXIT at $(date) ===" >> "$LOG_FILE"
        echo $MAIN_EXIT > "$STATUS_FILE.exit"
        
        # Exit with restart code if needed
        exit $MAIN_EXIT
    ) &
    
    MANAGER_PID=$!
    echo $MANAGER_PID > "$PID_FILE.manager"
    
    # Wait a moment for process to start
    sleep 0.5
    
    if is_process_running "$PID_FILE"; then
        local pid=$(cat "$PID_FILE")
        echo "Process '$name' started successfully"
        echo "  PID: $pid"
        echo "  Log file: $LOG_FILE"
        echo "  Control pipe: $CTRL_PIPE"
        echo "  Stdin pipe: $STDIN_PIPE (for sending input)"
        echo "  Stdout pipe: $STDOUT_PIPE (for reading output)"
    else
        error "Failed to start process '$name'"
    fi
}

cmd_stop() {
    local name="$1"
    local base_dir="${2:-$DEFAULT_BASE_DIR}"
    
    if [ -z "$name" ]; then
        error "Usage: $0 stop <name> [base_dir]"
    fi
    
    eval $(get_process_paths "$name" "$base_dir")
    
    if ! is_process_running "$PID_FILE"; then
        info "Process '$name' is not running"
        # Clean up any leftover pipes
        cleanup_pipes "$CTRL_PIPE" "$STDIN_PIPE" "$STDOUT_PIPE"
        return 0
    fi
    
    local pid=$(cat "$PID_FILE")
    info "Stopping process '$name' (PID: $pid)..."
    
    # Try graceful stop via control pipe
    if [ -p "$CTRL_PIPE" ]; then
        echo "STOP" > "$CTRL_PIPE" 2>/dev/null || true
    fi
    
    # Wait for graceful stop
    for i in {1..10}; do
        if ! is_process_running "$PID_FILE"; then
            info "Process '$name' stopped gracefully"
            cleanup_pipes "$CTRL_PIPE" "$STDIN_PIPE" "$STDOUT_PIPE"
            return 0
        fi
        sleep 1
    done
    
    # Force kill if still running
    if is_process_running "$PID_FILE"; then
        kill -KILL "$pid" 2>/dev/null || true
        info "Force killed process '$name' (PID: $pid)"
        cleanup_pipes "$CTRL_PIPE" "$STDIN_PIPE" "$STDOUT_PIPE"
    fi
    
    return 0
}

cmd_restart() {
    local name="$1"
    local base_dir="${2:-$DEFAULT_BASE_DIR}"
    
    if [ -z "$name" ]; then
        error "Usage: $0 restart <name> [base_dir]"
    fi
    
    eval $(get_process_paths "$name" "$base_dir")
    
    # We need the original command to restart
    if [ ! -f "$LOG_FILE" ]; then
        error "Cannot restart '$name': no log file found (process never started?)"
    fi
    
    # Extract command from log file
    local command=$(grep "^Command: " "$LOG_FILE" | head -1 | cut -d: -f2- | sed 's/^ //')
    
    if [ -z "$command" ]; then
        error "Cannot restart '$name': original command not found in logs"
    fi
    
    cmd_stop "$name" "$base_dir"
    sleep 1
    cmd_start "$command" "$name" "$base_dir"
}

cmd_status() {
    local name="$1"
    local base_dir="${2:-$DEFAULT_BASE_DIR}"
    
    if [ -z "$name" ]; then
        error "Usage: $0 status <name> [base_dir]"
    fi
    
    eval $(get_process_paths "$name" "$base_dir")
    
    if is_process_running "$PID_FILE"; then
        local pid=$(cat "$PID_FILE")
        local status=$(cat "$STATUS_FILE" 2>/dev/null || echo "UNKNOWN")
        echo "Process: $name"
        echo "  Status: RUNNING"
        echo "  PID: $pid"
        echo "  State: $status"
        echo "  Log file: $LOG_FILE"
        echo "  Control interface:"
        echo "    Send command: echo 'COMMAND' > $CTRL_PIPE"
        echo "    Send input: echo 'input' > $STDIN_PIPE"
        echo "    Read output: cat $STDOUT_PIPE"
        return 0
    else
        echo "Process: $name"
        echo "  Status: STOPPED"
        if [ -f "$STATUS_FILE.exit" ]; then
            local exit_code=$(cat "$STATUS_FILE.exit")
            echo "  Exit code: $exit_code"
        fi
        return 1
    fi
}

cmd_logs() {
    local name="$1"
    local base_dir="${2:-$DEFAULT_BASE_DIR}"
    shift 2
    
    if [ -z "$name" ]; then
        error "Usage: $0 logs <name> [base_dir] [-f | lines]"
    fi
    
    eval $(get_process_paths "$name" "$base_dir")
    
    if [ ! -f "$LOG_FILE" ]; then
        error "No log file found for '$name'"
    fi
    
    if [ "$1" = "-f" ]; then
        # Follow logs
        tail -f "$LOG_FILE"
    else
        # Show last N lines (default 50)
        local lines="${1:-50}"
        tail -n "$lines" "$LOG_FILE"
    fi
}

cmd_send() {
    local name="$1"
    local base_dir="${2:-$DEFAULT_BASE_DIR}"
    shift 2
    
    if [ -z "$name" ] || [ $# -eq 0 ]; then
        error "Usage: $0 send <name> [base_dir] <input>"
    fi
    
    eval $(get_process_paths "$name" "$base_dir")
    
    if ! is_process_running "$PID_FILE"; then
        error "Process '$name' is not running"
    fi
    
    if [ ! -p "$STDIN_PIPE" ]; then
        error "Stdin pipe not found: $STDIN_PIPE"
    fi
    
    # Send input to stdin pipe
    echo "$@" > "$STDIN_PIPE"
    echo "Sent to '$name': $@"
}

cmd_read() {
    local name="$1"
    local base_dir="${2:-$DEFAULT_BASE_DIR}"
    shift 2
    
    if [ -z "$name" ]; then
        error "Usage: $0 read <name> [base_dir] [-f]"
    fi
    
    eval $(get_process_paths "$name" "$base_dir")
    
    if ! is_process_running "$PID_FILE"; then
        error "Process '$name' is not running"
    fi
    
    if [ ! -p "$STDOUT_PIPE" ]; then
        error "Stdout pipe not found: $STDOUT_PIPE"
    fi
    
    if [ "$1" = "-f" ]; then
        # Follow output
        cat "$STDOUT_PIPE"
    else
        # Read available output (non-blocking)
        timeout 0.1 cat "$STDOUT_PIPE" 2>/dev/null || true
    fi
}

cmd_control() {
    local name="$1"
    local base_dir="${2:-$DEFAULT_BASE_DIR}"
    shift 2
    
    if [ -z "$name" ] || [ $# -eq 0 ]; then
        error "Usage: $0 control <name> [base_dir] <command>"
    fi
    
    eval $(get_process_paths "$name" "$base_dir")
    
    if ! is_process_running "$PID_FILE"; then
        error "Process '$name' is not running"
    fi
    
    if [ ! -p "$CTRL_PIPE" ]; then
        error "Control pipe not found: $CTRL_PIPE"
    fi
    
    echo "$@" > "$CTRL_PIPE"
    echo "Sent control command to '$name': $@"
}

cmd_list() {
    local base_dir="${1:-$DEFAULT_BASE_DIR}"
    
    if [ ! -d "$base_dir" ]; then
        info "No processes directory found: $base_dir"
        return 0
    fi
    
    echo "Managed processes in $base_dir:"
    echo ""
    
    local found=0
    
    for pid_file in "$base_dir"/*.pid; do
        [ -f "$pid_file" ] || continue
        
        local name=$(basename "$pid_file" .pid)
        # Skip manager pid files
        if [[ "$name" == *.manager ]]; then
            continue
        fi
        
        found=1
        
        if is_process_running "$pid_file"; then
            local pid=$(cat "$pid_file")
            local status=$(cat "$base_dir/$name.status" 2>/dev/null || echo "UNKNOWN")
            echo "  $name:"
            echo "    Status: RUNNING"
            echo "    PID: $pid"
            echo "    State: $status"
        else
            echo "  $name:"
            echo "    Status: STOPPED"
            if [ -f "$base_dir/$name.status.exit" ]; then
                local exit_code=$(cat "$base_dir/$name.status.exit")
                echo "    Exit code: $exit_code"
            fi
        fi
        echo ""
    done
    
    if [ $found -eq 0 ]; then
        echo "  No processes found"
    fi
}

cmd_cleanup() {
    local base_dir="${1:-$DEFAULT_BASE_DIR}"
    
    if [ ! -d "$base_dir" ]; then
        info "No processes directory found: $base_dir"
        return 0
    fi
    
    info "Cleaning up stopped processes in $base_dir..."
    
    local removed=0
    for pid_file in "$base_dir"/*.pid; do
        [ -f "$pid_file" ] || continue
        
        local name=$(basename "$pid_file" .pid)
        # Skip manager pid files
        if [[ "$name" == *.manager ]]; then
            continue
        fi
        
        if ! is_process_running "$pid_file"; then
            info "Removing stopped process: $name"
            rm -f "$base_dir/$name.pid" \
                  "$base_dir/$name.pid.manager" \
                  "$base_dir/$name.log" \
                  "$base_dir/$name.status" \
                  "$base_dir/$name.status.exit" \
                  "$base_dir/$name.ctrl" \
                  "$base_dir/$name.stdin" \
                  "$base_dir/$name.stdout" 2>/dev/null || true
            removed=$((removed + 1))
        fi
    done
    
    info "Cleaned up $removed stopped processes"
}

# Main command dispatch
main() {
    local command="${1:-}"
    
    case "$command" in
        start)
            shift
            cmd_start "$@"
            ;;
        stop)
            shift
            cmd_stop "$@"
            ;;
        restart)
            shift
            cmd_restart "$@"
            ;;
        status)
            shift
            cmd_status "$@"
            ;;
        logs)
            shift
            cmd_logs "$@"
            ;;
        send)
            shift
            cmd_send "$@"
            ;;
        read)
            shift
            cmd_read "$@"
            ;;
        control)
            shift
            cmd_control "$@"
            ;;
        list)
            shift
            cmd_list "$@"
            ;;
        cleanup)
            shift
            cmd_cleanup "$@"
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

# Run main function
main "$@"