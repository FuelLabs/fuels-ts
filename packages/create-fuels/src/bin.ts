#!/usr/bin/env node
import { log } from 'console';
import chalk from 'chalk';

import { runScaffoldCli, setupProgram } from './cli';

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
