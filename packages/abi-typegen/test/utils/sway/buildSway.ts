import { hexlify } from '@ethersproject/bytes';
import { copyFileSync, statSync, readFileSync, existsSync } from 'fs';
import mkdirp from 'mkdirp';
import { basename, dirname, join } from 'path';
import rimraf from 'rimraf';

import type { IRawAbi } from '../../../src/types/interfaces/IRawAbi';

import type { ISwayParams } from './ISwayUtilParams';
import { createTempSwayProject } from './createTempSwayProject';

/*
  Reads files from disk and return them ready to be used
 */
const getBundle = (abiFilepath: string) => {
  const abiContents: IRawAbi = JSON.parse(readFileSync(abiFilepath, 'utf-8'));

  const binFilepath = abiFilepath.replace('-abi.json', '.bin');
  const binContents = hexlify(readFileSync(binFilepath));

  return {
    abiFilepath,
    abiContents,
    rawContents: abiContents, // TODO: remove a lias, refactor refs
    binFilepath,
    binContents,
  };
};

/*
  Compile Sway contract to JSON ABI
*/
export function buildSway(params: ISwayParams) {
  const { inPlace = true, contractPath } = params;

  let inPlaceJsonAbiPath: string | undefined;
  let inPlaceBinPath: string | undefined;

  // if `inPlace` is on, validates the need to re-compile contract
  if (inPlace && contractPath) {
    let isFresh = false;

    const contractFilename = basename(contractPath);
    const contractDir = dirname(contractPath);

    const inPlaceDirPath = join(contractDir, 'out', 'abis');
    const inPlaceFilename = contractFilename.replace('.sw', '-abi.json');

    inPlaceJsonAbiPath = join(inPlaceDirPath, inPlaceFilename);

    const inPlaceJsonExists = existsSync(inPlaceJsonAbiPath);

    if (inPlaceJsonExists) {
      // determine in-place file freshness
      const contractLastlyUpdatedAt = statSync(contractPath).mtime;
      const abiJsonLastlyUpdatedAt = statSync(inPlaceJsonAbiPath).mtime;
      isFresh = contractLastlyUpdatedAt.getTime() <= abiJsonLastlyUpdatedAt.getTime();
    }

    // if file is fresh, return it at the speed of light
    if (isFresh) {
      return getBundle(inPlaceJsonAbiPath);
    }
  }

  // otherwise let's compile it
  const paramsWithAutoBuild = { ...params, autoBuild: true };
  const project = createTempSwayProject(paramsWithAutoBuild);

  // if `inPlace` is enabled, we save a `abi.json` file
  // side-by-side with its origin contract
  if (inPlace && inPlaceJsonAbiPath) {
    inPlaceBinPath = inPlaceJsonAbiPath.replace('-abi.json', '.bin');
    mkdirp.sync(dirname(inPlaceJsonAbiPath));

    copyFileSync(project.destinationAbiJsonPath, inPlaceJsonAbiPath);
    copyFileSync(project.destinationBinPath, inPlaceBinPath);
  }

  const output = getBundle(project.destinationAbiJsonPath);

  // delete temp project
  rimraf.sync(project.tempDir);

  // bingo
  return output;
}
