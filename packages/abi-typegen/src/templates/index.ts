import type { Abi } from '../Abi';

import indexTemplate from './hbs/transpiled/index.hbs';
import { renderHbsTemplate } from './utils/renderHbsTemplate';

export function renderIndexTemplate(params: { abis: Abi[] }) {
  const abiCapitalizedNames = params.abis.map(({ name }) => name);

  const text = renderHbsTemplate({
    template: indexTemplate,
    data: { abiCapitalizedNames },
  });

  return text;
}
