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
} = cryptoApi;
