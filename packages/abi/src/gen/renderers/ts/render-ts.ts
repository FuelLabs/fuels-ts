import type { AbiGenResult, ProgramDetails } from '../../abi-gen';
import type { Renderer } from '../types';

import { renderPrograms } from './renderers/render-programs';
import { templateRenderer } from './renderers/template-renderer';
import commonTemplate from './templates/common.hbs';

export const renderTs: Renderer = (details: ProgramDetails[], versions): AbiGenResult[] => {
  const results = renderPrograms(details, versions);

  results.push({
    filename: 'common.ts',
    content: templateRenderer({ template: commonTemplate, versions }),
  });

  return results;
};
