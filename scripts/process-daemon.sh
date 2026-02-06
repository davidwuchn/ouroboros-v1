#!/bin/bash
# Process Daemon - Proper daemon for managing long-running processes
# Works with shell_command because it exits quickly after starting daemon

set -e

VERSION="1.0"
BASE_DIR="/tmp/process-daemon"
DAEMON_PID_FILE="$BASE_DIR/daemon.pid"
DAEMON_LOG="$BASE_DIR/daemon.log"
SOCKET_FILE="$BASE_DIR/daemon.sock"

# Create base directory
mkdir -p "$BASE_DIR"

# Daemon functions
start_daemon() {
    if is_daemon_running; then
        echo "Daemon is already running (PID: $(cat "$DAEMON_PID_FILE"))"
        return 0
    fi
    
    echo "Starting process daemon..."
    
    # Start daemon in background
    (
        # Daemon main loop
        daemon_loop() {
            echo "Daemon started at $(date)" >> "$DAEMON_LOG"
            
            # Cleanup on exit
            trap 'echo "Daemon stopped at $(date)" >> "$DAEMON_LOG"; rm -f "$SOCKET_FILE"' EXIT
            
            # Create named pipe for commands
            rm -f "$SOCKET_FILE"
            mkfifo "$SOCKET_FILE"
            
            # Process table
            declare -A processes
            declare -A process_pids
            declare -A process_logs
            
            # Main command loop
            while true; do
                if read -r cmd < "$SOCKET_FILE"; then
                    echo "[$(date)] Received: $cmd" >> "$DAEMON_LOG"
                    
                    # Parse command
                    IFS='|' read -ra parts <<< "$cmd"
                    action="${parts[0]}"
                    name="${parts[1]}"
                    args="${parts[*]:2}"
                    
                    case "$action" in
                        "START")
                            # Parse: START|name|command
                            command="${parts[2]}"
                            if [ -n "${processes[$name]}" ]; then
                                echo "ERROR|Process '$name' already exists" > "$BASE_DIR/$name.response"
                            else
                                # Start the process
                                (
                                    echo "=== Process $name started at $(date) ===" > "$BASE_DIR/$name.log"
                                    echo "Command: $command" >> "$BASE_DIR/$name.log"
                                    echo "======================================" >> "$BASE_DIR/$name.log"
                                    
                                    # Execute command, logging output
                                    eval "$command" 2>&1 | tee -a "$BASE_DIR/$name.log" > "$BASE_DIR/$name.output" &
                                    pid=$!
                                    
                                    echo $pid > "$BASE_DIR/$name.pid"
                                    echo "RUNNING" > "$BASE_DIR/$name.status"
                                    
                                    # Wait for process
                                    wait $pid
                                    exit_code=$?
                                    
                                    echo "=== Process exited with code $exit_code at $(date) ===" >> "$BASE_DIR/$name.log"
                                    echo $exit_code > "$BASE_DIR/$name.exit"
                                    echo "STOPPED" > "$BASE_DIR/$name.status"
                                    
                                    # Clean up from process table
                                    rm -f "$BASE_DIR/$name.pid"
                                ) &
                                
                                processes[$name]="$command"
                                process_pids[$name]="$pid"
                                process_logs[$name]="$BASE_DIR/$name.log"
                                
                                echo "OK|Started process '$name' with PID $pid" > "$BASE_DIR/$name.response"
                            fi
                            ;;
                        "STOP")
                            if [ -z "${processes[$name]}" ]; then
                                echo "ERROR|Process '$name' not found" > "$BASE_DIR/$name.response"
                            else
                                pid="${process_pids[$name]}"
                                if kill -0 "$pid" 2>/dev/null; then
                                    kill -TERM "$pid" 2>/dev/null || true
                                    echo "OK|Sent stop signal to process '$name'" > "$BASE_DIR/$name.response"
                                else
                                    echo "ERROR|Process '$name' not running" > "$BASE_DIR/$name.response"
                                fi
                            fi
                            ;;
                        "STATUS")
                            if [ -f "$BASE_DIR/$name.pid" ]; then
                                pid=$(cat "$BASE_DIR/$name.pid" 2>/dev/null || echo "unknown")
                                if kill -0 "$pid" 2>/dev/null; then
                                    status=$(cat "$BASE_DIR/$name.status" 2>/dev/null || echo "RUNNING")
                                    echo "OK|RUNNING|$pid|$status" > "$BASE_DIR/$name.response"
                                else
                                    echo "OK|STOPPED" > "$BASE_DIR/$name.response"
                                fi
                            else
                                echo "OK|STOPPED" > "$BASE_DIR/$name.response"
                            fi
                            ;;
                        "LOGS")
                            if [ -f "$BASE_DIR/$name.log" ]; then
                                lines="${parts[2]:-20}"
                                tail -n "$lines" "$BASE_DIR/$name.log" > "$BASE_DIR/$name.response"
                            else
                                echo "ERROR|No log file for '$name'" > "$BASE_DIR/$name.response"
                            fi
                            ;;
                        "SEND")
                            # Send input to process (not implemented in this simple version)
                            echo "ERROR|Input sending not implemented in daemon mode" > "$BASE_DIR/$name.response"
                            ;;
                        "LIST")
                            {
                                echo "OK|Process list:"
                                for pname in "${!processes[@]}"; do
                                    if [ -f "$BASE_DIR/$pname.pid" ]; then
                                        pid=$(cat "$BASE_DIR/$pname.pid" 2>/dev/null || echo "?")
                                        echo "  $pname: RUNNING (PID: $pid)"
                                    else
                                        echo "  $pname: STOPPED"
                                    fi
                                done
                            } > "$BASE_DIR/list.response"
                            ;;
                        "SHUTDOWN")
                            echo "OK|Shutting down daemon" > "$BASE_DIR/shutdown.response"
                            # Stop all processes
                            for pname in "${!processes[@]}"; do
                                pid="${process_pids[$pname]}"
                                kill -TERM "$pid" 2>/dev/null || true
                            done
                            exit 0
                            ;;
                        *)
                            echo "ERROR|Unknown command: $action" > "$BASE_DIR/error.response"
                            ;;
                    esac
                fi
            done
        }
        
        # Run daemon loop
        daemon_loop
    ) &
    
    DAEMON_PID=$!
    echo $DAEMON_PID > "$DAEMON_PID_FILE"
    
    # Wait a moment for daemon to start
    sleep 0.5
    
    if is_daemon_running; then
        echo "Daemon started with PID $DAEMON_PID"
        echo "Log: $DAEMON_LOG"
        echo "Socket: $SOCKET_FILE"
    else
        echo "Failed to start daemon"
        exit 1
    fi
}

