import { join } from 'path';

import { Abi } from './Abi';
import type { IFile } from './interfaces/IFile';
import { renderCommonTemplate } from './templates/common';
import { renderIndexTemplate } from './templates/index';

/*
  Manages many instances of Abi
*/
export class AbiTypeGen {
  public readonly abis: Abi[];
  public readonly abiFiles: IFile[];
  public readonly outputDir: string;

  public readonly files: IFile[];

  constructor(params: { abiFiles: IFile[]; outputDir: string }) {
    const { abiFiles, outputDir } = params;

    this.files = [];
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
    this.assembleAllFiles();
  }

  private assembleAllFiles() {
    const usesCommonTypes = this.abis.find((a) => a.commonTypesInUse.length > 0);

    // Assemble all DTS and Factory typescript files
    this.abis.forEach((abi) => {
      const dts: IFile = {
        path: abi.dtsFilepath,
        contents: abi.getDtsDeclaration(),
      };

      const factory: IFile = {
        path: abi.factoryFilepath,
        contents: abi.getFactoryDeclaration(),
      };

      this.files.push(dts);
      this.files.push(factory);
    });

    // Includes index file
    const indexFile: IFile = {
      path: `${this.outputDir}/index.ts`,
      contents: renderIndexTemplate({ abis: this.abis }),
    };

    this.files.push(indexFile);

    // Conditionally includes `common.d.ts` file if needed
    if (usesCommonTypes) {
      const commonsFilepath = join(this.outputDir, 'common.d.ts');
      const file: IFile = {
        path: commonsFilepath,
        contents: renderCommonTemplate(),
      };
      this.files.push(file);
    }
  }
}
