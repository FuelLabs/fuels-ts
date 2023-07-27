import CryptoApi from './cryptoApiWrapper';

export const {
  bufferFromString,
  decrypt,
  encrypt,
  keyFromPassword,
  randomBytes,
  stringFromBuffer,
} = CryptoApi;
