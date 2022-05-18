#!/bin/bash

set -euo pipefail

# TODO: Enable this and ignore generated files when we can use forc during `npm i`: https://github.com/FuelLabs/fuels-ts/issues/282
# forc build
pnpm exec typechain --target=../typechain-target-fuels --out-dir=src/example-contract-types out/debug/example-contract-abi.json