stop_daemon() {
    if ! is_daemon_running; then
        echo "Daemon is not running"
        return 0
    fi
    
    echo "Stopping daemon..."
    send_command "SHUTDOWN"
    sleep 1
    
    if is_daemon_running; then
        DAEMON_PID=$(cat "$DAEMON_PID_FILE")
        kill -TERM "$DAEMON_PID" 2>/dev/null || true
        sleep 0.5
        
        if is_daemon_running; then
            kill -KILL "$DAEMON_PID" 2>/dev/null || true
        fi
    fi
    
    rm -f "$DAEMON_PID_FILE" "$SOCKET_FILE"
    echo "Daemon stopped"
}

is_daemon_running() {
    if [ ! -f "$DAEMON_PID_FILE" ]; then
        return 1
    fi
    
    local pid=$(cat "$DAEMON_PID_FILE" 2>/dev/null)
    if [ -z "$pid" ]; then
        return 1
    fi
    
    if kill -0 "$pid" 2>/dev/null; then
        return 0
    else
        rm -f "$DAEMON_PID_FILE"
        return 1
    fi
}

send_command() {
    if ! is_daemon_running; then
        echo "ERROR|Daemon not running"
        return 1
    fi
    
    if [ ! -p "$SOCKET_FILE" ]; then
        echo "ERROR|Daemon socket not found"
        return 1
    fi
    
    # Send command to daemon
    echo "$@" > "$SOCKET_FILE"
    
    # Wait for response
    local response_file="$BASE_DIR/response.$$"
    local timeout=5
    local start_time=$(date +%s)
    
    while [ ! -f "$BASE_DIR/$2.response" ] && [ ! -f "$BASE_DIR/error.response" ] && [ ! -f "$BASE_DIR/list.response" ] && [ ! -f "$BASE_DIR/shutdown.response" ]; do
        sleep 0.1
        local current_time=$(date +%s)
        if [ $((current_time - start_time)) -ge $timeout ]; then
            echo "ERROR|Timeout waiting for response"
            return 1
        fi
    done
    
    # Find and read response
    if [ -f "$BASE_DIR/$2.response" ]; then
        cat "$BASE_DIR/$2.response"
        rm -f "$BASE_DIR/$2.response"
    elif [ -f "$BASE_DIR/list.response" ]; then
        cat "$BASE_DIR/list.response"
        rm -f "$BASE_DIR/list.response"
    elif [ -f "$BASE_DIR/shutdown.response" ]; then
        cat "$BASE_DIR/shutdown.response"
        rm -f "$BASE_DIR/shutdown.response"
    elif [ -f "$BASE_DIR/error.response" ]; then
        cat "$BASE_DIR/error.response"
        rm -f "$BASE_DIR/error.response"
    else
        echo "ERROR|No response received"
    fi
}

