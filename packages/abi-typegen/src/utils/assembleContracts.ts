import { join } from 'path';

import type { Abi } from '../abi/Abi';
import type { IFile } from '../index';
import { renderCommonTemplate } from '../templates/common/common';
import { renderIndexTemplate } from '../templates/common/index';
import { renderDtsTemplate } from '../templates/contract/dts';
import { renderFactoryTemplate } from '../templates/contract/factory';

/**
 * Render all Contract-related templates and returns
 * an array of `IFile` with them all. For here on,
 * the only thing missing is to write them to disk.
 */
export function assembleContracts(params: { abis: Abi[]; outputDir: string }) {
  const { abis, outputDir } = params;

  const files: IFile[] = [];
  const usesCommonTypes = abis.find((a) => a.commonTypesInUse.length > 0);

  abis.forEach((abi) => {
    const { name } = abi;

    const dtsFilepath = `${outputDir}/${name}.d.ts`;
    const factoryFilepath = `${outputDir}/factories/${name}__factory.ts`;

    const dts: IFile = {
      path: dtsFilepath,
      contents: renderDtsTemplate({ abi }),
    };

    const factory: IFile = {
      path: factoryFilepath,
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
