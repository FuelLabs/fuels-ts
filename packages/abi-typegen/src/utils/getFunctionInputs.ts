import { clone } from 'ramda';

import { EmptyType } from '../abi/types/EmptyType';
import { OptionType } from '../abi/types/OptionType';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiArgument } from '../types/interfaces/JsonAbi';

import { findType } from './findType';

export type ArgumentWithMetadata<TArg extends JsonAbiArgument = JsonAbiArgument> = TArg & {
  isOptional: boolean;
};

export const getFunctionInputs = (params: {
  types: IType[];
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

      const type = findType({ types: params.types, typeId: input.type });
      if (
        EmptyType.isSuitableFor({ type: type.rawAbiType.type }) ||
        OptionType.isSuitableFor({ type: type.rawAbiType.type })
      ) {
        return { ...input, isOptional: true };
      }

      inMandatoryRegion = true;
      return { ...input, isOptional: false };
    })
    .reverse();
};
