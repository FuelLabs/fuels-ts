import { existsSync, readFileSync } from 'fs';

import { ProgramTypeEnum } from '../types/enums/ProgramTypeEnum';
import type { IFile } from '../types/interfaces/IFile';

export const collectStorageSlotsFilepaths = (params: {
  filepaths: string[];
  programType: ProgramTypeEnum;
}) => {
  const { filepaths, programType } = params;

  // collect filepaths for storage slots JSON files
  const storageSlotsFiles: IFile[] = [];

  // abort unless we're dealing with contract types
  if (programType !== ProgramTypeEnum.CONTRACT) {
    return storageSlotsFiles;
  }

  filepaths.forEach((abiFilepath) => {
    const storageSlotsFilepath = abiFilepath.replace('-abi.json', '-storage_slots.json');
    const storageSlotsExists = existsSync(storageSlotsFilepath);

    if (storageSlotsExists) {
      const storageSlots: IFile = {
        path: storageSlotsFilepath,
        contents: readFileSync(storageSlotsFilepath, 'utf-8'),
      };

      storageSlotsFiles.push(storageSlots);
    }
  });

  return storageSlotsFiles;
};
