import type { TargetEnum } from '../types/enums/TargetEnum';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiArgument } from '../types/interfaces/JsonAbi';

import { findType } from './findType';

/*
  Recursively parses the given `typeArguments` node
*/
export function parseTypeArguments(params: {
  types: IType[];
  target: TargetEnum;
  typeArguments: readonly JsonAbiArgument[];
  parentTypeId?: number;
}): string {
  const { types, typeArguments, parentTypeId, target } = params;

  const attributeKey: 'inputLabel' | 'outputLabel' = `${target}Label`;

  const buffer: string[] = [];

  let parentType: IType | undefined;
  let parentLabel: string | undefined;

  if (parentTypeId !== undefined) {
    parentType = findType({ types, typeId: parentTypeId });
    parentLabel = parentType.attributes[attributeKey];
  }

  // loop through all `typeArgument` items
  typeArguments.forEach((typeArgument) => {
    const currentTypeId = typeArgument.type;

    const currentType = findType({ types, typeId: currentTypeId });
    const currentLabel = currentType.attributes[attributeKey];

    if (typeArgument.typeArguments) {
      // recursively process nested `typeArguments`
      const nestedParsed = parseTypeArguments({
        types,
        target,
        parentTypeId: typeArgument.type,
        typeArguments: typeArgument.typeArguments as JsonAbiArgument[],
      });

      buffer.push(nestedParsed);
    } else {
      buffer.push(`${currentLabel}`);
    }
  });

  let output = buffer.join(', ');

  if (parentLabel) {
    output = `${parentLabel}<${output}>`;
  }

  return output;
}
