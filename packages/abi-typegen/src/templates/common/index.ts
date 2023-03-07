import type { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';
import { renderHbsTemplate } from '../renderHbsTemplate';

import indexTemplate from './index.hbs';

export function renderIndexTemplate(params: { abis: Abi[] }) {
  const { abis } = params;

  const isGeneratingContracts = abis[0].category === ProgramTypeEnum.CONTRACT;

  const text = renderHbsTemplate({
    template: indexTemplate,
    data: { abis, isGeneratingContracts },
  });

  return text;
}
