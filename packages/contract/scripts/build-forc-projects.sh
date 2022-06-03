#!/bin/bash

set -euo pipefail

scripts/build-contract-call-script.sh
pnpm forc build -p src/storage-test-contract
pnpm forc build -p src/call-test-contract
pnpm forc build -p src/token-test-contract/token_abi
pnpm forc build -p src/token-test-contract/token_contract
