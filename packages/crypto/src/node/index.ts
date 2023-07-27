import CryptoApi from './cryptoWrapper';

export const {
  bufferFromString,
  decrypt,
  encrypt,
  keyFromPassword,
  randomBytes,
  stringFromBuffer,
} = CryptoApi;
