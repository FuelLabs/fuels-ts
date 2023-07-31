#!/bin/bash

#set -euo pipefail

FUELS_DEBUG=${FUELS_DEBUG:-}
SCRIPT_DIR="$PWD/src/multicall"
BIN_DIR="$SCRIPT_DIR/out/debug"

(cd ../../scripts; chmod +x ./forc-build-with-cache.sh; ./forc-build-with-cache.sh $SCRIPT_DIR)
pnpm tsx scripts/process-multicall.ts

if [ -d "$SCRIPT_DIR/static-out" ]; then
rm -r "$SCRIPT_DIR/static-out"
fi


cp -r "$BIN_DIR" "$SCRIPT_DIR/static-out"
rm -r "$SCRIPT_DIR/static-out/cache"


# if [[ -n "$FUELS_DEBUG" ]]; then
#   pnpm fuels-forc parse-bytecode "$BIN_DIR/multicall.bin" > "$BIN_DIR/multicall.txt"
# fi

