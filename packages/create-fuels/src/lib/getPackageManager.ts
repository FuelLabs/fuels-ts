import { promptForPackageManager } from '../prompts';
import { warn } from '../utils/logger';

import type { ProgramOptions } from './setupProgram';

export const availablePackageManagers = ['pnpm', 'npm', 'bun'] as const;
export type PackageManager = (typeof availablePackageManagers)[number];

const runnableApplicator =
  (commandPrefix: string) =>
  (command: string = '') =>
    `${commandPrefix} ${command}`;

export const packageMangers = {
  pnpm: {
    install: 'pnpm install',
    run: runnableApplicator('pnpm'),
  },
  npm: {
    install: 'npm install',
    run: runnableApplicator('npm run'),
  },
  bun: {
    install: 'bun install',
    run: runnableApplicator('bun run'),
  },
} as const;

export const getPackageManager = async (opts: ProgramOptions) => {
  const packageMangerOpts = {
    pnpm: opts.pnpm,
    npm: opts.npm,
    bun: opts.bun,
  };

  const cliChosenPackageManagerSelected = Object.entries(packageMangerOpts)
    .filter(([, v]) => v)
    .map(([k]) => k) as PackageManager[];

  let packageManager: PackageManager | undefined = cliChosenPackageManagerSelected[0];
  if (cliChosenPackageManagerSelected.length > 1) {
    warn('More than one package manager was selected.');
  }
  if (cliChosenPackageManagerSelected.length !== 1) {
    packageManager = await promptForPackageManager();
  }

  if (!packageManager) {
    packageManager = 'pnpm';
  }
  return packageMangers[packageManager];
};
