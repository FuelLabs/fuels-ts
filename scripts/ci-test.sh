#!/bin/bash

# Run setup
pnpm services:run
echo $@

# Run test
if [[ "$*" == *"--coverage"* ]]; then
    pnpm test /fuel-gauge/src/contract.test.ts
    TEST_RESULT=$?
else
    pnpm test /fuel-gauge/src/contract.test.ts
    TEST_RESULT=$?
fi

# Run cleanup
pnpm services:clean

exit $TEST_RESULT
