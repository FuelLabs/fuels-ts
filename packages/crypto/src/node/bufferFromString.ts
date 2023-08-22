import type { CryptoApi, Encoding } from '../types';

export const bufferFromString: CryptoApi['bufferFromString'] = (
  string: string,
  encoding: Encoding = 'base64'
): Uint8Array => Uint8Array.from(Buffer.from(string, encoding));
