import { FuelError } from '@fuel-ts/errors';
import { concat } from '@fuel-ts/utils';

import type { AbiTypeComponent } from '../../../parser';
import { TUPLE_TYPE } from '../encoding-constants';
import type { Coder, GetCoderFn, GetCoderParams, TypesOfCoder } from '../encoding-types';

/**
 * Tuple coder
 */
export type TupleEncodeValue<TCoders extends Coder[]> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
};
export type TupleDecodeValue<TCoders extends Coder[]> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
};

export const tuple = <TCoders extends Coder[]>(
  coders: TCoders
): Coder<TupleEncodeValue<TCoders>, TupleDecodeValue<TCoders>> => ({
  type: TUPLE_TYPE,
  encode: (value: TupleEncodeValue<TCoders>): Uint8Array => {
    if (value.length !== coders.length) {
      throw new FuelError(FuelError.CODES.ENCODE_ERROR, 'Invalid tuple value - mismatched inputs.');
    }

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
      throw new FuelError(
        FuelError.CODES.DECODE_ERROR,
        `Invalid ${TUPLE_TYPE} data - malformed data.`
      );
    }
  },
});

tuple.fromAbi = ({ type: { swayType, components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${TUPLE_TYPE} type is missing ABI components.`,
      { swayType, components }
    );
  }

  const coders = components.map((component: AbiTypeComponent) => getCoder(component));
  return tuple(coders);
};
