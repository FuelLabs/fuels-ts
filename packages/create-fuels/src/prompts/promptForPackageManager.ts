import prompts from 'prompts';

import type { PackageManager } from '../lib/getPackageManager';

export const promptForPackageManager = async (): Promise<PackageManager | undefined> => {
  const packageManagerInput = await prompts(
    {
      type: 'select',
      name: 'packageManager',
      message: 'Select a package manager',
      choices: [
        { title: 'pnpm', value: 'pnpm' },
        { title: 'npm', value: 'npm' },
        { title: 'bun', value: 'bun' },
      ],
      initial: 0,
    },
    { onCancel: () => process.exit(0) }
  );
  return packageManagerInput.packageManager as PackageManager;
};
