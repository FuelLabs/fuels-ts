import { scryptSync as ethCryScrypt } from 'ethereum-cryptography/scrypt';

import type { IScryptParams } from '../types';

export const scrypt = (params: IScryptParams): Uint8Array => {
  const { password, salt, n, p, r, dklen } = params;

  const derivedKey = ethCryScrypt(password, salt, n, r, p, dklen);

  return derivedKey;
};
