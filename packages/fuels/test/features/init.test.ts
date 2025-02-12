import chalk from 'chalk';
import { existsSync } from 'fs';

import { Commands } from '../../src';
import { mockCheckForUpdates } from '../utils/mockCheckForUpdates';
import { mockLogger } from '../utils/mockLogger';
import {
  bootstrapProject,
  runCommand,
  runInit,
  resetDiskAndMocks,
  resetConfigAndMocks,
  loadFuelsConfig,
} from '../utils/runCommands';

/**
 * @group node
 */
describe('init', () => {
  const paths = bootstrapProject(__filename);

  beforeEach(() => {
    mockLogger();
    mockCheckForUpdates();
  });

  afterEach(() => {
    resetConfigAndMocks(paths.fuelsConfigPath);
  });

  afterAll(() => {
    resetDiskAndMocks(paths.root);
  });

  it('should run `init` command', async () => {
    await runInit({
      root: paths.root,
      workspace: paths.workspaceDir,
      output: paths.outputDir,
    });

    expect(existsSync(paths.fuelsConfigPath)).toBeTruthy();
    const fuelsConfig = await loadFuelsConfig(paths.fuelsConfigPath);
    expect(fuelsConfig).toEqual({
      workspace: './workspace',
      output: './output',
    });
  });

  it('should run `init` command with --contracts [absolute paths]', async () => {
    await runInit({
      root: paths.root,
      contracts: [paths.contractsBarDir, paths.contractsFooDir],
      output: paths.outputDir,
    });

    const [relativeBarDir, relativeFooDir] = [
      paths.contractsBarDir.replace(paths.workspaceDir, 'workspace'),
      paths.contractsFooDir.replace(paths.workspaceDir, 'workspace'),
    ];

    expect(existsSync(paths.fuelsConfigPath)).toBeTruthy();
    const fuelsConfig = await loadFuelsConfig(paths.fuelsConfigPath);
    expect(fuelsConfig).toEqual({
      contracts: [relativeBarDir, relativeFooDir],
      output: './output',
    });
  });

  it('should run `init` command with --contracts [glob path - multiple matches]', async () => {
    await runInit({
      root: paths.root,
      contracts: [`${paths.contractsDir}/*`],
      output: paths.outputDir,
    });

    const relativeContractPaths = [
      paths.upgradableChunkedContractPath,
      paths.upgradableContractPath,
      paths.contractsFooDir,
      paths.contractsBarDir,
    ].map((path) => path.replace(paths.workspaceDir, 'workspace'));

    expect(existsSync(paths.fuelsConfigPath)).toBeTruthy();
    const fuelsConfig = await loadFuelsConfig(paths.fuelsConfigPath);
    expect(fuelsConfig).toEqual({
      contracts: relativeContractPaths,
      output: './output',
    });
  });

  it('should run `init` command with --contracts [glob path - single path]', async () => {
    await runInit({
      root: paths.root,
      contracts: [`${paths.contractsBarDir}/*`],
      output: paths.outputDir,
    });

    const [relativeBarDir] = [paths.contractsBarDir.replace(paths.workspaceDir, 'workspace')];

    expect(existsSync(paths.fuelsConfigPath)).toBeTruthy();

    const fuelsConfig = await loadFuelsConfig(paths.fuelsConfigPath);
    expect(fuelsConfig).toEqual({
      contracts: [relativeBarDir],
      output: './output',
    });
  });

  it('should run `init` command with --contracts [glob path - multiple contracts]', async () => {
    await runInit({
      root: paths.root,
      contracts: [`${paths.workspaceDir}/*`],
      output: paths.outputDir,
    });

    const relativeContractPaths = [
      paths.upgradableChunkedContractPath,
      paths.upgradableContractPath,
      paths.contractsFooDir,
      paths.contractsBarDir,
    ].map((path) => path.replace(paths.workspaceDir, 'workspace'));

    expect(existsSync(paths.fuelsConfigPath)).toBeTruthy();

    const fuelsConfig = await loadFuelsConfig(paths.fuelsConfigPath);
    expect(fuelsConfig).toEqual({
      contracts: relativeContractPaths,
      output: './output',
    });
  });

  it('should run `init` command with --contracts [no matches - log error]', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const exit = vi.spyOn(process, 'exit').mockResolvedValue({} as never);

    await runInit({
      root: paths.root,
      contracts: [`${paths.predicatesDir}/*`],
      output: paths.outputDir,
    });

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      ['error: unable to detect program/s', '- contract/s detected 0'].join('\r\n')
    );
    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);
  });

  it('should run `init` command with --predicates', async () => {
    await runInit({
      root: paths.root,
      predicates: paths.predicatesDir,
      output: paths.outputDir,
    });

    const relativePredicateDir = paths.predicateDir.replace(paths.workspaceDir, 'workspace');

    expect(existsSync(paths.fuelsConfigPath)).toBeTruthy();
    const fuelsConfig = await loadFuelsConfig(paths.fuelsConfigPath);
    expect(fuelsConfig).toEqual({
      predicates: [relativePredicateDir],
      output: './output',
    });
  });

  it('should run `init` command with --scripts', async () => {
    await runInit({
      root: paths.root,
      scripts: paths.scriptsDir,
      output: paths.outputDir,
    });

    const relativeScriptDir = paths.scriptDir.replace(paths.workspaceDir, 'workspace');

    expect(existsSync(paths.fuelsConfigPath)).toBeTruthy();
    const fuelsConfig = await loadFuelsConfig(paths.fuelsConfigPath);
    expect(fuelsConfig).toEqual({
      scripts: [relativeScriptDir],
      output: './output',
    });
  });

  it('should run `init` command using custom binaries', async () => {
    await runInit({
      root: paths.root,
      workspace: paths.workspaceDir,
      output: paths.outputDir,
      forcPath: paths.forcPath,
      fuelCorePath: paths.fuelCorePath,
    });

    expect(existsSync(paths.fuelsConfigPath)).toBeTruthy();
    const fuelsConfig = await loadFuelsConfig(paths.fuelsConfigPath);
    expect(fuelsConfig).toEqual({
      workspace: './workspace',
      output: './output',
      forcPath: 'fuels-forc',
      fuelCorePath: 'fuels-core',
    });
  });

  it('should run `init` command with custom fuel-core-port', async () => {
    await runInit({
      root: paths.root,
      workspace: paths.workspaceDir,
      output: paths.outputDir,
      fuelCorePort: '1234',
    });

    const fuelsConfig = await loadFuelsConfig(paths.fuelsConfigPath);
    expect(fuelsConfig).toEqual({
      fuelCorePort: 1234,
      output: './output',
      workspace: './workspace',
    });
  });

  it('should run `init` command and throw for existent config file', async () => {
    const { error } = mockLogger();

    // first time, all good
    await runInit({
      root: paths.root,
      workspace: paths.workspaceDir,
      output: paths.outputDir,
    });

    expect(error).toHaveBeenCalledTimes(0);

    // second time will trigger error
    await runInit({
      root: paths.root,
      workspace: paths.workspaceDir,
      output: paths.outputDir,
    });

    expect(error).toHaveBeenCalledTimes(1);
    expect(chalk.reset(error.mock.calls[0][0])).toMatch(/Config file exists, aborting/);
  });

  it('should error if no inputs/workspace is supplied', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const exit = vi.spyOn(process, 'exit').mockResolvedValue({} as never);

    await runCommand(Commands.init, ['--path', paths.root, '-o', paths.outputDir]);

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(
      `error: required option '-w, --workspace <path>' not specified\r`
    );
  });
});
