import { ErrorCode, FuelError } from '@fuel-ts/errors';
import type { BytesLike } from '@fuel-ts/interfaces';
import type { BN } from '@fuel-ts/math';
import { bn } from '@fuel-ts/math';

import { getBytes } from './getBytes';

const BN_0 = bn(0);
const BN_58 = bn(58);
const Alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
let Lookup: null | Record<string, BN> = null;

function getAlpha(letter: string): BN {
  if (Lookup == null) {
    Lookup = {};
    for (let i = 0; i < Alphabet.length; i++) {
      Lookup[Alphabet[i]] = bn(i);
    }
  }
  const result = Lookup[letter];
  if (result == null) {
    throw new FuelError(ErrorCode.INVALID_DATA, `invalid base58 value ${letter}`);
  }
  return bn(result);
}

/**
 *  Encode value as a Base58-encoded string.
 */
export function encodeBase58(_value: BytesLike): string {
  const bytes = getBytes(_value);

  let value = bn(bytes);
  let result = '';
  while (value.gt(BN_0)) {
    result = Alphabet[Number(value.mod(BN_58))] + result;
    value = value.div(BN_58);
  }

  // Account for leading padding zeros
  for (let i = 0; i < bytes.length; i++) {
    if (bytes[i]) {
      break;
    }
    result = Alphabet[0] + result;
  }

  return result;
}

export function decodeBase58(value: string): BN {
  let result = BN_0;
  for (let i = 0; i < value.length; i++) {
    result = result.mul(BN_58);
    result = result.add(getAlpha(value[i].toString()));
  }
  return result;
}
