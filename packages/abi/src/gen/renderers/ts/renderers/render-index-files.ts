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

    // from index.ts to e.g. contracts/index.ts
    const indexFilename = withParentDir('index.ts');

    const pathsToFiles = files.map((file) => {
      // from e.g. contracts/AbiContract.ts to AbiContract.ts
      const relativePathToFile = removeParentDir(file);
      // remove .ts extension
      return relativePathToFile.split('.')[0];
    });

    const content = templateRenderer({
      versions,
      template: indexTemplate,
      data: {
        paths: pathsToFiles,
      },
    });

    results.push({
      filename: indexFilename,
      content,
    });
  });

  const mainIndexFileImportPaths = [...indexContents.keys()]
    .sort()
    .map((programType) => getParentDirWrapper(programType).parentDir);

  const mainIndexFile: AbiGenResult = {
    filename: 'index.ts',
    content: templateRenderer({
      versions,
      template: indexTemplate,
      data: {
        paths: mainIndexFileImportPaths,
      },
    }),
  };

  results.push(mainIndexFile);

  return results;
}
