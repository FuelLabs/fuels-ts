#!/usr/bin/env node

import sh from 'shelljs';

(() => {
  // Commit versions generated at pre-build step
  sh.exec(`pnpm -C packages/versions prebuild`);
  sh.exec(`git add packages/versions/src/lib/getSupportedVersions.ts`);
  sh.exec(`git commit -m"ci(scripts): update versions"`);

  // run changeset version
  sh.exec(`changeset version`);
})();
