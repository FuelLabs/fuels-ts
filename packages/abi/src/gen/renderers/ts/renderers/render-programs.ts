import type { BinaryVersions } from '@fuel-ts/versions';

import type { Abi } from '../../../..';
import type { AbiGenResult, ProgramDetails } from '../../../abi-gen-types';

import { renderIndexFiles } from './render-index-files';
import { renderProgram } from './render-program';
import { renderTypes } from './render-types';

export function renderPrograms(details: ProgramDetails[], versions: BinaryVersions) {
  const results: AbiGenResult[] = [];
  const indexContents = new Map<Abi['programType'], string[]>();

  for (const d of details) {
    const program = renderProgram(d, versions);
    const types = renderTypes(d, versions);
    const renderResults = [program, types].flat();

    results.push(...renderResults);

    renderResults.forEach((r) => {
      if (!r.exportInIndexFile) {
        return;
      }

      const contents = indexContents.get(d.abi.programType) ?? [];
      contents.push(r.filename);
      indexContents.set(d.abi.programType, contents);
    });
  }

  results.push(...renderIndexFiles(indexContents, versions));

  return results;
}
