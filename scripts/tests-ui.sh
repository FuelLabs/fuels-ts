#!/bin/bash

ROOT_DIR=$(pwd)
PLAYWRIGHT_DIR="$ROOT_DIR"
PROJECT_DIR="${PROJECT_DIR-"$ROOT_DIR/templates/vite"}"

cp $PROJECT_DIR/.env.example $PROJECT_DIR/.env.local

cd $PROJECT_DIR && pnpm run fuels:dev > /dev/null 2>&1 &
sleep 5

echo "Here 1"

cd $PROJECT_DIR && pnpm run dev &
sleep 5

echo "Here 2"

cd $PLAYWRIGHT_DIR
pnpm exec playwright install --with-deps
pnpm exec playwright test
TEST_RESULT=$?

echo "Here 3"

pkill vite
pkill fuel-core

echo "TEST_RESULT: $TEST_RESULT"

exit $TEST_RESULT