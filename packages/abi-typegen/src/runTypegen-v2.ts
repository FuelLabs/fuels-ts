import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import upperFirst from 'lodash.upperfirst';
import mkdirp from 'mkdirp';
import { basename } from 'path';
import rimraf from 'rimraf';

import { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';
import type { IFile } from './types/interfaces/IFile';
import { collectBinFilepath } from './utils/collectBinFilePaths';

export interface IGenerateFilesParams {
  cwd: string;
  filepaths?: string[];
  inputs?: string[];
  output: string;
  silent?: boolean;
  programType: ProgramTypeEnum;
}

function updateContentAndPath(
  abiFile: IFile,
  outputDir: string,
  programType: ProgramTypeEnum
): IFile {
  const fileName = basename(abiFile.path).split('.json')[0];
  const newFileName = fileName
    .split(/\W/)
    .map((x, i) => (i === 0 ? x : upperFirst(x)))
    .join('');

  const bin =
    programType === ProgramTypeEnum.CONTRACT
      ? undefined
      : collectBinFilepath(abiFile.path, programType).contents;

  const contents = {
    abi: JSON.parse(abiFile.contents),
    bin,
  };

  const newContent = `export const ${newFileName} = ${JSON.stringify(
    contents,
    undefined,
    2
  )} as const;`;
  return { path: `${outputDir}/${fileName}.ts`, contents: newContent };
}

export function runTypegenV2(params: IGenerateFilesParams) {
  const { cwd, inputs, output, silent, filepaths: originalFilepaths, programType } = params;
  let { log } = console;

  const cwdBasename = basename(cwd);

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

  const newAbiFiles = abiFiles.map((abi) => updateContentAndPath(abi, output, programType));
  mkdirp.sync(output);

  newAbiFiles.forEach((file) => {
    rimraf.sync(file.path);
    writeFileSync(file.path, file.contents);
    const trimPathRegex = new RegExp(`^.+${cwdBasename}/`, 'm');
    log(` - ${file.path.replace(trimPathRegex, '')}`);
  });

  log('\nDone.⚡');
}
