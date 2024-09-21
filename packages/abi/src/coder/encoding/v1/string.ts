import { toUtf8Bytes, toUtf8String } from '@fuel-ts/utils';

import { STRING_REGEX } from '../../../matchers/sway-type-matchers';
import type { Coder, GetCoderFn, GetCoderParams } from '../../abi-coder-types';

/**
 * `string` coder
 *
 * @param encodedLength - The length of the encoded array.
 * @returns
 */
export const string = ({ encodedLength }: { encodedLength: number }): Coder<string> => ({
  type: 'string',
  encodedLength: () => encodedLength,
  encode: (value: string): Uint8Array => toUtf8Bytes(value),
  decode: (data: Uint8Array): string => toUtf8String(data),
});

string.fromAbi = ({ type: { swayType } }: GetCoderParams, _getCoder: GetCoderFn) => {
  const match = STRING_REGEX.exec(swayType)?.groups;
  if (!match) {
    throw new Error(`Unable to parse string length for "${swayType}".`);
  }
  const encodedLength = parseInt(match.length, 10);
  return string({ encodedLength });
};
