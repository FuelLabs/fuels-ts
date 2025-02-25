#!/bin/bash

PUBLISHED_FUEL_PACKAGE_NAME="${PUBLISHED_FUEL_PACKAGE_NAME-"@FuelLabs/fuels"}"
PUBLISHED_NPM_TAG="${PUBLISHED_NPM_TAG-"next"}"

# Versions
FUEL_CORE_VERSION=$(cat ./internal/fuel-core/VERSION)
FORC_VERSION=$(cat ./internal/forc/VERSION)
TOOLCHAIN="CI"

# Project
ROOT_DIR=$(pwd)
PLAYWRIGHT_DIR="$ROOT_DIR"
PROJECT_DIR="$ROOT_DIR/test-project"

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

echo "2. Scaffold a new project with '$PUBLISHED_FUEL_PACKAGE_NAME@$PUBLISHED_NPM_TAG'"
if [ -d "$PROJECT_DIR" ]; then
  echo "Removing existing project directory '$PROJECT_DIR'"
  rm -rf $PROJECT_DIR
fi
pnpm create $PUBLISHED_FUEL_PACKAGE_NAME@$PUBLISHED_NPM_TAG $PROJECT_DIR --no-install

echo "3. Intialise the project"
cd $PROJECT_DIR
pnpm remove fuels
pnpm add $PUBLISHED_FUEL_PACKAGE_NAME@$PUBLISHED_NPM_TAG
pnpm  --ignore-workspace install
cp .env.example .env.local

echo "4. Running UI tests"
cd $ROOT_DIR
PROJECT_DIR=$PROJECT_DIR sh ./scripts/tests-ui.sh
TEST_RESULT=$?

rm -rf $PROJECT_DIR

exit $TEST_RESULT
