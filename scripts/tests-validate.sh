#!/bin/bash

ROOT=$(cd "$(dirname "$0")/.."; pwd)

FILES=$(find $ROOT/{apps,packages,internal} -name '*.test.ts')
INVALID_FILES=$(grep -LE "@group\s+(node|e2e)" $FILES)

if [ ! -z "$INVALID_FILES" ]; then
  echo -e "Test files don't contain a test environment configuration:"
  echo -e $INVALID_FILES
  exit 1
fi