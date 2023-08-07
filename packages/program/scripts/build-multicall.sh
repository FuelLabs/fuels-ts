#!/bin/bash

#set -euo pipefail

FUELS_DEBUG=${FUELS_DEBUG:-}
SCRIPT_DIR="$PWD/src/multicall"
BIN_DIR="$SCRIPT_DIR/out/debug"

pnpm tsx scripts/process-multicall.ts

if [ -d "$SCRIPT_DIR/static-out" ]; then
    rm -rf "$SCRIPT_DIR/static-out"
fi

cp -r "$BIN_DIR" "$SCRIPT_DIR/static-out"
rm -rf "$SCRIPT_DIR/static-out/cache"
