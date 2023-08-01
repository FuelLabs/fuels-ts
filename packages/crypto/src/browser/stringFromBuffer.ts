import type { CryptoApi, Encoding } from '../types';

export const stringFromBuffer: CryptoApi['stringFromBuffer'] = (
  buffer: Uint8Array,
  encoding: Encoding = 'base64'
): string => {
  switch (encoding) {
    case 'utf-8': {
      return new TextDecoder().decode(buffer);
    }
    case 'base64': {
      let binary = '';
      const len = buffer.byteLength;
      for (let i = 0; i < len; i += 1) {
        binary += String.fromCharCode(buffer[i]);
      }

      return btoa(binary);
    }

    case 'hex':
    default: {
      let hexString = '';
      for (let i = 0; i < buffer.length; i += 1) {
        const hex = buffer[i].toString(16);
        hexString += hex.length === 1 ? `0${hex}` : hex;
      }
      return hexString;
    }
  }
};
