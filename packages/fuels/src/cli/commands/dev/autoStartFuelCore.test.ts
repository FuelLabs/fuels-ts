import { fuelsConfig } from '../../../../test/fixtures/fuels.config';

import { autoStartFuelCore } from './autoStartFuelCore';
import * as startFuelCoreMod from './startFuelCore';

/**
 * @group node
 */
describe('autoStartFuelCore', () => {
  function mockStartFuelCore() {
    const startFuelCore = vi
      .spyOn(startFuelCoreMod, 'startFuelCore')
      .mockResolvedValue({} as unknown as startFuelCoreMod.FuelCoreNode);

    return { startFuelCore };
  }

  test('should auto start `fuel-core`', async () => {
    const { startFuelCore } = mockStartFuelCore();

    const config = structuredClone(fuelsConfig);
    config.autoStartFuelCore = true;

    await autoStartFuelCore(config);

    expect(startFuelCore).toHaveBeenCalledTimes(1);
  });

  test('should not start `fuel-core`', async () => {
    const { startFuelCore } = mockStartFuelCore();

    const config = structuredClone(fuelsConfig);
    config.autoStartFuelCore = false;

    await autoStartFuelCore(config);

    expect(startFuelCore).toHaveBeenCalledTimes(0);
  });
});
