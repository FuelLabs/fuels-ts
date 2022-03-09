#!/bin/sh

# TODO: Enable this and ignore generated files when we can use forc during `npm i`
# forc build
npx typechain --target=fuels --out-dir=src/example-contract-types out/debug/example-contract-abi.json
