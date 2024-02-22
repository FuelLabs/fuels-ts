import { existsSync } from 'fs';
import { join } from 'path';

import * as deployMod from '../../src/cli/commands/deploy/index';
import { mockStartFuelCore } from '../utils/mockAutoStartFuelCore';
import {
  bootstrapProject,
  resetConfigAndMocks,
  resetDiskAndMocks,
  runBuild,
  runInit,
} from '../utils/runCommands';

/**
 * @group node
 */
describe(
  'build',
  () => {
    const paths = bootstrapProject(__filename);

    afterEach(() => {
      resetConfigAndMocks(paths.fuelsConfigPath);
    });

    afterAll(() => {
      resetDiskAndMocks(paths.root);
    });

    function mockAll() {
      const { autoStartFuelCore, killChildProcess } = mockStartFuelCore();
      const deploy = vi.spyOn(deployMod, 'deploy').mockResolvedValue([]);

      return { autoStartFuelCore, killChildProcess, deploy };
    }

    it('should run `build` command', async () => {
      const { autoStartFuelCore, killChildProcess, deploy } = mockAll();

      await runInit({
        root: paths.root,
        workspace: paths.workspaceDir,
        output: paths.outputDir,
      });

      await runBuild({ root: paths.root });

      const files = [
        'predicates/factories/PredicateTrueAbi__factory.ts',
        'predicates/index.ts',
        'contracts/BarFooAbi.d.ts',
        'contracts/BarFooAbi.hex.ts',
        'contracts/FooBarAbi.hex.ts',
        'contracts/FooBarAbi.d.ts',
        'contracts/factories/FooBarAbi__factory.ts',
        'contracts/factories/BarFooAbi__factory.ts',
        'contracts/index.ts',
        'scripts/factories/ScriptTrueAbi__factory.ts',
        'scripts/index.ts',
        'index.ts',
      ].map((f) => join(paths.outputDir, f));

      files.forEach((file) => {
        expect(existsSync(file)).toBeTruthy();
      });

      expect(autoStartFuelCore).toHaveBeenCalledTimes(0);
      expect(deploy).toHaveBeenCalledTimes(0);
      expect(killChildProcess).toHaveBeenCalledTimes(0);
    });

    it('should run `build` command with contracts-only', async () => {
      const { autoStartFuelCore, killChildProcess, deploy } = mockAll();

      await runInit({
        root: paths.root,
        contracts: paths.contractsDir,
        output: paths.outputDir,
      });

      await runBuild({ root: paths.root });

      const files = [
        'contracts/FooBarAbi.hex.ts',
        'contracts/FooBarAbi.d.ts',
        'contracts/factories/FooBarAbi__factory.ts',
        'contracts/index.ts',
        'index.ts',
      ].map((f) => join(paths.outputDir, f));

      files.forEach((file) => expect(existsSync(file)).toBeTruthy());

      expect(autoStartFuelCore).toHaveBeenCalledTimes(0);
      expect(deploy).toHaveBeenCalledTimes(0);
      expect(killChildProcess).toHaveBeenCalledTimes(0);
    });

    it('should run `build` command with `--deploy` flag', async () => {
      const { autoStartFuelCore, killChildProcess, deploy } = mockAll();

      await runInit({
        root: paths.root,
        workspace: paths.workspaceDir,
        output: paths.outputDir,
      });

      await runBuild({ root: paths.root, deploy: true });

      expect(autoStartFuelCore).toHaveBeenCalledTimes(1);
      expect(deploy).toHaveBeenCalledTimes(1);
      expect(killChildProcess).toHaveBeenCalledTimes(1);
    });
  },
  { timeout: 180000 }
);
