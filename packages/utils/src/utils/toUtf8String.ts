import type { BytesLike } from '@fuel-ts/interfaces';

import { arrayify } from './arrayify';

/**
 *  These errors are logged when decoding a UTF-8 string fails.
 *
 *  `"UNEXPECTED_CONTINUE"` - a continuation byte was present where there
 *  was nothing to continue.
 *
 *  `"BAD_PREFIX"` - an invalid (non-continuation) byte to start a
 *  UTF-8 codepoint was found.
 *
 *  `"OVERRUN"` - the string is too short to process the expected
 *  codepoint length.
 *
 *  `"MISSING_CONTINUE"` - a missing continuation byte was expected but
 *  not found. The offset indicates the index the continuation byte
 *  was expected at.
 *
 *  `"OUT_OF_RANGE"` - the computed code point is outside the range
 *  for UTF-8. The badCodepoint indicates the computed codepoint, which was
 *  outside the valid UTF-8 range.
 *
 *  `"UTF16_SURROGATE"` - the UTF-8 strings contained a UTF-16 surrogate
 *  pair. The badCodepoint is the computed codepoint, which was inside the
 *  UTF-16 surrogate range.
 *
 *  `"OVERLONG"` - the string is an overlong representation. The
 *   badCodepoint indicates the computed codepoint, which has already
 *  been bounds checked.
 *
 *
 *  @returns string
 */
type Utf8ErrorReason =
  | 'UNEXPECTED_CONTINUE'
  | 'BAD_PREFIX'
  | 'OVERRUN'
  | 'MISSING_CONTINUE'
  | 'OUT_OF_RANGE'
  | 'UTF16_SURROGATE'
  | 'OVERLONG';

function onError(
  reason: Utf8ErrorReason,
  offset: number,
  bytes: Uint8Array,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  output: Array<number>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  badCodepoint?: number
): number {
  // #TODO: Log these as warnings after https://github.com/FuelLabs/fuels-ts/issues/2298 is implemented.
  // eslint-disable-next-line no-console
  console.log(`invalid codepoint at offset ${offset}; ${reason}, bytes: ${bytes}`);
  return offset;
}

function helper(codePoints: Array<number>): string {
  return codePoints
    .map((codePoint) => {
      if (codePoint <= 0xffff) {
        return String.fromCharCode(codePoint);
      }
      // eslint-disable-next-line no-param-reassign
      codePoint -= 0x10000;
      return String.fromCharCode(
        ((codePoint >> 10) & 0x3ff) + 0xd800,
        (codePoint & 0x3ff) + 0xdc00
      );
    })
    .join('');
}

function getUtf8CodePoints(_bytes: BytesLike): Array<number> {
  const bytes = arrayify(_bytes, 'bytes');

  const result: Array<number> = [];
  let i = 0;

  // Invalid bytes are ignored
  while (i < bytes.length) {
    const c = bytes[i++];

    // 0xxx xxxx
    if (c >> 7 === 0) {
      result.push(c);
      continue;
    }

    // Multibyte; how many bytes left for this character?
    let extraLength: null | number = null;
    let overlongMask: null | number = null;

    // 110x xxxx 10xx xxxx
    if ((c & 0xe0) === 0xc0) {
      extraLength = 1;
      overlongMask = 0x7f;

      // 1110 xxxx 10xx xxxx 10xx xxxx
    } else if ((c & 0xf0) === 0xe0) {
      extraLength = 2;
      overlongMask = 0x7ff;

      // 1111 0xxx 10xx xxxx 10xx xxxx 10xx xxxx
    } else if ((c & 0xf8) === 0xf0) {
      extraLength = 3;
      overlongMask = 0xffff;
    } else {
      if ((c & 0xc0) === 0x80) {
        i += onError('UNEXPECTED_CONTINUE', i - 1, bytes, result);
      } else {
        i += onError('BAD_PREFIX', i - 1, bytes, result);
      }
      continue;
    }

    // Do we have enough bytes in our data?
    if (i - 1 + extraLength >= bytes.length) {
      i += onError('OVERRUN', i - 1, bytes, result);
      continue;
    }

    // Remove the length prefix from the char
    let res: null | number = c & ((1 << (8 - extraLength - 1)) - 1);

    for (let j = 0; j < extraLength; j++) {
      const nextChar = bytes[i];

      // Invalid continuation byte
      if ((nextChar & 0xc0) !== 0x80) {
        i += onError('MISSING_CONTINUE', i, bytes, result);
        res = null;
        break;
      }

      res = (res << 6) | (nextChar & 0x3f);
      i++;
    }

    // See above loop for invalid continuation byte
    if (res === null) {
      continue;
    }

    // Maximum code point
    if (res > 0x10ffff) {
      i += onError('OUT_OF_RANGE', i - 1 - extraLength, bytes, result, res);
      continue;
    }

    // Reserved for UTF-16 surrogate halves
    if (res >= 0xd800 && res <= 0xdfff) {
      i += onError('UTF16_SURROGATE', i - 1 - extraLength, bytes, result, res);
      continue;
    }

    // Check for overlong sequences (more bytes than needed)
    if (res <= overlongMask) {
      i += onError('OVERLONG', i - 1 - extraLength, bytes, result, res);
      continue;
    }

    result.push(res);
  }

  return result;
}

/**
 *  Returns the string represented by the UTF-8 data bytes.
 *
 * @param bytes - the UTF-8 data bytes
 * @returns the string represented by the UTF-8 data bytes
 */

export function toUtf8String(bytes: BytesLike): string {
  return helper(getUtf8CodePoints(bytes));
}
