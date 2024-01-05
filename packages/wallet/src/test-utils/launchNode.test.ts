import { safeExec } from '@fuel-ts/errors/test-utils';
import type * as childProcessMod from 'child_process';

import { killNode, launchNode } from './launchNode';

type ChildProcessWithoutNullStreams = childProcessMod.ChildProcessWithoutNullStreams;

/**
 * @group node
 */
describe('launchNode', () => {
  test('launchNodeAndGetWallets - empty config', async () => {
    const { stop, provider, wallets } = await launchNodeAndGetWallets();
    expect(provider).toBeInstanceOf(Provider);
    expect(wallets.length).toBe(10);
    wallets.forEach((wallet) => {
      expect(wallet).toBeInstanceOf(WalletUnlocked);
    });
    stop();
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
  jest.spyOn(process.stdout, 'write').mockImplementation();

  const { innerMocks } = mockSpawn();

  const { cleanup } = await launchNode(defaultLaunchNodeConfig);

  expect(innerMocks.stderr.pipe).toHaveBeenCalledTimes(1);
  expect(innerMocks.stdout.pipe).toHaveBeenCalledTimes(0);

  cleanup();
});

test('should pipe stdout and stderr', async () => {
  jest.spyOn(process.stderr, 'write').mockImplementation();
  jest.spyOn(process.stdout, 'write').mockImplementation();

  const { innerMocks } = mockSpawn();

  await launchNode({
    ...defaultLaunchNodeConfig,
    debugEnabled: true,
  });

  expect(innerMocks.stderr.pipe).toHaveBeenCalledTimes(1);
  expect(innerMocks.stdout.pipe).toHaveBeenCalledTimes(1);
});

test('should kill process only if PID exists and node is alive', () => {
  const killFn = jest.fn();
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
