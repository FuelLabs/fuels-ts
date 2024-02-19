#!/usr/bin/env node
import chalk from 'chalk';
import { log } from 'console';

import { runScaffoldCli } from './cli';

runScaffoldCli()
  .then(() => process.exit(0))
  .catch((e) => {
    log(chalk.red(e));
    process.exit(1);
  });
