import type { AbiGenResult } from '../../abi-gen';
import type { ProgramDetails } from '../../utils/get-program-details';
import type { Renderer } from '../types';

import { renderHbsTemplate } from './renderers/render-hbs-template';
import { renderIndexTemplates } from './renderers/render-index-templates';
import { renderProgramTemplates } from './renderers/render-program-templates';
import { renderTypesTemplate } from './renderers/render-types-template';
import commonTemplate from './templates/common.hbs';

export const renderTs: Renderer = (details: ProgramDetails[], versions): AbiGenResult[] => {
  const allResults: AbiGenResult[] = [];

  const results = details.map((d) => {
    const program = renderProgramTemplates(d, versions);
    const types = renderTypesTemplate(d, versions);
    return {
      details: d,
      renderResults: [program, types].flat(),
    };
  });

  allResults.push(...results.flatMap((r) => r.renderResults));

  allResults.push(...renderIndexTemplates(results, versions));

  allResults.push({
    filename: 'common.ts',
    content: renderHbsTemplate({ template: commonTemplate, versions }),
  });

  return allResults;
};
