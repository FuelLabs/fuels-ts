#!/bin/bash

set -euo pipefail

scripts/build-multicall.sh
pnpm forc build -p src/__test__/storage-test-contract
pnpm forc build -p src/__test__/call-test-contract
pnpm forc build -p src/__test__/token-test-contract/token_abi
pnpm forc build -p src/__test__/token-test-contract/token_contract
