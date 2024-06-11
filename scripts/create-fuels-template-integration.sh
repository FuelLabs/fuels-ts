#!/bin/bash

# Versions
FUEL_CORE_VERSION="0.27.0"
FORC_VERSION="0.60.0"
TOOLCHAIN="CI"

# Project
PROJECT_DIR="test-project"
PUBLISHED_NPM_VERSION="next"

echo "1. Install toolchains"
if [ -x "$(command -v fuelup)" ]; then
  echo "Fuelup exists"
else
  echo "Fuelup does not exist - installing 'fuelup'"
  curl -fsSL https://install.fuel.network/ | sh -s -- --no-modify-path
fi

fuelup toolchain new $TOOLCHAIN
fuelup default $TOOLCHAIN
fuelup component add fuel-core@$FUEL_CORE_VERSION
fuelup component add forc@$FORC_VERSION
fuelup show

echo "2. Scaffold a new project with 'create fuels@$PUBLISHED_NPM_VERSION'"
if [ -d "$PROJECT_DIR" ]; then
  echo "Removing existing project directory '$PROJECT_DIR'"
  rm -rf $PROJECT_DIR
fi
pnpm create fuels@$PUBLISHED_NPM_VERSION $PROJECT_DIR --pnpm -cps

echo "3. Intialise the project"
cd $PROJECT_DIR
pnpm add fuels@$PUBLISHED_NPM_VERSION
cp .env.example .env.local


echo "4. Running fuels:dev command"
pnpm run fuels:dev &
FUELS_DEV_PID="$!"

# Wait for fuel-core
wait 10000

echo "5. Running dev command"
pnpm run dev &
DEV_PID="$!"

echo "6. Running tests"
cd ..
pnpm exec playwright install --with-deps
pnpm exec playwright test

# Cleanup
kill $FUELS_DEV_PID
kill $DEV_PID
