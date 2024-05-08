import prompts from 'prompts';

export const promptForPackageManager = async () => {
  const packageManagerInput = await prompts(
    {
      type: 'select',
      name: 'packageManager',
      message: 'Select a package manager',
      choices: [
        { title: 'pnpm', value: 'pnpm' },
        { title: 'npm', value: 'npm' },
      ],
      initial: 0,
    },
    { onCancel: () => process.exit(0) }
  );
  return packageManagerInput.packageManager as string;
};
