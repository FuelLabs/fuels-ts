import { Command } from 'commander';

import packageJson from '../../package.json';

export type Template = 'nextjs' | 'vite';
export const templates: Set<Template> = new Set(['nextjs', 'vite']);
export const defaultTemplate: Template = 'vite';

export interface ProgramOptions {
  contract?: boolean;
  predicate?: boolean;
  script?: boolean;
  verbose?: boolean;
  install?: boolean;
  template?: Template;
}

export const setupProgram = () => {
  const program = new Command(packageJson.name)
    .version(packageJson.version)
    .arguments('[projectDirectory]')
    .option('--verbose', 'Enable verbose logging')
    .option('--no-install', 'Do not install dependencies')
    .option('--template <template>', 'Specify a template to use', defaultTemplate)
    .showHelpAfterError(true);
  return program;
};
