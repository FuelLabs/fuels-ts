import type { Abi } from '../Abi';

import { renderHbsTemplate } from './utils/renderHbsTemplate';
import { templatePaths } from './utils/templatePaths';

export function renderFactoryTemplate(params: { abi: Abi }) {
  const { name: capitalizedName, rawContents } = params.abi;
  const abiJsonString = JSON.stringify(rawContents, null, 2);

  const text = renderHbsTemplate({
    filepath: templatePaths.factory,
    data: { capitalizedName, abiJsonString },
  });

  return text;
}
