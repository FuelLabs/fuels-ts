import { join } from 'path';

import type { Abi } from '../Abi';
import type { IFile } from '../index';
import { renderCommonTemplate } from '../templates/common/common';
import { renderDtsTemplate } from '../templates/contract/dts';
import { renderFactoryTemplate } from '../templates/contract/factory';
import { renderIndexTemplate } from '../templates/contract/index';

export function assembleContracts(params: { abis: Abi[]; outputDir: string }) {
  const { abis, outputDir } = params;

  const files: IFile[] = [];
  const usesCommonTypes = abis.find((a) => a.commonTypesInUse.length > 0);

  abis.forEach((abi) => {
    const dts: IFile = {
      path: abi.dtsFilepath,
      contents: renderDtsTemplate({ abi }),
    };

    const factory: IFile = {
      path: abi.factoryFilepath,
      contents: renderFactoryTemplate({ abi }),
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
