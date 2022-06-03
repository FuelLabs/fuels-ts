#!/bin/bash

set -euo pipefail

pnpm forc build
pnpm exec typechain --target=../typechain-target-fuels --out-dir=src/example-contract-types out/debug/example-contract-abi.json
