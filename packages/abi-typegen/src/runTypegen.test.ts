import { existsSync } from 'fs';
import { sync as globSync } from 'glob';
import { join } from 'path';
import rimraf from 'rimraf';

import { contractPaths } from '../test/fixtures';
import { executeAndCatch } from '../test/utils/executeAndCatch';
import { createTempSwayProject } from '../test/utils/sway/createTempSwayProject';

import { runTypegen } from './runTypegen';

describe('runTypegen.js', () => {
  test('should run typegen, using: globals', async () => {
    // setup temp sway project
    const contractPath = contractPaths.full;
    const autoBuild = true;

    const { tempDir, normalizedContractName } = createTempSwayProject({
      contractPath,
      autoBuild,
    });

    // compute filepaths
    const cwd = process.cwd();
    const input = join(tempDir, '/out/debug/*-abi.json');
    const output = join(tempDir, 'generated');
    const silent = true;

    // executes program
    const fn = () =>
      runTypegen({
        cwd,
        input,
        output,
        silent,
      });

    const { error } = await executeAndCatch(fn);

    // validates execution was ok
    expect(error).toBeFalsy();

    // check if all files were created
    const files = [
      join(output, 'index.ts'),
      join(output, 'common.d.ts'),
      join(output, `${normalizedContractName}Abi.d.ts`),
      join(output, 'factories', `${normalizedContractName}Abi__factory.ts`),
    ];

    expect(files.length).toEqual(4);

    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });

    rimraf.sync(tempDir);
  });

  test('should run typegen, using: filepaths', async () => {
    // setup temp sway project
    const contractPath = contractPaths.full;
    const autoBuild = true;

    const { tempDir, normalizedContractName } = createTempSwayProject({
      contractPath,
      autoBuild,
    });

    // compute filepaths
    const cwd = process.cwd();
    const input = join(tempDir, '/out/debug/*-abi.json');
    const output = join(tempDir, 'generated');
    const silent = true;

    const filepaths = globSync(input, { cwd });

    // executes program
    const fn = () =>
      runTypegen({
        cwd,
        filepaths,
        output,
        silent,
      });

    const { error } = await executeAndCatch(fn);

    // validates execution was ok
    expect(error).toBeFalsy();

    // check if all files were created
    const files = [
      join(output, 'index.ts'),
      join(output, 'common.d.ts'),
      join(output, `${normalizedContractName}Abi.d.ts`),
      join(output, 'factories', `${normalizedContractName}Abi__factory.ts`),
    ];

    expect(files.length).toEqual(4);

    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });

    rimraf.sync(tempDir);
  });

  test('should warn about minimum parameters', async () => {
    // setup temp sway project
    const contractPath = contractPaths.full;
    const autoBuild = true;

    const { tempDir } = createTempSwayProject({
      contractPath,
      autoBuild,
    });

    // compute filepaths
    const cwd = process.cwd();
    const output = join(tempDir, 'generated');
    const silent = true;

    // executes program
    const fn = () =>
      runTypegen({
        cwd,
        output,
        silent,
      });

    const { error } = await executeAndCatch(fn);

    // validates execution was ok
    expect(error?.message).toEqual(
      'You need to inform at least one parameter: `input` or `filepaths`'
    );
  });
});
