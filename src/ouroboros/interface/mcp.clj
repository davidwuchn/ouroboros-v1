(ns ouroboros.interface.mcp
  "MCP interface - Model Context Protocol server"
  (:require
   [ouroboros.mcp :as mcp]))

(defn mcp-tools
  "List all MCP-exposed tools
   
   Usage: (mcp-tools)"
  []
  (mcp/list-mcp-tools))

(defn mcp-start!
  "Start MCP server
   
   Usage: (mcp-start! {:port 3000})"
  ([] (mcp/start!))
  ([opts] (mcp/start! opts)))

(defn mcp-stop!
  "Stop MCP server
   
   Usage: (mcp-stop!)"
  []
  (mcp/stop!))

(defn mcp-status
  "Get MCP server status
   
   Usage: (mcp-status)"
  []
  (mcp/status))

(defn mcp-invoke!
  "Invoke a tool via MCP
   
   Usage: (mcp-invoke! \"system/status\" {})"
  [tool-name arguments]
  (mcp/invoke-tool tool-name arguments))
