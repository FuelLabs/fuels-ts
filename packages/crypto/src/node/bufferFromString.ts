import type { CryptoApi, BufferEncoding } from '../types';

export const bufferFromString: CryptoApi['bufferFromString'] = (
  string: string,
  encoding: BufferEncoding = 'base64'
): Uint8Array => Uint8Array.from(Buffer.from(string, encoding));
