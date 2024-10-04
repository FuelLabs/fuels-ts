import type { AbiGenResult } from '../../abi-gen';
import type { ProgramDetails } from '../../utils/get-program-details';
import type { Renderer, TsAbiGenResult } from '../types';

import { renderHbsTemplate } from './renderers/render-hbs-template';
import { renderProgramTemplates } from './renderers/render-program-templates';
import { renderTypesTemplate } from './renderers/render-types-template';
import commonTemplate from './templates/common.hbs';
import indexTemplate from './templates/index.hbs';

export const renderTs: Renderer = (details: ProgramDetails[]): AbiGenResult[] => {
  const results: TsAbiGenResult[] = details
    .map((d) => {
      const program = renderProgramTemplates(d);
      const types = renderTypesTemplate(d);
      return [program, types].flat();
    })
    .flat();

  results.push({
    filename: 'common.ts',
    content: renderHbsTemplate({ template: commonTemplate }),
  });

  results.push({
    filename: 'index.ts',
    content: renderHbsTemplate({
      template: indexTemplate,
      data: {
        members: results
          .filter((r) => r.exportInIndexFile)
          .map(
            (r) =>
              // remove .ts extension
              r.filename.split('.')[0]
          ),
      },
    }),
  });

  return results;
};
