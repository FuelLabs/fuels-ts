import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';

import { Commands } from '../../src';
import { mockCheckForUpdates } from '../utils/mockCheckForUpdates';
import { mockLogger } from '../utils/mockLogger';
import {
  bootstrapProject,
  runCommand,
  runInit,
  resetDiskAndMocks,
  resetConfigAndMocks,
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
    const fuelsContents = readFileSync(paths.fuelsConfigPath, 'utf-8');
    expect(fuelsContents).toMatch(`workspace: './workspace',`);
    expect(fuelsContents).toMatch(`output: './output',`);
    expect(fuelsContents).not.toMatch(`forcPath: 'fuels-forc',`);
    expect(fuelsContents).not.toMatch(`fuelCorePath: 'fuels-core',`);
  });

  it('should run `init` command with --contracts', async () => {
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
    const fuelsContents = readFileSync(paths.fuelsConfigPath, 'utf-8');
    expect(fuelsContents).toMatch(/contracts:/);
    expect(fuelsContents).toMatch(relativeBarDir);
    expect(fuelsContents).toMatch(relativeFooDir);
  });

  it('should run `init` command with --predicate', async () => {
    await runInit({
      root: paths.root,
      predicates: paths.predicateDir,
      output: paths.outputDir,
    });

    const relativePredicateDir = paths.predicateDir.replace(paths.workspaceDir, 'workspace');

    expect(existsSync(paths.fuelsConfigPath)).toBeTruthy();
    const fuelsContents = readFileSync(paths.fuelsConfigPath, 'utf-8');
    expect(fuelsContents).toMatch(/predicates:/);
    expect(fuelsContents).toMatch(relativePredicateDir);
  });

  it('should run `init` command with --scripts', async () => {
    await runInit({
      root: paths.root,
      scripts: paths.scriptsDir,
      output: paths.outputDir,
    });

    const relativeScriptDir = paths.scriptsDir.replace(paths.workspaceDir, 'workspace');

    expect(existsSync(paths.fuelsConfigPath)).toBeTruthy();
    const fuelsContents = readFileSync(paths.fuelsConfigPath, 'utf-8');
    expect(fuelsContents).toMatch(/scripts:/);
    expect(fuelsContents).toMatch(relativeScriptDir);
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
    const fuelsContents = readFileSync(paths.fuelsConfigPath, 'utf-8');
    expect(fuelsContents).toMatch(`workspace: './workspace',`);
    expect(fuelsContents).toMatch(`output: './output',`);
    expect(fuelsContents).toMatch(`forcPath: 'fuels-forc',`);
    expect(fuelsContents).toMatch(`fuelCorePath: 'fuels-core',`);
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
