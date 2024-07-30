import type { BinaryVersions } from '@fuel-ts/versions';

import type { Abi } from '../../abi/Abi';
import { renderHbsTemplate } from '../renderHbsTemplate';

import factoryTemplate from './factory.hbs';

export function renderFactoryTemplate(params: { abi: Abi; versions: BinaryVersions }) {
  const { abi, versions } = params;
  const { name: capitalizedName, rawContents, storageSlotsContents } = abi;
  const abiJsonString = JSON.stringify(rawContents, null, 2);
  const storageSlotsJsonString = storageSlotsContents ?? '[]';

  const text = renderHbsTemplate({
    template: factoryTemplate,
    versions,
    data: { capitalizedName, abiJsonString, storageSlotsJsonString },
  });

  return text;
}
