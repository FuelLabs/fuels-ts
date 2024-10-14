#!/bin/bash

ROOT_DIR=$(pwd)
cd $ROOT_DIR/templates/vite/sway-programs && ls && pnpm fuels-forc test
cd $ROOT_DIR/templates/nextjs/sway-programs && pnpm forc test
cd $ROOT_DIR/apps/create-fuels-counter-guide/sway-programs && pnpm forc test