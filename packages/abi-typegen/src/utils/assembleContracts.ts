import type { BinaryVersions } from '@fuel-ts/versions';
import { join } from 'path';

import type { Abi } from '../abi/Abi';
import type { IFile } from '../index';
import { renderCommonTemplate } from '../templates/common/common';
import { renderIndexTemplate } from '../templates/common/index';
import { renderBytecodeTemplate } from '../templates/contract/bytecode';
import { renderDtsTemplate } from '../templates/contract/dts';
import { renderFactoryTemplate } from '../templates/contract/factory';

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
    const { name } = abi;

    const dtsFilepath = `${outputDir}/${name}.d.ts`;
    const factoryFilepath = `${outputDir}/factories/${name}__factory.ts`;
    const hexBinFilePath = `${outputDir}/${name}.hex.ts`;

    const dts: IFile = {
      path: dtsFilepath,
      contents: renderDtsTemplate({ abi, versions }),
    };

    const factory: IFile = {
      path: factoryFilepath,
      contents: renderFactoryTemplate({ abi, versions }),
    };

    const hexBinFile: IFile = {
      path: hexBinFilePath,
      contents: renderBytecodeTemplate({
        hexlifiedBytecode: abi.hexlifiedBinContents as string,
        versions,
      }),
    };

    files.push(dts);
    files.push(factory);
    files.push(hexBinFile);
  });

  // Includes index file
  const indexFile: IFile = {
    path: `${outputDir}/index.ts`,
    contents: renderIndexTemplate({ abis, versions }),
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
