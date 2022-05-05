#!/usr/bin/env node

import fs from 'fs-extra';
import prompts from 'prompts';
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
   * Restore dependencies versions and publish packages
   */
  await restorePkgJson(true);
  const lernaJSON = await fs.readJSON(resolveDir('./lerna.json'));
  const version = `v${lernaJSON.version}`;

  const response = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `Do you really want to bump to ${version}?`,
  });

  /**
   * If confirm: publish using pnpm, Commit changed files and create a new tag
   */
  if (response.confirm) {
    sh.exec(`pnpm publish -r --tag=latest --no-git-checks --force`);
    sh.exec('git add ./CHANGELOG.md');
    sh.exec('git add ./package.json');
    sh.exec('git add ./lerna.json');
    sh.exec('git add ./packages/**/CHANGELOG.md');
    sh.exec('git add ./packages/**/package.json');
    sh.exec(`git commit -m "bump to version ${version}"`);
    sh.exec(`git tag -a ${version} -m "bump to version ${version}"`);
    sh.exec('git push origin master --tags');
  }
})();
