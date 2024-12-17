import type { BytesLike } from '@fuel-ts/utils';
import { hexlify } from '@fuel-ts/utils';
import { pbkdf2 as pb } from '@noble/hashes/pbkdf2';
import { sha256 } from '@noble/hashes/sha256';
import { sha512 } from '@noble/hashes/sha512';

import type { CryptoApi } from '../types';

export const pbkdf2: CryptoApi['pbkdf2'] = (
  password: BytesLike,
  salt: BytesLike,
  iterations: number,
  keylen: number,
  algo: 'sha256' | 'sha512'
): string => {
  const algorithm = { sha256, sha512 }[algo];
  return hexlify(pb(algorithm, password, salt, { c: iterations, dkLen: keylen }));
};
