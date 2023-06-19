FROM ghcr.io/fuellabs/fuel-core:v0.18.1

ENV IP="0.0.0.0"
ENV PORT="4000"
ENV DB_PATH="./mnt/db/"
ENV MIN_GAS_PRICE="0"

# This is the private key of the consensus.PoA.signing_key in the chainConfig.json
# this key is responsible for validating the transactions
ENV CONSENSUS_KEY="0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298"

WORKDIR /root/

COPY chainConfig.json .

# https://stackoverflow.com/a/44671685
# https://stackoverflow.com/a/40454758
# hadolint ignore=DL3025
CMD exec ./fuel-core run \
    --ip ${IP} \
    --port ${PORT} \
    --db-path ${DB_PATH} \
    --min-gas-price ${MIN_GAS_PRICE} \
    --vm-backtrace \
    --poa-instant=true \
    --consensus-key ${CONSENSUS_KEY} \
    --utxo-validation \
    --chain ./chainConfig.json \
    --manual_blocks_enabled

EXPOSE ${PORT}
