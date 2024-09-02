#!/bin/bash

ROOT_DIR=$(pwd)
PLAYWRIGHT_DIR="$ROOT_DIR"
PROJECT_DIR="${PROJECT_DIR-"$ROOT_DIR/templates/vite"}"

cd $PROJECT_DIR && pnpm run fuels:dev > /dev/null 2>&1 &
sleep 5

cd $PROJECT_DIR && pnpm run dev > /dev/null 2>&1 &
sleep 5

cat $PROJECT_DIR/src/sway-api/contract-ids.json

cd $PLAYWRIGHT_DIR
pnpm exec playwright install --with-deps  > /dev/null 2>&1
pnpm exec playwright test
TEST_RESULT=$?

pkill vite
pkill fuel-core

exit $TEST_RESULT