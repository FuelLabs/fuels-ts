#!/bin/bash

# Run setup
pnpm services:run

echo $1

# Run test
if [ "$1" = "--coverage" ]; then
    pnpm test:coverage
    TEST_RESULT=$?
else
    pnpm test
    TEST_RESULT=$?
fi

# Run cleanup
pnpm services:clean

exit $TEST_RESULT