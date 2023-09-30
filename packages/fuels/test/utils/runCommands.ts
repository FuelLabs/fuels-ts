import { existsSync, rmSync } from 'fs';
import { join } from 'path';

import { Commands } from '../../src';
import { run } from '../../src/cli';

export const fixtures = join(__dirname, '..', 'fixtures');

export const workspace = join(fixtures, 'project');
export const fooContractSway = join(workspace, 'foo', 'src', 'main.sw');

export const fuelsConfig = join(fixtures, 'fuels.config.ts');
export const types = join(fixtures, 'types');
export const contractsJson = join(types, 'contracts.json');
export const fooContractTs = join(types, 'contracts', 'factories', 'FooBarAbi__factory.ts');

export async function runCommand(commandName: string, params: string[] = []) {
  const argv = ['node', 'fuels', '--silent', commandName, '-p', fixtures].concat(params);
  return { argv, command: await run(argv) };
}

export async function runInit() {
  return runCommand(Commands.init, ['-w', workspace, '-o', types]);
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
  if (existsSync(types)) {
    rmSync(types, { recursive: true });
  }
}
