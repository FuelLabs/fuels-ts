import { swayTypeMatchers } from '../matchers/sway-type-matchers';
import type { AbiFunction, AbiFunctionInput } from '../parser';

export function evaluateFunctionInputsOptionality(
  fn: AbiFunction
): (AbiFunctionInput & { isOptional: boolean })[] {
  let isMandatory = false;
  return fn.inputs.reduceRight<(AbiFunctionInput & { isOptional: boolean })[]>((result, input) => {
    const isTypeMandatory =
      !swayTypeMatchers.void(input.type) && !swayTypeMatchers.option(input.type);

    isMandatory = isMandatory || isTypeMandatory;
    return [{ ...input, isOptional: !isMandatory }, ...result];
  }, []);
}
