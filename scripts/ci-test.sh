#!/bin/bash

pkill fuel-core

pnpm node:clean

pnpm node:run > /dev/null 2>&1 &

echo "Started Fuel-Core node in background."

pnpm pretest

if [[ "$*" == *"--browser"* ]]; then
    pnpm test:browser-coverage
    TEST_RESULT=$?
else
    pnpm test:node-coverage
    TEST_RESULT=$?
fi

echo "Killing Fuel-Core node."

pkill fuel-core

pnpm node:clean

exit $TEST_RESULT