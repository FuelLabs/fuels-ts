#!/usr/bin/env node
import chalk from 'chalk';
import { log } from 'console';

import { runScaffoldCli, setupProgram } from './cli';

log('process.argv', process.argv);

runScaffoldCli({
  program: setupProgram(),
  args: process.argv,
  shouldInstallDeps: true,
})
  .then(() => process.exit(0))
  .catch((e) => {
    log(chalk.red(e));
    process.exit(1);
  });
