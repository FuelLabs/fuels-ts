import type { Abi } from '../Abi';

import factoryTemplate from './hbs/factory.hbs';
import { renderHbsTemplate } from './utils/renderHbsTemplate';

export function renderFactoryTemplate(params: { abi: Abi }) {
  const { name: capitalizedName, rawContents } = params.abi;
  const abiJsonString = JSON.stringify(rawContents, null, 2);

  const text = renderHbsTemplate({
    template: factoryTemplate,
    data: { capitalizedName, abiJsonString },
  });

  return text;
}
