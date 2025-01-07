import { sleep } from '@fuel-ts/utils';
import * as chokidar from 'chokidar';
import { execFileSync, execSync, spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import * as buildMod from '../../src/cli/commands/build/index';
import * as deployMod from '../../src/cli/commands/deploy/index';
import { mockStartFuelCore } from '../utils/mockAutoStartFuelCore';
import { mockCheckForUpdates } from '../utils/mockCheckForUpdates';
import { mockLogger } from '../utils/mockLogger';
import { resetDiskAndMocks } from '../utils/resetDiskAndMocks';
import { runInit, runDev, bootstrapProject, resetConfigAndMocks } from '../utils/runCommands';

function runInit2() {
  const fuelsPath = path.join(process.cwd(), 'packages/fuels');

  const rootDir = path.join(tmpdir(), '.fuels', 'tests', randomUUID());

  mkdirSync(rootDir, { recursive: true });

  execFileSync('pnpm', ['init'], { cwd: rootDir });
  execFileSync('pnpm', ['link', fuelsPath], { cwd: rootDir });

  const contractDir = path.join(rootDir, 'contract');
  const outputDir = path.join(rootDir, 'output');
  mkdirSync(contractDir);
  mkdirSync(outputDir);

  execSync(`${process.env.FORC_PATH} init`, { cwd: contractDir });
  execSync(`pnpm fuels init -o ${outputDir} -c ${contractDir} --fuel-core-port 0`, {
    cwd: rootDir,
  });

  return {
    rootDir,
    contractDir,
    [Symbol.dispose]: () => {
      console.log(rootDir);
      // rmSync(rootDir, { recursive: true });
    },
  };
}

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

  it('exits when build fails', { timeout: 50000 }, async () => {
    using res = runInit2();
    const mainSw = readFileSync(`${res.contractDir}/src/main.sw`).toString();
    writeFileSync(`${res.contractDir}/src/main.sw`, `${mainSw}\nabi `);

    const devProcess = spawn('pnpm fuels dev', {
      cwd: res.rootDir,
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
