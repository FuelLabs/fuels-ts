import { fuelsConfig } from '../../../../test/fixtures/fuels.config';

import { autoStartFuelCore } from './autoStartFuelCore';
import * as autoStartFuelCoreMod from './autoStartFuelCore';

/**
 * @group node
 */
describe('autoStartFuelCore', () => {
  function mockStartFuelCore() {
    const startFuelCore = vi
      .spyOn(autoStartFuelCoreMod, 'startFuelCore')
      .mockResolvedValue({} as unknown as autoStartFuelCoreMod.FuelCoreNode);

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
