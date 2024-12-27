export const availablePackageManagers = ['pnpm', 'npm', 'bun'] as const;
export type PackageManager = (typeof availablePackageManagers)[number];

const runnableApplicator =
  (commandPrefix: string) =>
  (command: string = '') =>
    `${commandPrefix} ${command}`;

export const packageMangers: Record<
  PackageManager,
  {
    install: string;
    run: (command: string) => string;
    name: PackageManager;
  }
> = {
  pnpm: {
    install: 'pnpm install',
    run: runnableApplicator('pnpm'),
    name: 'pnpm',
  },
  npm: {
    install: 'npm install',
    run: runnableApplicator('npm run'),
    name: 'npm',
  },
  bun: {
    install: 'bun install',
    run: runnableApplicator('bun run'),
    name: 'bun',
  },
} as const;

export function getUserPkgManager(): PackageManager {
  const userAgent = process.env.npm_config_user_agent || '';

  if (userAgent.startsWith(packageMangers.pnpm.name)) {
    return packageMangers.pnpm.name;
  }

  if (userAgent.startsWith(packageMangers.bun.name)) {
    return packageMangers.bun.name;
  }

  return packageMangers.npm.name;
}

export const getPackageManager = () => {
  const packageManager = getUserPkgManager();

  return packageMangers[packageManager];
};
