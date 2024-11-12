import { bufferFromString } from '@fuel-ts/crypto';
import { sha256 } from '@fuel-ts/hasher';
import { bn } from '@fuel-ts/math';

export const createFunctionSelector = (functionSignature: string): string => {
  const hashedFunctionSignature = sha256(bufferFromString(functionSignature, 'utf-8'));
  // get first 4 bytes of signature + 0x prefix. then left-pad it to 8 bytes using toHex(8)
  return bn(hashedFunctionSignature.slice(0, 10)).toHex(8);
};
