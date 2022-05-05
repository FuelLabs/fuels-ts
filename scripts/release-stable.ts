#!/usr/bin/env node

import fs from 'fs-extra';
import sh from 'shelljs';

import { resolveDir, changeAllPkgJSON, restorePkgJson } from './utils/changePackages';

(async () => {
  const mainPkgJSON = await fs.readJSON(resolveDir('./package.json'));

  /**
   * Change all package.json with the version from main package.json
   * Run lerna to generate changelogs and bump version based on conventional commits
   */
  await changeAllPkgJSON(mainPkgJSON.version);
  const args = `--conventional-commits --no-push --no-git-tag-version --no-commit-hooks --no-ignore-changes --yes`;
  sh.exec(`pnpm lerna version ${args}`);

  /**
   * Restore dependencies versions, commit new version and create a git tag
   */
  const lernaJSON = await fs.readJSON(resolveDir('./lerna.json'));
  const version = `v${lernaJSON.version}`;
  await restorePkgJson(true);
  sh.exec(`git add . && git commit -m "bump to version ${version}"`);
  sh.exec(`git tag -a ${version}`);

  /**
   * Publish all packages to npm
   */
  sh.exec(`pnpm publish -r --tag=latest`);
})();
