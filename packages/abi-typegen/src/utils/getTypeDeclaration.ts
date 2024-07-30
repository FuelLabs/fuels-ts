import { TargetEnum } from '../types/enums/TargetEnum';
import type { IType } from '../types/interfaces/IType';
import type { JsonAbiArgument } from '../types/interfaces/JsonAbi';

import { findType } from './findType';
import { parseTypeArguments } from './parseTypeArguments';

export function resolveInputLabel(
  types: IType[],
  typeId: number,
  typeArguments: JsonAbiArgument['typeArguments']
) {
  const type = findType({ types, typeId });

  let typeDecl: string;

  if (typeArguments) {
    // recursively process child `typeArguments`
    typeDecl = parseTypeArguments({
      types,
      target: TargetEnum.INPUT,
      parentTypeId: typeId,
      typeArguments,
    });
  } else {
    // or just collect type declaration
    typeDecl = type.attributes.inputLabel;
  }

  return typeDecl;
}
