import type { BinaryVersions } from '@fuel-ts/versions';

import type { Abi } from '../../abi/Abi';
import { renderHbsTemplate } from '../renderHbsTemplate';

import factoryTemplate from './factory.hbs';

export function renderFactoryTemplate(params: { abi: Abi; versions: BinaryVersions }) {
  const { versions, abi } = params;
  const {
    camelizedName,
    capitalizedName,
    rawContents,
    storageSlotsContents,
    hexlifiedBinContents: hexlifiedBinString,
  } = abi;

  const abiJsonString = JSON.stringify(rawContents, null, 2);
  const storageSlotsJsonString = storageSlotsContents ?? '[]';

  const text = renderHbsTemplate({
    template: factoryTemplate,
    versions,
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
