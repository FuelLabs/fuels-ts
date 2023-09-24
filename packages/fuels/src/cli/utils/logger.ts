import chalk from 'chalk';

export const loggingConfig = {
  isDebugEnabled: false,
  isLoggingEnabled: true,
};

export function configureLogging(params: { isDebugEnabled: boolean; isLoggingEnabled: boolean }) {
  loggingConfig.isLoggingEnabled = params.isLoggingEnabled;
  loggingConfig.isDebugEnabled = params.isDebugEnabled && loggingConfig.isLoggingEnabled;
}

export function log(...data: unknown[]) {
  if (loggingConfig.isLoggingEnabled) {
    process.stdout.write(`${data.join(' ')}\n`);
  }
}

export function debug(...data: unknown[]) {
  if (loggingConfig.isDebugEnabled) {
    log(...data);
  }
}

export function logSection(...data: unknown[]) {
  if (loggingConfig.isLoggingEnabled) {
    log(chalk.green.bold(data.join(' ')));
  }
}

export function error(...data: unknown[]) {
  // TODO: consider throwing and exiting process
  log(chalk.red(data.join(' ')));
}
