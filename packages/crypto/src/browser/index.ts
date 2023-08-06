import type { CryptoApi } from '../types';

import { decrypt, encrypt, keyFromPassword } from './aes-ctr';
import { bufferFromString } from './bufferFromString';
import { randomBytes } from './randomBytes';
import { stringFromBuffer } from './stringFromBuffer';

const api: CryptoApi = {
  bufferFromString,
  stringFromBuffer,
  decrypt,
  encrypt,
  keyFromPassword,
  randomBytes,
};

export default api;
