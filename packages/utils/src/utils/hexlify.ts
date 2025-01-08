import { arrayify } from './arrayify';
import type { BytesLike } from './arrayify';

const HexCharacters: string = '0123456789abcdef';

/**
 *  Returns a hex representation of the inputted bytes.
 */
export function hexlify(data: BytesLike): string {
  const bytes = arrayify(data);

  let result = '0x';
  for (let i = 0; i < bytes.length; i++) {
    const v = bytes[i];
    result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
  }
  return result;
}
