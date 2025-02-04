import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';

import * as deployMod from '../../src/cli/commands/deploy/index';
import { mockStartFuelCore } from '../utils/mockAutoStartFuelCore';
import { mockCheckForUpdates } from '../utils/mockCheckForUpdates';
import {
  bootstrapProject,
  resetConfigAndMocks,
  resetDiskAndMocks,
  runBuild,
  runInit,
} from '../utils/runCommands';

/**
 * @group node
 */
describe('build', { timeout: 180000 }, () => {
  const paths = bootstrapProject(__filename);

  beforeEach(() => {
    mockCheckForUpdates();
  });

  afterEach(() => {
    resetConfigAndMocks(paths.fuelsConfigPath);
    rmSync(paths.outputDir, { recursive: true, force: true });
  });

  afterAll(() => {
    resetDiskAndMocks(paths.root);
  });

  function mockAll() {
    const { autoStartFuelCore, killChildProcess } = mockStartFuelCore();
    const deploy = vi.spyOn(deployMod, 'deploy').mockResolvedValue({
      contracts: [],
      scripts: [],
      predicates: [],
    });

    return { autoStartFuelCore, killChildProcess, deploy };
  }

  it('should run `build` command', async () => {
    const { autoStartFuelCore, killChildProcess, deploy } = mockAll();

    await runInit({
      root: paths.root,
      workspace: paths.workspaceDir,
      output: paths.outputDir,
      forcPath: paths.forcPath,
      fuelCorePath: paths.fuelCorePath,
    });

    await runBuild({ root: paths.root });

    const files = [
      'predicates/PredicateTrue.ts',
      'predicates/index.ts',
      'contracts/BarFoo.ts',
      'contracts/FooBar.ts',
      'contracts/FooBarFactory.ts',
      'contracts/BarFooFactory.ts',
      'contracts/index.ts',
      'scripts/ScriptTrue.ts',
      'scripts/index.ts',
      'index.ts',
    ].map((f) => join(paths.outputDir, f));

    files.forEach((file) => {
      expect(existsSync(file)).toBeTruthy();
    });

    expect(autoStartFuelCore).toHaveBeenCalledTimes(0);
    expect(deploy).toHaveBeenCalledTimes(0);
    expect(killChildProcess).toHaveBeenCalledTimes(0);
  });

  it('should run `build` command with contracts-only [single contract]', async () => {
    const { autoStartFuelCore, killChildProcess, deploy } = mockAll();

    await runInit({
      root: paths.root,
      contracts: paths.contractsFooDir,
      output: paths.outputDir,
      forcPath: paths.forcPath,
      fuelCorePath: paths.fuelCorePath,
    });

    await runBuild({ root: paths.root });

    const files = [
      'contracts/FooBar.ts',
      'contracts/FooBarFactory.ts',
      'contracts/index.ts',
      'index.ts',
    ].map((f) => join(paths.outputDir, f));

    files.forEach((file) => expect(existsSync(file), `${file} does not exist`).toBeTruthy());
    expect(readdirSync(paths.outputContractsDir)).toHaveLength(3);

    expect(autoStartFuelCore).toHaveBeenCalledTimes(0);
    expect(deploy).toHaveBeenCalledTimes(0);
    expect(killChildProcess).toHaveBeenCalledTimes(0);
  });

  it('should run `build` command with contracts-only [with glob]', async () => {
    const { autoStartFuelCore, killChildProcess, deploy } = mockAll();

    await runInit({
      root: paths.root,
      contracts: `${paths.contractsDir}/*`,
      output: paths.outputDir,
      forcPath: paths.forcPath,
      fuelCorePath: paths.fuelCorePath,
    });

    await runBuild({ root: paths.root });

    const files = [
      'contracts/UpgradableChunked.ts',
      'contracts/UpgradableChunkedFactory.ts',
      'contracts/Upgradable.ts',
      'contracts/UpgradableFactory.ts',
      'contracts/BarFoo.ts',
      'contracts/BarFooFactory.ts',
      'contracts/FooBar.ts',
      'contracts/FooBarFactory.ts',
      'contracts/index.ts',
      'index.ts',
    ].map((f) => join(paths.outputDir, f));

    files.forEach((file) => expect(existsSync(file), `${file} does not exist`).toBeTruthy());
    expect(readdirSync(paths.outputContractsDir)).toHaveLength(9);

    expect(autoStartFuelCore).toHaveBeenCalledTimes(0);
    expect(deploy).toHaveBeenCalledTimes(0);
    expect(killChildProcess).toHaveBeenCalledTimes(0);
  });

  it('should run `build` command with `--deploy` flag', async () => {
    const { autoStartFuelCore, killChildProcess, deploy } = mockAll();

    await runInit({
      root: paths.root,
      workspace: paths.workspaceDir,
      output: paths.outputDir,
      forcPath: paths.forcPath,
      fuelCorePath: paths.fuelCorePath,
    });

    await runBuild({ root: paths.root, deploy: true });

    expect(autoStartFuelCore).toHaveBeenCalledTimes(1);
    expect(deploy).toHaveBeenCalledTimes(1);
    expect(killChildProcess).toHaveBeenCalledTimes(1);
  });

  it("should run `build` with `forcBuildFlags: ['--release']`", async () => {
    const { autoStartFuelCore, killChildProcess, deploy } = mockAll();

    await runInit({
      root: paths.root,
      workspace: paths.workspaceDir,
      output: paths.outputDir,
      forcPath: paths.forcPath,
      fuelCorePath: paths.fuelCorePath,
    });

    // inject `forcBuildFlags: ['--release']` in config file
    const configFilepath = join(paths.root, 'fuels.config.ts');
    const configContents = readFileSync(configFilepath, 'utf-8');

    const search = "  output: './output',";
    const replace = [search, "  forcBuildFlags: ['--release'],"].join('\n');
    const configContentsNew = configContents.replace(search, replace);

    writeFileSync(configFilepath, configContentsNew);

    // moving on
    await runBuild({ root: paths.root });

    const files = [
      'contracts/FooBar.ts',
      'contracts/FooBarFactory.ts',
      'contracts/index.ts',
      'index.ts',
    ].map((f) => join(paths.outputDir, f));

    files.forEach((file) => expect(existsSync(file)).toBeTruthy());

    expect(autoStartFuelCore).toHaveBeenCalledTimes(0);
    expect(deploy).toHaveBeenCalledTimes(0);
    expect(killChildProcess).toHaveBeenCalledTimes(0);
  });
});
