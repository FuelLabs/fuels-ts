import { toUtf8Bytes, toUtf8String } from '@fuel-ts/utils';

import { STRING_TYPE } from '../encoding-constants';
import type { Coder } from '../encoding-types';
import { assertEncodedLengthEquals, assertValueLengthEqualsExpected } from '../validation';

/**
 * `string` coder
 *
 * @param encodedLength - The length of the encoded array.
 * @returns
 */
export const string = (encodedLength: number): Coder<string, string> => ({
  type: 'string',
  encode: (value: string): Uint8Array => {
    assertValueLengthEqualsExpected(value, encodedLength, STRING_TYPE);
    return toUtf8Bytes(value);
  },
  decode: (data: Uint8Array, offset: number = 0): [string, number] => {
    const upperOffset = offset + encodedLength;
    const bytes = data.slice(offset, upperOffset);
    assertEncodedLengthEquals(bytes, encodedLength, STRING_TYPE);
    return [toUtf8String(bytes), upperOffset];
  },
});
