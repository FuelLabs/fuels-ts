#!/bin/bash

# The `--consensus-key` is the private key of the `consensus.PoA.signing_key` in
# the `chainConfig.json`. This key is responsible for validating the transactions

mkdir -p .fuel-core/db

cp ./packages/utils/src/utils/chainConfig.json .fuel-core/configs/chainConfig.json

pnpm fuels-core run \
    --db-path .fuel-core/db \
    --consensus-key 0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298 \
    --chain .fuel-core/configs/chainConfig.json \
    --poa-instant true \
    --min-gas-price 1 \
    --vm-backtrace \
    --debug
