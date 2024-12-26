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

export function getUserPkgManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent || '';

  if (userAgent.startsWith('pnpm')) {
    return 'pnpm';
  }

  if (userAgent.startsWith('bun')) {
    return 'bun';
  }

  return 'npm';
}

export const getPackageManager = () => {
  const packageManager = getUserPkgManager();

  return packageMangers[packageManager];
};
