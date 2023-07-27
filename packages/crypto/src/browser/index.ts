import cryptoApi from './cryptoApiWrapper';

export const {
  bufferFromString,
  decrypt,
  encrypt,
  keyFromPassword,
  randomBytes,
  stringFromBuffer,
} = cryptoApi;
