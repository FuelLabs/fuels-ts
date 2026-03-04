import { EmptyType } from '../abi/types/EmptyType';
import { OptionType } from '../abi/types/OptionType';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiArgument } from '../types/interfaces/JsonAbi';

import { findType } from './findType';

export type FunctionInput<TArg extends JsonAbiArgument = JsonAbiArgument> = TArg & {
  isOptional: boolean;
};

export const getFunctionInputs = (params: {
  types: IType[];
  inputs: readonly JsonAbiArgument[];
}): Array<FunctionInput> => {
  const { types, inputs } = params;
  let isMandatory = false;

  return inputs.reduceRight((result, input) => {
    const type = findType({ types, typeId: input.type });
    const isTypeMandatory =
      !EmptyType.isSuitableFor({ type: type.rawAbiType.type }) &&
      !OptionType.isSuitableFor({ type: type.rawAbiType.type });

    isMandatory = isMandatory || isTypeMandatory;
    return [{ ...input, isOptional: !isMandatory }, ...result];
  }, [] as FunctionInput[]);
};
