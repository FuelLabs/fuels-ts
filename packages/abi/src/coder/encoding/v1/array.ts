import { concat } from '@fuel-ts/utils';

import { ARRAY_TYPE } from '../encoding-constants';
import type { Coder, TypesOfCoder } from '../encoding-types';
import {
  assertValueIsArray,
  assertDataLengthLessThanMax,
  assertValueLengthEqualsExpected,
} from '../validation';

/**
 * `array` coder
 */
export type ArrayEncodeValue<TCoder extends Coder = Coder> = Array<TypesOfCoder<TCoder>['Input']>;
export type ArrayDecodeData<TCoder extends Coder = Coder> = Array<TypesOfCoder<TCoder>['Decoded']>;
export type ArrayCoder<TCoder extends Coder = Coder> = Coder<
  ArrayEncodeValue<TCoder>,
  ArrayDecodeData<TCoder>
>;

export const arrayCoder = <TCoder extends Coder>(
  coder: TCoder,
  size: number
): ArrayCoder<TCoder> => ({
  type: ARRAY_TYPE,
  encode: (value: ArrayEncodeValue<TCoder>): Uint8Array => {
    assertValueIsArray(value, ARRAY_TYPE);
    assertValueLengthEqualsExpected(value, size, ARRAY_TYPE);
    const encodedValues = value.map((elementValue) => coder.encode(elementValue));
    return concat(encodedValues);
  },
  decode: (data: Uint8Array, initialOffset: number = 0): [ArrayDecodeData<TCoder>, number] => {
    assertDataLengthLessThanMax(data, ARRAY_TYPE);

    let decoded;
    let offset = initialOffset;

    const decodedValue = Array(size)
      .fill(0)
      .map(() => {
        [decoded, offset] = coder.decode(data, offset);
        return decoded;
      });
    return [decodedValue as ArrayDecodeData<TCoder>, offset];
  },
});
