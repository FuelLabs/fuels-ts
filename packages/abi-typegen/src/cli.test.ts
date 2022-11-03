import { existsSync } from 'fs';
import { join } from 'path';

import { run } from './cli';

describe('cli.js', () => {
  test('should execute cli routine', async () => {
    const contractDir = join(__dirname, '../test/fixtures/contract-enum-only');
    const inputPath = join(contractDir, '/out/debug/*-abi.json');
    const outDir = join(contractDir, 'generated');

    // First, we backup `process.argv` and re-define it, injecting
    // the desired input/ouput options pointing to the dirs we want
    const bkp = process.argv;
    process.argv = ['typegen', '-i', inputPath, '-o', outDir, '-v', 'false'];

    // executes program
    run({ programName: 'cli.js:test' });

    process.argv = bkp;

    const files = [
      join(outDir, 'index.d.ts'),
      join(outDir, 'common.d.ts'),
      join(outDir, 'ContractEnumOnlyAbi.d.ts'),
      join(outDir, 'factories', 'ContractEnumOnlyAbi__factory.ts'),
    ];

    files.forEach((f) => {
      expect(existsSync(f)).toBeTruthy;
    });
  });
});
