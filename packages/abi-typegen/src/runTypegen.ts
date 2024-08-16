import { ErrorCode, FuelError } from '@fuel-ts/errors';
import { versions as builtinVersions, type BinaryVersions } from '@fuel-ts/versions';
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import mkdirp from 'mkdirp';
import { basename } from 'path';
import { rimrafSync } from 'rimraf';

import { AbiTypeGen } from './AbiTypeGen';
import type { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';
import type { IFile } from './types/interfaces/IFile';
import { collectBinFilepaths } from './utils/collectBinFilePaths';
import { collectStorageSlotsFilepaths } from './utils/collectStorageSlotsFilePaths';

export interface IGenerateFilesParams {
  cwd: string;
  filepaths?: string[];
  inputs?: string[];
  output: string;
  silent?: boolean;
  programType: ProgramTypeEnum;
  versions?: BinaryVersions;
}

export function runTypegen(params: IGenerateFilesParams) {
  const { cwd, inputs, output, silent, programType, filepaths: inputFilepaths } = params;
  const versions: BinaryVersions = { FUELS: builtinVersions.FUELS, ...params.versions };

  const cwdBasename = basename(cwd);

  function log(...args: unknown[]) {
    if (!silent) {
      // eslint-disable-next-line no-console
      console.log(args.join(' '));
    }
  }

  /*
    Assembling files array and expanding globals if needed
  */
  let filepaths: string[] = [];

  if (!inputFilepaths?.length && inputs?.length) {
    filepaths = inputs.flatMap((i) => globSync(i, { cwd }));
  } else if (inputFilepaths?.length) {
    filepaths = inputFilepaths;
  } else {
    throw new FuelError(
      ErrorCode.MISSING_REQUIRED_PARAMETER,
      `At least one parameter should be supplied: 'input' or 'filepaths'.`
    );
  }

  /*
    Assembling file paths x contents
  */
  const abiFiles = filepaths.map((filepath) => {
    const abi: IFile = {
      path: filepath,
      contents: readFileSync(filepath, 'utf-8'),
    };
    return abi;
  });

  if (!abiFiles.length) {
    throw new FuelError(ErrorCode.NO_ABIS_FOUND, `no ABI found at '${inputs}'`);
  }

  const binFiles = collectBinFilepaths({ filepaths, programType });

  const storageSlotsFiles = collectStorageSlotsFilepaths({ filepaths, programType });

  /*
    Starting the engine
  */
  const abiTypeGen = new AbiTypeGen({
    outputDir: output,
    abiFiles,
    binFiles,
    storageSlotsFiles,
    programType,
    versions,
  });

  /*
    Generating files
  */
  log('Generating files..\n');

  mkdirp.sync(`${output}`);

  abiTypeGen.files.forEach((file) => {
    rimrafSync(file.path);
    writeFileSync(file.path, file.contents);
    const trimPathRegex = new RegExp(`^.+${cwdBasename}/`, 'm');
    log(` - ${file.path.replace(trimPathRegex, '')}`);
  });

  log('\nDone.⚡');
}
