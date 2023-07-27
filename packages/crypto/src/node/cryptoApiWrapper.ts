import type { CryptoApi } from '../types';

import { bufferFromString, stringFromBuffer, decrypt, encrypt, keyFromPassword } from './aes-ctr';
import { randomBytes } from './randomBytes';

export class CryptoApiWrapper implements CryptoApi {
  bufferFromString = bufferFromString;
  stringFromBuffer = stringFromBuffer;
  decrypt = decrypt;
  encrypt = encrypt;
  keyFromPassword = keyFromPassword;
  randomBytes = randomBytes;
}

export default new CryptoApiWrapper();
