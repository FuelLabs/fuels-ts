#!/usr/bin/env node
import chalk from 'chalk';
import { log } from 'console';

import { runScaffoldCli } from './cli';

runScaffoldCli()
  .then(() => process.exit(0))
  .catch(() => {
    log(chalk.red('An error occurred while scaffolding the project. Exiting...'));
  });
