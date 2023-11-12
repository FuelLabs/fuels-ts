import type { SpyInstance } from 'vitest';

import * as autoStartFuelCoreMod from '../../src/cli/commands/dev/autoStartFuelCore';
import type * as startFuelCoreMod from '../../src/cli/commands/dev/startFuelCore';

export const mockStartFuelCore = (): {
  killChildProcess: SpyInstance;
  autoStartFuelCore: SpyInstance;
  fuelCore: startFuelCoreMod.FuelCoreNode;
} => {
  const killChildProcess = vi.fn();

  const fuelCore = {
    bindIp: '0.0.0.0',
    accessIp: '127.0.0.1',
    port: 4000,
    providerUrl: `http://127.0.0.1:4000/graphql`,
    killChildProcess,
    chainConfig: '/some/path/chainConfig.json',
  };

  const autoStartFuelCore = vi
    .spyOn(autoStartFuelCoreMod, 'autoStartFuelCore')
    .mockResolvedValue(fuelCore);

  return { autoStartFuelCore, killChildProcess, fuelCore };
};
