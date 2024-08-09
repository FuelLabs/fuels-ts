import cryptoApi from './browser';

export * from './types';

export const {
  bufferFromString,
  decrypt,
  encrypt,
  keyFromPassword,
  randomBytes,
  stringFromBuffer,
  scrypt,
  keccak256,
  decryptJsonWalletData,
  encryptJsonWalletData,
  pbkdf2,
  computeHmac,
  ripemd160,
  randomUUID,
} = cryptoApi;
