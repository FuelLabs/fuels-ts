import type { JsonAbiOld, JsonAbiArgument } from '../types/JsonAbi';

import { optionRegEx, VOID_TYPE } from './constants';
import { findTypeById } from './json-abi';

export type FunctionInput<TArg extends JsonAbiArgument = JsonAbiArgument> = TArg & {
  isOptional: boolean;
};

export const getFunctionInputs = (params: {
  jsonAbi: JsonAbiOld;
  inputs: readonly JsonAbiArgument[];
}): Array<FunctionInput> => {
  const { jsonAbi, inputs } = params;
  let isMandatory = false;

  return inputs.reduceRight((result, input) => {
    const type = findTypeById(jsonAbi, input.type);
    isMandatory = isMandatory || (type.type !== VOID_TYPE && !optionRegEx.test(type.type));
    return [{ ...input, isOptional: !isMandatory }, ...result];
  }, [] as FunctionInput[]);
};
