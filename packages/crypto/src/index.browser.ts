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
  randomUUID,
} = cryptoApi;
