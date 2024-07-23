import { EmptyType } from '../abi/types/EmptyType';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiArgument } from '../types/interfaces/JsonAbi';

import { findType } from './findType';

export const getMandatoryInputs = ({
  types,
  inputs,
}: {
  types: IType[];
  inputs: readonly JsonAbiArgument[];
}) => {
  let i = inputs.length - 1;
  for (; i >= 0; i--) {
    const type = findType({ types, typeId: inputs[i].type });
    if (type.rawAbiType.type !== EmptyType.swayType) {
      break;
    }
  }
  return inputs.slice(0, i + 1);
};
