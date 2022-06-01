#!/bin/bash

set -euo pipefail

FUELS_DEBUG=${FUELS_DEBUG:-}
SCRIPT_DIR="src/contract-call-script"
BIN_DIR="$SCRIPT_DIR/out/debug"

pnpm forc build -p $SCRIPT_DIR --print-finalized-asm
pnpm exec ts-node scripts/process-contract-call-script.ts
if [[ -n "$FUELS_DEBUG" ]]; then
  pnpm forc parse-bytecode "$BIN_DIR/contract-call-script.bin" > "$BIN_DIR/contract-call-script.txt"
fi
