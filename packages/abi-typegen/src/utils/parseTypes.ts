import type { IType } from '../types/interfaces/IType';
import type { JsonAbiType } from '../types/interfaces/JsonAbi';

import { makeType } from './makeType';
import { shouldSkipAbiType } from './shouldSkipAbiType';

export function parseTypes(params: { rawAbiTypes: readonly JsonAbiType[] }) {
  const types: IType[] = [];

  // First we parse all ROOT nodes
  params.rawAbiTypes.forEach((rawAbiType) => {
    const { type } = rawAbiType;
    const skip = shouldSkipAbiType({ type });
    if (!skip) {
      const parsedType = makeType({ rawAbiType });
      types.push(parsedType);
    }
  });

  // Then we parse all their components' [attributes]
  types.forEach((type) => {
    type.parseComponentsAttributes({ types });
  });

  return types;
}
