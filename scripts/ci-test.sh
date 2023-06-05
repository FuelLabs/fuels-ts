#!/bin/bash

# Run cleanup
pnpm services:clean

# Run setup
pnpm services:run
echo $@

# Run test
if [[ "$*" == *"--coverage"* ]]; then
    pnpm test $@
    TEST_RESULT=$?
else
    pnpm test
    TEST_RESULT=$?
fi

# Run cleanup
pnpm services:clean

exit $TEST_RESULT
