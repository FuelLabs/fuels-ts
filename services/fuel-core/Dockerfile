FROM ghcr.io/fuellabs/fuel-core:v0.6.3

ARG IP=0.0.0.0
ARG PORT=4000
ARG DB_PATH=./mnt/db/

ENV IP="${IP}"
ENV PORT="${PORT}"
ENV DB_PATH="${DB_PATH}"

WORKDIR /root/

COPY chainConfig.json .

# https://stackoverflow.com/a/44671685
# https://stackoverflow.com/a/40454758
# hadolint ignore=DL3025
CMD exec ./fuel-core --ip ${IP} --port ${PORT} --db-path ${DB_PATH} --chain ./chainConfig.json

EXPOSE ${PORT}
