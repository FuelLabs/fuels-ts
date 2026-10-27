import { deferPromise } from '@fuel-ts/account';
import { spawn, spawnSync } from 'child_process';
import * as chokidar from 'chokidar';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'path';
import { cwd } from 'process';

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

  it('exits when build fails', { timeout: 30_000 }, async () => {
    const mainSw = readFileSync(`${paths.contractsBarDir}/src/main.sw`).toString();
    const invalidSwayCode = `${mainSw}\nabi `;
    writeFileSync(`${paths.contractsBarDir}/src/main.sw`, invalidSwayCode);

    await runInit({
      root: paths.root,
      output: paths.outputDir,
      workspace: paths.workspaceDir,
      forcPath: paths.forcPath,
      fuelCorePath: paths.fuelCorePath,
      fuelCorePort: '0',
    });

    const devProcess = spawn(`pnpm fuels dev --path ${paths.root}`, {
      detached: true,
      shell: 'bash',
      /**
       * pnpm fuels dev fails because the test is run in the root directory
       * and there is no `fuels` dependency in `package.json` there,
       * so we have to give the spawn a cwd which has `fuels` as a dependency.
       */
      cwd: join(cwd(), 'packages/fuel-gauge'),
    });

    const data: string[] = [];

    devProcess.stdout?.on('data', (chunk) => {
      data.push(chunk.toString());
    });

    await new Promise((resolve) => {
      devProcess.on('exit', (code) => {
        expect(code).not.toEqual(0);
        resolve(undefined);
      });
    });

    expect(data.join('')).toContain('forc exited with error code 1');
  });

  it('finishes onFailure and exits with an error when the node fails to launch', () => {
    const failureMarker = join(paths.root, 'failure-handled');
    writeFileSync(
      paths.fuelsConfigPath,
      `import { writeFile } from 'fs/promises';
export default {
  output: ${JSON.stringify(paths.outputDir)},
  fuelCorePath: ${JSON.stringify(paths.fuelCorePath)},
  forcPath: ${JSON.stringify(paths.forcPath)},
  fuelCorePort: 0,
  snapshotDir: ${JSON.stringify(join(paths.root, 'missing-snapshot'))},
  onFailure: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    await writeFile(${JSON.stringify(failureMarker)}, 'complete');
  },
};`
    );

    const result = spawnSync(
      process.execPath,
      [join(cwd(), 'packages/fuels/fuels.js'), 'dev', '--path', paths.root],
      { encoding: 'utf8', timeout: 15000 }
    );

    expect(result.error).toBeUndefined();
    expect(result.status, result.stdout + result.stderr).toBe(1);
    expect(readFileSync(failureMarker, 'utf8')).toBe('complete');
  });

  it('exits on the first Ctrl+C after starting the node', { timeout: 20000 }, async () => {
    writeFileSync(
      paths.fuelsConfigPath,
      `export default {
      output: ${JSON.stringify(paths.outputDir)},
      fuelCorePath: ${JSON.stringify(paths.fuelCorePath)},
      forcPath: ${JSON.stringify(paths.forcPath)},
      fuelCorePort: 0,
    };`
    );
    const devProcess = spawn(process.execPath, [
      join(cwd(), 'packages/fuels/fuels.js'),
      'dev',
      '--path',
      paths.root,
    ]);
    let output = '';
    devProcess.stdout.on('data', (chunk) => {
      output += chunk.toString();
    });
    devProcess.stderr.on('data', (chunk) => {
      output += chunk.toString();
    });
    try {
      await vi.waitFor(() => expect(output).toContain('Dev completed successfully'), {
        timeout: 10000,
      });
      devProcess.kill('SIGINT');
      await vi.waitFor(() => expect(devProcess.exitCode, output).toBe(130), { timeout: 5000 });
    } finally {
      if (devProcess.exitCode === null && devProcess.signalCode === null) {
        devProcess.kill('SIGKILL');
      }
    }
  });

  test('`dev` command can work with ephemeral port 0', { timeout: 25000 }, async () => {
    await runInit({
      root: paths.root,
      workspace: paths.workspaceDir,
      output: paths.outputDir,
      forcPath: paths.forcPath,
      fuelCorePath: paths.fuelCorePath,
      fuelCorePort: '0',
    });

    const devProcess = spawn(`pnpm fuels dev --path ${paths.root}`, {
      shell: 'bash',
      /**
       * pnpm fuels dev fails because the test is run in the root directory
       * and there is no `fuels` dependency in `package.json` there,
       * so we have to give the spawn a cwd which has `fuels` as a dependency.
       */
      cwd: join(cwd(), 'packages/fuel-gauge'),
    });

    const nodeLaunched = deferPromise<string>();

    const graphQLStartSubstring = 'Binding GraphQL provider to';

    devProcess.stdout.on('data', (chunk) => {
      const text: string = chunk.toString();
      if (text.indexOf(graphQLStartSubstring) !== -1) {
        const rows = text.split('\n');
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const rowWithUrl = rows.find((row) => row.indexOf(graphQLStartSubstring) !== -1)!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const [, port] = rowWithUrl.split(' ').at(-1)!.trim().split(':'); // e.g. "2024-02-13T12:31:44.445844Z  INFO new{name=fuel-core}: fuel_core::graphql_api::service: 216: Binding GraphQL provider to 127.0.0.1:35039"

        nodeLaunched.resolve(port);
      }
    });

    const nodePort = await nodeLaunched.promise;

    expect(nodePort).not.toBe('0');
    // we verify it not to be the default port
    expect(nodePort).not.toBe('4000');
  });
});
