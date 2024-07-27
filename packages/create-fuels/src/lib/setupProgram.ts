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
  install?: boolean;
}

export const setupProgram = () => {
  const program = new Command(packageJson.name)
    .version(packageJson.version)
    .arguments('[projectDirectory]')
    .option('--pnpm', 'Use pnpm to install dependencies')
    .option('--npm', 'Use npm to install dependencies')
    .option('--bun', 'Use bun to install dependencies')
    .option('--verbose', 'Enable verbose logging')
    .option('--no-install', 'Do not install dependencies')
    .addHelpCommand()
    .showHelpAfterError(true);
  return program;
};
