import type { Abi } from '../../abi/Abi';
import { renderHbsTemplate } from '../renderHbsTemplate';

import factoryTemplate from './factory.hbs';

export function renderFactoryTemplate(params: { abi: Abi }) {
  const { name: capitalizedName, rawContents, storageSlotsContents } = params.abi;
  const abiJsonString = JSON.stringify(rawContents, null, 2);
  const storageSlotsJsonString = JSON.stringify(storageSlotsContents ?? [], null, 2);

  const text = renderHbsTemplate({
    template: factoryTemplate,
    data: { capitalizedName, abiJsonString, storageSlotsJsonString },
  });

  return text;
}
