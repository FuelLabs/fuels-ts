import { scrypt as scryptNoble } from '@noble/hashes/scrypt';

import type { IScryptParams } from '../types';

export const scrypt = (params: IScryptParams): Uint8Array => {
  const { password, salt, n, p, r, dklen } = params;
  const derivedKey = scryptNoble(password, salt, { N: n, r, p, dkLen: dklen });

  return derivedKey;
};
