import { FuelError } from '@fuel-ts/errors';
import { concatBytes } from '@fuel-ts/utils';

import { STRUCT_TYPE } from '../encoding-constants';
import type { Coder, GetCoderFn, GetCoderParams, TypesOfCoder } from '../encoding-types';

/**
 * `struct` coder
 */
type EnumEncodeValue<TCoders extends Record<string, Coder>> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
};

type StructDecodeData<TCoders extends Record<string, Coder>> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
};

export const struct = <TCoders extends Record<string, Coder>>(
  coders: TCoders
): Coder<EnumEncodeValue<TCoders>, StructDecodeData<TCoders>> => ({
  type: STRUCT_TYPE,
  encode: (value: EnumEncodeValue<TCoders>): Uint8Array => {
    const expectedKeys = Object.keys(coders);
    const actualKeys = Object.keys(value);

    // Check if there are any missing keys or extra keys
    const missingKeys = expectedKeys.filter((key) => !actualKeys.includes(key));
    const extraKeys = actualKeys.filter((key) => !expectedKeys.includes(key));
    if (missingKeys.length > 0 || extraKeys.length > 0) {
      const paths = [
        ...missingKeys.map((key) => ({ path: key, error: 'Field not present.' })),
        ...extraKeys.map((key) => ({ path: key, error: 'Field not expected.' })),
      ];
      throw new FuelError(
        FuelError.CODES.ENCODE_ERROR,
        'Invalid struct value - malformed object.',
        {
          value,
          paths,
        }
      );
    }

    // Encode each value
    const encodedValues = Object.entries(value).map(([key, val]) => {
      const coder = coders[key];
      try {
        return coder.encode(val);
      } catch (error) {
        const e = <FuelError>error;
        throw new FuelError(
          FuelError.CODES.ENCODE_ERROR,
          'Invalid struct value - failed to encode field.',
          {
            value,
            paths: [{ path: key, value: val, error: e.message, ...e.metadata }],
          }
        );
      }
    });

    return concatBytes(encodedValues);
  },
  decode: (data: Uint8Array, initialOffset = 0): [StructDecodeData<TCoders>, number] => {
    let offset = initialOffset;
    let decoded;

    try {
      const decodedValue = Object.entries(coders).reduce((acc, [caseKey, fieldCoder]) => {
        [decoded, offset] = fieldCoder.decode(data, offset);
        acc[caseKey as keyof StructDecodeData<TCoders>] = decoded;
        return acc;
      }, {} as StructDecodeData<TCoders>);
      return [decodedValue, offset];
    } catch (error) {
      throw new FuelError(FuelError.CODES.DECODE_ERROR, 'Invalid struct data - malformed data.', {
        data,
      });
    }
  },
});

struct.fromAbi = ({ type: { components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new Error(`The provided Tuple type is missing an item of 'components'.`);
  }

  const coders = components.reduce((obj, component) => {
    const o: Record<string, Coder> = obj;

    o[component.name] = getCoder(component);
    return o;
  }, {});
  return struct(coders);
};
