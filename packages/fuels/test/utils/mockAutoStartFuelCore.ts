import { FUEL_NETWORK_URL } from '@fuel-ts/account/configs';
import type { SpyInstance } from 'vitest';

import * as autoStartFuelCoreMod from '../../src/cli/commands/dev/autoStartFuelCore';

export const mockStartFuelCore = (): {
  killChildProcess: SpyInstance;
  autoStartFuelCore: SpyInstance;
  fuelCore: autoStartFuelCoreMod.FuelCoreNode;
} => {
  const killChildProcess = vi.fn();

  const fuelCore: autoStartFuelCoreMod.FuelCoreNode = {
    bindIp: '0.0.0.0',
    accessIp: '127.0.0.1',
    port: 4000,
    providerUrl: FUEL_NETWORK_URL,
    killChildProcess,
    chainConfigPath: '/some/path/chainConfig.json',
  };

  const autoStartFuelCore = vi
    .spyOn(autoStartFuelCoreMod, 'autoStartFuelCore')
    .mockResolvedValue(fuelCore);

  return { autoStartFuelCore, killChildProcess, fuelCore };
};
