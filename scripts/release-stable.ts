#!/usr/bin/env node

import fs from 'fs-extra';
import sh from 'shelljs';

import { resolveDir, changeAllPkgJSON, restorePkgJson } from './utils/changePackages';

(async () => {
  const mainPkgJSON = await fs.readJSON(resolveDir('./package.json'));

  /**
   * Change all package.json with the version from main pakage.json
   * Run lerna to generate changelog and bump version based on conventional commits
   */
  await changeAllPkgJSON(mainPkgJSON.version);
  sh.exec('npx lerna version --conventional-commits --no-push');
  sh.exec('npx lerna publish from-git');
  await restorePkgJson();
})();
