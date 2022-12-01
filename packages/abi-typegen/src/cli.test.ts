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
    const input = join(tempDir, '/out/debug/*-abi.json');
    const output = join(tempDir, 'generated');

    // backup `process.argv` before re-defining it
    const argvBkp = process.argv;

    // inject desired input/ouput options pointing to the temp project
    process.argv = ['fuels-typegen', '-i', input, '-o', output, '-v', 'false'];

    // executes program
    const fn = () => run({ programName: 'cli.js:test' });
    const { error } = await executeAndCatch(fn);

    // rollback argv
    process.argv = argvBkp;

    // validates execution was ok
    expect(error).toBeFalsy();

    expect(runTypegen).toHaveBeenCalledTimes(1);

    expect(runTypegen).toHaveBeenNthCalledWith(1, {
      cwd: process.cwd(),
      input,
      output,
      verbose: false,
    });
  });
});
