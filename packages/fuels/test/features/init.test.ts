import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';

import { mockLogger } from '../utils/mockLogger';
import { resetDiskAndMocks } from '../utils/resetDiskAndMocks';
import {
  fuelsConfigPath,
  generatedDir,
  initFlagsAutoStartFuelCore,
  initFlagsWorkspace,
  runInit,
} from '../utils/runCommands';

describe('init', () => {
  beforeEach(mockLogger);
  afterEach(resetDiskAndMocks);

  it('should run `init` command', async () => {
    await runInit([initFlagsWorkspace, initFlagsAutoStartFuelCore].flat());
    expect(existsSync(fuelsConfigPath)).toBeTruthy();
    const fuelsContents = readFileSync(fuelsConfigPath, 'utf-8');
    expect(fuelsContents).toMatch(`workspace: './project',`);
    expect(fuelsContents).toMatch(`output: './generated',`);
    expect(fuelsContents).not.toMatch(`useBuiltinForc: true,`);
    expect(fuelsContents).not.toMatch(`useBuiltinFuelCore: true,`);
  });

  it('should run `init` command using built-in flags', async () => {
    await runInit();
    expect(existsSync(fuelsConfigPath)).toBeTruthy();
    const fuelsContents = readFileSync(fuelsConfigPath, 'utf-8');
    expect(fuelsContents).toMatch(`workspace: './project',`);
    expect(fuelsContents).toMatch(`output: './generated',`);
    expect(fuelsContents).toMatch(`useBuiltinForc: true,`);
    expect(fuelsContents).toMatch(`useBuiltinFuelCore: true,`);
  });

  it('should run `init` command and throw for existent config file', async () => {
    const { error } = mockLogger();

    await runInit();
    expect(error).toHaveBeenCalledTimes(0);

    // second time will trigger error
    await runInit();
    expect(error).toHaveBeenCalledTimes(1);
    expect(chalk.reset(error.mock.calls[0][0])).toMatch(/Config file exists, aborting/);
  });

  it('should error if no inputs/workspace is supplied', async () => {
    const write = jest.spyOn(process.stdout, 'write').mockImplementation();
    const exit = jest.spyOn(process, 'exit').mockImplementation();

    await runInit(['-o', generatedDir].flat());

    expect(exit).toHaveBeenCalledTimes(1);
    expect(exit).toHaveBeenCalledWith(1);

    expect(write).toHaveBeenCalledTimes(1);
    expect(write).toHaveBeenCalledWith(
      `error: required option '-w, --workspace <path>' not specified\r`
    );
  });
});
