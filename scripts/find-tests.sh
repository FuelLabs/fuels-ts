#!/bin/bash

ROOT=$(cd "$(dirname "$0")/.."; pwd)

FILES=$(find $ROOT/{apps,internal,packages} -name '*.test.ts')

if [[ $* == *--all* ]]; then
  grep -lE "@group\s+(node|browser)" $FILES
elif [[ $* == *--browser* ]]; then
  grep -lE "@group\s+browser" $FILES
elif [[ $* == *--node* ]]; then
  grep -lE "@group\s+node" $FILES
fi
