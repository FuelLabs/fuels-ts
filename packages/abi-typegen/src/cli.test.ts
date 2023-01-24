import { join } from 'path';

import { contractPaths } from '../test/fixtures';
import { executeAndCatch } from '../test/utils/executeAndCatch';
import { createTempSwayProject } from '../test/utils/sway/createTempSwayProject';

import { run } from './cli';
import { CategoryEnum } from './interfaces/CategoryEnum';
import * as runTypegenMod from './runTypegen';

describe('cli.ts', () => {
  function mockDeps() {
    const runTypegen = jest.spyOn(runTypegenMod, 'runTypegen').mockImplementation();
    const exit = jest.spyOn(process, 'exit').mockImplementation();

    return { exit, runTypegen };
  }

  function setupTestSwayProject() {
    const contractPath = contractPaths.full;
    const autoBuild = true;

    const { tempDir } = createTempSwayProject({
      contractPath,
      autoBuild,
    });

    // compute filepaths
    const inputs = [join(tempDir, '/out/debug/*-abi.json')];
    const output = join(tempDir, 'generated');

    return { inputs, output };
  }

  beforeEach(jest.resetAllMocks);
  afterEach(jest.resetAllMocks);

  test('should call runTypegen with proper params: for Contracts', async () => {
    const { runTypegen } = mockDeps();
    const { inputs, output } = await setupTestSwayProject();

    const argv = ['node', 'fuels-typegen', '-i', inputs.join(' '), '-o', output, '-c'];

    await run({ argv, programName: 'cli.js:test' });

    expect(runTypegen).toHaveBeenNthCalledWith(1, {
      cwd: process.cwd(),
      inputs,
      output,
      category: CategoryEnum.CONTRACT,
      silent: false,
    });
  });

  test('should call runTypegen with proper params: for Scripts', async () => {
    const { runTypegen, exit } = mockDeps();
    const { inputs, output } = await setupTestSwayProject();

    const argv = ['node', 'fuels-typegen', '-i', inputs.join(' '), '-o', output, '-s'];

    await run({ argv, programName: 'cli.js:test' });

    expect(runTypegen).toHaveBeenNthCalledWith(1, {
      cwd: process.cwd(),
      inputs,
      output,
      category: CategoryEnum.SCRIPT,
      silent: false,
    });

    expect(exit).toHaveBeenCalledTimes(0);
  });

  test('should error if called with improper parameters', async () => {
    const { exit } = mockDeps();
    const { inputs, output } = await setupTestSwayProject();

    const argv = ['node', 'fuels-typegen', '-i', inputs.join(' '), '-o', output, '-s', '-c'];

    await run({ argv, programName: 'cli.js:test' });

    expect(exit).toHaveBeenNthCalledWith(1, 1);
  });
});
