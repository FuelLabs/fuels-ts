#!/bin/bash

set -euo pipefail

pnpm exec forc build -p ./test-projects;
pnpm exec ts-node scripts/process-predicate.ts;