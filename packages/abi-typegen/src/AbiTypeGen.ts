import { Abi } from './abi/Abi';
import { CategoryEnum } from './types/enums/CategoryEnum';
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
  public readonly outputDir: string;

  public readonly files: IFile[];

  constructor(params: {
    abiFiles: IFile[];
    binFiles: IFile[];
    outputDir: string;
    category: CategoryEnum;
  }) {
    const { abiFiles, binFiles, outputDir, category } = params;

    this.outputDir = outputDir;

    this.abiFiles = abiFiles;
    this.binFiles = binFiles;

    // Creates a `Abi` for each abi file
    this.abis = this.abiFiles.map((abiFile) => {
      const binFilepath = abiFile.path.replace('-abi.json', '.bin');
      const relatedBinFile = this.binFiles.find(({ path }) => path === binFilepath);

      if (!relatedBinFile) {
        validateBinFile({
          abiFilepath: abiFile.path,
          binExists: !!relatedBinFile,
          binFilepath,
          category,
        });
      }

      const abi = new Abi({
        filepath: abiFile.path,
        rawContents: JSON.parse(abiFile.contents as string),
        hexlifiedBinContents: relatedBinFile?.contents,
        outputDir,
        category,
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
      case CategoryEnum.PREDICATE:
        return assemblePredicates({ abis, outputDir });
      default:
        throw new Error(`Invalid Typegen category: ${category}`);
    }
  }
}
