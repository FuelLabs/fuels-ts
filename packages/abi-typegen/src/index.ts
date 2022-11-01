import { readFileSync } from 'fs';
import { join } from 'path';

import { Abi } from './abi/abi';
import type { IFile } from './abi/interfaces/IFile';
import { COMMON_TEMPLATE } from './templates/common';

export class AbiTypeGen {
  public readonly abis: Abi[];
  public readonly abiFilePaths: string[];
  public readonly outputDir: string;

  public readonly files: IFile[];

  constructor(params: { abiFilePaths: string[]; outputDir: string }) {
    const { abiFilePaths, outputDir } = params;

    this.files = [];
    this.outputDir = outputDir;
    this.abiFilePaths = abiFilePaths;

    // Creates a `Abi` for each abi file
    this.abis = this.abiFilePaths.map((filepath) => {
      const rawContents = JSON.parse(readFileSync(filepath, 'utf-8'));
      const abi = new Abi({ filepath, rawContents, outputDir });
      return abi;
    });

    // Assemble list of files to be written to disk
    this.assembleAllFiles();
  }

  private assembleAllFiles() {
    const { outputDir } = this;

    let areEnumsInUse: boolean = false;

    // Assemble all DTS and Factory typescript files
    this.abis.forEach((abi) => {
      areEnumsInUse = areEnumsInUse || abi.usesEnum;
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
      const commonsFilepath = join(outputDir, 'common.d.ts');
      const file: IFile = {
        path: commonsFilepath,
        contents: COMMON_TEMPLATE,
      };
      this.files.push(file);
    }
  }
}
