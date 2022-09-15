#!/bin/bash

set -euo pipefail

FUELS_DEBUG=${FUELS_DEBUG:-}

for i in 'test-predicate-true' 'test-predicate-address' 'test-predicate-struct' 'test-predicate-u32' 'test-predicate-false'
do
  SCRIPT_DIR="src/$i"
  BIN_DIR="$SCRIPT_DIR/out/debug"

  forc build -p $SCRIPT_DIR --print-finalized-asm --generate-logged-types
  pnpm exec ts-node scripts/process.ts $i
  if [[ -n "$FUELS_DEBUG" ]]; then
    forc parse-bytecode "$BIN_DIR/$i.bin" > "$BIN_DIR/$i.txt"
  fi
done