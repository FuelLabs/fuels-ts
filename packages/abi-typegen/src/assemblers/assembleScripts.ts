import { join } from 'path';

import type { Abi } from '../Abi';
import type { IFile } from '../index';
import { renderCommonTemplate } from '../templates/common/common';
import { renderFactoryTemplate } from '../templates/script/factory';
import { renderIndexTemplate } from '../templates/script/index';

export function assembleScripts(params: { abis: Abi[]; outputDir: string }) {
  const { abis, outputDir } = params;

  const files: IFile[] = [];
  const usesCommonTypes = abis.find((a) => a.commonTypesInUse.length > 0);

  abis.forEach((abi) => {
    const factory: IFile = {
      path: abi.factoryFilepath,
      contents: renderFactoryTemplate({ abi }),
    };
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
