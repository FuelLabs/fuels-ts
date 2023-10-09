import * as chokidar from 'chokidar';

import type { FuelsConfig } from '../src';
import * as buildMod from '../src/cli/commands/build/index';
import * as deployMod from '../src/cli/commands/deploy/index';
import * as startCoreMod from '../src/cli/commands/dev/startFuelCore';
import { loggingConfig, configureLogging } from '../src/cli/utils/logger';

import { clean, runInit, runDev } from './utils/runCommands';

jest.mock('chokidar', () => ({
  __esModule: true,
  ...jest.requireActual('chokidar'),
}));

describe('dev', () => {
  const loggingBackup = structuredClone(loggingConfig);

  beforeEach(() => {
    jest.restoreAllMocks();
    configureLogging({ isLoggingEnabled: false, isDebugEnabled: false });
    clean();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    configureLogging(loggingBackup);
    clean();
  });

  it('should run `dev` command', async () => {
    const startFuelCore = jest
      .spyOn(startCoreMod, 'startFuelCore')
      .mockImplementation((_config: FuelsConfig) =>
        Promise.resolve({
          bindIp: '0.0.0.0',
          accessIp: '127.0.0.1',
          port: 4000,
          providerUrl: `http://127.0.0.1:4000/graphql`,
          killChildProcess: jest.fn(),
          chainConfig: '/some/path/chainConfig.json',
        })
      );

    const build = jest.spyOn(buildMod, 'build').mockImplementation();
    const deploy = jest.spyOn(deployMod, 'deploy').mockImplementation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const on: any = jest.fn(() => ({ on }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const watch = jest.spyOn(chokidar, 'watch').mockReturnValue({ on } as any);

    await runInit();
    await runDev();

    expect(startFuelCore).toHaveBeenCalledTimes(1);
    expect(build).toHaveBeenCalledTimes(1);
    expect(deploy).toHaveBeenCalledTimes(1);

    expect(watch).toHaveBeenCalledTimes(1);
    expect(on).toHaveBeenCalledTimes(3);
  });
});
