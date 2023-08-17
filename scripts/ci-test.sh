#!/bin/bash

pkill fuel-core

pnpm run node:clean

pnpm run node:run > /dev/null 2>&1 &

echo "Started Fuel-Core node in background."

pnpm run pretest

pnpm run test:node-coverage
NODE_TEST_RESULT=$?

echo "Restarting Fuel-Core node."

pnpm run node:clean

pnpm run node:run > /dev/null 2>&1 &

pnpm run test:browser-coverage
BROWSER_TEST_RESULT=$?

pnpm run test:report-coverage

echo "Killing Fuel-Core node."

pkill fuel-core

pnpm run node:clean

exit $NODE_TEST_RESULT && $BROWSER_TEST_RESULT