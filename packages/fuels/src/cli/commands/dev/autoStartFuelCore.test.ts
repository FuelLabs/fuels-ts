import { existsSync, rmSync } from 'fs';
import { join } from 'path';

import { fuelsConfig } from '../../../../test/fixtures/fuels.config';
import * as testUtilsMod from '../../../test-utils';
import type { FuelsConfig } from '../../types';

import type { FuelCoreNode } from './autoStartFuelCore';
import { autoStartFuelCore } from './autoStartFuelCore';

/**
 * @group node
 */
describe('autoStartFuelCore', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    const chainConfig = join(fuelsConfig.basePath, '.fuels', 'chainConfig.json');
    const metadata = join(fuelsConfig.basePath, '.fuels', 'metadata.json');
    const stateConfig = join(fuelsConfig.basePath, '.fuels', 'stateConfig.json');
    const filepaths = [chainConfig, metadata, stateConfig];
    filepaths.forEach((filepath) => {
      if (existsSync(filepath)) {
        rmSync(filepath);
      }
    });
  });

  function mockLaunchNode() {
    const launchNode = vi.spyOn(testUtilsMod, 'launchNode').mockReturnValue(
      Promise.resolve({
        cleanup: () => {},
        ip: '0.0.0.0',
        port: '4000',
        url: 'http://127.0.0.1:4000/v1/graphql',
        snapshotDir: '/some/path',
      })
    );
    return { launchNode };
  }

  test('should auto start `fuel-core`', async () => {
    const { launchNode } = mockLaunchNode();

    const config = structuredClone(fuelsConfig);
    config.autoStartFuelCore = true;

    await autoStartFuelCore(config);

    expect(launchNode).toHaveBeenCalledTimes(1);
  });

  test('should not start `fuel-core`', async () => {
    const { launchNode } = mockLaunchNode();

    const config = structuredClone(fuelsConfig);
    config.autoStartFuelCore = false;

    await autoStartFuelCore(config);

    expect(launchNode).toHaveBeenCalledTimes(0);
  });

  test('should start `fuel-core` node using custom binary', async () => {
    const { launchNode } = mockLaunchNode();

    const copyConfig: FuelsConfig = structuredClone(fuelsConfig);
    copyConfig.fuelCorePath = 'fuels-core';

    // this will cause it to autofind a free port
    copyConfig.fuelCorePort = undefined;
    delete copyConfig.fuelCorePort;

    const core = (await autoStartFuelCore(copyConfig)) as FuelCoreNode;

    expect(launchNode).toHaveBeenCalledTimes(1);

    expect(core.bindIp).toEqual('0.0.0.0');
    expect(core.accessIp).toEqual('127.0.0.1');
    expect(core.port).toBeGreaterThanOrEqual(4000);
    expect(core.providerUrl).toMatch(/http:\/\/127\.0\.0\.1:([0-9]+)\/v1\/graphql/);
    expect(core.killChildProcess).toBeTruthy();
    expect(launchNode).toBeCalledWith(
      expect.objectContaining({
        fuelCorePath: 'fuels-core',
      })
    );

    core.killChildProcess();
  });

  test('should start `fuel-core` node using system binary', async () => {
    const { launchNode } = mockLaunchNode();

    const config = structuredClone(fuelsConfig);
    const core = (await autoStartFuelCore(config)) as FuelCoreNode;

    expect(launchNode).toHaveBeenCalledTimes(1);

    expect(core.bindIp).toEqual('0.0.0.0');
    expect(core.accessIp).toEqual('127.0.0.1');
    expect(core.port).toBeGreaterThanOrEqual(4000);
    expect(core.providerUrl).toMatch(/http:\/\/127\.0\.0\.1:([0-9]+)\/v1\/graphql/);
    expect(core.killChildProcess).toBeTruthy();

    core.killChildProcess();
  });
});
