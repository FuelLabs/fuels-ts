import * as chokidar from 'chokidar';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

import * as buildMod from '../../src/cli/commands/build/index';
import * as deployMod from '../../src/cli/commands/deploy/index';
import { mockStartFuelCore } from '../utils/mockAutoStartFuelCore';
import { mockCheckForUpdates } from '../utils/mockCheckForUpdates';
import { mockLogger } from '../utils/mockLogger';
import { resetDiskAndMocks } from '../utils/resetDiskAndMocks';
import { runInit, runDev, bootstrapProject, resetConfigAndMocks } from '../utils/runCommands';
import { runInitTemp } from '../utils/testHelpers';

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

  it('exits when build fails', { timeout: 30_000 }, async () => {
    using temp = runInitTemp();
    const mainSw = readFileSync(`${temp.contractDir}/src/main.sw`).toString();
    const invalidSwayCode = `${mainSw}\nabi `;
    writeFileSync(`${temp.contractDir}/src/main.sw`, invalidSwayCode);

    const devProcess = spawn('pnpm fuels dev', {
      cwd: temp.rootDir,
      detached: true,
      shell: 'bash',
    });

    await new Promise((resolve) => {
      devProcess.on('exit', () => {
        resolve(undefined);
      });
    });
  });
});
