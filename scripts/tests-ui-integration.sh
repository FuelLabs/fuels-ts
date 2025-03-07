#!/bin/bash

PUBLISHED_FUEL_PACKAGE_NAME="${PUBLISHED_FUEL_PACKAGE_NAME-"fuels"}"
PUBLISHED_NPM_TAG="${PUBLISHED_NPM_TAG-"next"}"

# Project
ROOT_DIR=$(pwd)
PROJECT_DIR="$ROOT_DIR/test-project"

PATH="${ROOT_DIR}/internal/fuel-core/fuel-core-binaries:${PATH}"
PATH="${ROOT_DIR}/internal/forc/forc-binaries:${PATH}"

echo "1. Scaffold a new project with '$PUBLISHED_FUEL_PACKAGE_NAME@$PUBLISHED_NPM_TAG'"
if [ -d "$PROJECT_DIR" ]; then
  echo "Removing existing project directory '$PROJECT_DIR'"
  rm -rf $PROJECT_DIR
fi
pnpm create $PUBLISHED_FUEL_PACKAGE_NAME@$PUBLISHED_NPM_TAG $PROJECT_DIR --no-install

echo "2. Intialise the project"
cd $PROJECT_DIR
pnpm remove fuels
pnpm add $PUBLISHED_FUEL_PACKAGE_NAME@$PUBLISHED_NPM_TAG
pnpm --ignore-workspace install
cp .env.example .env.local

echo "3. Running UI tests"
cd $ROOT_DIR
PROJECT_DIR=$PROJECT_DIR sh ./scripts/tests-ui.sh
TEST_RESULT=$?

rm -rf $PROJECT_DIR

exit $TEST_RESULT
