#!/bin/bash

set -euo pipefail

forc build -p src/contract-call-script
pnpm exec ts-node scripts/process-contract-call-script.ts
