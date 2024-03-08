import { ErrorCode, FuelError } from '@fuel-ts/errors';

import { Abi } from './abi/Abi';
import { ProgramTypeEnum } from './types/enums/ProgramTypeEnum';
import type { IFile } from './types/interfaces/IFile';
import { assembleContracts } from './utils/assembleContracts';
import { assemblePredicates } from './utils/assemblePredicates';
import { assembleScripts } from './utils/assembleScripts';
import { validateBinFile } from './utils/validateBinFile';

/*
  Manages many instances of Abi
*/
export class AbiTypeGen {
  public readonly abis: Abi[];
  public readonly abiFiles: IFile[];
  public readonly binFiles: IFile[];
  public readonly storageSlotsFiles: IFile[];
  public readonly outputDir: string;

  public readonly files: IFile[];

  constructor(params: {
    abiFiles: IFile[];
    binFiles: IFile[];
    storageSlotsFiles: IFile[];
    outputDir: string;
    programType: ProgramTypeEnum;
  }) {
    const { abiFiles, binFiles, outputDir, programType, storageSlotsFiles } = params;

    this.outputDir = outputDir;

    this.abiFiles = abiFiles;
    this.binFiles = binFiles;
    this.storageSlotsFiles = storageSlotsFiles;

    // Creates a `Abi` for each abi file
    this.abis = this.abiFiles.map((abiFile) => {
      const binFilepath = abiFile.path.replace('-abi.json', '.bin');
      const relatedBinFile = this.binFiles.find(({ path }) => path === binFilepath);

      const storageSlotFilepath = abiFile.path.replace('-abi.json', '-storage_slots.json');
      const relatedStorageSlotsFile = this.storageSlotsFiles.find(
        ({ path }) => path === storageSlotFilepath
      );

      if (!relatedBinFile) {
        validateBinFile({
          abiFilepath: abiFile.path,
          binExists: !!relatedBinFile,
          binFilepath,
          programType,
        });
      }

      const abi = new Abi({
        filepath: abiFile.path,
        rawContents: JSON.parse(abiFile.contents as string),
        hexlifiedBinContents: relatedBinFile?.contents,
        storageSlotsContents: relatedStorageSlotsFile?.contents,
        outputDir,
        programType,
      });

      return abi;
    });

    // Assemble list of files to be written to disk
    this.files = this.getAssembledFiles({ programType });
  }

  /**
   * @throws {@link ErrorCode#INVALID_INPUT_PARAMETERS}
   * When the provided programType is not one of the valid types {@link ProgramTypeEnum}.
   */
  private getAssembledFiles(params: { programType: ProgramTypeEnum }): IFile[] {
    const { abis, outputDir } = this;
    const { programType } = params;

    switch (programType) {
      case ProgramTypeEnum.CONTRACT:
        return assembleContracts({ abis, outputDir });
      case ProgramTypeEnum.SCRIPT:
        return assembleScripts({ abis, outputDir });
      case ProgramTypeEnum.PREDICATE:
        return assemblePredicates({ abis, outputDir });
      default:
        throw new FuelError(
          ErrorCode.INVALID_INPUT_PARAMETERS,
          `Invalid Typegen programType: ${programType}. Must be one of ${Object.values(
            ProgramTypeEnum
          )}`
        );
    }
  }
}
