#!/usr/bin/env node

import sh from 'shelljs';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';

(async () => {
  const argv = await yargs(hideBin(process.argv)).argv;
  const tag = argv.tag;

  sh.exec(`pnpm publish -r --tag=${tag} --no-git-checks --force`);
})();
