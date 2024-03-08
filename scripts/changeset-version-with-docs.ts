#!/usr/bin/env node

import { execSync } from 'child_process';
import { error } from 'console';

(() => {
  try {
    // Invoke versions' prebuild script (will rewrite version files if needed)
    execSync(`pnpm -C packages/versions prebuild`);

    const versionsChanged = !!execSync(`git status --porcelain`).toString().trim();

    if (versionsChanged) {
      execSync(`git add packages/versions/src/lib/getBuiltinVersions.ts`);
      execSync(`git commit -m"ci(scripts): update versions"`);
    }

    execSync(`changeset version`);
  } catch (err) {
    error(err.toString());
  }
})();
