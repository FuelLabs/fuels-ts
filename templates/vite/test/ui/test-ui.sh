#!/bin/bash

# This script installs the necessary dependencies for the UI tests and runs them.

pnpm exec playwright install --with-deps  > /dev/null 2>&1
pnpm exec playwright test
TEST_RESULT=$?

exit $TEST_RESULT