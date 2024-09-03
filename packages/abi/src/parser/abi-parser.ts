import type { Abi } from './abi-parser-types';
import type { JsonAbi_V1 } from './specifications/v1/abi-specification-v1';
import { AbiV1 } from './specifications/v1/abi-v1';

/**
 * A typed ABI object or a stringified json of a Sway program's ABI
 */
export type ParsableJsonAbi = string | JsonAbi_V1;

/**
 * Parses an ABI in JSON format.
 *
 * @param abi a JSON ABI of a Sway program
 * @returns a parsed ABI
 */
export function parseJsonAbi(abi: ParsableJsonAbi): Abi {
  const theAbi = typeof abi === 'string' ? (JSON.parse(abi) as { specVersion: string }) : abi;
  switch (theAbi.specVersion) {
    case '1':
      return new AbiV1(abi as JsonAbi_V1);
    default:
      throw new Error('unsupported abi specification version');
  }
}
