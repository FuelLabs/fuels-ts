#!/bin/bash

set -euo pipefail

SCRIPT_PATH="src/call-test-script"
BIN_DIR="$SCRIPT_PATH/out/debug"

forc build -p $SCRIPT_PATH --print-finalized-asm
# forc parse-bytecode "$BIN_DIR/call-test-script.bin" > "$BIN_DIR/call-test-script.txt"
