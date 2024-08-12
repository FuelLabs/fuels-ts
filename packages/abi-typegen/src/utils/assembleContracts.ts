import type { BinaryVersions } from '@fuel-ts/versions';
import { join } from 'path';

import type { Abi } from '../abi/Abi';
import type { IFile } from '../index';
import { renderCommonTemplate } from '../templates/common/common';
import { renderIndexTemplate } from '../templates/common/index';
import { renderFactoryTemplate } from '../templates/contract/factory';
import { renderMainTemplate } from '../templates/contract/main';

/**
 * Render all Contract-related templates and returns
 * an array of `IFile` with them all. For here on,
 * the only thing missing is to write them to disk.
 */
export function assembleContracts(params: {
  abis: Abi[];
  outputDir: string;
  versions: BinaryVersions;
}) {
  const { abis, outputDir, versions } = params;

  const files: IFile[] = [];
  const usesCommonTypes = abis.find((a) => a.commonTypesInUse.length > 0);

  abis.forEach((abi) => {
    const { capitalizedName } = abi;

    const mainFilepath = `${outputDir}/${capitalizedName}.ts`;
    const factoryFilepath = `${outputDir}/${capitalizedName}Factory.ts`;

    const main: IFile = {
      path: mainFilepath,
      contents: renderMainTemplate({ abi, versions }),
    };

    const factory: IFile = {
      path: factoryFilepath,
      contents: renderFactoryTemplate({ abi, versions }),
    };

    files.push(main);
    files.push(factory);
  });

  // Includes index file
  const indexFile: IFile = {
    path: `${outputDir}/index.ts`,
    contents: renderIndexTemplate({ files, versions }),
  };

  files.push(indexFile);

  // Conditionally includes `common.d.ts` file if needed
  if (usesCommonTypes) {
    const commonsFilepath = join(outputDir, 'common.d.ts');
    const file: IFile = {
      path: commonsFilepath,
      contents: renderCommonTemplate({ versions }),
    };
    files.push(file);
  }

  return files;
}
