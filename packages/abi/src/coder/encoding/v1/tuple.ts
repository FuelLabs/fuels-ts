import { concat } from '@fuel-ts/utils';

import { TUPLE_TYPE } from '../encoding-constants';
import type { Coder, TypesOfCoder } from '../encoding-types';
import { assertValueLengthEqualsExpected, errors } from '../validation';

/**
 * Tuple coder
 */
export type TupleEncodeValue<TCoders extends Coder[]> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
};
export type TupleDecodeValue<TCoders extends Coder[]> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
};
export type TupleCoder<TCoders extends Coder[] = Coder[]> = Coder<
  TupleEncodeValue<TCoders>,
  TupleDecodeValue<TCoders>
>;

export const tuple = <TCoders extends Coder[]>(coders: TCoders): TupleCoder<TCoders> => ({
  type: TUPLE_TYPE,
  encode: (value: TupleEncodeValue<TCoders>): Uint8Array => {
    assertValueLengthEqualsExpected(value, coders.length, TUPLE_TYPE);
    const encodedValues = coders.map((elementCoder, elementIndex) => {
      const elementValue = value[elementIndex];
      return elementCoder.encode(elementValue);
    });
    return concat(encodedValues);
  },
  decode: (data: Uint8Array, initialOffset = 0): [TupleDecodeValue<TCoders>, number] => {
    try {
      let offset = initialOffset;
      let decoded;

      const decodedValue = coders.map((coder) => {
        [decoded, offset] = coder.decode(data, offset);
        return decoded;
      });
      return [decodedValue as TupleDecodeValue<TCoders>, offset];
    } catch (error) {
      throw errors.malformedData(TUPLE_TYPE, data, initialOffset);
    }
  },
});
