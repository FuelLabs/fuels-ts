import { safeExec } from '@fuel-ts/errors/test-utils';
import * as childProcessMod from 'child_process';

import type { LaunchNodeOptions } from './launchNode';
import { killNode, launchNode } from './launchNode';

type ChildProcessWithoutNullStreams = childProcessMod.ChildProcessWithoutNullStreams;

vi.mock('child_process', async () => {
  const mod = await vi.importActual('child_process');
  return {
    __esModule: true,
    ...mod,
  };
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
      removeAllListeners: vi.fn(),
    },
    stdout: {
      pipe: vi.fn(),
      removeAllListeners: vi.fn(),
    },
  } as unknown as ChildProcessWithoutNullStreams;

  const spawn = vi.spyOn(childProcessMod, 'spawn').mockReturnValue(innerMocks);

  return { spawn, innerMocks };
}

const defaultLaunchNodeConfig: Partial<LaunchNodeOptions> = {
  ip: '0.0.0.0',
  port: '4000',
};

/**
 * @group node
 */
describe('launchNode', () => {
  test('should start `fuel-core` node using built-in binary', async () => {
    mockSpawn();

    const { cleanup, ip, port } = await launchNode({
      ...defaultLaunchNodeConfig,
      useSystemFuelCore: false,
    });

    expect(ip).toBe('0.0.0.0');
    expect(port).toBe('4000');
    cleanup();
  });

  test('should start `fuel-core` node using system binary', async () => {
    mockSpawn();

    const { cleanup, ip, port } = await launchNode({
      ...defaultLaunchNodeConfig,
      useSystemFuelCore: true,
    });

    expect(ip).toBe('0.0.0.0');
    expect(port).toBe('4000');

    cleanup();
  });

  test('should throw on error', async () => {
    const { innerMocks } = mockSpawn({ shouldError: true });

    const { error: safeError, result } = await safeExec(async () =>
      launchNode(defaultLaunchNodeConfig)
    );

    expect(safeError).toBeTruthy();
    expect(result).not.toBeTruthy();

    expect(innerMocks.on).toHaveBeenCalledTimes(1);
    expect(innerMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(innerMocks.stdout.pipe).toHaveBeenCalledTimes(0);
  });

  test('should pipe stdout', async () => {
    vi.spyOn(process.stdout, 'write');

    const { innerMocks } = mockSpawn();

    const { cleanup } = await launchNode(defaultLaunchNodeConfig);

    expect(innerMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(innerMocks.stdout.pipe).toHaveBeenCalledTimes(0);

    cleanup();
  });

  test('should pipe stdout and stderr', async () => {
    vi.spyOn(process.stderr, 'write');
    vi.spyOn(process.stdout, 'write');

    const { innerMocks } = mockSpawn();

    await launchNode({
      ...defaultLaunchNodeConfig,
      debugEnabled: true,
    });

    expect(innerMocks.stderr.pipe).toHaveBeenCalledTimes(1);
    expect(innerMocks.stdout.pipe).toHaveBeenCalledTimes(1);
  });

  test('should kill process only if PID exists and node is alive', () => {
    const killFn = vi.fn();
    const state = { isDead: true };

    // should not kill
    let child = {
      pid: undefined,
      stdout: {
        removeAllListeners: () => {},
      },
      stderr: {
        removeAllListeners: () => {},
      },
    } as ChildProcessWithoutNullStreams;

    killNode({
      child,
      configPath: '',
      killFn,
      state,
    });

    expect(killFn).toHaveBeenCalledTimes(0);
    expect(state.isDead).toEqual(true);

    // should not kill
    child = {
      pid: 1,
      stdout: {
        removeAllListeners: () => {},
      },
      stderr: {
        removeAllListeners: () => {},
      },
    } as ChildProcessWithoutNullStreams;

    killNode({
      child,
      configPath: '',
      killFn,
      state,
    });

    expect(killFn).toHaveBeenCalledTimes(0);
    expect(state.isDead).toEqual(true);

    // should kill
    state.isDead = false;

    killNode({
      child,
      configPath: '',
      killFn,
      state,
    });

    expect(killFn).toHaveBeenCalledTimes(1);
    expect(state.isDead).toEqual(true);
  });
});
