FROM ghcr.io/fuellabs/fuel-core:v0.17.3

ARG IP=0.0.0.0
ARG PORT=4000
ARG MIN_GAS_PRICE=0
ARG DB_PATH=./mnt/db/

# This is the private key of the consensus.PoA.signing_key in the chainConfig.json
# this key is responsible for validating the transactions
ARG CONSENSUS_KEY=0xa449b1ffee0e2205fa924c6740cc48b3b473aa28587df6dab12abc245d1f5298

ENV IP="${IP}"
ENV PORT="${PORT}"
ENV DB_PATH="${DB_PATH}"
ENV MIN_GAS_PRICE="${MIN_GAS_PRICE}"
ENV CONSENSUS_KEY="${CONSENSUS_KEY}"

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
    --chain ./chainConfig.json

EXPOSE ${PORT}
