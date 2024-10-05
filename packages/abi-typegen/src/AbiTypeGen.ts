import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BinaryVersions } from '@fuel-ts/versions';

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
  public readonly versions: BinaryVersions;

  constructor(params: {
    abiFiles: IFile[];
    binFiles: IFile[];
    storageSlotsFiles: IFile[];
    outputDir: string;
    programType: ProgramTypeEnum;
    versions: BinaryVersions;
  }) {
    const { abiFiles, binFiles, outputDir, programType, storageSlotsFiles, versions } = params;

    this.outputDir = outputDir;

    this.abiFiles = abiFiles;
    this.binFiles = binFiles;
    this.storageSlotsFiles = storageSlotsFiles;
    this.versions = versions;

    // Creates a `Abi` for each abi file
    this.abis = this.abiFiles.map((abiFile) => {
      const binFilepath = abiFile.path.replace('-abi.json', '.bin');
      const deployedBinFilepath = abiFile.path.replace('-abi.json', 'deployed.bin');
      const relatedOriginalBinFile = this.binFiles.find(({ path }) => path === binFilepath);
      const relatedLoadedBinFile = this.binFiles.find(({ path }) => path === deployedBinFilepath);

      const storageSlotFilepath = abiFile.path.replace('-abi.json', '-storage_slots.json');
      const relatedStorageSlotsFile = this.storageSlotsFiles.find(
        ({ path }) => path === storageSlotFilepath
      );

      if (!relatedOriginalBinFile) {
        validateBinFile({
          abiFilepath: abiFile.path,
          binExists: !!relatedOriginalBinFile,
          binFilepath,
          programType,
        });
      }

      const abi = new Abi({
        filepath: abiFile.path,
        rawContents: JSON.parse(abiFile.contents as string),
        hexlifiedOriginalBinContents: relatedOriginalBinFile?.contents,
        hexlifiedLoaderBinContents: relatedLoadedBinFile?.contents,
        storageSlotsContents: relatedStorageSlotsFile?.contents,
        outputDir,
        programType,
      });

      return abi;
    });

    // Assemble list of files to be written to disk
    this.files = this.getAssembledFiles({ programType });
  }

  private getAssembledFiles(params: { programType: ProgramTypeEnum }): IFile[] {
    const { abis, outputDir, versions } = this;
    const { programType } = params;

    switch (programType) {
      case ProgramTypeEnum.CONTRACT:
        return assembleContracts({ abis, outputDir, versions });
      case ProgramTypeEnum.SCRIPT:
        return assembleScripts({ abis, outputDir, versions });
      case ProgramTypeEnum.PREDICATE:
        return assemblePredicates({ abis, outputDir, versions });
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
