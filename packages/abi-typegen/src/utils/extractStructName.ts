import { ErrorCode, FuelError } from '@fuel-ts/errors';

import type { IRawAbiTypeRoot } from '../types/interfaces/IRawAbiType';

/**
 * Extracts the struct name from the JSON ABI.
 *
 * @param rawAbiType - The raw JSON ABI type.
 * @returns The struct name.
 *
 * @throws {@link "@fuel-ts/errors".ErrorCode.JSON_ABI_ERROR}
 * When the struct name cannot be extracted from the JSON ABI.
 */
export function extractStructName(params: { rawAbiType: IRawAbiTypeRoot; regex: RegExp }) {
  const { rawAbiType, regex } = params;

  const match = rawAbiType.type.match(params.regex)?.[1];

  if (!match) {
    const errorMessage = [
      `Couldn't extract struct name with: '${regex}'`,
      `Check your JSON ABI.`,
      `[source]\n${JSON.stringify(rawAbiType, null, 2)}`,
    ].join('\n\n');

    throw new FuelError(ErrorCode.JSON_ABI_ERROR, errorMessage);
  }

  return match;
}
