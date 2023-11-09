import type { FuelsConfig } from '../../src';
import * as startFuelCoreMod from '../../src/cli/commands/dev/startFuelCore';

export const mockStartFuelCore = () => {
  const killChildProcess = jest.fn();

  const startFuelCore = jest
    .spyOn(startFuelCoreMod, 'startFuelCore')
    .mockImplementation((_config: FuelsConfig) =>
      Promise.resolve({
        bindIp: '0.0.0.0',
        accessIp: '127.0.0.1',
        port: 4000,
        providerUrl: `http://127.0.0.1:4000/graphql`,
        killChildProcess,
        chainConfig: '/some/path/chainConfig.json',
      })
    );

  return { startFuelCore, killChildProcess };
}
