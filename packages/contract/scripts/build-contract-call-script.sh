#!/bin/bash

set -euo pipefail

SCRIPT_DIR="src/contract-call-script"
BIN_DIR="$SCRIPT_DIR/out/debug"

forc build -p $SCRIPT_DIR --print-finalized-asm
pnpm exec ts-node scripts/process-contract-call-script.ts
# forc parse-bytecode "$BIN_DIR/contract-call-script.bin" > "$BIN_DIR/contract-call-script.txt"
