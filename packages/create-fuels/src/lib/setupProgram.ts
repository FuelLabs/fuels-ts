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
    .option('--pnpm', 'Use pnpm to install dependencies')
    .option('--npm', 'Use npm to install dependencies')
    .option('--bun', 'Use bun to install dependencies')
    .option('--verbose', 'Enable verbose logging')
    .addHelpCommand()
    .showHelpAfterError(true);
  return program;
};
