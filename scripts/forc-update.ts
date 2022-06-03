#!/usr/bin/env node

import sh from 'shelljs';

(async () => {
  // Update
  sh.exec(`pnpm --filter forc-bin run update`);

  // Remove lockfiles so latest stdlib can be used
  sh.exec(`rm packages/**/Forc.lock`);

  // Build
  sh.exec(`pnpm build`);
})();
