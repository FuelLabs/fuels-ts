#!/bin/bash

PUBLISHED_FUEL_PACKAGE_NAME="${PUBLISHED_FUEL_PACKAGE_NAME-"fuels"}"
PUBLISHED_NPM_TAG="${PUBLISHED_NPM_TAG-"next"}"

# Project
REPO_DIR=$(pwd)
PATH="${REPO_DIR}/internal/fuel-core/fuel-core-binaries:${PATH}"
PATH="${REPO_DIR}/internal/forc/forc-binaries:${PATH}"

PROJECT_DIR="$(mktemp -d -t "fuel.XXXXX")/integration-test-project"
echo "$PROJECT_DIR"

echo "1. Scaffold a new project with '$PUBLISHED_FUEL_PACKAGE_NAME@$PUBLISHED_NPM_TAG'"
if [ -d "$PROJECT_DIR" ]; then
  echo "Removing existing project directory '$PROJECT_DIR'"
  rm -rf "$PROJECT_DIR"
fi
NPM_CONFIG_REGISTRY="https://npm-packages.fuel.network" VITEST="to-not-install-fuelup" pnpm create "$PUBLISHED_FUEL_PACKAGE_NAME"@"$PUBLISHED_NPM_TAG" "$PROJECT_DIR"

echo "2. Running UI tests"
cd "$REPO_DIR"
PROJECT_DIR=$PROJECT_DIR sh ./scripts/tests-ui.sh
TEST_RESULT=$?

rm -rf "$PROJECT_DIR"

exit $TEST_RESULT
