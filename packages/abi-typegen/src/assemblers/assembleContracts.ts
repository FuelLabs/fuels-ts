import { join } from 'path';

import type { Abi } from '../Abi';
import type { IFile } from '../index';
import { renderCommonTemplate } from '../templates/common/common';
import { renderIndexTemplate } from '../templates/contract/index';

interface Params {
  abis: Abi[];
  outputDir: string;
}

export function assembleContracts(params: Params) {
  const { abis, outputDir } = params;

  const usesCommonTypes = abis.find((a) => a.commonTypesInUse.length > 0);

  // Assemble all DTS and Factory typescript files
  const files: IFile[] = [];

  abis.forEach((abi) => {
    const dts: IFile = {
      path: abi.dtsFilepath,
      contents: abi.getDtsDeclaration(),
    };

    const factory: IFile = {
      path: abi.factoryFilepath,
      contents: abi.getFactoryDeclaration(),
    };

    files.push(dts);
    files.push(factory);
  });

  // Includes index file
  const indexFile: IFile = {
    path: `${outputDir}/index.ts`,
    contents: renderIndexTemplate({ abis }),
  };

  files.push(indexFile);

  // Conditionally includes `common.d.ts` file if needed
  if (usesCommonTypes) {
    const commonsFilepath = join(outputDir, 'common.d.ts');
    const file: IFile = {
      path: commonsFilepath,
      contents: renderCommonTemplate(),
    };
    files.push(file);
  }

  return files;
}
