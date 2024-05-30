#!/bin/bash

npx create-fuels@next create-fuels-integration-test-project -c -p -s --pnpm
(cd test-project && pnpm run fuels:dev) &
cp test-project/.env.example test-project/.env.local
(cd test-project && pnpm run dev) &
pnpm exec playwright install --with-deps
pnpm exec playwright test