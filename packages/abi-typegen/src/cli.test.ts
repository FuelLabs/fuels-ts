import { existsSync } from 'fs';
import { join } from 'path';
import rimraf from 'rimraf';

import { contractPaths } from '../test/fixtures';
import { executeAndCatch } from '../test/utils/executeAndCatch';
import { createTempSwayProject } from '../test/utils/sway/createTempSwayProject';

import { run } from './cli';

describe('cli.js', () => {
  test('should execute cli routine and generate files', async () => {
    // setup temp sway project
    const contractPath = contractPaths.full;
    const autoBuild = true;

    const { tempDir, normalizedContractName } = createTempSwayProject({
      contractPath,
      autoBuild,
    });

    // compute filepaths
    const inputPath = join(tempDir, '/out/debug/*-abi.json');
    const outDir = join(tempDir, 'generated');

    // backup `process.argv` before re-defining it
    const argvBkp = process.argv;

    // inject desired input/ouput options pointing to the temp project
    process.argv = ['typegen', '-i', inputPath, '-o', outDir, '-v', 'false'];

    // executes program
    const fn = () => run({ programName: 'cli.js:test' });
    const { error, result } = await executeAndCatch(fn);

    // validates execution was ok
    expect(error).toBeFalsy;
    expect(result).toBeTruthy;

    // rollback argv
    process.argv = argvBkp;

    // check if all files were created
    const files = [
      join(outDir, 'index.ts'),
      join(outDir, 'common.d.ts'),
      join(outDir, `${normalizedContractName}Abi.d.ts`),
      join(outDir, 'factories', `${normalizedContractName}Abi__factory.ts`),
    ];

    expect(files.length).toEqual(4);

    files.forEach((f) => {
      expect(existsSync(f)).toEqual(true);
    });

    rimraf.sync(tempDir);
  });
});
