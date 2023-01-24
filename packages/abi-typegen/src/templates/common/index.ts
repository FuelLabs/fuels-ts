import type { Abi } from '../../abi/Abi';
import { renderHbsTemplate } from '../renderHbsTemplate';

import indexTemplate from './index.hbs';

export function renderIndexTemplate(params: { abis: Abi[] }) {
  const abiCapitalizedNames = params.abis.map(({ name }) => name);

  const text = renderHbsTemplate({
    template: indexTemplate,
    data: { abiCapitalizedNames },
  });

  return text;
}
