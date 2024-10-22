import type { BinaryVersions } from '@fuel-ts/versions';

import type { Abi } from '../../../../parser';
import type { AbiGenResult } from '../../../abi-gen';
import type { ProgramDetails } from '../../../utils/get-program-details';
import type { TsAbiGenResult } from '../../types';
import indexTemplate from '../templates/index.hbs';

import { getParentDirWrapper } from './get-parent-dir-wrapper';
import { renderHbsTemplate } from './render-hbs-template';

export function renderIndexTemplates(
  results: {
    details: ProgramDetails;
    renderResults: TsAbiGenResult[];
  }[],
  versions: BinaryVersions
): AbiGenResult[] {
  const response: AbiGenResult[] = [];

  const forIndex = results.reduce(
    (
      acc,
      {
        details: {
          abi: { programType },
        },
        renderResults,
      }
    ) => {
      acc[programType] ??= [];
      acc[programType].push(...renderResults);
      return acc;
    },
    {} as Record<Abi['programType'], TsAbiGenResult[]>
  );

  const sortedKeys = Object.keys(forIndex).sort() as Abi['programType'][];

  for (const programType of sortedKeys) {
    const programResults = forIndex[programType];
    const { withParentDir, removeParentDir } = getParentDirWrapper(
      programType as Abi['programType']
    );
    response.push({
      filename: withParentDir('index.ts'),
      content: renderHbsTemplate({
        versions,
        template: indexTemplate,
        data: {
          members: programResults
            .filter((r) => r.exportInIndexFile)
            .map(
              (r) =>
                // remove .ts extension
                removeParentDir(r.filename).split('.')[0]
            ),
        },
      }),
    });
  }

  response.push({
    filename: 'index.ts',
    content: renderHbsTemplate({
      versions,
      template: indexTemplate,
      data: {
        members: sortedKeys.map((programType) => {
          const { parentDir } = getParentDirWrapper(programType);
          return parentDir;
        }),
      },
    }),
  });

  return response;
}
