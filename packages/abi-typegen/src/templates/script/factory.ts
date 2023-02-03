import type { Abi } from '../../abi/Abi';
import { renderHbsTemplate } from '../renderHbsTemplate';
import { parseEnums } from '../utils/parseEnums';
import { parseStructs } from '../utils/parseStructs';

import factoryTemplate from './factory.hbs';

export function renderFactoryTemplate(params: { abi: Abi }) {
  const { abi } = params;

  const { types } = abi;

  const {
    rawContents,
    name: capitalizedName,
    hexlifiedBinContents: hexlifiedBinString,
  } = params.abi;

  const abiJsonString = JSON.stringify(rawContents, null, 2);

  const func = abi.functions.find((f) => f.name === 'main');

  if (!func) {
    throw new Error(`ABI doesn't have a 'main()' method.`);
  }

  const { enums } = parseEnums({ types });
  const { structs } = parseStructs({ types });

  const { prefixedInputs: inputs, output } = func.attributes;

  const text = renderHbsTemplate({
    template: factoryTemplate,
    data: {
      inputs,
      output,
      structs,
      enums,
      abiJsonString,
      hexlifiedBinString,
      capitalizedName,
    },
  });

  return text;
}
