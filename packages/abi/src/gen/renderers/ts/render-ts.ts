import type { AbiGenResult } from '../../abi-gen';
import type { ProgramDetails } from '../../utils/get-program-details';
import type { Renderer, TsAbiGenResult } from '../types';

import { renderHbsTemplate } from './renderers/render-hbs-template';
import { renderProgram } from './renderers/render-program';
import { renderTypes } from './renderers/render-types';
import commonTemplate from './templates/common.hbs';
import indexTemplate from './templates/index.hbs';

export const renderTs: Renderer = (details: ProgramDetails[]): AbiGenResult[] => {
  const results: TsAbiGenResult[] = details
    .map((d) => {
      const program = renderProgram(d);
      const types = renderTypes(d);
      return [program, types].flat();
    })
    .flat();

  results.push({
    filename: 'common',
    extension: 'ts',
    content: renderHbsTemplate({ template: commonTemplate }),
  });

  results.push({
    filename: 'index',
    extension: 'ts',
    content: renderHbsTemplate({
      template: indexTemplate,
      data: {
        members: results.filter((r) => r.exportInIndex).map((r) => r.filename),
      },
    }),
  });

  return results.map((r) => ({
    content: r.content,
    filename: `${r.filename}.${r.extension}`,
  }));
};
