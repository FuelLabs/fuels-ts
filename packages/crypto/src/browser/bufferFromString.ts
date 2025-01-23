import type { CryptoApi, BufferEncoding } from '../types';

export const bufferFromString: CryptoApi['bufferFromString'] = (
  string: string,
  encoding: BufferEncoding = 'base64'
): Uint8Array => {
  switch (encoding) {
    case 'utf-8': {
      return new TextEncoder().encode(string);
    }

    case 'base64': {
      const binaryString = atob(string);
      const len = binaryString.length;
      const bytes = new Uint8Array(len).map((_, i) => binaryString.charCodeAt(i));

      return bytes;
    }

    case 'hex':
    default: {
      const bufferLength = string.length / 2;

      const buffer = new Uint8Array(bufferLength).map((_, i) => {
        const startIndex = i * 2;
        const byteValue = parseInt(string.substring(startIndex, startIndex + 2), 16);
        return byteValue;
      });

      return buffer;
    }
  }
};
