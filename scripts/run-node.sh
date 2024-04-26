#!/bin/bash

# The `--consensus-key` is the private key of the `consensus.PoA.signing_key` in
# the `chainConfig.json`. This key is responsible for validating the transactions

mkdir -p .fuel-core/db

cp ./packages/utils/src/utils/chainConfig.json .fuel-core/configs/chainConfig.json
cp ./packages/utils/src/utils/metadata.json .fuel-core/configs/metadata.json
cp ./packages/utils/src/utils/stateConfig.json .fuel-core/configs/stateConfig.json

pnpm fuels-core run \
    --db-path .fuel-core/db \
    --consensus-key 0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298 \
    --snapshot .fuel-core/configs \
    --poa-instant true \
    --min-gas-price 1 \
    --vm-backtrace \
    --utxo-validation \
    --debug
