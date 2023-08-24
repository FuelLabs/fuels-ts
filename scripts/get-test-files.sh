#!/bin/bash

ROOT=$(cd "$(dirname "$0")/.."; pwd)

FILES=$(find $ROOT/{packages,internal} -name '*.test.ts' -not -path 'node_modules')

if [[ $* == *--all* ]]; then
  grep -lE "@group (node|browser)" $FILES
elif [[ $* == *--browser* ]]; then
  grep -lE "@group browser" $FILES
elif [[ $* == *--node* ]]; then
  grep -lE "@group node" $FILES
fi
