#!/bin/bash

set -euo pipefail

for PROJECT_DIR in ./test-projects/* ;
do
  BIN_DIR="$PROJECT_DIR/out/debug"

  ./../../packages/forc-bin/forc-binaries/forc build -p $PROJECT_DIR
  if [[ $PROJECT_DIR == *"predicate-"* ]]; then
    pnpm exec ts-node scripts/process-predicate.ts $PROJECT_DIR
  fi
done