import { deferPromise } from '@fuel-ts/account';
import { spawn } from 'child_process';
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
      devProcess.on('exit', (code) => {
        expect(code).not.toEqual(0);
        resolve(undefined);
      });
    });
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
