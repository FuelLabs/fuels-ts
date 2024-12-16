import { assertUnreachable } from '@fuel-ts/utils';
import type { BinaryVersions } from '@fuel-ts/versions';

import type { ProgramDetails } from '../../../abi-gen-types';
import type { TsAbiGenResult } from '../../types';
import abiTemplate from '../templates/abi.hbs';
import bytecodeTemplate from '../templates/bytecode.hbs';
import contractFactoryTemplate from '../templates/contract-factory.hbs';
import contractTemplate from '../templates/contract.hbs';
import predicateTemplate from '../templates/predicate.hbs';
import scriptTemplate from '../templates/script.hbs';
import storageSlotsTemplate from '../templates/storage-slots.hbs';

import { getParentDirWrapper } from './get-parent-dir-wrapper';
import { renderTypes } from './render-types';
import { templateRenderer } from './template-renderer';

/**
 * Renders program-related files based on the program type.
 * @returns An array of results containing filenames and their corresponding content.
 * The files returned are all related to the program except the types.
 * This includes the abi, bytecode, and the program-related classes.
 */
export function renderProgram(details: ProgramDetails, versions: BinaryVersions): TsAbiGenResult[] {
  const { abi, binCompressed, name, abiContents, storageSlots } = details;

  const results: TsAbiGenResult[] = [
    {
      filename: `${name}Types.ts`,
      content: renderTypes(details, versions),
    },
    {
      filename: `${name}-abi.ts`,
      content: templateRenderer({ template: abiTemplate, versions, data: { abiContents } }),
    },
    {
      filename: `${name}-bytecode.ts`,
      content: templateRenderer({ template: bytecodeTemplate, versions, data: { binCompressed } }),
    },
  ];

  switch (abi.programType) {
    case 'contract':
      results.push(
        {
          filename: `${name}.ts`,
          content: templateRenderer({
            template: contractTemplate,
            versions,
            data: { name },
          }),
          exportInIndexFile: true,
        },
        {
          filename: `${name}Factory.ts`,
          content: templateRenderer({
            template: contractFactoryTemplate,
            versions,
            data: { name },
          }),
          exportInIndexFile: true,
        },
        {
          filename: `${name}-storage-slots.ts`,
          content: templateRenderer({
            template: storageSlotsTemplate,
            versions,
            data: { storageSlots },
          }),
        }
      );
      break;
    case 'predicate':
      results.push({
        filename: `${name}.ts`,
        content: templateRenderer({
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
        content: templateRenderer({
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

  const { withParentDir } = getParentDirWrapper(abi.programType);

  return results.map((r) => ({ ...r, filename: withParentDir(r.filename) }));
}
