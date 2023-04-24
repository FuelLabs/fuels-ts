#!/bin/bash

set -euo pipefail

FUELS_DEBUG=${FUELS_DEBUG:-}
SCRIPT_DIR="src/call-test-script"
BIN_DIR="$SCRIPT_DIR/out/debug"

pnpm forc build -p $SCRIPT_DIR --finalized-asm
if [[ -n "$FUELS_DEBUG" ]]; then
  pnpm forc parse-bytecode "$BIN_DIR/call-test-script.bin" > "$BIN_DIR/call-test-script.txt"
fi
