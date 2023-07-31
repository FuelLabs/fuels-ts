import crypto from 'crypto';

import type { CryptoApi } from '../types';

export const randomBytes: CryptoApi['randomBytes'] = (length: number): Uint8Array => {
  const randomValues = Uint8Array.from(crypto.randomBytes(length));
  return randomValues;
};
