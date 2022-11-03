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
  const { contractPath, autoBuild } = params;

  // prepare all files' paths and contents
  const tempDir = join(os.tmpdir(), 'fuels-abi-typegen', Date.now().toString());

  const contractFilename = basename(contractPath); // [yes] file extension
  const contractName = contractFilename.replace('.sw', ''); // [no] file extension

  const destinationSrcDir = join(tempDir, 'src');
  const destinationContractPath = join(destinationSrcDir, contractFilename);

  const destinationTomlPath = join(tempDir, 'Forc.toml');

  const tomlContents = renderTomlTemplate({ contractFilename, contractName });

  const normalizedContractName = normalizeName(contractName);

  // reset directories
  rimraf.sync(tempDir);
  mkdirp.sync(destinationSrcDir);

  // copy `<contractName>.sw` and `Forc.toml` file to temp project destination
  copyFileSync(contractPath, destinationContractPath);
  writeFileSync(destinationTomlPath, tomlContents);

  if (autoBuild === true) {
    // run forc build inside of it
    execSync(`cd ${tempDir} && pnpm exec forc build`, { stdio: 'ignore' });
  }

  // voilà
  return {
    tempDir,
    contractName,
    normalizedContractName,
  };
}
