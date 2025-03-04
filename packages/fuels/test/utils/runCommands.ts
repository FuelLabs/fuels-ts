import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { join, basename } from 'path';

import type { FuelsConfig } from '../../src';
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
  scriptDir: string;
  predicatesDir: string;
  predicateDir: string;
  fooContractMainPath: string;
  fuelsConfigPath: string;
  outputDir: string;
  contractsJsonPath: string;
  fooContractFactoryPath: string;
  upgradableContractPath: string;
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
  const contractsBarDir = join(contractsDir, 'bar');
  const contractsFooDir = join(contractsDir, 'foo');
  const fooContractMainPath = join(contractsDir, 'foo', 'src', 'main.sw');
  const upgradableContractPath = join(contractsDir, 'upgradable');
  const upgradableChunkedContractPath = join(contractsDir, 'upgradable-chunked');

  const scriptsDir = join(workspaceDir, 'scripts');
  const scriptDir = join(scriptsDir, 'script');

  const predicatesDir = join(workspaceDir, 'predicates');
  const predicateDir = join(predicatesDir, 'predicate');

  const outputDir = join(root, 'output');
  const outputContractsDir = join(outputDir, 'contracts');
  const contractsJsonPath = join(outputDir, 'contract-ids.json');
  const fooContractFactoryPath = join(outputDir, 'contracts', 'factories', 'FooBarAbi.ts');

  const forcPath = 'fuels-forc';
  const fuelCorePath = 'fuels-core';

  return {
    root,
    workspaceDir,
    contractsDir,
    outputContractsDir,
    contractsBarDir,
    contractsFooDir,
    upgradableContractPath,
    upgradableChunkedContractPath,
    scriptsDir,
    scriptDir,
    predicatesDir,
    predicateDir,
    fooContractMainPath,
    fuelsConfigPath,
    outputDir,
    contractsJsonPath,
    fooContractFactoryPath,
    forcPath,
    fuelCorePath,
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
  contracts?: string | string[];
  scripts?: string | string[];
  predicates?: string | string[];
  output: string;
  forcPath?: string;
  fuelCorePath?: string;
  autoStartFuelCore?: boolean;
  build?: boolean;
  privateKey?: string;
  fuelCorePort?: string;
};

export type BuildParams = BaseParams & {
  deploy?: boolean;
};

export async function runInit(params: InitParams) {
  const {
    autoStartFuelCore,
    output,
    root,
    forcPath,
    fuelCorePath,
    workspace,
    privateKey,
    fuelCorePort,
  } = params;

  const flag = (
    flags: (string | string[] | undefined)[],
    value?: string | string[] | boolean
  ): string[] => (value ? (flags.flat() as string[]) : []);

  // The OS auto-magically expands glob patterns before passing them to the CLI
  // We mimic this behavior here, as we by-pass the OS for our tests
  const expandGlob = (value: undefined | string | string[]) =>
    value ? globSync(value, { cwd: root }) : undefined;
  const contracts = expandGlob(params.contracts);
  const scripts = expandGlob(params.scripts);
  const predicates = expandGlob(params.predicates);

  const flags = [
    flag(['--path', root], root),
    flag(['-o', output], output),
    flag(['-w', workspace], workspace),
    flag(['--contracts', contracts], contracts),
    flag(['--scripts', scripts], scripts),
    flag(['--predicates', predicates], predicates),
    flag(['--forc-path', forcPath], forcPath),
    flag(['--fuel-core-path', fuelCorePath], fuelCorePath),
    flag(['--auto-start-fuel-core'], autoStartFuelCore),
    flag(['--fuel-core-port', fuelCorePort], fuelCorePort),
  ].flat();

  const command = await runCommand(Commands.init, flags);

  if (privateKey) {
    const configPath = join(root, 'fuels.config.ts');
    const config = readFileSync(configPath, 'utf-8');

    const search = /(^.*fuelCorePath:.*$)/m;
    const replace = `$1\n  privateKey: '${privateKey}',`;

    writeFileSync(configPath, config.replace(search, replace));
  }

  return command;
}

export async function runBuild(params: BuildParams) {
  const { root, deploy } = params;
  const flags = [['--path', root], deploy ? ['--deploy'] : []].flat();
  return runCommand(Commands.build, flags);
}

export async function runDeploy(params: BaseParams) {
  return runCommand(Commands.deploy, ['--path', params.root]);
}

export async function runDev(params: BaseParams) {
  return runCommand(Commands.dev, ['--path', params.root]);
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

/**
 * Loaders
 */
export async function loadFuelsConfig(configPath: string): Promise<FuelsConfig> {
  const configPathWithCacheBust = `${configPath}?update=${Date.now()}`;
  const { default: fuelsConfig } = await import(configPathWithCacheBust);
  return fuelsConfig;
}
