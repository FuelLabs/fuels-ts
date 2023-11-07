import { existsSync } from 'fs';
import { join } from 'path';

import { resetDiskAndMocks } from '../utils/resetDiskAndMocks';
import {
  contractsFooDir,
  generatedDir,
  initFlagsUseBuiltinBinaries,
  runBuild,
  runInit,
} from '../utils/runCommands';

/**
 * @group node
 */
describe('build', () => {
  beforeEach(() => {
    resetDiskAndMocks();
  });
  beforeEach(() => {
    resetDiskAndMocks();
  });

  it('should run `build` command', async () => {
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
  });

  it('should run `build` command with contracts-only', async () => {
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
  });
});
