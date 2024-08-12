import { scrypt, keccak256, ripemd160 } from '../shared';
import type { CryptoApi } from '../types';

import { decrypt, encrypt, keyFromPassword } from './aes-ctr';
import { bufferFromString } from './bufferFromString';
import { decryptJsonWalletData, encryptJsonWalletData } from './encryptJsonWalletData';
import { computeHmac } from './hmac';
import { pbkdf2 } from './pbkdf2';
import { randomBytes } from './randomBytes';
import { randomUUID } from './randomUUID';
import { stringFromBuffer } from './stringFromBuffer';

const api: CryptoApi = {
  bufferFromString,
  stringFromBuffer,
  decrypt,
  encrypt,
  keyFromPassword,
  randomBytes,
  scrypt,
  keccak256,
  decryptJsonWalletData,
  encryptJsonWalletData,
  computeHmac,
  pbkdf2,
  ripemd160,
  randomUUID,
};

export default api;
