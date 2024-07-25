import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { ResolvableMetadataType } from '../abi/ResolvableMetadataType';
import type { ResolvedType } from '../abi/ResolvedType';

export function extractStructName(params: {
  type: ResolvedType | ResolvableMetadataType;
  regex: RegExp;
}) {
  const { type, regex } = params;

  const matches = type.type.match(regex);
  const match = matches?.[2] ?? matches?.[1];

  if (!match) {
    let errorMessage = `Couldn't extract struct name with: '${regex}'.\n\n`;
    errorMessage += `Check your JSON ABI.\n\n[source]\n`;
    errorMessage += `${JSON.stringify(type, null, 2)}`;

    throw new FuelError(ErrorCode.JSON_ABI_ERROR, errorMessage);
  }

  return match;
}
