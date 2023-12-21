#!/bin/bash

pkill fuel-core

pnpm node:clean

pnpm node:run > /dev/null 2>&1 &

echo "Started Fuel-Core node in background."

pnpm test
TEST_RESULT=$?

echo "Killing Fuel-Core node."

pkill fuel-core

pnpm node:clean

exit $TEST_RESULT
