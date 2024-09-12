#!/bin/bash

cd templates/vite/sway-programs && pnpm fuels-forc test
cd templates/nextjs/sway-programs && pnpm forc test
cd apps/create-fuels-counter-guide/sway-programs && pnpm forc test