import { existsSync } from 'fs';
import { sync as globSync } from 'glob';
import { join } from 'path';
import rimraf from 'rimraf';
// eslint-disable-next-line import/no-extraneous-dependencies
import shelljs from 'shelljs';

import { contractPaths } from '../test/fixtures';
import { executeAndCatch } from '../test/utils/executeAndCatch';
import { createTempSwayProject } from '../test/utils/sway/createTempSwayProject';

import { CategoryEnum } from './interfaces/CategoryEnum';
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

    // duplicates ABI JSON so we can validate if all inputs
    // are being collected (and not only the first one)
    const from = join(tempDir, 'out/debug/full-abi.json');
    const to = join(tempDir, 'out/debug/full2-abi.json');
    shelljs.cp(from, to);

    // compute filepaths
    const cwd = process.cwd();
    const inputs = [join(tempDir, '/out/debug/*-abi.json')];
    const output = join(tempDir, 'generated');
    const category = CategoryEnum.CONTRACT;
    const silent = true;

    // executes program
    const fn = () =>
      runTypegen({
        cwd,
        inputs,
        output,
        category,
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
      join(output, `${normalizedContractName}2Abi.d.ts`),
      join(output, 'factories', `${normalizedContractName}Abi__factory.ts`),
    ];

    expect(files.length).toEqual(5);

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
    const category = CategoryEnum.CONTRACT;
    const silent = true;

    const filepaths = globSync(input, { cwd });

    // executes program
    const fn = () =>
      runTypegen({
        cwd,
        filepaths,
        output,
        category,
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
    const category = CategoryEnum.CONTRACT;
    const silent = true;

    // executes program
    const fn = () =>
      runTypegen({
        cwd,
        output,
        category,
        silent,
      });

    const { error } = await executeAndCatch(fn);

    // validates execution was ok
    expect(error?.message).toEqual(
      'You need to inform at least one parameter: `input` or `filepaths`'
    );
  });
});
