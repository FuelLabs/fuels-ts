import { copyFileSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import os from 'os';
import { basename, join } from 'path';
import rimraf from 'rimraf';

import type { ISwayParams } from './ISwayUtilParams';
import { renderTomlTemplate } from './renderTomlTemplate';

/*
  Build up a temp project based on the given Sway filepath, with
  auto-generated `Forc.toml` file, ready to go
*/
export function createTempSwayProject(params: ISwayParams) {
  const { contractPath } = params;

  // prepare all files' paths and contents
  const tempDir = join(os.tmpdir(), new Date().getTime().toString());

  const contractFilename = basename(contractPath); // [yes] file extension
  const contractName = contractFilename.replace('.sw', ''); // [no] file extension

  const destinationSrcDir = join(tempDir, 'src');
  const destinationContractPath = join(destinationSrcDir, contractFilename);

  const destinationTomlPath = join(tempDir, 'Forc.toml');

  const tomlContents = renderTomlTemplate({ contractFilename, contractName });

  // reset directories
  rimraf.sync(tempDir);
  mkdirp.sync(destinationSrcDir);

  // copy contract and tom file to temp destination
  copyFileSync(contractPath, destinationContractPath);
  writeFileSync(destinationTomlPath, tomlContents);

  // voilà
  return {
    tempDir,
    contractName,
  };
}
