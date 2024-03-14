import type { Abi } from '../../abi/Abi';
import { ProgramTypeEnum } from '../../types/enums/ProgramTypeEnum';
import { renderHbsTemplate } from '../renderHbsTemplate';

import indexTemplate from './index.hbs';

export function renderIndexTemplate(params: { abis: Abi[] }) {
  const { abis } = params;

  const isGeneratingContracts = abis[0].programType === ProgramTypeEnum.CONTRACT;
  const isGeneratingPredicates = abis[0].programType === ProgramTypeEnum.PREDICATE;

  const text = renderHbsTemplate({
    template: indexTemplate,
    data: { abis, isGeneratingContracts, isGeneratingPredicates },
  });

  return text;
}
