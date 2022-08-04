#!/bin/bash

set -euo pipefail

scripts/build-multicall.sh
forc build -p src/__test__/storage-test-contract
forc build -p src/__test__/call-test-contract
forc build -p src/__test__/token-test-contract/token_abi
forc build -p src/__test__/token-test-contract/token_contract
pnpm forc build -p src/__test__/generic-types-contract
