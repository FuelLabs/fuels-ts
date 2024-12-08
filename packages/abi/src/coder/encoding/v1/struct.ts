import { FuelError } from '@fuel-ts/errors';
import { concatBytes } from '@fuel-ts/utils';

import { STRUCT_TYPE } from '../encoding-constants';
import type { Coder, GetCoderFn, GetCoderParams, TypesOfCoder } from '../encoding-types';

/**
 * `struct` coder
 */
export type StructEncodeValue<TCoders extends Record<string, Coder>> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Input'];
};

export type StructDecodeData<TCoders extends Record<string, Coder>> = {
  [P in keyof TCoders]: TypesOfCoder<TCoders[P]>['Decoded'];
};

export const struct = <TCoders extends Record<string, Coder>>(
  coders: TCoders
): Coder<StructEncodeValue<TCoders>, StructDecodeData<TCoders>> => ({
  type: STRUCT_TYPE,
  encode: (value: StructEncodeValue<TCoders>): Uint8Array => {
    const expectedKeys = Object.keys(coders);
    const actualKeys = Object.keys(value);

    // Check if there are any missing keys or extra keys
    const missingKeys = expectedKeys.filter((key) => !actualKeys.includes(key));
    if (missingKeys.length > 0) {
      const paths = missingKeys.map((key) => ({ path: key, error: 'Field not present.' }));
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
      return coder.encode(val);
    });

    return concatBytes(encodedValues);
  },
  decode: (data: Uint8Array, initialOffset = 0): [StructDecodeData<TCoders>, number] => {
    let offset = initialOffset;
    let decoded;

    const decodedValue = Object.entries(coders).reduce((acc, [caseKey, fieldCoder]) => {
      [decoded, offset] = fieldCoder.decode(data, offset);
      acc[caseKey as keyof StructDecodeData<TCoders>] = decoded;
      return acc;
    }, {} as StructDecodeData<TCoders>);
    return [decodedValue, offset];
  },
});

struct.fromAbi = ({ type: { swayType, components } }: GetCoderParams, getCoder: GetCoderFn) => {
  if (!components) {
    throw new FuelError(
      FuelError.CODES.CODER_NOT_FOUND,
      `The provided ${STRUCT_TYPE} type is missing ABI components.`,
      { swayType, components }
    );
  }

  const coders = components.reduce((obj, component) => {
    const o: Record<string, Coder> = obj;

    o[component.name] = getCoder(component);
    return o;
  }, {});
  return struct(coders);
};
