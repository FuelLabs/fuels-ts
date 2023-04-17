import type { IRawAbiTypeRoot } from '../types/interfaces/IRawAbiType';

export function extractStructName(params: { rawAbiType: IRawAbiTypeRoot; regex: RegExp }) {
  const { rawAbiType, regex } = params;

  const match = rawAbiType.type.match(params.regex)?.[1];

  if (!match) {
    let errorMessage = `Couldn't extract struct name with: '${regex}'.\n\n`;
    errorMessage += `Check your JSON ABI.\n\n[source]\n`;
    errorMessage += `${JSON.stringify(rawAbiType, null, 2)}`;

    throw new Error(errorMessage);
  }

  return match;
}
