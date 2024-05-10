import chalk from 'chalk';

export const getBinarySource = (useBuiltIn: boolean) =>
  ({
    true: chalk.cyan('built-in'),
    false: chalk.green('source'),
  })[`${useBuiltIn}`];
