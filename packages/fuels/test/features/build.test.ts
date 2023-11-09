import { existsSync } from 'fs';
import { join } from 'path';

import * as deployMod from '../../src/cli/commands/deploy/index';
import { mockStartFuelCore } from '../utils/mockStartFuelCore';
import { resetDiskAndMocks } from '../utils/resetDiskAndMocks';
import {
  buildFlagsDeploy,
  contractsFooDir,
  generatedDir,
  initFlagsUseBuiltinBinaries,
  runBuild,
  runInit,
} from '../utils/runCommands';

describe('build', () => {
  beforeEach(resetDiskAndMocks);
  afterEach(resetDiskAndMocks);

  function mockAll() {
    const { startFuelCore, killChildProcess } = mockStartFuelCore();
    const deploy = jest.spyOn(deployMod, 'deploy').mockImplementation();

    return { startFuelCore, killChildProcess, deploy };
  }

  it('should run `build` command', async () => {
    const { startFuelCore, killChildProcess, deploy } = mockAll();

    await runInit();
    await runBuild();

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
    ].map((f) => join(__dirname, '..', 'fixtures', 'generated', f));

    files.forEach((file) => expect(existsSync(file)).toBeTruthy());

    expect(startFuelCore).toHaveBeenCalledTimes(0);
    expect(deploy).toHaveBeenCalledTimes(0);
    expect(killChildProcess).toHaveBeenCalledTimes(0);
  });

  it('should run `build` command with contracts-only', async () => {
    const { startFuelCore, killChildProcess, deploy } = mockAll();

    await runInit([initFlagsUseBuiltinBinaries, '-c', contractsFooDir, '-o', generatedDir].flat());
    await runBuild();

    const files = [
      'contracts/FooBarAbi.hex.ts',
      'contracts/FooBarAbi.d.ts',
      'contracts/factories/FooBarAbi__factory.ts',
      'contracts/index.ts',
      'index.ts',
    ].map((f) => join(__dirname, '..', 'fixtures', 'generated', f));

    files.forEach((file) => expect(existsSync(file)).toBeTruthy());

    expect(startFuelCore).toHaveBeenCalledTimes(0);
    expect(deploy).toHaveBeenCalledTimes(0);
    expect(killChildProcess).toHaveBeenCalledTimes(0);
  });

  it('should run `build` command with `--deploy` flag', async () => {
    const { startFuelCore, killChildProcess, deploy } = mockAll();

    await runInit();
    await runBuild([buildFlagsDeploy]);

    expect(startFuelCore).toHaveBeenCalledTimes(1);
    expect(deploy).toHaveBeenCalledTimes(1);
    expect(killChildProcess).toHaveBeenCalledTimes(1);
  });
});
