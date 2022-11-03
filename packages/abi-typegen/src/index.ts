import { join } from 'path';

import { Abi } from './abi/Abi';
import type { IFile } from './interfaces/IFile';
import { renderCommonTemplate } from './templates/common';

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
    let areEnumsInUse = !!this.abis.find((a) => a.usesEnum);
    let areOptionsInUse = !!this.abis.find((a) => a.usesOption);

    // Assemble all DTS and Factory typescript files
    this.abis.forEach((abi) => {
      areEnumsInUse = areEnumsInUse || abi.usesEnum;
      areOptionsInUse = areOptionsInUse || abi.usesOption;

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

    // Conditionally includes `common.d.ts` file if needed
    if (areEnumsInUse) {
      const commonsFilepath = join(this.outputDir, 'common.d.ts');
      const file: IFile = {
        path: commonsFilepath,
        contents: renderCommonTemplate(),
      };
      this.files.push(file);
    }
  }
}
