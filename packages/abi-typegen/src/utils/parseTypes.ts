import type { IRawAbiTypeRoot } from '../interfaces/IRawAbiType';
import type { IType } from '../interfaces/IType';

import { makeType } from './makeType';
import { shouldSkipAbiType } from './shouldSkipAbiType';

export function parseTypes(params: { rawAbiTypes: IRawAbiTypeRoot[] }) {
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
