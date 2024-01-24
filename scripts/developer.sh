#!/bin/bash

pnpm lint:package-jsons
pnpm forc:check
pnpm lint
pnpm test:validate
# pnpm test