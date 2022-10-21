#!/bin/bash

echo "-------------------------"
echo $PWD
echo "----"
ls -la
echo "----"
cat ./packages/forc-bin/package.json
echo "----"
cat ./services/fuel-core/Dockerfile

echo "-------------------------"


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
