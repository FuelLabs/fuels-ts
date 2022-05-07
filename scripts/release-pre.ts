#!/usr/bin/env node

import fs from 'fs-extra';
import sh from 'shelljs';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

import { changeAllPkgJSON, resolveDir } from './utils/changePackages';

(async () => {
  const pkgjson = fs.readJSONSync(resolveDir('./package.json'));
  /**
   * Using yargs to get arguments from shell command
   */
  const argv = await yargs(hideBin(process.argv)).argv;
  const tag = argv.sha;
  const sha = argv.sha;
  const ref = argv.ref;
  const version = `0.0.0-${ref}-${(sha as string).slice(0, 8)}`;

  /**
   * Change all package.json inside ./packages and publish
   */
  await changeAllPkgJSON(version);
  sh.exec(`pnpm publish -r --tag=${tag} --no-git-checks --force`);
  await changeAllPkgJSON(pkgjson.version);
})();
