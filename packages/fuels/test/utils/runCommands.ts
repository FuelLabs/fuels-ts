import { existsSync, rmSync } from 'fs';
import { join } from 'path';

import { Commands } from '../../src';
import { run } from '../../src/cli';

export const fixtures = join(__dirname, '..', 'fixtures');

export const workspace = join(fixtures, 'project');
export const fooContractSway = join(workspace, 'foo', 'src', 'main.sw');

export const fuelsConfig = join(fixtures, 'fuels.config.ts');
export const generated = join(fixtures, 'generated');
export const contractsJson = join(generated, 'contracts.json');
export const fooContractTs = join(generated, 'contracts', 'factories', 'FooBarAbi__factory.ts');

export async function runCommand(commandName: string, params: string[] = []) {
  const argv = ['node', 'fuels', '--silent', commandName, '-p', fixtures].concat(params);
  return { argv, command: await run(argv) };
}

export const flagsUseBuiltinBinaries = ['--use-builtin-forc', '--use-builtin-fuel-core'];
export const flagsAutoStartFuelCore = '--auto-start-fuel-core';
export const flagsDefault = [flagsUseBuiltinBinaries, flagsAutoStartFuelCore].flat();

export async function runInit(extraFlags: string[] = flagsDefault) {
  return runCommand(Commands.init, ['-w', workspace, '-o', generated, extraFlags].flat());
}

export async function runBuild() {
  return runCommand(Commands.build);
}

export async function runDeploy() {
  return runCommand(Commands.deploy);
}

export async function runDev() {
  return runCommand(Commands.dev);
}

export function clean() {
  if (existsSync(fuelsConfig)) {
    rmSync(fuelsConfig);
  }
  if (existsSync(generated)) {
    rmSync(generated, { recursive: true });
  }
}
