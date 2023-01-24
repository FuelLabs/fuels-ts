import type { Abi } from '../../Abi';
import { renderHbsTemplate } from '../utils/renderHbsTemplate';

import factoryTemplate from './factory.hbs';

export function renderFactoryTemplate(params: { abi: Abi }) {
  const { abi } = params;
  const { name: capitalizedName, rawContents } = params.abi;

  const abiJsonString = JSON.stringify(rawContents, null, 2);

  const func = abi.functions.find((f) => f.name === 'main');

  if (!func) {
    throw new Error(`ABI doesn't have a 'main()' method.`);
  }

  const { prefixedInputs: inputs, output } = func.attributes;

  const text = renderHbsTemplate({
    template: factoryTemplate,
    data: {
      inputs,
      output,
      abiJsonString,
      capitalizedName,
    },
  });

  return text;
}
