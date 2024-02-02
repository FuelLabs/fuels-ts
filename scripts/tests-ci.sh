#!/bin/bash

pkill fuel-core

pnpm node:clean

pnpm node:run > /dev/null 2>&1 &

echo "Started Fuel-Core node in background."

if [[ "$*" == *"--browser"* ]]; then
    FORC_IMPLICIT_STD_GIT_BRANCH=xunilrj/v0.49.2 pnpm test:browser
    TEST_RESULT=$?
elif [[ "$*" == *"--node"* ]]; then
    FORC_IMPLICIT_STD_GIT_BRANCH=xunilrj/v0.49.2 pnpm test
    TEST_RESULT=$?
else
    FORC_IMPLICIT_STD_GIT_BRANCH=xunilrj/v0.49.2 pnpm test
    TEST_RESULT=$?
fi

echo "Killing Fuel-Core node."

pkill fuel-core

pnpm node:clean

exit $TEST_RESULT
