#!/bin/bash
# Process Manager for long-running commands with full control
# Usage: ./process-manager.sh <command> <name>

set -e

COMMAND="$1"
NAME="$2"
BASE_DIR="${3:-/tmp/process-manager}"
PID_FILE="$BASE_DIR/$NAME.pid"
LOG_FILE="$BASE_DIR/$NAME.log"
CTRL_PIPE="$BASE_DIR/$NAME.ctrl"
STATUS_FILE="$BASE_DIR/$NAME.status"
STDIN_PIPE="$BASE_DIR/$NAME.stdin"
STDOUT_PIPE="$BASE_DIR/$NAME.stdout"

# Create base directory
mkdir -p "$BASE_DIR"

# Ensure pipes exist
cleanup_pipes() {
    rm -f "$CTRL_PIPE" "$STDIN_PIPE" "$STDOUT_PIPE"
}

setup_pipes() {
    cleanup_pipes
    mkfifo "$CTRL_PIPE" 2>/dev/null || true
    mkfifo "$STDIN_PIPE" 2>/dev/null || true
    mkfifo "$STDOUT_PIPE" 2>/dev/null || true
}

start() {
    if is_running; then
        echo "Process '$NAME' is already running (PID: $(cat "$PID_FILE"))"
        return 1
    fi
    
    setup_pipes
    
    # Start the process with pipes for control
    (
        echo "STARTING" > "$STATUS_FILE"
        trap 'echo "STOPPED" > "$STATUS_FILE"; cleanup_pipes' EXIT
        
        # Execute command with input from stdin pipe and output to both log and stdout pipe
        {
            echo "=== Process started at $(date) ==="
            echo "Command: $COMMAND"
            echo "================================="
        } >> "$LOG_FILE"
        
        # Create a function to handle control commands
        control_handler() {
            while read -r cmd < "$CTRL_PIPE"; do
                case "$cmd" in
                    "STOP")
                        echo "[CONTROL] Received STOP command" >> "$LOG_FILE"
                        kill -TERM $MAIN_PID 2>/dev/null || true
                        return
                        ;;
                    "RESTART")
                        echo "[CONTROL] Received RESTART command" >> "$LOG_FILE"
                        kill -TERM $MAIN_PID 2>/dev/null || true
                        sleep 1
                        # The outer loop will restart
                        return 1
                        ;;
                    "STATUS")
                        echo "[CONTROL] Status: running (PID: $$)" >> "$LOG_FILE"
                        ;;
                    *)
                        echo "[CONTROL] Unknown command: $cmd" >> "$LOG_FILE"
                        ;;
                esac
            done
        }
        
        # Start control handler in background
        control_handler &
        CTRL_PID=$!
        
        # Main command execution
        {
            # Read from stdin pipe and feed to command
            cat "$STDIN_PIPE" | \
            $COMMAND 2>&1 | \
            tee -a "$LOG_FILE" "$STDOUT_PIPE"
        } &
        MAIN_PID=$!
        
        echo $MAIN_PID > "$PID_FILE"
        echo "RUNNING" > "$STATUS_FILE"
        echo "=== Process '$NAME' started with PID $MAIN_PID ===" >> "$LOG_FILE"
        
        # Wait for main process
        wait $MAIN_PID
        MAIN_EXIT=$?
        
        # Kill control handler
        kill $CTRL_PID 2>/dev/null || true
        
        echo "=== Process exited with code $MAIN_EXIT at $(date) ===" >> "$LOG_FILE"
        echo $MAIN_EXIT > "$STATUS_FILE.exit"
        
    ) >/dev/null 2>&1 &
    
    MANAGER_PID=$!
    echo $MANAGER_PID > "$PID_FILE.manager"
    
    # Wait a bit for process to start
    sleep 0.5
    
    if is_running; then
        echo "Process '$NAME' started with PID $(cat "$PID_FILE")"
        echo "Log file: $LOG_FILE"
        echo "Control pipe: $CTRL_PIPE"
        echo "Stdin pipe: $STDIN_PIPE (for sending input)"
        echo "Stdout pipe: $STDOUT_PIPE (for reading output)"
        return 0
    else
        echo "Failed to start process '$NAME'"
        return 1
    fi
}

stop() {
    if ! is_running; then
        echo "Process '$NAME' is not running"
        return 1
    fi
    
    echo "Stopping process '$NAME'..."
    
    # Send stop command via control pipe
    echo "STOP" > "$CTRL_PIPE" 2>/dev/null || true
    
    # Wait for process to stop
    for i in {1..10}; do
        if ! is_running; then
            echo "Process '$NAME' stopped"
            cleanup_pipes
            return 0
        fi
        sleep 1
    done
    
    # Force kill if graceful stop failed
    if is_running; then
        PID=$(cat "$PID_FILE" 2>/dev/null)
        if [ -n "$PID" ]; then
            kill -KILL $PID 2>/dev/null || true
            echo "Force killed process '$NAME' (PID: $PID)"
        fi
    fi
    
    cleanup_pipes
    return 0
}

restart() {
    stop 2>/dev/null || true
    sleep 1
    start
}

status() {
    if is_running; then
        PID=$(cat "$PID_FILE" 2>/dev/null)
        STAT=$(cat "$STATUS_FILE" 2>/dev/null || echo "UNKNOWN")
        echo "Process '$NAME' is running (PID: $PID, Status: $STAT)"
        echo "Log file: $LOG_FILE"
        echo "Control interface:"
        echo "  Send command: echo 'COMMAND' > $CTRL_PIPE"
        echo "  Send input: echo 'input' > $STDIN_PIPE"
        echo "  Read output: cat $STDOUT_PIPE"
        return 0
    else
        echo "Process '$NAME' is not running"
        EXIT_CODE=$(cat "$STATUS_FILE.exit" 2>/dev/null || echo "UNKNOWN")
        echo "Last exit code: $EXIT_CODE"
        return 1
    fi
}

