import type { Abi } from '../../abi/Abi';
import { renderHbsTemplate } from '../renderHbsTemplate';

import factoryTemplate from './factory.hbs';

export function renderFactoryTemplate(params: { abi: Abi }) {
  const {
    camelizedName,
    capitalizedName,
    rawContents,
    storageSlotsContents,
    hexlifiedBinContents: hexlifiedBinString,
  } = params.abi;

  const abiJsonString = JSON.stringify(rawContents, null, 2);
  const storageSlotsJsonString = storageSlotsContents ?? '[]';

  const text = renderHbsTemplate({
    template: factoryTemplate,
    data: {
      camelizedName,
      capitalizedName,
      abiJsonString,
      storageSlotsJsonString,
      hexlifiedBinString,
    },
  });

  return text;
}
