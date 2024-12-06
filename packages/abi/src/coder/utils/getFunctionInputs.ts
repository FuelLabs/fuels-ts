import { swayTypeMatchers } from '../../matchers/sway-type-matchers';
import type { AbiFunctionInput } from '../../parser';

export type FunctionInput<TArg extends AbiFunctionInput = AbiFunctionInput> = TArg & {
  isOptional: boolean;
};

const isMandatoryInput = (input: AbiFunctionInput) =>
  !swayTypeMatchers.void(input.type) && !swayTypeMatchers.option(input.type);

/**
 * Get the function inputs with the `isOptional` flag set to true for optional inputs.
 *
 * Optional parameters are ones which don't require inputs (void or Option<T>)
 * Given a function input of (u8, Option<u8>), the second input will be marked as optional as it could take a value or not.
 *
 * @param params - The function inputs.
 * @returns an array of function inputs with the `isOptional` flag set to true for optional inputs.
 */
export const getFunctionInputs = (params: {
  inputs: readonly AbiFunctionInput[];
}): Array<FunctionInput> => {
  const { inputs } = params;
  let isMandatory = false;

  /**
   * We iterate over the inputs in reverse order to ensure that the first optional input is marked as such.
   */
  return inputs.reduceRight((result, input) => {
    isMandatory = isMandatory || isMandatoryInput(input);
    return [{ ...input, isOptional: !isMandatory }, ...result];
  }, [] as FunctionInput[]);
};
