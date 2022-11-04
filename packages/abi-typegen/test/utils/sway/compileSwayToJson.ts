import { copyFileSync, statSync, readFileSync } from 'fs';
import { join } from 'path';
import rimraf from 'rimraf';

import type { IRawAbi } from '../../../src/interfaces/IRawAbi';

import type { ISwayParams } from './ISwayUtilParams';
import { createTempSwayProject } from './createTempSwayProject';

/*
  Compile Sway contract to JSON ABI
*/
export function compileSwayToJson(params: ISwayParams) {
  const { inPlace = true, contractPath } = params;

  if (inPlace && contractPath) {
    const sourceAbiJsonPath = contractPath.replace('.sw', '-abi.json');
    const contractLastlyUpdatedAt = statSync(contractPath).mtime;
    const abiJsonLastlyUpdatedAt = statSync(sourceAbiJsonPath).mtime;
    const isFresh = contractLastlyUpdatedAt.getTime() <= abiJsonLastlyUpdatedAt.getTime();

    if (isFresh) {
      const abiContents = readFileSync(sourceAbiJsonPath, 'utf-8');
      const rawContents: IRawAbi = JSON.parse(abiContents);
      const filepath = sourceAbiJsonPath;
      return { filepath, rawContents };
    }
  }

  const paramsWithAutoBuild = { ...params, autoBuild: true };
  const project = createTempSwayProject(paramsWithAutoBuild);

  const { tempDir } = project;

  // read generaeted json
  const abiPath = join(tempDir, project.destinationAbiJsonPath);
  const abiContents = readFileSync(abiPath, 'utf-8');
  const abiJson: IRawAbi = JSON.parse(abiContents);

  // format output
  const output = {
    filepath: abiPath,
    rawContents: abiJson,
  };

  // If `inPlace` is enabled, we save a `abi.json` file
  // side-by-side with its origin contract
  if (inPlace && contractPath) {
    const sourceJsonPath = contractPath.replace('.sw', '-abi.json');
    copyFileSync(project.destinationAbiJsonPath, sourceJsonPath);
  }

  // delete temp project
  rimraf.sync(tempDir);

  // bingo
  return output;
}
