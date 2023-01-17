import { join } from 'path';

import { contractPaths } from '../test/fixtures';
import { executeAndCatch } from '../test/utils/executeAndCatch';
import { createTempSwayProject } from '../test/utils/sway/createTempSwayProject';

import { run } from './cli';
import * as runTypegenMod from './runTypegen';

describe('cli.ts', () => {
  test('should call runTypegen with proper params', async () => {
    // mocking
    const runTypegen = jest.spyOn(runTypegenMod, 'runTypegen').mockImplementation();

    // setup temp sway project
    const contractPath = contractPaths.full;
    const autoBuild = true;

    const { tempDir } = createTempSwayProject({
      contractPath,
      autoBuild,
    });

    // compute filepaths
    const inputs = [join(tempDir, '/out/debug/*-abi.json')];
    const output = join(tempDir, 'generated');

    // executes program
    const argv = ['node', 'fuels-typegen', '-i', inputs.join(' '), '-o', output];
    const fn = () => run({ argv, programName: 'cli.js:test' });
    const { error } = await executeAndCatch(fn);

    // validates execution was ok
    expect(error).toBeFalsy();

    expect(runTypegen).toHaveBeenCalledTimes(1);

    expect(runTypegen).toHaveBeenNthCalledWith(1, {
      cwd: process.cwd(),
      inputs,
      output,
      silent: false,
    });
  });
});