is_running() {
    if [ ! -f "$PID_FILE" ]; then
        return 1
    fi
    
    PID=$(cat "$PID_FILE" 2>/dev/null)
    if [ -z "$PID" ]; then
        return 1
    fi
    
    # Check if process exists
    if kill -0 $PID 2>/dev/null; then
        return 0
    else
        # Clean up stale PID file
        rm -f "$PID_FILE" "$PID_FILE.manager"
        return 1
    fi
}

logs() {
    if [ ! -f "$LOG_FILE" ]; then
        echo "No log file found for '$NAME'"
        return 1
    fi
    
    if [ "$1" = "-f" ]; then
        # Follow logs
        tail -f "$LOG_FILE"
    else
        # Show last N lines (default 50)
        LINES="${1:-50}"
        tail -n "$LINES" "$LOG_FILE"
    fi
}

send_input() {
    if ! is_running; then
        echo "Process '$NAME' is not running"
        return 1
    fi
    
    if [ ! -p "$STDIN_PIPE" ]; then
        echo "Stdin pipe not found: $STDIN_PIPE"
        return 1
    fi
    
    # Send input to stdin pipe
    echo "$@" > "$STDIN_PIPE"
    echo "Sent to '$NAME': $@"
}

read_output() {
    if ! is_running; then
        echo "Process '$NAME' is not running"
        return 1
    fi
    
    if [ ! -p "$STDOUT_PIPE" ]; then
        echo "Stdout pipe not found: $STDOUT_PIPE"
        return 1
    fi
    
    if [ "$1" = "-f" ]; then
        # Follow output
        cat "$STDOUT_PIPE"
    else
        # Read available output (non-blocking)
        timeout 0.1 cat "$STDOUT_PIPE" 2>/dev/null || true
    fi
}

control() {
    if ! is_running; then
        echo "Process '$NAME' is not running"
        return 1
    fi
    
    if [ ! -p "$CTRL_PIPE" ]; then
        echo "Control pipe not found: $CTRL_PIPE"
        return 1
    fi
    
    echo "$@" > "$CTRL_PIPE"
    echo "Sent control command to '$NAME': $@"
}

# Main command dispatcher
case "${1:-}" in
    "start")
        shift
        COMMAND="$1"
        NAME="$2"
        BASE_DIR="$3"
        if [ -z "$COMMAND" ] || [ -z "$NAME" ]; then
            echo "Usage: $0 start <command> <name> [base_dir]"
            echo "Example: $0 start 'python -m http.server 8080' web-server"
            exit 1
        fi
        start
        ;;
    "stop")
        shift
        NAME="$1"
        if [ -z "$NAME" ]; then
            echo "Usage: $0 stop <name>"
            exit 1
        fi
        stop
        ;;
    "restart")
        shift
        NAME="$1"
        if [ -z "$NAME" ]; then
            echo "Usage: $0 restart <name>"
            exit 1
        fi
        restart
        ;;
    "status")
        shift
        NAME="$1"
        if [ -z "$NAME" ]; then
            echo "Usage: $0 status <name>"
            exit 1
        fi
        status
        ;;
    "logs")
        shift
        NAME="$1"
        shift
        if [ -z "$NAME" ]; then
            echo "Usage: $0 logs <name> [-f | lines]"
            exit 1
        fi
        logs "$@"
        ;;
    "send")
        shift
        NAME="$1"
        shift
        if [ -z "$NAME" ] || [ -z "$*" ]; then
            echo "Usage: $0 send <name> <input>"
            exit 1
        fi
        send_input "$@"
        ;;
    "read")
        shift
        NAME="$1"
        shift
        if [ -z "$NAME" ]; then
            echo "Usage: $0 read <name> [-f]"
            exit 1
        fi
        read_output "$@"
        ;;
    "control")
        shift
        NAME="$1"
        shift
        if [ -z "$NAME" ] || [ -z "$*" ]; then
            echo "Usage: $0 control <name> <command>"
            echo "Commands: STOP, RESTART, STATUS"
            exit 1
        fi
        control "$@"
        ;;
    "list")
        echo "Managed processes in ${BASE_DIR:-/tmp/process-manager}:"
        find "${BASE_DIR:-/tmp/process-manager}" -name "*.pid" 2>/dev/null | while read pidfile; do
            name=$(basename "$pidfile" .pid)
            if kill -0 $(cat "$pidfile") 2>/dev/null; then
                echo "  $name: RUNNING (PID: $(cat "$pidfile"))"
            else
                echo "  $name: STOPPED"
            fi
        done
        ;;
    *)
        echo "Process Manager v1.0"
        echo ""
        echo "Usage: $0 <command> [args...]"
        echo ""
        echo "Commands:"
        echo "  start <command> <name> [base_dir]  Start a new managed process"
        echo "  stop <name>                        Stop a running process"
        echo "  restart <name>                     Restart a process"
        echo "  status <name>                      Check process status"
        echo "  logs <name> [-f | lines]           View process logs"
        echo "  send <name> <input>                Send input to process"
        echo "  read <name> [-f]                   Read output from process"
        echo "  control <name> <command>           Send control command"
        echo "  list                               List all managed processes"
        echo ""
        echo "Examples:"
        echo "  $0 start 'python -m http.server' web-server"
        echo "  $0 status web-server"
        echo "  $0 logs web-server -f"
        echo "  $0 send web-server 'GET / HTTP/1.0\\n\\n'"
        echo "  $0 control web-server STOP"
        exit 1
        ;;
esac