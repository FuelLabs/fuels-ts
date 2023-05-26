import { safeExec } from '@fuel-ts/utils/test';
import { existsSync } from 'fs';
import { globSync } from 'glob';
import { join } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import shelljs from 'shelljs';

import { getProjectResources, ForcProjectsEnum } from '../test/fixtures/forc-projects/index';

import { runTypegen } from './runTypegen';
import { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';

describe('runTypegen.js', () => {
  test('should run typegen, using: globals', async () => {
    const project = getProjectResources(ForcProjectsEnum.FULL);

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

    shelljs.cp(from, to);

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
      join(output, `${normalizedName}Abi.d.ts`),
      join(output, `${normalizedName}2Abi.d.ts`),
      join(output, 'factories', `${normalizedName}Abi__factory.ts`),
    ];

    expect(files.length).toEqual(5);

    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });
  });

  test('should run typegen, using: filepaths', async () => {
    const project = getProjectResources(ForcProjectsEnum.FULL);

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
      join(output, `${normalizedName}Abi.d.ts`),
      join(output, 'factories', `${normalizedName}Abi__factory.ts`),
    ];

    expect(files.length).toEqual(4);

    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });
  });

  test('should run typegen for Scripts, using: filepaths', async () => {
    // setup temp sway project
    const project = getProjectResources(ForcProjectsEnum.SCRIPT);

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
    const files = [
      join(output, 'index.ts'),
      join(output, 'factories', `${normalizedName}Abi__factory.ts`),
    ];

    expect(files.length).toEqual(2);

    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });
  });

  test('should raise error for non-existent Script BIN file', async () => {
    const project = getProjectResources(ForcProjectsEnum.SCRIPT);
    const tempBinPath = `${project.binPath}--BKP`;

    // IMPORTANT: renames bin file to yield error
    shelljs.mv(project.binPath, tempBinPath);

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
    shelljs.mv(tempBinPath, project.binPath);

    // validates execution was ok
    expect(error?.message).toMatch(/Could not find BIN file for counterpart Script ABI\./gm);
  });

  test('should warn about minimum parameters', async () => {
    // setup temp sway project
    const project = getProjectResources(ForcProjectsEnum.SCRIPT);

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
      'You need to inform at least one parameter: `input` or `filepaths`'
    );
  });
});
