#!/usr/bin/env node

import { execSync } from 'child_process';
import { error } from 'console';

(() => {
  try {
    /**
     * This is the base command that has to run always.
     * Release CIs were failing when there were only empty changesets because we weren't running this command.
     * See more here: https://github.com/FuelLabs/fuels-ts/pull/1847
     */
    execSync(`changeset version`);

    // Invoke versions' prebuild script (will rewrite version files if needed)
    execSync(`pnpm -C packages/versions prebuild`);

    const versionsFilePath = `packages/versions/src/lib/getBuiltinVersions.ts`;

    const versionsChanged = !!execSync(`git status --porcelain ${versionsFilePath}`)
      .toString()
      .trim();

    if (versionsChanged) {
      execSync(`git add ${versionsFilePath}`);
      execSync(`git commit -m"ci(scripts): update versions"`);
    }
  } catch (err) {
    error(err.toString());
  }
})();
