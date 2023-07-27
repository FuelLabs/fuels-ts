import type { CryptoApi } from '../types';

import { bufferFromString, stringFromBuffer, decrypt, encrypt, keyFromPassword } from './aes-ctr';
import { randomBytes } from './randomBytes';

const cryptoApiWrapper: CryptoApi = {
  bufferFromString,
  stringFromBuffer,
  decrypt,
  encrypt,
  keyFromPassword,
  randomBytes,
};

export default cryptoApiWrapper;
