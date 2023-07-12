#!/bin/bash

# set -euo pipefail

FUELS_DEBUG=${FUELS_DEBUG:-}
SCRIPT_DIR="src/multicall"
BIN_DIR="$SCRIPT_DIR/out/debug"

pnpm fuels-forc build -p $SCRIPT_DIR --finalized-asm
pnpm tsx scripts/process-multicall.ts

if [[ -n "$FUELS_DEBUG" ]]; then
  pnpm fuels-forc parse-bytecode "$BIN_DIR/multicall.bin" > "$BIN_DIR/multicall.txt"
fi

cp -r $BIN_DIR/* $SCRIPT_DIR/static-out/
