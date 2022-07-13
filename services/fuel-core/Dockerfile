FROM ghcr.io/fuellabs/fuel-core:v0.9.2

ARG IP=0.0.0.0
ARG PORT=4000
ARG MIN_GAS_PRICE=0
ARG MIN_BYTE_PRICE=0
ARG DB_PATH=./mnt/db/

ENV IP="${IP}"
ENV PORT="${PORT}"
ENV DB_PATH="${DB_PATH}"
ENV MIN_GAS_PRICE="${MIN_GAS_PRICE}"
ENV MIN_BYTE_PRICE="${MIN_BYTE_PRICE}"

WORKDIR /root/

COPY chainConfig.json .

# https://stackoverflow.com/a/44671685
# https://stackoverflow.com/a/40454758
# hadolint ignore=DL3025
CMD exec ./fuel-core \
    --ip ${IP} \
    --port ${PORT} \
    --db-path ${DB_PATH} \
    --utxo-validation \
    --min-gas-price ${MIN_GAS_PRICE} \
    --min-byte-price ${MIN_BYTE_PRICE} \
    --vm-backtrace \
    --chain ./chainConfig.json

EXPOSE ${PORT}
