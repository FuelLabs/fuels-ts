import cryptoApi from './node';

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
  computeHmac,
  pbkdf2,
  ripemd160,
  randomUUID,
} = cryptoApi;
