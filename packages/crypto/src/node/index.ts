import { randomUUID } from 'crypto';

import { scrypt, keccak256 } from '../shared';
import type { CryptoApi } from '../types';

import { decrypt, encrypt, keyFromPassword } from './aes-ctr';
import { bufferFromString } from './bufferFromString';
import { decryptJsonWalletData, encryptJsonWalletData } from './encryptJsonWalletData';
import { randomBytes } from './randomBytes';
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
  randomUUID,
};

export default api;
