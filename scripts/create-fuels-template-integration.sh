#!/bin/bash

# Versions
FUEL_CORE_VERSION="0.27.0"
FORC_VERSION="0.60.0"
TOOLCHAIN="CI"

# Project
PROJECT_DIR="test-project"
PUBLISHED_NPM_VERSION="next"

pkill fuel-core

echo "1. Install toolchains"
if [ -x "$(command -v fuelup)" ]; then
  echo "Fuelup exists"
else
  echo "Fuelup does not exist - installing 'fuelup'"
  curl -fsSL https://install.fuel.network/ | sh -s -- --no-modify-path
  export PATH="${HOME}/.fuelup/bin:${PATH}"
fi

fuelup toolchain new $TOOLCHAIN
fuelup default $TOOLCHAIN
fuelup component add fuel-core@$FUEL_CORE_VERSION
fuelup component add forc@$FORC_VERSION

echo "2. Scaffold a new project with 'create fuels@$PUBLISHED_NPM_VERSION'"
if [ -d "$PROJECT_DIR" ]; then
  echo "Removing existing project directory '$PROJECT_DIR'"
  rm -rf $PROJECT_DIR
fi
pnpm create fuels@$PUBLISHED_NPM_VERSION $PROJECT_DIR --pnpm -cps

echo "3. Intialise the project"
cd $PROJECT_DIR
pnpm add fuels@$PUBLISHED_NPM_VERSION > /dev/null 2>&1
pnpm  --ignore-workspace install > /dev/null 2>&1
cp .env.example .env.local


echo "4. Running fuels:dev command"
pnpm run fuels:dev > /dev/null 2>&1 &

# Wait for fuel-core
sleep 5

echo "5. Running dev command"
pnpm run dev > /dev/null 2>&1  &

echo "6. Running tests"
cd ..
pnpm exec playwright install --with-deps
pnpm exec playwright test
TEST_RESULT=$?

# Cleanup
pkill fuel-core
pkill next-server
rm -rf $PROJECT_DIR

exit $TEST_RESULT
