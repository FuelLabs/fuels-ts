import type { SpawnSyncReturns } from 'child_process';
import { execSync } from 'child_process';
import { copyFileSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import os from 'os';
import { basename, join } from 'path';
import rimraf from 'rimraf';

import { normalizeName } from '../../../src/utils/normalize';

import type { ISwayParams } from './ISwayUtilParams';
import { renderTomlTemplate } from './renderTomlTemplate';

/*
  Build up a temp project based on the given Sway filepath, with
  auto-generated `Forc.toml` file, ready to go
*/
export function createTempSwayProject(params: ISwayParams) {
  const { contractContents, autoBuild } = params;

  // assemble temp dir path and reset it
  const tempDir = join(os.tmpdir(), 'fuels-abi-typegen', Date.now().toString());

  rimraf.sync(tempDir);

  // create sway file on-the-fly if needed
  let { contractPath } = params;

  if (!contractPath) {
    if (!contractContents) {
      throw new Error('Inform `contractPath` or `contractContents`');
    }
    contractPath = join(tempDir, 'main-abi.sw');
    writeFileSync(contractPath, contractContents);
  }

  // prepare all files' paths and contents
  const contractFilename = basename(contractPath); // [yes] file extension
  const contractName = contractFilename.replace('.sw', ''); // [no] file extension

  const destinationSrcDir = join(tempDir, 'src');
  const destinationContractPath = join(destinationSrcDir, contractFilename);

  const destinationTomlPath = join(tempDir, 'Forc.toml');

  const tomlContents = renderTomlTemplate({ contractFilename, contractName });

  const normalizedContractName = normalizeName(contractName);

  // create source dir
  mkdirp.sync(destinationSrcDir);

  // copy `<contractName>.sw` and `Forc.toml` file to temp project destination
  copyFileSync(contractPath, destinationContractPath);
  writeFileSync(destinationTomlPath, tomlContents);

  if (autoBuild === true) {
    // run forc build inside of it
    try {
      execSync(`pnpm exec forc build`, {
        cwd: tempDir,
        stdio: 'pipe',
        encoding: 'utf-8',
      });
    } catch (err) {
      const error = err as unknown as SpawnSyncReturns<string>;
      throw new Error(error.stderr.toString());
    }
  }

  const destinationDebugDir = join(tempDir, 'out/debug/');
  const destinationAbiJsonPath = join(destinationDebugDir, `${contractName}-abi.json`);

  // voilà
  return {
    contractFilename,
    contractName,
    destinationContractPath,
    destinationSrcDir,
    destinationTomlPath,
    normalizedContractName,
    tempDir,
    tomlContents,
    destinationDebugDir,
    destinationAbiJsonPath,
  };
}
