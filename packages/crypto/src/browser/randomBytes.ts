import type { CryptoApi } from '../types';

import { crypto } from './crypto';

export const randomBytes: CryptoApi['randomBytes'] = (length: number): Uint8Array => {
  const randomValues = crypto.getRandomValues(new Uint8Array(length));
  return randomValues;
};
