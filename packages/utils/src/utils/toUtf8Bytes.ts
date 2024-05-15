import { FuelError, ErrorCode } from '@fuel-ts/errors';

/**
 *  Returns the UTF-8 byte representation of str.
 *
 *  If form is disabled, the string is not normalized.
 * @param stri - the string to convert to UTF-8 bytes.
 * @param form - whether to normalize the string.
 * @returns - the UTF-8 byte representation of str.
 */
export function toUtf8Bytes(stri: string, form = true): Uint8Array {
  let str = stri;

  if (form) {
    str = stri.normalize('NFC');
  }

  const result: Array<number> = [];

  for (let i = 0; i < str.length; i += 1) {
    const c = str.charCodeAt(i);

    if (c < 0x80) {
      result.push(c);
    } else if (c < 0x800) {
      result.push((c >> 6) | 0xc0);
      result.push((c & 0x3f) | 0x80);
    } else if ((c & 0xfc00) === 0xd800) {
      i += 1;
      const c2 = str.charCodeAt(i);

      if (i >= str.length || (c2 & 0xfc00) !== 0xdc00) {
        throw new FuelError(
          ErrorCode.INVALID_INPUT_PARAMETERS,
          'Invalid UTF-8 in the input string.'
        );
      }

      // Surrogate Pair
      const pair = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);
      result.push((pair >> 18) | 0xf0);
      result.push(((pair >> 12) & 0x3f) | 0x80);
      result.push(((pair >> 6) & 0x3f) | 0x80);
      result.push((pair & 0x3f) | 0x80);
    } else {
      result.push((c >> 12) | 0xe0);
      result.push(((c >> 6) & 0x3f) | 0x80);
      result.push((c & 0x3f) | 0x80);
    }
  }

  return new Uint8Array(result);
}
