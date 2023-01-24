import { Abi } from './abi/Abi';
import { CategoryEnum } from './types/enums/CategoryEnum';
import type { IFile } from './types/interfaces/IFile';
import { assembleContracts } from './utils/assembleContracts';
import { assembleScripts } from './utils/assembleScripts';

/*
  Manages many instances of Abi
*/
export class AbiTypeGen {
  public readonly abis: Abi[];
  public readonly abiFiles: IFile[];
  public readonly outputDir: string;

  public readonly files: IFile[];

  constructor(params: { abiFiles: IFile[]; outputDir: string; category: CategoryEnum }) {
    const { abiFiles, outputDir, category } = params;

    this.outputDir = outputDir;
    this.abiFiles = abiFiles;

    // Creates a `Abi` for each abi file
    this.abis = this.abiFiles.map((abiFile) => {
      const abi = new Abi({
        filepath: abiFile.path,
        rawContents: JSON.parse(abiFile.contents),
        outputDir,
      });
      return abi;
    });

    // Assemble list of files to be written to disk
    this.files = this.getAssembledFiles({ category });
  }

  private getAssembledFiles(params: { category: CategoryEnum }): IFile[] {
    const { abis, outputDir } = this;
    const { category } = params;

    switch (category) {
      case CategoryEnum.CONTRACT:
        return assembleContracts({ abis, outputDir });
      case CategoryEnum.SCRIPT:
        return assembleScripts({ abis, outputDir });
      default:
        throw new Error(`Invalid Typegen category: ${category}`);
    }
  }
}
