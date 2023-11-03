#!/usr/bin/env node

import { execSync } from 'child_process';

(() => {
  // Commit versions generated at pre-build step
  execSync(`pnpm -C packages/versions prebuild`);
  execSync(`git add packages/versions/src/lib/getBuiltinVersions.ts`);
  execSync(`git commit -m"ci(scripts): update versions"`);

  // run changeset version
  execSync(`changeset version`);
})();
