import { safeExec } from '@fuel-ts/errors/test-utils';
import * as childProcessMod from 'child_process';
import { rmSync, existsSync } from 'fs';
import { join } from 'path';

import { fuelsConfig } from '../../../../test/fixtures/fuels.config';
import { mockLogger } from '../../../../test/utils/mockLogger';
import type { FuelsConfig } from '../../types';
import { configureLogging, loggingConfig } from '../../utils/logger';

import { startFuelCore } from './startFuelCore';

type ChildProcessWithoutNullStreams = childProcessMod.ChildProcessWithoutNullStreams;

vi.mock('child_process', async () => {
  const mod = await vi.importActual('child_process');
  return {
    __esModule: true,
    ...mod,
  };
});

/**
 * @group node
 */
describe('startFuelCore', () => {
  const loggingConfigBkp = loggingConfig;

  afterEach(() => {
    configureLogging(loggingConfigBkp);
  });

  afterEach(() => {
    vi.restoreAllMocks();

    const chainConfig = join(fuelsConfig.basePath, '.fuels', 'chainConfig.json');
    if (existsSync(chainConfig)) {
      rmSync(chainConfig);
    }
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
      on: vi.fn(),
      stderr: {
        pipe: vi.fn(),
        on: vi.fn(stderrOn),
      },
      stdout: {
        pipe: vi.fn(),
      },
    };

    const spawn = vi
      .spyOn(childProcessMod, 'spawn')
      .mockReturnValue(innerMocks as unknown as ChildProcessWithoutNullStreams);

    return { spawn, innerMocks };
  }

  test('should start `fuel-core` node using built-in binary', async () => {
    mockLaunchNode();

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
  });

  test('should start `fuel-core` node using system binary', async () => {
    mockLaunchNode();

    const { killChildProcess } = await startFuelCore({
      ...structuredClone(fuelsConfig),
      useBuiltinFuelCore: false,
    });

    expect(walletTestUtilsMod.launchNode).toHaveBeenCalledTimes(1);

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
    mockLogger();

    vi.spyOn(process.stdout, 'write').mockReturnValue(true);

    configureLogging({ isDebugEnabled: false, isLoggingEnabled: true });

    const { innerMocks } = mockSpawn();

    await startFuelCore(fuelsConfig);

    expect(innerMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(innerMocks.stdout.pipe).toHaveBeenCalledTimes(0);
  });

  test('should pipe stdout and stderr', async () => {
    mockLogger();

    vi.spyOn(process.stderr, 'write').mockReturnValue(true);
    vi.spyOn(process.stdout, 'write').mockReturnValue(true);

    configureLogging({ isDebugEnabled: true, isLoggingEnabled: true });

    const { innerMocks } = mockSpawn();

    await startFuelCore(fuelsConfig);

    expect(innerMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(innerMocks.stdout.pipe).toHaveBeenCalledTimes(1);
  });

  test('should pipe nothing', async () => {
    mockLogger();

    configureLogging({ isDebugEnabled: false, isLoggingEnabled: false });

    const { innerMocks } = mockSpawn();

    await startFuelCore(fuelsConfig);

    expect(innerMocks.stderr.pipe).toHaveBeenCalledTimes(0);
    expect(innerMocks.stdout.pipe).toHaveBeenCalledTimes(0);
  });

  test('should kill process only if PID exists and node is alive', () => {
    const killFn = vi.fn();
    const state = { isDead: true };

    // should not kill
    let core = { pid: undefined } as ChildProcessWithoutNullStreams;
    killNode({ core, killFn, state })();
    expect(killFn).toHaveBeenCalledTimes(0);
    expect(state.isDead).toEqual(true);

    // should not kill
    core = { pid: 1 } as ChildProcessWithoutNullStreams;
    killNode({ core, killFn, state })();
    expect(killFn).toHaveBeenCalledTimes(0);
    expect(state.isDead).toEqual(true);

    // should kill
    state.isDead = false;
    killNode({ core, killFn, state })();
    expect(killFn).toHaveBeenCalledTimes(1);
    expect(state.isDead).toEqual(true);
  });
});
