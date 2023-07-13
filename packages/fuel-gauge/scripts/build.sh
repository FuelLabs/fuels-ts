#!/bin/bash

set -euo pipefail

pnpm exec forc build -p ./test-projects;
pnpm exec tsx scripts/process-predicates.ts;