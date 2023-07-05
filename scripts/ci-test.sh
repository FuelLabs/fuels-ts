#!/bin/bash

pkill fuel-core

pnpm node:clean

pnpm node:run > /dev/null 2>&1 &

echo "Started Fuel-Core node in background."

if [[ "$*" == *"--coverage"* ]]; then
    pnpm test $@
    TEST_RESULT=$?
else
    pnpm test
    TEST_RESULT=$?
fi

echo "Killing Fuel-Core node."

pkill fuel-core

pnpm node:clean

exit $TEST_RESULT
