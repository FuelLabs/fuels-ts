import type { Abi } from '../Abi';

import { renderHbsTemplate } from './utils/renderHbsTemplate';
import { templatePaths } from './utils/templatePaths';

export function renderIndexTemplate(params: { abis: Abi[] }) {
  const abiCapitalizedNames = params.abis.map(({ name }) => name);

  const text = renderHbsTemplate({
    filepath: templatePaths.index,
    data: { abiCapitalizedNames },
  });

  return text;
}
