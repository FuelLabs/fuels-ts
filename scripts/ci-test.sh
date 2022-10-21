#!/bin/bash

echo $PWD
cat ./services/fuel-core/Dockerfile

docker images ls
docker container ls
docker volume ls
docker ps

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
