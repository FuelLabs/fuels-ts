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
      const str = String.fromCharCode(...new Uint8Array(buffer));
      return btoa(str);
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
