#!/bin/sh

# forc build -o src/MyContract.bin
# forc json-abi | npx prettier --parser json | jq 'del(.[].inputs[0], .[].inputs[1], .[].inputs[2])' > src/MyContract.json
npx typechain --target=scripts/typechain-target.js --out-dir=src/MyContract-types src/MyContract.json
# forc parse-bytecode src/MyContract.bin > src/MyContract.txt
