#!/bin/bash

set -euo pipefail

# We run install again to make sure fuelchain CLI is correct setup
# this issue ocorrus becuase the CLI tool is under the same monorepo
pnpm install
pnpm forc build --generate-logged-types
pnpm exec fuelchain --target=../typechain-target-fuels --out-dir=src/example-contract-types out/debug/example-contract-abi.json
