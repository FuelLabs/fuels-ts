import chalk from 'chalk';
import { log } from 'console';

import { runScaffoldCli, setupProgram } from './cli';

runScaffoldCli({
  program: setupProgram(),
  templateName: 'nextjs',
  args: process.argv,
})
  .then(() => process.exit(0))
  .catch((e) => {
    log(chalk.red(e));
    process.exit(1);
  });