# Direct mode (no daemon) - simple and works with shell_command
direct_mode() {
    local action="$1"
    local name="$2"
    shift 2
    
    case "$action" in
        "start")
            local command="$*"
            if [ -f "$BASE_DIR/$name.pid" ]; then
                local pid=$(cat "$BASE_DIR/$name.pid" 2>/dev/null)
                if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
                    echo "Process '$name' is already running (PID: $pid)"
                    return 1
                fi
            fi
            
            # Start process with proper daemonization
            (
                # Disown the process
                exec > "$BASE_DIR/$name.log" 2>&1
                echo "=== Process started at $(date) ==="
                echo "Command: $command"
                echo "PID: $$"
                echo "================================="
                
                # Execute command
                eval "$command"
                
                echo "=== Process exited at $(date) ==="
            ) &
            
            local pid=$!
            echo $pid > "$BASE_DIR/$name.pid"
            
            # Write PID file and immediately exit (parent process)
            echo "Process '$name' started with PID $pid"
            echo "Log: $BASE_DIR/$name.log"
            return 0
            ;;
        "stop")
            if [ ! -f "$BASE_DIR/$name.pid" ]; then
                echo "Process '$name' not found"
                return 1
            fi
            
            local pid=$(cat "$BASE_DIR/$name.pid")
            if kill -0 "$pid" 2>/dev/null; then
                echo "Stopping process '$name' (PID: $pid)..."
                kill -TERM "$pid" 2>/dev/null || true
                
                # Wait for process to stop
                for i in {1..10}; do
                    if ! kill -0 "$pid" 2>/dev/null; then
                        echo "Process '$name' stopped"
                        rm -f "$BASE_DIR/$name.pid"
                        return 0
                    fi
                    sleep 1
                done
                
                # Force kill
                kill -KILL "$pid" 2>/dev/null || true
                echo "Force killed process '$name'"
                rm -f "$BASE_DIR/$name.pid"
            else
                echo "Process '$name' not running"
                rm -f "$BASE_DIR/$name.pid"
            fi
            ;;
        "status")
            if [ ! -f "$BASE_DIR/$name.pid" ]; then
                echo "Process '$name': NOT FOUND"
                return 1
            fi
            
            local pid=$(cat "$BASE_DIR/$name.pid")
            if kill -0 "$pid" 2>/dev/null; then
                echo "Process '$name': RUNNING (PID: $pid)"
                echo "Log: $BASE_DIR/$name.log"
                if [ -f "$BASE_DIR/$name.log" ]; then
                    echo "Last log lines:"
                    tail -5 "$BASE_DIR/$name.log"
                fi
            else
                echo "Process '$name': STOPPED"
                rm -f "$BASE_DIR/$name.pid"
            fi
            ;;
        "logs")
            if [ ! -f "$BASE_DIR/$name.log" ]; then
                echo "No log file for '$name'"
                return 1
            fi
            
            if [ "$1" = "-f" ]; then
                tail -f "$BASE_DIR/$name.log"
            else
                local lines="${1:-50}"
                tail -n "$lines" "$BASE_DIR/$name.log"
            fi
            ;;
        "list")
            echo "Managed processes in $BASE_DIR:"
            echo ""
            
            local found=0
            for pid_file in "$BASE_DIR"/*.pid; do
                [ -f "$pid_file" ] || continue
                
                local pname=$(basename "$pid_file" .pid)
                local pid=$(cat "$pid_file" 2>/dev/null)
                
                found=1
                if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
                    echo "  $pname: RUNNING (PID: $pid)"
                else
                    echo "  $pname: STOPPED"
                    rm -f "$pid_file"
                fi
            done
            
            if [ $found -eq 0 ]; then
                echo "  No processes found"
            fi
            ;;
        *)
            echo "Unknown direct command: $action"
            return 1
            ;;
    esac
}

# Main script
main() {
    local mode="${1:-direct}"
    shift
    
    case "$mode" in
        "daemon-start")
            start_daemon
            ;;
        "daemon-stop")
            stop_daemon
            ;;
        "daemon-status")
            if is_daemon_running; then
                echo "Daemon is running (PID: $(cat "$DAEMON_PID_FILE"))"
            else
                echo "Daemon is not running"
            fi
            ;;
        "start"|"stop"|"status"|"logs"|"list")
            direct_mode "$mode" "$@"
            ;;
        "help")
            echo "Process Manager - Direct Mode (works with shell_command)"
            echo ""
            echo "Usage: $0 <command> <name> [args...]"
            echo ""
            echo "Commands:"
            echo "  start <name> <command>    Start a process"
            echo "  stop <name>               Stop a process"
            echo "  status <name>             Check process status"
            echo "  logs <name> [-f|lines]    View process logs"
            echo "  list                      List all processes"
            echo ""
            echo "Examples:"
            echo "  $0 start myserver 'python -m http.server 8080'"
            echo "  $0 status myserver"
            echo "  $0 logs myserver -f"
            echo "  $0 stop myserver"
            ;;
        *)
            echo "Usage: $0 {start|stop|status|logs|list|help} ..."
            echo "       $0 daemon-{start|stop|status}"
            exit 1
            ;;
    esac
}

# Run main
main "$@"