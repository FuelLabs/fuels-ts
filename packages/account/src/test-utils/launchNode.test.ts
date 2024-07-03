import { ErrorCode } from '@fuel-ts/errors';
import { safeExec, expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { defaultSnapshotConfigs } from '@fuel-ts/utils';
import { waitUntilUnreachable } from '@fuel-ts/utils/test-utils';
import * as childProcessMod from 'child_process';

import { Provider } from '../providers';

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
 * @group node
 */
describe('launchNode', () => {
  test('using ephemeral port 0 is possible', async () => {
    const { cleanup, port, url } = await launchNode({ port: '0' });
    expect(await fetch(url)).toBeTruthy();
    expect(port).not.toEqual('0');

    cleanup();
  });

  it('cleanup kills the started node', async () => {
    const { cleanup, url } = await launchNode();
    expect(await fetch(url)).toBeTruthy();

    cleanup();

    await waitUntilUnreachable(url);
  });

  test('should start `fuel-core` node using system binary', async () => {
    const spawnSpy = vi.spyOn(childProcessMod, 'spawn');

    process.env.FUEL_CORE_PATH = '';

    const { result } = await safeExec(async () => launchNode());

    const command = spawnSpy.mock.calls[0][0];
    expect(command).toEqual('fuel-core');

    process.env.FUEL_CORE_PATH = 'fuels-core';

    /**
     * result can be undefined when running in CI and fuel-core is not installed
     * meaning that spawn(fuel-core, ...) threw an error
     */
    if (result !== undefined) {
      (await result)?.cleanup();
    }
  });

  test('should start `fuel-core` node using custom binary', async () => {
    const spawnSpy = vi.spyOn(childProcessMod, 'spawn');

    const fuelCorePath = './my-fuel-core-binary-path';
    const { error } = await safeExec(async () => {
      await launchNode({ fuelCorePath, loggingEnabled: true });
    });

    expect(error).toBeTruthy();

    const command = spawnSpy.mock.calls[0][0];
    expect(command).toEqual(fuelCorePath);
  });

  test('reads FUEL_CORE_PATH environment variable for fuel-core binary', async () => {
    const spawnSpy = vi.spyOn(childProcessMod, 'spawn');
    process.env.FUEL_CORE_PATH = 'fuels-core';
    const { cleanup, url } = await launchNode();
    await Provider.create(url);

    const command = spawnSpy.mock.calls[0][0];
    expect(command).toEqual('fuels-core');

    cleanup();
  });

  test('should throw on error and log error message', async () => {
    const logSpy = vi.spyOn(console, 'log');

    const invalidCoin = {
      asset_id: 'whatever',
      tx_id: '',
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: '',
      amount: 0,
    };

    const error = await expectToThrowFuelError(
      async () =>
        launchNode({
          loggingEnabled: false,
          snapshotConfig: {
            ...defaultSnapshotConfigs,
            stateConfig: {
              coins: [invalidCoin],
              messages: [],
            },
          },
        }),
      {
        code: ErrorCode.NODE_LAUNCH_FAILED,
      }
    );

    expect(error).toBeTruthy();

    expect(logSpy).toHaveBeenCalledWith(error?.message);
  });

  test('logs fuel-core outputs via console.log', async () => {
    const logSpy = vi.spyOn(console, 'log');

    const { cleanup } = await launchNode({ loggingEnabled: true });
    const logs = logSpy.mock.calls.map((call) => call[0]);
    expect(logs.some((log) => log.includes('Binding GraphQL provider'))).toBe(true);
    cleanup();
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
