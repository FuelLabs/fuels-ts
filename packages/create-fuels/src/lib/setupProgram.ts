import { Command } from 'commander';

import packageJson from '../../package.json';

export interface ProgramOptions {
  contract?: boolean;
  predicate?: boolean;
  script?: boolean;
  pnpm?: boolean;
  npm?: boolean;
  bun?: boolean;
  verbose?: boolean;
}

export const setupProgram = () => {
  const program = new Command(packageJson.name)
    .version(packageJson.version)
    .arguments('[projectDirectory]')
    .option('-c, --contract', 'Include contract program')
    .option('-p, --predicate', 'Include predicate program')
    .option('-s, --script', 'Include script program')
    .option('--pnpm', 'Use pnpm as the package manager')
    .option('--npm', 'Use npm as the package manager')
    .option('--bun', 'Use bun as the package manager')
    .option('--verbose', 'Enable verbose logging')
    .addHelpCommand()
    .showHelpAfterError(true);
  return program;
};
