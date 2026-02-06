#!/bin/bash
# Process Runner - Actually works with shell_command
# Uses proper daemonization to survive parent process exit

set -e

VERSION="1.0"
BASE_DIR="/tmp/process-runner"

# Create base directory
mkdir -p "$BASE_DIR"

# Proper daemonization that survives parent exit
daemonize() {
    local name="$1"
    local command="$2"
    
    # Create a script that will run the command
    local runner_script="$BASE_DIR/$name-runner.sh"
    
    cat > "$runner_script" <<EOF
#!/bin/bash
# Runner for process: $name

# Log file
LOG_FILE="$BASE_DIR/$name.log"
PID_FILE="$BASE_DIR/$name.pid"

# Write PID
echo \$\$ > "\$PID_FILE"

# Redirect all output
exec > "\$LOG_FILE" 2>&1

echo "=== Process started at \$(date) ==="
echo "Command: $command"
echo "PID: \$\$"
echo "=================================="

# Run the command
eval "$command"

EXIT_CODE=\$?
echo "=== Process exited with code \$EXIT_CODE at \$(date) ==="
rm -f "\$PID_FILE"
EOF
    
    chmod +x "$runner_script"
    
    # Start it with nohup and disown completely
    nohup bash "$runner_script" >/dev/null 2>&1 &
    
    # Give it a moment to start and write PID file
    sleep 0.5
    
    # Check if it started
    if [ -f "$BASE_DIR/$name.pid" ]; then
        local pid=$(cat "$BASE_DIR/$name.pid")
        if kill -0 "$pid" 2>/dev/null; then
            echo "Process '$name' started with PID $pid"
            echo "Log: $BASE_DIR/$name.log"
            return 0
        fi
    fi
    
    echo "Failed to start process '$name'"
    return 1
}

# Check if process is running
is_running() {
    local name="$1"
    local pid_file="$BASE_DIR/$name.pid"
    
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

# Command implementations
cmd_start() {
    local name="$1"
    local command="$2"
    
    if [ -z "$name" ] || [ -z "$command" ]; then
        echo "Usage: $0 start <name> <command>"
        echo "Example: $0 start myserver 'python -m http.server 8080'"
        exit 1
    fi
    
    if is_running "$name"; then
        local pid=$(cat "$BASE_DIR/$name.pid")
        echo "Process '$name' is already running (PID: $pid)"
        exit 1
    fi
    
    daemonize "$name" "$command"
}

cmd_stop() {
    local name="$1"
    
    if [ -z "$name" ]; then
        echo "Usage: $0 stop <name>"
        exit 1
    fi
    
    if ! is_running "$name"; then
        echo "Process '$name' is not running"
        # Clean up any stale files
        rm -f "$BASE_DIR/$name.pid" 2>/dev/null || true
        exit 1
    fi
    
    local pid=$(cat "$BASE_DIR/$name.pid")
    echo "Stopping process '$name' (PID: $pid)..."
    
    # Try graceful termination
    kill -TERM "$pid" 2>/dev/null || true
    
    # Wait for up to 5 seconds
    for i in {1..50}; do
        if ! kill -0 "$pid" 2>/dev/null; then
            echo "Process '$name' stopped"
            rm -f "$BASE_DIR/$name.pid"
            return 0
        fi
        sleep 0.1
    done
    
    # Force kill if still running
    if kill -0 "$pid" 2>/dev/null; then
        kill -KILL "$pid" 2>/dev/null || true
        echo "Force killed process '$name'"
        rm -f "$BASE_DIR/$name.pid"
    fi
}

cmd_status() {
    local name="$1"
    
    if [ -z "$name" ]; then
        echo "Usage: $0 status <name>"
        exit 1
    fi
    
    if is_running "$name"; then
        local pid=$(cat "$BASE_DIR/$name.pid")
        echo "Process '$name': RUNNING"
        echo "PID: $pid"
        echo "Log: $BASE_DIR/$name.log"
        
        # Show last few log lines
        if [ -f "$BASE_DIR/$name.log" ]; then
            echo ""
            echo "Recent logs:"
            tail -10 "$BASE_DIR/$name.log" | sed 's/^/  /'
        fi
    else
        echo "Process '$name': STOPPED"
        if [ -f "$BASE_DIR/$name.log" ]; then
            # Check exit status from log
            if grep -q "exited with code" "$BASE_DIR/$name.log" 2>/dev/null; then
                local exit_code=$(grep "exited with code" "$BASE_DIR/$name.log" | tail -1 | grep -o '[0-9]\+')
                echo "Exit code: $exit_code"
            fi
        fi
    fi
}

cmd_logs() {
    local name="$1"
    local follow="${2:-}"
    
    if [ -z "$name" ]; then
        echo "Usage: $0 logs <name> [-f]"
        exit 1
    fi
    
    if [ ! -f "$BASE_DIR/$name.log" ]; then
        echo "No log file for '$name'"
        exit 1
    fi
    
    if [ "$follow" = "-f" ]; then
        tail -f "$BASE_DIR/$name.log"
    else
        # Show last 50 lines by default
        local lines="${2:-50}"
        tail -n "$lines" "$BASE_DIR/$name.log"
    fi
}

cmd_list() {
    echo "Managed processes in $BASE_DIR:"
    echo ""
    
    local found=0
    for pid_file in "$BASE_DIR"/*.pid; do
        [ -f "$pid_file" ] || continue
        
        local name=$(basename "$pid_file" .pid)
        local pid=$(cat "$pid_file" 2>/dev/null)
        
        found=1
        if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
            echo "  $name: RUNNING (PID: $pid)"
        else
            echo "  $name: STOPPED (stale PID file)"
            rm -f "$pid_file"
        fi
    done
    
    if [ $found -eq 0 ]; then
        echo "  No processes found"
    fi
    
    echo ""
    echo "Available log files:"
    for log_file in "$BASE_DIR"/*.log; do
        [ -f "$log_file" ] || continue
        local name=$(basename "$log_file" .log)
        echo "  $name: $log_file"
    done
}

cmd_clean() {
    echo "Cleaning up stopped processes..."
    
    # Remove stale PID files
    for pid_file in "$BASE_DIR"/*.pid; do
        [ -f "$pid_file" ] || continue
        
        local name=$(basename "$pid_file" .pid)
        local pid=$(cat "$pid_file" 2>/dev/null)
        
        if [ -z "$pid" ] || ! kill -0 "$pid" 2>/dev/null; then
            echo "  Removing: $name"
            rm -f "$pid_file"
            rm -f "$BASE_DIR/$name-runner.sh" 2>/dev/null || true
        fi
    done
    
    echo "Cleanup complete"
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
        help|--help|-h)
            cat <<EOF
Process Runner v$VERSION - Run long processes with shell_command

Usage: $0 <command> [args...]

Commands:
  start <name> <command>    Start a new process
  stop <name>               Stop a running process
  status <name>             Check process status
  logs <name> [-f|lines]    View process logs
  list                      List all processes
  clean                     Clean up stopped processes

Examples:
  $0 start webserver 'python -m http.server 8080'
  $0 status webserver
  $0 logs webserver -f
  $0 stop webserver
  $0 list

Note: This script works with shell_command because it exits quickly
      after starting the process as a proper daemon.
EOF
            ;;
        *)
            echo "Unknown command: $command"
            echo "Use '$0 help' for usage information"
            exit 1
            ;;
    esac
}

# Run main
main "$@"