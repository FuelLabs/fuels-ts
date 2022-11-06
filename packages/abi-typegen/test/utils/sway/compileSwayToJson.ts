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

  // if `inPlace` is on, validates the need to re-compile contract
  if (inPlace && contractPath) {
    let isFresh = false;

    const inPlaceJsonAbiPath = contractPath.replace('.sw', '-abi.json');
    const inPlaceJsonExists = existsSync(inPlaceJsonAbiPath);

    if (inPlaceJsonExists) {
      // determine in-place file freshness
      const contractLastlyUpdatedAt = statSync(contractPath).mtime;
      const abiJsonLastlyUpdatedAt = statSync(inPlaceJsonAbiPath).mtime;
      isFresh = contractLastlyUpdatedAt.getTime() <= abiJsonLastlyUpdatedAt.getTime();
    }

    // if file is fresh, return it at the speed of light
    if (isFresh) {
      const abiContents = readFileSync(inPlaceJsonAbiPath, 'utf-8');
      const rawContents: IRawAbi = JSON.parse(abiContents);
      const filepath = inPlaceJsonAbiPath;
      return { filepath, rawContents };
    }
  }

  // otherwise let's compile it
  const paramsWithAutoBuild = { ...params, autoBuild: true };
  const project = createTempSwayProject(paramsWithAutoBuild);

  // if we have errors, throw
  const hasAbiCompiled = existsSync(project.destinationAbiJsonPath);
  if (!hasAbiCompiled) {
    throw new Error(`Couldn't compile sway contract.`);
  }

  // otherwise, read compiled json abi
  const abiContents = readFileSync(project.destinationAbiJsonPath, 'utf-8');
  const abiJson: IRawAbi = JSON.parse(abiContents);

  // format output to our needs
  const output = {
    filepath: project.destinationAbiJsonPath,
    rawContents: abiJson,
  };

  // if `inPlace` is enabled, we save a `abi.json` file
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
