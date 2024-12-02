import { swayTypeMatchers } from '../../matchers/sway-type-matchers';
import type { AbiFunctionInput } from '../../parser';

export type FunctionInput<TArg extends AbiFunctionInput = AbiFunctionInput> = TArg & {
  isOptional: boolean;
};

export const getFunctionInputs = (params: {
  inputs: readonly AbiFunctionInput[];
}): Array<FunctionInput> => {
  const { inputs } = params;
  let isMandatory = false;

  return inputs.reduceRight((result, input) => {
    isMandatory =
      isMandatory || (!swayTypeMatchers.void(input.type) && !swayTypeMatchers.option(input.type));
    return [{ ...input, isOptional: !isMandatory }, ...result];
  }, [] as FunctionInput[]);
};
