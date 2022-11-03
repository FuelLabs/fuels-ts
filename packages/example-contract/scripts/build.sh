#!/bin/bash

set -euo pipefail

# We run install again to make sure fuelchain CLI is correct setup
# this issue ocorrus becuase the CLI tool is under the same monorepo
pnpm install
pnpm forc build
pnpm exec fuels typegen -i out/debug/example-contract-abi.json -o src/example-contract-types
