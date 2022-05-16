#!/bin/bash

set -euo pipefail

scripts/build-contract-call-script.sh
forc build -p src/storage-test-contract
forc build -p src/call-test-contract
forc build -p src/token-test-contract/token_abi
forc build -p src/token-test-contract/token_contract
