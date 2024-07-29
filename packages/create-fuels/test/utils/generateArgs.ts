export const generateArgs = (
  projectName?: string,
  packageManager: string = 'pnpm',
  template?: string
): string[] => {
  const args = [];
  if (packageManager === 'npm') {
    args.push('--');
  }
  if (projectName) {
    args.push(projectName);
  }
  if (template) {
    args.push(`--template`);
    args.push(template);
  }
  args.push(`--${packageManager}`);
  args.push(`--no-install`);
  return args;
};

export const generateArgv = (
  projectName?: string,
  packageManager: string = 'pnpm',
  template?: string
): string[] => ['', '', ...generateArgs(projectName, packageManager, template)];
