import { ErrorCode } from '@fuel-ts/errors';
import { safeExec, expectToThrowFuelError } from '@fuel-ts/errors/test-utils';
import { defaultSnapshotConfigs, sleep } from '@fuel-ts/utils';
import { waitUntilUnreachable } from '@fuel-ts/utils/test-utils';
import * as childProcessMod from 'child_process';
import { EventEmitter } from 'events';
import * as fsMod from 'fs';
import { PassThrough } from 'stream';

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
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('using ephemeral port 0 is possible', async () => {
    const { cleanup, port, url } = await launchNode({ port: '0', loggingEnabled: false });
    expect(await fetch(url)).toBeTruthy();
    expect(port).not.toEqual('0');

    cleanup();
  });

  test(
    'waits for GraphQL to serve requests after binding, including connection resets',
    { timeout: 20000 },
    async () => {
      const realFetch = global.fetch;
      let releaseHealth: () => void = () => undefined;
      const healthGate = new Promise<void>((resolve) => {
        releaseHealth = resolve;
      });
      const fetchSpy = vi
        .spyOn(global, 'fetch')
        .mockRejectedValueOnce(new TypeError('fetch failed'))
        .mockImplementationOnce(async (...args) => {
          await healthGate;
          return realFetch(...args);
        });
      let settled = false;
      const launchedPromise = launchNode({ loggingEnabled: false }).then((launched) => {
        settled = true;
        return launched;
      });

      try {
        await vi.waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(2), {
          timeout: 15000,
          interval: 100,
        });
        expect(settled).toBe(false);
        releaseHealth();
        const { url } = await launchedPromise;
        expect(await new Provider(url).getChain()).toBeTruthy();
      } finally {
        releaseHealth();
        (await launchedPromise).cleanup();
        fetchSpy.mockRestore();
      }
    }
  );

  it.each(['stderr', 'exit', 'signal', 'error'])(
    'cleans up and stops readiness polling after a child %s failure',
    async (failure) => {
      const child = Object.assign(new EventEmitter(), {
        stderr: new PassThrough(),
        pid: 12345,
        exitCode: null as number | null,
        signalCode: null as NodeJS.Signals | null,
      });
      const spawnSpy = vi
        .spyOn(childProcessMod, 'spawn')
        .mockReturnValueOnce(child as unknown as ReturnType<typeof childProcessMod.spawn>);
      const killSpy = vi.spyOn(process, 'kill').mockReturnValue(true);
      const mkdirSpy = vi.spyOn(fsMod, 'mkdirSync');
      let releaseHealth: (response: Response) => void = () => undefined;
      const fetchSpy = vi.spyOn(global, 'fetch').mockImplementationOnce(
        () =>
          new Promise<Response>((resolve) => {
            releaseHealth = resolve;
          })
      );
      const launch = safeExec(() => launchNode({ loggingEnabled: false }));

      try {
        await vi.waitFor(() => expect(spawnSpy).toHaveBeenCalled());
        child.stderr.write('Binding GraphQL provider to 127.0.0.1:12345\n');
        await vi.waitFor(() => expect(fetchSpy).toHaveBeenCalledOnce());
        const signal = fetchSpy.mock.calls[0][1]?.signal;

        if (failure === 'stderr') {
          child.stderr.write('ERROR readiness failed\n');
        } else if (failure === 'error') {
          child.emit('error', new Error('child failed'));
        } else {
          child.exitCode = failure === 'exit' ? 7 : null;
          child.signalCode = failure === 'signal' ? 'SIGTERM' : null;
          child.emit('exit', child.exitCode, child.signalCode);
        }

        const { error } = await launch;
        expect(error).toBeDefined();
        expect(signal?.aborted).toBe(true);
        expect(killSpy).toHaveBeenCalledWith(-child.pid);
        expect(fsMod.existsSync(mkdirSpy.mock.calls[0][0])).toBe(false);
        if (failure === 'exit' || failure === 'signal') {
          expect(error?.message).toContain(failure === 'exit' ? '7' : 'SIGTERM');
        }

        // Even a fetch implementation that ignores cancellation must not revive the launch.
        releaseHealth(new Response(JSON.stringify({ data: { health: true } })));
        await sleep(150);
        expect(fetchSpy).toHaveBeenCalledOnce();
      } finally {
        releaseHealth(new Response(JSON.stringify({ data: { health: true } })));
        spawnSpy.mockRestore();
        killSpy.mockRestore();
        mkdirSpy.mockRestore();
        fetchSpy.mockRestore();
      }
    }
  );

  it('cleanup kills the started node', async () => {
    const { cleanup, url } = await launchNode({ loggingEnabled: false });
    expect(await fetch(url)).toBeTruthy();

    cleanup();

    await waitUntilUnreachable(url);
  });

  it.each(['exit', 'stderr'])(
    'rejects a startup %s failure even when cleanup throws EPERM',
    async (failure) => {
      const child = Object.assign(new EventEmitter(), {
        stderr: new PassThrough(),
        pid: 12345,
        exitCode: null as number | null,
        signalCode: null,
      });
      const spawnSpy = vi
        .spyOn(childProcessMod, 'spawn')
        .mockReturnValueOnce(child as unknown as ReturnType<typeof childProcessMod.spawn>);
      const killSpy = vi.spyOn(process, 'kill').mockImplementation(() => {
        throw Object.assign(new Error('kill EPERM'), { code: 'EPERM' });
      });
      const mkdirSpy = vi.spyOn(fsMod, 'mkdirSync');
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const listenersBefore = process.listenerCount('uncaughtException');
      const launch = safeExec(() => launchNode({ loggingEnabled: false }));

      try {
        await vi.waitFor(() => expect(spawnSpy).toHaveBeenCalled());
        expect(() => {
          if (failure === 'exit') {
            child.exitCode = 7;
            child.emit('exit', 7, null);
          } else {
            child.stderr.write('ERROR invalid snapshot\n');
          }
        }).not.toThrow();
        const { error } = await launch;
        expect(error?.message).toContain(failure === 'exit' ? 'exit code: 7' : 'invalid snapshot');
        expect(fsMod.existsSync(mkdirSpy.mock.calls[0][0])).toBe(false);
        expect(process.listenerCount('uncaughtException')).toBe(listenersBefore);
      } finally {
        spawnSpy.mockRestore();
        killSpy.mockRestore();
        mkdirSpy.mockRestore();
        consoleSpy.mockRestore();
      }
    }
  );

  it.each(['stderr', 'exit', 'error'])(
    'a startup %s failure lets asynchronous error handling finish without exiting the parent',
    async (failure) => {
      const child = Object.assign(new EventEmitter(), {
        stderr: new PassThrough(),
        pid: 12345,
        exitCode: null,
        signalCode: null,
      });
      const spawnSpy = vi
        .spyOn(childProcessMod, 'spawn')
        .mockReturnValueOnce(child as unknown as ReturnType<typeof childProcessMod.spawn>);
      const killSpy = vi.spyOn(process, 'kill').mockImplementation(() => {
        setTimeout(() => child.emit('exit', null, 'SIGTERM'), 0);
        return true;
      });
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
      let failureHandled = false;
      const launch = launchNode({ loggingEnabled: false, killProcessOnExit: true }).catch(
        async (error: Error) => {
          await sleep(50);
          failureHandled = true;
          return error;
        }
      );
      try {
        await vi.waitFor(() => expect(spawnSpy).toHaveBeenCalled());
        if (failure === 'stderr') {
          child.stderr.write('ERROR invalid snapshot\n');
        } else if (failure === 'exit') {
          child.emit('exit', 7, null);
        } else {
          child.emit('error', new Error('spawn failed'));
        }
        const error = await launch;
        expect(error).toBeInstanceOf(Error);
        expect(failureHandled).toBe(true);
        expect(exitSpy).not.toHaveBeenCalled();
      } finally {
        spawnSpy.mockRestore();
        killSpy.mockRestore();
        exitSpy.mockRestore();
      }
    }
  );

  it.each([0, 7, null, 'cleanup'] as const)(
    'handles %s only after a successful launch',
    async (code) => {
      const child = Object.assign(new EventEmitter(), {
        stderr: new PassThrough(),
        pid: 12345,
        exitCode: null,
        signalCode: null,
      });
      const spawnSpy = vi
        .spyOn(childProcessMod, 'spawn')
        .mockReturnValueOnce(child as unknown as ReturnType<typeof childProcessMod.spawn>);
      const killSpy = vi.spyOn(process, 'kill').mockReturnValue(true);
      const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never);
      const fetchSpy = vi
        .spyOn(global, 'fetch')
        .mockResolvedValue(new Response(JSON.stringify({ data: { health: true } })));
      const launch = launchNode({ loggingEnabled: false, killProcessOnExit: true });
      try {
        await vi.waitFor(() => expect(spawnSpy).toHaveBeenCalled());
        child.stderr.write('Binding GraphQL provider to 127.0.0.1:12345\n');
        const { cleanup } = await launch;
        if (code === 'cleanup') {
          cleanup();
          child.emit('exit', null, 'SIGTERM');
          expect(exitSpy).not.toHaveBeenCalled();
        } else {
          child.emit('exit', code, code === null ? 'SIGTERM' : null);
          expect(exitSpy).toHaveBeenCalledExactlyOnceWith(code ?? 1);
        }
        cleanup();
      } finally {
        spawnSpy.mockRestore();
        killSpy.mockRestore();
        exitSpy.mockRestore();
        fetchSpy.mockRestore();
      }
    }
  );

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

    const { cleanup, pid } = await launchNode({ loggingEnabled: false });

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

    const { result } = await safeExec(async () => launchNode({ loggingEnabled: false }));

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
      await launchNode({ fuelCorePath, loggingEnabled: false });
    });

    expect(error).toBeTruthy();

    const command = spawnSpy.mock.calls[0][0];
    expect(command).toEqual(fuelCorePath);
  });

  test('reads FUEL_CORE_PATH environment variable for fuel-core binary', async () => {
    const spawnSpy = vi.spyOn(childProcessMod, 'spawn');
    process.env.FUEL_CORE_PATH = 'fuels-core';
    const { cleanup, url } = await launchNode({ loggingEnabled: false });

    await new Provider(url).init();

    const command = spawnSpy.mock.calls[0][0];
    expect(command).toEqual('fuels-core');

    cleanup();
  });

  test('should throw on error and log error message', { timeout: 15000 }, async () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

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
          loggingEnabled: true,
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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const { cleanup } = await launchNode({ loggingEnabled: true });
    const logs = logSpy.mock.calls.map((call) => call[0]);
    expect(logs.some((log) => log.includes('Binding GraphQL provider'))).toBe(true);
    cleanup();
  });

  test('cleanup removes temporary directory', async () => {
    const mkdirSyncSpy = vi.spyOn(fsMod, 'mkdirSync');
    const { cleanup } = await launchNode({ loggingEnabled: false });

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
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

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
