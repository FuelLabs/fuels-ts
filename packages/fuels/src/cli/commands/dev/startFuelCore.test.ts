import { safeExec } from '@fuel-ts/errors/test-utils';
import * as childProcessMod from 'child_process';

import { fuelsConfig } from '../../../../test/fixtures/config/fuels.config';
import { mockLogger } from '../../../../test/utils/mockLogger';
import { resetDiskAndMocks } from '../../../../test/utils/resetDiskAndMocks';
import type { FuelsConfig } from '../../types';
import { configureLogging, loggingConfig } from '../../utils/logger';

import { killNode, startFuelCore } from './startFuelCore';

type ChildProcessWithoutNullStreams = childProcessMod.ChildProcessWithoutNullStreams;

jest.mock('child_process', () => ({
  __esModule: true,
  ...jest.requireActual('child_process'),
}));

describe('startFuelCore', () => {
  const loggingBackup = structuredClone(loggingConfig);

  afterEach(() => {
    resetDiskAndMocks();
    configureLogging(loggingBackup);
  });

  /**
   * This should mimic the stderr.on('data') event, returning both
   * success and error messages, as strings. These messages are like
   * the ones from `fuel-core` startup log messages. We filter them
   * to know fuel-core state.
   */
  function mockSpawn(params: { shouldError: boolean } = { shouldError: false }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stderrOn = (eventName: string, fn: (data: any) => void) => {
      if (eventName === 'data') {
        if (params.shouldError) {
          // The `IO error` message simulates a possible fuel-core error log message
          fn('IO error');
        } else {
          // The `Binding GraphQL provider to` message simulates a fuel-core
          // successful startup log message, usually meaning that the node
          // is up and waiting for connections
          fn('Binding GraphQL provider to');
        }
      }
    };

    const innerMocks = {
      on: jest.fn(),
      stderr: {
        pipe: jest.fn(),
        on: jest.fn(stderrOn),
      },
      stdout: {
        pipe: jest.fn(),
      },
    };

    const spawn = jest
      .spyOn(childProcessMod, 'spawn')
      .mockImplementation((..._) => innerMocks as unknown as ChildProcessWithoutNullStreams);

    return { spawn, innerMocks };
  }

  test('should start `fuel-core` node using built-in binary', async () => {
    mockLogger();

    const copyConfig: FuelsConfig = structuredClone(fuelsConfig);
    copyConfig.useBuiltinFuelCore = true;

    // this will cause it to autofind a free port
    copyConfig.fuelCorePort = undefined;
    delete copyConfig.fuelCorePort;

    const core = await startFuelCore(copyConfig);

    expect(core.bindIp).toEqual('0.0.0.0');
    expect(core.accessIp).toEqual('127.0.0.1');
    expect(core.port).toBeGreaterThanOrEqual(4000);
    expect(core.providerUrl).toMatch(/http:\/\/127\.0\.0\.1:([0-9]+)\/graphql/);
    expect(core.killChildProcess).toBeTruthy();

    core.killChildProcess();
  });

  test('should start `fuel-core` node using system binary', async () => {
    const { spawn, innerMocks } = mockSpawn();

    await startFuelCore({
      ...structuredClone(fuelsConfig),
      useBuiltinFuelCore: false,
    });

    expect(spawn).toHaveBeenCalledTimes(1);
    expect(spawn.mock.calls[0][0]).toMatch(/^fuel-core$/m);

    expect(innerMocks.on).toHaveBeenCalledTimes(1);
    expect(innerMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(innerMocks.stdout.pipe).toHaveBeenCalledTimes(0);
  });

  test('should throw on error', async () => {
    const { innerMocks } = mockSpawn({ shouldError: true });
    const { error } = mockLogger();

    const { error: safeError, result } = await safeExec(async () => startFuelCore(fuelsConfig));

    expect(safeError).toBeTruthy();
    expect(result).not.toBeTruthy();

    expect(error).toHaveBeenCalledTimes(1);

    expect(innerMocks.on).toHaveBeenCalledTimes(1);
    expect(innerMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(innerMocks.stdout.pipe).toHaveBeenCalledTimes(0);
  });

  test('should pipe stdout', async () => {
    jest.spyOn(process.stdout, 'write').mockImplementation();
    configureLogging({ isDebugEnabled: false, isLoggingEnabled: true });

    const { innerMocks } = mockSpawn();

    await startFuelCore(fuelsConfig);

    expect(innerMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(innerMocks.stdout.pipe).toHaveBeenCalledTimes(0);
  });

  test('should pipe stdout and stderr', async () => {
    jest.spyOn(process.stderr, 'write').mockImplementation();
    jest.spyOn(process.stdout, 'write').mockImplementation();
    configureLogging({ isDebugEnabled: true, isLoggingEnabled: true });

    const { innerMocks } = mockSpawn();

    await startFuelCore(fuelsConfig);

    expect(innerMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(innerMocks.stdout.pipe).toHaveBeenCalledTimes(1);
  });

  test('should kill process only if PID exists', () => {
    const kill = jest.fn();

    const mock1 = { pid: undefined } as ChildProcessWithoutNullStreams;
    killNode(mock1, kill)();
    expect(kill).toHaveBeenCalledTimes(0);

    const mock2 = { pid: 1 } as ChildProcessWithoutNullStreams;
    killNode(mock2, kill)();
    expect(kill).toHaveBeenCalledTimes(1);
  });
});
