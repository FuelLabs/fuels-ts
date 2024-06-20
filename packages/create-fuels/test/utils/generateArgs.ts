export const generateArgs = (projectName?: string, packageManager: string = 'pnpm'): string[] => {
  const args = [];
  if (projectName) {
    args.push(projectName);
  }
  args.push(`--${packageManager}`);
  return args;
};

export const generateArgv = (projectName?: string, packageManager: string = 'pnpm'): string[] => [
  '',
  '',
  ...generateArgs(projectName, packageManager),
];
