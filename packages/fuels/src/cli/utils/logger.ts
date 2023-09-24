import chalk from 'chalk';

export const loggingConfig = {
  isDebugEnabled: false,
  isLoggingEnabled: true,
};

export function configureLogging(params: { isDebugEnabled: boolean; isLoggingEnabled: boolean }) {
  loggingConfig.isDebugEnabled = params.isDebugEnabled;
  loggingConfig.isLoggingEnabled = params.isLoggingEnabled;
}

export function log(...data: unknown[]) {
  if (!loggingConfig.isLoggingEnabled || !loggingConfig.isDebugEnabled) {
    return;
  }
  process.stdout.write(`${data.join(' ')}\n`);
}

export function logSection(...data: unknown[]) {
  if (!loggingConfig.isLoggingEnabled) {
    return;
  }
  log('\n', chalk.green.bold(data.join(' ')), '\n');
}

export function error(...data: unknown[]) {
  // TODO: consider throwing and exiting process
  log('\n', chalk.red(data.join(' ')));
}
