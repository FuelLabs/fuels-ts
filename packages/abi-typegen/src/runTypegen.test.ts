import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError, safeExec } from '@fuel-ts/errors/test-utils';
import { cpSync, existsSync, renameSync } from 'fs';
import { globSync } from 'glob';
import { join } from 'path';

import {
  AbiTypegenProjectsEnum,
  getTypegenForcProject,
} from '../test/fixtures/forc-projects/index';

import { runTypegen } from './runTypegen';
import { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';

/**
 * @group node
 */
describe('runTypegen.js', () => {
  test('should run typegen, using: globals', async () => {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.FULL);

    // compute filepaths
    const cwd = process.cwd();
    const inputs = [project.inputGlobal];
    const output = project.tempDir;
    const normalizedName = project.normalizedName;
    const programType = ProgramTypeEnum.CONTRACT;
    const silent = true;

    // duplicates ABI JSON so we can validate if all inputs
    // are being collected (and not only the first one)
    const from = project.abiPath;
    const to = from.replace('-abi.json', '2-abi.json');

    // also duplicates BIN file
    const fromBin = project.binPath;
    const toBin = fromBin.replace('.bin', '2.bin');

    cpSync(from, to);
    cpSync(fromBin, toBin);

    // executes program
    const fn = () =>
      runTypegen({
        cwd,
        inputs,
        output,
        programType,
        silent,
      });

    const { error } = await safeExec(fn);

    // validates execution was ok
    expect(error).toBeFalsy();

    // check if all files were created
    const files = [
      join(output, 'index.ts'),
      join(output, 'common.d.ts'),
      join(output, `${normalizedName}.ts`),
      join(output, `${normalizedName}Factory.ts`),
    ];

    expect(files.length).toEqual(4);

    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });
  });

  test('should run typegen, using: filepaths', async () => {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.FULL);

    // compute filepaths
    const cwd = process.cwd();
    const input = project.inputGlobal;
    const output = project.tempDir;
    const normalizedName = project.normalizedName;

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

    const { error } = await safeExec(fn);

    // validates execution was ok
    expect(error).toBeFalsy();

    // check if all files were created
    const files = [
      join(output, 'index.ts'),
      join(output, 'common.d.ts'),
      join(output, `${normalizedName}.ts`),
      join(output, `${normalizedName}Factory.ts`),
    ];

    expect(files.length).toEqual(4);

    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });
  });

  test('should run typegen for Scripts, using: filepaths', async () => {
    // setup temp sway project
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.SCRIPT);

    // compute filepaths
    const cwd = process.cwd();
    const input = project.inputGlobal;
    const output = project.tempDir;
    const normalizedName = project.normalizedName;
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

    const { error } = await safeExec(fn);

    // validates execution was ok
    expect(error).toBeFalsy();

    // check if all files were created
    const files = [join(output, 'index.ts'), join(output, `${normalizedName}.ts`)];

    expect(files.length).toEqual(2);

    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });
  });

  test('should log messages to stdout', async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // setup temp sway project
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.SCRIPT);

    // compute filepaths
    const cwd = process.cwd();
    const input = project.inputGlobal;
    const output = project.tempDir;
    const programType = ProgramTypeEnum.SCRIPT;
    const silent = false; // turning flag off

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

    const { error } = await safeExec(fn);

    // validates execution was ok
    expect(error).toBeFalsy();

    expect(logSpy).toHaveBeenCalledTimes(5);
  });

  test('should raise error for non-existent Script BIN file', async () => {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.SCRIPT);
    const tempBinPath = `${project.binPath}--BKP`;

    // IMPORTANT: renames bin file to yield error
    renameSync(project.binPath, tempBinPath);

    // compute filepaths
    const cwd = process.cwd();
    const input = project.inputGlobal;
    const output = project.tempDir;
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

    const { error } = await safeExec(fn);

    // restore bin to original place
    renameSync(tempBinPath, project.binPath);

    // validates execution was ok
    expect(error?.message).toMatch(/Could not find BIN file for counterpart Script ABI\./gm);
  });

  test('should warn about minimum parameters', async () => {
    // setup temp sway project
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.SCRIPT);

    // compute filepaths
    const cwd = process.cwd();
    const output = project.tempDir;
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

    const { error } = await safeExec(fn);

    // validates execution was ok
    expect(error?.message).toEqual(
      `At least one parameter should be supplied: 'input' or 'filepaths'.`
    );
  });

  test('should write messages to stdout', async () => {
    const project = getTypegenForcProject(AbiTypegenProjectsEnum.FULL);

    // compute filepaths
    const cwd = process.cwd();
    const inputs = [project.inputGlobal];
    const output = project.tempDir;
    const normalizedName = project.normalizedName;
    const programType = ProgramTypeEnum.CONTRACT;
    const silent = false;

    // duplicates ABI JSON so we can validate if all inputs
    // are being collected (and not only the first one)
    const from = project.abiPath;
    const to = from.replace('-abi.json', '2-abi.json');

    // also duplicates BIN file
    const fromBin = project.binPath;
    const toBin = fromBin.replace('.bin', '2.bin');

    cpSync(from, to);
    cpSync(fromBin, toBin);

    // mocking
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    // executes program
    const fn = () =>
      runTypegen({
        cwd,
        inputs,
        output,
        programType,
        silent,
      });

    const { error } = await safeExec(fn);

    // validates execution was ok
    expect(error).toBeFalsy();

    // check if all files were created
    const files = [
      join(output, 'index.ts'),
      join(output, 'common.d.ts'),
      join(output, `${normalizedName}.ts`),
      join(output, `${normalizedName}Factory.ts`),
    ];

    expect(files.length).toEqual(4);

    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });

    expect(logSpy).toHaveBeenCalled();
  });

  test('should error for no ABI in inputs', async () => {
    const cwd = process.cwd();
    const inputs = ['./*-abis.json']; // abi don't exist
    const output = 'anything';
    const programType = ProgramTypeEnum.CONTRACT;
    const silent = true;

    await expectToThrowFuelError(
      () =>
        runTypegen({
          cwd,
          inputs,
          output,
          programType,
          silent,
        }),
      new FuelError(ErrorCode.NO_ABIS_FOUND, `no ABI found at '${inputs[0]}'`)
    );
  });
});
