import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';

import { Commands } from '../../src';
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
    expect(fuelsContents).not.toMatch(`useBuiltinForc: true,`);
    expect(fuelsContents).not.toMatch(`useBuiltinFuelCore: true,`);
  });

  it('should run `init` command using built-in flags', async () => {
    await runInit({
      root: paths.root,
      workspace: paths.workspaceDir,
      output: paths.outputDir,
      useBuiltinBinaries: true,
    });

    expect(existsSync(paths.fuelsConfigPath)).toBeTruthy();
    const fuelsContents = readFileSync(paths.fuelsConfigPath, 'utf-8');
    expect(fuelsContents).toMatch(`workspace: './workspace',`);
    expect(fuelsContents).toMatch(`output: './output',`);
    expect(fuelsContents).toMatch(`useBuiltinForc: true,`);
    expect(fuelsContents).toMatch(`useBuiltinFuelCore: true,`);
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
    const write = vi.spyOn(process.stdout, 'write').mockReturnValue(true);
    const exit = vi.spyOn(process, 'exit').mockResolvedValue({} as never);

    await runCommand(Commands.init, ['-p', paths.root, '-o', paths.outputDir]);

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);

    expect(write).toHaveBeenCalledTimes(1);
    expect(write).toHaveBeenCalledWith(
      `error: required option '-w, --workspace <path>' not specified\r`
    );
  });
});
