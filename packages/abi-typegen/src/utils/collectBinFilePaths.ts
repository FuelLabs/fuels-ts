import { hexlify } from '@ethersproject/bytes';
import { existsSync, readFileSync } from 'fs';

import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';
import type { IFile } from '../types/interfaces/IFile';

import { validateBinFile } from './validateBinFile';

export const collectBinFilepaths = (params: {
  filepaths: string[];
  programType: ProgramTypeEnum;
}) => {
  const { filepaths, programType } = params;

  const isContract = programType === ProgramTypeEnum.CONTRACT;
  if (isContract) {
    return []; // bin files not needed
  }

  // validate and collect bin filepaths for Scripts and/or Predicates
  const binFiles = filepaths.map((abiFilepath) => {
    const binFilepath = abiFilepath.replace('-abi.json', '.bin');
    const binExists = existsSync(binFilepath);

    validateBinFile({ abiFilepath, binFilepath, binExists, programType });

    const bin: IFile = {
      path: binFilepath,
      contents: hexlify(readFileSync(binFilepath)),
    };

    return bin;
  });

  return binFiles;
};
