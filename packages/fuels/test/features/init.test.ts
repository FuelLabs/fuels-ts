import { safeExec } from '@fuel-ts/errors/test-utils';
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
    expect(fuelsContents).toMatch(`workspace: 'project',`);
    expect(fuelsContents).toMatch(`output: 'generated',`);
    expect(fuelsContents).not.toMatch(`useBuiltinForc: true,`);
    expect(fuelsContents).not.toMatch(`useBuiltinFuelCore: true,`);
  });

  it('should run `init` command using built-in flags', async () => {
    await runInit();
    expect(existsSync(fuelsConfigPath)).toBeTruthy();
    const fuelsContents = readFileSync(fuelsConfigPath, 'utf-8');
    expect(fuelsContents).toMatch(`workspace: 'project',`);
    expect(fuelsContents).toMatch(`output: 'generated',`);
    expect(fuelsContents).toMatch(`useBuiltinForc: true,`);
    expect(fuelsContents).toMatch(`useBuiltinFuelCore: true,`);
  });

  it('should run `init` command and throw for existent config file', async () => {
    const { error } = mockLogger();

    const firstRun = await safeExec(() => runInit());
    expect(error).toHaveBeenCalledTimes(0);
    expect(firstRun.error).not.toBeTruthy();

    // second time will trigger error
    const secondRun = await safeExec(() => runInit());
    expect(error).toHaveBeenCalledTimes(1);
    expect(secondRun.result).not.toBeTruthy();
    expect(chalk.reset(secondRun.error)).toMatch(/Config file exists, aborting./);
  });

  it('should error if no inputs are supplied', async () => {
    const { error } = await safeExec(() => runInit(['-o', generatedDir].flat()));

    expect(error).toBeTruthy();
    expect(error?.toString()).toMatch(/Workspace not supplied./i);
  });
});
