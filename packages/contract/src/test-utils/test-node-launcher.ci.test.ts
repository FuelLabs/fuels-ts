import { FuelError } from '@fuel-ts/errors';
import { expectToThrowFuelError } from '@fuel-ts/errors/test-utils';

import { TestNodeLauncher } from './test-node-launcher';

describe('TestNodeLauncher, cache with killall stuff', () => {
  process.env.FUEL_TEST_NODE_LAUNCHER_CI = 'true';
  test('throws if no fuel-core nodes exist', async () => {
    await expectToThrowFuelError(
      async () => {
        await TestNodeLauncher.prepareCache(5);
      },
      { code: FuelError.CODES.NOT_IMPLEMENTED, message: 'no fuel-core nodes available.' }
    );
  });
  test('reads chainConfig of the nodes', async () => {
    await TestNodeLauncher.prepareCache(5);
  });

  test('prepares cache if fuel-core nodes exist', async () => {
    await TestNodeLauncher.prepareCache(5);
  });

  test('kills all nodes with killall', async () => {
    await TestNodeLauncher.prepareCache(5);
  });
});
