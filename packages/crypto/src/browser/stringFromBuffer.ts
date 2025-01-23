import type { CryptoApi, BufferEncoding } from '../types';

import { btoa } from './crypto';

export const stringFromBuffer: CryptoApi['stringFromBuffer'] = (
  buffer: Uint8Array,
  encoding: BufferEncoding = 'base64'
): string => {
  switch (encoding) {
    case 'utf-8': {
      return new TextDecoder().decode(buffer);
    }
    case 'base64': {
      const binary = String.fromCharCode.apply(null, new Uint8Array(buffer) as unknown as number[]);
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
