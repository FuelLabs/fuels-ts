import { copyFileSync, statSync, readFileSync, existsSync } from 'fs';
import rimraf from 'rimraf';

import type { IRawAbi } from '../../../src/interfaces/IRawAbi';

import type { ISwayParams } from './ISwayUtilParams';
import { createTempSwayProject } from './createTempSwayProject';

/*
  Compile Sway contract to JSON ABI
*/
export function compileSwayToJson(params: ISwayParams) {
  const { inPlace = true, contractPath } = params;

  // If `inPlace` uis enabled, check a bunch of things
  if (inPlace && contractPath) {
    const inPlaceJsonAbiPath = contractPath.replace('.sw', '-abi.json');

    const inPlaceJsonExists = existsSync(inPlaceJsonAbiPath);

    let isFresh = false;

    if (inPlaceJsonExists) {
      const contractLastlyUpdatedAt = statSync(contractPath).mtime;
      const abiJsonLastlyUpdatedAt = statSync(inPlaceJsonAbiPath).mtime;
      isFresh = contractLastlyUpdatedAt.getTime() <= abiJsonLastlyUpdatedAt.getTime();
    }

    if (isFresh) {
      const abiContents = readFileSync(inPlaceJsonAbiPath, 'utf-8');
      const rawContents: IRawAbi = JSON.parse(abiContents);
      const filepath = inPlaceJsonAbiPath;
      return { filepath, rawContents };
    }
  }

  const paramsWithAutoBuild = { ...params, autoBuild: true };
  const project = createTempSwayProject(paramsWithAutoBuild);

  // read generaeted json
  const abiContents = readFileSync(project.destinationAbiJsonPath, 'utf-8');
  const abiJson: IRawAbi = JSON.parse(abiContents);

  // format output
  const output = {
    filepath: project.destinationAbiJsonPath,
    rawContents: abiJson,
  };

  // If `inPlace` is enabled, we save a `abi.json` file
  // side-by-side with its origin contract
  if (inPlace && contractPath) {
    const sourceJsonPath = contractPath.replace('.sw', '-abi.json');
    copyFileSync(project.destinationAbiJsonPath, sourceJsonPath);
  }

  // delete temp project
  rimraf.sync(project.tempDir);

  // bingo
  return output;
}
