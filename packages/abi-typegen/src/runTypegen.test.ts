import { existsSync, rmSync } from 'fs';
import { sync as globSync } from 'glob';
import { join } from 'path';
import rimraf from 'rimraf';
// eslint-disable-next-line import/no-extraneous-dependencies
import shelljs from 'shelljs';

import { contractPaths } from '../test/fixtures';
import { executeAndCatch } from '../test/utils/executeAndCatch';
import { createTempSwayProject } from '../test/utils/sway/createTempSwayProject';

import { runTypegen } from './runTypegen';
import { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';

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
    const programType = ProgramTypeEnum.CONTRACT;
    const silent = true;

    // executes program
    const fn = () =>
      runTypegen({
        cwd,
        inputs,
        output,
        programType,
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
    const programType = ProgramTypeEnum.CONTRACT;
    const silent = true;

    const filepaths = globSync(input, { cwd });

    // executes program
    const fn = () =>
      runTypegen({
        cwd,
        filepaths,
        output,
        programType,
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

  test('should run typegen for Scripts, using: filepaths', async () => {
    // setup temp sway project
    const contractPath = contractPaths.script;
    const autoBuild = true;

    const { tempDir, normalizedContractName } = createTempSwayProject({
      contractPath,
      autoBuild,
    });

    // compute filepaths
    const cwd = process.cwd();
    const input = join(tempDir, '/out/debug/*-abi.json');
    const output = join(tempDir, 'generated');
    const programType = ProgramTypeEnum.SCRIPT;
    const silent = true;

    const filepaths = globSync(input, { cwd });

    // executes program
    const fn = () =>
      runTypegen({
        cwd,
        filepaths,
        output,
        programType,
        silent,
      });

    const { error } = await executeAndCatch(fn);

    // validates execution was ok
    expect(error).toBeFalsy();

    // check if all files were created
    const files = [
      join(output, 'index.ts'),
      join(output, 'factories', `${normalizedContractName}Abi__factory.ts`),
    ];

    expect(files.length).toEqual(2);

    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });

    rimraf.sync(tempDir);
  });

  test('should raise error for non-existent Script BIN file', async () => {
    // setup temp sway project
    const contractPath = contractPaths.script;
    const autoBuild = true;

    const { tempDir } = createTempSwayProject({
      contractPath,
      autoBuild,
    });

    // IMPORTANT: deletes bin file from disk to yield error
    const binFilepath = join(tempDir, 'out', 'debug', 'script.bin');
    rmSync(binFilepath);

    // compute filepaths
    const cwd = process.cwd();
    const input = join(tempDir, '/out/debug/*-abi.json');
    const output = join(tempDir, 'generated');
    const programType = ProgramTypeEnum.SCRIPT;
    const silent = true;

    const filepaths = globSync(input, { cwd });

    // executes program via wrapped function
    const fn = () => {
      runTypegen({
        cwd,
        filepaths,
        output,
        programType,
        silent,
      });
    };

    const { error } = await executeAndCatch(fn);

    // validates execution was ok
    expect(error?.message).toMatch(/Could not find BIN file for counterpart Script ABI\./gm);

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
    const programType = ProgramTypeEnum.CONTRACT;
    const silent = true;

    // executes program
    const fn = () =>
      runTypegen({
        cwd,
        output,
        programType,
        silent,
      });

    const { error } = await executeAndCatch(fn);

    // validates execution was ok
    expect(error?.message).toEqual(
      'You need to inform at least one parameter: `input` or `filepaths`'
    );
  });
});
