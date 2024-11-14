import * as chokidar from 'chokidar';

import * as buildMod from '../../src/cli/commands/build/index';
import * as deployMod from '../../src/cli/commands/deploy/index';
import { mockStartFuelCore } from '../utils/mockAutoStartFuelCore';
import { mockCheckForUpdates } from '../utils/mockCheckForUpdates';
import { mockLogger } from '../utils/mockLogger';
import { resetDiskAndMocks } from '../utils/resetDiskAndMocks';
import { runInit, runDev, bootstrapProject, resetConfigAndMocks } from '../utils/runCommands';

vi.mock('chokidar', async () => {
  const mod = await vi.importActual('chokidar');
  return {
    __esModule: true,
    ...mod,
  };
});

/**
 * @group node
 */
describe('dev', () => {
  const paths = bootstrapProject(__filename);

  beforeEach(() => {
    mockCheckForUpdates();
  });

  afterEach(() => {
    resetConfigAndMocks(paths.fuelsConfigPath);
  });

  afterAll(() => {
    resetDiskAndMocks(paths.root);
  });

  function mockAll() {
    mockLogger();

    const { autoStartFuelCore, killChildProcess } = mockStartFuelCore();

    const build = vi.spyOn(buildMod, 'build').mockReturnValue(Promise.resolve());
    const deploy = vi.spyOn(deployMod, 'deploy').mockReturnValue(
      Promise.resolve({
        contracts: [],
        scripts: [],
        predicates: [],
      })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const on: any = vi.fn(() => ({ on }));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const watch = vi.spyOn(chokidar, 'watch').mockReturnValue({ on } as any);

    return { autoStartFuelCore, killChildProcess, build, deploy, on, watch };
  }

  it('should run `dev` command', async () => {
    const { autoStartFuelCore, killChildProcess, build, deploy, on, watch } = mockAll();

    await runInit({
      root: paths.root,
      workspace: paths.workspaceDir,
      output: paths.outputDir,
      forcPath: paths.forcPath,
      fuelCorePath: paths.fuelCorePath,
    });

    await runDev({ root: paths.root });

    expect(autoStartFuelCore).toHaveBeenCalledTimes(1);
    expect(killChildProcess).toHaveBeenCalledTimes(0);
    expect(build).toHaveBeenCalledTimes(1);
    expect(deploy).toHaveBeenCalledTimes(1);

    expect(watch).toHaveBeenCalledTimes(2);
    expect(on).toHaveBeenCalledTimes(2);
  });
});
