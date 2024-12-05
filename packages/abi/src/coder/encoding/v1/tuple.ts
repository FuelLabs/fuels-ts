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
      throw new FuelError(
        FuelError.CODES.ENCODE_ERROR,
        'Invalid tuple value - mismatched inputs.',
        {
          paths: coders.reduce(
            (acc, coder, index) => {
              acc.push({ path: `[${index}]`, error: 'Field not present.', type: coder.type });
              return acc;
            },
            [] as { path: string; error: string; type: string }[]
          ),
        }
      );
    }

    const encodedValues = coders.map((elementCoder, elementIndex) => {
      const elementValue = value[elementIndex];

      try {
        return elementCoder.encode(elementValue);
      } catch (error) {
        const e = <FuelError>error;
        throw new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          `Invalid ${TUPLE_TYPE} value - failed to encode field.`,
          {
            value,
            paths: [
              { path: `[${elementIndex}]`, value: elementValue, error: e.message, ...e.metadata },
            ],
          }
        );
      }
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
        `Invalid ${TUPLE_TYPE} data - malformed data.`,
        {
          data,
        }
      );
    }
  },
});

tuple.fromAbi = ({ type: { components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new Error(`The provided Tuple type is missing an item of 'components'.`);
  }

  const coders = components.map((component: AbiTypeComponent) => getCoder(component));
  return tuple(coders);
};
