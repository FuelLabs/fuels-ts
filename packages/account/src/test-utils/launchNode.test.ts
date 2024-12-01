import { ErrorCode } from '@fuel-ts/errors';
import { safeExec, expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { defaultSnapshotConfigs, sleep } from '@fuel-ts/utils';
import { waitUntilUnreachable } from '@fuel-ts/utils/test-utils';
import * as childProcessMod from 'child_process';
import * as fsMod from 'fs';

import { Provider } from '../providers';

import { launchNode } from './launchNode';

vi.mock('child_process', async () => {
  const mod = await vi.importActual('child_process');
  return {
    __esModule: true,
    ...mod,
  };
});

vi.mock('fs', async () => {
  const mod = await vi.importActual('fs');
  return {
    __esModule: true,
    ...mod,
  };
});

/**
 * @group node
 */
describe('launchNode', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });


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

  /**
   * Spawning the child process in a detached state
   * Results in the OS assigning a process group to the child.
   * Combining that with `process.kill(-pid)`,
   * which sends a "kill process group" signal to the OS,
   * ensures that the node will be killed.
   */
  it('spawns the fuel-core node in a detached state and kills the process group on cleanup', async () => {
    const spawnSpy = vi.spyOn(childProcessMod, 'spawn');
    const killSpy = vi.spyOn(process, 'kill');

    const { cleanup, pid } = await launchNode();

    const spawnOptions = spawnSpy.mock.calls[0][2];
    expect(spawnOptions.detached).toBeTruthy();

    cleanup();

    expect(killSpy).toHaveBeenCalledTimes(1);
    // adding a minus prefix kills the process group
    expect(killSpy).toHaveBeenCalledWith(-pid);
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

  test('should throw on error and log error message', { timeout: 15000 }, async () => {
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

  test('cleanup removes temporary directory', async () => {
    const mkdirSyncSpy = vi.spyOn(fsMod, 'mkdirSync');
    const { cleanup } = await launchNode();

    expect(mkdirSyncSpy).toHaveBeenCalledTimes(1);
    const tempDirPath = mkdirSyncSpy.mock.calls[0][0];
    cleanup();

    // wait until cleanup finishes (done via events)
    await sleep(1500);
    expect(fsMod.existsSync(tempDirPath)).toBeFalsy();
  });

  test('temporary directory gets removed on error', async () => {
    const mkdirSyncSpy = vi.spyOn(fsMod, 'mkdirSync');

    const invalidCoin = {
      asset_id: 'whatever',
      tx_id: '',
      output_index: 0,
      tx_pointer_block_height: 0,
      tx_pointer_tx_idx: 0,
      owner: '',
      amount: 0,
    };

    const { error } = await safeExec(async () =>
      launchNode({
        loggingEnabled: false,
        snapshotConfig: {
          ...defaultSnapshotConfigs,
          stateConfig: {
            coins: [invalidCoin],
            messages: [],
          },
        },
      })
    );
    expect(error).toBeDefined();

    expect(mkdirSyncSpy).toHaveBeenCalledTimes(1);
    const tempDirPath = mkdirSyncSpy.mock.calls[0][0];

    // wait until cleanup finishes (done via events)
    await sleep(1500);
    expect(fsMod.existsSync(tempDirPath)).toBeFalsy();
  });

  test('calling cleanup multiple times does not retry process killing', async () => {
    const killSpy = vi.spyOn(process, 'kill');

    const { cleanup } = await launchNode({ loggingEnabled: false });

    cleanup();

    expect(killSpy).toHaveBeenCalledTimes(1);

    cleanup();

    expect(killSpy).toHaveBeenCalledTimes(1);
  });

  test('external killing of node runs side-effect cleanup', async () => {
    const mkdirSyncSpy = vi.spyOn(fsMod, 'mkdirSync');

    const { pid } = await launchNode({ loggingEnabled: false });

    expect(mkdirSyncSpy).toHaveBeenCalledTimes(1);
    const tempDirPath = mkdirSyncSpy.mock.calls[0][0];

    childProcessMod.execSync(`kill -- -${pid}`);
    // wait until cleanup finishes (done via events)
    await sleep(1500);
    expect(fsMod.existsSync(tempDirPath)).toBeFalsy();
  });

  test('calling cleanup on externally killed node does not throw', async () => {
    const mkdirSyncSpy = vi.spyOn(fsMod, 'mkdirSync');
    const logSpy = vi.spyOn(console, 'log');

    const { pid, cleanup } = await launchNode({ loggingEnabled: false });
    expect(mkdirSyncSpy).toHaveBeenCalledTimes(1);

    childProcessMod.execSync(`kill -- -${pid}`);
    // wait until cleanup finishes (done via events)
    await sleep(1500);
    cleanup();

    expect(logSpy).toHaveBeenCalledWith(
      `fuel-core node under pid ${pid} does not exist. The node might have been killed before cleanup was called. Exiting cleanly.`
    );
  });

  test('should clean up when unable to kill process with "RangeError: pid must be a positive integer" error', async () => {
    const killSpy = vi.spyOn(process, 'kill').mockImplementationOnce(() => {
      throw new RangeError('pid must be a positive integer');
    });

    const { pid, cleanup } = await launchNode({ loggingEnabled: false });

    cleanup();

    expect(killSpy).toBeCalledTimes(2);
    expect(killSpy).toBeCalledWith(-pid);
    expect(killSpy).toBeCalledWith(+pid);
  });
});
