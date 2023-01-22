import type { Abi } from '../../Abi';
import { renderHbsTemplate } from '../utils/renderHbsTemplate';

import indexTemplate from './index.hbs';

export function renderIndexTemplate(params: { abis: Abi[] }) {
  const abiCapitalizedNames = params.abis.map(({ name }) => name);

  const text = renderHbsTemplate({
    template: indexTemplate,
    data: { abiCapitalizedNames },
  });

  return text;
}
