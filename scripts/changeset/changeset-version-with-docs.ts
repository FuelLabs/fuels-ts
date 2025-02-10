#!/usr/bin/env node

import { execSync } from 'child_process';
import { error } from 'console';

(() => {
  try {
    /**
     * This is the base command that has to run always.
     *
     * Release CIs were failing when there were only empty changesets
     * because we weren't running this command.
     *
     * See more here:
     *  https://github.com/FuelLabs/fuels-ts/pull/1847
     */
    execSync(`changeset version`);

    /**
     * Invoke versions' build script (will rewrite version files if needed)
     * and build the versions package, so that fuels-typegen picks up the
     * new fuels version when generating the proxy contract below.
     */
    execSync(`pnpm -C packages/versions build`);

    // Invoke fuels' build:proxy script (will rewrite header versions in generated files)
    execSync(`pnpm -C packages/recipes build`);

    // Checks if the commands above generated git changes
    const versionsFilePath = `packages/versions/src/lib/getBuiltinVersions.ts`;
    const recipeDirPath = `packages/recipes/src`;

    const versionsChanged = !!execSync(`git status --porcelain ${versionsFilePath}`)
      .toString()
      .trim();

    const proxyChanged = !!execSync(`git status --porcelain ${recipeDirPath}`).toString().trim();

    // If they did, add and commit the changes
    if (versionsChanged || proxyChanged) {
      execSync(`git add ${versionsFilePath} ${recipeDirPath}`);
      execSync(`git commit -m"ci(scripts): update versions"`);
    }
  } catch (err) {
    error(err.toString());
  }
})();
