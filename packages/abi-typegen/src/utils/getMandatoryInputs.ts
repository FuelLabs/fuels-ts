import { EmptyType } from '../abi/types/EmptyType';
import { OptionType } from '../abi/types/OptionType';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiArgument } from '../types/interfaces/JsonAbi';

import { findType } from './findType';

const OPTIONAL_INPUT_TYPES = [EmptyType.swayType, OptionType.swayType];

export type ArgumentWithMetadata<TArg extends JsonAbiArgument = JsonAbiArgument> = TArg & {
  isOptional: boolean;
};

export const getMandatoryInputs = ({
  types,
  inputs,
}: {
  types: IType[];
  inputs: JsonAbiArgument[];
}): Array<ArgumentWithMetadata> => {
  let inMandatoryRegion = false;

  return inputs
    .reverse()
    .map((input) => {
      if (inMandatoryRegion) {
        return { ...input, isOptional: false };
      }

      const type = findType({ types, typeId: input.type });
      if (OPTIONAL_INPUT_TYPES.includes(type.rawAbiType.type)) {
        return { ...input, isOptional: true };
      }

      inMandatoryRegion = true;
      return { ...input, isOptional: false };
    })
    .reverse();
};
