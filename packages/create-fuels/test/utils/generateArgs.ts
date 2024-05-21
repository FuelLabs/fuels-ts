import type { ProgramsToInclude } from "../../src/cli";

const defaultFlags = ['--pnpm'];

export const generateArgs = (programsToInclude: ProgramsToInclude, projectName?: string) => {
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
  args.push(...defaultFlags);
  return args;
};

export const generateArgv = (programsToInclude: ProgramsToInclude, projectName?: string) => ['', '', ...generateArgs(programsToInclude, projectName)];
