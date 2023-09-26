import { existsSync } from 'fs';
import { join } from 'path';

import { clean, runBuild, runInit } from './utils/runCommands';

describe('build', () => {
  afterEach(clean);

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
    ].map((f) => join(__dirname, 'fixtures', 'types', f));

    for (const file of files) {
      expect(existsSync(file)).toBeTruthy();
    }
  });
});
