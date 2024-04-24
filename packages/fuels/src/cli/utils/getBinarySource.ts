import chalk from 'chalk';

export const getBinarySource = (binaryPath?: string) => binaryPath ? 
  chalk.cyan('user-defined') :
  chalk.green('source');