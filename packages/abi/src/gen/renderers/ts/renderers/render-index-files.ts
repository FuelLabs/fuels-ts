import type { BinaryVersions } from '@fuel-ts/versions';

import type { Abi } from '../../../../parser';
import type { AbiGenResult } from '../../../abi-gen';
import indexTemplate from '../templates/index.hbs';

import { getParentDirWrapper } from './get-parent-dir-wrapper';
import { templateRenderer } from './template-renderer';

export function renderIndexFiles(
  indexContents: Map<Abi['programType'], string[]>,
  versions: BinaryVersions
): AbiGenResult[] {
  const results: AbiGenResult[] = [];

  indexContents.forEach((files, programType) => {
    const { withParentDir, removeParentDir } = getParentDirWrapper(programType);

    results.push({
      filename: withParentDir('index.ts'),
      content: templateRenderer({
        versions,
        template: indexTemplate,
        data: {
          paths: files.map(
            (filename) =>
              // remove .ts extension
              removeParentDir(filename).split('.')[0]
          ),
        },
      }),
    });
  });

  results.push({
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
