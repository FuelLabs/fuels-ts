import type { BinaryVersions } from '@fuel-ts/versions';

import type { Abi } from '../../../../parser';
import type { AbiGenResult } from '../../../abi-gen-types';
import indexTemplate from '../templates/index.hbs';

import { getParentDirWrapper } from './get-parent-dir-wrapper';
import { templateRenderer } from './template-renderer';

export type IndexContents = Map<
  Abi['programType'],
  { filename: string; exportedContent: string[] }[]
>;
/**
 * @returns an array of index files
 * that includes the root index.ts and the index.ts for each provided program type.
 */
export function renderIndexFiles(
  indexContents: IndexContents,
  versions: BinaryVersions
): AbiGenResult[] {
  const results: AbiGenResult[] = [];

  indexContents.forEach((files, programType) => {
    const { withParentDir, removeParentDir } = getParentDirWrapper(programType);

    // from index.ts to e.g. contracts/index.ts
    const indexFilename = withParentDir('index.ts');

    const exports = files.map(({ filename, exportedContent }) => {
      // from e.g. contracts/AbiContract.ts to AbiContract.ts
      const relativePathToFile = removeParentDir(filename);
      // remove .ts extension
      return {
        path: relativePathToFile.split('.')[0],
        exportedContent: `{ ${exportedContent.join(', ')} }`,
      };
    });

    const content = templateRenderer({
      versions,
      template: indexTemplate,
      data: {
        exports,
      },
    });

    results.push({
      filename: indexFilename,
      content,
    });
  });

  const mainIndexFileExports = [...indexContents.keys()]
    .sort()
    .map((programType) => getParentDirWrapper(programType).parentDir)
    .map((path) => ({ path, exportedContent: '*' }));

  const mainIndexFile: AbiGenResult = {
    filename: 'index.ts',
    content: templateRenderer({
      versions,
      template: indexTemplate,
      data: {
        exports: mainIndexFileExports,
      },
    }),
  };

  results.push(mainIndexFile);

  return results;
}
