import type { CryptoApi, BufferEncoding } from '../types';

export const stringFromBuffer: CryptoApi['stringFromBuffer'] = (
  buffer: Uint8Array,
  encoding: BufferEncoding = 'base64'
): string => Buffer.from(buffer).toString(encoding);
