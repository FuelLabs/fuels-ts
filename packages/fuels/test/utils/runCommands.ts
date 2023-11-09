import { join } from 'path';

import { Commands } from '../../src';
import { run } from '../../src/cli';

/**
 * Paths
 */
export const fixturesDir = join(__dirname, '..', 'fixtures');

export const workspaceDir = join(fixturesDir, 'project');

export const contractsDir = join(workspaceDir, 'contracts');
export const contractsFooDir = join(contractsDir, 'foo');
export const scriptsDir = join(workspaceDir, 'scripts');
export const predicateDir = join(workspaceDir, 'predicate');

export const fooContractMainPath = join(contractsDir, 'foo', 'src', 'main.sw');

export const fuelsConfigPath = join(fixturesDir, 'fuels.config.ts');
export const generatedDir = join(fixturesDir, 'generated');
export const contractsJsonPath = join(generatedDir, 'contract-ids.json');
export const fooContractFactoryPath = join(
  generatedDir,
  'contracts',
  'factories',
  'FooBarAbi__factory.ts'
);

/**
 * Helper
 */
export async function runCommand(commandName: string, params: string[] = []) {
  // always `--silent` to avoid polluting tests output
  const argv = ['node', 'fuels', '--silent', commandName, '-p', fixturesDir].concat(params);
  return { argv, command: await run(argv) };
}

/**
 * Bundled flag combos
 */
export const initFlagsWorkspace = ['-w', workspaceDir, '-o', generatedDir];
export const initFlagsUseBuiltinBinaries = ['--use-builtin-forc', '--use-builtin-fuel-core'];
export const initFlagsAutoStartFuelCore = '--auto-start-fuel-core';
export const initFlagsDefault = [
  initFlagsWorkspace,
  initFlagsUseBuiltinBinaries,
  initFlagsAutoStartFuelCore,
];
export const buildFlagsDeploy = '--deploy';

/**
 * Command callers
 */
export async function runInit(flags: string[] = initFlagsDefault.flat()) {
  return runCommand(Commands.init, flags);
}

export async function runBuild(flags: string[] = []) {
  return runCommand(Commands.build, flags);
}

export async function runDeploy() {
  return runCommand(Commands.deploy);
}

export async function runDev() {
  return runCommand(Commands.dev);
}
