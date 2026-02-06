#!/usr/bin/env python3
"""
Replace the test:webux task in bb.edn with a JVM Clojure version.
"""
import sys
import os

def main():
    with open('bb.edn', 'r') as f:
        lines = f.readlines()
    
    # Find start and end indices
    start = None
    for i, line in enumerate(lines):
        if line.rstrip() == '  test:webux':
            start = i
            break
    if start is None:
        print("ERROR: test:webux not found")
        sys.exit(1)
    
    # Find end (next top-level key)
    end = None
    for i in range(start + 1, len(lines)):
        if lines[i].startswith('  test:') and lines[i].strip() != 'test:webux':
            end = i
            break
    if end is None:
        end = len(lines)
    
    print(f"Replacing lines {start+1} to {end+1}")
    
    # New block (keep same indentation)
    new_block = '''  test:webux
  {:doc "Run WebUX Platform tests (requires Clojure, not Babashka)"
   :task (shell "clojure -Sdeps '{:paths [\\\"scripts\\\"]}' -M -m scripts.test-webux-jvm")}
'''
    # Ensure newline after block matches original
    if end < len(lines) and lines[end].startswith('\n'):
        # keep existing blank line
        pass
    else:
        # add newline after block
        new_block += '\n'
    
    # Replace
    lines[start:end] = [new_block]
    
    with open('bb.edn', 'w') as f:
        f.writelines(lines)
    
    print("Updated bb.edn successfully")

if __name__ == '__main__':
    main()