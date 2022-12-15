#!/bin/bash

# Run setup
pnpm services:run
echo $@

# Run test
if [[ "$*" == *"--coverage"* ]]; then
    pnpm test:turbo $@
    TEST_RESULT=$?
else
    pnpm test:turbo
    TEST_RESULT=$?
fi

# Run cleanup
pnpm services:clean

exit $TEST_RESULT
