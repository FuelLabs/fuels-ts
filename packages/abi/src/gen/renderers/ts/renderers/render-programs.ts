import type { BinaryVersions } from '@fuel-ts/versions';

import type { Abi } from '../../../..';
import type { AbiGenResult, ProgramDetails } from '../../../abi-gen-types';

import { renderIndexFiles } from './render-index-files';
import { renderProgram } from './render-program';

/**
 * For the given program details, render all program-related files.
 * That includes the abi, bytecode, program-related classes,
 * type files and the index files.
 */
export function renderPrograms(details: ProgramDetails[], versions: BinaryVersions) {
  const results: AbiGenResult[] = [];
  const indexContents = new Map<Abi['programType'], string[]>();

  for (const d of details) {
    const files = renderProgram(d, versions);

    results.push(...files);

    files.forEach((file) => {
      if (!file.exportInIndexFile) {
        return;
      }

      const contents = indexContents.get(d.abi.programType) ?? [];
      contents.push(file.filename);
      indexContents.set(d.abi.programType, contents);
    });
  }

  results.push(...renderIndexFiles(indexContents, versions));

  return results;
}
