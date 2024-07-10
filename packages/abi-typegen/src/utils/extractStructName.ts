import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { JsonAbiType } from '../types/interfaces/JsonAbi';

export function extractStructName(params: { rawAbiType: JsonAbiType; regex: RegExp }) {
  const { rawAbiType, regex } = params;

  const matches = rawAbiType.type.match(regex);
  const match = matches?.[2] ?? matches?.[1];

  if (!match) {
    let errorMessage = `Couldn't extract struct name with: '${regex}'.\n\n`;
    errorMessage += `Check your JSON ABI.\n\n[source]\n`;
    errorMessage += `${JSON.stringify(rawAbiType, null, 2)}`;

    throw new FuelError(ErrorCode.JSON_ABI_ERROR, errorMessage);
  }

  return match;
}
