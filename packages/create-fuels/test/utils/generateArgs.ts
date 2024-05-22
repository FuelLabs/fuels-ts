import type { ProgramsToInclude } from '../../src/cli';

export const generateArgs = (
  programsToInclude: ProgramsToInclude,
  projectName?: string,
  packageManager: string = 'pnpm'
): string[] => {
  const args = [];
  if (projectName) {
    args.push(projectName);
  }
  if (programsToInclude.contract) {
    args.push('-c');
  }
  if (programsToInclude.predicate) {
    args.push('-p');
  }
  if (programsToInclude.script) {
    args.push('-s');
  }
  args.push(`--${packageManager}`);
  return args;
};

export const generateArgv = (
  programsToInclude: ProgramsToInclude,
  projectName?: string
): string[] => ['', '', ...generateArgs(programsToInclude, projectName)];
