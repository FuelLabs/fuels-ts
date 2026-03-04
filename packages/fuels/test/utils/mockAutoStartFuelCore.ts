import type { MockInstance } from 'vitest';

import * as autoStartFuelCoreMod from '../../src/cli/commands/dev/autoStartFuelCore';

export const mockStartFuelCore = (): {
  killChildProcess: MockInstance;
  autoStartFuelCore: MockInstance;
  fuelCore: autoStartFuelCoreMod.FuelCoreNode;
} => {
  const killChildProcess = vi.fn();

  const fuelCore: autoStartFuelCoreMod.FuelCoreNode = {
    bindIp: '0.0.0.0',
    accessIp: '127.0.0.1',
    port: 4000,
    providerUrl: 'http://127.0.0.1:4000/v1/graphql',
    killChildProcess,
    snapshotDir: '/some/path',
  };

  const autoStartFuelCore = vi
    .spyOn(autoStartFuelCoreMod, 'autoStartFuelCore')
    .mockResolvedValue(fuelCore);

  return { autoStartFuelCore, killChildProcess, fuelCore };
};
