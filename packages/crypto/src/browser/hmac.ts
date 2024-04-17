import { hexlify } from '@fuel-ts/utils';
import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha256';
import { sha512 } from '@noble/hashes/sha512';

import type { CryptoApi } from '../types';

export const computeHmac: CryptoApi['computeHmac'] = (
  algorithm: 'sha256' | 'sha512',
  key: Uint8Array,
  data: Uint8Array
): string => {
  const hash = algorithm === 'sha256' ? sha256 : sha512;
  const signature = hmac.create(hash, key).update(data).digest();
  return hexlify(signature);
};
