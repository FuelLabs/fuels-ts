#!/bin/bash

set -euo pipefail

FUELS_DEBUG=${FUELS_DEBUG:-}
SCRIPT_DIR="src/contracts/multicall"
BIN_DIR="$SCRIPT_DIR/out/debug"

pnpm forc build -p $SCRIPT_DIR --print-finalized-asm
pnpm exec ts-node scripts/process-multicall.ts
if [[ -n "$FUELS_DEBUG" ]]; then
  pnpm forc parse-bytecode "$BIN_DIR/multicall.bin" > "$BIN_DIR/multicall.txt"
fi
