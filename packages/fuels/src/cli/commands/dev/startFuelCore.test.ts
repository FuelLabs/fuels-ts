import * as testUtilsMod from '@fuel-ts/wallet/test-utils';
import { rmSync, existsSync } from 'fs';
import { join } from 'path';

import { fuelsConfig } from '../../../../test/fixtures/fuels.config';
import type { FuelsConfig } from '../../types';

import { startFuelCore } from './autoStartFuelCore';

vi.mock('@fuel-ts/wallet/test-utils', async () => {
  const mod = await vi.importActual('@fuel-ts/wallet/test-utils');
  return {
    __esModule: true,
    ...mod,
  };
});

/**
 * @group node
 */
describe('startFuelCore', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    const chainConfig = join(fuelsConfig.basePath, '.fuels', 'chainConfig.json');
    if (existsSync(chainConfig)) {
      rmSync(chainConfig);
    }
  });

  function mockLaunchNode() {
    vi.spyOn(testUtilsMod, 'launchNode').mockImplementation((..._: unknown[]) =>
      Promise.resolve({ cleanup: () => {}, ip: '0.0.0.0', port: '4000' })
    );
  }

  test('should start `fuel-core` node using built-in binary', async () => {
    mockLaunchNode();

    const copyConfig: FuelsConfig = structuredClone(fuelsConfig);
    copyConfig.useBuiltinFuelCore = true;

    // this will cause it to autofind a free port
    copyConfig.fuelCorePort = undefined;
    delete copyConfig.fuelCorePort;

    const core = await startFuelCore(copyConfig);

    expect(testUtilsMod.launchNode).toHaveBeenCalledTimes(1);

    expect(core.bindIp).toEqual('0.0.0.0');
    expect(core.accessIp).toEqual('127.0.0.1');
    expect(core.port).toBeGreaterThanOrEqual(4000);
    expect(core.providerUrl).toMatch(/http:\/\/127\.0\.0\.1:([0-9]+)\/graphql/);
    expect(core.killChildProcess).toBeTruthy();

    core.killChildProcess();
  });

  test('should start `fuel-core` node using system binary', async () => {
    mockLaunchNode();

    const core = await startFuelCore({
      ...structuredClone(fuelsConfig),
      useBuiltinFuelCore: false,
    });

    expect(testUtilsMod.launchNode).toHaveBeenCalledTimes(1);

    expect(core.bindIp).toEqual('0.0.0.0');
    expect(core.accessIp).toEqual('127.0.0.1');
    expect(core.port).toBeGreaterThanOrEqual(4000);
    expect(core.providerUrl).toMatch(/http:\/\/127\.0\.0\.1:([0-9]+)\/graphql/);
    expect(core.killChildProcess).toBeTruthy();

    core.killChildProcess();
  });
});
