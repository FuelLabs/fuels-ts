#!/bin/bash

(cd templates/nextjs && pnpm run fuels:dev) &
cp templates/nextjs/.env.example templates/nextjs/.env.local
(cd templates/nextjs && pnpm run dev) &
pnpm exec playwright install --with-deps
pnpm exec playwright test