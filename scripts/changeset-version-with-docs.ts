#!/usr/bin/env node

import { execSync } from 'child_process';
import { error } from 'console';

(() => {
  try {
    // Invoke versions' prebuild script (will rewrite version files if needed)
    execSync(`pnpm -C packages/versions prebuild`);

    // Checks git status
    const isGitClean = !execSync(`git status --porcelain`).toString().trim();

    // Skip adding/committing/releasing stuff if there's notthing there
    if (!isGitClean) {
      execSync(`git add packages/versions/src/lib/getBuiltinVersions.ts`);
      execSync(`git commit -m"ci(scripts): update versions"`);

      // Run changeset version
      execSync(`changeset version`);
    }
  } catch (err) {
    error(err.toString());
  }
})();
