#!/bin/bash

set -euo pipefail

FUELS_DEBUG=${FUELS_DEBUG:-}
SCRIPT_DIR="src/call-test-script"
BIN_DIR="$SCRIPT_DIR/out/debug"

forc build -p $SCRIPT_DIR --print-finalized-asm
if [[ -n "$FUELS_DEBUG" ]]; then
  forc parse-bytecode "$BIN_DIR/contract-call-script.bin" > "$BIN_DIR/contract-call-script.txt"
fi
