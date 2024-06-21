export const generateArgs = (projectName?: string, packageManager: string = 'pnpm'): string[] => {
  const args = [];
  if (packageManager === 'npm') {
    args.push('--');
  }
  if (projectName) {
    args.push(projectName);
  }
  args.push(`--${packageManager}`);
  args.push(`--no-install`);
  return args;
};

export const generateArgv = (projectName?: string, packageManager: string = 'pnpm'): string[] => [
  '',
  '',
  ...generateArgs(projectName, packageManager),
];
