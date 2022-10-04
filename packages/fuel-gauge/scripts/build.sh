#!/bin/bash

set -euo pipefail

for PROJECT_DIR in ./test-projects/* ;
do
  BIN_DIR="$PROJECT_DIR/out/debug"

  forc build -p $PROJECT_DIR --print-finalized-asm --generate-logged-types
  if [[ $PROJECT_DIR == *"test-predicate"* ]]; then
    pnpm exec ts-node scripts/process-predicate.ts $PROJECT_DIR
  fi
done