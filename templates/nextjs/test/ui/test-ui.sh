#!/bin/bash

pnpm run fuels:dev > /dev/null 2>&1 &
sleep 5

pnpm run dev > /dev/null 2>&1 &
sleep 5

pnpm exec playwright install --with-deps  > /dev/null 2>&1
pnpm exec playwright test
TEST_RESULT=$?

pkill next-server
lsof -t -i tcp:3000 | xargs kill
pkill fuel-core
lsof -t -i tcp:4000 | xargs kill

exit $TEST_RESULT