import type { ProgramDetails } from '../../../utils/get-program-details';
import type { TsAbiGenResult } from '../../types';
import bytecodeTemplate from '../templates/bytecode.hbs';
import contractFactoryTemplate from '../templates/contract-factory.hbs';
import contractTemplate from '../templates/contract.hbs';
import predicateTemplate from '../templates/predicate.hbs';
import scriptTemplate from '../templates/script.hbs';

import { renderHbsTemplate } from './render-hbs-template';

export function renderProgramTemplates(programDetails: ProgramDetails): TsAbiGenResult[] {
  const { abi, binCompressed, name } = programDetails;

  const results: TsAbiGenResult[] = [
    {
      filename: `${name}-abi`,
      extension: 'json',
      content: programDetails.abiContents,
    },
    {
      filename: `${name}-bytecode`,
      extension: 'ts',
      content: renderHbsTemplate({ template: bytecodeTemplate, data: { binCompressed } }),
    },
  ];

  switch (abi.programType) {
    case 'contract':
      results.push(
        {
          filename: name,
          extension: 'ts',
          content: renderHbsTemplate({
            template: contractTemplate,
            data: { name },
          }),
          exportInIndex: true,
        },
        {
          filename: `${name}Factory`,
          extension: 'ts',
          content: renderHbsTemplate({
            template: contractFactoryTemplate,
            data: { name },
          }),
          exportInIndex: true,
        },
        {
          filename: `${name}-storage-slots`,
          extension: 'json',
          content: programDetails.storageSlots as string,
        }
      );
      break;
    case 'predicate':
      results.push({
        filename: name,
        extension: 'ts',
        content: renderHbsTemplate({
          template: predicateTemplate,
          data: { name },
        }),
        exportInIndex: true,
      });
      break;
    case 'script':
      results.push({
        filename: name,
        extension: 'ts',
        content: renderHbsTemplate({
          template: scriptTemplate,
          data: { name },
        }),
        exportInIndex: true,
      });
      break;
    default:
      break;
  }

  return results;
}
