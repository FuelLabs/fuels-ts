import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';
import rimraf from 'rimraf';

import type { IRawAbi } from '../../../src/interfaces/IRawAbi';

import type { ISwayParams } from './ISwayUtilParams';
import { createTempSwayProject } from './createTempSwayProject';

/*
  Compile Sway contract to JSON ABI
*/
export function compileSwayToJson(params: ISwayParams) {
  // create temp project
  const { tempDir, contractName } = createTempSwayProject(params);

  // run forc build inside of it
  execSync(`cd ${tempDir} && pnpm exec forc build`, { stdio: 'ignore' });

  // read generaeted json
  const abiPath = join(tempDir, `out/debug/${contractName}-abi.json`);
  const abiContents = readFileSync(abiPath, 'utf-8');
  const abiJson: IRawAbi = JSON.parse(abiContents);

  // format output
  const output = {
    filepath: abiPath,
    rawContents: abiJson,
  };

  // delete temp project
  rimraf.sync(tempDir);

  // bingo
  return output;
}
