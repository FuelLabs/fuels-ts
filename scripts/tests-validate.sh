#!/bin/bash

ROOT=$(cd "$(dirname "$0")/.."; pwd)

# ignore files in apps/create-fuels-counter-guide/test/
FILES=$(find $ROOT/{apps,packages,internal} -name '*.test.ts' | grep -v "apps/create-fuels-counter-guide/test/")

INVALID_FILES=$(grep -LE "@group\s+(node|browser|e2e|integration)" $FILES)

if [ ! -z "$INVALID_FILES" ]; then
  echo -e "Test files don't contain a test environment configuration:"
  echo -e $INVALID_FILES
  exit 1
fi