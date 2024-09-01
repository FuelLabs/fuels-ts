#!/bin/bash

ROOT=$(cd "$(dirname "$0")/.."; pwd)

FILES=$(find $ROOT/{apps,packages,internal,templates} -name '*.test.ts')

if [[ $* == *--all* ]]; then
  grep -lE "\*\s+@group\s+(node|browser|e2e)" $FILES
elif [[ $* == *--node* ]]; then
  grep -lE "\*\s+@group\s+node" $FILES
elif [[ $* == *--browser* ]]; then
  grep -lE "\*\s+@group\s+browser" $FILES
elif [[ $* == *--e2e* ]]; then
  grep -lE "\*\s+@group\s+e2e" $FILES
elif [[ $* == *--integration* ]]; then
  grep -lE "\*\s+@group\s+integration" $FILES
fi
