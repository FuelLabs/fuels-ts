#!/bin/bash

PUBLISHED_FUEL_PACKAGE_NAME="${PUBLISHED_FUEL_PACKAGE_NAME-"fuels"}"
PUBLISHED_NPM_TAG="${PUBLISHED_NPM_TAG-"next"}"

# Project
REPO_DIR=$(pwd)

echo "1. Add binaries to PATH so that tests can use them"
PATH="${REPO_DIR}/internal/fuel-core/fuel-core-binaries:${PATH}"
PATH="${REPO_DIR}/internal/forc/forc-binaries:${PATH}"

# Create a temporary directory where we'll scaffold the test project
PROJECT_DIR="$(mktemp -d)/integration-test-project"

echo "2. Scaffold a new project with '$PUBLISHED_FUEL_PACKAGE_NAME@$PUBLISHED_NPM_TAG'"
if [ -d "$PROJECT_DIR" ]; then
  echo "Removing existing project directory '$PROJECT_DIR'"
  rm -rf $PROJECT_DIR
fi

# NPM_CONFIG_REGISTRY is used to install the fuels pacakge
# from our custom registry where we publish PR builds
# VITEST is used to skip installing fuelup (see https://github.com/FuelLabs/fuels-ts/issues/3770)
NPM_CONFIG_REGISTRY="https://npm-packages.fuel.network" VITEST="to-not-install-fuelup" pnpm create "$PUBLISHED_FUEL_PACKAGE_NAME"@"$PUBLISHED_NPM_TAG" "$PROJECT_DIR"

echo "3. Running UI tests"
cd $REPO_DIR
PROJECT_DIR=$PROJECT_DIR sh ./scripts/tests-ui.sh
TEST_RESULT=$?

rm -rf $PROJECT_DIR

exit $TEST_RESULT
