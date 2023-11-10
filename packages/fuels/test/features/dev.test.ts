import * as chokidar from 'chokidar';

import * as buildMod from '../../src/cli/commands/build/index';
import * as deployMod from '../../src/cli/commands/deploy/index';
import { mockLogger } from '../utils/mockLogger';
import { mockStartFuelCore } from '../utils/mockStartFuelCore';
import { resetDiskAndMocks } from '../utils/resetDiskAndMocks';
import { runInit, runDev } from '../utils/runCommands';

jest.mock('chokidar', () => ({
  __esModule: true,
  ...jest.requireActual('chokidar'),
}));

describe('dev', () => {
  beforeEach(mockLogger);
  afterEach(resetDiskAndMocks);

  function mockAll() {
    mockLogger();

    const { startFuelCore, killChildProcess } = mockStartFuelCore();

    const build = jest.spyOn(buildMod, 'build').mockImplementation();
    const deploy = jest.spyOn(deployMod, 'deploy').mockImplementation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const on: any = jest.fn(() => ({ on }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const watch = jest.spyOn(chokidar, 'watch').mockReturnValue({ on } as any);

    return { startFuelCore, killChildProcess, build, deploy, on, watch };
  }

  it('should run `dev` command', async () => {
    const { startFuelCore, killChildProcess, build, deploy, on, watch } = mockAll();

    await runInit();
    await runDev();

    expect(startFuelCore).toHaveBeenCalledTimes(1);
    expect(killChildProcess).toHaveBeenCalledTimes(0);
    expect(build).toHaveBeenCalledTimes(1);
    expect(deploy).toHaveBeenCalledTimes(1);

    expect(watch).toHaveBeenCalledTimes(2);
    expect(on).toHaveBeenCalledTimes(2);
  });
});
