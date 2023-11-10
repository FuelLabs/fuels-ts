import * as chokidar from 'chokidar';

import * as buildMod from '../../src/cli/commands/build/index';
import * as deployMod from '../../src/cli/commands/deploy/index';
import { mockLogger } from '../utils/mockLogger';
import { mockStartFuelCore } from '../utils/mockStartFuelCore';
import { resetDiskAndMocks } from '../utils/resetDiskAndMocks';
import { runInit, runDev } from '../utils/runCommands';

vi.mock('chokidar', async () => {
  const mod = await vi.importActual('chokidar');
  return {
    __esModule: true,
    // @ts-expect-error spreading module import
    ...mod,
  };
});

/**
 * @group node
 */
describe('dev', () => {
  beforeEach(() => {
    mockLogger();
  });
  beforeEach(() => {
    resetDiskAndMocks();
  });

  function mockAll() {
    mockLogger();

    const { startFuelCore, killChildProcess } = mockStartFuelCore();

    const build = vi.spyOn(buildMod, 'build').mockImplementation();
    const deploy = vi.spyOn(deployMod, 'deploy').mockImplementation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const on: any = vi.fn(() => ({ on }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const watch = vi.spyOn(chokidar, 'watch').mockReturnValue({ on } as any);

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
