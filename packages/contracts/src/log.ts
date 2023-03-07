import chalk from 'chalk';

export function log(...data: unknown[]) {
  process.stdout.write(`${data.join(' ')}\n`);
}

export function logSection(...data: unknown[]) {
  log('\n', chalk.green.bold(data.join(' ')), '\n');
}

export function error(...data: unknown[]) {
  const { error: logger } = console;
  logger(...data);
}
