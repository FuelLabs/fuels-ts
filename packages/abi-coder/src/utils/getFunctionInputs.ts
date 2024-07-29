import { clone } from 'ramda';

import type { JsonAbi, JsonAbiArgument } from '../types/JsonAbi';

import { OPTION_REGEX, VOID_TYPE } from './constants';
import { findTypeById } from './json-abi';

export type ArgumentWithMetadata<TArg extends JsonAbiArgument = JsonAbiArgument> = TArg & {
  isOptional: boolean;
};

export const getFunctionInputs = (params: {
  jsonAbi: JsonAbi;
  inputs: readonly JsonAbiArgument[];
}): Array<ArgumentWithMetadata> => {
  let inMandatoryRegion = false;
  const inputs = clone(params.inputs);

  return (inputs as Array<JsonAbiArgument>)
    .reverse()
    .map((input) => {
      if (inMandatoryRegion) {
        return { ...input, isOptional: false };
      }

      const type = findTypeById(params.jsonAbi, input.type);
      if (type.type === VOID_TYPE || type.type.match(OPTION_REGEX)) {
        return { ...input, isOptional: true };
      }

      inMandatoryRegion = true;
      return { ...input, isOptional: false };
    })
    .reverse();
};
