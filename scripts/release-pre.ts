#!/usr/bin/env node

import sh from 'shelljs';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { changeAllPkgJSON, restorePkgJson } from './utils/changePackages';

(async () => {
  /**
   * Using yargs to get arguments from shell command
   */
  const argv = await yargs(hideBin(process.argv)).argv;
  const tag = argv.sha;
  const sha = argv.sha;
  const ref = argv.ref;
  const registry = argv.registry as string;
  const version = `0.0.0-${ref}-${(sha as string).slice(0, 8)}`;

  /**
   * Change all package.json inside ./packages and publish
   */
  await changeAllPkgJSON(version, registry);
  sh.exec(`pnpm publish -r --tag=${tag} --no-git-checks --force`);

  /**
   * Restore all package.json files
   */
  await restorePkgJson();
})();
