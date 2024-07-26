import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { ResolvableType } from '../abi/ResolvableType';
import type { ResolvedType } from '../abi/ResolvedType';

import type { SupportedTypeClass } from './supportedTypes';

export function makeType(
  supportedTypes: SupportedTypeClass[],
  type: ResolvableType | ResolvedType
) {
  const TypeClass = supportedTypes.find((st) => st.isSuitableFor(type)) as SupportedTypeClass;

  if (!TypeClass) {
    throw new FuelError(ErrorCode.TYPE_NOT_SUPPORTED, `Type not supported: ${type.type}`);
  }

  const res = new TypeClass(type);

  res.parseStructContents?.(supportedTypes);
  res.parseComponentsAttributes(supportedTypes);
  res.parseTypeDeclarations(supportedTypes);
  return res;
}
