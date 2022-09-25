#!/bin/bash

set -euo pipefail

# scripts/build-multicall.sh
pnpm forc build -p src/__test__/storage-test-contract --generate-logged-types
pnpm forc build -p src/__test__/call-test-contract --generate-logged-types
pnpm forc build -p src/__test__/token-test-contract/token_abi --generate-logged-types
pnpm forc build -p src/__test__/token-test-contract/token_contract --generate-logged-types
pnpm forc build -p src/__test__/generic-types-contract --generate-logged-types
pnpm forc build -p src/__test__/coverage-contract --generate-logged-types
pnpm exec fuelchain --target=../typechain-target-fuels --out-dir=src/__test__/coverage-contract-types src/__test__/coverage-contract/out/debug/coverage-contract-abi.json
