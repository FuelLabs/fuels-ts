#!/usr/bin/env node

import { execSync } from 'child_process';

(() => {
  // Update
  execSync(`pnpm --filter @internal/forc run update`);

  // Remove lockfiles so latest stdlib can be used
  execSync(`rm packages/**/Forc.lock`);

  // Run all tasks that use Forc
  execSync(`pnpm execSync turbo run prebuild --force`);
})();
