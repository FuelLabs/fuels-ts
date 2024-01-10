#!/bin/bash

ROOT=$(cd "$(dirname "$0")/.."; pwd)

FILES=$(find $ROOT/{apps,packages,internal} -name '*.test.ts')

if [[ $* == *--all* ]]; then
  grep -lE "@group\s+(node|e2e)" $FILES
elif [[ $* == *--node* ]]; then
  grep -lE "@group\s+node" $FILES
elif [[ $* == *--e2e* ]]; then
  grep -lE "@group\s+e2e" $FILES
fi
