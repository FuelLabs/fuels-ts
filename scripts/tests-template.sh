#!/bin/bash

cd templates/vite && pnpm run test:all
cd templates/nextjs && pnpm run test:all
cd apps/create-fuels-counter-guide && pnpm run test:all
