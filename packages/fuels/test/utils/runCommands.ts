import { cpSync, existsSync, mkdirSync, rmSync } from 'fs';
import { join, basename } from 'path';

import { Commands } from '../../src';
import { run } from '../../src/run';

/**
 * Path and Directory utils
 */
export const testDir = join(__dirname, '..');
export const fixturesDir = join(testDir, 'fixtures');
export const sampleWorkspaceDir = join(fixturesDir, 'workspace');
export const sampleConfigPath = join(fixturesDir, 'fuels.config.ts');

export type Paths = {
  root: string;
  workspaceDir: string;
  contractsDir: string;
  contractsFooDir: string;
  scriptsDir: string;
  predicateDir: string;
  fooContractMainPath: string;
  fuelsConfigPath: string;
  outputDir: string;
  contractsJsonPath: string;
  fooContractFactoryPath: string;
};

export function bootstrapProject(testFilepath: string) {
  const testFilename = basename(testFilepath.replace(/\./g, '-'));
  const uniqueName = `__temp__${testFilename}_${new Date().getTime()}`;

  const root = join(testDir, uniqueName);
  const workspaceDir = join(root, 'workspace');
  const fuelsConfigPath = join(root, 'fuels.config.ts');

  mkdirSync(workspaceDir, { recursive: true });

  cpSync(sampleWorkspaceDir, workspaceDir, { recursive: true });

  const contractsDir = join(workspaceDir, 'contracts');
  const contractsFooDir = join(contractsDir, 'foo');
  const scriptsDir = join(workspaceDir, 'scripts');
  const predicateDir = join(workspaceDir, 'predicate');
  const fooContractMainPath = join(contractsDir, 'foo', 'src', 'main.sw');

  const outputDir = join(root, 'output');
  const contractsJsonPath = join(outputDir, 'contract-ids.json');
  const fooContractFactoryPath = join(outputDir, 'contracts', 'factories', 'FooBarAbi__factory.ts');

  return {
    root,
    workspaceDir,
    contractsDir,
    contractsFooDir,
    scriptsDir,
    predicateDir,
    fooContractMainPath,
    fuelsConfigPath,
    outputDir,
    contractsJsonPath,
    fooContractFactoryPath,
  };
}

/**
 * Command callers
 */
export async function runCommand(commandName: string, params: string[] = []) {
  // always `--silent` to avoid polluting tests output
  const argv = ['node', 'fuels', '--silent', commandName].concat(params);
  return { argv, command: await run(argv) };
}

export type BaseParams = {
  root: string;
};

export type InitParams = BaseParams & {
  workspace?: string;
  contracts?: string;
  scripts?: string;
  predicates?: string;
  output: string;
  useBuiltinBinaries?: boolean;
  autoStartFuelCore?: boolean;
  build?: boolean;
};

export type BuildParams = BaseParams & {
  deploy?: boolean;
};

export async function runInit(params: InitParams) {
  const {
    autoStartFuelCore,
    contracts,
    output,
    predicates,
    root,
    scripts,
    useBuiltinBinaries,
    workspace,
  } = params;

  const flag = (flags: (string | undefined)[], value?: string | boolean): string[] =>
    value ? (flags as string[]) : [];

  const flags = [
    flag(['-p', root], root),
    flag(['-o', output], output),
    flag(['-w', workspace], workspace),
    flag(['--contracts', contracts], contracts),
    flag(['--scripts', scripts], scripts),
    flag(['--predicates', predicates], predicates),
    flag(['--use-builtin-forc', '--use-builtin-fuel-core'], useBuiltinBinaries),
    flag(['--auto-start-fuel-core'], autoStartFuelCore),
  ].flat();

  return runCommand(Commands.init, flags);
}

export async function runBuild(params: BuildParams) {
  const { root, deploy } = params;
  const flags = [['-p', root], deploy ? ['--deploy'] : []].flat();
  return runCommand(Commands.build, flags);
}

export async function runDeploy(params: BaseParams) {
  return runCommand(Commands.deploy, ['-p', params.root]);
}

export async function runDev(params: BaseParams) {
  return runCommand(Commands.dev, ['-p', params.root]);
}

/**
 * Cleanup
 */
export function resetConfigAndMocks(configPath: string) {
  if (existsSync(configPath)) {
    rmSync(configPath);
  }
  vi.restoreAllMocks();
}

export function resetDiskAndMocks(dirPath: string) {
  if (existsSync(dirPath)) {
    rmSync(dirPath, { recursive: true });
  }
  vi.restoreAllMocks();
}
