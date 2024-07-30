#!/bin/bash

ROOT_DIR=$(pwd)
PLAYWRIGHT_DIR="$ROOT_DIR"
PROJECT_DIR="${PROJECT_DIR-"$ROOT_DIR/templates/nextjs"}"

cd $PROJECT_DIR && pnpm run fuels:dev > /dev/null 2>&1 &
sleep 5

cd $PROJECT_DIR && pnpm run dev > /dev/null 2>&1 &
sleep 5

cd $PLAYWRIGHT_DIR
pnpm exec playwright install --with-deps  > /dev/null 2>&1
pnpm exec playwright test

pkill next-server
pkill fuel-core