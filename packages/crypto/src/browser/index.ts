import { scrypt } from '../shared';
import type { CryptoApi } from '../types';

import { bufferFromString, stringFromBuffer, decrypt, encrypt, keyFromPassword } from './aes-ctr';
import { randomBytes } from './randomBytes';

const api: CryptoApi = {
  bufferFromString,
  stringFromBuffer,
  decrypt,
  encrypt,
  keyFromPassword,
  randomBytes,
  scrypt,
};

export default api;
