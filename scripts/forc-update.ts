#!/usr/bin/env node

import sh from 'shelljs';

// eslint-disable-next-line @typescript-eslint/require-await
(async () => {
  // Update
  sh.exec(`pnpm --filter forc-bin run update`);

  // Remove lockfiles so latest stdlib can be used
  sh.exec(`rm packages/**/Forc.lock`);

  // Run all tasks that use Forc
  sh.exec(`pnpm exec turbo run prebuild --force`);
})();
