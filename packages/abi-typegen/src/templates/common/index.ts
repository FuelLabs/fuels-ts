import type { Abi } from '../../abi/Abi';
import { CategoryEnum } from '../../types/enums/CategoryEnum';
import { renderHbsTemplate } from '../renderHbsTemplate';

import indexTemplate from './index.hbs';

export function renderIndexTemplate(params: { abis: Abi[] }) {
  const { abis } = params;

  const isGeneratingContracts = abis[0].category === CategoryEnum.CONTRACT;

  const text = renderHbsTemplate({
    template: indexTemplate,
    data: { abis, isGeneratingContracts },
  });

  return text;
}
