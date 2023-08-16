import { stderr } from 'process';

import { getProjectResources, ForcProjectsEnum } from '../test/fixtures/forc-projects/index';

import { run } from './cli';
import * as runTypegenMod from './runTypegen';
import { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';

describe('cli.ts', () => {
  function mockDeps() {
    const runTypegen = jest.spyOn(runTypegenMod, 'runTypegen').mockImplementation();
    const exit = jest.spyOn(process, 'exit').mockImplementation();
    const err = jest.spyOn(stderr, 'write').mockImplementation();

    return { exit, err, runTypegen };
  }

  beforeEach(jest.resetAllMocks);
  afterEach(jest.restoreAllMocks);

  test('should call runTypegen with proper params: for Contracts', async () => {
    const { runTypegen } = mockDeps();

    const project = getProjectResources(ForcProjectsEnum.FULL);
    const inputs = [project.inputGlobal];
    const output = project.tempDir;

    const argv = ['node', 'fuels-typegen', '-i', inputs.join(' '), '-o', output, '-c'];

    await run({ argv, programName: 'cli.js:test' });

    expect(runTypegen).toHaveBeenNthCalledWith(1, {
      cwd: process.cwd(),
      inputs,
      output,
      programType: ProgramTypeEnum.CONTRACT,
      silent: false,
    });
  });

  test('should call runTypegen with proper params: for Scripts', async () => {
    const { runTypegen, exit } = mockDeps();

    const project = getProjectResources(ForcProjectsEnum.FULL);
    const inputs = [project.inputGlobal];
    const output = project.tempDir;

    const argv = ['node', 'fuels-typegen', '-i', inputs.join(' '), '-o', output, '-s'];

    await run({ argv, programName: 'cli.js:test' });

    expect(runTypegen).toHaveBeenNthCalledWith(1, {
      cwd: process.cwd(),
      inputs,
      output,
      programType: ProgramTypeEnum.SCRIPT,
      silent: false,
    });

    expect(exit).toHaveBeenCalledTimes(0);
  });

  test('should call runTypegen with proper params: for Predicates', async () => {
    const { runTypegen, exit } = mockDeps();

    const project = getProjectResources(ForcProjectsEnum.FULL);
    const inputs = [project.inputGlobal];
    const output = project.tempDir;

    const argv = ['node', 'fuels-typegen', '-i', inputs.join(' '), '-o', output, '-p'];

    await run({ argv, programName: 'cli.js:test' });

    expect(runTypegen).toHaveBeenNthCalledWith(1, {
      cwd: process.cwd(),
      inputs,
      output,
      programType: ProgramTypeEnum.PREDICATE,
      silent: false,
    });

    expect(exit).toHaveBeenCalledTimes(0);
  });

  test('should error if called with incompatible parameters: -s, -c', async () => {
    const { exit, err } = mockDeps();

    const project = getProjectResources(ForcProjectsEnum.FULL);
    const inputs = [project.inputGlobal];
    const output = project.tempDir;

    const argv = ['node', 'fuels-typegen', '-i', inputs.join(' '), '-o', output, '-s', '-c'];

    await run({ argv, programName: 'cli.js:test' });

    expect(exit).toHaveBeenNthCalledWith(1, 1);
    expect(err).toHaveBeenCalledTimes(2);

    const err1 = /error: option '-c, --contract' cannot be used with option '-s, --script/;
    expect(err.mock.calls[0][0].toString()).toMatch(err1);

    const err2 = /error: option '-s, --script' cannot be used with option '-c, --contract/m;
    expect(err.mock.calls[1][0].toString()).toMatch(err2);
  });

  test('should error if called with incompatible parameters: -s, -p', async () => {
    const { exit, err } = mockDeps();

    const project = getProjectResources(ForcProjectsEnum.FULL);
    const inputs = [project.inputGlobal];
    const output = project.tempDir;

    const argv = ['node', 'fuels-typegen', '-i', inputs.join(' '), '-o', output, '-s', '-p'];

    await run({ argv, programName: 'cli.js:test' });

    expect(exit).toHaveBeenNthCalledWith(1, 1);
    expect(err).toHaveBeenCalledTimes(2);

    const err1 = /error: option '-s, --script' cannot be used with option '-p, --predicate/m;
    expect(err.mock.calls[0][0].toString()).toMatch(err1);

    const err2 = /error: option '-p, --predicate' cannot be used with option '-s, --script/;
    expect(err.mock.calls[1][0].toString()).toMatch(err2);
  });

  test('should error if called with incompatible parameters: -p, -c', async () => {
    const { exit, err } = mockDeps();

    const project = getProjectResources(ForcProjectsEnum.FULL);
    const inputs = [project.inputGlobal];
    const output = project.tempDir;

    const argv = ['node', 'fuels-typegen', '-i', inputs.join(' '), '-o', output, '-c', '-p'];

    await run({ argv, programName: 'cli.js:test' });

    expect(exit).toHaveBeenNthCalledWith(1, 1);
    expect(err).toHaveBeenCalledTimes(2);

    const err1 = /error: option '-c, --contract' cannot be used with option '-p, --predicate/m;
    expect(err.mock.calls[0][0].toString()).toMatch(err1);

    const err2 = /error: option '-p, --predicate' cannot be used with option '-c, --contract/;
    expect(err.mock.calls[1][0].toString()).toMatch(err2);
  });
});
