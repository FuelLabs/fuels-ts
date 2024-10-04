import { assertUnreachable } from '@fuel-ts/utils';
import type { BinaryVersions } from '@fuel-ts/versions';

import type { ProgramDetails } from '../../../utils/get-program-details';
import type { TsAbiGenResult } from '../../types';
import bytecodeTemplate from '../templates/bytecode.hbs';
import contractFactoryTemplate from '../templates/contract-factory.hbs';
import contractTemplate from '../templates/contract.hbs';
import predicateTemplate from '../templates/predicate.hbs';
import scriptTemplate from '../templates/script.hbs';

import { getParentDirWrapper } from './get-parent-dir-wrapper';
import { renderHbsTemplate } from './render-hbs-template';

export function renderProgramTemplates(
  programDetails: ProgramDetails,
  versions: BinaryVersions
): TsAbiGenResult[] {
  const { abi, binCompressed, name } = programDetails;

  const results: TsAbiGenResult[] = [
    {
      filename: `${name}-abi.json`,
      content: programDetails.abiContents,
    },
    {
      filename: `${name}-bytecode.ts`,
      content: renderHbsTemplate({ template: bytecodeTemplate, versions, data: { binCompressed } }),
    },
  ];

  switch (abi.programType) {
    case 'contract':
      results.push(
        {
          filename: `${name}.ts`,
          content: renderHbsTemplate({
            template: contractTemplate,
            versions,
            data: { name },
          }),
          exportInIndexFile: true,
        },
        {
          filename: `${name}Factory.ts`,
          content: renderHbsTemplate({
            template: contractFactoryTemplate,
            versions,
            data: { name },
          }),
          exportInIndexFile: true,
        },
        {
          filename: `${name}-storage-slots.json`,
          content: programDetails.storageSlots as string,
        }
      );
      break;
    case 'predicate':
      results.push({
        filename: `${name}.ts`,
        content: renderHbsTemplate({
          template: predicateTemplate,
          versions,
          data: { name },
        }),
        exportInIndexFile: true,
      });
      break;
    case 'script':
      results.push({
        filename: `${name}.ts`,
        content: renderHbsTemplate({
          template: scriptTemplate,
          versions,
          data: { name },
        }),
        exportInIndexFile: true,
      });
      break;
    case 'library':
      // we do nothing for library
      break;
    default:
      assertUnreachable(abi.programType);
      break;
  }

  const withParentDir = getParentDirWrapper(abi.programType);

  return results.map((r) => ({ ...r, filename: withParentDir(r.filename) }));
}
