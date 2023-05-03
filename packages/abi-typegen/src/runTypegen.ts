import { readFileSync, writeFileSync } from 'fs';
import { sync as globSync } from 'glob';
import mkdirp from 'mkdirp';
import { basename } from 'path';
import rimraf from 'rimraf';

import { AbiTypeGen } from './AbiTypeGen';
import type { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';
import type { IFile } from './types/interfaces/IFile';
import { collectBinFilepaths } from './utils/collectBinFilePaths';

export interface IGenerateFilesParams {
  cwd: string;
  filepaths?: string[];
  inputs?: string[];
  output: string;
  silent?: boolean;
  programType: ProgramTypeEnum;
}

export function runTypegen(params: IGenerateFilesParams) {
  const { cwd, inputs, output, silent, programType, filepaths: originalFilepaths } = params;

  const cwdBasename = basename(cwd);

  let { log } = console;
  if (silent) {
    log = () => ({});
  }

  /*
    Assembling files array and expanding globals if needed
  */
  let filepaths: string[] = [];

  if (!originalFilepaths?.length && inputs?.length) {
    filepaths = inputs.flatMap((i) => globSync(i, { cwd }));
  } else if (originalFilepaths?.length) {
    filepaths = originalFilepaths;
  } else {
    throw new Error('You need to inform at least one parameter: `input` or `filepaths`');
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

  const binFiles = collectBinFilepaths({ filepaths, programType });

  /*
    Starting the engine
  */
  const abiTypeGen = new AbiTypeGen({
    outputDir: output,
    abiFiles,
    binFiles,
    programType,
  });

  /*
    Generating files
  */
  log('Generating files..\n');

  mkdirp.sync(`${output}/factories`);

  abiTypeGen.files.forEach((file) => {
    rimraf.sync(file.path);
    writeFileSync(file.path, file.contents);
    const trimPathRegex = new RegExp(`^.+${cwdBasename}/`, 'm');
    log(` - ${file.path.replace(trimPathRegex, '')}`);
  });

  log('\nDone.⚡');
}
