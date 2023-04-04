# This script mimics what the Dockerfile does, but
# using your local `fuel-core` instead of Docker.

IP=0.0.0.0
PORT=4000
MIN_GAS_PRICE=0

# This is the private key of the consensus.PoA.signing_key in the chainConfig.json
# this key is responsible for validating the transactions
CONSENSUS_KEY=0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298

fuel-core run \
    --in-memory \
    --ip ${IP} \
    --port ${PORT} \
    --min-gas-price ${MIN_GAS_PRICE} \
    --vm-backtrace \
    --poa-instant=true \
    --consensus-key ${CONSENSUS_KEY} \
    --utxo-validation \
    --chain ./chainConfig.json
