import { execSync } from 'child_process';
import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import mkdirp from 'mkdirp';
import os from 'os';
import { basename, join } from 'path';
import rimraf from 'rimraf';

import { Abi } from '../../src/abi/Abi';
import type { IRawAbi } from '../../src/interfaces/IRawAbi';

const TEMPLATE_TOML = `[project]
authors = ["fuellabs"]
entry = "{CONTRACT_FILENAME}"
license = "Apache-2.0"
name = "{CONTRACT_NAME}"

[dependencies]`;

/*
  Compile Sway contract to JSON ABI
*/
export function compileSwayToJson(params: { contractPath: string }) {
  const { contractPath } = params;
  const contractFilename = basename(contractPath);
  const contractName = contractFilename.replace('.sw', '');

  const tempDir = join(os.tmpdir(), new Date().getTime().toString());

  const destinationSrcDir = join(tempDir, 'src');
  const destinationContractPath = join(destinationSrcDir, contractFilename);

  const destinationTomlPath = join(tempDir, 'Forc.toml');
  const tomlContents = TEMPLATE_TOML.replace('{CONTRACT_FILENAME}', contractFilename).replace(
    '{CONTRACT_NAME}',
    contractName
  );

  rimraf.sync(tempDir);
  mkdirp.sync(destinationSrcDir);

  copyFileSync(contractPath, destinationContractPath);
  writeFileSync(destinationTomlPath, tomlContents);

  execSync(`cd ${tempDir} && pnpm exec forc build`, { stdio: 'ignore' });

  const abiPath = join(tempDir, `out/debug/${contractName}-abi.json`);
  const abiContents = readFileSync(abiPath, 'utf-8');
  const abiJson: IRawAbi = JSON.parse(abiContents);

  const output = {
    filepath: abiPath,
    rawContents: abiJson,
  };

  rimraf.sync(tempDir);

  return output;
}

/*
  Compile Sway contract to Typescript
*/
export function compileSwayToTs(params: { contractPath: string }) {
  const json = compileSwayToJson(params);
  const { filepath, rawContents } = json;

  const abi = new Abi({
    filepath,
    rawContents,
    outputDir: 'null',
  });

  const dts = abi.getDtsDeclaration();
  const factory = abi.getFactoryDeclaration();

  return {
    dts,
    factory,
  };
}
