import * as childProcessMod from 'child_process';

import { fuelsConfig } from '../../../../test/fixtures/config/fuels.config';
import { workspaceDir } from '../../../../test/utils/runCommands';
import { configureLogging, loggingConfig } from '../../utils/logger';

import * as buildSwayProgramsMod from './buildSwayPrograms';

jest.mock('child_process', () => ({
  __esModule: true,
  ...jest.requireActual('child_process'),
}));

describe('buildSwayPrograms', () => {
  const { onForcExit, onForcError } = buildSwayProgramsMod;

  const loggingBackup = structuredClone(loggingConfig);

  const reset = () => {
    jest.restoreAllMocks();
    configureLogging(loggingBackup);
  };

  beforeEach(reset);
  afterAll(reset);

  function mockAll(workspace: undefined | string) {
    const spawnMocks = {
      on: jest.fn(),
      stderr: {
        pipe: jest.fn(),
      },
      stdout: {
        pipe: jest.fn(),
      },
    };

    const spawn = jest
      .spyOn(childProcessMod, 'spawn')
      .mockImplementation(
        (..._) => spawnMocks as unknown as childProcessMod.ChildProcessWithoutNullStreams
      );

    const buildSwayProgram = jest
      .spyOn(buildSwayProgramsMod, 'buildSwayProgram')
      .mockImplementation();

    const config = {
      ...structuredClone(fuelsConfig),
      workspace,
    };

    return {
      config,
      spawn,
      spawnMocks,
      buildSwayProgram,
    };
  }

  test('building Sway programs using workspace', async () => {
    const { config, buildSwayProgram } = mockAll(workspaceDir);

    await buildSwayProgramsMod.buildSwayPrograms(config);

    expect(buildSwayProgram).toHaveBeenCalledTimes(1);
    expect(buildSwayProgram).toHaveBeenCalledWith(config, config.workspace);
  });

  test('building Sway programs using individual configs', async () => {
    const { config, buildSwayProgram } = mockAll(undefined);

    await buildSwayProgramsMod.buildSwayPrograms(config);

    expect(buildSwayProgram).toHaveBeenCalledTimes(4);
    expect(buildSwayProgram).toHaveBeenCalledWith(config, config.contracts[0]);
    expect(buildSwayProgram).toHaveBeenCalledWith(config, config.contracts[1]);
    expect(buildSwayProgram).toHaveBeenCalledWith(config, config.scripts[0]);
    expect(buildSwayProgram).toHaveBeenCalledWith(config, config.predicates[0]);
  });

  test('should pipe stdout', async () => {
    const { config, spawn, spawnMocks } = mockAll(workspaceDir);

    configureLogging({ isLoggingEnabled: true, isDebugEnabled: false });

    await buildSwayProgramsMod.buildSwayProgram(config, config.workspace);

    expect(spawn).toHaveBeenCalledTimes(1);
    expect(spawnMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(spawnMocks.stdout.pipe).toHaveBeenCalledTimes(0);
  });

  test('should pipe stdout and stderr', async () => {
    const { config, spawn, spawnMocks } = mockAll(workspaceDir);

    configureLogging({ isLoggingEnabled: true, isDebugEnabled: true });

    await buildSwayProgramsMod.buildSwayProgram(config, config.workspace);

    expect(spawn).toHaveBeenCalledTimes(1);
    expect(spawnMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(spawnMocks.stdout.pipe).toHaveBeenCalledTimes(1);
  });

  test('should resolve on successful exit', () => {
    const resolve = jest.fn();
    const reject = jest.fn((_reason?: number | Error) => {});
    onForcExit(reject, resolve)(null);
    expect(reject).toHaveBeenCalledTimes(0);
    expect(resolve).toHaveBeenCalledTimes(1);
  });

  test('should reject on failed exit', () => {
    const resolve = jest.fn();
    const reject = jest.fn((_reason?: number | Error) => {});
    onForcExit(reject, resolve)(1);
    expect(reject).toHaveBeenCalledTimes(1);
    expect(resolve).toHaveBeenCalledTimes(0);
  });

  test('should reject on error', () => {
    const reject = jest.fn();
    onForcError(reject)(new Error());
    expect(reject).toHaveBeenCalledTimes(1);
  });
});
