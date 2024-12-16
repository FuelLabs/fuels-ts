import type { BinaryVersions } from '@fuel-ts/versions';

import type { Abi } from '../../../../parser';
import type { AbiGenResult } from '../../../abi-gen-types';
import indexTemplate from '../templates/index.hbs';

import { getParentDirWrapper } from './get-parent-dir-wrapper';
import { templateRenderer } from './template-renderer';

/**
 * @returns an array of index files
 * that includes the root index.ts and the index.ts for each provided program type.
 */
export function renderIndexFiles(
  indexContents: Map<Abi['programType'], string[]>,
  versions: BinaryVersions
): AbiGenResult[] {
  const results: AbiGenResult[] = [];

  indexContents.forEach((files, programType) => {
    const { withParentDir, removeParentDir } = getParentDirWrapper(programType);

    results.push({
      // from index.ts to e.g. contracts/index.ts
      filename: withParentDir('index.ts'),
      content: templateRenderer({
        versions,
        template: indexTemplate,
        data: {
          paths: files.map((filename) => {
            // from e.g. contracts/AbiContract.ts to AbiContract.ts
            const relativePathToFile = removeParentDir(filename);
            // remove .ts extension
            return relativePathToFile.split('.')[0];
          }),
        },
      }),
    });
  });

  results.push({
    // this is the main index.ts file in the root directory
    filename: 'index.ts',
    content: templateRenderer({
      versions,
      template: indexTemplate,
      data: {
        paths: [...indexContents.keys()]
          .sort()
          .map((programType) => getParentDirWrapper(programType).parentDir),
      },
    }),
  });

  return results;
}
