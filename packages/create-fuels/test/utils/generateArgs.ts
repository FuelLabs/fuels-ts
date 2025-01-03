export const generateArgs = ({
  projectName,
  packageManager = 'pnpm',
  template,
}: {
  projectName?: string;
  packageManager: string;
  template?: string;
}): string[] => {
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
  args.push(`--no-install`);
  return args;
};

export const generateArgv = ({
  projectName,
  packageManager = 'pnpm',
  template,
}: {
  projectName?: string;
  packageManager?: string;
  template?: string;
}): string[] => ['', '', ...generateArgs({ projectName, packageManager, template })];
