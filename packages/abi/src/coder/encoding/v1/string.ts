import { FuelError } from '@fuel-ts/errors';
import { toUtf8Bytes, toUtf8String } from '@fuel-ts/utils';

import { STRING_REGEX } from '../../../matchers/sway-type-matchers';
import { STRING_TYPE } from '../encoding-constants';
import type { Coder, GetCoderFn, GetCoderParams } from '../encoding-types';
import { assertEncodedLengthEquals } from '../validation';

/**
 * `string` coder
 *
 * @param encodedLength - The length of the encoded array.
 * @returns
 */
export const string = (encodedLength: number): Coder<string, string> => ({
  type: 'string',
  encode: (value: string): Uint8Array => {
    if (value.length !== encodedLength) {
      throw new FuelError(
        FuelError.CODES.ENCODE_ERROR,
        `Invalid ${STRING_TYPE} value - unexpected length.`
      );
    }

    return toUtf8Bytes(value);
  },
  decode: (data: Uint8Array, offset: number = 0): [string, number] => {
    const upperOffset = offset + encodedLength;
    const bytes = data.slice(offset, upperOffset);
    assertEncodedLengthEquals(bytes, encodedLength, STRING_TYPE);
    return [toUtf8String(bytes), upperOffset];
  },
});

string.fromAbi = ({ type: { swayType } }: GetCoderParams, _getCoder: GetCoderFn) => {
  const match = STRING_REGEX.exec(swayType)?.groups;
  if (!match) {
    throw new Error(`Unable to parse string length for "${swayType}".`);
  }
  const encodedLength = parseInt(match.length, 10);
  return string(encodedLength);
};
