#!/usr/bin/env node

import { execSync } from 'child_process';
import { error } from 'console';
import { existsSync } from 'fs';

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

    // Invoke recipes build script (will rewrite header versions in generated files)
    execSync(`pnpm -C packages/recipes build`);

    // Checks if the commands above generated git changes
    const versionsFilePath = `packages/versions/src/lib/getBuiltinVersions.ts`;
    const recipeDirPath = `packages/recipes/src`;

    // Ensure paths exist
    const paths = [versionsFilePath, recipeDirPath];
    if (!paths.every(existsSync)) {
      throw new Error(
        `Paths do not exist: ${paths.filter((path) => !existsSync(path)).join(', ')}`
      );
    }

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
    process.exit(1);
  }
})();
