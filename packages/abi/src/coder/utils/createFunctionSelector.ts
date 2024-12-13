import { bufferFromString } from '@fuel-ts/crypto';
import { sha256 } from '@fuel-ts/hasher';
import { bn } from '@fuel-ts/math';

/**
 * Creates a function selector from a function signature. This acts as a unique identifier for the function
 * that can be used to identify the function in the contract. Previously, this was used in contract calls adhering
 * to the v0 specification. This has since been superseded to be a StdString representation of a function name.
 * However this selector still exists as a unique identifier for the function.
 *
 * @param functionSignature - The function signature to create a selector from.
 * @returns The function selector.
 */
export const createFunctionSelector = (functionSignature: string): string => {
  const hashedFunctionSignature = sha256(bufferFromString(functionSignature, 'utf-8'));
  // get first 4 bytes of signature + 0x prefix. then left-pad it to 8 bytes using toHex(8)
  return bn(hashedFunctionSignature.slice(0, 10)).toHex(8);
};
